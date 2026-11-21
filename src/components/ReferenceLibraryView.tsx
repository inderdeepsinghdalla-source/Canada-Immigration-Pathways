import { useEffect, useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  Compass,
  ExternalLink,
  FileText,
  Languages,
  MapPin,
  Plane,
  Search
} from 'lucide-react';
import {
  ECA_ORGS,
  FAQ_DATA,
  GLOSSARY_DATA,
  LANGUAGE_TABLE,
  PNP_PROVINCES,
  TEER_TABLE
} from '../data/immigrationData';
import { FaqEntry, Lang } from '../types';
import { tText } from '../utils/profileStorage';
import { DisclaimerBanner } from './DisclaimerBanner';

export interface LibraryFocusRequest {
  subTab: 'faq' | 'glossary' | 'lang' | 'teer' | 'fees';
  query?: string;
  seq: number;
}

interface Props {
  lang: Lang;
  focusRequest?: LibraryFocusRequest | null;
}

const FAQ_CATEGORIES: {
  id: FaqEntry['cat'];
  en: string;
  pa: string;
  descEn: string;
  descPa: string;
  icon: typeof Plane;
}[] = [
  {
    id: 'ee',
    en: 'Express Entry (FSWP, CEC, FSTP & CRS)',
    pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ (FSWP, CEC, FSTP ਅਤੇ CRS)',
    descEn: 'Nov 3 +150 integration rules, pool stats, proof of funds, category draws',
    descPa: '3 ਨਵੰਬਰ +150 ਨਿਯਮ, ਪੂਲ ਅੰਕੜੇ, ਫੰਡ ਅਤੇ ਸ਼੍ਰੇਣੀ ਡਰਾਅ',
    icon: Plane
  },
  {
    id: 'pnp',
    en: 'PNP & Quebec Pathways',
    pa: 'ਸੂਬਾਈ PNP ਅਤੇ ਕਿਊਬੈਕ',
    descEn: 'Ontario OWP, BC, Alberta, Saskatchewan, +600 CRS & Quebec PSTQ',
    descPa: 'ਓਂਟਾਰੀਓ OWP, BC, ਅਲਬਰਟਾ, ਸਸਕੈਚਵਨ, +600 CRS ਅਤੇ ਕਿਊਬੈਕ PSTQ',
    icon: MapPin
  },
  {
    id: 'language',
    en: 'Language Tests & ECA',
    pa: 'ਭਾਸ਼ਾ ਟੈਸਟ (IELTS/CELPIP/TEF) ਅਤੇ ECA',
    descEn: 'Accepted 2026 exams, single-sitting rules, 2-yr validity, French points & WES',
    descPa: 'ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਟੈਸਟ, 2-ਸਾਲ ਮਿਆਦ, ਫ੍ਰੈਂਚ ਅੰਕ ਅਤੇ ECA ਰਿਪੋਰਟ',
    icon: Languages
  },
  {
    id: 'docs',
    en: 'Documents, Fees & Fraud Protection',
    pa: 'ਦਸਤਾਵੇਜ਼, ਫੀਸਾਂ ਅਤੇ ਧੋਖਾਧੜੀ ਤੋਂ ਬਚਾਅ',
    descEn: 'Reference letters, police checks, 2026 IRCC fees, BOWP, RCIC & LMIA scams',
    descPa: 'ਰੈਫਰੈਂਸ ਲੈਟਰ, ਪੁਲਿਸ ਕਲੀਅਰੈਂਸ, ਫੀਸਾਂ, BOWP ਅਤੇ ਨਕਲੀ ਏਜੰਟਾਂ ਤੋਂ ਬਚਾਅ',
    icon: FileText
  },
  {
    id: 'regional',
    en: 'Regional Pilots, Study & Family',
    pa: 'ਖੇਤਰੀ ਪਾਇਲਟ, ਪੜ੍ਹਾਈ (PGWP) ਅਤੇ ਪਰਿਵਾਰ',
    descEn: 'AIP, RCIP/FCIP, Study → PGWP, Spousal/Parents & closed pilots',
    descPa: 'AIP, RCIP/FCIP, Study → PGWP, ਪਰਿਵਾਰਕ ਸਪਾਂਸਰਸ਼ਿਪ ਅਤੇ ਬੰਦ ਪਾਇਲਟ',
    icon: Compass
  },
  {
    id: 'general',
    en: 'General 2026 PR Rules & Overview',
    pa: 'ਆਮ 2026 PR ਨਿਯਮ ਅਤੇ ਸੰਖੇਪ',
    descEn: '2026 PR targets, age rules, job offers, past refusals & COPR residency',
    descPa: '2026 ਟੀਚੇ, ਉਮਰ, ਜੌਬ ਆਫਰ, ਪੁਰਾਣੇ ਰਿਫਿਊਜ਼ਲ ਅਤੇ PR ਸ਼ਰਤਾਂ',
    icon: BookOpen
  }
];

