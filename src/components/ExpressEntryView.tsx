import { useState } from 'react';
import { EducationLevel, Lang } from '../types';
import { calculateFSWP67 } from '../utils/calculators';
import { CrsCalculatorWidget } from './CrsCalculatorWidget';
import { DisclaimerBanner } from './DisclaimerBanner';

interface Props {
  lang: Lang;
  onSaveCrs: (score: number) => void;
}

const CATEGORIES_2026 = [
  { en: 'French-Language Proficiency (NCLC 7+)', pa: 'ਫ੍ਰੈਂਚ ਭਾਸ਼ਾ (NCLC 7+)' },
  { en: 'Healthcare & Social Services', pa: 'ਸਿਹਤ ਅਤੇ ਸਮਾਜਿਕ ਸੇਵਾਵਾਂ' },
  { en: 'STEM (Science, Tech, Engineering, Math)', pa: 'STEM (ਟੈਕ ਅਤੇ ਇੰਜੀਨੀਅਰਿੰਗ)' },
  { en: 'Skilled Trades Occupations', pa: 'ਹੁਨਰਮੰਦ ਟ੍ਰੇਡਜ਼ ਕਿੱਤੇ' },
  { en: 'Agriculture & Agri-Food', pa: 'ਖੇਤੀਬਾੜੀ ਅਤੇ ਐਗਰੀ-ਫੂਡ' },
  { en: 'Education Occupations', pa: 'ਸਿੱਖਿਆ ਖੇਤਰ ਦੇ ਕਿੱਤੇ' },
  { en: 'Transport Occupations', pa: 'ਟ੍ਰਾਂਸਪੋਰਟ ਕਿੱਤੇ' },
  { en: 'Physicians (with Canadian experience)', pa: 'ਡਾਕਟਰ (ਕੈਨੇਡੀਅਨ ਤਜਰਬੇ ਸਮੇਤ)' },
  { en: 'Senior Managers', pa: 'ਸੀਨੀਅਰ ਮੈਨੇਜਰ' }
];

