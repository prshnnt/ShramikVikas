import { observations, periods, skills } from "../data/labourMarket";
const rangeSize = { "6m": 2, "12m": 4, all: periods.length };
export function queryObservations(filters) {
    const floor = periods.length - rangeSize[filters.range];
    return observations.filter(item => item.periodIndex >= floor
        && (!filters.regionId || item.regionId === filters.regionId)
        && (!filters.industryId || item.industryId === filters.industryId)
        && (!filters.occupationId || item.occupationId === filters.occupationId)
        && (!filters.skillId || item.skillId === filters.skillId)
        && (!filters.category || skills.find(skill => skill.id === item.skillId)?.category === filters.category)
        && (!filters.experience || item.experience === filters.experience));
}
export function average(items, key) {
    return items.length ? items.reduce((sum, item) => sum + item[key], 0) / items.length : 0;
}
export function trendSeries(items) {
    return periods.map(period => {
        const group = items.filter(item => item.period === period.id);
        return { period: period.id, demand: Math.round(average(group, "demandIndex")), supply: Math.round(average(group, "supplyIndex")), gap: Math.round(average(group, "gapIndex")) };
    }).filter(point => items.some(item => item.period === point.period));
}
export function rankings(items, dimension, metric = "demandIndex") {
    const ids = new Set(items.map(item => item[dimension]));
    return [...ids].map(id => {
        const group = items.filter(item => item[dimension] === id);
        return { id, score: Math.round(average(group, metric)), supply: Math.round(average(group, "supplyIndex")), gap: Math.round(average(group, "gapIndex")) };
    }).sort((a, b) => b.score - a.score);
}
export function relatedIds(items, dimension) {
    return [...new Set(items.map(item => item[dimension]))];
}
export function scenarioSeries(items, factor) {
    const history = trendSeries(items).slice(-2);
    const last = history.at(-1);
    if (!last)
        return [];
    const futureKeys = ["workspace.q2026q3", "workspace.q2026q4", "workspace.q2027q1", "workspace.q2027q2"];
    const projections = futureKeys.map((period, index) => {
        const steps = index + 1;
        const demand = Math.round(last.demand * (1 + factor) ** steps);
        const supply = Math.round(last.supply * 1.012 ** steps);
        return { period, demand, supply, gap: Math.max(0, demand - supply) };
    });
    return [...history, ...projections];
}
