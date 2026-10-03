import { Link } from 'react-router';
import { paper } from '../lib/reading';
export const meta=()=>[{title:'Papers | Statecraft'}];
export default function Papers(){return <div className="shell page"><p className="eyebrow">Design notes</p><h1>The reasoning<br/><em>behind the tools.</em></h1><p className="lede">Current explanations grounded in the public family, with the boundaries left visible.</p><Link className="paper-feature" to="/papers/governed-work"><div><p className="eyebrow">Architecture / October 2026</p><h2>{paper.title}</h2><p>{paper.subtitle}</p><p>{paper.abstract}</p><span>Read the paper ↗</span></div><div className="paper-art" aria-hidden="true"><span>INTENT</span><i>↓</i><span>AUTHORITY</span><i>↓</i><span>EVIDENCE</span></div></Link></div>;}