const TIMELINES = [
  {
    name: { en: '1. Study → PGWP → CEC', pa: '1. ਪੜ੍ਹਾਈ → PGWP → CEC' },
    total: { en: '~3–4 years', pa: '~3–4 ਸਾਲ' },
    steps: {
      en: 'Study 1–2+ yrs at PGWP-eligible DLI → Get PGWP (1–3 yrs) → Work 1 yr TEER 0–3 → Express Entry CEC ITA → 5–6 mo PR processing',
      pa: 'PGWP-ਯੋਗ ਕਾਲਜ ਵਿੱਚ 1–2+ ਸਾਲ ਪੜ੍ਹਾਈ → PGWP (1–3 ਸਾਲ) → 1 ਸਾਲ TEER 0–3 ਕੰਮ → CEC ITA → 5–6 ਮਹੀਨੇ PR'
    }
  },
  {
    name: { en: '2. Work → PNP (+600 CRS)', pa: '2. ਕੰਮ → PNP (+600 CRS)' },
    total: { en: '~12–20 months', pa: '~12–20 ਮਹੀਨੇ' },
    steps: {
      en: 'Secure skilled job offer / work in province → Provincial EOI → Nomination (+600 CRS or base PNP) → Federal PR (6 mo EE / 12–20 mo non-EE)',
      pa: 'ਸੂਬੇ ਵਿੱਚ ਜੌਬ ਆਫਰ/ਕੰਮ → ਸੂਬਾਈ EOI → ਨਾਮਜ਼ਦਗੀ (+600 CRS) → ਫੈਡਰਲ PR (6 ਮਹੀਨੇ EE / 12–20 ਮਹੀਨੇ ਨਾਨ-EE)'
    }
  },
  {
    name: { en: '3. Outside Canada → FSWP', pa: '3. ਕੈਨੇਡਾ ਤੋਂ ਬਾਹਰ → FSWP' },
    total: { en: '~9–15 months', pa: '~9–15 ਮਹੀਨੇ' },
    steps: {
      en: 'IELTS/CELPIP CLB 7–9 + ECA (1–3 mo) → Express Entry Pool → Category or General ITA → Medical & Police → 5–6 mo PR approval',
      pa: 'ਭਾਸ਼ਾ ਟੈਸਟ + ECA (1–3 ਮਹੀਨੇ) → ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਪੂਲ → ITA → ਮੈਡੀਕਲ/ਪੁਲਿਸ → 5–6 ਮਹੀਨੇ PR'
    }
  },
  {
    name: { en: '4. French Language Route', pa: '4. ਫ੍ਰੈਂਚ ਭਾਸ਼ਾ ਰਸਤਾ' },
    total: { en: '~8–16 months', pa: '~8–16 ਮਹੀਨੇ' },
    steps: {
      en: 'Study French to NCLC 7 (TEF/TCF) + English CLB 5+ → +50 CRS bonus & French draws (~407 CRS), Quebec PSTQ, or FCIP (NCLC 5)',
      pa: 'TEF/TCF NCLC 7 + ਅੰਗਰੇਜ਼ੀ CLB 5+ → +50 ਅੰਕ ਅਤੇ ਫ੍ਰੈਂਚ ਡਰਾਅ (~407 CRS), ਕਿਊਬੈਕ, ਜਾਂ FCIP'
    }
  },
  {
    name: { en: '5. Skilled Trades Route (FSTP / PNP)', pa: '5. ਹੁਨਰਮੰਦ ਟ੍ਰੇਡਜ਼ ਰਸਤਾ' },
    total: { en: '~9–18 months', pa: '~9–18 ਮਹੀਨੇ' },
    steps: {
      en: '2 yrs TEER 2/3 trade work + CLB 5/4 + Red Seal Certificate or 1-yr Job Offer → Express Entry Trades Draw (~476 CRS) or PNP',
      pa: '2 ਸਾਲ TEER 2/3 ਟ੍ਰੇਡ ਕੰਮ + CLB 5/4 + Red Seal ਜਾਂ 1-ਸਾਲ ਆਫਰ → ਟ੍ਰੇਡਜ਼ ਡਰਾਅ (~476 CRS) ਜਾਂ PNP'
    }
  }
];

