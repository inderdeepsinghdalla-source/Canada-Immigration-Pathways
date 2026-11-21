import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { DATA_LAST_CHECKED, DRAWS_DATA, POOL_SNAPSHOT, QUOTA_BARS } from '../data/immigrationData';
import { Lang } from '../types';
import { tText } from '../utils/profileStorage';
import { DisclaimerBanner } from './DisclaimerBanner';

interface Props {
  lang: Lang;
}

const OFFICIAL_LIVE_LINKS = [
  {
    en: 'IRCC Express Entry Rounds (Live)',
    pa: 'IRCC ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਡਰਾਅ (ਲਾਈਵ)',
    url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations.html'
  },
  {
    en: 'Ontario OINP Updates',
    pa: 'ਓਂਟਾਰੀਓ OINP ਅੱਪਡੇਟ',
    url: 'https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp'
  },
  {
    en: 'BC PNP Invitations',
    pa: 'BC PNP ਸੱਦੇ',
    url: 'https://www.welcomebc.ca/immigrate-to-b-c/invitations-to-apply'
  },
  {
    en: 'Alberta AAIP Processing & Draws',
    pa: 'ਅਲਬਰਟਾ AAIP ਡਰਾਅ',
    url: 'https://www.alberta.ca/aaip-processing-information'
  },
  {
    en: 'Manitoba MPNP Draws',
    pa: 'ਮੈਨੀਟੋਬਾ MPNP ਡਰਾਅ',
    url: 'https://immigratemanitoba.com/notices/eoi-draw/'
  }
];

