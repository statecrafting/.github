import type { Config } from '@react-router/dev/config';
import { readFileSync } from 'node:fs';
import type { Catalog } from './app/lib/catalog';
const catalog = JSON.parse(readFileSync('public/data/catalog.json', 'utf8')) as Catalog;
if (catalog.schemaVersion !== 1 || !catalog.sources.length || catalog.sources.some(s => !s.specs.length)) throw new Error('Required catalog unavailable');
export default {
  ssr: false,
  prerender: ['/', '/products', '/registry', '/docs', '/docs/specifications', '/docs/catalog', '/papers', '/papers/governed-work', '/get-started', ...catalog.sources.flatMap(s => { const name = s.repository.split('/')[1]; return [`/registry/${name}`, ...s.specs.map(spec => `/registry/${name}/${spec.id}`)]; })],
} satisfies Config;
