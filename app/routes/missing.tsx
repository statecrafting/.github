import { Link } from 'react-router';
export const meta=()=>[{title:'Page not found | Statecraft'}];
export default function Missing(){return <div className="shell page"><p className="eyebrow">404 / Not found</p><h1>This page is not<br/>in the public catalog.</h1><p className="lede">No substitute specification is shown.</p><Link className="button" to="/registry">Browse the catalog →</Link></div>;}
