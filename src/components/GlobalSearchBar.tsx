import { useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, Compass, MapPin, Search, X } from 'lucide-react';
import {
  FAQ_DATA,
  FCIP_COMMUNITIES,
  GLOSSARY_DATA,
  PNP_PROVINCES,
  RCIP_COMMUNITIES
} from '../data/immigrationData';
import { AppSection, Lang } from '../types';
import { tText } from '../utils/profileStorage';

export interface GlobalSearchAction {
  section: AppSection;
  pnpFocus?: { code: string; streamIndex?: number };
  libraryFocus?: { subTab: 'faq' | 'glossary' | 'lang' | 'teer' | 'fees'; query?: string };
}

interface SearchItem {
  id: string;
  group: 'province' | 'program' | 'faq';
  title: string;
  subtitle: string;
  searchBlob: string;
  action: GlobalSearchAction;
}

interface Props {
  lang: Lang;
  onSelectResult: (action: GlobalSearchAction) => void;
}

const CORE_PROGRAMS: {
  id: string;
  en: string;
  pa: string;
  subEn: string;
  subPa: string;
  keywords: string;
  action: GlobalSearchAction;
}[] = [
  {
    id: 'prog-ee-cec',
    en: 'Canadian Experience Class (CEC)',
    pa: 'ਕੈਨੇਡੀਅਨ ਤਜਰਬਾ ਸ਼੍ਰੇਣੀ (CEC)',
    subEn: 'Express Entry · 1 yr Canadian TEER 0–3 · Funds Exempt ($0)',
    subPa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ · 1 ਸਾਲ ਕੈਨੇਡੀਅਨ ਕੰਮ · ਫੰਡ ਛੋਟ ($0)',
    keywords: 'cec express entry canadian experience class pgwp teer 0 1 2 3 exempt',
    action: { section: 'ee' }
  },
  {
    id: 'prog-ee-fswp',
    en: 'Federal Skilled Worker Program (FSWP)',
    pa: 'ਫੈਡਰਲ ਹੁਨਰਮੰਦ ਕਾਮੇ (FSWP)',
    subEn: 'Express Entry · Outside Canada · CLB 7 + 67/100 Grid',
    subPa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ · ਕੈਨੇਡਾ ਤੋਂ ਬਾਹਰ · CLB 7 + 67/100 ਗਰਿੱਡ',
    keywords: 'fswp federal skilled worker outside canada foreign 67 point grid clb 7',
    action: { section: 'ee' }
  },
  {
    id: 'prog-ee-fstp',
    en: 'Federal Skilled Trades Program (FSTP)',
    pa: 'ਫੈਡਰਲ ਹੁਨਰਮੰਦ ਟ੍ਰੇਡਜ਼ (FSTP)',
    subEn: 'Express Entry · Red Seal / 2 yrs Trade TEER 2–3 · CLB 5/4',
    subPa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ · Red Seal / 2 ਸਾਲ ਟ੍ਰੇਡ ਕੰਮ · CLB 5/4',
    keywords: 'fstp trades welder electrician plumber carpenter cook baker red seal',
    action: { section: 'ee' }
  },
  {
    id: 'prog-quebec-pstq',
    en: 'Quebec PSTQ / Arrima / CSQ (Skilled Worker)',
    pa: 'ਕਿਊਬੈਕ PSTQ / Arrima / CSQ',
    subEn: 'Quebec Independent System (MIFI) · French Oral 7+ · PEQ closed',
    subPa: 'ਕਿਊਬੈਕ ਵੱਖਰਾ ਸਿਸਟਮ (MIFI) · ਫ੍ਰੈਂਚ 7+ · PEQ ਬੰਦ',
    keywords: 'quebec qc montreal pstq arrima csq mifi peq french',
    action: { section: 'quebec' }
  },
  {
    id: 'prog-aip',
    en: 'Atlantic Immigration Program (AIP)',
    pa: 'ਐਟਲਾਂਟਿਕ ਇਮੀਗ੍ਰੇਸ਼ਨ ਪ੍ਰੋਗਰਾਮ (AIP)',
    subEn: 'Regional · NS, NB, PEI, NL · Designated Employer · CLB 4–5',
    subPa: 'ਖੇਤਰੀ · NS, NB, PEI, NL · ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਰੁਜ਼ਗਾਰਦਾਤਾ · CLB 4–5',
    keywords: 'aip atlantic immigration program nova scotia new brunswick pei newfoundland teer 4',
    action: { section: 'regional' }
  },
  {
    id: 'prog-rcip',
    en: 'Rural Community Immigration Pilot (RCIP)',
    pa: 'ਪੇਂਡੂ ਕਮਿਊਨਿਟੀ ਪਾਇਲਟ (RCIP)',
    subEn: `Regional · ${RCIP_COMMUNITIES.length} Small Towns · Replaces RNIP · CLB 4–6`,
    subPa: `ਖੇਤਰੀ · ${RCIP_COMMUNITIES.length} ਛੋਟੇ ਸ਼ਹਿਰ · RNIP ਦੀ ਥਾਂ · CLB 4–6`,
    keywords: `rcip rural community rnip ${RCIP_COMMUNITIES.join(' ').toLowerCase()}`,
    action: { section: 'regional' }
  },
  {
    id: 'prog-fcip',
    en: 'Francophone Community Immigration Pilot (FCIP)',
    pa: 'ਫ੍ਰੈਂਕੋਫੋਨ ਕਮਿਊਨਿਟੀ ਪਾਇਲਟ (FCIP)',
    subEn: `Regional · ${FCIP_COMMUNITIES.length} French Towns Outside Quebec · NCLC 5`,
    subPa: `ਖੇਤਰੀ · ਕਿਊਬੈਕ ਤੋਂ ਬਾਹਰ ${FCIP_COMMUNITIES.length} ਫ੍ਰੈਂਚ ਸ਼ਹਿਰ · NCLC 5`,
    keywords: `fcip francophone community french nclc 5 ${FCIP_COMMUNITIES.join(' ').toLowerCase()}`,
    action: { section: 'regional' }
  },
  {
    id: 'prog-crs-calc',
    en: 'CRS Score Calculator & +150 Integration Rule',
    pa: 'CRS ਸਕੋਰ ਕੈਲਕੁਲੇਟਰ ਅਤੇ +150 ਨਵਾਂ ਨਿਯਮ',
    subEn: 'Calculators · Out of 1,200 · Nov 3, 2026 Labour Market Integration',
    subPa: 'ਕੈਲਕੁਲੇਟਰ · 1,200 ਵਿੱਚੋਂ · 3 ਨਵੰਬਰ 2026 ਲੇਬਰ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਅੰਕ',
    keywords: 'crs calculator score points 1200 lmia 150 integration simulator proof of funds checklist',
    action: { section: 'calculators' }
  },
  {
    id: 'prog-eligibility',
    en: 'Instant PR Eligibility Checker (12 Pathways)',
    pa: 'ਤੁਰੰਤ PR ਯੋਗਤਾ ਜਾਂਚ (12 ਰਸਤੇ)',
    subEn: 'Personalized matching across Express Entry, PNP, AIP, RCIP & Quebec',
    subPa: 'ਤੁਹਾਡੀ ਉਮਰ, ਪੜ੍ਹਾਈ, ਭਾਸ਼ਾ ਤੇ ਕੰਮ ਅਨੁਸਾਰ ਯੋਗਤਾ ਜਾਂਚ',
    keywords: 'eligibility check qualify pathways score match',
    action: { section: 'checker' }
  },
  {
    id: 'prog-draws',
    en: 'Live 2026 Express Entry & PNP Draws Tracker',
    pa: 'ਲਾਈਵ 2026 ਡਰਾਅ ਅਤੇ ਪੂਲ ਟਰੈਕਰ',
    subEn: 'Nov 2026 Draws · Federal Pool Breakdown & Provincial Quotas',
    subPa: 'ਨਵੰਬਰ 2026 ਡਰਾਅ · ਪੂਲ ਅੰਕੜੇ ਅਤੇ ਸੂਬਾਈ ਕੋਟਾ',
    keywords: 'draws live rounds ita crs cutoff quota pool tracker',
    action: { section: 'draws' }
  },
  {
    id: 'prog-fraud',
    en: 'LMIA / Job Scam & RCIC Fraud Warning',
    pa: 'ਨਕਲੀ LMIA / ਜੌਬ ਧੋਖਾਧੜੀ ਚੇਤਾਵਨੀ',
    subEn: 'How to verify consultants (CICC) & avoid illegal job-sale scams',
    subPa: 'ਏਜੰਟ ਦੀ ਜਾਂਚ (CICC) ਅਤੇ ਨਕਲੀ ਜੌਬ ਆਫਰ ਤੋਂ ਬਚਾਅ',
    keywords: 'fraud scam fake lmia rcic cicc consultant ghost agent',
    action: { section: 'fraud' }
  }
];

