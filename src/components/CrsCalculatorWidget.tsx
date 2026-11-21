import { useMemo, useState } from 'react';
import { CrsInput, EducationLevel, Lang } from '../types';
import { calculateCRS } from '../utils/calculators';

interface Props {
  lang: Lang;
  onSaveCrs?: (score: number) => void;
}

export function CrsCalculatorWidget({ lang, onSaveCrs }: Props) {
  const pa = lang === 'pa';
  const [savedToast, setSavedToast] = useState(false);

  const [input, setInput] = useState<CrsInput>({
    married: false,
    age: 28,
    education: 'bach',
    l1Listening: 8,
    l1Reading: 7,
    l1Writing: 7,
    l1Speaking: 7,
    l2MinClb: 0,
    canadianWorkYears: 0,
    foreignWorkYears: 2,
    spouseEducation: 'bach',
    spouseLangMin: 7,
    spouseCanWorkYears: 0,
    tradeCert: false,
    pnpNomination: false,
    integrationPoints: 0,
    canadianStudy: 'none',
    frenchBonus: 'none',
    siblingInCanada: false
  });

  const breakdown = useMemo(() => calculateCRS(input), [input]);

  const handleSave = () => {
    if (onSaveCrs) {
      onSaveCrs(breakdown.total);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2200);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {pa
              ? 'Express Entry CRS ਕੈਲਕੁਲੇਟਰ (3 ਨਵੰਬਰ 2026 ਨਿਯਮਾਂ ਸਮੇਤ)'
              : 'Express Entry CRS Calculator (Includes Nov 3, 2026 Integration Factor)'}
          </h2>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            {pa
              ? 'CRS (Comprehensive Ranking System) 1,200 ਅੰਕਾਂ ਦਾ ਸਕੋਰ ਹੈ। ਇਹ ਕੈਲਕੁਲੇਟਰ 100% ਆਫਲਾਈਨ ਕੰਮ ਕਰਦਾ ਹੈ।'
              : 'CRS (Comprehensive Ranking System) is Express Entry’s 1,200-point ranking score. Runs 100% offline in your browser.'}
          </p>
        </div>
        <div className="w-full sm:w-auto flex sm:block items-center justify-between rounded-xl bg-slate-900 px-5 py-3 text-white sm:text-right shrink-0">
          <div className="text-xs font-medium text-slate-300">
            {pa ? 'ਤੁਹਾਡਾ ਕੁੱਲ CRS' : 'Total CRS Score'}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold tabular-nums font-mono tracking-tight">
            {breakdown.total} <span className="text-sm sm:text-base font-normal text-slate-400">/ 1,200</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? 'ਵਿਆਹੁਤਾ ਸਥਿਤੀ' : 'Marital Status'}</span>
          <select
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm text-slate-900"
            value={input.married ? '1' : '0'}
            onChange={(e) => setInput({ ...input, married: e.target.value === '1' })}
          >
            <option value="0">{pa ? 'ਇੱਕਲੇ (Single)' : 'Single / No Accompanying Spouse'}</option>
            <option value="1">{pa ? 'ਜੀਵਨ ਸਾਥੀ ਸਮੇਤ' : 'With Accompanying Spouse / Partner'}</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? 'ਉਮਰ (ਸਾਲ)' : 'Age (Years)'}</span>
          <input
            type="number"
            min={17}
            max={65}
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm text-slate-900 tabular-nums"
            value={input.age}
            onChange={(e) => setInput({ ...input, age: Number(e.target.value) || 18 })}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? 'ਸਭ ਤੋਂ ਉੱਚੀ ਪੜ੍ਹਾਈ' : 'Highest Education'}</span>
          <select
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm text-slate-900"
            value={input.education}
            onChange={(e) => setInput({ ...input, education: e.target.value as CrsInput['education'] })}
          >
            <option value="hs">{pa ? 'ਹਾਈ ਸਕੂਲ (12ਵੀਂ)' : 'High School'}</option>
            <option value="1yr">{pa ? '1-ਸਾਲਾ ਡਿਪਲੋਮਾ/ਸਰਟੀਫਿਕੇਟ' : '1-Year Post-Secondary'}</option>
            <option value="2yr">{pa ? '2-ਸਾਲਾ ਡਿਪਲੋਮਾ' : '2-Year Diploma'}</option>
            <option value="bach">{pa ? 'ਬੈਚਲਰ ਡਿਗਰੀ (3+ ਸਾਲ)' : 'Bachelor’s Degree (3+ yrs)'}</option>
            <option value="two">{pa ? '2+ ਡਿਗਰੀਆਂ (ਇੱਕ 3+ ਸਾਲ)' : 'Two+ Credentials (one 3+ yrs)'}</option>
            <option value="mast">{pa ? 'ਮਾਸਟਰ / ਪ੍ਰੋਫੈਸ਼ਨਲ ਡਿਗਰੀ' : 'Master’s / Professional Degree'}</option>
            <option value="phd">PhD / Doctorate</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? '1st ਭਾਸ਼ਾ — ਸੁਣਨਾ (Listening CLB)' : '1st Language — Listening (CLB)'}</span>
          <input
            type="number"
            min={0}
            max={12}
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm text-slate-900 tabular-nums"
            value={input.l1Listening}
            onChange={(e) => setInput({ ...input, l1Listening: Number(e.target.value) || 0 })}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? '1st ਭਾਸ਼ਾ — ਪੜ੍ਹਨਾ (Reading CLB)' : '1st Language — Reading (CLB)'}</span>
          <input
            type="number"
            min={0}
            max={12}
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm text-slate-900 tabular-nums"
            value={input.l1Reading}
            onChange={(e) => setInput({ ...input, l1Reading: Number(e.target.value) || 0 })}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? '1st ਭਾਸ਼ਾ — ਲਿਖਣਾ (Writing CLB)' : '1st Language — Writing (CLB)'}</span>
          <input
            type="number"
            min={0}
            max={12}
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm text-slate-900 tabular-nums"
            value={input.l1Writing}
            onChange={(e) => setInput({ ...input, l1Writing: Number(e.target.value) || 0 })}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? '1st ਭਾਸ਼ਾ — ਬੋਲਣਾ (Speaking CLB)' : '1st Language — Speaking (CLB)'}</span>
          <input
            type="number"
            min={0}
            max={12}
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm text-slate-900 tabular-nums"
            value={input.l1Speaking}
            onChange={(e) => setInput({ ...input, l1Speaking: Number(e.target.value) || 0 })}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? '2nd ਭਾਸ਼ਾ (ਘੱਟੋ-ਘੱਟ CLB/NCLC)' : '2nd Official Language (Lowest CLB/NCLC)'}</span>
          <input
            type="number"
            min={0}
            max={12}
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm text-slate-900 tabular-nums"
            value={input.l2MinClb}
            onChange={(e) => setInput({ ...input, l2MinClb: Number(e.target.value) || 0 })}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? 'ਕੈਨੇਡੀਅਨ ਕੰਮ ਦਾ ਤਜਰਬਾ (ਸਾਲ)' : 'Canadian Work Experience (Years)'}</span>
          <select
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm text-slate-900"
            value={input.canadianWorkYears}
            onChange={(e) => setInput({ ...input, canadianWorkYears: Number(e.target.value) })}
          >
            <option value={0}>{pa ? 'ਕੋਈ ਨਹੀਂ (0)' : 'None (0 years)'}</option>
            <option value={1}>1 {pa ? 'ਸਾਲ' : 'year'}</option>
            <option value={2}>2 {pa ? 'ਸਾਲ' : 'years'}</option>
            <option value={3}>3 {pa ? 'ਸਾਲ' : 'years'}</option>
            <option value={4}>4 {pa ? 'ਸਾਲ' : 'years'}</option>
            <option value={5}>5+ {pa ? 'ਸਾਲ' : 'years'}</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? 'ਵਿਦੇਸ਼ੀ ਹੁਨਰਮੰਦ ਤਜਰਬਾ (ਸਾਲ)' : 'Foreign Skilled Work Experience (Years)'}</span>
          <select
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm text-slate-900"
            value={input.foreignWorkYears}
            onChange={(e) => setInput({ ...input, foreignWorkYears: Number(e.target.value) })}
          >
            <option value={0}>{pa ? 'ਕੋਈ ਨਹੀਂ (0)' : 'None (0 years)'}</option>
            <option value={1}>1–2 {pa ? 'ਸਾਲ' : 'years'}</option>
            <option value={3}>3+ {pa ? 'ਸਾਲ' : 'years'}</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? 'ਲੇਬਰ ਮਾਰਕੀਟ ਇੰਟੀਗ੍ਰੇਸ਼ਨ (3 ਨਵੰ 2026 — ਬਿਨਾਂ LMIA)' : 'Labour Market Integration (Nov 3, 2026 — No LMIA)'}</span>
          <select
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm text-slate-900"
            value={input.integrationPoints}
            onChange={(e) => setInput({ ...input, integrationPoints: Number(e.target.value) as 0 | 50 | 100 | 150 })}
          >
            <option value={0}>{pa ? '0 ਅੰਕ (ਲਾਗੂ ਨਹੀਂ)' : '0 pts (Not applicable)'}</option>
            <option value={50}>{pa ? '+50 ਅੰਕ (ਕੈਨੇਡੀਅਨ ਰੁਜ਼ਗਾਰ / ਖੇਤਰੀ ਜੁੜਾਅ)' : '+50 pts (Canadian employment / regional integration)'}</option>
            <option value={100}>{pa ? '+100 ਅੰਕ (ਮਜ਼ਬੂਤ ਘਰੇਲੂ ਕੰਮ + ਮੰਗ ਵਾਲਾ ਸੈਕਟਰ)' : '+100 pts (Strong domestic work + high-demand sector)'}</option>
            <option value={150}>{pa ? '+150 ਅੰਕ (ਵੱਧ ਤੋਂ ਵੱਧ — ਸੀਨੀਅਰ / ਪੂਰਾ ਜੁੜਾਅ)' : '+150 pts (Maximum integration tier — no LMIA needed)'}</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? 'ਫ੍ਰੈਂਚ ਬੋਨਸ (NCLC 7+ ਚਾਰੋਂ ਹੁਨਰ)' : 'French Proficiency Bonus (NCLC 7+ all 4)'}</span>
          <select
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm text-slate-900"
            value={input.frenchBonus}
            onChange={(e) => setInput({ ...input, frenchBonus: e.target.value as CrsInput['frenchBonus'] })}
          >
            <option value="none">{pa ? 'ਕੋਈ ਨਹੀਂ (0)' : 'None (0 pts)'}</option>
            <option value="french_only">{pa ? 'ਸਿਰਫ਼ ਫ੍ਰੈਂਚ NCLC 7+ (+25)' : 'French NCLC 7+ only (+25 pts)'}</option>
            <option value="bilingual">{pa ? 'ਫ੍ਰੈਂਚ 7+ ਅਤੇ ਅੰਗਰੇਜ਼ੀ CLB 5+ (+50)' : 'French NCLC 7+ & English CLB 5+ (+50 pts)'}</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? 'ਕੈਨੇਡੀਅਨ ਪੜ੍ਹਾਈ' : 'Canadian Education Credential'}</span>
          <select
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm text-slate-900"
            value={input.canadianStudy}
            onChange={(e) => setInput({ ...input, canadianStudy: e.target.value as CrsInput['canadianStudy'] })}
          >
            <option value="none">{pa ? 'ਕੋਈ ਨਹੀਂ (0)' : 'None (0 pts)'}</option>
            <option value="12">{pa ? '1–2 ਸਾਲ ਦੀ ਪੜ੍ਹਾਈ (+15)' : '1–2 Year Credential (+15 pts)'}</option>
            <option value="3p">{pa ? '3+ ਸਾਲ ਡਿਗਰੀ / ਮਾਸਟਰ / PhD (+30)' : '3+ Year / Master’s / PhD (+30 pts)'}</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? 'ਸੂਬਾਈ ਨਾਮਜ਼ਦਗੀ (PNP +600)' : 'Provincial Nomination (PNP)'}</span>
          <select
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm text-slate-900"
            value={input.pnpNomination ? '1' : '0'}
            onChange={(e) => setInput({ ...input, pnpNomination: e.target.value === '1' })}
          >
            <option value="0">{pa ? 'ਨਹੀਂ (0)' : 'No (0 pts)'}</option>
            <option value="1">{pa ? 'ਹਾਂ (+600 ਅੰਕ)' : 'Yes — Express Entry PNP (+600 pts)'}</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? 'ਕੈਨੇਡਾ ਵਿੱਚ ਭਰਾ/ਭੈਣ (PR/ਨਾਗਰਿਕ 18+)' : 'Sibling in Canada (Citizen/PR 18+)'}</span>
          <select
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm text-slate-900"
            value={input.siblingInCanada ? '1' : '0'}
            onChange={(e) => setInput({ ...input, siblingInCanada: e.target.value === '1' })}
          >
            <option value="0">{pa ? 'ਨਹੀਂ (0)' : 'No (0 pts)'}</option>
            <option value="1">{pa ? 'ਹਾਂ (+15 ਅੰਕ)' : 'Yes (+15 pts)'}</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? 'ਕੈਨੇਡੀਅਨ ਟ੍ਰੇਡ ਸਰਟੀਫਿਕੇਟ (Red Seal)' : 'Canadian Certificate of Qualification'}</span>
          <select
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm text-slate-900"
            value={input.tradeCert ? '1' : '0'}
            onChange={(e) => setInput({ ...input, tradeCert: e.target.value === '1' })}
          >
            <option value="0">{pa ? 'ਨਹੀਂ' : 'No'}</option>
            <option value="1">{pa ? 'ਹਾਂ (ਹੁਨਰ ਤਬਦੀਲੀ +25/+50)' : 'Yes (up to +50 Transferability)'}</option>
          </select>
        </label>
      </div>

      {input.married && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-sm font-bold text-slate-900 mb-3">
            {pa ? 'ਜੀਵਨ ਸਾਥੀ ਦੇ ਅੰਕ (ਵੱਧ ਤੋਂ ਵੱਧ 40)' : 'Spouse / Partner Factors (Max 40 pts)'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-800">
              <span>{pa ? 'ਜੀਵਨ ਸਾਥੀ ਦੀ ਪੜ੍ਹਾਈ' : 'Spouse Education'}</span>
              <select
                className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm"
                value={input.spouseEducation}
                onChange={(e) => setInput({ ...input, spouseEducation: e.target.value as EducationLevel })}
              >
                <option value="hs">{pa ? 'ਹਾਈ ਸਕੂਲ (2)' : 'High School (2)'}</option>
                <option value="1yr">{pa ? '1-ਸਾਲਾ (6)' : '1-Yr Diploma (6)'}</option>
                <option value="2yr">{pa ? '2-ਸਾਲਾ (7)' : '2-Yr Diploma (7)'}</option>
                <option value="bach">{pa ? 'ਬੈਚਲਰ (8)' : 'Bachelor’s (8)'}</option>
                <option value="mast">{pa ? 'ਮਾਸਟਰ / PhD (10)' : 'Master’s / PhD (10)'}</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-800">
              <span>{pa ? 'ਜੀਵਨ ਸਾਥੀ ਭਾਸ਼ਾ (CLB)' : 'Spouse 1st Language (Min CLB)'}</span>
              <input
                type="number"
                min={0}
                max={12}
                className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm tabular-nums"
                value={input.spouseLangMin}
                onChange={(e) => setInput({ ...input, spouseLangMin: Number(e.target.value) || 0 })}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-800">
              <span>{pa ? 'ਜੀਵਨ ਸਾਥੀ ਕੈਨੇਡੀਅਨ ਕੰਮ (ਸਾਲ)' : 'Spouse Canadian Work (Years)'}</span>
              <input
                type="number"
                min={0}
                max={10}
                className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm tabular-nums"
                value={input.spouseCanWorkYears}
                onChange={(e) => setInput({ ...input, spouseCanWorkYears: Number(e.target.value) || 0 })}
              />
            </label>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl bg-slate-50 border border-slate-200 p-4">
        <div>
          <div className="text-xs text-slate-500">{pa ? 'ਮੁੱਖ ਮਨੁੱਖੀ ਪੂੰਜੀ' : 'Core Human Capital'}</div>
          <div className="text-xl font-bold text-slate-900 tabular-nums font-mono">{breakdown.coreHumanCapital}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">{pa ? 'ਜੀਵਨ ਸਾਥੀ' : 'Spouse Factors'}</div>
          <div className="text-xl font-bold text-slate-900 tabular-nums font-mono">{breakdown.spouseFactors}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">{pa ? 'ਹੁਨਰ ਤਬਦੀਲੀ' : 'Skill Transferability'}</div>
          <div className="text-xl font-bold text-slate-900 tabular-nums font-mono">{breakdown.skillTransferability} / 100</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">{pa ? 'ਵਾਧੂ ਅੰਕ' : 'Additional Points'}</div>
          <div className="text-xl font-bold text-red-700 tabular-nums font-mono">+{breakdown.additionalPoints}</div>
        </div>
      </div>

      {onSaveCrs && (
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            {pa
              ? 'ਤੁਸੀਂ ਇਹ CRS ਸਕੋਰ ਆਪਣੀ ਲੋਕਲ ਪ੍ਰੋਫਾਈਲ (My Plan) ਵਿੱਚ ਸੇਵ ਕਰ ਸਕਦੇ ਹੋ।'
              : 'Save this calculated CRS score directly to your local My Plan profile.'}
          </p>
          <button
            type="button"
            onClick={handleSave}
            className="min-h-[44px] w-full sm:w-auto rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors cursor-pointer"
          >
            {savedToast
              ? pa ? 'ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਸੇਵ ਹੋ ਗਿਆ' : 'Saved to My Profile'
              : pa ? 'CRS ਸਕੋਰ ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਸੇਵ ਕਰੋ' : 'Save CRS to My Profile'}
          </button>
        </div>
      )}
    </section>
  );
}
