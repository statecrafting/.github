import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { paper } from '../lib/reading';
import { readCatalog } from '../lib/catalog.server';
import { Reader } from '../components/reader';
export function loader({params}:LoaderFunctionArgs){if(params.slug!=='governed-work')throw new Response('Paper not found',{status:404});return {paper,sources:readCatalog().sources};}
export const meta=()=>[{title:'Intent, authority, evidence | Statecraft'}];
export default function Paper(){const {paper,sources}=useLoaderData<typeof loader>();return <article className="shell page"><Link className="breadcrumb" to="/papers">← Papers</Link><p className="eyebrow">Architecture note · {paper.date} · 6 minute read</p><h1>{paper.title}</h1><p className="lede">{paper.subtitle}</p><div className="abstract"><p className="eyebrow">Abstract</p><p>{paper.abstract}</p></div><Reader sections={paper.sections}><section id="references"><h2>Public source references</h2><p>References use the catalog snapshot observed on October 3, 2026. This is a current introduction, not a revision of the archived paper under its historical date.</p><ol className="references">{sources.map(s=><li key={s.repository}><a href={`https://github.com/${s.repository}/blob/${s.revision}/README.md`}>{s.repository} README ↗</a><small>{s.revision}</small></li>)}</ol></section></Reader></article>;}