export function DrawsTrackerView({ lang }: Props) {
  const pa = lang === 'pa';
  const [filter, setFilter] = useState('all');

  const filteredDraws = DRAWS_DATA.filter((d) => {
    if (filter === 'all') return true;
    if (filter === 'Federal') return d.scope === 'Federal';
    if (filter === 'Province') return d.scope === 'Province';
    return d.prov === filter;
  });

  return (
    <div className="space-y-8">
      <DisclaimerBanner lang={lang} />

      {/* Pause Status & Summary Banner */}
      <section className="rounded-2xl border border-amber-300 bg-amber-50/75 p-4 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-wide text-amber-900">
              {pa ? `ਡੇਟਾ ਜਾਂਚ: ${DATA_LAST_CHECKED} · 3 ਨਵੰਬਰ 2026 ਤੋਂ EE ਡਰਾਅ ਰੁਕੇ ਹਨ` : `Data verified: ${DATA_LAST_CHECKED} · Express Entry Paused Since 3 Nov 2026`}
            </div>
            <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold text-slate-900">
              {pa ? 'ਲਾਈਵ 2026 ਡਰਾਅ ਅਤੇ ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਪੂਲ ਟਰੈਕਰ' : '2026 Draws & Express Entry Pool Tracker'}
            </h1>
            <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
              {pa
                ? 'ਆਖਰੀ ਫੈਡਰਲ ਰਾਊਂਡ #453 (28 ਅਕਤੂਬਰ 2026 — ਟ੍ਰਾਂਸਪੋਰਟ, 150 ITAs, CRS 477) ਸੀ। 3 ਨਵੰਬਰ ਨੂੰ ਬਿਨਾਂ LMIA ਦੇ 150 CRS ਅੰਕਾਂ ਵਾਲਾ ਨਿਯਮ ਅਤੇ 17 ਨਵੰਬਰ ਨੂੰ ਰਿਸਰਚ/ਪੋਸਟ-ਸੈਕੰਡਰੀ ਨਿਯਮ ਅੱਪਡੇਟ ਕੀਤੇ ਗਏ ਹਨ, ਜਦਕਿ ਸੂਬਾਈ PNP ਡਰਾਅ (MB, NL, NWT, BC, NB, PEI) ਲਗਾਤਾਰ ਜਾਰੀ ਹਨ।'
                : 'Last federal round was #453 on 28 Oct 2026 (Transport, 150 ITAs, CRS 477). IRCC paused federal draws on 3 Nov 2026 to recalculate profiles for the new 150-pt Labour Market Integration factor (plus 17 Nov researcher compensation rules), while provincial PNP draws (MB, NL, NWT, BC, NB, PEI) remain active.'}
            </p>
          </div>
          <div className="w-full sm:w-auto rounded-xl border border-amber-300 bg-white px-4 py-3 flex sm:block items-center justify-between sm:text-right shrink-0">
            <div className="text-xs text-slate-500">{pa ? '2026 ਕੁੱਲ ਫੈਡਰਲ' : '2026 Federal YTD'}</div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums font-mono">
              65 {pa ? 'ਰਾਊਂਡ' : 'rounds'} · 149,409 ITAs
            </div>
          </div>
        </div>

        {/* Official Live Verification Portals */}
        <div className="mt-4 pt-4 border-t border-amber-200/80 space-y-2">
          <div className="text-xs font-bold text-amber-950">
            {pa ? 'ਅਧਿਕਾਰਤ ਲਾਈਵ ਪੰਨੇ:' : 'Verify live draws on official portals:'}
          </div>
          <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-2 pb-0.5">
            {OFFICIAL_LIVE_LINKS.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[40px] shrink-0 rounded-lg border border-amber-300/90 bg-white px-3 py-1.5 text-xs font-semibold text-red-800 hover:bg-amber-100/50 transition-colors whitespace-nowrap"
              >
                <span>{pa ? link.pa : link.en}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pool Snapshot & Quota Bars */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
          <div className="text-xs font-medium text-slate-500">{pa ? '25 ਅਕਤੂਬਰ 2026 ਸਨੈਪਸ਼ਾਟ' : '25 Oct 2026 Pool Snapshot'}</div>
          <h2 className="mt-1 text-xl font-bold text-slate-900">
            {pa ? 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਪੂਲ (ਕੁੱਲ: 228,724)' : 'Express Entry Pool Breakdown (228,724 Total)'}
          </h2>
          <p className="mt-1 text-sm font-semibold text-red-700 tabular-nums">
            {pa ? 'ਸਿਰਫ਼ 21,322 ਉਮੀਦਵਾਰ ਹੀ CRS 500 ਤੋਂ ਉੱਪਰ ਹਨ (9.3%)।' : 'Only 21,322 candidates sit above CRS 500 (9.3% of the pool).'}
          </p>

          <div className="mt-4 space-y-3">
            {POOL_SNAPSHOT.map((row) => {
              const high = row.range === '601+' || row.range === '501–600';
              return (
                <div key={row.range}>
                  <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-800 tabular-nums">
                    <span>CRS {row.range}</span>
                    <span className="font-mono">
                      {row.count.toLocaleString()} ({row.pct}%)
                    </span>
                  </div>
                  <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${high ? 'bg-red-600' : 'bg-slate-700'}`}
                      style={{ width: `${Math.max(2, row.pct * 2.5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
          <div className="text-xs font-medium text-slate-500">{pa ? '2026 ਸੂਬਾਈ ਕੋਟਾ' : '2026 Provincial Allocations'}</div>
          <h2 className="mt-1 text-xl font-bold text-slate-900">
            {pa ? 'ਸੂਬਾਈ PNP ਕੋਟਾ ਪ੍ਰਗਤੀ' : 'Provincial Quota Usage Bars'}
          </h2>
          <div className="mt-4 space-y-4">
            {QUOTA_BARS.map((q) => {
              const barColor =
                q.tone === 'full' ? 'bg-red-600' : q.tone === 'warning' ? 'bg-amber-600' : 'bg-emerald-700';
              return (
                <div key={q.prov.en}>
                  <div className="flex flex-wrap justify-between gap-2 text-xs sm:text-sm font-semibold text-slate-900 tabular-nums">
                    <span>{tText(q.prov, lang)}</span>
                    <span className="text-slate-600 font-mono">{tText(q.detail, lang)}</span>
                  </div>
                  <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${barColor}`} style={{ width: `${q.pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filterable Draws — Mobile Cards + Desktop Table */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-900">
            {pa ? 'ਤਾਜ਼ਾ ਫੈਡਰਲ ਅਤੇ ਸੂਬਾਈ ਡਰਾਅ (ਨਵੰਬਰ 2026)' : 'Recent Federal & Provincial Draws (Updated Nov 2026)'}
          </h2>
          <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1 w-full lg:w-auto">
            {[
              'all',
              'Federal',
              'Province',
              'Manitoba',
              'BC',
              'Alberta',
              'Ontario',
              'Saskatchewan',
              'New Brunswick',
              'Newfoundland',
              'PEI',
              'NWT',
              'Nova Scotia'
            ].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`min-h-[40px] shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  filter === f ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f === 'all' ? (pa ? 'ਸਾਰੇ' : 'All') : f}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden mt-4 space-y-3">
          {filteredDraws.map((d) => (
            <article key={d.id} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-600 tabular-nums">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-slate-900">{d.id}</span>
                  <span aria-hidden="true">·</span>
                  <span>{d.scope}</span>
                  <span aria-hidden="true">·</span>
                  <span>{d.date}</span>
                </div>
                <span className="font-mono font-bold text-red-700">{d.crs}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{tText(d.program, lang)}</h3>
              <div className="text-xs font-mono font-semibold text-slate-800 tabular-nums">
                {pa ? 'ਸੱਦੇ / ਕੋਟਾ:' : 'ITAs / Quota:'} {d.itas}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{tText(d.note, lang)}</p>
            </article>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block mt-4 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-100 text-slate-800">
              <tr>
                <th className="px-3 py-3 font-bold">ID</th>
                <th className="px-3 py-3 font-bold">{pa ? 'ਪੱਧਰ' : 'Scope'}</th>
                <th className="px-3 py-3 font-bold">{pa ? 'ਮਿਤੀ' : 'Date'}</th>
                <th className="px-3 py-3 font-bold">{pa ? 'ਪ੍ਰੋਗਰਾਮ' : 'Program / Category'}</th>
                <th className="px-3 py-3 font-bold tabular-nums">ITAs / Quota</th>
                <th className="px-3 py-3 font-bold tabular-nums">CRS / Cut-off</th>
                <th className="px-3 py-3 font-bold">{pa ? 'ਵੇਰਵਾ' : 'Notes'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredDraws.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="px-3 py-3 font-mono font-bold text-slate-900 whitespace-nowrap">{d.id}</td>
                  <td className="px-3 py-3 font-semibold text-xs text-slate-700">{d.scope}</td>
                  <td className="px-3 py-3 text-slate-700 whitespace-nowrap tabular-nums">{d.date}</td>
                  <td className="px-3 py-3 font-semibold text-slate-900">{tText(d.program, lang)}</td>
                  <td className="px-3 py-3 font-mono tabular-nums text-slate-800 whitespace-nowrap">{d.itas}</td>
                  <td className="px-3 py-3 font-mono font-bold tabular-nums text-red-700 whitespace-nowrap">{d.crs}</td>
                  <td className="px-3 py-3 text-xs sm:text-sm text-slate-600">{tText(d.note, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