const REFUSAL_REASONS = [
  {
    title: { en: 'Wrong NOC Code or Missing Reference Letter Duties', pa: 'ਗਲਤ NOC ਕੋਡ ਜਾਂ ਅਧੂਰੀ ਡਿਊਟੀ ਸੂਚੀ' },
    fix: { en: 'Duties listed in your employer letter must match the lead statement and main duties of your chosen 5-digit NOC 2021 code—not just the job title.', pa: 'ਤੁਹਾਡੀ ਚਿੱਠੀ ਵਿੱਚ ਲਿਖੀਆਂ ਡਿਊਟੀਆਂ ਤੁਹਾਡੇ NOC ਕੋਡ ਨਾਲ ਮੇਲ ਖਾਣੀਆਂ ਚਾਹੀਦੀਆਂ ਹਨ, ਸਿਰਫ਼ ਅਹੁਦਾ ਨਹੀਂ।' }
  },
  {
    title: { en: 'Misrepresentation (Undeclared Refusals or Fake Documents)', pa: 'ਗਲਤ ਜਾਣਕਾਰੀ / ਪੁਰਾਣਾ ਰਿਫਿਊਜ਼ਲ ਛੁਪਾਉਣਾ' },
    fix: { en: 'Declare EVERY previous visa refusal from Canada, US, UK, Australia, or Schengen. Never use altered bank or work documents (5-year ban!).', pa: 'ਕੈਨੇਡਾ, USA, UK ਜਾਂ ਕਿਸੇ ਵੀ ਦੇਸ਼ ਦਾ ਪੁਰਾਣਾ ਰਿਫਿਊਜ਼ਲ ਸੱਚ-ਸੱਚ ਦੱਸੋ। ਨਕਲੀ ਕਾਗਜ਼ ’ਤੇ 5 ਸਾਲ ਦਾ ਬੈਨ ਲੱਗਦਾ ਹੈ।' }
  },
  {
    title: { en: 'Insufficient or Unexplained Proof of Funds (FSWP)', pa: 'FSWP ਫੰਡਾਂ ਵਿੱਚ ਅਚਾਨਕ ਵੱਡੀ ਰਕਮ ਜਾਂ ਘਾਟ' },
    fix: { en: 'Avoid sudden large cash deposits before applying. If a family member gifted funds, attach a signed Gift Deed and bank transfer trail.', pa: 'ਅਚਾਨਕ ਵੱਡੀ ਨਕਦੀ ਜਮ੍ਹਾਂ ਨਾ ਕਰਵਾਓ। ਜੇ ਪਰਿਵਾਰ ਨੇ ਪੈਸੇ ਦਿੱਤੇ ਹਨ ਤਾਂ Gift Deed ਲਗਾਓ।' }
  },
  {
    title: { en: 'Expired Language Test or Incomplete Police Certificates', pa: 'ਮਿਆਦ ਪੁੱਗਿਆ ਭਾਸ਼ਾ ਟੈਸਟ ਜਾਂ ਅਧੂਰੀ ਪੁਲਿਸ ਕਲੀਅਰੈਂਸ' },
    fix: { en: 'Language scores must be under 2 years old on the exact day you submit e-APR. Include police certificates for ALL countries lived 6+ months.', pa: 'ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰਨ ਵਾਲੇ ਦਿਨ ਭਾਸ਼ਾ ਟੈਸਟ 2 ਸਾਲ ਤੋਂ ਘੱਟ ਪੁਰਾਣਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ।' }
  }
];

