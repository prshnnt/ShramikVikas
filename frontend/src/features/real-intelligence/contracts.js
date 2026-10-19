// Validate network contracts rather than treating arbitrary JSON as trusted typed data.
function object(value) {
    if (!value || typeof value !== "object" || Array.isArray(value))
        throw new Error("Invalid data response");
    return value;
}
function array(value) { if (!Array.isArray(value))
    throw new Error("Invalid collection"); return value; }
function strings(row, keys) { if (keys.some(key => typeof row[key] !== "string"))
    throw new Error("Invalid metadata"); }
function checkEvidence(value) { const row = object(value); strings(row, ["source_id", "locator", "raw_sha256"]); if (!array(row.transformations).every(v => typeof v === "string"))
    throw new Error("Invalid provenance"); }
export function decodeCatalog(value) {
    const row = object(value);
    strings(row, ["version", "schema_version"]);
    if (row.schema_version !== "1.0")
        throw new Error("Unsupported contract");
    array(row.regions).forEach(value => { const r = object(value); strings(r, ["region_id", "name", "source_name", "region_type"]); checkEvidence(r.evidence); });
    array(row.industries).forEach(value => { const r = object(value); strings(r, ["industry_id", "nic_code", "name", "level"]); checkEvidence(r.evidence); });
    array(row.sources).forEach(value => { const r = object(value); strings(r, ["source_id", "publisher", "url", "license", "dataset_name"]); if (typeof r.connected !== "boolean")
        throw new Error("Invalid source status"); });
    array(row.coverage).forEach(value => { const r = object(value); strings(r, ["dimension", "status", "note"]); array(r.source_ids); });
    array(row.skills);
    array(row.occupations);
    const quality = object(row.quality);
    strings(quality, ["status"]);
    object(quality.records);
    array(quality.quarantined);
    return row;
}
export function decodeLabour(value) {
    const row = object(value);
    strings(row, ["version", "status"]);
    array(row.items).forEach(value => { const r = object(value); strings(r, ["observation_id", "indicator", "region_id", "period", "sex", "sector", "activity_status", "denominator", "period_start", "period_end", "methodology_version"]); if (r.status !== "OBSERVED" || r.unit !== "percent" || typeof r.value !== "number" || !Number.isFinite(r.value) || r.value < 0 || r.value > 100 || r.methodology_version !== "PLFS pre-January-2025" || !["LFPR", "WPR", "UR"].includes(String(r.indicator)) || !["US", "CWS"].includes(String(r.activity_status)) || !["persons", "female", "male"].includes(String(r.sex)) || !["rural", "urban", "combined"].includes(String(r.sector)) || r.age_group !== "15+" || !/^\d{4}-\d{2}-\d{2}$/.test(String(r.period_start)) || !/^\d{4}-\d{2}-\d{2}$/.test(String(r.period_end)) || String(r.period_start) > String(r.period_end))
        throw new Error("Invalid observed rate"); checkEvidence(r.evidence); });
    return row;
}
export function decodeTraining(value) {
    const row = object(value);
    strings(row, ["version", "status"]);
    array(row.items).forEach(value => { const r = object(value); strings(r, ["observation_id", "region_id", "period", "indicator", "as_of"]); if (typeof r.value !== "number" || !Number.isSafeInteger(r.value) || r.value < 0 || typeof r.partial !== "boolean")
        throw new Error("Invalid training count"); checkEvidence(r.evidence); });
    return row;
}
