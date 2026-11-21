import { Printer, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DATA_LAST_CHECKED } from '../data/immigrationData';
import { AppSection, Lang, WizardState } from '../types';
import { getWizardRecommendations } from '../utils/calculators';
import { tText } from '../utils/profileStorage';
import { DisclaimerBanner } from './DisclaimerBanner';

interface Props {
  lang: Lang;
  wiz: WizardState;
  onChangeWiz: (next: WizardState) => void;
  onAdoptPathway: (planKey: string) => void;
  onNavigate: (sec: AppSection) => void;
}

export function StartHereView({ lang, wiz, onChangeWiz, onAdoptPathway, onNavigate }: Props) {
  const pa = lang === 'pa';
  const rec = getWizardRecommendations(wiz);

  const q1Opts: { id: WizardState['where']; en: string; pa: string }[] = [
    { id: 'outside', en: 'Outside Canada', pa: 'ਕੈਨੇਡਾ ਤੋਂ ਬਾਹਰ' },
    { id: 'worker', en: 'Inside Canada (Work Permit)', pa: 'ਕੈਨੇਡਾ ਅੰਦਰ (ਵਰਕ ਪਰਮਿਟ)' },
    { id: 'student', en: 'Inside Canada (Student / PGWP)', pa: 'ਕੈਨੇਡਾ ਅੰਦਰ (ਵਿਦਿਆਰਥੀ / PGWP)' },
    { id: 'visitor', en: 'Inside Canada (Visitor)', pa: 'ਕੈਨੇਡਾ ਅੰਦਰ (ਵਿਜ਼ਿਟਰ)' }
  ];

  const q2Opts: { id: WizardState['job']; en: string; pa: string }[] = [
    { id: 'yes_valid', en: 'Yes — Skilled Employer Offer', pa: 'ਹਾਂ — ਹੁਨਰਮੰਦ ਜੌਬ ਆਫਰ' },
    { id: 'yes_trade', en: 'Yes — Trades / Rural / Atlantic Offer', pa: 'ਹਾਂ — ਟ੍ਰੇਡਜ਼ / ਪੇਂਡੂ / ਅਟਲਾਂਟਿਕ ਆਫਰ' },
    { id: 'no', en: 'No Canadian job offer', pa: 'ਕੋਈ ਕੈਨੇਡੀਅਨ ਜੌਬ ਆਫਰ ਨਹੀਂ' }
  ];

  const q3Opts: { id: WizardState['lang']; en: string; pa: string }[] = [
    { id: 'clb9', en: 'High English (CLB 9+ / IELTS 8,7,7,7)', pa: 'ਉੱਚ ਅੰਗਰੇਜ਼ੀ (CLB 9+)' },
    { id: 'clb7', en: 'Good English (CLB 7–8 / IELTS 6.0+ each)', pa: 'ਚੰਗੀ ਅੰਗਰੇਜ਼ੀ (CLB 7–8)' },
    { id: 'clb5', en: 'Moderate English (CLB 5–6)', pa: 'ਦਰਮਿਆਨੀ ਅੰਗਰੇਜ਼ੀ (CLB 5–6)' },
    { id: 'french', en: 'French Speaker (NCLC 7+ or Bilingual)', pa: 'ਫ੍ਰੈਂਚ (NCLC 7+ ਜਾਂ ਦੋਵੇਂ ਭਾਸ਼ਾਵਾਂ)' },
    { id: 'low', en: 'Still learning (Below CLB 5)', pa: 'ਹਾਲੇ ਸਿੱਖ ਰਹੇ ਹੋ (< CLB 5)' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="rounded-2xl sm:rounded-3xl bg-slate-900 text-white p-5 sm:p-10 shadow-sm overflow-hidden">
        <div className="text-xs font-medium tracking-wide text-slate-300">
          <span>{pa ? 'ਕੈਨੇਡਾ PR ਗਾਈਡ 2026' : 'Canada PR Guide 2026'}</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span>{pa ? `ਡੇਟਾ ਜਾਂਚ: ${DATA_LAST_CHECKED}` : `Data verified ${DATA_LAST_CHECKED}`}</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span>{pa ? 'ਸਧਾਰਨ ਪੰਜਾਬੀ ਅਤੇ English' : 'Plain English & ਪੰਜਾਬੀ'}</span>
        </div>

        <h1 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl leading-[1.12]">
          {pa ? 'ਕੈਨੇਡਾ PR ਦਾ ਆਪਣਾ ਸਹੀ ਰਸਤਾ ਲੱਭੋ' : 'Find YOUR way to Canada PR'}
        </h1>

        <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          {pa
            ? 'ਇੱਕ ਸਧਾਰਨ, ਭਰੋਸੇਮੰਦ ਗਾਈਡ ਜੋ ਹਰ ਔਖੇ ਸ਼ਬਦ ਨੂੰ ਪਹਿਲੀ ਵਾਰ ਸਮਝਾਉਂਦੀ ਹੈ — ਹੁਨਰਮੰਦ ਕਾਮਿਆਂ, ਵਿਦਿਆਰਥੀਆਂ, ਟ੍ਰੇਡਜ਼, ਪਰਿਵਾਰਾਂ ਅਤੇ ਫ੍ਰੈਂਚ ਬੋਲਣ ਵਾਲਿਆਂ ਲਈ।'
            : 'Clear pathways, plain explanations of every term, live 2026 draw figures, and offline tools built for skilled workers, students, tradespeople, families, and French speakers.'}
        </p>

        <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row gap-3">
          <a
            href="#start-wizard"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[48px] rounded-xl bg-red-600 px-6 py-3 text-sm sm:text-base font-semibold text-white hover:bg-red-700 transition-colors"
          >
            <span>{pa ? '3-ਸਵਾਲਾਂ ਵਾਲਾ ਵਿਜ਼ਾਰਡ ਸ਼ੁਰੂ ਕਰੋ' : 'Start 3-Question Finder'}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => onNavigate('checker')}
            className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] rounded-xl border border-slate-600 bg-slate-800/70 px-5 py-3 text-sm sm:text-base font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {pa ? 'ਪੂਰੀ ਯੋਗਤਾ ਜਾਂਚ' : 'Full Eligibility Checker'}
          </button>
        </div>

        {/* 2026 Key Targets Strip */}
        <div className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-slate-800 pt-5 sm:pt-6">
          <div>
            <div className="text-xl sm:text-3xl font-bold tabular-nums font-mono text-white">380,000</div>
            <div className="mt-1 text-xs sm:text-sm text-slate-300">
              {pa ? '2026 ਕੁੱਲ ਕੈਨੇਡਾ PR ਟੀਚਾ' : '2026 Canada PR Target'}
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-3xl font-bold tabular-nums font-mono text-white">~109,000</div>
            <div className="mt-1 text-xs sm:text-sm text-slate-300">
              {pa ? 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ (EE) ਟੀਚਾ' : 'Express Entry Target'}
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-3xl font-bold tabular-nums font-mono text-white">~91,500</div>
            <div className="mt-1 text-xs sm:text-sm text-slate-300">
              {pa ? 'ਸੂਬਾਈ ਨਾਮਜ਼ਦਗੀ (PNP) ਟੀਚਾ' : 'Provincial Nominee (PNP) Target'}
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-3xl font-bold tabular-nums font-mono text-white">149,409</div>
            <div className="mt-1 text-xs sm:text-sm text-slate-300">
              {pa ? '2026 ITAs (65 ਡਰਾਅ, 3 ਨਵੰ ਤੱਕ)' : '2026 ITAs Issued (65 Rounds)'}
            </div>
          </div>
        </div>
      </section>

      <DisclaimerBanner lang={lang} />

      {/* 3-Question Start Here Wizard */}
      <section id="start-wizard" className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs print-card">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {pa ? 'ਇੱਥੋਂ ਸ਼ੁਰੂ ਕਰੋ — 3 ਸਵਾਲਾਂ ਵਾਲੀ ਖੋਜ' : 'Start Here — 3-Question Pathway Finder'}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {pa
                ? 'ਆਪਣੀ ਸਥਿਤੀ ਚੁਣੋ ਅਤੇ ਹੇਠਾਂ ਆਪਣੇ 2–3 ਸਭ ਤੋਂ ਵਧੀਆ PR ਰਸਤੇ ਤੇ ਪ੍ਰਿੰਟ ਕਰਨ ਯੋਗ ਚੈੱਕਲਿਸਟ ਦੇਖੋ।'
                : 'Pick your answers below to see your best 2–3 PR routes, action plan, and printable next-steps checklist.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="no-print inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[44px] rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer shrink-0"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            <span>{pa ? 'ਪਲਾਨ ਪ੍ਰਿੰਟ ਕਰੋ' : 'Print Action Plan'}</span>
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* Q1 */}
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {pa ? '1. ਤੁਸੀਂ ਇਸ ਵੇਲੇ ਕਿੱਥੇ ਹੋ?' : '1. Where are you right now?'}
            </h3>
            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {q1Opts.map((opt) => {
                const active = wiz.where === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChangeWiz({ ...wiz, where: opt.id })}
                    className={`min-h-[48px] rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'border-red-600 bg-red-50 text-red-900'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {pa ? opt.pa : opt.en}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Q2 */}
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {pa ? '2. ਕੀ ਤੁਹਾਡੇ ਕੋਲ ਕੈਨੇਡਾ ਦਾ ਜੌਬ ਆਫਰ ਹੈ?' : '2. Do you have a Canadian job offer?'}
            </h3>
            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {q2Opts.map((opt) => {
                const active = wiz.job === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChangeWiz({ ...wiz, job: opt.id })}
                    className={`min-h-[48px] rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'border-red-600 bg-red-50 text-red-900'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {pa ? opt.pa : opt.en}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Q3 */}
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {pa ? '3. ਤੁਹਾਡਾ ਅੰਗਰੇਜ਼ੀ / ਫ੍ਰੈਂਚ ਪੱਧਰ ਕੀ ਹੈ? (CLB = ਕੈਨੇਡੀਅਨ ਭਾਸ਼ਾ ਪੱਧਰ)' : '3. What is your English / French level? (CLB = Canadian Language Benchmark)'}
            </h3>
            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {q3Opts.map((opt) => {
                const active = wiz.lang === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChangeWiz({ ...wiz, lang: opt.id })}
                    className={`min-h-[48px] rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'border-red-600 bg-red-50 text-red-900'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {pa ? opt.pa : opt.en}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Personalized Output */}
        <div className="mt-8 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-bold text-slate-900">
            {pa ? 'ਤੁਹਾਡੇ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ 2–3 PR ਰਸਤੇ' : 'Your Best 2–3 Recommended Pathways'}
          </h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {rec.paths.map((p, idx) => (
              <div
                key={`${p.planKey}-${idx}`}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <div>
                  <div className="text-xs font-semibold text-red-700">
                    {pa ? `ਵਿਕਲਪ #${idx + 1}` : `Recommendation #${idx + 1}`}
                  </div>
                  <h4 className="mt-1 text-base font-bold text-slate-900">{tText(p.title, lang)}</h4>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{tText(p.why, lang)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onAdoptPathway(p.planKey)}
                  className="no-print mt-4 min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 cursor-pointer"
                >
                  {pa ? 'My Plan ਵਿੱਚ ਸੇਵ ਕਰੋ' : 'Save to My Plan'}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
            <h4 className="text-base font-bold text-slate-900">
              {pa ? 'ਤੁਹਾਡੇ ਅਗਲੇ ਕਦਮ (ਪ੍ਰਿੰਟ ਕਰਨ ਯੋਗ)' : 'Your Printable Next-Steps Checklist'}
            </h4>
            <ol className="mt-3 space-y-2.5 text-sm text-slate-700">
              {rec.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                  <span>{tText(s, lang)}</span>
                </li>
              ))}
            </ol>
            <div className="no-print mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('checker')}
                className="min-h-[44px] rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 cursor-pointer"
              >
                {pa ? 'ਵਿਸਤ੍ਰਿਤ ਯੋਗਤਾ ਜਾਂਚ ਕਰੋ' : 'Run Detailed Eligibility Check'}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('calculators')}
                className="min-h-[44px] rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 cursor-pointer"
              >
                {pa ? 'ਸਹੀ CRS ਸਕੋਰ ਕੱਢੋ' : 'Calculate Exact CRS Score'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Key Updates */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 no-print">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-base font-bold text-slate-900">
            {pa ? '3 ਨਵੰਬਰ 2026 CRS ਤਬਦੀਲੀ' : 'Nov 3, 2026 CRS Reform'}
          </h3>
          <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
            {pa
              ? 'ਨਵਾਂ ਲੇਬਰ ਮਾਰਕੀਟ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਫੈਕਟਰ ਬਿਨਾਂ LMIA ਦੇ 150 ਤੱਕ CRS ਅੰਕ ਦਿੰਦਾ ਹੈ।'
              : 'New Labour Market Integration factor grants up to 150 CRS points with no LMIA needed.'}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('ee')}
            className="mt-3 text-sm font-semibold text-red-700 hover:underline cursor-pointer"
          >
            {pa ? 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਦੇਖੋ →' : 'Explore Express Entry →'}
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-base font-bold text-slate-900">
            {pa ? '2026 ਲਾਈਵ ਡਰਾਅ ਅਤੇ ਪੂਲ' : 'Live 2026 Draws & Pool'}
          </h3>
          <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
            {pa
              ? '228,724 ਉਮੀਦਵਾਰਾਂ ਵਿੱਚੋਂ ਸਿਰਫ਼ 21,322 ਹੀ 500+ CRS ’ਤੇ ਹਨ। 3 ਨਵੰਬਰ ਤੋਂ ਡਰਾਅ ਰੁਕੇ ਹਨ।'
              : 'Only 21,322 of 228,724 pool candidates sit above 500 CRS. Federal draws paused since 3 Nov 2026.'}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('draws')}
            className="mt-3 text-sm font-semibold text-red-700 hover:underline cursor-pointer"
          >
            {pa ? 'ਲਾਈਵ ਡਰਾਅ ਟਰੈਕਰ ਦੇਖੋ →' : 'View Live Draws Tracker →'}
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-base font-bold text-slate-900">
            {pa ? 'ਧੋਖਾਧੜੀ ਤੋਂ ਸਾਵਧਾਨ ਰਹੋ' : 'Protect Yourself From Scams'}
          </h3>
          <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
            {pa
              ? 'ਕੋਈ ਵੀ LMIA ਜਾਂ ਜੌਬ ਆਫਰ ਨਹੀਂ ਵੇਚ ਸਕਦਾ ਤੇ ਨਾ ਹੀ PR ਦੀ ਗਾਰੰਟੀ ਦੇ ਸਕਦਾ ਹੈ।'
              : 'Nobody can sell an LMIA or guaranteed job offer, and no agent can guarantee PR.'}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('fraud')}
            className="mt-3 text-sm font-semibold text-red-700 hover:underline cursor-pointer"
          >
            {pa ? 'ਧੋਖਾਧੜੀ ਚੇਤਾਵਨੀ ਪੜ੍ਹੋ →' : 'Read Fraud Alert →'}
          </button>
        </div>
      </section>
    </div>
  );
}
