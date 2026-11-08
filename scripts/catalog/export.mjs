import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { validateManifest, normalize, validateCatalog, serialize, assertSourceState, expectedRoutes, SUPPORTED_PRODUCERS } from './model.mjs';
const manifest = JSON.parse(readFileSync('catalog/sources.json', 'utf8'));
validateManifest(manifest);
const { GH_PUBLIC_METADATA_TOKEN, ...publicEnvironment } = process.env;
const metadataHeaders = { 'User-Agent': 'statecrafting-public-catalog', 'Accept': 'application/vnd.github+json', ...(GH_PUBLIC_METADATA_TOKEN ? { Authorization: `Bearer ${GH_PUBLIC_METADATA_TOKEN}` } : {}) };
const run = (bin, args, cwd) => execFileSync(bin, args, { cwd, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'], env: { ...publicEnvironment, GIT_TERMINAL_PROMPT: '0', GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null' } }).trim();
const reportsVersion = (bin, version) => { try { return run(bin, ['--version']) === `spec-spine ${version}`; } catch { return false; } };
// One exact producer per declared version: SPEC_SPINE_BIN_0_32_0, then .bin/spec-spine-0.32.0 (scripts/install-spec-spine.sh), then whatever `spec-spine` on PATH identifies as.
const producers = Object.fromEntries(SUPPORTED_PRODUCERS.filter(version => manifest.sources.some(source => source.producer === version)).map(version => {
  const candidates = [process.env[`SPEC_SPINE_BIN_${version.replaceAll('.', '_')}`], resolve('.bin', `spec-spine-${version}`), process.env.SPEC_SPINE_BIN, 'spec-spine'].filter(Boolean);
  const bin = candidates.find(candidate => reportsVersion(candidate, version));
  if (!bin) throw new Error(`Missing spec-spine ${version} producer`);
  return [version, bin];
}));
const cache = resolve('.statecraft/state/catalog-sources');
mkdirSync(cache, { recursive: true });
const sources = [];
for (const source of manifest.sources) {
  let response;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      response = await fetch(`https://api.github.com/repos/${source.repository}`, { signal: AbortSignal.timeout(20000), headers: metadataHeaders });
      if (response.status < 500 || attempt === 2) break;
    } catch (error) { if (attempt === 2) throw error; }
    await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
  }
  if (!response.ok) throw new Error(`Public visibility check failed for ${source.repository}: ${response.status}`);
  const metadata = await response.json();
  if (metadata.private !== false || metadata.full_name !== source.repository) throw new Error('Private or redirected source refused');
  const dir = resolve(cache, source.repository.split('/')[1]);
  if (!existsSync(dir)) { mkdirSync(dir); run('git', ['init', '-q'], dir); }
  const git = args => run('git', ['-c', 'credential.helper=', '-c', 'http.extraHeader=', '-c', 'core.hooksPath=/dev/null', ...args], dir);
  git(['ls-remote', '--exit-code', `https://github.com/${source.repository}.git`, 'HEAD']);
  if (!existsSync(resolve(dir, `.git/catalog-${source.revision}`))) {
    git(['fetch', '--depth=1', `https://github.com/${source.repository}.git`, source.revision]);
    writeFileSync(resolve(dir, `.git/catalog-${source.revision}`), 'fetched\n');
  }
  git(['checkout', '--detach', '--force', source.revision]);
  if (git(['rev-parse', 'HEAD']) !== source.revision) throw new Error('Source revision mismatch');
  const spine = producers[source.producer];
  const read = args => JSON.parse(run(spine, [...args, '--repo', dir, '--json']));
  assertSourceState(read(['config', 'show']), read(['check']), source.producer);
  const ids = read(['registry', 'list', '--ids-only']).items.sort();
  const specs = ids.map(id => normalize(source, read(['registry', 'show', id]), read(['registry', 'relationships', id])));
  sources.push({ ...source, specs });
  console.log(`${source.repository}: ${specs.length} specs at ${source.revision.slice(0, 12)} (spec-spine ${source.producer})`);
}
const catalog = validateCatalog({ schemaVersion: 1, sources: sources.sort((a, b) => a.repository.localeCompare(b.repository, 'en')) });
mkdirSync('public/data', { recursive: true });
writeFileSync('public/data/catalog.json', serialize(catalog));
writeFileSync('public/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + expectedRoutes(catalog).map(route => `<url><loc>https://statecraft.ing${route}</loc></url>`).join('') + '</urlset>\n');
