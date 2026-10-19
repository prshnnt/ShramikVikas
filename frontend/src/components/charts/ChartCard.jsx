import { useLocale } from "../../hooks/usePreferences";
import { Panel, SectionHeader } from "../ui/Panel";
import { StatusBadge } from "../ui/StatusBadge";
export function ChartCard({ title, subtitle, source, period, kind, children }) {
    const { t } = useLocale();
    return <Panel className="chart-card"><SectionHeader eyebrow={t("chart.demand")} title={title} description={subtitle} action={kind && <StatusBadge kind={kind}/>}/>
    <div className="chart-content">{children}</div>
    <div className="panel-metadata"><span>{t("chart.source")} {source}</span><span>{t("chart.period")} {period}</span></div>
  </Panel>;
}
