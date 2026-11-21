import { useState } from 'react';
import { Printer } from 'lucide-react';
import { Lang } from '../types';
import { getRequiredFunds } from '../utils/calculators';
import { CrsCalculatorWidget } from './CrsCalculatorWidget';
import { DisclaimerBanner } from './DisclaimerBanner';

interface Props {
  lang: Lang;
  onSaveCrs: (score: number) => void;
}

const DOC_CHECKLISTS: Record<string, { title: { en: string; pa: string }; items: { en: string; pa: string }[] }> = {
  cec: {
    title: { en: 'Express Entry — CEC Documents', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ — CEC ਦਸਤਾਵੇਜ਼' },
    items: [
      { en: 'Valid Passport (all stamped pages)', pa: 'ਵੈਧ ਪਾਸਪੋਰਟ (ਸਾਰੇ ਸਟੈਂਪ ਵਾਲੇ ਪੰਨੇ)' },
      { en: 'Language Test Results (IELTS General / CELPIP-G / PTE Core / TEF / TCF, < 2 yrs old)', pa: 'ਭਾਸ਼ਾ ਟੈਸਟ ਨਤੀਜਾ (2 ਸਾਲ ਤੋਂ ਘੱਟ ਪੁਰਾਣਾ)' },
      { en: 'Canadian Employer Reference Letters (letterhead, NOC duties, hours/week, salary, dates, signature)', pa: 'ਕੰਪਨੀ ਰੈਫਰੈਂਸ ਲੈਟਰ (NOC ਡਿਊਟੀਆਂ, ਘੰਟੇ, ਤਨਖਾਹ, ਦਸਤਖਤ)' },
      { en: 'Canadian T4 slips, Notice of Assessment (NOA), and recent pay stubs', pa: 'T4, Notice of Assessment (NOA) ਅਤੇ ਪੇ-ਸਲਿੱਪ' },
      { en: 'Canadian Diploma/Degree + Transcripts (and ECA if claiming foreign education)', pa: 'ਕੈਨੇਡੀਅਨ ਡਿਗਰੀ/ਡਿਪਲੋਮਾ (ਵਿਦੇਸ਼ੀ ਡਿਗਰੀ ਲਈ ECA)' },
      { en: 'Police Clearance Certificates (countries lived 6+ months in a row since age 18)', pa: 'ਪੁਲਿਸ ਕਲੀਅਰੈਂਸ ਸਰਟੀਫਿਕੇਟ (6+ ਮਹੀਨੇ ਰਹੇ ਦੇਸ਼ਾਂ ਦਾ)' },
      { en: 'Upfront Medical Exam (eMedical sheet) + Digital PR Photo + Explanation Letter for CEC Funds Exemption', pa: 'ਮੈਡੀਕਲ ਟੈਸਟ + ਫੋਟੋ + CEC ਫੰਡ ਛੋਟ ਪੱਤਰ' }
    ]
  },
  fswp: {
    title: { en: 'Express Entry — FSWP Documents', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ — FSWP ਦਸਤਾਵੇਜ਼' },
    items: [
      { en: 'Valid Passport & National ID / Birth Certificate', pa: 'ਵੈਧ ਪਾਸਪੋਰਟ ਅਤੇ ਜਨਮ ਸਰਟੀਫਿਕੇਟ' },
      { en: 'Language Test Results (CLB 7+ minimum, < 2 yrs old)', pa: 'ਭਾਸ਼ਾ ਟੈਸਟ ਨਤੀਜਾ (CLB 7+)' },
      { en: 'ECA Report (WES, ICAS, CES, IQAS, or ICES, < 5 yrs old) + Degree & Transcripts', pa: 'ECA ਰਿਪੋਰਟ (5 ਸਾਲ ਤੋਂ ਘੱਟ ਪੁਰਾਣੀ) ਅਤੇ ਡਿਗਰੀਆਂ' },
      { en: 'Work Reference Letters + Salary Bank Statements + Tax Returns / Appointment Letters', pa: 'ਕੰਮ ਦੇ ਰੈਫਰੈਂਸ ਲੈਟਰ, ਤਨਖਾਹ ਬੈਂਕ ਸਟੇਟਮੈਂਟ ਅਤੇ ਟੈਕਸ ਰਿਟਰਨ' },
      { en: 'Proof of Funds Official Bank Letter (6-month average balance, liquid & unencumbered)', pa: 'ਬੈਂਕ ਤੋਂ ਅਧਿਕਾਰਤ ਫੰਡ ਪੱਤਰ (6 ਮਹੀਨੇ ਦੀ ਬਕਾਇਆ ਰਕਮ ਸਮੇਤ)' },
      { en: 'Police Clearance Certificates & Upfront Medical Exam', pa: 'ਪੁਲਿਸ ਕਲੀਅਰੈਂਸ ਅਤੇ ਮੈਡੀਕਲ ਟੈਸਟ' }
    ]
  },
  fstp: {
    title: { en: 'Express Entry — FSTP Trades Documents', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ — FSTP ਟ੍ਰੇਡਜ਼ ਦਸਤਾਵੇਜ਼' },
    items: [
      { en: 'Valid Passport + Language Test (CLB 5 speak/listen, CLB 4 read/write)', pa: 'ਪਾਸਪੋਰਟ + ਭਾਸ਼ਾ ਟੈਸਟ (CLB 5/4)' },
      { en: 'Proof of 2+ years skilled trades experience (TEER 2/3) in past 5 years', pa: 'ਪਿਛਲੇ 5 ਸਾਲਾਂ ਵਿੱਚ 2+ ਸਾਲ ਟ੍ਰੇਡ ਤਜਰਬੇ ਦਾ ਸਬੂਤ' },
      { en: 'Canadian Provincial/Federal Certificate of Qualification (Red Seal) OR 1-year Trade Job Offer', pa: 'Red Seal ਸਰਟੀਫਿਕੇਟ ਜਾਂ 1-ਸਾਲ ਦਾ ਪੱਕਾ ਟ੍ਰੇਡ ਜੌਬ ਆਫਰ' },
      { en: 'Proof of Funds (if no valid offer) + Police Certificates + Medical Exam', pa: 'ਫੰਡ ਸਬੂਤ (ਜੇ ਆਫਰ ਨਹੀਂ) + ਪੁਲਿਸ ਕਲੀਅਰੈਂਸ + ਮੈਡੀਕਲ' }
    ]
  },
  pnp: {
    title: { en: 'Provincial Nominee Program (PNP) Documents', pa: 'PNP ਦਸਤਾਵੇਜ਼ ਚੈੱਕਲਿਸਟ' },
    items: [
      { en: 'Express Entry Profile # & Job Seeker Code (if EE-aligned stream)', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਪ੍ਰੋਫਾਈਲ ਨੰਬਰ (ਜੇ EE PNP ਹੈ)' },
      { en: 'Signed Employer Job Offer & Provincial Employer Forms (where required)', pa: 'ਰੁਜ਼ਗਾਰਦਾਤਾ ਵੱਲੋਂ ਦਸਤਖਤ ਕੀਤਾ ਜੌਬ ਆਫਰ ਅਤੇ ਸੂਬਾਈ ਫਾਰਮ' },
      { en: 'Language Test + ECA + Experience Letters & Pay Stubs', pa: 'ਭਾਸ਼ਾ ਟੈਸਟ + ECA + ਤਜਰਬੇ ਦੇ ਸਬੂਤ' },
      { en: 'Provincial Nomination Certificate → Upload to federal PR portal + Police + Medical', pa: 'ਸੂਬਾਈ ਨਾਮਜ਼ਦਗੀ ਸਰਟੀਫਿਕੇਟ + ਪੁਲਿਸ + ਮੈਡੀਕਲ' }
    ]
  },
  aip: {
    title: { en: 'Atlantic Immigration Program (AIP) Documents', pa: 'AIP ਦਸਤਾਵੇਜ਼ ਚੈੱਕਲਿਸਟ' },
    items: [
      { en: 'Signed IMM 0157 Job Offer from AIP-Designated Employer in NB/NS/PEI/NL', pa: 'ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਰੁਜ਼ਗਾਰਦਾਤਾ ਵੱਲੋਂ ਦਸਤਖਤ IMM 0157 ਜੌਬ ਆਫਰ' },
      { en: 'Settlement Plan from designated settlement service provider', pa: 'ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਸੰਸਥਾ ਵੱਲੋਂ Settlement Plan' },
      { en: 'Provincial Endorsement Certificate + CLB 4/5 Language + ECA + Work Proof', pa: 'ਸੂਬਾਈ Endorsement ਸਰਟੀਫਿਕੇਟ + ਭਾਸ਼ਾ + ECA' }
    ]
  },
  study: {
    title: { en: 'Study → PGWP → PR Documents', pa: 'ਪੜ੍ਹਾਈ → PGWP → PR ਦਸਤਾਵੇਜ਼' },
    items: [
      { en: 'Letter of Acceptance (LOA) from PGWP-eligible DLI + Provincial Attestation Letter (PAL)', pa: 'PGWP-ਯੋਗ DLI ਕਾਲਜ ਤੋਂ LOA ਅਤੇ PAL' },
      { en: 'Proof of Tuition + ~$20,635 CAD Living Expenses + Study Plan', pa: 'ਫੀਸ ਅਤੇ ਰਹਿਣ-ਸਹਿਣ ਦੇ ਫੰਡਾਂ ਦਾ ਸਬੂਤ' },
      { en: 'Upon Graduation: Official Transcript + Completion Letter + CLB 5/7 Language Test for PGWP', pa: 'ਪੜ੍ਹਾਈ ਤੋਂ ਬਾਅਦ: ਟ੍ਰਾਂਸਕ੍ਰਿਪਟ + PGWP ਭਾਸ਼ਾ ਟੈਸਟ' },
      { en: 'After 1 Year Skilled Work on PGWP: Reference Letters, T4, NOA for CEC/PNP', pa: '1 ਸਾਲ ਕੰਮ ਤੋਂ ਬਾਅਦ: ਰੈਫਰੈਂਸ ਲੈਟਰ, T4, NOA' }
    ]
  },
  family: {
    title: { en: 'Spousal / Family Sponsorship Documents', pa: 'ਪਰਿਵਾਰਕ ਸਪਾਂਸਰਸ਼ਿਪ ਦਸਤਾਵੇਜ਼' },
    items: [
      { en: 'Sponsor Proof of Canadian Citizenship or PR Card', pa: 'ਸਪਾਂਸਰ ਦਾ ਕੈਨੇਡੀਅਨ ਪਾਸਪੋਰਟ / PR ਕਾਰਡ' },
      { en: 'Marriage Certificate or Statutory Declaration of Common-Law Union (12+ mo cohabitation)', pa: 'ਵਿਆਹ ਸਰਟੀਫਿਕੇਟ ਜਾਂ Common-Law ਸਬੂਤ (12+ ਮਹੀਨੇ)' },
      { en: 'Relationship Proof: Joint lease/bank, photos, travel history, chats, family letters', pa: 'ਰਿਸ਼ਤੇ ਦੇ ਸਬੂਤ: ਸਾਂਝਾ ਬੈਂਕ, ਫੋਟੋਆਂ, ਯਾਤਰਾ, ਚਿੱਠੀਆਂ' },
      { en: 'Police Certificates & Medical Exam for Sponsored Applicant', pa: 'ਬਿਨੈਕਾਰ ਦੀ ਪੁਲਿਸ ਕਲੀਅਰੈਂਸ ਅਤੇ ਮੈਡੀਕਲ' }
    ]
  },
  quebec: {
    title: { en: 'Quebec PSTQ / CSQ Documents', pa: 'ਕਿਊਬੈਕ PSTQ / CSQ ਦਸਤਾਵੇਜ਼' },
    items: [
      { en: 'TEF Canada / TCF Canada proving French Oral 7+ / Written 5+', pa: 'ਫ੍ਰੈਂਚ ਟੈਸਟ (ਮੌਖਿਕ 7+ / ਲਿਖਤੀ 5+)' },
      { en: 'Arrima EOI Profile & Quebec Educational Comparative Evaluation (if requested)', pa: 'Arrima ਪ੍ਰੋਫਾਈਲ ਅਤੇ ਡਿਗਰੀ ਮੁਲਾਂਕਣ' },
      { en: 'Attestation of Learning About Democratic & Quebec Values (post-invitation)', pa: 'ਕਿਊਬੈਕ ਕਦਰਾਂ-ਕੀਮਤਾਂ ਦਾ ਟੈਸਟ/ਸਰਟੀਫਿਕੇਟ' },
      { en: 'CSQ Approval → Federal IRCC PR Forms, Police & Medical', pa: 'CSQ ਮਿਲਣ ਤੋਂ ਬਾਅਦ ਫੈਡਰਲ PR ਅਰਜ਼ੀ, ਪੁਲਿਸ ਅਤੇ ਮੈਡੀਕਲ' }
    ]
  }
};

export function CalculatorsView({ lang, onSaveCrs }: Props) {
  const pa = lang === 'pa';
  const [subTab, setSubTab] = useState<'crs' | 'boost' | 'pof' | 'docs'>('crs');

  // Score booster state
  const [baseCrs, setBaseCrs] = useState(430);
  const [boostIelts, setBoostIelts] = useState(false);
  const [boostFrench, setBoostFrench] = useState(false);
  const [boostCanWork, setBoostCanWork] = useState(false);
  const [boostCanStudy, setBoostCanStudy] = useState<'0' | '15' | '30'>('0');
  const [boostIntegration, setBoostIntegration] = useState<'0' | '50' | '100' | '150'>('0');
  const [boostSibling, setBoostSibling] = useState(false);
  const [boostPnp, setBoostPnp] = useState(false);

  const boostedScore = Math.min(
    1200,
    baseCrs +
      (boostIelts ? 48 : 0) +
      (boostFrench ? 50 : 0) +
      (boostCanWork ? 53 : 0) +
      Number(boostCanStudy) +
      Number(boostIntegration) +
      (boostSibling ? 15 : 0) +
      (boostPnp ? 600 : 0)
  );

  // Proof of funds state
  const [famSize, setFamSize] = useState(1);
  const [pofRoute, setPofRoute] = useState<'fswp' | 'cec' | 'job'>('fswp');
  const reqFunds = getRequiredFunds(famSize);

  // Doc checklist generator
  const [docPath, setDocPath] = useState<string>('cec');
  const docData = DOC_CHECKLISTS[docPath] || DOC_CHECKLISTS.cec;

  return (
    <div className="space-y-6">
      <DisclaimerBanner lang={lang} />

      <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 rounded-xl bg-slate-200/70 p-1 w-full sm:w-fit no-print">
        {[
          { id: 'crs', en: 'CRS Calculator', pa: 'CRS ਕੈਲਕੁਲੇਟਰ' },
          { id: 'boost', en: 'How to Increase My Score?', pa: 'ਸਕੋਰ ਕਿਵੇਂ ਵਧਾਈਏ?' },
          { id: 'pof', en: 'Proof of Funds', pa: 'ਫੰਡ ਕੈਲਕੁਲੇਟਰ' },
          { id: 'docs', en: 'Document Checklist Generator', pa: 'ਦਸਤਾਵੇਜ਼ ਚੈੱਕਲਿਸਟ' }
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSubTab(t.id as typeof subTab)}
            className={`min-h-[42px] shrink-0 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              subTab === t.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {pa ? t.pa : t.en}
          </button>
        ))}
      </div>

      {subTab === 'crs' && <CrsCalculatorWidget lang={lang} onSaveCrs={onSaveCrs} />}

      {subTab === 'boost' && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-slate-900">
            {pa ? 'ਮੈਂ ਆਪਣਾ CRS ਸਕੋਰ ਕਿਵੇਂ ਵਧਾ ਸਕਦਾ ਹਾਂ?' : 'How to Increase My CRS Score Simulator'}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {pa
              ? 'ਆਪਣਾ ਮੌਜੂਦਾ CRS ਦਰਜ ਕਰੋ ਅਤੇ ਹੇਠਲੇ ਵਿਕਲਪ ਚੁਣ ਕੇ ਦੇਖੋ ਕਿ ਤੁਹਾਡਾ ਸਕੋਰ ਕਿੰਨਾ ਵੱਧ ਸਕਦਾ ਹੈ।'
              : 'Enter your current CRS score and toggle realistic upgrades to see your projected 2026 CRS score.'}
          </p>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-3 order-2 lg:order-1">
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800 max-w-xs">
                <span>{pa ? 'ਮੌਜੂਦਾ CRS ਸਕੋਰ' : 'Your Current CRS Score'}</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={150}
                  max={1000}
                  className="min-h-[44px] rounded-lg border border-slate-300 px-3 text-base sm:text-sm tabular-nums font-mono font-bold"
                  value={baseCrs}
                  onChange={(e) => setBaseCrs(Number(e.target.value) || 0)}
                />
              </label>

              <div className="pt-2 space-y-2.5">
                <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3.5 cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-red-600" checked={boostIelts} onChange={(e) => setBoostIelts(e.target.checked)} />
                  <div className="text-sm">
                    <div className="font-bold text-slate-900">
                      {pa ? 'IELTS / CELPIP ਵਿੱਚ CLB 9+ ਪ੍ਰਾਪਤ ਕਰੋ (+45 ਤੋਂ +60 ਅੰਕ)' : 'Reach IELTS / CELPIP CLB 9+ (+45 to +60 pts approx.)'}
                    </div>
                    <div className="text-slate-600">{pa ? 'ਕੋਰ ਭਾਸ਼ਾ + Skill Transferability ਅੰਕ ਖੁੱਲ੍ਹਦੇ ਹਨ' : 'Unlocks maximum core language and Skill Transferability points'}</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3.5 cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-red-600" checked={boostFrench} onChange={(e) => setBoostFrench(e.target.checked)} />
                  <div className="text-sm">
                    <div className="font-bold text-slate-900">
                      {pa ? 'ਫ੍ਰੈਂਚ NCLC 7+ ਸਿੱਖੋ (+50 ਬੋਨਸ + 407 ਕੱਟਆਫ ਵਾਲੇ ਫ੍ਰੈਂਚ ਡਰਾਅ!)' : 'Pass French TEF/TCF at NCLC 7+ (+50 bilingual pts + French draws ~407)'}
                    </div>
                    <div className="text-slate-600">{pa ? 'ਨਾਲ ਹੀ 2nd ਭਾਸ਼ਾ ਦੇ ਵਾਧੂ ਅੰਕ' : 'Also opens dedicated French category draws'}</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3.5 cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-red-600" checked={boostCanWork} onChange={(e) => setBoostCanWork(e.target.checked)} />
                  <div className="text-sm">
                    <div className="font-bold text-slate-900">
                      {pa ? '1 ਸਾਲ ਦਾ ਕੈਨੇਡੀਅਨ ਹੁਨਰਮੰਦ ਕੰਮ (+53 ਅੰਕ)' : 'Gain 1 Year Canadian Skilled Experience (+53 pts approx.)'}
                    </div>
                    <div className="text-slate-600">{pa ? 'CEC ਯੋਗਤਾ ਵੀ ਖੁੱਲ੍ਹਦੀ ਹੈ' : 'Includes core Canadian work + transferability boost + CEC eligibility'}</div>
                  </div>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1 text-sm font-semibold rounded-xl border border-slate-200 p-3.5">
                    <span>{pa ? 'ਕੈਨੇਡੀਅਨ ਪੜ੍ਹਾਈ (+15 / +30)' : 'Canadian Study (+15 / +30)'}</span>
                    <select className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-2.5 mt-1 text-base sm:text-sm font-normal" value={boostCanStudy} onChange={(e) => setBoostCanStudy(e.target.value as '0' | '15' | '30')}>
                      <option value="0">{pa ? 'ਕੋਈ ਨਹੀਂ (+0)' : 'None (+0)'}</option>
                      <option value="15">{pa ? '1–2 ਸਾਲ (+15)' : '1–2 Year (+15)'}</option>
                      <option value="30">{pa ? '3+ ਸਾਲ / ਮਾਸਟਰ (+30)' : '3+ Yr / Master’s (+30)'}</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-1 text-sm font-semibold rounded-xl border border-slate-200 p-3.5">
                    <span>{pa ? 'ਲੇਬਰ ਮਾਰਕੀਟ ਇੰਟੀਗ੍ਰੇਸ਼ਨ (3 ਨਵੰ 2026)' : 'Labour Market Integration (Nov 3, 2026)'}</span>
                    <select className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-2.5 mt-1 text-base sm:text-sm font-normal" value={boostIntegration} onChange={(e) => setBoostIntegration(e.target.value as '0' | '50' | '100' | '150')}>
                      <option value="0">+0</option>
                      <option value="50">+50 ({pa ? 'ਬਿਨਾਂ LMIA' : 'No LMIA needed'})</option>
                      <option value="100">+100 ({pa ? 'ਬਿਨਾਂ LMIA' : 'No LMIA needed'})</option>
                      <option value="150">+150 ({pa ? 'ਬਿਨਾਂ LMIA' : 'No LMIA needed'})</option>
                    </select>
                  </label>
                </div>

                <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3.5 cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-red-600" checked={boostSibling} onChange={(e) => setBoostSibling(e.target.checked)} />
                  <div className="text-sm font-bold text-slate-900">
                    {pa ? 'ਕੈਨੇਡਾ ਵਿੱਚ ਭਰਾ/ਭੈਣ (PR/ਨਾਗਰਿਕ) (+15 ਅੰਕ)' : 'Sibling in Canada (Citizen/PR 18+) (+15 pts)'}
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/40 p-3.5 cursor-pointer">
                  <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-red-600" checked={boostPnp} onChange={(e) => setBoostPnp(e.target.checked)} />
                  <div className="text-sm font-bold text-red-900">
                    {pa ? 'ਸੂਬਾਈ ਨਾਮਜ਼ਦਗੀ (PNP Nomination) (+600 ਅੰਕ)' : 'Provincial Nomination (Express Entry PNP) (+600 pts)'}
                  </div>
                </label>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-20 rounded-2xl bg-slate-900 text-white p-5 sm:p-6">
              <div className="flex sm:block items-baseline justify-between gap-4">
                <div>
                  <div className="text-xs font-medium text-slate-300">
                    {pa ? 'ਅੰਦਾਜ਼ਨ ਨਵਾਂ CRS ਸਕੋਰ' : 'Projected Boosted CRS Score'}
                  </div>
                  <div className="mt-1 sm:mt-2 text-4xl sm:text-5xl font-extrabold tabular-nums font-mono">{boostedScore}</div>
                </div>
                <div className="mt-1 text-sm text-emerald-400 font-semibold tabular-nums">
                  +{boostedScore - baseCrs} {pa ? 'ਵਾਧੂ ਅੰਕ' : 'points gained'}
                </div>
              </div>
              <div className="mt-4 sm:mt-5 border-t border-slate-800 pt-3.5 sm:pt-4 text-xs sm:text-sm text-slate-300 grid grid-cols-2 sm:grid-cols-1 gap-2">
                <div className="col-span-2 sm:col-span-1 text-slate-400 font-semibold">{pa ? 'ਹਾਲੀਆ ਕੱਟਆਫ ਤੁਲਨਾ:' : 'Recent 2026 Cut-off Benchmarks:'}</div>
                <div className="flex justify-between gap-2 tabular-nums"><span>French:</span><strong className="font-mono text-white">~407</strong></div>
                <div className="flex justify-between gap-2 tabular-nums"><span>Trades/Trans:</span><strong className="font-mono text-white">~476–477</strong></div>
                <div className="flex justify-between gap-2 tabular-nums"><span>CEC Draws:</span><strong className="font-mono text-white">~519</strong></div>
                <div className="flex justify-between gap-2 tabular-nums"><span>PNP Draws:</span><strong className="font-mono text-white">~761</strong></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {subTab === 'pof' && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-slate-900">
            {pa ? '2026 ਸੈਟਲਮੈਂਟ ਫੰਡ (Proof of Funds) ਕੈਲਕੁਲੇਟਰ' : '2026 Proof of Funds Calculator'}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {pa
              ? 'FSWP ਅਤੇ FSTP ਲਈ ਲੋੜੀਂਦੀ ਰਕਮ। CEC ਉਮੀਦਵਾਰਾਂ ਨੂੰ ਫੰਡ ਦਿਖਾਉਣ ਦੀ ਲੋੜ ਨਹੀਂ (Exempt)!'
              : 'Required settlement funds for FSWP & FSTP. Note: CEC applicants are completely exempt from Proof of Funds!'}
          </p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              <span>{pa ? 'ਪਰਿਵਾਰ ਦੇ ਕੁੱਲ ਮੈਂਬਰ (ਤੁਸੀਂ + ਜੀਵਨ ਸਾਥੀ + ਬੱਚੇ)' : 'Total Family Size (You + Spouse + Dependent Children)'}</span>
              <select className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm font-normal tabular-nums" value={famSize} onChange={(e) => setFamSize(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? (pa ? 'ਵਿਅਕਤੀ' : 'person') : (pa ? 'ਮੈਂਬਰ' : 'people')}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              <span>{pa ? 'ਤੁਹਾਡੀ PR ਸ਼੍ਰੇਣੀ' : 'Your Express Entry Program'}</span>
              <select className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm font-normal" value={pofRoute} onChange={(e) => setPofRoute(e.target.value as 'fswp' | 'cec' | 'job')}>
                <option value="fswp">{pa ? 'FSWP / FSTP (ਬਿਨਾਂ ਜੌਬ ਆਫਰ)' : 'FSWP / FSTP (No valid job offer)'}</option>
                <option value="cec">{pa ? 'CEC (ਕੈਨੇਡੀਅਨ ਤਜਰਬਾ ਸ਼੍ਰੇਣੀ)' : 'CEC (Canadian Experience Class)'}</option>
                <option value="job">{pa ? 'ਕੈਨੇਡਾ ਵਿੱਚ ਕੰਮ + ਵੈਧ ਜੌਬ ਆਫਰ' : 'Authorized to work in Canada + Valid Job Offer'}</option>
              </select>
            </label>
          </div>

          <div className={`mt-6 rounded-2xl border p-5 sm:p-6 max-w-2xl ${pofRoute === 'fswp' ? 'border-slate-200 bg-slate-50' : 'border-emerald-200 bg-emerald-50/60'}`}>
            {pofRoute === 'fswp' ? (
              <>
                <div className="text-xs font-semibold text-slate-500">
                  {pa ? `${famSize} ਮੈਂਬਰਾਂ ਲਈ ਘੱਟੋ-ਘੱਟ ਲੋੜੀਂਦੇ ਫੰਡ` : `Minimum Required Funds for Family of ${famSize}`}
                </div>
                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums font-mono">
                  ${reqFunds.toLocaleString()} CAD
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {pa
                    ? 'ਇਹ ਰਕਮ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਨਕਦ/ਤਰਲ (liquid) ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ — ਜ਼ਮੀਨ ਜਾਂ ਸੋਨਾ ਨਹੀਂ ਮੰਨਿਆ ਜਾਂਦਾ।'
                    : 'Must be liquid, unencumbered funds in your (or accompanying spouse’s) bank account. Real estate equity does not count.'}
                </p>
              </>
            ) : (
              <>
                <div className="text-xl font-bold text-emerald-900">
                  $0 CAD — {pa ? 'ਤੁਹਾਨੂੰ ਫੰਡ ਦਿਖਾਉਣ ਤੋਂ ਛੋਟ (Exempt) ਹੈ' : 'Exempt from Proof of Funds'}
                </div>
                <p className="mt-1 text-sm text-emerald-900/90">
                  {pa
                    ? 'CEC ਬਿਨੈਕਾਰਾਂ ਨੂੰ ਬੈਂਕ ਫੰਡ ਦਿਖਾਉਣ ਦੀ ਲੋੜ ਨਹੀਂ ਹੈ — ਬੱਸ ਪੋਰਟਲ ’ਤੇ ਇੱਕ ਸਧਾਰਨ ਛੋਟ ਪੱਤਰ ਅੱਪਲੋਡ ਕਰੋ।'
                    : 'Under IRCC rules, CEC applicants and those authorized to work in Canada with a valid job offer do not need to show settlement funds.'}
                </p>
              </>
            )}
          </div>
        </section>
      )}

      {subTab === 'docs' && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs print-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {pa ? 'ਰਸਤੇ ਅਨੁਸਾਰ ਦਸਤਾਵੇਜ਼ ਚੈੱਕਲਿਸਟ' : 'Document Checklist Generator by Pathway'}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {pa ? 'ਆਪਣਾ PR ਮਾਰਗ ਚੁਣੋ ਅਤੇ ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼ਾਂ ਦੀ ਸੂਚੀ ਪ੍ਰਿੰਟ ਕਰੋ।' : 'Choose your pathway to generate a tailored, printable PR document checklist.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="no-print w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              <span>{pa ? 'ਸੂਚੀ ਪ੍ਰਿੰਟ ਕਰੋ' : 'Print Checklist'}</span>
            </button>
          </div>

          <div className="mt-4 max-w-md no-print">
            <select
              className="min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm font-semibold"
              value={docPath}
              onChange={(e) => setDocPath(e.target.value)}
            >
              {Object.entries(DOC_CHECKLISTS).map(([k, v]) => (
                <option key={k} value={k}>{pa ? v.title.pa : v.title.en}</option>
              ))}
            </select>
          </div>

          <h3 className="mt-6 text-lg font-bold text-slate-900">{pa ? docData.title.pa : docData.title.en}</h3>
          <ul className="mt-3 space-y-2.5">
            {docData.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-sm text-slate-800">
                <span className="font-mono font-bold text-red-700 tabular-nums">{String(i + 1).padStart(2, '0')}.</span>
                <span>{pa ? item.pa : item.en}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
