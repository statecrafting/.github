export interface Spec {
  id: string; title: string; summary: string; lifecycle: string; implementation: string;
  contentHash: string; headings: string[]; anchors: string[];
  claims: { kind: string; unit: unknown }[];
  relationships: Record<string, string[]>;
  verification: 'unknown'; qualification: 'unknown'; sourceUrl: string;
}
export interface Source {
  repository: string; revision: string; producer: string; observedAt: string;
  role: string; description: string; specs: Spec[];
}
export interface Catalog { schemaVersion: 1; sources: Source[] }
export const repoName = (source: Source) => source.repository.split('/')[1];
export const specPath = (source: Source, spec: Spec) => `/registry/${repoName(source)}/${spec.id}`;
let clientCatalog: Promise<Catalog> | undefined;
export function readClientCatalog(): Promise<Catalog> {
  return clientCatalog ??= fetch('/data/catalog.json').then(async response => {
    if (!response.ok) throw new Error('Required catalog unavailable');
    const data = await response.json() as Catalog;
    if (data.schemaVersion !== 1 || !data.sources?.length) throw new Error('Invalid catalog');
    return data;
  });
}
