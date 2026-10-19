export function Panel({ className = "", ...props }) {
    return <section className={`panel ${className}`} {...props}/>;
}
export function SectionHeader({ title, eyebrow, description, action, id }) {
    return <div className="section-header">
    <div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>{description && <p className="section-description">{description}</p>}
    </div>{action && <div className="section-action">{action}</div>}
  </div>;
}
