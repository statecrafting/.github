import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { docs } from '../lib/reading';
import { Reader } from '../components/reader';
export function loader({params}:LoaderFunctionArgs){const doc=docs[params.slug??''];if(!doc)throw new Response('Guide not found',{status:404});return doc;}
export const meta=({data}:{data?:ReturnType<typeof loader>})=>[{title:`${data?.title??'Guide'} | Statecraft`}];
export default function Doc(){const doc=useLoaderData<typeof loader>();return <article className="shell page"><Link className="breadcrumb" to="/docs">← Documentation</Link><h1>{doc.title}</h1><p className="lede">{doc.intro}</p><Reader sections={doc.sections}/></article>;}
