import { useRef, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, BookmarkCheck, ArrowRight, Compass, Clock } from 'lucide-react';
import { PNP_PROVINCES } from '../data/immigrationData';
import { ActionPlanItem, EligibilityProfile, Lang, PathwayEvaluation, SavedEligibilitySnapshot } from '../types';
import { evaluateAllPathways, getTopActionPlan } from '../utils/calculators';
import { tText } from '../utils/profileStorage';
import { DisclaimerBanner } from './DisclaimerBanner';

interface Props {
  lang: Lang;
  onSaveSnapshot: (snapshot: SavedEligibilitySnapshot) => void;
  onAdoptPathway: (planKey: string) => void;
}

export function EligibilityView({ lang, onSaveSnapshot, onAdoptPathway }: Props) {
  const pa = lang === 'pa';

  const [profile, setProfile] = useState<EligibilityProfile>({
    age: 28,
    education: 'bach',
    englishClb: 7,
    frenchNclc: 0,
    foreignYears: 2,
    foreignTeer: 1,
    canadianYears: 0,
    canadianTeer: 1,
    jobOffer: 'none',
    provincePref: 'ANY',
    spouse: 'single',
    fundsCad: 16000,
    siblingInCanada: false,
    canadianStudy: 'none'
  });

  const [evaluatedData, setEvaluatedData] = useState<{
    profile: EligibilityProfile;
    results: PathwayEvaluation[];
    actionPlan: ActionPlanItem[];
  } | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'eligible' | 'almost' | 'not'>('all');
  const [savedNotice, setSavedNotice] = useState(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const snapshotProfile = { ...profile };
    const evaluated = evaluateAllPathways(snapshotProfile);
    const actionPlan = getTopActionPlan(snapshotProfile, evaluated);
    setEvaluatedData({ profile: snapshotProfile, results: evaluated, actionPlan });
    setSavedNotice(false);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handleSaveToProfile = () => {
    if (!evaluatedData) return;
    const eligible = evaluatedData.results.filter((r) => r.status === 'eligible');
    const almost = evaluatedData.results.filter((r) => r.status === 'almost');
    onSaveSnapshot({
      savedAt: new Date().toISOString(),
      eligibleCount: eligible.length,
      almostCount: almost.length,
      topEligibleNames: evaluatedData.actionPlan.map((a) => a.evaluation.name.en),
      profile: evaluatedData.profile
    });
    setSavedNotice(true);
  };

  const results = evaluatedData?.results ?? null;
  const actionPlan = evaluatedData?.actionPlan ?? [];
  const filtered = results
    ? results.filter((r) => (filterStatus === 'all' ? true : r.status === filterStatus))
    : [];

  return (
    <div className="space-y-6">
      <DisclaimerBanner lang={lang} />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {pa ? 'ਪੂਰੀ PR ਯੋਗਤਾ ਜਾਂਚ (ਸਾਰੇ ਰਸਤੇ)' : 'Interactive Eligibility Checker — All Canada PR Pathways'}
        </h1>
        <p className="mt-1.5 text-sm text-slate-600 max-w-3xl">
          {pa
            ? 'FSWP, CEC, FSTP, ਸਾਰੇ 11 ਸੂਬਿਆਂ ਦੇ PNP, AIP, RCIP, FCIP, ਕਿਊਬੈਕ PSTQ, ਪਰਿਵਾਰਕ ਸਪਾਂਸਰਸ਼ਿਪ, Start-up Visa ਅਤੇ Study-to-PR ਦੀ ਜਾਂਚ ਕਰੋ। NOC TEER ਦਾ ਮਤਲਬ ਹੈ ਨੌਕਰੀ ਦਾ ਹੁਨਰ ਪੱਧਰ (0–5) ਅਤੇ CLB ਦਾ ਮਤਲਬ ਹੈ ਭਾਸ਼ਾ ਪੱਧਰ।'
            : 'Checks FSWP, CEC, FSTP, all 11 PNPs, AIP, RCIP, FCIP, Quebec PSTQ, Family Sponsorship, Start-up Visa, and Study-to-PR. First-time terms: CLB = Canadian Language Benchmark (1–12); TEER = job skill level (0–5 in Canada’s NOC job list).'}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਉਮਰ (ਸਾਲ)' : 'Age (Years)'}</span>
            <input
              type="number"
              inputMode="numeric"
              min={16}
              max={75}
              className="min-h-[44px] rounded-lg border border-slate-300 px-3 text-base sm:text-sm tabular-nums"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) || 25 })}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਸਭ ਤੋਂ ਉੱਚੀ ਪੜ੍ਹਾਈ' : 'Highest Education'}</span>
            <select
              className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm"
              value={profile.education}
              onChange={(e) => setProfile({ ...profile, education: e.target.value as EligibilityProfile['education'] })}
            >
              <option value="hs">{pa ? 'ਹਾਈ ਸਕੂਲ (12ਵੀਂ)' : 'High School'}</option>
              <option value="1yr">{pa ? '1-ਸਾਲਾ ਡਿਪਲੋਮਾ' : '1-Year Post-Secondary'}</option>
              <option value="2yr">{pa ? '2-ਸਾਲਾ ਡਿਪਲੋਮਾ' : '2-Year Diploma'}</option>
              <option value="bach">{pa ? 'ਬੈਚਲਰ ਡਿਗਰੀ (3+ ਸਾਲ)' : 'Bachelor’s Degree (3+ yrs)'}</option>
              <option value="two">{pa ? '2+ ਡਿਗਰੀਆਂ (ਇੱਕ 3+ ਸਾਲ)' : 'Two+ Credentials (one 3+ yrs)'}</option>
              <option value="mast">{pa ? 'ਮਾਸਟਰ / ਪ੍ਰੋਫੈਸ਼ਨਲ ਡਿਗਰੀ' : 'Master’s / Professional'}</option>
              <option value="phd">PhD / Doctorate</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਅੰਗਰੇਜ਼ੀ ਪੱਧਰ (ਘੱਟੋ-ਘੱਟ CLB 0–12)' : 'English Level (Lowest CLB 0–12)'}</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={12}
              className="min-h-[44px] rounded-lg border border-slate-300 px-3 text-base sm:text-sm tabular-nums"
              value={profile.englishClb}
              onChange={(e) => setProfile({ ...profile, englishClb: Number(e.target.value) || 0 })}
            />
            <span className="text-xs font-normal text-slate-500">
              {pa ? 'CLB 7 = IELTS 6.0 ਹਰ ਭਾਗ · CLB 9 = L8 R7 W7 S7' : 'CLB 7 = IELTS 6.0 each · CLB 9 = L8 R7 W7 S7'}
            </span>
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਫ੍ਰੈਂਚ ਪੱਧਰ (ਘੱਟੋ-ਘੱਟ NCLC 0–12)' : 'French Level (Lowest NCLC 0–12)'}</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={12}
              className="min-h-[44px] rounded-lg border border-slate-300 px-3 text-base sm:text-sm tabular-nums"
              value={profile.frenchNclc}
              onChange={(e) => setProfile({ ...profile, frenchNclc: Number(e.target.value) || 0 })}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਵਿਦੇਸ਼ੀ ਕੰਮ ਦਾ ਤਜਰਬਾ (ਸਾਲ)' : 'Foreign Work Experience (Years)'}</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={25}
              step={0.5}
              className="min-h-[44px] rounded-lg border border-slate-300 px-3 text-base sm:text-sm tabular-nums"
              value={profile.foreignYears}
              onChange={(e) => setProfile({ ...profile, foreignYears: Number(e.target.value) || 0 })}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਵਿਦੇਸ਼ੀ ਕੰਮ NOC TEER' : 'Foreign Work NOC TEER'}</span>
            <select
              className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm"
              value={profile.foreignTeer}
              onChange={(e) => setProfile({ ...profile, foreignTeer: Number(e.target.value) })}
            >
              <option value={0}>TEER 0 ({pa ? 'ਮੈਨੇਜਮੈਂਟ' : 'Management'})</option>
              <option value={1}>TEER 1 ({pa ? 'ਡਿਗਰੀ / ਪ੍ਰੋਫੈਸ਼ਨਲ' : 'Degree / Professional'})</option>
              <option value={2}>TEER 2 ({pa ? 'ਟ੍ਰੇਡਜ਼ / ਟੈਕਨੀਸ਼ੀਅਨ' : 'Trades / Tech / Sup.'})</option>
              <option value={3}>TEER 3 ({pa ? 'ਡਿਪਲੋਮਾ / ਹੁਨਰਮੰਦ' : 'Skilled / Diploma'})</option>
              <option value={4}>TEER 4 ({pa ? 'ਇੰਟਰਮੀਡੀਏਟ' : 'Intermediate'})</option>
              <option value={5}>TEER 5 ({pa ? 'ਐਂਟਰੀ ਲੈਵਲ' : 'Entry / Labour'})</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਕੈਨੇਡੀਅਨ ਕੰਮ ਦਾ ਤਜਰਬਾ (ਸਾਲ)' : 'Canadian Work Experience (Years)'}</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={15}
              step={0.5}
              className="min-h-[44px] rounded-lg border border-slate-300 px-3 text-base sm:text-sm tabular-nums"
              value={profile.canadianYears}
              onChange={(e) => setProfile({ ...profile, canadianYears: Number(e.target.value) || 0 })}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਕੈਨੇਡੀਅਨ ਕੰਮ NOC TEER' : 'Canadian Work NOC TEER'}</span>
            <select
              className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm"
              value={profile.canadianTeer}
              onChange={(e) => setProfile({ ...profile, canadianTeer: Number(e.target.value) })}
            >
              <option value={0}>TEER 0</option>
              <option value={1}>TEER 1</option>
              <option value={2}>TEER 2</option>
              <option value={3}>TEER 3</option>
              <option value={4}>TEER 4</option>
              <option value={5}>TEER 5</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਕੈਨੇਡੀਅਨ ਜੌਬ ਆਫਰ' : 'Canadian Job Offer'}</span>
            <select
              className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm"
              value={profile.jobOffer}
              onChange={(e) => setProfile({ ...profile, jobOffer: e.target.value as EligibilityProfile['jobOffer'] })}
            >
              <option value="none">{pa ? 'ਕੋਈ ਜੌਬ ਆਫਰ ਨਹੀਂ' : 'No job offer'}</option>
              <option value="skilled">{pa ? 'ਹਾਂ — ਹੁਨਰਮੰਦ TEER 0–3 ਆਫਰ' : 'Yes — Skilled TEER 0–3 Employer Offer'}</option>
              <option value="aip">{pa ? 'ਹਾਂ — AIP ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਰੁਜ਼ਗਾਰਦਾਤਾ (NB/NS/PE/NL)' : 'Yes — AIP Designated Employer (Atlantic)'}</option>
              <option value="rcip">{pa ? 'ਹਾਂ — RCIP / FCIP ਕਮਿਊਨਿਟੀ ਆਫਰ' : 'Yes — RCIP / FCIP Community Offer'}</option>
              <option value="trade_cert">{pa ? 'ਕੈਨੇਡੀਅਨ ਟ੍ਰੇਡ ਸਰਟੀਫਿਕੇਟ (Red Seal)' : 'Canadian Trade Certificate (Red Seal)'}</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਪਸੰਦੀਦਾ ਸੂਬਾ' : 'Province Preference'}</span>
            <select
              className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm"
              value={profile.provincePref}
              onChange={(e) => setProfile({ ...profile, provincePref: e.target.value })}
            >
              <option value="ANY">{pa ? 'ਕੋਈ ਵੀ ਸੂਬਾ / ਪ੍ਰਦੇਸ਼' : 'Check All Provinces & Territories'}</option>
              {PNP_PROVINCES.map((p) => (
                <option key={p.code} value={p.code}>
                  {tText(p.name, lang)}
                </option>
              ))}
              <option value="QC">{pa ? 'ਕਿਊਬੈਕ' : 'Quebec'}</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਜੀਵਨ ਸਾਥੀ ਦੀ ਸਥਿਤੀ' : 'Spouse / Partner'}</span>
            <select
              className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm"
              value={profile.spouse}
              onChange={(e) => setProfile({ ...profile, spouse: e.target.value as EligibilityProfile['spouse'] })}
            >
              <option value="single">{pa ? 'ਇੱਕਲੇ (Single)' : 'Single / No Partner'}</option>
              <option value="foreign">{pa ? 'ਜੀਵਨ ਸਾਥੀ (ਵਿਦੇਸ਼ੀ)' : 'Partner (Non-Canadian)'}</option>
              <option value="canadian">{pa ? 'ਜੀਵਨ ਸਾਥੀ ਕੈਨੇਡੀਅਨ PR/ਨਾਗਰਿਕ ਹੈ' : 'Partner is Canadian Citizen or PR'}</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਸੈਟਲਮੈਂਟ ਫੰਡ (CAD $)' : 'Settlement Funds (CAD $)'}</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              step={500}
              className="min-h-[44px] rounded-lg border border-slate-300 px-3 text-base sm:text-sm tabular-nums"
              value={profile.fundsCad}
              onChange={(e) => setProfile({ ...profile, fundsCad: Number(e.target.value) || 0 })}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਕੈਨੇਡਾ ਵਿੱਚ ਭਰਾ/ਭੈਣ (PR/ਨਾਗਰਿਕ 18+)?' : 'Sibling in Canada (Citizen/PR 18+)?'}</span>
            <select
              className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm"
              value={profile.siblingInCanada ? '1' : '0'}
              onChange={(e) => setProfile({ ...profile, siblingInCanada: e.target.value === '1' })}
            >
              <option value="0">{pa ? 'ਨਹੀਂ' : 'No'}</option>
              <option value="1">{pa ? 'ਹਾਂ' : 'Yes'}</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਕੈਨੇਡਾ ਵਿੱਚ ਪੜ੍ਹਾਈ ਪੂਰੀ ਕੀਤੀ?' : 'Canadian Study Completed?'}</span>
            <select
              className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm"
              value={profile.canadianStudy}
              onChange={(e) => setProfile({ ...profile, canadianStudy: e.target.value as EligibilityProfile['canadianStudy'] })}
            >
              <option value="none">{pa ? 'ਕੋਈ ਨਹੀਂ' : 'None'}</option>
              <option value="12">{pa ? '1–2 ਸਾਲ ਦੀ ਪੜ੍ਹਾਈ' : '1–2 Year Credential'}</option>
              <option value="3p">{pa ? '3+ ਸਾਲ ਡਿਗਰੀ / ਮਾਸਟਰ / PhD' : '3+ Year / Master’s / PhD'}</option>
            </select>
          </label>

          <div className="sm:col-span-2 lg:col-span-3 pt-2">
            <button
              type="submit"
              className="min-h-[48px] w-full rounded-xl bg-red-600 px-6 py-3 text-base font-semibold text-white hover:bg-red-700 transition-colors cursor-pointer"
            >
              {pa ? 'ਮੇਰੀ ਯੋਗਤਾ ਸਾਰੇ ਰਸਤਿਆਂ ’ਤੇ ਚੈੱਕ ਕਰੋ' : 'Check My Eligibility Across All Pathways'}
            </button>
          </div>
        </form>
      </section>

      {results && (
        <div ref={resultsRef} aria-live="polite" className="space-y-6">
          {/* Personalized Top 3 Action Plan */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700">
                  <Compass className="h-4 w-4" aria-hidden="true" />
                  <span>{pa ? 'ਨਿੱਜੀ ਸਿਫਾਰਸ਼ · ਚੋਟੀ ਦੇ 3 ਰਸਤੇ' : 'Personalized Strategy · Top 3 Matches'}</span>
                </div>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-900">
                  {pa ? 'ਤੁਹਾਡਾ 2026 PR ਐਕਸ਼ਨ ਪਲੈਨ' : 'Your Recommended Action Plan (Top 3 Programs)'}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {pa
                    ? 'ਤੁਹਾਡੀ ਉਮਰ, ਭਾਸ਼ਾ, ਤਜਰਬੇ, ਜੌਬ ਆਫਰ ਅਤੇ ਸੂਬੇ ਦੀ ਪਸੰਦ ਦੇ ਆਧਾਰ ’ਤੇ ਸਭ ਤੋਂ ਢੁੱਕਵੇਂ ਅਤੇ ਸਰਗਰਮ 3 ਫੈਡਰਲ/PNP ਰਸਤੇ।'
                    : 'Automatically ranked from active Federal, Regional, and Provincial streams based on your language scores, work history, offer, and province preference.'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveToProfile}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[44px] rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 cursor-pointer shrink-0"
              >
                <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
                <span>
                  {savedNotice
                    ? pa ? 'ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਸੇਵ ਹੋ ਗਿਆ' : 'Saved to My Profile'
                    : pa ? 'ਨਤੀਜੇ ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਸੇਵ ਕਰੋ' : 'Save Results to My Profile'}
                </span>
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
              {actionPlan.map((plan) => {
                const isTop = plan.rank === 1;
                const isEl = plan.evaluation.status === 'eligible';
                const isAlm = plan.evaluation.status === 'almost';

                return (
                  <article
                    key={plan.evaluation.id}
                    className={`flex flex-col justify-between rounded-xl border p-4 sm:p-5 transition-colors ${
                      isTop
                        ? 'border-red-200 bg-red-50/35'
                        : 'border-slate-200 bg-slate-50/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold tabular-nums ${
                              isTop ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'
                            }`}
                          >
                            {plan.rank}
                          </span>
                          <span className="text-xs font-bold text-slate-700 truncate">
                            {tText(plan.priorityTag, lang)}
                          </span>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-bold shrink-0 ${
                            isEl ? 'text-emerald-700' : isAlm ? 'text-amber-700' : 'text-slate-600'
                          }`}
                        >
                          {isEl && <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />}
                          {isAlm && <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />}
                          {!isEl && !isAlm && <XCircle className="h-3.5 w-3.5" aria-hidden="true" />}
                          <span>
                            {isEl
                              ? pa ? 'ਯੋਗ' : 'Eligible'
                              : isAlm
                                ? pa ? 'ਲਗਭਗ ਯੋਗ' : 'Almost Eligible'
                                : pa ? 'ਵਿਕਲਪਿਕ' : 'Bridge Path'}
                          </span>
                        </span>
                      </div>

                      <h3 className="mt-3 text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {tText(plan.evaluation.name, lang)}
                      </h3>

                      <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                        <span className="font-medium">{tText(plan.evaluation.category, lang)}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1 font-medium text-slate-600">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          <span>{tText(plan.timeline, lang)}</span>
                        </span>
                      </div>

                      <div className="mt-3 rounded-lg bg-white border border-slate-200/80 p-3">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {pa ? 'ਇਹ ਕਿਉਂ ਢੁੱਕਵਾਂ ਹੈ' : 'Why This Fits Your Profile'}
                        </div>
                        <p className="mt-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {tText(plan.whyFits, lang)}
                        </p>
                      </div>

                      <div className="mt-3.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {pa ? 'ਅਗਲੇ 3 ਜ਼ਰੂਰੀ ਕਦਮ' : 'Your Immediate Action Steps'}
                        </div>
                        <ol className="mt-2 space-y-2">
                          {plan.actionSteps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 leading-snug">
                              <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-800 tabular-nums">
                                {sIdx + 1}
                              </span>
                              <span>{tText(step, lang)}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    {plan.evaluation.planKey && (
                      <div className="mt-4 pt-3 border-t border-slate-200/80">
                        <button
                          type="button"
                          onClick={() => onAdoptPathway(plan.evaluation.planKey!)}
                          className={`inline-flex w-full items-center justify-center gap-2 min-h-[44px] rounded-xl px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                            isTop
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-white border border-slate-300 text-slate-900 hover:bg-slate-100'
                          }`}
                        >
                          <span>{pa ? 'My Plan ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ' : 'Start This in My Plan'}</span>
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          {/* Full Pathway-by-Pathway Breakdown */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {pa ? 'ਸਾਰੇ ਰਸਤਿਆਂ ਦੀ ਪੂਰੀ ਸੂਚੀ' : 'Full Pathway-by-Pathway Breakdown'}
                </h2>
                <p className="mt-1 text-sm text-slate-600 tabular-nums">
                  {pa
                    ? `ਯੋਗ: ${results.filter((r) => r.status === 'eligible').length} · ਲਗਭਗ ਯੋਗ: ${results.filter((r) => r.status === 'almost').length} · ਯੋਗ ਨਹੀਂ/ਬੰਦ: ${results.filter((r) => r.status === 'not').length}`
                    : `Eligible: ${results.filter((r) => r.status === 'eligible').length} · Almost eligible: ${results.filter((r) => r.status === 'almost').length} · Not eligible / Paused: ${results.filter((r) => r.status === 'not').length}`}
                </p>
              </div>
            </div>

          <div className="mt-4 flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1 w-full sm:w-fit">
            {[
              { id: 'all', en: 'All', pa: 'ਸਾਰੇ' },
              { id: 'eligible', en: 'Eligible', pa: 'ਯੋਗ' },
              { id: 'almost', en: 'Almost Eligible', pa: 'ਲਗਭਗ ਯੋਗ' },
              { id: 'not', en: 'Not Eligible / Paused', pa: 'ਯੋਗ ਨਹੀਂ' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterStatus(tab.id as typeof filterStatus)}
                className={`min-h-[40px] rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  filterStatus === tab.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {pa ? tab.pa : tab.en}
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            {filtered.map((item) => {
              const isEl = item.status === 'eligible';
              const isAlm = item.status === 'almost';
              return (
                <div
                  key={item.id}
                  className={`rounded-xl border p-4 ${
                    isEl
                      ? 'border-emerald-200 bg-emerald-50/50'
                      : isAlm
                        ? 'border-amber-200 bg-amber-50/50'
                        : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="max-w-2xl">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <span
                          className={`inline-flex items-center gap-1 text-xs sm:text-sm font-bold ${
                            isEl ? 'text-emerald-800' : isAlm ? 'text-amber-800' : 'text-slate-600'
                          }`}
                        >
                          {isEl && <CheckCircle2 className="h-4 w-4 text-emerald-700" aria-hidden="true" />}
                          {isAlm && <AlertTriangle className="h-4 w-4 text-amber-700" aria-hidden="true" />}
                          {!isEl && !isAlm && <XCircle className="h-4 w-4 text-slate-500" aria-hidden="true" />}
                          <span>
                            {isEl
                              ? pa ? 'ਯੋਗ' : 'Eligible'
                              : isAlm
                                ? pa ? 'ਲਗਭਗ ਯੋਗ' : 'Almost Eligible'
                                : pa ? 'ਯੋਗ ਨਹੀਂ' : 'Not Eligible'}
                          </span>
                        </span>
                        <span className="text-slate-300" aria-hidden="true">·</span>
                        <span className="text-xs font-medium text-slate-500">{tText(item.category, lang)}</span>
                      </div>
                      <h3 className="mt-1 text-base font-bold text-slate-900">{tText(item.name, lang)}</h3>
                      <p className="mt-1 text-sm text-slate-700">{tText(item.summary, lang)}</p>
                      {item.missing.length > 0 && (
                        <div className="mt-2 text-xs sm:text-sm text-slate-800">
                          <span className="font-semibold">
                            {pa ? 'ਕੀ ਘਾਟ ਹੈ / ਅਗਲਾ ਕਦਮ: ' : 'What is missing / needed: '}
                          </span>
                          <span>{item.missing.map((m) => tText(m, lang)).join(' · ')}</span>
                        </div>
                      )}
                    </div>
                    {item.planKey && item.status !== 'not' && (
                      <div className="shrink-0">
                        <button
                          type="button"
                          onClick={() => onAdoptPathway(item.planKey!)}
                          className="min-h-[42px] w-full sm:w-auto rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer"
                        >
                          {pa ? 'My Plan ਵਿੱਚ ਚੁਣੋ' : 'Use in My Plan'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
