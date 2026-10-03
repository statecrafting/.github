import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { validateManifest, normalize, validateCatalog, serialize, assertSourceState, expectedRoutes } from './model.mjs';
const manifest = JSON.parse(readFileSync('catalog/sources.json', 'utf8'));
validateManifest(manifest);
const spine = process.env.SPEC_SPINE_BIN || 'spec-spine';
const run = (bin, args, cwd) => execFileSync(bin, args, { cwd, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } }).trim();
if (run(spine, ['--version']) !== 'spec-spine 0.28.0') throw new Error('Wrong spec-spine producer');
const cache = resolve('.statecraft/state/catalog-sources');
mkdirSync(cache, { recursive: true });
const sources = [];
for (const source of manifest.sources) {
  let response;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      response = await fetch(`https://api.github.com/repos/${source.repository}`, { signal: AbortSignal.timeout(20000), headers: { 'User-Agent': 'statecrafting-public-catalog', 'Accept': 'application/vnd.github+json' } });
      if (response.status < 500 || attempt === 2) break;
    } catch (error) { if (attempt === 2) throw error; }
    await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
  }
  if (!response.ok) throw new Error(`Public visibility check failed for ${source.repository}: ${response.status}`);
  const metadata = await response.json();
  if (metadata.private !== false || metadata.full_name !== source.repository) throw new Error('Private or redirected source refused');
  const dir = resolve(cache, source.repository.split('/')[1]);
  if (!existsSync(dir)) { mkdirSync(dir); run('git', ['init', '-q'], dir); }
  const git = args => run('git', ['-c', 'credential.helper=', '-c', 'core.hooksPath=/dev/null', ...args], dir);
  if (!existsSync(resolve(dir, `.git/catalog-${source.revision}`))) {
    git(['fetch', '--depth=1', `https://github.com/${source.repository}.git`, source.revision]);
    writeFileSync(resolve(dir, `.git/catalog-${source.revision}`), 'fetched\n');
  }
  git(['checkout', '--detach', '--force', source.revision]);
  if (git(['rev-parse', 'HEAD']) !== source.revision) throw new Error('Source revision mismatch');
  const read = args => JSON.parse(run(spine, [...args, '--repo', dir, '--json']));
  assertSourceState(read(['config', 'show']), read(['check']));
  const ids = read(['registry', 'list', '--ids-only']).items.sort();
  const specs = ids.map(id => normalize(source, read(['registry', 'show', id]), read(['registry', 'relationships', id])));
  sources.push({ ...source, specs });
  console.log(`${source.repository}: ${specs.length} specs at ${source.revision.slice(0, 12)}`);
}
const catalog = validateCatalog({ schemaVersion: 1, sources: sources.sort((a, b) => a.repository.localeCompare(b.repository, 'en')) });
mkdirSync('public/data', { recursive: true });
writeFileSync('public/data/catalog.json', serialize(catalog));
writeFileSync('public/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + expectedRoutes(catalog).map(route => `<url><loc>https://statecraft.ing${route}</loc></url>`).join('') + '</urlset>\n');