export function ReferenceLibraryView({ lang, focusRequest }: Props) {
  const pa = lang === 'pa';
  const [subTab, setSubTab] = useState<'lang' | 'teer' | 'fees' | 'glossary' | 'faq'>('lang');
  const [faqQuery, setFaqQuery] = useState('');
  const [faqCat, setFaqCat] = useState<'all' | FaqEntry['cat']>('all');
  const [openFaqCats, setOpenFaqCats] = useState<Record<FaqEntry['cat'], boolean>>({
    ee: true,
    pnp: false,
    language: true,
    docs: false,
    regional: false,
    general: false
  });

  useEffect(() => {
    if (!focusRequest) return;
    setSubTab(focusRequest.subTab);
    if (focusRequest.subTab === 'faq') {
      setFaqCat('all');
      setFaqQuery(focusRequest.query ?? '');
    }
  }, [focusRequest]);

  const toggleFaqCategory = (cat: FaqEntry['cat']) => {
    setOpenFaqCats((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const setAllFaqCategories = (open: boolean) => {
    setOpenFaqCats({
      ee: open,
      pnp: open,
      language: open,
      docs: open,
      regional: open,
      general: open
    });
  };

  const qNormalized = faqQuery.trim().toLowerCase();
  const filteredFaqs = FAQ_DATA.filter((f) => {
    const matchCat = faqCat === 'all' || f.cat === faqCat;
    if (!qNormalized) return matchCat;
    return (
      matchCat &&
      (f.q.en.toLowerCase().includes(qNormalized) ||
        f.q.pa.toLowerCase().includes(qNormalized) ||
        f.a.en.toLowerCase().includes(qNormalized) ||
        f.a.pa.toLowerCase().includes(qNormalized))
    );
  });

  const groupedFaqs = FAQ_CATEGORIES.filter((catMeta) => faqCat === 'all' || faqCat === catMeta.id)
    .map((catMeta) => ({
      ...catMeta,
      items: filteredFaqs.filter((f) => f.cat === catMeta.id)
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="space-y-6">
      <DisclaimerBanner lang={lang} />

      <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 rounded-xl bg-slate-200/70 p-1 w-full sm:w-fit">
        {[
          { id: 'lang', en: 'Language Tables', pa: 'ਭਾਸ਼ਾ ਟੇਬਲ' },
          { id: 'teer', en: 'NOC TEER & ECA', pa: 'NOC TEER ਅਤੇ ECA' },
          { id: 'fees', en: 'Fees, Timelines & Comparison', pa: 'ਫੀਸਾਂ, ਸਮਾਂ ਅਤੇ ਤੁਲਨਾ' },
          { id: 'glossary', en: 'Glossary, Refusals & Links', pa: 'ਸ਼ਬਦਾਵਲੀ ਅਤੇ ਲਿੰਕ' },
          { id: 'faq', en: `FAQ (${FAQ_DATA.length})`, pa: `ਸਵਾਲ-ਜਵਾਬ (${FAQ_DATA.length})` }
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSubTab(t.id as typeof subTab)}
            className={`min-h-[42px] shrink-0 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              subTab === t.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {pa ? t.pa : t.en}
          </button>
        ))}
      </div>

      {subTab === 'lang' && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs">
          <h1 className="text-2xl font-bold text-slate-900">
            {pa ? 'ਭਾਸ਼ਾ ਟੈਸਟ ਤੁਲਨਾ ਟੇਬਲ (CLB / NCLC)' : 'Language Equivalence Table (IELTS, CELPIP, PTE, TEF, TCF → CLB/NCLC)'}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {pa
              ? 'CLB (Canadian Language Benchmark) ਤੁਹਾਡੇ ਟੈਸਟ ਨੰਬਰਾਂ ਨੂੰ ਕੈਨੇਡਾ ਦੇ ਮਿਆਰੀ ਪੱਧਰ 4–10+ ਵਿੱਚ ਬਦਲਦਾ ਹੈ। PR ਲਈ ਸਿਰਫ਼ IELTS General Training ਮਨਜ਼ੂਰ ਹੈ (Academic ਨਹੀਂ)।'
              : 'CLB/NCLC converts your raw exam scores into Canada’s standard 1–12 scale. Note: IELTS Academic is NOT accepted for PR—only IELTS General Training, CELPIP-G, PTE Core, TEF Canada, or TCF Canada.'}
          </p>

          {/* Mobile Cards */}
          <div className="md:hidden mt-4 space-y-3">
            {LANGUAGE_TABLE.map((row) => (
              <div key={row.clb} className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                <div className="text-base font-bold text-red-700">{row.clb}</div>
                <dl className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <dt className="text-slate-500 font-semibold">IELTS General</dt>
                    <dd className="font-mono font-semibold text-slate-900 tabular-nums">{row.ielts}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500 font-semibold">CELPIP-G</dt>
                    <dd className="font-mono font-semibold text-slate-900 tabular-nums">{row.celpip}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500 font-semibold">PTE Core</dt>
                    <dd className="font-mono font-semibold text-slate-900 tabular-nums">{row.pte}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500 font-semibold">TEF Canada</dt>
                    <dd className="font-mono font-semibold text-slate-900 tabular-nums">{row.tef}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-slate-500 font-semibold">TCF Canada</dt>
                    <dd className="font-mono font-semibold text-slate-900 tabular-nums">{row.tcf}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 text-slate-800">
                <tr>
                  <th className="px-3 py-3 font-bold">CLB / NCLC</th>
                  <th className="px-3 py-3 font-bold">IELTS General</th>
                  <th className="px-3 py-3 font-bold">CELPIP-G</th>
                  <th className="px-3 py-3 font-bold">PTE Core</th>
                  <th className="px-3 py-3 font-bold">TEF Canada</th>
                  <th className="px-3 py-3 font-bold">TCF Canada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 tabular-nums font-mono text-xs sm:text-sm">
                {LANGUAGE_TABLE.map((row) => (
                  <tr key={row.clb} className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-bold text-red-700 font-sans">{row.clb}</td>
                    <td className="px-3 py-3">{row.ielts}</td>
                    <td className="px-3 py-3">{row.celpip}</td>
                    <td className="px-3 py-3">{row.pte}</td>
                    <td className="px-3 py-3">{row.tef}</td>
                    <td className="px-3 py-3">{row.tcf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {subTab === 'teer' && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs">
            <h1 className="text-2xl font-bold text-slate-900">
              {pa ? 'NOC TEER 0–5 ਵਿਆਖਿਆ' : 'NOC 2021 & TEER 0–5 Skill Levels Explained'}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {pa
                ? 'NOC ਹਰ ਨੌਕਰੀ ਦਾ 5-ਅੰਕਾਂ ਵਾਲਾ ਕੋਡ ਹੈ, ਅਤੇ TEER 0–5 ਦੱਸਦਾ ਹੈ ਕਿ ਉਸ ਕੰਮ ਲਈ ਕਿੰਨੀ ਪੜ੍ਹਾਈ/ਸਿਖਲਾਈ ਚਾਹੀਦੀ ਹੈ। Express Entry ਲਈ TEER 0, 1, 2, 3 ਯੋਗ ਹਨ।'
                : 'NOC is Canada’s 5-digit job code system. TEER (Training, Education, Experience, Responsibilities) rates skill 0 to 5. Express Entry accepts TEER 0–3.'}
            </p>

            {/* Mobile TEER Cards */}
            <div className="md:hidden mt-4 space-y-3">
              {TEER_TABLE.map((t) => (
                <div key={t.teer} className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-slate-900">{t.teer}</span>
                    <span className={`text-xs font-bold ${t.ee ? 'text-emerald-800' : 'text-amber-800'}`}>
                      {t.ee ? (pa ? 'EE ਯੋਗ (TEER 0–3)' : 'Express Entry: Yes') : pa ? 'EE ਨਹੀਂ (PNP/AIP/RCIP)' : 'No (Use AIP/RCIP/PNP)'}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900">{tText(t.level, lang)}</div>
                  <div className="text-xs text-slate-600">{tText(t.ex, lang)}</div>
                </div>
              ))}
            </div>

            {/* Desktop TEER Table */}
            <div className="hidden md:block mt-4 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 text-slate-800">
                  <tr>
                    <th className="px-3 py-3 font-bold">TEER</th>
                    <th className="px-3 py-3 font-bold">{pa ? 'ਪੱਧਰ' : 'Qualification Level'}</th>
                    <th className="px-3 py-3 font-bold">{pa ? 'ਉਦਾਹਰਨਾਂ' : 'Example Jobs'}</th>
                    <th className="px-3 py-3 font-bold">Express Entry?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {TEER_TABLE.map((t) => (
                    <tr key={t.teer}>
                      <td className="px-3 py-3 font-mono font-bold text-slate-900">{t.teer}</td>
                      <td className="px-3 py-3 font-medium">{tText(t.level, lang)}</td>
                      <td className="px-3 py-3 text-slate-600">{tText(t.ex, lang)}</td>
                      <td className="px-3 py-3 font-semibold">{t.ee ? (pa ? 'ਹਾਂ (TEER 0–3)' : 'Yes') : pa ? 'ਨਹੀਂ (PNP/AIP/RCIP)' : 'No (Use AIP/RCIP/PNP)'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900">
              {pa ? 'ECA (Educational Credential Assessment) ਸੰਸਥਾਵਾਂ' : 'ECA Organizations (Proving Foreign Degrees)'}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {pa ? 'ਵਿਦੇਸ਼ੀ ਡਿਗਰੀ ਦੇ ਅੰਕ ਲੈਣ ਲਈ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਸੰਸਥਾ ਤੋਂ ECA (5 ਸਾਲ ਵੈਧ) ਕਰਵਾਉਣੀ ਪੈਂਦੀ ਹੈ।' : 'To claim Express Entry points for a degree earned outside Canada, you need an ECA (valid 5 years).'}
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {ECA_ORGS.map((org) => (
                <div key={org.name} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="font-bold text-slate-900">{org.name}</div>
                  <div className="text-xs font-mono text-slate-500 mt-0.5">{org.speed}</div>
                  <p className="mt-1.5 text-sm text-slate-700">{tText(org.note, lang)}</p>
                  <a href={org.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-[36px] items-center gap-1 text-xs font-semibold text-red-700 hover:underline">
                    <span>{pa ? 'ਵੈੱਬਸਾਈਟ ਦੇਖੋ' : 'Visit official site'}</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {subTab === 'fees' && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs">
            <h1 className="text-2xl font-bold text-slate-900">
              {pa ? '2026 ਸਰਕਾਰੀ ਫੀਸਾਂ ਅਤੇ ਪ੍ਰੋਸੈਸਿੰਗ ਸਮਾਂ' : '2026 Official IRCC Fees & Processing Times'}
            </h1>

            {/* Mobile Fee Cards */}
            <div className="md:hidden mt-4 space-y-2.5">
              {[
                { item: 'Express Entry (FSWP / CEC / FSTP)', cad: '$1,525 ($950 + $575 RPRF)', time: '~5–6 months' },
                { item: 'Spouse / Partner Included', cad: '$1,525 ($950 + $575 RPRF)', time: pa ? 'ਨਾਲ ਹੀ' : 'Processed together' },
                { item: 'Dependent Child (under 22)', cad: '$260 per child', time: pa ? 'ਨਾਲ ਹੀ' : 'Processed together' },
                { item: 'Biometrics (1 person / family max)', cad: '$85 / $170 max', time: '1–4 weeks' },
                { item: 'Provincial Nominee (Non-EE Federal)', cad: '$1,525 + Prov fee ($0–$2,000)', time: '~12–20 months' },
                { item: 'Quebec Skilled Worker (CSQ + Federal)', cad: '~$920–$958 CSQ + $1,525', time: '~6 mo CSQ + 10–16 mo PR' }
              ].map((fee) => (
                <div key={fee.item} className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <div className="text-sm font-bold text-slate-900">{fee.item}</div>
                  <div className="mt-1 flex flex-wrap justify-between gap-2 text-xs tabular-nums">
                    <span className="font-mono font-bold text-red-700">{fee.cad}</span>
                    <span className="text-slate-600">{fee.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Fee Table */}
            <div className="hidden md:block mt-4 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 text-slate-800">
                  <tr>
                    <th className="px-3 py-3 font-bold">{pa ? 'ਫੀਸ ਦੀ ਕਿਸਮ' : 'Fee Item'}</th>
                    <th className="px-3 py-3 font-bold tabular-nums">{pa ? 'ਰਕਮ (CAD)' : 'Amount (CAD)'}</th>
                    <th className="px-3 py-3 font-bold">{pa ? 'ਮਿਆਰੀ ਸਮਾਂ' : 'Typical Processing'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 tabular-nums">
                  <tr><td className="px-3 py-3 font-semibold">Express Entry (FSWP / CEC / FSTP)</td><td className="px-3 py-3 font-mono font-bold">$1,525 ($950 + $575 RPRF)</td><td className="px-3 py-3">~5–6 months</td></tr>
                  <tr><td className="px-3 py-3 font-semibold">Spouse / Partner Included</td><td className="px-3 py-3 font-mono font-bold">$1,525 ($950 + $575 RPRF)</td><td className="px-3 py-3">{pa ? 'ਨਾਲ ਹੀ' : 'Processed together'}</td></tr>
                  <tr><td className="px-3 py-3 font-semibold">Dependent Child (under 22)</td><td className="px-3 py-3 font-mono font-bold">$260 per child</td><td className="px-3 py-3">{pa ? 'ਨਾਲ ਹੀ' : 'Processed together'}</td></tr>
                  <tr><td className="px-3 py-3 font-semibold">Biometrics (1 person / family max)</td><td className="px-3 py-3 font-mono font-bold">$85 / $170 max</td><td className="px-3 py-3">1–4 weeks</td></tr>
                  <tr><td className="px-3 py-3 font-semibold">Provincial Nominee (Non-EE Federal)</td><td className="px-3 py-3 font-mono font-bold">$1,525 + Prov fee ($0–$2,000)</td><td className="px-3 py-3">~12–20 months</td></tr>
                  <tr><td className="px-3 py-3 font-semibold">Quebec Skilled Worker (CSQ + Federal)</td><td className="px-3 py-3 font-mono font-bold">~$920–$958 CSQ + $1,525</td><td className="px-3 py-3">~6 mo CSQ + 10–16 mo PR</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900">
              {pa ? '5 ਮੁੱਖ PR ਰਸਤਿਆਂ ਦੀ ਸਮਾਂ-ਰੇਖਾ (Timelines)' : 'Step-by-Step Timelines for 5 Popular Routes'}
            </h2>
            <div className="mt-4 space-y-3">
              {TIMELINES.map((tl, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="flex flex-wrap justify-between gap-2">
                    <h3 className="font-bold text-slate-900">{tText(tl.name, lang)}</h3>
                    <span className="font-mono text-xs font-bold text-red-700">{tText(tl.total, lang)}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-slate-700">{tText(tl.steps, lang)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900">
              {pa ? 'ਸਾਰੇ ਮੁੱਖ PR ਰਸਤਿਆਂ ਦੀ ਤੁਲਨਾ' : 'Pathways Side-by-Side Comparison Table'}
            </h2>

            {/* Mobile Comparison Cards */}
            <div className="md:hidden mt-4 space-y-3">
              {[
                { p: 'FSWP', cw: 'Not needed', jo: 'Not needed', lg: 'CLB 7', fn: '$14,690+' },
                { p: 'CEC', cw: '1 yr TEER 0–3', jo: 'Not needed', lg: 'CLB 7 (0/1) · 5 (2/3)', fn: 'Exempt ($0)' },
                { p: 'FSTP', cw: 'Not needed', jo: 'Offer OR Red Seal', lg: 'CLB 5 / 4', fn: 'If no offer' },
                { p: 'PNP', cw: 'Varies', jo: 'Usually (except SK/AB EE)', lg: 'CLB 4–7', fn: 'Varies' },
                { p: 'AIP', cw: 'Not needed', jo: 'Designated Atlantic', lg: 'CLB 4–5', fn: 'Lower LICO' },
                { p: 'RCIP / FCIP', cw: 'Not needed', jo: 'Town Employer', lg: 'CLB 4–6 / NCLC 5', fn: 'Lower LICO' },
                { p: 'Quebec PSTQ', cw: 'Preferred', jo: 'Helps points', lg: 'French Oral 7 / Writ 5', fn: 'Quebec scale' }
              ].map((row) => (
                <div key={row.p} className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <div className="text-base font-bold text-slate-900">{row.p}</div>
                  <dl className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <dt className="text-slate-500 font-semibold">{pa ? 'ਕੈਨੇਡੀਅਨ ਤਜਰਬਾ' : 'Canadian Work'}</dt>
                      <dd className="text-slate-900 font-medium">{row.cw}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 font-semibold">{pa ? 'ਜੌਬ ਆਫਰ' : 'Job Offer'}</dt>
                      <dd className="text-slate-900 font-medium">{row.jo}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 font-semibold">{pa ? 'ਘੱਟੋ-ਘੱਟ ਭਾਸ਼ਾ' : 'Min Language'}</dt>
                      <dd className="text-slate-900 font-medium">{row.lg}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 font-semibold">{pa ? 'ਫੰਡ' : 'Funds'}</dt>
                      <dd className="text-slate-900 font-medium">{row.fn}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>

            {/* Desktop Comparison Table */}
            <div className="hidden md:block mt-4 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 text-slate-800">
                  <tr>
                    <th className="px-3 py-3 font-bold">{pa ? 'ਪ੍ਰੋਗਰਾਮ' : 'Pathway'}</th>
                    <th className="px-3 py-3 font-bold">{pa ? 'ਕੈਨੇਡੀਅਨ ਤਜਰਬਾ' : 'Canadian Work'}</th>
                    <th className="px-3 py-3 font-bold">{pa ? 'ਜੌਬ ਆਫਰ' : 'Job Offer'}</th>
                    <th className="px-3 py-3 font-bold">{pa ? 'ਘੱਟੋ-ਘੱਟ ਭਾਸ਼ਾ' : 'Min Language'}</th>
                    <th className="px-3 py-3 font-bold">{pa ? 'ਫੰਡ' : 'Funds'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr><td className="px-3 py-2.5 font-bold">FSWP</td><td className="px-3 py-2.5">Not needed</td><td className="px-3 py-2.5">Not needed</td><td className="px-3 py-2.5">CLB 7</td><td className="px-3 py-2.5">$14,690+</td></tr>
                  <tr><td className="px-3 py-2.5 font-bold">CEC</td><td className="px-3 py-2.5">1 yr TEER 0–3</td><td className="px-3 py-2.5">Not needed</td><td className="px-3 py-2.5">CLB 7 (0/1) · 5 (2/3)</td><td className="px-3 py-2.5">Exempt ($0)</td></tr>
                  <tr><td className="px-3 py-2.5 font-bold">FSTP</td><td className="px-3 py-2.5">Not needed</td><td className="px-3 py-2.5">Offer OR Red Seal</td><td className="px-3 py-2.5">CLB 5 / 4</td><td className="px-3 py-2.5">If no offer</td></tr>
                  <tr><td className="px-3 py-2.5 font-bold">PNP</td><td className="px-3 py-2.5">Varies</td><td className="px-3 py-2.5">Usually (except SK/AB EE)</td><td className="px-3 py-2.5">CLB 4–7</td><td className="px-3 py-2.5">Varies</td></tr>
                  <tr><td className="px-3 py-2.5 font-bold">AIP</td><td className="px-3 py-2.5">Not needed</td><td className="px-3 py-2.5">Designated Atlantic</td><td className="px-3 py-2.5">CLB 4–5</td><td className="px-3 py-2.5">Lower LICO</td></tr>
                  <tr><td className="px-3 py-2.5 font-bold">RCIP / FCIP</td><td className="px-3 py-2.5">Not needed</td><td className="px-3 py-2.5">Town Employer</td><td className="px-3 py-2.5">CLB 4–6 / NCLC 5</td><td className="px-3 py-2.5">Lower LICO</td></tr>
                  <tr><td className="px-3 py-2.5 font-bold">Quebec PSTQ</td><td className="px-3 py-2.5">Preferred</td><td className="px-3 py-2.5">Helps points</td><td className="px-3 py-2.5">French Oral 7 / Writ 5</td><td className="px-3 py-2.5">Quebec scale</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {subTab === 'glossary' && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs">
            <h1 className="text-2xl font-bold text-slate-900">
              {pa ? 'ਸਧਾਰਨ ਸ਼ਬਦਾਵਲੀ (Glossary)' : 'Plain-Language Immigration Glossary'}
            </h1>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {GLOSSARY_DATA.map((g) => (
                <div key={g.term} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="text-sm font-bold text-slate-900">
                    <span className="font-mono text-red-700">{g.term}</span> — {g.full}
                  </div>
                  <p className="mt-1 text-sm text-slate-700">{tText(g.desc, lang)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900">
              {pa ? 'PR ਅਰਜ਼ੀ ਰੱਦ ਹੋਣ ਦੇ ਆਮ ਕਾਰਨ ਅਤੇ ਬਚਾਅ' : 'Common PR Refusal Reasons & How to Avoid Them'}
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {REFUSAL_REASONS.map((r, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
                  <h3 className="font-bold text-slate-900">{tText(r.title, lang)}</h3>
                  <p className="mt-1.5 text-sm text-slate-700">{tText(r.fix, lang)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900">
              {pa ? 'ਅਧਿਕਾਰਤ ਸਰਕਾਰੀ ਲਿੰਕ (canada.ca ਅਤੇ ਸੂਬੇ)' : 'Official Government Links Directory'}
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-sm">
              <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html" target="_blank" rel="noopener noreferrer" className="min-h-[48px] rounded-lg border border-slate-200 p-3 font-semibold text-slate-900 hover:bg-slate-50 flex items-center justify-between gap-2">
                <span>IRCC — Immigrate to Canada</span><ExternalLink className="h-4 w-4 shrink-0 text-slate-400" />
              </a>
              <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html" target="_blank" rel="noopener noreferrer" className="min-h-[48px] rounded-lg border border-slate-200 p-3 font-semibold text-slate-900 hover:bg-slate-50 flex items-center justify-between gap-2">
                <span>Express Entry Official Portal</span><ExternalLink className="h-4 w-4 shrink-0 text-slate-400" />
              </a>
              <a href="https://www.quebec.ca/en/immigration" target="_blank" rel="noopener noreferrer" className="min-h-[48px] rounded-lg border border-slate-200 p-3 font-semibold text-slate-900 hover:bg-slate-50 flex items-center justify-between gap-2">
                <span>Quebec Immigration (MIFI)</span><ExternalLink className="h-4 w-4 shrink-0 text-slate-400" />
              </a>
              {PNP_PROVINCES.map((p) => (
                <a key={p.code} href={p.url} target="_blank" rel="noopener noreferrer" className="min-h-[48px] rounded-lg border border-slate-200 p-3 font-semibold text-slate-900 hover:bg-slate-50 flex items-center justify-between gap-2">
                  <span>{tText(p.name, lang)}</span><ExternalLink className="h-4 w-4 shrink-0 text-slate-400" />
                </a>
              ))}
            </div>
          </section>
        </div>
      )}

      {subTab === 'faq' && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {pa ? `ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ (${FAQ_DATA.length} FAQs)` : `Frequently Asked Questions (${FAQ_DATA.length} FAQs)`}
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                {pa
                  ? 'ਸਵਾਲਾਂ ਨੂੰ 6 ਖੋਲ੍ਹਣਯੋਗ ਸ਼੍ਰੇਣੀਆਂ ਵਿੱਚ ਵੰਡਿਆ ਗਿਆ ਹੈ — ਕਿਸੇ ਵੀ ਸ਼੍ਰੇਣੀ ’ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਵੇਖੋ।'
                  : 'Grouped into 6 collapsible categories—tap any category header to expand its questions or search across all topics.'}
              </p>
            </div>
            <div className="flex w-full sm:w-auto items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setAllFaqCategories(true)}
                className="flex-1 sm:flex-none min-h-[40px] rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer"
              >
                {pa ? 'ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ ਖੋਲ੍ਹੋ' : 'Expand All'}
              </button>
              <button
                type="button"
                onClick={() => setAllFaqCategories(false)}
                className="flex-1 sm:flex-none min-h-[40px] rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer"
              >
                {pa ? 'ਸਾਰੀਆਂ ਬੰਦ ਕਰੋ' : 'Collapse All'}
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                placeholder={pa ? 'ਸਵਾਲ ਖੋਜੋ (ਜਿਵੇਂ: IELTS, CRS, LMIA, PNP)...' : 'Search FAQs (e.g., IELTS, CRS, LMIA, Quebec, funds)...'}
                className="min-h-[44px] w-full rounded-xl border border-slate-300 pl-9 pr-3 text-base sm:text-sm"
                value={faqQuery}
                onChange={(e) => setFaqQuery(e.target.value)}
              />
            </div>
            <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1 w-full lg:w-auto">
              {[
                { id: 'all', en: 'All Categories', pa: 'ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ' },
                { id: 'ee', en: 'Express Entry', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ' },
                { id: 'pnp', en: 'PNP & QC', pa: 'PNP / ਕਿਊਬੈਕ' },
                { id: 'language', en: 'Language Tests', pa: 'ਭਾਸ਼ਾ ਟੈਸਟ' },
                { id: 'docs', en: 'Documents & Fees', pa: 'ਦਸਤਾਵੇਜ਼ / ਫੀਸ' },
                { id: 'regional', en: 'Regional & Study', pa: 'ਖੇਤਰੀ / ਪੜ੍ਹਾਈ' },
                { id: 'general', en: 'General', pa: 'ਆਮ' }
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    const nextCat = c.id as typeof faqCat;
                    setFaqCat(nextCat);
                    if (nextCat !== 'all') {
                      setOpenFaqCats((prev) => ({ ...prev, [nextCat]: true }));
                    }
                  }}
                  className={`min-h-[40px] shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                    faqCat === c.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {pa ? c.pa : c.en}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {groupedFaqs.map((group, groupIdx) => {
              const Icon = group.icon;
              const isCategoryOpen =
                Boolean(qNormalized) || faqCat !== 'all' || Boolean(openFaqCats[group.id]);

              return (
                <div
                  key={group.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/40 overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isCategoryOpen}
                    onClick={() => toggleFaqCategory(group.id)}
                    className="w-full flex items-center justify-between gap-3 bg-white px-4 py-4 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-red-700" aria-hidden="true" />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          <h2 className="text-base sm:text-lg font-bold text-slate-900">
                            {pa ? group.pa : group.en}
                          </h2>
                          <span className="text-xs font-mono font-semibold text-red-700 tabular-nums">
                            {group.items.length} {pa ? 'ਸਵਾਲ' : group.items.length === 1 ? 'question' : 'questions'}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-600">
                          {pa ? group.descPa : group.descEn}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                        isCategoryOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isCategoryOpen && (
                    <div className="border-t border-slate-200 p-3 sm:p-4 space-y-2.5">
                      {group.items.map((faq, idx) => (
                        <details
                          key={`${faq.q.en}-${qNormalized ? 'filtered' : 'all'}`}
                          open={Boolean(qNormalized) && groupIdx === 0 && idx === 0}
                          className="group rounded-xl border border-slate-200 bg-white open:bg-slate-50/70"
                        >
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-3.5 sm:p-4 text-sm sm:text-base font-bold text-slate-900">
                            <span>{tText(faq.q, lang)}</span>
                            <ChevronDown
                              className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
                              aria-hidden="true"
                            />
                          </summary>
                          <div className="border-t border-slate-100 px-3.5 sm:px-4 pb-4 pt-3 text-sm text-slate-700 leading-relaxed">
                            {tText(faq.a, lang)}
                          </div>
                        </details>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {groupedFaqs.length === 0 && (
              <p className="text-sm text-slate-500 py-6 text-center">
                {pa ? 'ਕੋਈ ਸਵਾਲ ਨਹੀਂ ਮਿਲਿਆ। ਕੋਈ ਹੋਰ ਸ਼ਬਦ ਖੋਜੋ।' : 'No FAQs matched your search. Try another keyword.'}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
