import { adjacent, annual, array, choice, count, equal, evidence, nullableNumber, number, object, point, sameRecord, sources, strings, text } from '../phase5/validation';
export const signalTypes = ['DEMAND_ACCELERATION', 'SUPPLY_ACCELERATION', 'DEMAND_SUPPLY_DIVERGENCE', 'REGIONAL_DEMAND_ANOMALY', 'EMERGING_SKILL_SIGNAL', 'DECLINING_SKILL_SIGNAL', 'TRAINING_PRESSURE', 'DATA_COVERAGE_WARNING', 'LABOUR_INDICATOR_CHANGE', 'TRAINING_OUTPUT_ACCELERATION'];
function base(v) { const r = object(v); text(r.version); text(r.engine_version); if (r.data_mode !== 'verified')
    throw Error('Unverified warnings'); const registry = sources(r.sources); return { r, registry }; }
function readiness(v, registry) { const r = object(v); choice(r.signal_type, signalTypes); choice(r.status, ['READY', 'NOT_READY', 'UNAVAILABLE', 'INSUFFICIENT_HISTORY', 'MISSING_PERIODS', 'INCOMPATIBLE_SERIES', 'INSUFFICIENT_COVERAGE', 'QUALITY_RESTRICTION']); text(r.reason); strings(r.reason_codes); strings(r.required_data); count(r.eligible_series); count(r.minimum_history); array(r.checks).forEach(v => { const c = object(v); text(c.code); text(c.explanation); if (typeof c.passed !== 'boolean')
    throw Error('Invalid readiness check'); }); array(r.evidence).forEach(v => evidence(v, registry)); if (r.status === 'READY' && (number(r.eligible_series) < 1 || array(r.checks).some(v => !object(v).passed)) || r.status !== 'READY' && r.eligible_series !== 0)
    throw Error('Incoherent readiness'); }
