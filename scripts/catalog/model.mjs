import Ajv from 'ajv';
import { readFileSync } from 'node:fs';
const schema = JSON.parse(readFileSync(new URL('../../catalog/schema.json', import.meta.url), 'utf8'));
const validate = new Ajv({ allErrors: true }).compile(schema);
export function validateManifest(manifest) {
  if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.sources) || !manifest.sources.length) throw new Error('Missing source manifest');
  const seen = new Set();
  for (const source of manifest.sources) {
    if (!/^statecrafting\/[a-z][a-z0-9-]+$/.test(source.repository) || !/^[a-f0-9]{40}$/.test(source.revision) || source.producer !== '0.28.0' || source.required !== true || !/^\d{4}-\d{2}-\d{2}$/.test(source.observedAt) || seen.has(source.repository)) throw new Error('Invalid or unsupported source pin');
    seen.add(source.repository);
  }
}
export function validateCatalog(catalog) {
  if (!validate(catalog)) throw new Error(`Catalog schema rejected: ${JSON.stringify(validate.errors)}`);
  const repos = new Set();
  for (const source of catalog.sources) {
    if (repos.has(source.repository)) throw new Error('Duplicate repository');
    repos.add(source.repository);
    const ids = new Set(source.specs.map(s => s.id));
    if (ids.size !== source.specs.length || ids.size === 0) throw new Error('Duplicate or missing specs');
    for (const spec of source.specs) {
      const prefix = `https://github.com/${source.repository}/blob/${source.revision}/`;
      if (!spec.sourceUrl.startsWith(prefix) || spec.sourceUrl.includes('..')) throw new Error('Unpinned source link');
      for (const targets of Object.values(spec.relationships)) for (const target of targets) if (!ids.has(target)) throw new Error(`Missing relationship target: ${target}`);
    }
  }
  return catalog;
}
export function normalize(source, record, relationships) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(record.id) || !record.specPath || record.specPath.includes('..') || !/^[a-zA-Z0-9_./-]+$/.test(record.specPath)) throw new Error('Invalid spec identity or path');
  const relationKeys = ['dependsOn', 'dependedOnBy', 'amends', 'amendedBy', 'supersedes', 'supersededBy'];
  const edges = Object.fromEntries(relationKeys.map(key => [key, [...(relationships[key] ?? [])].sort()]));
  const claims = ['establishes', 'extends', 'refines', 'coAuthority', 'constrains'].flatMap(kind => (record[kind] ?? []).map(unit => ({ kind, unit })));
  return { id: record.id, title: record.title, summary: record.summary ?? '', lifecycle: record.status, implementation: record.implementation ?? 'unknown', contentHash: record.contentHash, headings: record.sectionHeadings ?? [], anchors: record.unamendable ?? [], claims, relationships: edges, verification: 'unknown', qualification: 'unknown', sourceUrl: `https://github.com/${source.repository}/blob/${source.revision}/${record.specPath}` };
}
export const serialize = value => JSON.stringify(value, null, 2) + '\n';
export function expectedRoutes(catalog) {
  validateCatalog(catalog);
  return ['/', '/products', '/registry', '/docs', '/docs/specifications', '/docs/catalog', '/papers', '/papers/governed-work', '/get-started', ...catalog.sources.flatMap(s => [`/registry/${s.repository.split('/')[1]}`, ...s.specs.map(spec => `/registry/${s.repository.split('/')[1]}/${spec.id}`)])];
}
export function assertSourceState(config, check) {
  if (config.meta?.required_version !== '=0.28.0') throw new Error('Unsupported producer requirement');
  if (check.exitCode !== 0 || check.report?.registry?.fresh !== true || check.report?.registry?.validationPassed !== true || check.report?.index?.fresh !== true) throw new Error('Stale or invalid source corpus');
}
