import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
const regionIds = ["bengaluru", "hyderabad", "pune", "mumbai", "delhi", "chennai", "kolkata", "ahmedabad"];
const industryIds = ["technology", "finance", "healthcare", "manufacturing"];
const occupationIds = ["softwareDeveloper", "dataAnalyst", "cloudEngineer", "securityAnalyst", "financialAnalyst", "healthcareAnalyst", "productionSupervisor"];
const skillIds = ["python", "analytics", "cloud", "cybersecurity", "ai", "digitalSales", "healthData", "robotics"];
const categories = ["data", "software", "security", "business", "healthcare", "engineering"];
const experiences = ["entry", "mid", "senior"];
function member(value, values) { return values.find(item => item === value); }
export function useWorkspaceFilters() {
    const [searchParams, setSearchParams] = useSearchParams();
    const filters = useMemo(() => ({
        range: member(searchParams.get("period"), ["6m", "12m", "all"]) ?? "all",
        regionId: member(searchParams.get("region"), regionIds),
        industryId: member(searchParams.get("industry"), industryIds),
        occupationId: member(searchParams.get("occupation"), occupationIds),
        skillId: member(searchParams.get("skill"), skillIds),
        category: member(searchParams.get("category"), categories),
        experience: member(searchParams.get("experience"), experiences),
    }), [searchParams]);
    function setFilter(key, value) {
        const next = new URLSearchParams(searchParams);
        if (value)
            next.set(key, value);
        else
            next.delete(key);
        setSearchParams(next, { replace: true });
    }
    function reset() { setSearchParams(new URLSearchParams({ data: "sample" }), { replace: true }); }
    return { filters, searchParams, setFilter, reset };
}