function warning(v, registry) {
    const w = object(v);
    ['signal_id', 'entity_id', 'entity_name', 'period', 'confidence_or_qualification'].forEach(k => text(w[k]));
    choice(w.signal_type, signalTypes);
    choice(w.entity_type, ['labour_indicator', 'training_output', 'data_coverage']);
    choice(w.severity, ['INFO', 'REVIEW']);
    if (w.status !== 'DERIVED')
        throw Error('Unsupported warning claim');
    const g = object(w.geography);
    text(g.geography_name);
    text(g.geography_level);
    if (g.geography_id !== null)
        text(g.geography_id);
    const observations = array(w.observed_values).map(v => point(v, registry));
    const d = object(w.derived_metrics);
    ['absolute_change', 'growth_percent', 'previous_growth_percent', 'acceleration_pp'].forEach(k => nullableNumber(d[k]));
    if (count(d.observed_period_count) !== observations.length)
        throw Error('Invalid observation count');
    const rule = object(w.trigger_rule);
    text(rule.rule_id);
    text(rule.version);
    text(rule.methodology);
    count(rule.minimum_history);
    nullableNumber(rule.threshold);
    choice(rule.operator, ['>=', 'REQUIRED']);
    strings(w.limitations);
    const allEvidence = array(w.evidence).map(v => evidence(v, registry));
    const ids = new Set(observations.map(p => p.observation_id));
    if (!observations.length || ids.size !== observations.length || rule.version !== 'historical-review-rules-1.0')
        throw Error('Invalid warning lineage');
    array(w.provenance).forEach(v => { const p = object(v); text(p.source_id); text(p.source_version); text(p.publication_version); strings(p.observation_ids).forEach(id => { if (!ids.has(id))
        throw Error('Unbound provenance'); }); });
    observations.forEach(p => { if (p.identity.geography_id !== g.geography_id || !allEvidence.some(e => e.source_id === p.evidence.source_id && e.raw_sha256 === p.evidence.raw_sha256 && e.locator === p.evidence.locator) || !array(w.provenance).some(v => { const r = object(v); return r.source_id === p.source_id && r.source_version === p.source_version && r.publication_version === p.publication_version && strings(r.observation_ids).includes(p.observation_id); }))
        throw Error('Missing observed evidence'); });
    if (w.signal_type === 'DATA_COVERAGE_WARNING') {
        if (w.severity !== 'INFO' || w.entity_type !== 'data_coverage' || rule.operator !== 'REQUIRED' || rule.threshold !== null || rule.threshold_unit !== null || d.change_unit !== null || ['absolute_change', 'growth_percent', 'previous_growth_percent', 'acceleration_pp'].some(k => d[k] !== null))
            throw Error('Coverage notice contains unsupported metrics');
    }
    else {
        if (!['LABOUR_INDICATOR_CHANGE', 'TRAINING_OUTPUT_ACCELERATION'].includes(String(w.signal_type)) || w.severity !== 'REVIEW' || rule.operator !== '>=' || !observations.length || observations.some(p => p.partial || p.quality_status !== 'VALID') || observations.length < number(rule.minimum_history))
            throw Error('Ungated warning');
        const a = observations.at(-2), b = observations.at(-1);
        if (!a || number(rule.threshold) <= 0 || rule.threshold_unit !== 'percentage points' || !observations.every(annual) || observations.some((p, i) => i > 0 && (!adjacent(observations[i - 1], p) || p.unit !== b.unit || p.source_id !== b.source_id || p.source_version !== b.source_version || p.publication_version !== b.publication_version || !sameRecord(p.identity, b.identity))) || w.period !== b.period || w.comparison_period !== a.period)
            throw Error('Incompatible warning observations');
        equal(d.absolute_change, b.value - a.value);
        if (a.value === 0) {
            if (d.growth_percent !== null)
                throw Error('Growth from zero');
        }
        else
            equal(d.growth_percent, 100 * (b.value - a.value) / a.value);
        if (w.signal_type === 'LABOUR_INDICATOR_CHANGE') {
            if (observations.length !== 2 || rule.minimum_history !== 2 || b.unit !== 'percent' || d.change_unit !== 'percentage points' || w.entity_type !== 'labour_indicator' || b.identity.family !== 'labour' || !['LFPR', 'WPR', 'UR'].includes(String(b.identity.metric)) || b.identity.frequency !== 'ANNUAL' || rule.rule_id !== 'labour_indicator_change-latest-complete' || Math.abs(number(d.absolute_change)) < number(rule.threshold))
                throw Error('Labour threshold not met');
            if (d.previous_growth_percent !== null || d.acceleration_pp !== null)
                throw Error('Unsubstantiated acceleration');
        }
        else {
            const previous = observations.at(-3);
            if (observations.length !== 3 || rule.minimum_history !== 3 || w.entity_type !== 'training_output' || b.unit !== 'persons' || d.change_unit !== 'persons' || b.identity.family !== 'supply' || !['TRAINED', 'CERTIFIED'].includes(String(b.identity.metric)) || b.identity.frequency !== 'FISCAL_YEAR' || rule.rule_id !== 'training_output_acceleration-latest-complete' || previous.value <= 0 || a.value <= 0)
                throw Error('Unsupported training warning');
            const oldGrowth = 100 * (a.value - previous.value) / previous.value, growth = 100 * (b.value - a.value) / a.value;
            equal(d.previous_growth_percent, oldGrowth);
            equal(d.growth_percent, growth);
            equal(d.acceleration_pp, growth - oldGrowth);
            if (growth <= 0 || number(d.acceleration_pp) < number(rule.threshold))
                throw Error('Training threshold not met');
        }
    }
}
export function decodeWarnings(v) { const { r, registry } = base(v); choice(r.status, ['AVAILABLE', 'UNAVAILABLE', 'EMPTY']); count(r.total); array(r.items).forEach(v => warning(v, registry)); array(r.readiness).forEach(v => readiness(v, registry)); if (r.status !== 'AVAILABLE' && (array(r.items).length || r.total !== 0) || array(r.items).length > number(r.total))
    throw Error('Invalid unavailable warning output'); return r; }
export function decodeWarningCoverage(v) { const { r, registry } = base(v); choice(r.status, ['READY', 'NOT_READY']); count(r.total_signals); array(r.items).forEach(v => readiness(v, registry)); array(r.active_signal_types).forEach(v => choice(v, signalTypes)); const options = object(r.options); array(options.signal_types).forEach(v => choice(v, signalTypes)); array(options.geographies).forEach(v => { const g = object(v); text(g.geography_id); text(g.geography_name); text(g.geography_level); }); strings(r.limitations); return r; }
