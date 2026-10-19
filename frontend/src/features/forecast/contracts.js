function obj(x) { if (!x || typeof x !== 'object' || Array.isArray(x))
    throw Error('Invalid contract'); return x; }
function arr(x) { if (!Array.isArray(x))
    throw Error('Invalid collection'); return x; }
function num(x) { if (typeof x !== 'number' || !Number.isFinite(x))
    throw Error('Invalid number'); return x; }
function text(x) { if (typeof x !== 'string' || !x)
    throw Error('Invalid metadata'); return x; }
function ev(x) { const e = obj(x); text(e.source_id); text(e.locator); if (!/^[a-f0-9]{64}$/.test(text(e.raw_sha256)))
    throw Error('Invalid evidence'); arr(e.transformations).forEach(text); }
function nullable(x) { if (x !== null)
    num(x); }
function series(x) {
    const s = obj(x);
    text(s.series_id);
    text(s.metric);
    text(s.unit);
    text(s.geography_name);
    obj(s.classification);
    let last = '';
    const ids = new Set();
    arr(s.observations).forEach(v => {
        const p = obj(v);
        const id = text(p.observation_id);
        if (ids.has(id))
            throw Error('Duplicate observation');
        ids.add(id);
        const start = text(p.period_start), end = text(p.period_end);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || start <= last || end < start || p.status !== 'OBSERVED' || p.unit !== s.unit || num(p.value) < 0 || s.unit === 'percent' && num(p.value) > 100 || typeof p.partial !== 'boolean')
            throw Error('Invalid observed history');
        last = start;
        ev(p.evidence);
        text(p.source_id);
        text(p.source_version);
        text(p.publication_version);
        obj(p.identity);
    });
    arr(s.source_ids).forEach(text);
    arr(s.missing_periods).forEach(text);
}
function gate(x) { const g = obj(x); text(g.status); num(g.horizon); arr(g.reason_codes).forEach(text); if (arr(g.checks).length < 8)
    throw Error('Missing readiness checks'); arr(g.checks).forEach(v => { const c = obj(v); text(c.code); if (typeof c.passed !== 'boolean')
    throw Error('Invalid check'); }); }
function base(x) { const r = obj(x); text(r.version); text(r.status); num(r.total); arr(r.sources).forEach(v => { const s = obj(v); text(s.source_id); text(s.publisher); text(s.url); }); return r; }
export function decodeTrends(x) { const r = base(x); arr(r.items).forEach(v => { const a = obj(v); series(a.series); gate(a.readiness); arr(a.changes).forEach(v => { const c = obj(v); nullable(c.absolute_change); nullable(c.growth_percent); if (!['DERIVED', 'UNAVAILABLE'].includes(String(c.status)) || c.status === 'UNAVAILABLE' && (c.absolute_change !== null || c.growth_percent !== null))
    throw Error('Unsupported derived value'); arr(c.evidence).forEach(ev); }); }); return r; }
export function decodeForecast(x) {
    const r = base(x);
    arr(r.items).forEach(v => {
        const f = obj(v);
        series(f.series);
        gate(f.readiness);
        const g = obj(f.readiness), b = obj(f.backtest);
        nullable(b.mae);
        nullable(b.rmse);
        nullable(b.bias);
        if (b.status === 'AVAILABLE') {
            if (num(b.mae) < 0 || num(b.rmse) < 0 || arr(b.folds).length < 3)
                throw Error('Invalid backtest');
            num(b.bias);
            arr(b.folds).forEach(v => { const fold = obj(v); num(fold.observed); num(fold.predicted); num(fold.error); if (arr(fold.training_ids).length < 4 || arr(fold.training_ids).includes(fold.target_id))
                throw Error('Backtest leakage'); });
        }
        else if (b.status !== 'UNAVAILABLE' || b.mae !== null || b.rmse !== null || b.bias !== null || arr(b.folds).length)
            throw Error('Invalid unavailable backtest');
        const projections = arr(f.forecasts);
        if (f.status === 'UNAVAILABLE' && (projections.length || f.generated_at !== null))
            throw Error('Unavailable forecast contains values');
        if (f.status === 'FORECAST' && (g.status !== 'READY' || arr(g.checks).some(v => !obj(v).passed) || b.status !== 'AVAILABLE' || projections.length !== num(f.horizon) || f.horizon !== g.horizon || !f.generated_at || f.quality_status !== 'VALID' || arr(b.folds).length < 3))
            throw Error('Ungated forecast');
        if (!['FORECAST', 'UNAVAILABLE'].includes(String(f.status)))
            throw Error('Invalid forecast status');
        const observed = arr(obj(f.series).observations);
        let last = observed.length ? text(obj(observed[observed.length - 1]).period_end) : '0000-01-01';
        projections.forEach(v => { const p = obj(v), value = num(p.value), start = text(p.period_start), end = text(p.period_end); if (p.status !== 'FORECAST' || num(p.lower) > value || num(p.upper) < value || num(p.lower) < 0 || obj(f.series).unit === 'percent' && num(p.upper) > 100 || start <= last || end < start)
            throw Error('Invalid interval'); last = end; });
        arr(f.evidence).forEach(ev);
    });
    return r;
}
export function decodeCoverage(x) { const r = obj(x); text(r.version); num(r.series_count); num(r.forecast_ready_count); arr(r.families).forEach(v => { const f = obj(v); text(f.family); arr(f.metrics).forEach(text); arr(f.geographies).forEach(v => { const g = obj(v); text(g.id); text(g.name); arr(g.metrics).forEach(text); }); }); return r; }
