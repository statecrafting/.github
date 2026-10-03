import { readFileSync } from 'node:fs';
import type { Catalog } from './catalog';
export function readCatalog(): Catalog {
  const data = JSON.parse(readFileSync('public/data/catalog.json', 'utf8')) as Catalog;
  if (data.schemaVersion !== 1 || !data.sources?.length || data.sources.some(s => !s.specs.length)) throw new Error('Required catalog missing or malformed');
  return data;
}
