import { useId } from "react";
import { useLocale } from "../../hooks/usePreferences";
import { StatusBadge } from "../ui/StatusBadge";
/** Presentation only: callers own acquisition, analytical meaning and evidence selection. */
export function VisualizationFrame({ title, description, source, period, kind = "observed", annotation, controls, children }) {
    const id = useId();
    const { t } = useLocale();
    return <section className="viz-frame" aria-labelledby={id}>
    <header className="viz-heading"><div><p className="viz-source">{source} · <StatusBadge kind={kind}/></p><h2 id={id}>{title}</h2><p>{description}</p></div>{controls}</header>
    <div className="viz-period"><span>{t("real.period")}</span><strong>{period}</strong></div>
    {children}
    {annotation && <p className="viz-annotation">{annotation}</p>}
  </section>;
}
export function ObservationTooltip({ label, value, period, context, source }) {
    const { t } = useLocale();
    return <div className="real-tooltip"><p>{period} · {context}</p><strong>{label} {value}</strong><p>{source} · {t("real.observed")}</p></div>;
}
export function ObservationLegend({ label }) {
    const { t } = useLocale();
    return <p className="viz-legend"><span aria-hidden="true"/>{label} · {t("viz.publishedPoints")}</p>;
}
