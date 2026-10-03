import { useId, useState } from 'react';
const nodes = [
 { title: 'Intent', detail: 'Write the desired behavior and its limits in an authored specification. A proposal remains draft until its owner approves it.', link: '/docs/specifications' },
 { title: 'Authority', detail: 'spec-spine compiles declared relationships and ownership. Source repositories retain their own authority; this website presents their records.', link: '/registry/spec-spine' },
 { title: 'Local work', detail: 'Statecraft CLI manages a local work environment. Registration, qualification, arming and execution posture are separate acts.', link: '/registry/statecraft-cli' },
 { title: 'Evidence', detail: 'Tests, wire captures and artifact verification support bounded conclusions. Declared completion alone does not establish deployment qualification.', link: '/registry/wire-witness' },
];
export function Architecture() {
 const id = useId().replaceAll(':', ''); const [active, setActive] = useState(0);
 return <section className="architecture" aria-label="Governed work architecture"><div className="flow-line" aria-hidden="true"><svg viewBox="0 0 1000 24" preserveAspectRatio="none"><defs><marker id={`arrow-${id}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="currentColor"/></marker></defs><path d="M0 12H995" stroke="currentColor" markerEnd={`url(#arrow-${id})`}/></svg></div><div className="flow-nodes">{nodes.map((node, index) => <button key={node.title} aria-pressed={active === index} aria-controls={`detail-${id}`} onClick={() => setActive(index)}><span className="mono">0{index + 1}</span><strong>{node.title}</strong><span>Inspect ↗</span></button>)}</div><div id={`detail-${id}`} className="flow-detail" aria-live="polite"><strong>{nodes[active].title}</strong><p>{nodes[active].detail}</p><a href={nodes[active].link}>Read the public source context →</a></div></section>;
}