export function ExpressEntryView({ lang, onSaveCrs }: Props) {
  const pa = lang === 'pa';

  const [f67, setF67] = useState({
    age: 29,
    edu: 'bach' as EducationLevel,
    l1MinClb: 7,
    l2Clb5: false,
    skilledYears: 2,
    arrangedJob: false,
    adaptabilityPts: 0
  });

  const gridRes = calculateFSWP67(f67);

  return (
    <div className="space-y-8">
      <DisclaimerBanner lang={lang} />

      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {pa ? 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ (Express Entry) — 3 ਮੁੱਖ ਫੈਡਰਲ ਪ੍ਰੋਗਰਾਮ' : 'Express Entry — The 3 Federal Skilled Programs'}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {pa
            ? 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਕੈਨੇਡਾ ਦਾ ਮੁੱਖ ਆਨਲਾਈਨ PR ਸਿਸਟਮ ਹੈ (2026 ਟੀਚਾ ~109,000)। ਪਹਿਲਾਂ ਤੁਹਾਨੂੰ ਹੇਠਲੇ 3 ਵਿੱਚੋਂ ਕਿਸੇ 1 ਪ੍ਰੋਗਰਾਮ ਦੀ ਯੋਗਤਾ ਪੂਰੀ ਕਰਨੀ ਪੈਂਦੀ ਹੈ, ਫਿਰ ਤੁਹਾਨੂੰ 1,200 CRS ਅੰਕਾਂ ’ਤੇ ਰੈਂਕ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।'
            : 'Express Entry manages PR applications for 3 federal economic programs (~109,000 target in 2026). You must first qualify under 1 of the 3 programs below before receiving a Comprehensive Ranking System (CRS) score out of 1,200.'}
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
            <div className="text-xs font-semibold text-red-700">FSWP</div>
            <h2 className="mt-1 text-lg font-bold text-slate-900">
              {pa ? 'ਫੈਡਰਲ ਹੁਨਰਮੰਦ ਕਾਮੇ (FSWP)' : 'Federal Skilled Worker Program'}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li><strong>{pa ? 'ਕੰਮ:' : 'Work:'}</strong> {pa ? 'ਪਿਛਲੇ 10 ਸਾਲਾਂ ਵਿੱਚ 1 ਸਾਲ ਲਗਾਤਾਰ TEER 0–3 ਕੰਮ' : '1 year continuous skilled work (TEER 0–3) in last 10 years'}</li>
              <li><strong>{pa ? 'ਭਾਸ਼ਾ:' : 'Language:'}</strong> {pa ? 'ਚਾਰੋਂ ਹੁਨਰਾਂ ਵਿੱਚ ਘੱਟੋ-ਘੱਟ CLB 7' : 'Minimum CLB 7 in all 4 abilities'}</li>
              <li><strong>{pa ? 'ਗਰਿੱਡ:' : 'Selection Grid:'}</strong> {pa ? '100 ਵਿੱਚੋਂ ਘੱਟੋ-ਘੱਟ 67 ਅੰਕ' : '67 / 100 selection grid minimum'}</li>
              <li><strong>{pa ? 'ਫੰਡ:' : 'Funds:'}</strong> {pa ? 'ਸੈਟਲਮੈਂਟ ਫੰਡ ਜ਼ਰੂਰੀ ($14,690+ ਇੱਕਲੇ ਲਈ)' : 'Proof of funds required ($14,690+ single)'}</li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
            <div className="text-xs font-semibold text-emerald-700">CEC</div>
            <h2 className="mt-1 text-lg font-bold text-slate-900">
              {pa ? 'ਕੈਨੇਡੀਅਨ ਤਜਰਬਾ ਸ਼੍ਰੇਣੀ (CEC)' : 'Canadian Experience Class'}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li><strong>{pa ? 'ਕੰਮ:' : 'Work:'}</strong> {pa ? 'ਪਿਛਲੇ 3 ਸਾਲਾਂ ਵਿੱਚ 1 ਸਾਲ ਕੈਨੇਡੀਅਨ TEER 0–3 ਕੰਮ' : '1 year Canadian work (TEER 0–3) in last 3 years'}</li>
              <li><strong>{pa ? 'ਭਾਸ਼ਾ:' : 'Language:'}</strong> {pa ? 'TEER 0/1 ਲਈ CLB 7; TEER 2/3 ਲਈ CLB 5' : 'CLB 7 for TEER 0/1; CLB 5 for TEER 2/3'}</li>
              <li><strong>{pa ? 'ਗਰਿੱਡ:' : 'Selection Grid:'}</strong> {pa ? '67-ਅੰਕਾਂ ਦੀ ਲੋੜ ਨਹੀਂ' : 'No 67-point grid required'}</li>
              <li><strong>{pa ? 'ਫੰਡ:' : 'Funds:'}</strong> {pa ? 'ਬੈਂਕ ਫੰਡ ਦਿਖਾਉਣ ਦੀ ਲੋੜ ਨਹੀਂ' : 'NO Proof of Funds required (Exempt)'}</li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
            <div className="text-xs font-semibold text-amber-800">FSTP</div>
            <h2 className="mt-1 text-lg font-bold text-slate-900">
              {pa ? 'ਫੈਡਰਲ ਹੁਨਰਮੰਦ ਟ੍ਰੇਡਜ਼ (FSTP)' : 'Federal Skilled Trades Program'}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li><strong>{pa ? 'ਕੰਮ:' : 'Work:'}</strong> {pa ? 'ਪਿਛਲੇ 5 ਸਾਲਾਂ ਵਿੱਚ 2 ਸਾਲ ਟ੍ਰੇਡ ਤਜਰਬਾ' : '2 years skilled trades work in last 5 years'}</li>
              <li><strong>{pa ? 'ਭਾਸ਼ਾ:' : 'Language:'}</strong> {pa ? 'CLB 5 ਬੋਲਣਾ/ਸੁਣਨਾ; CLB 4 ਪੜ੍ਹਨਾ/ਲਿਖਣਾ' : 'CLB 5 speaking/listening; CLB 4 reading/writing'}</li>
              <li><strong>{pa ? 'ਸ਼ਰਤ:' : 'Requirement:'}</strong> {pa ? '1-ਸਾਲ ਦਾ ਜੌਬ ਆਫਰ ਜਾਂ Red Seal ਸਰਟੀਫਿਕੇਟ' : '1-year job offer OR Canadian Trade Certificate'}</li>
              <li><strong>{pa ? 'ਫੰਡ:' : 'Funds:'}</strong> {pa ? 'ਜੇ ਆਫਰ ਨਹੀਂ ਤਾਂ ਫੰਡ ਜ਼ਰੂਰੀ' : 'Proof of funds unless valid job offer'}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Nov 3, 2026 Reform & 9 Categories */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
          <h2 className="text-xl font-bold text-slate-900">
            {pa ? '3 ਨਵੰਬਰ 2026: ਲੇਬਰ ਮਾਰਕੀਟ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਫੈਕਟਰ (+150 ਤੱਕ, ਬਿਨਾਂ LMIA)' : 'Nov 3, 2026 Reform: Labour Market Integration (Up to +150 Points, No LMIA)'}
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            {pa
              ? '3 ਨਵੰਬਰ 2026 ਤੋਂ, IRCC ਨੇ ਪੁਰਾਣੇ LMIA ਜੌਬ-ਆਫਰ ਬੋਨਸ ਦੀ ਥਾਂ ਨਵਾਂ ਲੇਬਰ ਮਾਰਕੀਟ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਫੈਕਟਰ ਲਾਗੂ ਕੀਤਾ ਹੈ। ਇਹ ਬਿਨਾਂ LMIA (Labour Market Impact Assessment) ਦੇ ਮਜ਼ਬੂਤ ਕੈਨੇਡੀਅਨ ਰੁਜ਼ਗਾਰ, ਘਰੇਲੂ ਤਜਰਬੇ ਅਤੇ ਖੇਤਰੀ ਜੁੜਾਅ ਲਈ 150 ਤੱਕ CRS ਅੰਕ ਦਿੰਦਾ ਹੈ।'
              : 'Effective 3 November 2026, Express Entry introduced the Labour Market Integration factor awarding up to 150 CRS points based on verified Canadian employment integration, domestic work ties, and regional/sector alignment — with NO LMIA required.'}
          </p>

          <h3 className="mt-5 text-base font-bold text-slate-900">
            {pa ? '2026 ਦੀਆਂ 9 ਸ਼੍ਰੇਣੀ-ਅਧਾਰਤ (Category-Based) ਡਰਾਅ ਸੂਚੀਆਂ' : 'All 9 Category-Based Draw Groups in 2026'}
          </h3>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
            {CATEGORIES_2026.map((cat, idx) => (
              <li key={idx} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-medium">
                {idx + 1}. {pa ? cat.pa : cat.en}
              </li>
            ))}
          </ul>
        </div>

        {/* CRS 1200 Breakdown + FSWP 67 Grid */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
            <h2 className="text-xl font-bold text-slate-900">
              {pa ? 'ਪੂਰਾ CRS ਵੇਰਵਾ (1,200 ਅੰਕਾਂ ਵਿੱਚੋਂ)' : 'Full CRS Breakdown (Out of 1,200 Points)'}
            </h2>

            {/* Mobile CRS Cards */}
            <div className="md:hidden mt-3 space-y-2.5">
              {[
                {
                  title: pa ? 'A. ਮੁੱਖ ਮਨੁੱਖੀ ਪੂੰਜੀ' : 'A. Core Human Capital',
                  desc: pa ? 'ਉਮਰ, ਪੜ੍ਹਾਈ, ਭਾਸ਼ਾ, ਕੈਨੇਡੀਅਨ ਕੰਮ' : 'Age, Education, Languages, Canadian Work',
                  single: '500',
                  spouse: '460'
                },
                {
                  title: pa ? 'B. ਜੀਵਨ ਸਾਥੀ ਦੇ ਅੰਕ' : 'B. Spouse / Partner Factors',
                  desc: pa ? 'ਪੜ੍ਹਾਈ (10), ਭਾਸ਼ਾ (20), ਕੰਮ (10)' : 'Education (10), Language (20), Canadian Work (10)',
                  single: '0',
                  spouse: '40'
                },
                {
                  title: pa ? 'C. ਹੁਨਰ ਤਬਦੀਲੀ' : 'C. Skill Transferability',
                  desc: pa ? 'ਪੜ੍ਹਾਈ/ਵਿਦੇਸ਼ੀ ਕੰਮ + ਭਾਸ਼ਾ/ਕੈਨੇਡੀਅਨ ਕੰਮ' : 'Education & Foreign Work combinations + Trade cert',
                  single: '100',
                  spouse: '100'
                },
                {
                  title: pa ? 'D. ਵਾਧੂ ਅੰਕ' : 'D. Additional Points',
                  desc: pa ? 'PNP (+600), ਲੇਬਰ ਇੰਟੀਗ੍ਰੇਸ਼ਨ (+150), ਫ੍ਰੈਂਚ (+50), ਪੜ੍ਹਾਈ (+30), ਭਰਾ/ਭੈਣ (+15)' : 'PNP (+600), Labour Integration (+150), French (+50), Study (+30), Sibling (+15)',
                  single: '600',
                  spouse: '600'
                }
              ].map((row) => (
                <div key={row.title} className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <div className="text-sm font-bold text-slate-900">{row.title}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{row.desc}</div>
                  <div className="mt-2 flex items-center gap-4 text-xs tabular-nums">
                    <span>{pa ? 'ਇੱਕਲੇ:' : 'Single:'} <strong className="font-mono text-slate-900">{row.single}</strong></span>
                    <span>{pa ? 'ਜੀਵਨ ਸਾਥੀ ਸਮੇਤ:' : 'With Spouse:'} <strong className="font-mono text-slate-900">{row.spouse}</strong></span>
                  </div>
                </div>
              ))}
              <div className="rounded-xl border border-red-200 bg-red-50/60 p-3 flex items-center justify-between text-sm font-bold tabular-nums">
                <span className="text-slate-900">{pa ? 'ਕੁੱਲ CRS' : 'TOTAL MAXIMUM'}</span>
                <span className="font-mono text-red-700">1,200 / 1,200</span>
              </div>
            </div>

            {/* Desktop CRS Table */}
            <div className="hidden md:block mt-3 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 text-slate-800">
                  <tr>
                    <th className="px-3 py-2.5 font-bold">{pa ? 'CRS ਭਾਗ' : 'CRS Component'}</th>
                    <th className="px-3 py-2.5 font-bold tabular-nums">{pa ? 'ਇੱਕਲੇ' : 'Single'}</th>
                    <th className="px-3 py-2.5 font-bold tabular-nums">{pa ? 'ਜੀਵਨ ਸਾਥੀ ਸਮੇਤ' : 'With Spouse'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-3 py-2.5">
                      <div className="font-semibold">A. {pa ? 'ਮੁੱਖ ਮਨੁੱਖੀ ਪੂੰਜੀ' : 'Core Human Capital'}</div>
                      <div className="text-xs text-slate-500">{pa ? 'ਉਮਰ, ਪੜ੍ਹਾਈ, ਭਾਸ਼ਾ, ਕੈਨੇਡੀਅਨ ਕੰਮ' : 'Age, Education, Languages, Canadian Work'}</div>
                    </td>
                    <td className="px-3 py-2.5 font-mono font-bold tabular-nums">500</td>
                    <td className="px-3 py-2.5 font-mono font-bold tabular-nums">460</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5">
                      <div className="font-semibold">B. {pa ? 'ਜੀਵਨ ਸਾਥੀ ਦੇ ਅੰਕ' : 'Spouse / Partner Factors'}</div>
                      <div className="text-xs text-slate-500">{pa ? 'ਪੜ੍ਹਾਈ (10), ਭਾਸ਼ਾ (20), ਕੰਮ (10)' : 'Education (10), Language (20), Canadian Work (10)'}</div>
                    </td>
                    <td className="px-3 py-2.5 font-mono tabular-nums">0</td>
                    <td className="px-3 py-2.5 font-mono font-bold tabular-nums">40</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5">
                      <div className="font-semibold">C. {pa ? 'ਹੁਨਰ ਤਬਦੀਲੀ' : 'Skill Transferability'}</div>
                      <div className="text-xs text-slate-500">{pa ? 'ਪੜ੍ਹਾਈ/ਵਿਦੇਸ਼ੀ ਕੰਮ + ਭਾਸ਼ਾ/ਕੈਨੇਡੀਅਨ ਕੰਮ' : 'Education & Foreign Work combinations + Trade cert'}</div>
                    </td>
                    <td className="px-3 py-2.5 font-mono font-bold tabular-nums">100</td>
                    <td className="px-3 py-2.5 font-mono font-bold tabular-nums">100</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5">
                      <div className="font-semibold">D. {pa ? 'ਵਾਧੂ ਅੰਕ' : 'Additional Points'}</div>
                      <div className="text-xs text-slate-500">{pa ? 'PNP (+600), ਲੇਬਰ ਇੰਟੀਗ੍ਰੇਸ਼ਨ (+150), ਫ੍ਰੈਂਚ (+50), ਪੜ੍ਹਾਈ (+30), ਭਰਾ/ਭੈਣ (+15)' : 'PNP (+600), Labour Integration (+150), French (+50), Study (+30), Sibling (+15)'}</div>
                    </td>
                    <td className="px-3 py-2.5 font-mono font-bold tabular-nums">600</td>
                    <td className="px-3 py-2.5 font-mono font-bold tabular-nums">600</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold">
                    <td className="px-3 py-2.5">{pa ? 'ਕੁੱਲ CRS' : 'TOTAL MAXIMUM'}</td>
                    <td className="px-3 py-2.5 font-mono tabular-nums text-red-700">1,200</td>
                    <td className="px-3 py-2.5 font-mono tabular-nums text-red-700">1,200</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
            <h2 className="text-xl font-bold text-slate-900">
              {pa ? 'FSWP 67-ਅੰਕ ਚੋਣ ਗਰਿੱਡ (ਸਿਰਫ਼ FSWP ਲਈ)' : 'FSWP 67-Point Selection Grid Checker'}
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              {pa ? 'CEC ਲਈ ਲੋੜੀਂਦਾ ਨਹੀਂ। FSWP ਲਈ 100 ਵਿੱਚੋਂ ਘੱਟੋ-ਘੱਟ 67 ਅੰਕ ਚਾਹੀਦੇ ਹਨ।' : 'Required only for FSWP (not CEC). Pass mark is 67 / 100.'}
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-xs font-semibold">
                <span>{pa ? 'ਉਮਰ (18–35 = 12)' : 'Age (18–35 = 12)'}</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={18}
                  max={60}
                  className="min-h-[44px] rounded-lg border border-slate-300 px-2.5 text-base sm:text-sm font-normal tabular-nums"
                  value={f67.age}
                  onChange={(e) => setF67({ ...f67, age: Number(e.target.value) || 25 })}
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold">
                <span>{pa ? 'ਪੜ੍ਹਾਈ' : 'Education'}</span>
                <select
                  className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-2.5 text-base sm:text-sm font-normal"
                  value={f67.edu}
                  onChange={(e) => setF67({ ...f67, edu: e.target.value as EducationLevel })}
                >
                  <option value="phd">PhD (25)</option>
                  <option value="mast">Master’s (23)</option>
                  <option value="two">Two+ (22)</option>
                  <option value="bach">Bachelor’s (21)</option>
                  <option value="2yr">2-yr Diploma (19)</option>
                  <option value="1yr">1-yr Diploma (15)</option>
                  <option value="hs">High School (5)</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold">
                <span>{pa ? '1st ਭਾਸ਼ਾ CLB' : '1st Language CLB'}</span>
                <select
                  className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-2.5 text-base sm:text-sm font-normal"
                  value={f67.l1MinClb}
                  onChange={(e) => setF67({ ...f67, l1MinClb: Number(e.target.value) })}
                >
                  <option value={9}>CLB 9+ (24 pts)</option>
                  <option value={8}>CLB 8 (20 pts)</option>
                  <option value={7}>CLB 7 (16 pts)</option>
                  <option value={6}>Below CLB 7 (Ineligible)</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold">
                <span>{pa ? '2nd ਭਾਸ਼ਾ CLB 5+?' : '2nd Language CLB 5+?'}</span>
                <select
                  className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-2.5 text-base sm:text-sm font-normal"
                  value={f67.l2Clb5 ? '1' : '0'}
                  onChange={(e) => setF67({ ...f67, l2Clb5: e.target.value === '1' })}
                >
                  <option value="0">{pa ? 'ਨਹੀਂ (0)' : 'No (0 pts)'}</option>
                  <option value="1">{pa ? 'ਹਾਂ (+4)' : 'Yes (+4 pts)'}</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold">
                <span>{pa ? 'ਹੁਨਰਮੰਦ ਕੰਮ (ਸਾਲ)' : 'Skilled Work (Years)'}</span>
                <select
                  className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-2.5 text-base sm:text-sm font-normal"
                  value={f67.skilledYears}
                  onChange={(e) => setF67({ ...f67, skilledYears: Number(e.target.value) })}
                >
                  <option value={1}>1 yr (9 pts)</option>
                  <option value={2}>2–3 yrs (11 pts)</option>
                  <option value={4}>4–5 yrs (13 pts)</option>
                  <option value={6}>6+ yrs (15 pts)</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold">
                <span>{pa ? 'ਅਨੁਕੂਲਤਾ / ਆਫਰ' : 'Adaptability / Offer'}</span>
                <select
                  className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-2.5 text-base sm:text-sm font-normal"
                  value={`${f67.arrangedJob ? 10 : 0}-${f67.adaptabilityPts}`}
                  onChange={(e) => {
                    const [j, a] = e.target.value.split('-').map(Number);
                    setF67({ ...f67, arrangedJob: j === 10, adaptabilityPts: a });
                  }}
                >
                  <option value="0-0">{pa ? 'ਕੋਈ ਨਹੀਂ (0)' : 'None (0 pts)'}</option>
                  <option value="0-5">{pa ? 'ਰਿਸ਼ਤੇਦਾਰ/ਪੜ੍ਹਾਈ (+5)' : 'Sibling / Study / Spouse CLB4 (+5)'}</option>
                  <option value="0-10">{pa ? '1 yr ਕੈਨੇਡੀਅਨ ਕੰਮ (+10)' : '1 yr Canadian Work (+10)'}</option>
                  <option value="10-5">{pa ? 'ਜੌਬ ਆਫਰ (+15)' : 'Arranged Employment (+15 total)'}</option>
                </select>
              </label>
            </div>
            <div
              className={`mt-4 rounded-xl border p-3 text-sm font-semibold tabular-nums ${
                gridRes.pass ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-red-200 bg-red-50 text-red-900'
              }`}
            >
              <span className="font-mono text-base">{gridRes.total} / 100</span> —{' '}
              {gridRes.pass
                ? pa ? 'ਪਾਸ (FSWP 67+ ਪੂਰੇ)' : 'PASS — Meets FSWP 67-point minimum'
                : pa ? '67 ਤੋਂ ਘੱਟ (ਜਾਂ CLB 7 ਤੋਂ ਘੱਟ)' : 'Below 67 pass mark (or below CLB 7)'}
            </div>
          </div>
        </div>
      </section>

      <CrsCalculatorWidget lang={lang} onSaveCrs={onSaveCrs} />
    </div>
  );
}
