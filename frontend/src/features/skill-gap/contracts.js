const dims = ['metric', 'unit', 'time', 'geography', 'occupation', 'skill', 'sector', 'taxonomy', 'mapping', 'granularity', 'coverage', 'quality', 'source'];
function obj(v) { if (!v || typeof v !== 'object' || Array.isArray(v))
    throw new Error('Invalid gap metadata'); return v; }
function list(v) { if (!Array.isArray(v))
    throw new Error('Invalid gap collection'); return v; }
function strings(v, keys) { if (keys.some(k => typeof v[k] !== 'string'))
    throw new Error('Invalid gap strings'); }
function evidence(v, sources) { const e = obj(v); strings(e, ['source_id', 'locator', 'raw_sha256']); if (!/^[a-f0-9]{64}$/.test(String(e.raw_sha256)))
    throw new Error('Invalid checksum'); list(e.transformations).forEach(s => { if (typeof s !== 'string')
    throw new Error('Invalid transformation'); }); const source = sources.find(s => s.source_id === e.source_id); if (!source?.connected || source.sha256 !== e.raw_sha256)
    throw new Error('Untraceable evidence'); }
function envelope(v) { const r = obj(v); strings(r, ['version', 'demand_version', 'supply_version', 'base_version']); if (r.data_mode !== 'verified')
    throw new Error('No simulation'); const sources = list(r.sources); sources.forEach(s => { strings(obj(s), ['source_id', 'dataset_name', 'publisher', 'url', 'license']); }); return { r, sources }; }
function measure(v, sources) { if (v === null)
    return null; const r = obj(v); strings(r, ['signal_id', 'source_id', 'source_record_id', 'provenance_id', 'source_version', 'publication_version', 'reference_period', 'period_start', 'period_end', 'geography_level', 'geography_version', 'metric', 'unit', 'original_value', 'original_unit', 'quality_status']); if (typeof r.value !== 'number' || !Number.isFinite(r.value) || r.value < 0 || r.value > Number.MAX_SAFE_INTEGER || r.normalized_value !== r.value || String(r.period_end) < String(r.period_start))
    throw new Error('Invalid source measure'); evidence(r.evidence, sources); obj(r.classifications); return r; }
export function decodeGaps(v) {
    const { r, sources } = envelope(v);
    if (!['READY', 'PARTIAL', 'NOT_READY', 'EMPTY', 'UNAVAILABLE'].includes(String(r.status)) || !Number.isSafeInteger(r.total) || !Number.isSafeInteger(r.calculated_total))
        throw new Error('Invalid gap state');
    list(r.items).forEach(value => {
        const a = obj(value);
        strings(a, ['result_id', 'engine_version', 'compatibility_status', 'quality_status']);
        if (a.schema_version !== 'gap-1.0' || !['READY', 'PARTIAL', 'NOT_READY'].includes(String(a.readiness)))
            throw new Error('Unsupported gap schema');
        const d = measure(a.demand, sources), s = measure(a.supply, sources);
        const checks = list(a.checks).map(obj);
        checks.forEach(c => { strings(c, ['dimension', 'reason_code', 'explanation']); if (![...dims, 'observations'].includes(String(c.dimension)) || !['COMPATIBLE', 'INCOMPATIBLE', 'INSUFFICIENT_EVIDENCE'].includes(String(c.status)))
            throw new Error('Invalid check'); });
        list(a.evidence).forEach(e => evidence(e, sources));
        list(a.transformations);
        list(a.limitations);
        list(a.quality_flags);
        list(a.reason_codes);
        if (a.readiness !== 'READY') {
            if (a.gap_status !== 'UNAVAILABLE' || [a.gap_value, a.coverage_ratio, a.uncovered_amount, a.gap_direction].some(n => n !== null))
                throw new Error('Non-ready arithmetic forbidden');
        }
        else {
            if (!d || !s || a.gap_status !== 'DERIVED' || a.compatibility_status !== 'COMPATIBLE' || !a.method_id || !a.method_version || !a.methodology || a.quality_status !== 'VALID'
                || dims.some(dim => checks.filter(c => c.dimension === dim && c.status === 'COMPATIBLE').length !== 1) || checks.length !== dims.length
                || d.unit !== s.unit || d.period_type !== s.period_type || d.period_start !== s.period_start || d.period_end !== s.period_end
                || d.geography_id !== s.geography_id || d.geography_level !== s.geography_level || d.geography_version !== s.geography_version
                || d.coverage_fraction !== 1 || s.coverage_fraction !== 1 || !d.coverage_population || d.coverage_population !== s.coverage_population
                || !['OBSERVED', 'DERIVED'].includes(d.status) || !['OBSERVED', 'DERIVED'].includes(s.status) || d.quality_status !== 'VALID' || s.quality_status !== 'VALID')
                throw new Error('Unreviewed calculation');
            evidence(d.coverage_evidence, sources);
            evidence(s.coverage_evidence, sources);
            const gap = d.value - s.value, ratio = d.value === 0 ? null : s.value / d.value;
            if (typeof a.gap_value !== 'number' || !Number.isFinite(a.gap_value) || Math.abs(a.gap_value - gap) > Number.EPSILON * Math.max(1, Math.abs(gap)) * 4
                || a.uncovered_amount !== Math.max(a.gap_value, 0) || a.coverage_ratio !== ratio
                || a.gap_direction !== (gap > 0 ? 'SHORTFALL' : gap < 0 ? 'SURPLUS' : 'BALANCED'))
                throw new Error('Invalid arithmetic');
        }
    });
    return r;
}
export function decodeGapCoverage(v) {
    const { r } = envelope(v), o = obj(r.options);
    list(o.geographies).forEach(g => strings(obj(g), ['geography_id', 'name', 'geography_level']));
    for (const k of ['reference_period', 'skill_code', 'occupation_code', 'sector_code', 'readiness', 'quality_status', 'gap_direction'])
        list(o[k]);
    list(r.items).forEach(i => strings(obj(i), ['dimension', 'readiness', 'gap_status']));
    return r;
}
