export function Status({ label, value }: { label: string; value: string }) { return <span className={`status status-${value}`}><span>{label}</span> {value}</span>; }
