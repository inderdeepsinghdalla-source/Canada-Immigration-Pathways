import { useEffect, useRef, useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  FileCheck2,
  Languages,
  ListChecks,
  PauseCircle,
  Search,
  XCircle
} from 'lucide-react';
import { PNP_PROVINCES } from '../data/immigrationData';
import { Lang, PnpStreamDetail } from '../types';
import { tText } from '../utils/profileStorage';
import { DisclaimerBanner } from './DisclaimerBanner';

export interface PnpFocusRequest {
  code: string;
  streamIndex?: number;
  seq: number;
}

interface Props {
  lang: Lang;
  onGoQuebec: () => void;
  focusRequest?: PnpFocusRequest | null;
}

type InnerSectionId = 'eligibility' | 'streams' | 'process';

export function PnpExplorerView({ lang, onGoQuebec, focusRequest }: Props) {
  const pa = lang === 'pa';
  const [selectedCode, setSelectedCode] = useState('ON');
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({ ON: true });
  const [openInnerSections, setOpenInnerSections] = useState<Record<string, boolean>>({
    'ON-eligibility': true,
    'ON-streams': true,
    'ON-process': false
  });
  const [expandedStreams, setExpandedStreams] = useState<Record<string, boolean>>({
    'ON-0': true,
    'ON-1': true
  });
  const [directoryQuery, setDirectoryQuery] = useState('');
  const [directoryFilter, setDirectoryFilter] = useState<'all' | 'no_offer' | 'teer45' | 'ee'>('all');

  const provinceRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const selected = PNP_PROVINCES.find((p) => p.code === selectedCode) || PNP_PROVINCES[0];

  useEffect(() => {
    if (!focusRequest) return;
    const { code, streamIndex } = focusRequest;
    setDirectoryQuery('');
    setDirectoryFilter('all');
    setSelectedCode(code);
    setOpenAccordions((prev) => ({ ...prev, [code]: true }));
    setOpenInnerSections((prev) => ({
      ...prev,
      [`${code}-eligibility`]: true,
      [`${code}-streams`]: true
    }));
    if (typeof streamIndex === 'number') {
      setExpandedStreams((prev) => ({ ...prev, [`${code}-${streamIndex}`]: true }));
    } else {
      setExpandedStreams((prev) => ({ ...prev, [`${code}-0`]: prev[`${code}-0`] ?? true }));
    }
    const timer = setTimeout(() => {
      provinceRefs.current[code]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => clearTimeout(timer);
  }, [focusRequest]);

  const ensureProvinceSectionsOpen = (code: string) => {
    setOpenAccordions((prev) => ({ ...prev, [code]: true }));
    setOpenInnerSections((prev) => ({
      ...prev,
      [`${code}-eligibility`]: prev[`${code}-eligibility`] ?? true,
      [`${code}-streams`]: prev[`${code}-streams`] ?? true,
      [`${code}-process`]: prev[`${code}-process`] ?? false
    }));
    setExpandedStreams((prev) => ({
      ...prev,
      [`${code}-0`]: prev[`${code}-0`] ?? true
    }));
  };

  const handleSelectProvince = (code: string, scrollToAccordion = true) => {
    setSelectedCode(code);
    ensureProvinceSectionsOpen(code);
    if (scrollToAccordion) {
      requestAnimationFrame(() => {
        provinceRefs.current[code]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  const toggleProvinceAccordion = (code: string) => {
    const willOpen = !openAccordions[code];
    if (willOpen) {
      setSelectedCode(code);
      ensureProvinceSectionsOpen(code);
    } else {
      setOpenAccordions((prev) => ({ ...prev, [code]: false }));
    }
  };

  const toggleInnerSection = (code: string, section: InnerSectionId) => {
    const key = `${code}-${section}`;
    setOpenInnerSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleStream = (key: string) => {
    setExpandedStreams((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setAllAccordions = (open: boolean) => {
    const nextProv: Record<string, boolean> = {};
    const nextInner: Record<string, boolean> = { ...openInnerSections };
    const nextStreams: Record<string, boolean> = { ...expandedStreams };
    PNP_PROVINCES.forEach((p) => {
      nextProv[p.code] = open;
      if (open) {
        nextInner[`${p.code}-eligibility`] = true;
        nextInner[`${p.code}-streams`] = true;
        nextStreams[`${p.code}-0`] = true;
      }
    });
    setOpenAccordions(nextProv);
    setOpenInnerSections(nextInner);
    setExpandedStreams(nextStreams);
  };

  const setAllStreamsForProvince = (code: string, streamCount: number, open: boolean) => {
    const next = { ...expandedStreams };
    for (let i = 0; i < streamCount; i += 1) {
      next[`${code}-${i}`] = open;
    }
    setExpandedStreams(next);
  };

  const getToneText = (tone: 'open' | 'limited' | 'closed') => {
    if (tone === 'open') return 'text-emerald-800';
    if (tone === 'limited') return 'text-amber-800';
    return 'text-red-800';
  };

  const getStreamStatusMeta = (status: PnpStreamDetail['status']) => {
    if (status === 'Open') {
      return { label: pa ? 'ਖੁੱਲ੍ਹਾ (Open)' : 'Open', cls: 'text-emerald-800', Icon: CheckCircle2 };
    }
    if (status === 'Limited') {
      return { label: pa ? 'ਸੀਮਤ / ਤਰਜੀਹੀ (Limited)' : 'Limited / Targeted', cls: 'text-amber-800', Icon: Clock };
    }
    if (status === 'Paused') {
      return { label: pa ? 'ਰੋਕਿਆ ਗਿਆ (Paused)' : 'Paused', cls: 'text-red-800', Icon: PauseCircle };
    }
    return { label: pa ? 'ਬੰਦ (Closed)' : 'Closed', cls: 'text-red-800', Icon: XCircle };
  };

  const q = directoryQuery.trim().toLowerCase();
  const filteredProvinces = PNP_PROVINCES.filter((p) => {
    if (directoryFilter === 'no_offer' && !p.streamsDetail.some((s) => !s.jobOfferRequired)) return false;
    if (directoryFilter === 'ee' && !p.eeOption) return false;
    if (
      directoryFilter === 'teer45' &&
      !p.streamsDetail.some(
        (s) =>
          (s.status === 'Open' || s.status === 'Limited') &&
          (s.occupations.en.toLowerCase().includes('teer 4') ||
            s.occupations.en.toLowerCase().includes('0–5') ||
            s.occupations.en.toLowerCase().includes('4/5') ||
            s.occupations.en.toLowerCase().includes('intermediate') ||
            s.occupations.en.toLowerCase().includes('semi-skilled'))
      )
    ) {
      return false;
    }
    if (!q) return true;
    return (
      p.name.en.toLowerCase().includes(q) ||
      p.name.pa.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.keyFact.en.toLowerCase().includes(q) ||
      p.keyFact.pa.toLowerCase().includes(q) ||
      p.occupationFocus.en.toLowerCase().includes(q) ||
      p.occupationFocus.pa.toLowerCase().includes(q) ||
      p.languageSummary.en.toLowerCase().includes(q) ||
      p.languageSummary.pa.toLowerCase().includes(q) ||
      p.workExpSummary.en.toLowerCase().includes(q) ||
      p.workExpSummary.pa.toLowerCase().includes(q) ||
      p.streamsDetail.some(
        (s) =>
          s.name.en.toLowerCase().includes(q) ||
          s.name.pa.toLowerCase().includes(q) ||
          s.occupations.en.toLowerCase().includes(q) ||
          s.occupations.pa.toLowerCase().includes(q) ||
          s.keyCriteria.en.toLowerCase().includes(q) ||
          s.keyCriteria.pa.toLowerCase().includes(q) ||
          s.language.en.toLowerCase().includes(q) ||
          s.language.pa.toLowerCase().includes(q) ||
          s.workExp.en.toLowerCase().includes(q) ||
          s.workExp.pa.toLowerCase().includes(q)
      )
    );
  });

  return (
    <div className="space-y-8">
      <DisclaimerBanner lang={lang} />

      {/* Interactive Canada PNP Map & 2026 Overview */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {pa
            ? 'ਸੂਬਾਈ ਨਾਮਜ਼ਦਗੀ ਪ੍ਰੋਗਰਾਮ (PNP) — ਸਾਰੇ 11 ਸੂਬੇ, ਸਟ੍ਰੀਮਾਂ ਅਤੇ ਯੋਗਤਾ'
            : 'Province-wise PNP Explorer — All 11 Provinces & Territories'}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl">
          {pa
            ? 'ਨਕਸ਼ੇ ਜਾਂ ਹੇਠਾਂ ਦਿੱਤੇ 11 ਸੂਬਿਆਂ ਦੇ ਅਕਾਰਡੀਅਨ ਸੈਕਸ਼ਨਾਂ ’ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਹਰੇਕ ਸੂਬੇ ਦਾ ਕੰਮ ਦਾ ਤਜਰਬਾ, ਖਾਸ ਕਿੱਤਿਆਂ ਦੀ ਸੂਚੀ, ਭਾਸ਼ਾ (CLB/NCLC) ਸ਼ਰਤਾਂ, ਫੀਸ ਅਤੇ ਸਾਰੀਆਂ ਸਟ੍ਰੀਮਾਂ ਦੇਖੋ।'
            : 'Click any province on the map or expand any of the 11 province accordions below for full work experience prerequisites, specific occupation lists, CLB/NCLC language thresholds, streams, and fees.'}
        </p>

        {/* Key 2026 Highlights */}
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 leading-relaxed">
          <strong>{pa ? 'ਤਾਜ਼ਾ 2026 PNP ਅੱਪਡੇਟ (20 ਨਵੰ. 2026): ' : 'Live 2026 PNP Highlights (Verified 20 Nov 2026): '}</strong>
          {pa
            ? 'ਓਂਟਾਰੀਓ Reg 47/26 ਅਧੀਨ ਸਿਰਫ਼ OWP ਖੁੱਲ੍ਹਾ (5 ਅਕਤੂ. ਨੂੰ ਤਨਖਾਹ ਅੰਕ ਅੱਪਡੇਟ) · BC Care/Build ਡਰਾਅ (13 ਨਵੰ: ਸਿਹਤ ~72, ਉਸਾਰੀ ~94, ECE ~95; ELSS ਬੰਦ) · ਮੈਨੀਟੋਬਾ #284 (19 ਨਵੰ: 1,116 LAAs) · ਅਲਬਰਟਾ CRS 300+ EE (495 ਥਾਵਾਂ ਬਾਕੀ) · ਨੋਵਾ ਸਕੋਸ਼ੀਆ 4 ਸਟ੍ਰੀਮਾਂ ਵਿੱਚ ਇਕੱਠਾ ਤੇ Sep 1 ਤੋਂ ਫੀਸ · NWT ਕੋਟਾ 350 ਤੱਕ ਵਧਿਆ।'
            : 'Ontario consolidated into OWP (Oct 5 earnings pts + REDI) · BC Care & Build draws active (13 Nov: Health ~72, Construction ~94, ECE ~95; ELSS closed) · Manitoba #284 (19 Nov: 1,116 LAAs) · Alberta EE CRS 300+ (495 spots left) · Nova Scotia consolidated into 4 core streams with Sep 1 fees · NWT boosted to 350 spots.'}
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold text-slate-600 mb-2">
              {pa
                ? 'ਕਿਸੇ ਵੀ ਸੂਬੇ ’ਤੇ ਕਲਿੱਕ ਕਰੋ (ਹੇਠਾਂ ਉਸਦਾ ਪੂਰਾ ਅਕਾਰਡੀਅਨ ਸੈਕਸ਼ਨ ਖੁੱਲ੍ਹ ਜਾਵੇਗਾ):'
                : 'Click a Province or Territory to jump to its detailed accordion below:'}
            </div>
            <svg viewBox="0 0 640 350" className="w-full h-auto" role="img" aria-label="Interactive Canada PNP Map">
              {/* Territories */}
              <polygon
                points="32,42 104,32 109,128 48,142"
                className={`cursor-pointer transition-colors stroke-white stroke-2 ${selectedCode === 'YT' ? 'fill-red-600' : 'fill-slate-300 hover:fill-slate-400'}`}
                onClick={() => handleSelectProvince('YT')}
              />
              <text x="64" y="96" className={`text-[12px] font-bold pointer-events-none ${selectedCode === 'YT' ? 'fill-white' : 'fill-slate-900'}`}>YT</text>

              <polygon
                points="108,32 234,32 244,136 112,130"
                className={`cursor-pointer transition-colors stroke-white stroke-2 ${selectedCode === 'NT' ? 'fill-red-600' : 'fill-slate-300 hover:fill-slate-400'}`}
                onClick={() => handleSelectProvince('NT')}
              />
              <text x="165" y="92" className={`text-[12px] font-bold pointer-events-none ${selectedCode === 'NT' ? 'fill-white' : 'fill-slate-900'}`}>NT</text>

              <polygon points="238,32 370,32 356,142 248,136" className="fill-slate-200 stroke-white stroke-2" />
              <text x="280" y="92" className="text-[11px] font-semibold fill-slate-500 pointer-events-none">NU (No PNP)</text>

              {/* Western */}
              <polygon
                points="44,146 114,132 128,262 54,258"
                className={`cursor-pointer transition-colors stroke-white stroke-2 ${selectedCode === 'BC' ? 'fill-red-600' : 'fill-slate-300 hover:fill-slate-400'}`}
                onClick={() => handleSelectProvince('BC')}
              />
              <text x="76" y="206" className={`text-[12px] font-bold pointer-events-none ${selectedCode === 'BC' ? 'fill-white' : 'fill-slate-900'}`}>BC</text>

              <polygon
                points="116,132 182,134 182,262 130,262"
                className={`cursor-pointer transition-colors stroke-white stroke-2 ${selectedCode === 'AB' ? 'fill-red-600' : 'fill-slate-300 hover:fill-slate-400'}`}
                onClick={() => handleSelectProvince('AB')}
              />
              <text x="145" y="206" className={`text-[12px] font-bold pointer-events-none ${selectedCode === 'AB' ? 'fill-white' : 'fill-slate-900'}`}>AB</text>

              <polygon
                points="184,134 246,138 246,264 184,262"
                className={`cursor-pointer transition-colors stroke-white stroke-2 ${selectedCode === 'SK' ? 'fill-red-600' : 'fill-slate-300 hover:fill-slate-400'}`}
                onClick={() => handleSelectProvince('SK')}
              />
              <text x="206" y="206" className={`text-[12px] font-bold pointer-events-none ${selectedCode === 'SK' ? 'fill-white' : 'fill-slate-900'}`}>SK</text>

              <polygon
                points="248,138 314,142 304,266 248,264"
                className={`cursor-pointer transition-colors stroke-white stroke-2 ${selectedCode === 'MB' ? 'fill-red-600' : 'fill-slate-300 hover:fill-slate-400'}`}
                onClick={() => handleSelectProvince('MB')}
              />
              <text x="268" y="206" className={`text-[12px] font-bold pointer-events-none ${selectedCode === 'MB' ? 'fill-white' : 'fill-slate-900'}`}>MB</text>

              {/* Central */}
              <polygon
                points="315,160 404,175 418,272 368,312 306,266"
                className={`cursor-pointer transition-colors stroke-white stroke-2 ${selectedCode === 'ON' ? 'fill-red-600' : 'fill-slate-300 hover:fill-slate-400'}`}
                onClick={() => handleSelectProvince('ON')}
              />
              <text x="354" y="242" className={`text-[12px] font-bold pointer-events-none ${selectedCode === 'ON' ? 'fill-white' : 'fill-slate-900'}`}>ON</text>

              <polygon
                points="406,146 516,136 504,242 420,268"
                className="fill-blue-100 hover:fill-blue-200 stroke-white stroke-2 cursor-pointer transition-colors"
                onClick={onGoQuebec}
              />
              <text x="444" y="206" className="text-[11px] font-bold fill-blue-900 pointer-events-none">QC (Separate)</text>

              {/* Atlantic */}
              <polygon
                points="520,120 606,126 610,190 546,190"
                className={`cursor-pointer transition-colors stroke-white stroke-2 ${selectedCode === 'NL' ? 'fill-red-600' : 'fill-slate-300 hover:fill-slate-400'}`}
                onClick={() => handleSelectProvince('NL')}
              />
              <text x="558" y="162" className={`text-[12px] font-bold pointer-events-none ${selectedCode === 'NL' ? 'fill-white' : 'fill-slate-900'}`}>NL</text>

              <polygon
                points="490,232 538,232 538,276 490,276"
                className={`cursor-pointer transition-colors stroke-white stroke-2 ${selectedCode === 'NB' ? 'fill-red-600' : 'fill-slate-300 hover:fill-slate-400'}`}
                onClick={() => handleSelectProvince('NB')}
              />
              <text x="505" y="258" className={`text-[12px] font-bold pointer-events-none ${selectedCode === 'NB' ? 'fill-white' : 'fill-slate-900'}`}>NB</text>

              <polygon
                points="544,226 594,226 594,252 544,252"
                className={`cursor-pointer transition-colors stroke-white stroke-2 ${selectedCode === 'PE' ? 'fill-red-600' : 'fill-slate-300 hover:fill-slate-400'}`}
                onClick={() => handleSelectProvince('PE')}
              />
              <text x="558" y="243" className={`text-[11px] font-bold pointer-events-none ${selectedCode === 'PE' ? 'fill-white' : 'fill-slate-900'}`}>PEI</text>

              <polygon
                points="542,258 606,258 595,302 542,296"
                className={`cursor-pointer transition-colors stroke-white stroke-2 ${selectedCode === 'NS' ? 'fill-red-600' : 'fill-slate-300 hover:fill-slate-400'}`}
                onClick={() => handleSelectProvince('NS')}
              />
              <text x="562" y="284" className={`text-[12px] font-bold pointer-events-none ${selectedCode === 'NS' ? 'fill-white' : 'fill-slate-900'}`}>NS</text>
            </svg>
          </div>

          {/* Quick Province Selector + Active Highlight */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {pa ? 'ਤੁਰੰਤ ਸੂਬਾ ਚੋਣ (11 ਸੂਬੇ)' : 'Quick Province Jump (All 11)'}
              </div>
              <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-3 gap-2">
                {PNP_PROVINCES.map((p) => (
                  <button
                    key={p.code}
                    type="button"
                    onClick={() => handleSelectProvince(p.code)}
                    className={`min-h-[44px] rounded-xl px-2.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
                      selectedCode === p.code
                        ? 'bg-red-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    {p.code}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm space-y-1.5">
              <div className="text-xs font-semibold text-slate-500">
                {pa ? 'ਚੁਣਿਆ ਹੋਇਆ ਸੂਬਾ:' : 'Currently Selected:'}
              </div>
              <div className="font-bold text-slate-900 text-base">{tText(selected.name, lang)}</div>
              <div className="text-xs text-slate-600 tabular-nums">
                {pa ? 'ਕੋਟਾ:' : 'Quota:'} {selected.alloc} · {selected.streamsDetail.length}{' '}
                {pa ? 'ਸਟ੍ਰੀਮਾਂ' : 'streams'} · {selected.feeCad}
              </div>
              <button
                type="button"
                onClick={() => handleSelectProvince(selected.code, true)}
                className="mt-2 inline-flex min-h-[40px] items-center gap-1.5 text-xs font-bold text-red-700 hover:underline cursor-pointer"
              >
                <span>{pa ? 'ਹੇਠਾਂ ਪੂਰਾ ਅਕਾਰਡੀਅਨ ਵੇਖੋ ↓' : 'Open full accordion below ↓'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* All 11 Provinces & Territories — Comprehensive Accordion Sections */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {pa
                ? 'ਸਾਰੇ 11 PNP ਸੂਬੇ ਅਤੇ ਪ੍ਰਦੇਸ਼ — ਮੁਕੰਮਲ ਅਕਾਰਡੀਅਨ ਗਾਈਡ'
                : 'All 11 PNP Provinces & Territories — Detailed Eligibility Accordions'}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {pa
                ? 'ਹਰੇਕ ਸੂਬੇ ਦੇ ਅੰਦਰ ਵੱਖਰੇ ਅਕਾਰਡੀਅਨ ਸੈਕਸ਼ਨ ਹਨ: ਕੰਮ ਦਾ ਤਜਰਬਾ, ਭਾਸ਼ਾ (CLB/NCLC), ਖਾਸ ਕਿੱਤਿਆਂ ਦੀ ਸੂਚੀ, ਸਾਰੀਆਂ ਸਟ੍ਰੀਮਾਂ ਅਤੇ ਅਰਜ਼ੀ ਪ੍ਰਕਿਰਿਆ।'
                : 'Each of the 11 provinces expands into structured accordion sections covering work experience prerequisites, language proficiency thresholds, specific occupation lists, all streams, and fees.'}
            </p>
          </div>

          <div className="flex w-full sm:w-auto items-center gap-2">
            <button
              type="button"
              onClick={() => setAllAccordions(true)}
              className="flex-1 sm:flex-none min-h-[44px] rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer"
            >
              {pa ? 'ਸਾਰੇ 11 ਸੂਬੇ ਖੋਲ੍ਹੋ' : 'Expand All 11'}
            </button>
            <button
              type="button"
              onClick={() => setAllAccordions(false)}
              className="flex-1 sm:flex-none min-h-[44px] rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer"
            >
              {pa ? 'ਸਾਰੇ ਬੰਦ ਕਰੋ' : 'Collapse All'}
            </button>
          </div>
        </div>

        {/* Search + Quick Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={directoryQuery}
              onChange={(e) => setDirectoryQuery(e.target.value)}
              placeholder={
                pa
                  ? 'ਕਿੱਤਾ, NOC, ਭਾਸ਼ਾ ਜਾਂ ਸੂਬਾ ਖੋਜੋ (ਜਿਵੇਂ: Truck, PSW, French, TEER 4, Tech)...'
                  : 'Search occupation, NOC, language threshold, or province (e.g., Truck, PSW, French, TEER 4, Tech)...'
              }
              className="min-h-[44px] w-full rounded-xl border border-slate-300 pl-9 pr-3 text-base sm:text-sm"
            />
          </div>

          <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1 w-full md:w-fit">
            {[
              { id: 'all', en: 'All (11)', pa: 'ਸਾਰੇ (11)' },
              { id: 'no_offer', en: 'No-Job-Offer Route', pa: 'ਬਿਨਾਂ ਜੌਬ ਆਫਰ ਰਸਤੇ' },
              { id: 'teer45', en: 'TEER 4/5 Friendly', pa: 'TEER 4/5 ਯੋਗ' },
              { id: 'ee', en: 'Express Entry (+600)', pa: 'Express Entry (+600)' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setDirectoryFilter(f.id as typeof directoryFilter)}
                className={`min-h-[40px] shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                  directoryFilter === f.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {pa ? f.pa : f.en}
              </button>
            ))}
          </div>
        </div>

        {/* 11 Province Accordions */}
        <div className="space-y-4">
          {filteredProvinces.map((p) => {
            const isProvinceOpen = !!openAccordions[p.code];
            const isSelected = p.code === selectedCode;
            const isEligibilityOpen = openInnerSections[`${p.code}-eligibility`] ?? true;
            const isStreamsOpen = openInnerSections[`${p.code}-streams`] ?? true;
            const isProcessOpen = openInnerSections[`${p.code}-process`] ?? false;

            return (
              <div
                key={p.code}
                ref={(el) => {
                  provinceRefs.current[p.code] = el;
                }}
                className={`rounded-2xl border overflow-hidden transition-colors scroll-mt-20 ${
                  isSelected ? 'border-red-300 bg-white' : 'border-slate-200 bg-white'
                }`}
              >
                {/* Top-Level Province Accordion Trigger */}
                <button
                  type="button"
                  aria-expanded={isProvinceOpen}
                  onClick={() => toggleProvinceAccordion(p.code)}
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-slate-500 tabular-nums">
                      <span className="font-mono text-slate-900">{p.code}</span>
                      <span aria-hidden="true">·</span>
                      <span className={getToneText(p.statusTone)}>{tText(p.status, lang)}</span>
                      <span aria-hidden="true">·</span>
                      <span>{pa ? `ਕੋਟਾ: ${p.alloc}` : `2026 Quota: ${p.alloc}`}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-slate-700">{p.feeCad}</span>
                      <span aria-hidden="true">·</span>
                      <span className={p.eeOption ? 'text-red-700' : 'text-slate-600'}>
                        {p.eeOption ? 'EE +600 CRS' : 'Base PNP'}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">{tText(p.name, lang)}</h3>
                      <span className="text-xs sm:text-sm font-medium text-slate-600">
                        {p.scoreSystem} · {p.streamsDetail.length} {pa ? 'ਸਟ੍ਰੀਮਾਂ' : 'pathways'}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${isProvinceOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                {/* Expanded Province Body with Nested Accordion Detail Sections */}
                {isProvinceOpen && (
                  <div className="border-t border-slate-200 bg-slate-50/50 p-4 sm:p-6 space-y-4">
                    {/* 2026 Key Rule + Job Offer & Intake Callout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 text-sm">
                      <div className="lg:col-span-7 rounded-xl border border-red-200 bg-red-50/70 p-3.5 text-red-950">
                        <strong className="font-bold">
                          {pa ? '2026 ਖਾਸ ਨਿਯਮ: ' : '2026 Key Rule: '}
                        </strong>
                        <span>{tText(p.keyFact, lang)}</span>
                      </div>
                      <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-3.5 text-slate-800">
                        <div>
                          <span className="font-semibold text-slate-600">
                            {pa ? 'ਜੌਬ ਆਫਰ: ' : 'Job Offer: '}
                          </span>
                          <span>{tText(p.jobOffer, lang)}</span>
                        </div>
                        <div className="mt-1 text-xs text-slate-600">{tText(p.processingNote, lang)}</div>
                      </div>
                    </div>

                    {/* Inner Accordion 1: Work Experience, Language Thresholds & Specific Occupation Lists */}
                    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                      <button
                        type="button"
                        aria-expanded={isEligibilityOpen}
                        onClick={() => toggleInnerSection(p.code, 'eligibility')}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                          <ListChecks className="h-4 w-4 text-red-700 shrink-0" aria-hidden="true" />
                          <span>
                            {pa
                              ? '1. ਕੰਮ ਦਾ ਤਜਰਬਾ, ਭਾਸ਼ਾ (CLB/NCLC) ਅਤੇ ਖਾਸ ਕਿੱਤਿਆਂ ਦੀ ਸੂਚੀ'
                              : '1. Work Experience Prerequisites, Language Thresholds & Occupation Lists'}
                          </span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${isEligibilityOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>

                      {isEligibilityOpen && (
                        <div className="border-t border-slate-100 p-4 grid grid-cols-1 md:grid-cols-3 gap-3.5 text-sm">
                          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-600">
                              <Briefcase className="h-3.5 w-3.5 text-red-700 shrink-0" aria-hidden="true" />
                              <span>{pa ? 'ਕੰਮ ਦਾ ਤਜਰਬਾ' : 'Work Experience Prerequisites'}</span>
                            </div>
                            <p className="mt-2 text-slate-800 leading-relaxed">{tText(p.workExpSummary, lang)}</p>
                          </div>

                          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-600">
                              <Languages className="h-3.5 w-3.5 text-red-700 shrink-0" aria-hidden="true" />
                              <span>{pa ? 'ਭਾਸ਼ਾ ਪੱਧਰ (CLB / NCLC)' : 'Language Proficiency Thresholds'}</span>
                            </div>
                            <p className="mt-2 text-slate-800 leading-relaxed">{tText(p.languageSummary, lang)}</p>
                          </div>

                          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-600">
                              <ListChecks className="h-3.5 w-3.5 text-red-700 shrink-0" aria-hidden="true" />
                              <span>{pa ? 'ਖਾਸ ਕਿੱਤੇ ਅਤੇ ਪਾਬੰਦੀਆਂ' : 'Specific Occupation Lists'}</span>
                            </div>
                            <p className="mt-2 text-slate-800 leading-relaxed">{tText(p.occupationFocus, lang)}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Inner Accordion 2: Detailed Streams & Pathways */}
                    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                      <button
                        type="button"
                        aria-expanded={isStreamsOpen}
                        onClick={() => toggleInnerSection(p.code, 'streams')}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                          <Briefcase className="h-4 w-4 text-red-700 shrink-0" aria-hidden="true" />
                          <span>
                            {pa
                              ? `2. ਸਾਰੀਆਂ ਸਟ੍ਰੀਮਾਂ ਅਤੇ ਵੱਖ-ਵੱਖ ਯੋਗਤਾ ਨਿਯਮ (${p.streamsDetail.length})`
                              : `2. All Pathways & Stream-by-Stream Eligibility (${p.streamsDetail.length})`}
                          </span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${isStreamsOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>

                      {isStreamsOpen && (
                        <div className="border-t border-slate-100 p-4 space-y-3">
                          <div className="flex w-full sm:w-auto sm:justify-end items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setAllStreamsForProvince(p.code, p.streamsDetail.length, true)}
                              className="flex-1 sm:flex-none min-h-[40px] rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                            >
                              {pa ? 'ਸਾਰੀਆਂ ਸਟ੍ਰੀਮਾਂ ਖੋਲ੍ਹੋ' : 'Expand All Streams'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setAllStreamsForProvince(p.code, p.streamsDetail.length, false)}
                              className="flex-1 sm:flex-none min-h-[40px] rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                            >
                              {pa ? 'ਸਟ੍ਰੀਮਾਂ ਬੰਦ ਕਰੋ' : 'Collapse Streams'}
                            </button>
                          </div>

                          {p.streamsDetail.map((st, idx) => {
                            const streamKey = `${p.code}-${idx}`;
                            const isStreamOpen = !!expandedStreams[streamKey];
                            const meta = getStreamStatusMeta(st.status);
                            const Icon = meta.Icon;
                            const isClosedOrPaused = st.status === 'Closed' || st.status === 'Paused';

                            return (
                              <article
                                key={streamKey}
                                className={`rounded-xl border overflow-hidden ${
                                  isClosedOrPaused ? 'border-slate-200 bg-slate-50/70' : 'border-slate-200 bg-white'
                                }`}
                              >
                                <button
                                  type="button"
                                  aria-expanded={isStreamOpen}
                                  onClick={() => toggleStream(streamKey)}
                                  className="w-full flex items-start justify-between gap-3 p-4 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
                                >
                                  <div>
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-slate-600">
                                      <span className={`inline-flex items-center gap-1 ${meta.cls}`}>
                                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                                        <span>{meta.label}</span>
                                      </span>
                                      <span aria-hidden="true">·</span>
                                      <span className={st.jobOfferRequired ? 'text-slate-700' : 'text-emerald-800'}>
                                        {st.jobOfferRequired
                                          ? pa
                                            ? 'ਜੌਬ ਆਫਰ ਜ਼ਰੂਰੀ'
                                            : 'Job Offer Required'
                                          : pa
                                            ? 'ਬਿਨਾਂ ਜੌਬ ਆਫਰ'
                                            : 'No Job Offer Required'}
                                      </span>
                                      <span aria-hidden="true">·</span>
                                      <span className={st.expressEntry ? 'text-red-700' : 'text-slate-600'}>
                                        {st.expressEntry ? 'Express Entry (+600 CRS)' : 'Base PNP (Non-EE)'}
                                      </span>
                                    </div>
                                    <h4 className="mt-1 text-base font-bold text-slate-900">{tText(st.name, lang)}</h4>
                                  </div>
                                  <ChevronDown
                                    className={`mt-1 h-4 w-4 shrink-0 text-slate-500 transition-transform ${isStreamOpen ? 'rotate-180' : ''}`}
                                    aria-hidden="true"
                                  />
                                </button>

                                {isStreamOpen && (
                                  <div className="border-t border-slate-100 px-4 pb-4 pt-3 space-y-3">
                                    <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
                                      <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                                        <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                          {pa ? 'ਕੰਮ ਦਾ ਤਜਰਬਾ' : 'Work Experience'}
                                        </dt>
                                        <dd className="mt-1 text-slate-800 leading-relaxed">{tText(st.workExp, lang)}</dd>
                                      </div>
                                      <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                                        <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                          {pa ? 'ਭਾਸ਼ਾ (CLB / NCLC)' : 'Language Thresholds'}
                                        </dt>
                                        <dd className="mt-1 text-slate-800 leading-relaxed">{tText(st.language, lang)}</dd>
                                      </div>
                                      <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                                        <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                          {pa ? 'ਪੜ੍ਹਾਈ' : 'Education'}
                                        </dt>
                                        <dd className="mt-1 text-slate-800 leading-relaxed">{tText(st.education, lang)}</dd>
                                      </div>
                                      <div className="md:col-span-2 rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                                        <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                          {pa ? 'ਖਾਸ ਕਿੱਤੇ / NOC / TEER ਸੂਚੀ' : 'Specific Occupations & TEER Scope'}
                                        </dt>
                                        <dd className="mt-1 text-slate-800 leading-relaxed">{tText(st.occupations, lang)}</dd>
                                      </div>
                                      <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                                        <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                          {pa ? 'ਤਨਖਾਹ / ਫੰਡ / ਉਮਰ' : 'Wage, Funds & Conditions'}
                                        </dt>
                                        <dd className="mt-1 text-slate-800 leading-relaxed">{tText(st.fundsOrWage, lang)}</dd>
                                      </div>
                                    </dl>
                                    <p className="text-xs sm:text-sm text-slate-800 bg-slate-50 rounded-lg border border-slate-200/70 px-3 py-2.5 leading-relaxed">
                                      <strong>{pa ? 'ਮੁੱਖ ਚੋਣ ਨਿਯਮ: ' : 'Key Selection Rule: '}</strong>
                                      {tText(st.keyCriteria, lang)}
                                    </p>
                                  </div>
                                )}
                              </article>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Inner Accordion 3: Score System, Fees, Application Steps & Official Portal */}
                    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                      <button
                        type="button"
                        aria-expanded={isProcessOpen}
                        onClick={() => toggleInnerSection(p.code, 'process')}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                          <FileCheck2 className="h-4 w-4 text-red-700 shrink-0" aria-hidden="true" />
                          <span>
                            {pa
                              ? `3. ਅੰਕ ਸਿਸਟਮ, ਫੀਸ (${p.feeCad}) ਅਤੇ ਅਰਜ਼ੀ ਪ੍ਰਕਿਰਿਆ`
                              : `3. Score System, Fees (${p.feeCad}) & Application Process`}
                          </span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${isProcessOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>

                      {isProcessOpen && (
                        <div className="border-t border-slate-100 p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                          <ol className="space-y-2 text-slate-700 list-decimal list-inside leading-relaxed">
                            <li>
                              {pa
                                ? 'ਭਾਸ਼ਾ ਟੈਸਟ (IELTS-G / CELPIP-G / PTE Core / TEF / TCF) ਅਤੇ ਵਿਦੇਸ਼ੀ ਡਿਗਰੀ ਲਈ ECA ਪੂਰਾ ਕਰੋ।'
                                : 'Complete an approved language test meeting your stream’s CLB/NCLC floor and an ECA for foreign credentials.'}
                            </li>
                            <li>
                              {p.eeOption
                                ? pa
                                  ? 'Express Entry (+600 CRS) ਸਟ੍ਰੀਮ ਲਈ ਪਹਿਲਾਂ canada.ca ’ਤੇ Express Entry ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ।'
                                  : 'For Express Entry (+600 CRS) streams, maintain an active federal Express Entry profile first.'
                                : pa
                                  ? 'ਬੇਸ PNP ਲਈ ਸੂਬਾਈ ਪੋਰਟਲ ਅਤੇ ਰੁਜ਼ਗਾਰਦਾਤਾ ਫਾਰਮ ਤਿਆਰ ਕਰੋ।'
                                  : 'Prepare provincial portal forms and employer verification documents.'}
                            </li>
                            <li>
                              {pa
                                ? `ਸੂਬਾਈ ਸਿਸਟਮ (${p.scoreSystem}) ਰਾਹੀਂ ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰੋ (ਫੀਸ: ${p.feeCad})।`
                                : `Submit your EOI/application under ${p.scoreSystem} (Provincial fee: ${p.feeCad}).`}
                            </li>
                            <li>
                              {pa
                                ? 'ਨਾਮਜ਼ਦਗੀ ਮਿਲਣ ’ਤੇ IRCC ਫੈਡਰਲ PR ਫੀਸ ($1,525 CAD) ਸਮੇਤ PR ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰੋ।'
                                : 'Upon nomination, apply to IRCC for federal PR ($1,525 CAD federal fee) within the nomination deadline.'}
                            </li>
                          </ol>

                          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between gap-3">
                            <div className="space-y-2 text-xs sm:text-sm">
                              <div className="flex justify-between gap-3 border-b border-slate-200/70 pb-1.5">
                                <span className="text-slate-600">{pa ? 'ਅੰਕ ਸਿਸਟਮ:' : 'Selection System:'}</span>
                                <strong className="text-slate-900 text-right">{p.scoreSystem}</strong>
                              </div>
                              <div className="flex justify-between gap-3 border-b border-slate-200/70 pb-1.5">
                                <span className="text-slate-600">{pa ? 'ਸੂਬਾਈ ਫੀਸ:' : 'Provincial Fee:'}</span>
                                <strong className="font-mono tabular-nums text-slate-900">{p.feeCad}</strong>
                              </div>
                              <div className="flex justify-between gap-3 border-b border-slate-200/70 pb-1.5">
                                <span className="text-slate-600">{pa ? 'ਫੈਡਰਲ PR ਫੀਸ:' : 'Federal IRCC Fee:'}</span>
                                <strong className="font-mono tabular-nums text-slate-900">$1,525 CAD</strong>
                              </div>
                              <div className="flex justify-between gap-3">
                                <span className="text-slate-600">{pa ? '2026 ਕੋਟਾ:' : '2026 Allocation:'}</span>
                                <strong className="font-mono tabular-nums text-slate-900">{p.alloc}</strong>
                              </div>
                            </div>

                            <a
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
                            >
                              <span>{pa ? `${tText(p.name, lang)} ਅਧਿਕਾਰਤ ਪੋਰਟਲ` : `Open Official ${p.code} Portal`}</span>
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredProvinces.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
              {pa
                ? 'ਤੁਹਾਡੀ ਖੋਜ ਨਾਲ ਕੋਈ ਸੂਬਾ ਨਹੀਂ ਮਿਲਿਆ। ਫਿਲਟਰ ਸਾਫ਼ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।'
                : 'No provinces matched your search or filter. Clear the filter to view all 11 provinces.'}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