export function GlobalSearchBar({ lang, onSelectResult }: Props) {
  const pa = lang === 'pa';
  const [query, setQuery] = useState('');
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const indexItems = useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [];

    // 1. Provinces (11 PNP + Quebec)
    PNP_PROVINCES.forEach((p) => {
      items.push({
        id: `prov-${p.code}`,
        group: 'province',
        title: `${p.code} — ${tText(p.name, lang)}`,
        subtitle: `${tText(p.status, lang)} · ${pa ? 'ਕੋਟਾ:' : 'Quota:'} ${p.alloc} · ${p.feeCad}`,
        searchBlob: [
          p.code,
          p.name.en,
          p.name.pa,
          p.scoreSystem,
          p.keyFact.en,
          p.keyFact.pa,
          p.occupationFocus.en,
          p.languageSummary.en
        ]
          .join(' ')
          .toLowerCase(),
        action: { section: 'pnp', pnpFocus: { code: p.code } }
      });
    });

    items.push({
      id: 'prov-QC',
      group: 'province',
      title: pa ? 'QC — ਕਿਊਬੈਕ (Quebec — ਵੱਖਰਾ PR ਸਿਸਟਮ)' : 'QC — Quebec (Separate Immigration System)',
      subtitle: pa ? 'PSTQ · Arrima · MIFI · ਫ੍ਰੈਂਚ B2/Oral 7+ ਲੋੜੀਂਦਾ' : 'PSTQ · Arrima · MIFI · French Oral 7+ required',
      searchBlob: 'qc quebec quebecois montreal laval pstq arrima csq mifi peq french',
      action: { section: 'quebec' }
    });

    // 2. Core Programs + Every PNP Stream
    CORE_PROGRAMS.forEach((c) => {
      items.push({
        id: c.id,
        group: 'program',
        title: pa ? c.pa : c.en,
        subtitle: pa ? c.subPa : c.subEn,
        searchBlob: `${c.en} ${c.pa} ${c.subEn} ${c.keywords}`.toLowerCase(),
        action: c.action
      });
    });

    PNP_PROVINCES.forEach((p) => {
      p.streamsDetail.forEach((st, idx) => {
        items.push({
          id: `stream-${p.code}-${idx}`,
          group: 'program',
          title: tText(st.name, lang),
          subtitle: `${p.code} PNP · ${st.status} · ${
            st.jobOfferRequired ? (pa ? 'ਜੌਬ ਆਫਰ ਜ਼ਰੂਰੀ' : 'Job Offer Req.') : pa ? 'ਬਿਨਾਂ ਜੌਬ ਆਫਰ' : 'No Job Offer'
          } · ${st.expressEntry ? 'EE +600' : 'Base PNP'}`,
          searchBlob: [
            p.code,
            p.name.en,
            st.name.en,
            st.name.pa,
            st.occupations.en,
            st.language.en,
            st.workExp.en,
            st.keyCriteria.en
          ]
            .join(' ')
            .toLowerCase(),
          action: { section: 'pnp', pnpFocus: { code: p.code, streamIndex: idx } }
        });
      });
    });

    // 3. FAQs & Glossary
    FAQ_DATA.forEach((f, idx) => {
      items.push({
        id: `faq-${idx}`,
        group: 'faq',
        title: tText(f.q, lang),
        subtitle: `${pa ? 'FAQ' : 'FAQ'} · ${tText(f.a, lang).slice(0, 88)}...`,
        searchBlob: `${f.q.en} ${f.q.pa} ${f.a.en} ${f.a.pa} ${f.cat}`.toLowerCase(),
        action: { section: 'library', libraryFocus: { subTab: 'faq', query: tText(f.q, lang) } }
      });
    });

    GLOSSARY_DATA.forEach((g) => {
      items.push({
        id: `gloss-${g.term}`,
        group: 'faq',
        title: `${g.term} — ${g.full}`,
        subtitle: `${pa ? 'ਸ਼ਬਦਾਵਲੀ' : 'Glossary'} · ${tText(g.desc, lang)}`,
        searchBlob: `${g.term} ${g.full} ${g.desc.en} ${g.desc.pa} glossary`.toLowerCase(),
        action: { section: 'library', libraryFocus: { subTab: 'glossary' } }
      });
    });

    return items;
  }, [lang, pa]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Quick suggested picks when input is focused & empty
      const defaultIds = [
        'prov-ON',
        'prov-BC',
        'prov-AB',
        'prov-QC',
        'prog-ee-cec',
        'prog-aip',
        'prog-rcip',
        'faq-0',
        'faq-1'
      ];
      return indexItems.filter((item) => defaultIds.includes(item.id));
    }

    const terms = q.split(/\s+/).filter(Boolean);
    const scored: { item: SearchItem; score: number }[] = [];

    for (const item of indexItems) {
      const allMatch = terms.every((t) => item.searchBlob.includes(t) || item.title.toLowerCase().includes(t));
      if (!allMatch) continue;

      const titleLower = item.title.toLowerCase();
      let score = 1;
      if (titleLower === q) score += 100;
      else if (titleLower.startsWith(q)) score += 60;
      else if (titleLower.includes(q)) score += 35;
      if (item.group === 'province') score += 12;
      else if (item.group === 'program') score += 8;
      scored.push({ item, score });
    }

    scored.sort((a, b) => b.score - a.score);

    // Balance up to 4 provinces, 5 programs, 5 FAQ/glossary so one category doesn't crowd out the others
    const counts = { province: 0, program: 0, faq: 0 };
    const limits = { province: 4, program: 5, faq: 5 };
    const finalItems: SearchItem[] = [];

    for (const entry of scored) {
      const g = entry.item.group;
      if (counts[g] < limits[g]) {
        counts[g] += 1;
        finalItems.push(entry.item);
      }
      if (finalItems.length >= 14) break;
    }

    return finalItems;
  }, [indexItems, query]);

  const grouped = useMemo(() => {
    return {
      province: results.filter((r) => r.group === 'province'),
      program: results.filter((r) => r.group === 'program'),
      faq: results.filter((r) => r.group === 'faq')
    };
  }, [results]);

  const flatOrdered = useMemo(
    () => [...grouped.province, ...grouped.program, ...grouped.faq],
    [grouped]
  );

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDesktopOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  // Keyboard shortcuts: "/" or Cmd/Ctrl+K focuses search
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.tagName === 'SELECT';

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (window.innerWidth < 768) {
          setMobileOpen(true);
          setTimeout(() => mobileInputRef.current?.focus(), 40);
        } else {
          setDesktopOpen(true);
          desktopInputRef.current?.focus();
        }
      } else if (!isTyping && e.key === '/') {
        e.preventDefault();
        if (window.innerWidth < 768) {
          setMobileOpen(true);
          setTimeout(() => mobileInputRef.current?.focus(), 40);
        } else {
          setDesktopOpen(true);
          desktopInputRef.current?.focus();
        }
      } else if (e.key === 'Escape') {
        setDesktopOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const choose = (item: SearchItem) => {
    setDesktopOpen(false);
    setMobileOpen(false);
    setQuery('');
    onSelectResult(item.action);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((prev) => (flatOrdered.length ? (prev + 1) % flatOrdered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((prev) =>
        flatOrdered.length ? (prev - 1 + flatOrdered.length) % flatOrdered.length : 0
      );
    } else if (e.key === 'Enter' && flatOrdered[activeIdx]) {
      e.preventDefault();
      choose(flatOrdered[activeIdx]);
    }
  };

  const renderGroup = (
    groupKey: 'province' | 'program' | 'faq',
    label: string,
    items: SearchItem[],
    Icon: typeof MapPin,
    startIndex: number
  ) => {
    if (items.length === 0) return null;
    return (
      <div key={groupKey} className="py-1.5">
        <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5 text-red-700" aria-hidden="true" />
          <span>{label}</span>
        </div>
        <ul role="listbox">
          {items.map((item, idx) => {
            const globalIdx = startIndex + idx;
            const isHighlighted = globalIdx === activeIdx;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isHighlighted}
                  onMouseEnter={() => setActiveIdx(globalIdx)}
                  onClick={() => choose(item)}
                  className={`w-full text-left px-3 py-2.5 flex flex-col gap-0.5 transition-colors cursor-pointer min-h-[44px] ${
                    isHighlighted ? 'bg-red-50 text-slate-900' : 'hover:bg-slate-50 text-slate-900'
                  }`}
                >
                  <span className="text-sm font-bold leading-snug">{item.title}</span>
                  <span className="text-xs text-slate-600 line-clamp-1">{item.subtitle}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const resultsContent = (
    <>
      {!query.trim() && (
        <div className="px-3 pt-2.5 pb-1 text-xs font-semibold text-slate-500 border-b border-slate-100">
          {pa ? 'ਪ੍ਰਸਿੱਧ ਖੋਜਾਂ (ਟਾਈਪ ਕਰਕੇ ਫਿਲਟਰ ਕਰੋ):' : 'Quick Jumps (type to filter provinces, programs, or FAQs):'}
        </div>
      )}

      {flatOrdered.length === 0 ? (
        <div className="px-4 py-6 text-center text-sm text-slate-600">
          {pa
            ? `"${query}" ਨਾਲ ਕੋਈ ਸੂਬਾ, ਪ੍ਰੋਗਰਾਮ ਜਾਂ FAQ ਨਹੀਂ ਮਿਲਿਆ।`
            : `No provinces, programs, or FAQs matched "${query}".`}
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {renderGroup(
            'province',
            pa ? 'ਸੂਬੇ ਅਤੇ ਪ੍ਰਦੇਸ਼' : 'Provinces & Territories',
            grouped.province,
            MapPin,
            0
          )}
          {renderGroup(
            'program',
            pa ? 'ਪ੍ਰੋਗਰਾਮ ਅਤੇ PNP ਸਟ੍ਰੀਮਾਂ' : 'Programs & PNP Streams',
            grouped.program,
            Compass,
            grouped.province.length
          )}
          {renderGroup(
            'faq',
            pa ? 'FAQ ਅਤੇ ਸ਼ਬਦਾਵਲੀ' : 'FAQ Topics & Glossary',
            grouped.faq,
            BookOpen,
            grouped.province.length + grouped.program.length
          )}
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Desktop / Tablet Inline Search Bar */}
      <div ref={containerRef} className="relative hidden md:block w-48 lg:w-52 xl:w-64">
        <div className="relative flex items-center">
          <Search
            className="pointer-events-none absolute left-2.5 h-4 w-4 text-slate-400"
            aria-hidden="true"
          />
          <input
            ref={desktopInputRef}
            type="search"
            value={query}
            onFocus={() => setDesktopOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setDesktopOpen(true);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder={pa ? 'ਸੂਬਾ, ਪ੍ਰੋਗਰਾਮ, FAQ ਖੋਜੋ...' : 'Search province, program, FAQ...'}
            aria-label={pa ? 'ਪੂਰੀ ਐਪ ਵਿੱਚ ਖੋਜੋ' : 'Global search across provinces, programs, and FAQs'}
            className="h-9 w-full rounded-lg border border-slate-300 bg-slate-50 pl-8 pr-7 text-sm text-slate-900 placeholder:text-slate-500 focus:border-red-500 focus:bg-white focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                desktopInputRef.current?.focus();
              }}
              aria-label={pa ? 'ਖੋਜ ਸਾਫ਼ ਕਰੋ' : 'Clear search'}
              className="absolute right-2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        {desktopOpen && (
          <div className="absolute right-0 top-11 z-50 w-[min(92vw,28rem)] max-h-[75vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
            {resultsContent}
          </div>
        )}
      </div>

      {/* Mobile Compact Header Trigger */}
      <button
        type="button"
        onClick={() => {
          setMobileOpen(true);
          setTimeout(() => mobileInputRef.current?.focus(), 40);
        }}
        aria-label={pa ? 'ਸੂਬਾ, ਪ੍ਰੋਗਰਾਮ ਜਾਂ FAQ ਖੋਜੋ' : 'Search provinces, programs, or FAQs'}
        className="md:hidden inline-flex items-center justify-center min-h-[40px] min-w-[40px] rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-100 cursor-pointer"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
      </button>

      {/* Mobile Full-Width Top Search Sheet */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-slate-900/50 backdrop-blur-xs no-print">
          <div className="bg-white border-b border-slate-200 shadow-xl max-h-[85vh] flex flex-col">
            <div className="flex items-center gap-2 p-3 border-b border-slate-100">
              <div className="relative flex-1 flex items-center">
                <Search
                  className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  ref={mobileInputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder={pa ? 'ਸੂਬਾ, ਪ੍ਰੋਗਰਾਮ, FAQ ਖੋਜੋ...' : 'Search province, program, FAQ...'}
                  aria-label={pa ? 'ਪੂਰੀ ਐਪ ਵਿੱਚ ਖੋਜੋ' : 'Global search'}
                  className="min-h-[44px] w-full rounded-xl border border-slate-300 bg-slate-50 pl-9 pr-8 text-base text-slate-900 placeholder:text-slate-500 focus:border-red-500 focus:bg-white focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      mobileInputRef.current?.focus();
                    }}
                    aria-label={pa ? 'ਖੋਜ ਸਾਫ਼ ਕਰੋ' : 'Clear search'}
                    className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="min-h-[44px] px-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer shrink-0"
              >
                {pa ? 'ਬੰਦ ਕਰੋ' : 'Cancel'}
              </button>
            </div>

            <div className="overflow-y-auto flex-1 pb-4">
              {resultsContent}
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}
    </>
  );
}
