import { samplePath } from "../../features/real-intelligence/legacySample";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "../../hooks/usePreferences";
import { industries, occupations, regions, skills } from "../../data/labourMarket";
const entityData = { skills, occupations, industries, regions };
const entityRoutes = { skills: "/skills", occupations: "/occupations", industries: "/industries", regions: "/regions" };
export function RelationshipList({ titleKey, kind, ids, filterKey }) {
    const { t } = useLocale();
    const entries = entityData[kind].filter(item => ids.includes(item.id));
    return <section className="relationship-list"><h2>{t(titleKey)}</h2>{entries.length ? <ul>{entries.map(item => <li key={item.id}>
    <Link to={samplePath(`${entityRoutes[kind]}${filterKey ? `?${filterKey}=${item.id}` : ""}`)}><span>{t(item.nameKey)}</span><ArrowUpRight size={15} aria-hidden="true"/></Link>
  </li>)}</ul> : <p>{t("workspace.noObservations")}</p>}</section>;
}
