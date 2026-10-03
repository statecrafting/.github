import { readFileSync, readdirSync, statSync, existsSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expectedRoutes, validateCatalog } from './catalog/model.mjs';
const catalog = validateCatalog(JSON.parse(readFileSync('public/data/catalog.json', 'utf8')));
const output = resolve('build/client');
for (const route of expectedRoutes(catalog)) {
  const file = resolve(output, route.slice(1), 'index.html');
  if (!existsSync(file)) throw new Error(`Missing prerendered route: ${route}`);
  const html = readFileSync(file, 'utf8');
  if (!html.includes('<html lang="en"') || !html.includes('<h1')) throw new Error(`Incomplete HTML: ${route}`);
  if (route.startsWith('/registry/') && route.split('/').length === 4 && !html.includes('Read the full pinned specification')) throw new Error(`Missing spec detail: ${route}`);
}
const fallback = resolve(output, '__spa-fallback.html');
if (!existsSync(fallback)) throw new Error('Missing SPA fallback for unknown routes');
copyFileSync(fallback, resolve(output, '404.html'));
if (readFileSync(resolve(output, 'CNAME'), 'utf8').trim() !== 'statecraft.ing') throw new Error('Wrong custom domain');
const repos = new Set(catalog.sources.map(s => s.repository));
function scan(dir) {
  for (const name of readdirSync(dir)) {
    const file = resolve(dir, name);
    if (statSync(file).isDirectory()) { if (name === '.git' || name === '.statecraft') throw new Error('Private state in artifact'); scan(file); continue; }
    if (!/\.(html|js|json|css|xml|txt|svg|data)$/.test(name)) continue;
    const text = readFileSync(file, 'utf8');
    for (const token of ['/Users/', '/home/bart/', 'https://Codex.ai/code/session_', 'app.statecraft.ing', 'auth.statecraft.ing', '-----BEGIN PRIVATE KEY', '-----BEGIN OPENSSH PRIVATE KEY', String.fromCharCode(0x2014)]) if (text.includes(token)) throw new Error(`Publication scan rejected ${name}: ${token}`);
    if (/github\.com\/statecrafting\/(statecraft|statecraft-archive|travel-memory|butler)(?:\/|["\s])/.test(text)) throw new Error(`Private source link in ${name}`);
    for (const match of text.matchAll(/https:\/\/github\.com\/(statecrafting\/[a-z][a-z0-9-]*)\/(?:blob|tree)\//g)) if (!repos.has(match[1])) throw new Error(`Unlisted source in ${name}`);
    if (name.endsWith('.html') && /<script[^>]+src=["']https?:\/\//.test(text)) throw new Error('Third-party script refused');
  }
}
scan(output);
console.log(`Verified ${expectedRoutes(catalog).length} prerendered routes, custom domain, fallback and publication boundary.`);
