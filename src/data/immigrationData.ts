import { BiText, DrawRecord, FaqEntry, PlanTemplate, PnpProvinceInfo, QuotaProgress } from '../types';

export const DISCLAIMER_TEXT: BiText = {
  en: 'This is general information, not legal advice. Immigration rules change often — always verify on canada.ca and the official province page before you apply. Talk to a licensed RCIC / immigration lawyer for your own case.',
  pa: 'ਇਹ ਸਿਰਫ਼ ਆਮ ਜਾਣਕਾਰੀ ਹੈ, ਕਾਨੂੰਨੀ ਸਲਾਹ ਨਹੀਂ। ਇਮੀਗ੍ਰੇਸ਼ਨ ਨਿਯਮ ਅਕਸਰ ਬਦਲਦੇ ਰਹਿੰਦੇ ਹਨ — ਅਪਲਾਈ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਹਮੇਸ਼ਾ canada.ca ਅਤੇ ਸੰਬੰਧਿਤ ਸੂਬੇ ਦੀ ਅਧਿਕਾਰਤ ਵੈੱਬਸਾਈਟ ’ਤੇ ਪੁਸ਼ਟੀ ਕਰੋ। ਆਪਣੇ ਨਿੱਜੀ ਕੇਸ ਲਈ ਲਾਇਸੰਸਸ਼ੁਦਾ RCIC ਜਾਂ ਇਮੀਗ੍ਰੇਸ਼ਨ ਵਕੀਲ ਨਾਲ ਗੱਲ ਕਰੋ।'
};

export const DATA_LAST_CHECKED = '20 Nov 2026';

export const POOL_SNAPSHOT = [
  { range: '601+', count: 787, pct: 0.3 },
  { range: '501–600', count: 20535, pct: 9.0 },
  { range: '451–500', count: 71112, pct: 31.1 },
  { range: '401–450', count: 63505, pct: 27.8 },
  { range: '351–400', count: 47911, pct: 20.9 },
  { range: '301–350', count: 17247, pct: 7.5 },
  { range: '0–300', count: 7627, pct: 3.3 }
];

export const DRAWS_DATA: DrawRecord[] = [
  {
    id: '#453',
    scope: 'Federal',
    date: '28 Oct 2026',
    program: { en: 'Express Entry — Transport Category', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ — ਟ੍ਰਾਂਸਪੋਰਟ ਸ਼੍ਰੇਣੀ' },
    itas: '150',
    crs: '477',
    note: { en: 'Last round before 3 Nov 2026 pause', pa: '3 ਨਵੰਬਰ 2026 ਦੀ ਰੋਕ ਤੋਂ ਪਹਿਲਾਂ ਆਖਰੀ ਡਰਾਅ' }
  },
  {
    id: '#452',
    scope: 'Federal',
    date: '27 Oct 2026',
    program: { en: 'Express Entry — French Language Proficiency', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ — ਫ੍ਰੈਂਚ ਭਾਸ਼ਾ' },
    itas: '5,000',
    crs: '407',
    note: { en: 'Requires NCLC 7+ in all 4 French skills', pa: 'ਚਾਰੋਂ ਫ੍ਰੈਂਚ ਹੁਨਰਾਂ ਵਿੱਚ NCLC 7+ ਜ਼ਰੂਰੀ' }
  },
  {
    id: '#451',
    scope: 'Federal',
    date: '26 Oct 2026',
    program: { en: 'Express Entry — PNP Candidates Only', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ — ਸਿਰਫ਼ PNP ਉਮੀਦਵਾਰ' },
    itas: '792',
    crs: '761',
    note: { en: 'Includes +600 provincial nomination points', pa: '+600 ਸੂਬਾਈ ਨਾਮਜ਼ਦਗੀ ਅੰਕ ਸ਼ਾਮਲ' }
  },
  {
    id: '#450',
    scope: 'Federal',
    date: '15 Oct 2026',
    program: { en: 'Express Entry — Canadian Experience Class (CEC)', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ — CEC (ਕੈਨੇਡੀਅਨ ਤਜਰਬਾ)' },
    itas: '2,500',
    crs: '519',
    note: { en: 'For workers with 1+ yr skilled Canadian experience', pa: '1+ ਸਾਲ ਕੈਨੇਡੀਅਨ ਤਜਰਬੇ ਵਾਲੇ ਕਾਮਿਆਂ ਲਈ' }
  },
  {
    id: '#449',
    scope: 'Federal',
    date: '1 Oct 2026',
    program: { en: 'Express Entry — Trades Occupations', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ — ਟ੍ਰੇਡਜ਼ ਕਿੱਤੇ' },
    itas: '3,500',
    crs: '476',
    note: { en: 'Targeted skilled trades category round', pa: 'ਹੁਨਰਮੰਦ ਟ੍ਰੇਡਜ਼ ਸ਼੍ਰੇਣੀ ਡਰਾਅ' }
  },
  {
    id: 'MB-#284',
    scope: 'Province',
    prov: 'Manitoba',
    date: '19 Nov 2026',
    program: { en: 'MPNP Draw #284 — Skilled Worker & Strategic', pa: 'ਮੈਨੀਟੋਬਾ MPNP #284 — ਹੁਨਰਮੰਦ ਕਾਮੇ' },
    itas: '1,116 LAAs',
    crs: 'Targeted',
    note: { en: '1,050 Ukraine Initiative + 66 Strategic Recruitment (41 EE)', pa: '1,050 ਯੂਕਰੇਨ ਪਹਿਲ + 66 Strategic ਚੋਣ (41 EE)' }
  },
  {
    id: 'NL-19Nov',
    scope: 'Province',
    prov: 'Newfoundland',
    date: '19 Nov 2026',
    program: { en: 'NLPNP & AIP — Accelerator EOI Draws', pa: 'NL PNP ਅਤੇ AIP — EOI ਡਰਾਅ' },
    itas: '98 ITAs (152 wk)',
    crs: 'EOI / Target',
    note: { en: '98 ITAs on 19 Nov + 54 ITAs on 16 Nov across NLPNP/AIP', pa: '19 ਨਵੰ. ਨੂੰ 98 ਅਤੇ 16 ਨਵੰ. ਨੂੰ 54 ਸੱਦੇ (NLPNP/AIP)' }
  },
  {
    id: 'NT-18Nov',
    scope: 'Province',
    prov: 'NWT',
    date: '18 Nov 2026',
    program: { en: 'NTNP — Employer-Driven EOI Draw', pa: 'NWT NTNP — EOI ਡਰਾਅ' },
    itas: '350 Quota (+50)',
    crs: 'EOI Ranked',
    note: { en: 'Triggered by Nov 2026 quota boost to 350; 1-week filing window', pa: 'ਨਵੰ. 2026 ਵਿੱਚ ਕੋਟਾ 350 ਹੋਣ ’ਤੇ ਵਾਧੂ EOI ਡਰਾਅ' }
  },
  {
    id: 'BC-13Nov',
    scope: 'Province',
    prov: 'BC',
    date: '13 Nov 2026',
    program: { en: 'BC PNP — Care & Build (Health / Trades / ECE)', pa: 'BC PNP — ਸਿਹਤ, ਉਸਾਰੀ ਅਤੇ ECE' },
    itas: '6,254 Quota',
    crs: '72–95 / 200',
    note: { en: 'Health ~72, Construction ~94, Childcare ~95; ELSS closed', pa: 'ਸਿਹਤ ~72, ਉਸਾਰੀ ~94, ECE ~95; ELSS ਬੰਦ ਹੈ' }
  },
  {
    id: 'NB-Nov',
    scope: 'Province',
    prov: 'New Brunswick',
    date: 'Nov 2026',
    program: { en: 'NBPNP — Skilled Worker, Francophone & AIP', pa: 'NB PNP — ਹੁਨਰਮੰਦ, ਫ੍ਰੈਂਚ ਅਤੇ AIP' },
    itas: '390 + 73 AIP',
    crs: '67 / 100 + EOI',
    note: { en: '390 NBPNP ITAs + 73 AIP; NAICS 72 hospitality restricted', pa: '390 NBPNP + 73 AIP ਸੱਦੇ; ਹੋਟਲ ਸੈਕਟਰ ’ਤੇ ਪਾਬੰਦੀ' }
  },
  {
    id: 'PE-9Nov',
    scope: 'Province',
    prov: 'PEI',
    date: '9 Nov 2026',
    program: { en: 'PEI PNP — Labour Impact & Express Entry', pa: 'PEI PNP — ਲੇਬਰ ਅਤੇ EE' },
    itas: '192 ITAs',
    crs: 'PEI EOI / 100',
    note: { en: 'Healthcare, trades, childcare, mfg; 30-day ITA filing rule', pa: 'ਸਿਹਤ, ਟ੍ਰੇਡਜ਼, ECE; ITA ਤੋਂ 30 ਦਿਨਾਂ ਵਿੱਚ ਅਰਜ਼ੀ ਲਾਜ਼ਮੀ' }
  },
  {
    id: 'AB-Nov',
    scope: 'Province',
    prov: 'Alberta',
    date: 'Nov 2026',
    program: { en: 'AAIP — Alberta Opportunity & Express Entry', pa: 'ਅਲਬਰਟਾ AAIP — ਮੌਕਾ ਅਤੇ ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ' },
    itas: '6,108 YTD',
    crs: '300+ EE',
    note: { en: '6,108 of 6,603 used — only 495 spots left for 2026', pa: '6,603 ਵਿੱਚੋਂ 6,108 ਵਰਤੇ — ਸਿਰਫ਼ 495 ਥਾਵਾਂ ਬਾਕੀ' }
  },
  {
    id: 'ON-Fall',
    scope: 'Province',
    prov: 'Ontario',
    date: 'Oct–Nov 2026',
    program: { en: 'OINP — Ontario Workforce Priority (OWP)', pa: 'ਓਂਟਾਰੀਓ OINP — ਵਰਕਫੋਰਸ ਤਰਜੀਹ (OWP)' },
    itas: '14,119 Quota',
    crs: 'EOI / 132',
    note: { en: 'Reg 47/26 consolidated streams into OWP; Oct 5 CRA wage pts + REDI', pa: 'ਸਿਰਫ਼ OWP ਖੁੱਲ੍ਹਾ; 5 ਅਕਤੂ. ਨੂੰ ਤਨਖਾਹ ਅੰਕ ਅਤੇ REDI ਅੱਪਡੇਟ' }
  },
  {
    id: 'SK-Nov',
    scope: 'Province',
    prov: 'Saskatchewan',
    date: 'Nov 2026',
    program: { en: 'SINP — Sector Allocation / Capped Intake', pa: 'ਸਸਕੈਚਵਨ SINP — ਸੈਕਟਰ ਕੋਟਾ' },
    itas: '4,761–5,261',
    crs: '60 / 110 min',
    note: { en: 'Standard EOI draws paused; Nov capped employer windows open', pa: 'ਆਮ EOI ਡਰਾਅ ਰੁਕੇ; ਖਾਸ ਸੈਕਟਰ ਰੁਜ਼ਗਾਰਦਾਤਾ ਵਿੰਡੋ ਖੁੱਲ੍ਹੀ' }
  },
  {
    id: 'NS-26',
    scope: 'Province',
    prov: 'Nova Scotia',
    date: 'Fall 2026',
    program: { en: 'NSNP — 4 Consolidated Core Streams', pa: 'ਨੋਵਾ ਸਕੋਸ਼ੀਆ NSNP — 4 ਮੁੱਖ ਸਟ੍ਰੀਮਾਂ' },
    itas: '~4,100 est.',
    crs: 'EOI (12 mo)',
    note: { en: 'Consolidated from 10 to 4 streams (Feb 2026); fees added Sep 1', pa: '10 ਤੋਂ 4 ਸਟ੍ਰੀਮਾਂ (ਫਰਵਰੀ 2026); 1 ਸਤੰ. ਤੋਂ ਫੀਸ ਲਾਗੂ' }
  }
];

export const QUOTA_BARS: QuotaProgress[] = [
  {
    prov: { en: 'Alberta (AAIP)', pa: 'ਅਲਬਰਟਾ (AAIP)' },
    totalLabel: '6,603',
    detail: { en: '6,108 used · 495 left', pa: '6,108 ਵਰਤੇ · 495 ਬਾਕੀ' },
    pct: 92.5,
    tone: 'warning'
  },
  {
    prov: { en: 'Saskatchewan (SINP)', pa: 'ਸਸਕੈਚਵਨ (SINP)' },
    totalLabel: '4,761–5,261',
    detail: { en: 'Sector model · standard EOI paused', pa: 'ਸੈਕਟਰ ਮਾਡਲ · ਆਮ EOI ਰੁਕੇ' },
    pct: 96,
    tone: 'full'
  },
  {
    prov: { en: 'Ontario (OINP)', pa: 'ਓਂਟਾਰੀਓ (OINP)' },
    totalLabel: '14,119',
    detail: { en: '14,119 allocation · OWP & REDI active', pa: '14,119 ਕੋਟਾ · OWP ਅਤੇ REDI ਚਾਲੂ' },
    pct: 82,
    tone: 'healthy'
  },
  {
    prov: { en: 'British Columbia (BC PNP)', pa: 'ਬ੍ਰਿਟਿਸ਼ ਕੋਲੰਬੀਆ (BC PNP)' },
    totalLabel: '6,254',
    detail: { en: 'Care/Build/Innovate · 13 Nov draw · ELSS closed', pa: '13 ਨਵੰ. Care/Build ਡਰਾਅ · ELSS ਬੰਦ' },
    pct: 86,
    tone: 'warning'
  },
  {
    prov: { en: 'Manitoba (MPNP)', pa: 'ਮੈਨੀਟੋਬਾ (MPNP)' },
    totalLabel: '6,239',
    detail: { en: 'Draw #284 (19 Nov: 1,116 LAAs)', pa: 'ਡਰਾਅ #284 (19 ਨਵੰ: 1,116 LAAs)' },
    pct: 84,
    tone: 'healthy'
  },
  {
    prov: { en: 'Northwest Territories (NTNP)', pa: 'NWT (NTNP)' },
    totalLabel: '350',
    detail: { en: 'Boosted twice to 350 (+50 Nov 2026)', pa: 'ਨਵੰ. 2026 ਵਿੱਚ 350 ਤੱਕ ਵਧਾਇਆ (+50)' },
    pct: 88,
    tone: 'healthy'
  }
];

export const PNP_PROVINCES: PnpProvinceInfo[] = [
  {
    code: 'ON',
    name: { en: 'Ontario (OINP)', pa: 'ਓਂਟਾਰੀਓ (OINP)' },
    alloc: '14,119',
    status: { en: 'Only Workforce Priority Open', pa: 'ਸਿਰਫ਼ Workforce Priority ਖੁੱਲ੍ਹਾ' },
    statusTone: 'limited',
    jobOffer: { en: 'Required for Workforce Priority; not required for paused Human Capital/French rounds', pa: 'Workforce Priority ਲਈ ਜ਼ਰੂਰੀ; HCP/ਫ੍ਰੈਂਚ (ਰੋਕੇ) ਲਈ ਨਹੀਂ' },
    scoreSystem: 'EOI / 132 (Job Offer) · CRS (EE)',
    eeOption: true,
    streams: { en: 'Employer Job Offer (Foreign Worker, Int’l Student, In-Demand Skills), Human Capital Priorities, French-Speaking, Master’s/PhD', pa: 'Workforce Priority (ਚਾਲੂ), Human Capital Priorities, French-Speaking, Master’s/PhD' },
    keyFact: { en: 'Ontario Reg 47/26 consolidated legacy streams into Ontario Workforce Priority (OWP, reopened Aug 2026); Oct 5 updated CRA earnings pts ($80k+ = 10 pts) & REDI launched through 2027.', pa: 'Reg 47/26 ਅਧੀਨ ਪੁਰਾਣੀਆਂ ਸਟ੍ਰੀਮਾਂ ਰੱਦ ਕਰਕੇ ਸਿਰਫ਼ Ontario Workforce Priority (OWP) ਖੁੱਲ੍ਹੀ ਹੈ; 5 ਅਕਤੂ. ਤੋਂ CRA ਤਨਖਾਹ ਅੰਕ ($80k+=10) ਤੇ REDI ਲਾਗੂ।' },
    url: 'https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp',
    feeCad: '$1,500–$2,000 CAD (varies by stream)',
    processingNote: { en: 'OWP + REDI active; Oct 5 earnings scoring update ($30k–$80k+)', pa: 'OWP + REDI ਚਾਲੂ; 5 ਅਕਤੂ. ਤਨਖਾਹ ਅੰਕ ਅੱਪਡੇਟ ($30k–$80k+)' },
    occupationFocus: {
      en: 'Workforce Priority targets Healthcare, Skilled Trades, Manufacturing, Early Childhood Education, Transport, and designated In-Demand TEER 4/5 roles (Nurse Aides/PSW 33102, Transport Truck Drivers 73300, Construction Labourers 75110, Machine Operators).',
      pa: 'Workforce Priority ਸਿਹਤ, ਟ੍ਰੇਡਜ਼, ਫੈਕਟਰੀ, ECE, ਟਰੱਕ ਡਰਾਈਵਰ (73300), PSW (33102) ਅਤੇ ਉਸਾਰੀ ਮਜ਼ਦੂਰਾਂ (75110) ’ਤੇ ਕੇਂਦ੍ਰਿਤ ਹੈ।'
    },
    languageSummary: {
      en: 'Job Offer Foreign Worker / Student: no test for base EOI (EOI points awarded for CLB 7+); In-Demand Skills (TEER 4/5): minimum CLB 4; HCP/French EE (paused): CLB 7+ or NCLC 7+.',
      pa: 'Foreign Worker/Student: EOI ਲਈ CLB 7+ ਅੰਕ ਦਿੰਦਾ ਹੈ; In-Demand (TEER 4/5): CLB 4 ਲਾਜ਼ਮੀ; HCP/ਫ੍ਰੈਂਚ (ਰੋਕੇ): CLB/NCLC 7+।'
    },
    workExpSummary: {
      en: 'Foreign Worker: 2 yrs in same TEER 0–3 NOC in past 5 yrs (or ON license); Int’l Student: 0 yrs; In-Demand Skills: 9 months Ontario work in TEER 4/5 in past 3 yrs.',
      pa: 'Foreign Worker: 5 ਸਾਲਾਂ ਵਿੱਚ 2 ਸਾਲ TEER 0–3 ਕੰਮ; Int’l Student: 0 ਸਾਲ; In-Demand: ਓਂਟਾਰੀਓ ਵਿੱਚ 9 ਮਹੀਨੇ TEER 4/5 ਕੰਮ।'
    },
    streamsDetail: [
      {
        name: { en: 'Employer Job Offer: Foreign Worker (Workforce Priority)', pa: 'Employer Job Offer: Foreign Worker (Workforce Priority)' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '2 years full-time (or part-time equivalent) in same TEER 0–3 NOC in past 5 yrs (or valid Ontario regulated license)', pa: 'ਪਿਛਲੇ 5 ਸਾਲਾਂ ਵਿੱਚ ਉਸੇ TEER 0–3 NOC ਵਿੱਚ 2 ਸਾਲ ਕੰਮ (ਜਾਂ ਓਂਟਾਰੀਓ ਲਾਇਸੰਸ)' },
        language: { en: 'No mandatory test for base eligibility (EOI points for CLB 7–9+; federal PR stage requires CLB)', pa: 'ਬੇਸ ਯੋਗਤਾ ਲਈ ਲਾਜ਼ਮੀ ਨਹੀਂ (CLB 7–9+ ਦੇ ਵੱਧ EOI ਅੰਕ)' },
        education: { en: 'Post-secondary not strictly mandated (EOI points awarded for degree/diploma)', pa: 'ਡਿਗਰੀ/ਡਿਪਲੋਮੇ ਦੇ EOI ਅੰਕ ਮਿਲਦੇ ਹਨ' },
        occupations: { en: 'Any TEER 0, 1, 2, or 3 occupation with targeted OINP draws in Healthcare, Trades, STEM/Tech, and Regional GTA-outside jobs', pa: 'ਕੋਈ ਵੀ TEER 0–3 ਕਿੱਤਾ (ਸਿਹਤ, ਟ੍ਰੇਡਜ਼, ਟੈਕ ਅਤੇ GTA ਤੋਂ ਬਾਹਰ ਨੌਕਰੀਆਂ ਨੂੰ ਤਰਜੀਹ)' },
        fundsOrWage: { en: 'Offer must meet Ontario median wage (low wage if already working in role); employer needs $1M revenue / 5 FT Canadians in GTA ($500k / 3 outside GTA)', pa: 'ਤਨਖਾਹ ਓਂਟਾਰੀਓ median wage ਅਨੁਸਾਰ; ਕੰਪਨੀ: GTA ਵਿੱਚ $1M ਆਮਦਨ / 5 ਸਟਾਫ਼ ($500k / 3 ਬਾਹਰ)' },
        keyCriteria: { en: 'Full-time permanent TEER 0–3 job offer approved in Employer Portal; ranked via OINP EOI / 132 scoring grid (location outside GTA gives extra points).', pa: 'ਪੱਕਾ TEER 0–3 ਜੌਬ ਆਫਰ; EOI / 132 ਅੰਕ ਸਿਸਟਮ (GTA ਤੋਂ ਬਾਹਰ ਵੱਧ ਅੰਕ)।' }
      },
      {
        name: { en: 'Employer Job Offer: International Student (Workforce Priority)', pa: 'Employer Job Offer: International Student (Workforce Priority)' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: 'No prior work experience required (bonus EOI points if 6+ months in Canada)', pa: 'ਪਹਿਲਾਂ ਕੰਮ ਦਾ ਤਜਰਬਾ ਜ਼ਰੂਰੀ ਨਹੀਂ (ਕੈਨੇਡਾ ਵਿੱਚ 6+ ਮਹੀਨੇ ਕੰਮ ਦੇ ਵਾਧੂ ਅੰਕ)' },
        language: { en: 'No mandatory test at base stage (CLB 7+ boosts EOI ranking)', pa: 'ਬੇਸ ਸਟੇਜ ’ਤੇ ਲਾਜ਼ਮੀ ਨਹੀਂ (CLB 7+ ਨਾਲ EOI ਸਕੋਰ ਵੱਧਦਾ ਹੈ)' },
        education: { en: '2+ yr diploma/degree OR 1+ yr post-grad certificate completed within 2 years from eligible Canadian DLI (50%+ studied inside Canada)', pa: 'ਪਿਛਲੇ 2 ਸਾਲਾਂ ਵਿੱਚ ਯੋਗ ਕੈਨੇਡੀਅਨ DLI ਤੋਂ 2+ ਸਾਲ ਡਿਪਲੋਮਾ/ਡਿਗਰੀ ਜਾਂ 1+ ਸਾਲ ਗ੍ਰੈਡ ਸਰਟੀਫਿਕੇਟ' },
        occupations: { en: 'All TEER 0, 1, 2, and 3 occupations (priority draws for Healthcare, Trades, ECE, STEM)', pa: 'ਸਾਰੇ TEER 0–3 ਕਿੱਤੇ (ਸਿਹਤ, ਟ੍ਰੇਡਜ਼, ECE, STEM ਨੂੰ ਤਰਜੀਹ)' },
        fundsOrWage: { en: 'Full-time permanent offer meeting Ontario low-wage level for that NOC/region', pa: 'ਓਂਟਾਰੀਓ low-wage ਪੱਧਰ ਅਨੁਸਾਰ ਪੱਕਾ ਆਫਰ' },
        keyCriteria: { en: 'Must apply within 2 years of graduation; employer must meet OINP revenue and Canadian/PR staff minimums; EOI / 132.', pa: 'ਗ੍ਰੈਜੂਏਸ਼ਨ ਤੋਂ 2 ਸਾਲਾਂ ਦੇ ਅੰਦਰ ਅਰਜ਼ੀ; ਰੁਜ਼ਗਾਰਦਾਤਾ ਦੀਆਂ ਸ਼ਰਤਾਂ ਪੂਰੀਆਂ; EOI / 132।' }
      },
      {
        name: { en: 'Employer Job Offer: In-Demand Skills (Workforce Priority)', pa: 'Employer Job Offer: In-Demand Skills (Workforce Priority)' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '9 months cumulative Ontario full-time work in the same NOC within past 3 years', pa: 'ਪਿਛਲੇ 3 ਸਾਲਾਂ ਵਿੱਚ ਓਂਟਾਰੀਓ ਵਿੱਚ ਉਸੇ NOC ਵਿੱਚ 9 ਮਹੀਨੇ ਫੁੱਲ-ਟਾਈਮ ਕੰਮ' },
        language: { en: 'Minimum CLB 4 in all 4 skills (Listening, Reading, Writing, Speaking)', pa: 'ਚਾਰੋਂ ਹੁਨਰਾਂ ਵਿੱਚ ਘੱਟੋ-ਘੱਟ CLB 4' },
        education: { en: 'Canadian high school diploma or foreign equivalent with ECA', pa: '12ਵੀਂ (ਹਾਈ ਸਕੂਲ) ਜਾਂ ਵਿਦੇਸ਼ੀ ਪੜ੍ਹਾਈ ਲਈ ECA' },
        occupations: { en: 'Restricted TEER 4/5 list: Healthcare Support/PSW (33102), Agricultural workers (84120/85100), Construction helpers (75110), Manufacturing machine operators (94100–95109), Transport Truck Drivers (73300 outside GTA) & select meat/processing roles', pa: 'ਖਾਸ TEER 4/5 ਸੂਚੀ: PSW/ਨਰਸ ਏਡ (33102), ਖੇਤੀਬਾੜੀ, ਉਸਾਰੀ ਮਜ਼ਦੂਰ (75110), ਫੈਕਟਰੀ ਮਸ਼ੀਨ ਆਪਰੇਟਰ, ਟਰੱਕ ਡਰਾਈਵਰ (73300 GTA ਤੋਂ ਬਾਹਰ)' },
        fundsOrWage: { en: 'Median wage for occupation/region + $1M/$500k employer revenue threshold', pa: 'ਤਨਖਾਹ median wage ਅਨੁਸਾਰ + ਕੰਪਨੀ ਆਮਦਨ ਸ਼ਰਤ' },
        keyCriteria: { en: 'Only accepts eligible TEER 4/5 occupations listed by OINP; strong route for PSWs, farm, factory, and non-GTA truck drivers.', pa: 'ਸਿਰਫ਼ OINP ਵੱਲੋਂ ਮਨਜ਼ੂਰ TEER 4/5 ਕਿੱਤਿਆਂ ਲਈ; PSW, ਫੈਕਟਰੀ ਤੇ ਟਰੱਕ ਡਰਾਈਵਰਾਂ ਲਈ ਖਾਸ ਰਸਤਾ।' }
      },
      {
        name: { en: 'Human Capital Priorities & French-Speaking Skilled Worker (EE)', pa: 'Human Capital Priorities ਅਤੇ French-Speaking (EE)' },
        status: 'Paused',
        jobOfferRequired: false,
        expressEntry: true,
        workExp: { en: '1 yr FSWP continuous or CEC cumulative skilled work (TEER 0–3)', pa: '1 ਸਾਲ FSWP ਜਾਂ CEC ਹੁਨਰਮੰਦ ਕੰਮ (TEER 0–3)' },
        language: { en: 'CLB 7+ English/French (HCP) OR French NCLC 7+ and English CLB 6+ (FSSW)', pa: 'CLB 7+ (HCP) ਜਾਂ ਫ੍ਰੈਂਚ NCLC 7+ ਅਤੇ ਅੰਗਰੇਜ਼ੀ CLB 6+ (FSSW)' },
        education: { en: 'Bachelor’s degree or higher (+ ECA if completed outside Canada)', pa: 'ਬੈਚਲਰ ਡਿਗਰੀ ਜਾਂ ਵੱਧ (+ ECA)' },
        occupations: { en: 'Historically targeted Tech/STEM, Healthcare, Trades, Finance, and general bilingual French profiles (TEER 0–3)', pa: 'ਪਹਿਲਾਂ STEM/ਟੈਕ, ਸਿਹਤ, ਟ੍ਰੇਡਜ਼ ਅਤੇ ਫ੍ਰੈਂਚ ਬੋਲਣ ਵਾਲਿਆਂ ਲਈ (TEER 0–3)' },
        fundsOrWage: { en: 'Must meet IRCC Express Entry settlement funds ($14,690+ single unless CEC)', pa: 'Express Entry ਸੈਟਲਮੈਂਟ ਫੰਡ ($14,690+ ਇੱਕਲੇ ਲਈ)' },
        keyCriteria: { en: 'Active Express Entry profile +600 CRS via Notification of Interest (NOI); currently paused in late 2026 while Workforce Priority stays open.', pa: 'ਮੌਜੂਦਾ ਸਮੇਂ ਵਿੱਚ ਰੁਕਿਆ ਹੋਇਆ ਹੈ (ਸਿਰਫ਼ Workforce Priority ਖੁੱਲ੍ਹਾ ਹੈ)।' }
      },
      {
        name: { en: 'Master’s Graduate & PhD Graduate Streams', pa: 'Master’s ਅਤੇ PhD Graduate ਸਟ੍ਰੀਮਾਂ' },
        status: 'Paused',
        jobOfferRequired: false,
        expressEntry: false,
        workExp: { en: 'None required', pa: 'ਲੋੜ ਨਹੀਂ' },
        language: { en: 'CLB 7+ in all 4 skills (Master’s stream)', pa: 'ਚਾਰੋਂ ਹੁਨਰਾਂ ਵਿੱਚ CLB 7+ (ਮਾਸਟਰ)' },
        education: { en: 'Eligible Ontario public university Master’s (1+ yr) or PhD (2+ yrs)', pa: 'ਓਂਟਾਰੀਓ ਯੂਨੀਵਰਸਿਟੀ ਤੋਂ ਮਾਸਟਰ (1+ ਸਾਲ) ਜਾਂ PhD (2+ ਸਾਲ)' },
        occupations: { en: 'Any field (higher EOI points for STEM, Health, Trades)', pa: 'ਕੋਈ ਵੀ ਖੇਤਰ (STEM, ਸਿਹਤ, ਟ੍ਰੇਡਜ਼ ਨੂੰ ਵੱਧ ਅੰਕ)' },
        fundsOrWage: { en: 'Ontario settlement funds ($14,690+ single) + 1 yr Ontario residency in past 2 yrs', pa: 'ਸੈਟਲਮੈਂਟ ਫੰਡ + ਪਿਛਲੇ 2 ਸਾਲਾਂ ਵਿੱਚ 1 ਸਾਲ ਓਂਟਾਰੀਓ ਰਿਹਾਇਸ਼' },
        keyCriteria: { en: 'Currently paused/restricted in late 2026; check OINP updates before preparing.', pa: '2026 ਦੇ ਅੰਤ ਵਿੱਚ ਰੋਕਿਆ ਹੋਇਆ ਹੈ।' }
      }
    ]
  },
  {
    code: 'BC',
    name: { en: 'British Columbia (BC PNP)', pa: 'ਬ੍ਰਿਟਿਸ਼ ਕੋਲੰਬੀਆ (BC PNP)' },
    alloc: '6,254',
    status: { en: 'Open (ELSS Closed)', pa: 'ਖੁੱਲ੍ਹਾ (ELSS ਬੰਦ)' },
    statusTone: 'limited',
    jobOffer: { en: 'Required for almost all streams (except Health Authority / PhD)', pa: 'ਲਗਭਗ ਸਾਰੀਆਂ ਸਟ੍ਰੀਮਾਂ ਲਈ ਜੌਬ ਆਫਰ ਜ਼ਰੂਰੀ' },
    scoreSystem: 'SIRS / 200 points',
    eeOption: true,
    streams: { en: 'Skilled Worker, Health Authority, International Graduate (Degree), Tech Priority, ELSS (Closed)', pa: 'Skilled Worker, Health Authority, International Graduate, Tech, ELSS (ਬੰਦ)' },
    keyFact: { en: 'BC uses Care, Build & Innovate draws (13 Nov 2026: Health ~72, Construction ~94, Childcare ~95; 30-day ITA deadline). ELSS is CLOSED.', pa: 'BC ਵਿੱਚ Care, Build & Innovate ਡਰਾਅ (13 ਨਵੰ. 2026: ਸਿਹਤ ~72, ਉਸਾਰੀ ~94, ECE ~95; 30 ਦਿਨ ITA ਸਮਾਂ)। ELSS ਬੰਦ ਹੈ।' },
    url: 'https://www.welcomebc.ca/Immigrate-to-B-C/About-The-BC-PNP',
    feeCad: '$1,475 CAD',
    processingNote: { en: '30-day ITA deadline; Care/Build (13 Nov) & Innovate (~$49/hr or 131 pts)', pa: 'ITA ਤੋਂ 30 ਦਿਨ ਦਾ ਸਮਾਂ; 13 ਨਵੰ. Care/Build ਡਰਾਅ' },
    occupationFocus: {
      en: 'Targeted draws focus strictly on Healthcare (nurses, doctors, allied health), Childcare (ECE 42202), Construction (30+ building trades NOCs), Veterinary Care, and 35 Tech Priority NOCs. TEER 4/5 ELSS stream is CLOSED.',
      pa: 'ਖਾਸ ਡਰਾਅ: ਸਿਹਤ ਸੇਵਾਵਾਂ, ਬਾਲ-ਸੰਭਾਲ (ECE 42202), ਉਸਾਰੀ ਟ੍ਰੇਡਜ਼ (30+ NOC), ਵੈਟਰਨਰੀ ਅਤੇ 35 ਟੈਕ ਕਿੱਤੇ। TEER 4/5 (ELSS) ਬੰਦ ਹੈ।'
    },
    languageSummary: {
      en: 'TEER 0/1: CLB 4 minimum (CLB 7+ required if using EEBC Express Entry); TEER 2/3: CLB 4 minimum (CLB 5–7+ for EEBC); higher CLB earns up to 40 SIRS points.',
      pa: 'ਬੇਸ BC PNP ਲਈ ਘੱਟੋ-ਘੱਟ CLB 4 (EEBC Express Entry ਲਈ CLB 5–7+); ਉੱਚ CLB ਦੇ SIRS ਵਿੱਚ 40 ਤੱਕ ਅੰਕ।'
    },
    workExpSummary: {
      en: 'Skilled Worker requires 2+ yrs directly related TEER 0–3 experience (can be abroad or in Canada). International Graduate & Health Authority have 0–2 yr rules.',
      pa: 'Skilled Worker ਲਈ 2+ ਸਾਲ ਸੰਬੰਧਿਤ TEER 0–3 ਤਜਰਬਾ (ਵਿਦੇਸ਼ ਜਾਂ ਕੈਨੇਡਾ) ਜ਼ਰੂਰੀ; International Graduate ਲਈ 0 ਸਾਲ।'
    },
    streamsDetail: [
      {
        name: { en: 'Skilled Worker (Regular & Express Entry BC +600)', pa: 'Skilled Worker (Regular ਅਤੇ Express Entry BC)' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: true,
        workExp: { en: '2+ years full-time directly related TEER 0–3 work experience', pa: '2+ ਸਾਲ ਸੰਬੰਧਿਤ TEER 0–3 ਕੰਮ ਦਾ ਤਜਰਬਾ' },
        language: { en: 'CLB 4+ (TEER 2/3 Base) · CLB 7+ recommended/required for EEBC (+600 CRS)', pa: 'CLB 4+ (ਬੇਸ) · Express Entry BC ਲਈ CLB 7+ ਜ਼ਰੂਰੀ' },
        education: { en: 'Post-secondary matching NOC job requirements (ECA for EEBC)', pa: 'NOC ਅਨੁਸਾਰ ਪੜ੍ਹਾਈ (EEBC ਲਈ ECA)' },
        occupations: { en: 'TEER 0–3 jobs; invitations heavily favour Healthcare, Childcare (42202), Construction Trades, Veterinary, and 35 BC Tech NOCs', pa: 'TEER 0–3 ਕਿੱਤੇ; ਸਿਹਤ, ECE, ਉਸਾਰੀ, ਵੈਟਰਨਰੀ ਅਤੇ 35 BC ਟੈਕ ਕਿੱਤਿਆਂ ਨੂੰ ਤਰਜੀਹ' },
        fundsOrWage: { en: 'Wage must meet BC market rate & family LICO; employer active 1+ yr in BC (5 FT staff Metro Van, 3 outside)', pa: 'BC ਮਾਰਕੀਟ ਤਨਖਾਹ ਅਤੇ LICO ਪੂਰਾ ਹੋਵੇ; ਕੰਪਨੀ 1+ ਸਾਲ ਪੁਰਾਣੀ' },
        keyCriteria: { en: 'Full-time indeterminate TEER 0–3 job offer from BC employer; ranked via SIRS / 200 (targeted cuts typically 80–105, general 115–135+).', pa: 'BC ਰੁਜ਼ਗਾਰਦਾਤਾ ਵੱਲੋਂ ਪੱਕਾ TEER 0–3 ਜੌਬ ਆਫਰ; SIRS / 200 ਅੰਕ।' }
      },
      {
        name: { en: 'Health Authority (Regular & EEBC)', pa: 'Health Authority ਸਟ੍ਰੀਮ' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: true,
        workExp: { en: 'Per clinical role (1+ yr for EEBC)', pa: 'ਕਲੀਨਿਕਲ ਭੂਮਿਕਾ ਅਨੁਸਾਰ (EEBC ਲਈ 1+ ਸਾਲ)' },
        language: { en: 'CLB 4+ (or CLB 7+ for EEBC)', pa: 'CLB 4+ (EEBC ਲਈ CLB 7+)' },
        education: { en: 'Licensed healthcare credential / BC registration', pa: 'ਲਾਇਸੰਸਸ਼ੁਦਾ ਸਿਹਤ ਯੋਗਤਾ' },
        occupations: { en: 'Physicians, Registered Nurses (31301), LPNs (32101), Midwives, Pharmacists, Allied Health, Lab/Imaging Techs hired by BC Health Authorities', pa: 'ਡਾਕਟਰ, ਰਜਿਸਟਰਡ ਨਰਸਾਂ (31301), LPN (32101), ਫਾਰਮਾਸਿਸਟ ਅਤੇ Allied Health' },
        fundsOrWage: { en: 'Public Health Authority union/contract salary', pa: 'ਪਬਲਿਕ ਹੈਲਥ ਅਥਾਰਟੀ ਤਨਖਾਹ' },
        keyCriteria: { en: 'Direct indeterminate job offer from a public BC Health Authority (VCH, Fraser, Interior, Island, Northern, PHSA); bypasses SIRS lottery.', pa: 'BC Health Authority ਵੱਲੋਂ ਸਿੱਧਾ ਜੌਬ ਆਫਰ — SIRS ਡਰਾਅ ਦੀ ਉਡੀਕ ਨਹੀਂ।' }
      },
      {
        name: { en: 'International Graduate / Post-Graduate (Regular & EEBC)', pa: 'International Graduate / Post-Graduate' },
        status: 'Limited',
        jobOfferRequired: true,
        expressEntry: true,
        workExp: { en: '0 years required (must apply within 3 yrs of graduation)', pa: '0 ਸਾਲ ਤਜਰਬਾ (ਗ੍ਰੈਜੂਏਸ਼ਨ ਤੋਂ 3 ਸਾਲਾਂ ਦੇ ਅੰਦਰ ਅਰਜ਼ੀ)' },
        language: { en: 'CLB 4+ (Base) or CLB 7+ (EEBC)', pa: 'CLB 4+ (ਬੇਸ) ਜਾਂ CLB 7+ (EEBC)' },
        education: { en: 'Eligible Canadian degree (Bachelor’s/Master’s/PhD) in last 3 yrs (BC PhD/eligible STEM Master’s exempt from offer under Post-Grad)', pa: 'ਪਿਛਲੇ 3 ਸਾਲਾਂ ਵਿੱਚ ਕੈਨੇਡੀਅਨ ਡਿਗਰੀ (BC PhD ਨੂੰ ਆਫਰ ਤੋਂ ਛੋਟ)' },
        occupations: { en: 'TEER 0–3 offers only (Healthcare, Construction, Childcare, Tech prioritized in 2026)', pa: 'ਸਿਰਫ਼ TEER 0–3 ਕਿੱਤੇ (ਸਿਹਤ, ਉਸਾਰੀ, ਬਾਲ-ਸੰਭਾਲ, ਟੈਕ ਨੂੰ ਤਰਜੀਹ)' },
        fundsOrWage: { en: 'BC market wage + LICO compliance', pa: 'BC ਮਾਰਕੀਟ ਤਨਖਾਹ + LICO' },
        keyCriteria: { en: 'Full-time indeterminate TEER 0–3 offer in BC (Bachelor’s graduates need indeterminate offer; PhDs can apply directly); SIRS / 200.', pa: 'BC ਵਿੱਚ ਪੱਕਾ TEER 0–3 ਆਫਰ; SIRS / 200 ਅੰਕ।' }
      },
      {
        name: { en: 'Entry Level and Semi-Skilled (ELSS)', pa: 'Entry Level and Semi-Skilled (ELSS)' },
        status: 'Closed',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: 'N/A — Stream closed', pa: 'ਲਾਗੂ ਨਹੀਂ — ਸਟ੍ਰੀਮ ਬੰਦ' },
        language: { en: 'N/A', pa: 'ਲਾਗੂ ਨਹੀਂ' },
        education: { en: 'N/A', pa: 'ਲਾਗੂ ਨਹੀਂ' },
        occupations: { en: 'Previously covered TEER 4/5 Tourism, Hospitality, Food Processing & Long-Haul Trucking — NO LONGER ACCEPTED', pa: 'ਪਹਿਲਾਂ TEER 4/5 ਹੋਟਲ, ਫੂਡ ਪ੍ਰੋਸੈਸਿੰਗ ਅਤੇ ਟਰੱਕ ਡਰਾਈਵਰ ਸਨ — ਹੁਣ ਬੰਦ ਹੈ' },
        fundsOrWage: { en: 'N/A', pa: 'ਲਾਗੂ ਨਹੀਂ' },
        keyCriteria: { en: 'CLOSED in 2026: BC is no longer accepting ELSS hospitality/long-haul/entry applications.', pa: '2026 ਵਿੱਚ ਬੰਦ ਹੈ: BC ELSS ਵਿੱਚ ਅਰਜ਼ੀਆਂ ਨਹੀਂ ਲੈ ਰਿਹਾ।' }
      }
    ]
  },
  {
    code: 'AB',
    name: { en: 'Alberta (AAIP)', pa: 'ਅਲਬਰਟਾ (AAIP)' },
    alloc: '6,603 (495 left)',
    status: { en: 'Open — Near 2026 Cap', pa: 'ਖੁੱਲ੍ਹਾ — 495 ਥਾਵਾਂ ਬਾਕੀ' },
    statusTone: 'limited',
    jobOffer: { en: 'Required for Opportunity & Rural Renewal; NOT required for Alberta Express Entry', pa: 'Opportunity ਲਈ ਜ਼ਰੂਰੀ; Alberta Express Entry ਲਈ ਜ਼ਰੂਰੀ ਨਹੀਂ' },
    scoreSystem: 'AAIP EOI / 100 points',
    eeOption: true,
    streams: { en: 'Alberta Opportunity Stream, Alberta Express Entry (CRS 300+), Tourism & Hospitality, Rural Renewal', pa: 'Alberta Opportunity, Alberta Express Entry (CRS 300+), Tourism, Rural Renewal' },
    keyFact: { en: 'Alberta Express Entry considers CRS 300+; 6,108 of 6,603 nominations used (495 left).', pa: 'Alberta Express Entry ਵਿੱਚ CRS 300+ ਵਾਲੇ ਵਿਚਾਰੇ ਜਾਂਦੇ ਹਨ (6,108 ਵਰਤੇ, 495 ਬਾਕੀ)।' },
    url: 'https://www.alberta.ca/alberta-advantage-immigration-program',
    feeCad: '$840–$1,500 CAD (varies by stream)',
    processingNote: { en: 'EOI selection; 495 nominations remaining for 2026', pa: 'EOI ਚੋਣ; 2026 ਲਈ 495 ਥਾਵਾਂ ਬਾਕੀ' },
    occupationFocus: {
      en: 'Dedicated pathways for Healthcare (Physicians, RNs, LPNs, Allied Health), Accelerated Tech (38 IT/Engineering NOCs), Construction Trades, Agriculture, Law Enforcement (Police/Corrections), and Tourism & Hospitality (select TEER 4/5). Excludes ineligible occupations list on alberta.ca.',
      pa: 'ਮੁੱਖ ਤਰਜੀਹੀ ਖੇਤਰ: ਸਿਹਤ, 38 Accelerated Tech NOC, ਉਸਾਰੀ ਟ੍ਰੇਡਜ਼, ਖੇਤੀਬਾੜੀ, ਪੁਲਿਸ/ਲਾਅ ਇਨਫੋਰਸਮੈਂਟ ਅਤੇ ਟੂਰਿਜ਼ਮ/ਹੋਟਲ।'
    },
    languageSummary: {
      en: 'TEER 0–3 (AOS / Rural): CLB 5 minimum; TEER 4/5 (AOS / Tourism / Rural): CLB 4 minimum; Alberta Express Entry: CLB 7+ (per EE program, CLB 5–7 for Trades).',
      pa: 'TEER 0–3: CLB 5; TEER 4/5: CLB 4; Alberta Express Entry: CLB 7+ (ਜਾਂ EE ਪ੍ਰੋਗਰਾਮ ਅਨੁਸਾਰ)।'
    },
    workExpSummary: {
      en: 'AOS: 12 mo in Alberta in last 18 mo (or 24 mo Canada/abroad in 30 mo); Tourism: 6+ mo in Alberta; Alberta Express Entry: meets FSWP/CEC/FSTP work criteria.',
      pa: 'AOS: ਪਿਛਲੇ 18 ਮਹੀਨਿਆਂ ਵਿੱਚ 12 ਮਹੀਨੇ ਅਲਬਰਟਾ ਵਿੱਚ ਕੰਮ; Tourism: 6+ ਮਹੀਨੇ ਅਲਬਰਟਾ; EE: 1+ ਸਾਲ FSWP/CEC।'
    },
    streamsDetail: [
      {
        name: { en: 'Alberta Express Entry Stream (+600 CRS)', pa: 'Alberta Express Entry ਸਟ੍ਰੀਮ (+600 CRS)' },
        status: 'Limited',
        jobOfferRequired: false,
        expressEntry: true,
        workExp: { en: 'Meets Express Entry FSWP/CEC/FSTP criteria (1+ yr TEER 0–3)', pa: 'Express Entry ਯੋਗਤਾ ਪੂਰੀ (1+ ਸਾਲ TEER 0–3)' },
        language: { en: 'CLB 7+ English/French (or CLB 5 for FSTP/CEC TEER 2–3)', pa: 'CLB 7+ (ਜਾਂ EE ਨਿਯਮ ਅਨੁਸਾਰ CLB 5–7)' },
        education: { en: 'Per Express Entry (+ ECA if foreign)', pa: 'Express Entry ਅਨੁਸਾਰ (+ ECA)' },
        occupations: { en: 'Dedicated Healthcare, Accelerated Tech (38 NOCs), Construction Trades, Agriculture, Law Enforcement & Priority Sectors with AB family tie or AB job', pa: 'ਸਿਹਤ, 38 Accelerated Tech NOC, ਉਸਾਰੀ, ਖੇਤੀਬਾੜੀ, ਪੁਲਿਸ/ਲਾਅ ਅਤੇ ਅਲਬਰਟਾ ਪਰਿਵਾਰਕ ਸੰਬੰਧ ਵਾਲੇ' },
        fundsOrWage: { en: 'CRS 300+ in Express Entry pool + federal settlement funds (if FSWP)', pa: 'ਪੂਲ ਵਿੱਚ ਘੱਟੋ-ਘੱਟ CRS 300+ (FSWP ਲਈ ਫੰਡ)' },
        keyCriteria: { en: 'Requires CRS 300+ in federal pool + AAIP EOI ranking; draws prioritize Alberta job offers, Alberta family (parent/child/sibling), or healthcare/tech/construction.', pa: 'ਘੱਟੋ-ਘੱਟ CRS 300+ ਜ਼ਰੂਰੀ; ਸਿਹਤ, ਟੈਕ, ਉਸਾਰੀ, ਖੇਤੀਬਾੜੀ ਜਾਂ ਅਲਬਰਟਾ ਪਰਿਵਾਰਕ ਸੰਬੰਧ ਨੂੰ ਤਰਜੀਹ।' }
      },
      {
        name: { en: 'Alberta Opportunity Stream (AOS)', pa: 'Alberta Opportunity Stream (AOS)' },
        status: 'Limited',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '12 mo full-time in Alberta in past 18 mo (or 24 mo Canada/abroad in 30 mo; 6 mo for eligible AB grads)', pa: 'ਪਿਛਲੇ 18 ਮਹੀਨਿਆਂ ਵਿੱਚ 12 ਮਹੀਨੇ ਅਲਬਰਟਾ ਵਿੱਚ ਕੰਮ (ਜਾਂ 30 ਮਹੀਨਿਆਂ ਵਿੱਚ 24 ਮਹੀਨੇ)' },
        language: { en: 'CLB 5 in all 4 skills (TEER 0–3) or CLB 4 (TEER 4/5)', pa: 'CLB 5 (TEER 0–3) ਜਾਂ CLB 4 (TEER 4/5)' },
        education: { en: 'Minimum High School diploma (+ ECA if completed outside Canada)', pa: 'ਘੱਟੋ-ਘੱਟ ਹਾਈ ਸਕੂਲ (12ਵੀਂ) + ECA' },
        occupations: { en: 'Most TEER 0–5 occupations in Alberta except AAIP Ineligible Occupations List (e.g., certain retail/entry roles unless exempt)', pa: 'ਅਲਬਰਟਾ ਦੇ ਜ਼ਿਆਦਾਤਰ TEER 0–5 ਕਿੱਤੇ (AAIP Ineligible ਸੂਚੀ ਨੂੰ ਛੱਡ ਕੇ)' },
        fundsOrWage: { en: 'Valid open/employer-specific work permit (not implied/visitor) + 12-mo FT Alberta offer at market wage', pa: 'ਵੈਧ ਵਰਕ ਪਰਮਿਟ + 12 ਮਹੀਨੇ ਦਾ ਪੱਕਾ ਅਲਬਰਟਾ ਜੌਬ ਆਫਰ' },
        keyCriteria: { en: 'Must already be living and working full-time in Alberta in the same occupation as your offer; ranked via AAIP EOI / 100.', pa: 'ਪਹਿਲਾਂ ਤੋਂ ਅਲਬਰਟਾ ਵਿੱਚ ਵੈਧ ਵਰਕ ਪਰਮਿਟ ’ਤੇ ਕੰਮ + 12-ਮਹੀਨੇ ਦਾ ਜੌਬ ਆਫਰ ਜ਼ਰੂਰੀ; EOI / 100।' }
      },
      {
        name: { en: 'Tourism and Hospitality Stream', pa: 'Tourism and Hospitality ਸਟ੍ਰੀਮ' },
        status: 'Limited',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '6+ months (780+ hrs) full-time working in Alberta in the eligible tourism/hospitality occupation', pa: 'ਅਲਬਰਟਾ ਵਿੱਚ 6+ ਮਹੀਨੇ (780 ਘੰਟੇ) ਫੁੱਲ-ਟਾਈਮ ਕੰਮ' },
        language: { en: 'CLB 4+ in all 4 skills', pa: 'ਚਾਰੋਂ ਹੁਨਰਾਂ ਵਿੱਚ CLB 4+' },
        education: { en: 'High school diploma (+ ECA)', pa: 'ਹਾਈ ਸਕੂਲ (12ਵੀਂ) + ECA' },
        occupations: { en: 'Restricted list: Food Service Supervisors (62020), Chefs/Cooks (62200/63200), Hotel Front Desk (64314), Food/Beverage Servers (65200), Kitchen Helpers (65201), Light Duty Cleaners (65310), Tour Guides (64320)', pa: 'ਖਾਸ ਸੂਚੀ: ਫੂਡ ਸੁਪਰਵਾਈਜ਼ਰ (62020), ਕੁੱਕ (63200), ਹੋਟਲ ਫਰੰਟ ਡੈਸਕ, ਸਰਵਰ (65200), ਕਿਚਨ ਹੈਲਪਰ (65201), ਕਲੀਨਰ (65310)' },
        fundsOrWage: { en: 'Alberta Workers’ Compensation Board (WCB) insured employer; FT permanent 30+ hrs/wk offer', pa: 'WCB-ਰਜਿਸਟਰਡ ਹੋਟਲ/ਰੈਸਟੋਰੈਂਟ ਰੁਜ਼ਗਾਰਦਾਤਾ + ਪੱਕਾ ਆਫਰ' },
        keyCriteria: { en: 'Employer must belong to an approved tourism/hospitality association; dedicated periodic intake windows.', pa: 'ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਹੋਟਲ/ਰੈਸਟੋਰੈਂਟ/ਟੂਰਿਜ਼ਮ ਰੁਜ਼ਗਾਰਦਾਤਾ ਤੋਂ ਪੱਕਾ ਆਫਰ।' }
      },
      {
        name: { en: 'Rural Renewal Stream', pa: 'Rural Renewal ਸਟ੍ਰੀਮ' },
        status: 'Limited',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '12 months full-time in last 18 months anywhere (exempt for eligible Alberta rural college grads)', pa: 'ਪਿਛਲੇ 18 ਮਹੀਨਿਆਂ ਵਿੱਚ 12 ਮਹੀਨੇ ਕੰਮ (ਪੇਂਡੂ AB ਗ੍ਰੈਜੂਏਟਾਂ ਨੂੰ ਛੋਟ)' },
        language: { en: 'CLB 5 (TEER 0–3) or CLB 4 (TEER 4/5)', pa: 'CLB 5 (TEER 0–3) ਜਾਂ CLB 4 (TEER 4/5)' },
        education: { en: 'High school diploma (+ ECA)', pa: 'ਹਾਈ ਸਕੂਲ (12ਵੀਂ) + ECA' },
        occupations: { en: 'Eligible TEER 0–5 roles needed by designated rural Alberta communities (outside Calgary & Edmonton metro)', pa: 'ਪੇਂਡੂ ਅਲਬਰਟਾ ਕਸਬਿਆਂ (ਕੈਲਗਰੀ/ਐਡਮਿੰਟਨ ਤੋਂ ਬਾਹਰ) ਵਿੱਚ ਮੰਗ ਵਾਲੇ TEER 0–5 ਕਿੱਤੇ' },
        fundsOrWage: { en: 'Settlement funds scaled to community population + 12-mo full-time job offer', pa: 'ਕਮਿਊਨਿਟੀ ਆਕਾਰ ਅਨੁਸਾਰ ਸੈਟਲਮੈਂਟ ਫੰਡ + 12-ਮਹੀਨੇ ਆਫਰ' },
        keyCriteria: { en: 'Requires an Endorsement of Candidate letter from a designated rural Alberta municipality + qualifying local job offer.', pa: 'ਪੇਂਡੂ ਅਲਬਰਟਾ ਕਸਬੇ ਤੋਂ Endorsement ਚਿੱਠੀ + 12-ਮਹੀਨੇ ਦਾ ਜੌਬ ਆਫਰ।' }
      }
    ]
  },
  {
    code: 'SK',
    name: { en: 'Saskatchewan (SINP)', pa: 'ਸਸਕੈਚਵਨ (SINP)' },
    alloc: '5,261 (~0 left)',
    status: { en: 'Quota Effectively Exhausted', pa: '2026 ਕੋਟਾ ਲਗਭਗ ਖਤਮ' },
    statusTone: 'closed',
    jobOffer: { en: 'NOT required for Occupation In-Demand & SINP Express Entry', pa: 'Occupation In-Demand ਅਤੇ EE ਲਈ ਜੌਬ ਆਫਰ ਜ਼ਰੂਰੀ ਨਹੀਂ' },
    scoreSystem: '60 / 110 selection grid',
    eeOption: true,
    streams: { en: 'ISW Occupation In-Demand, ISW Express Entry, ISW Employment Offer, Saskatchewan Experience, Hard-to-Fill Pilot', pa: 'Occupation In-Demand, Express Entry, Employment Offer, SK Experience, Hard-to-Fill' },
    keyFact: { en: 'Clearest no-job-offer PNP route (60/110 grid), though ~76% issued & effectively 0 spots left for 2026.', pa: 'ਬਿਨਾਂ ਜੌਬ ਆਫਰ ਵਾਲਾ ਸਭ ਤੋਂ ਸਾਫ਼ PNP ਰਸਤਾ (60/110 ਅੰਕ), ਪਰ 2026 ਕੋਟਾ ਲਗਭਗ ਖਤਮ ਹੈ।' },
    url: 'https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/by-immigrating/saskatchewan-immigrant-nominee-program',
    feeCad: '$350 CAD (ISW)',
    processingNote: { en: '~76% issued & 2026 quota effectively full; watch 2027 reset', pa: '~76% ਜਾਰੀ, 2026 ਕੋਟਾ ਭਰਿਆ; 2027 ਦੀ ਉਡੀਕ ਕਰੋ' },
    occupationFocus: {
      en: 'ISW In-Demand/EE accepts TEER 0–3 NOCs NOT on Saskatchewan’s Excluded Occupation List (must match your post-secondary field). Hard-to-Fill Pilot & Hospitality/Trucking cover select TEER 4/5 roles with a SK offer.',
      pa: 'In-Demand/EE: SK Excluded ਸੂਚੀ ਤੋਂ ਬਾਹਰ ਕੋਈ ਵੀ TEER 0–3 ਕਿੱਤਾ (ਪੜ੍ਹਾਈ ਨਾਲ ਮੇਲ ਖਾਂਦਾ)। Hard-to-Fill/Trucking: ਖਾਸ TEER 4/5 ਕਿੱਤੇ।'
    },
    languageSummary: {
      en: 'Occupation In-Demand / Employment Offer / Hard-to-Fill: minimum CLB 4 (CLB 8+ gives max 20 language pts on 110 grid); SINP Express Entry: minimum CLB 7+.',
      pa: 'In-Demand/Offer/Hard-to-Fill: ਘੱਟੋ-ਘੱਟ CLB 4 (CLB 8+ ਦੇ ਪੂਰੇ 20 ਅੰਕ); SINP Express Entry: CLB 7+।'
    },
    workExpSummary: {
      en: 'ISW streams: 1+ yr skilled TEER 0–3 in last 10 yrs (must match degree/diploma for In-Demand/EE); SK Experience: 6+ months working inside Saskatchewan on valid permit.',
      pa: 'ISW: 10 ਸਾਲਾਂ ਵਿੱਚ 1+ ਸਾਲ TEER 0–3 ਕੰਮ (ਪੜ੍ਹਾਈ ਨਾਲ ਮੇਲ ਖਾਂਦਾ); SK Experience: SK ਵਿੱਚ 6+ ਮਹੀਨੇ ਕੰਮ।'
    },
    streamsDetail: [
      {
        name: { en: 'ISW: Occupation In-Demand (No Job Offer)', pa: 'ISW: Occupation In-Demand (ਬਿਨਾਂ ਜੌਬ ਆਫਰ)' },
        status: 'Limited',
        jobOfferRequired: false,
        expressEntry: false,
        workExp: { en: '1+ yr full-time skilled work in last 10 yrs directly matching your degree/diploma', pa: 'ਪਿਛਲੇ 10 ਸਾਲਾਂ ਵਿੱਚ 1+ ਸਾਲ ਹੁਨਰਮੰਦ ਕੰਮ (ਪੜ੍ਹਾਈ ਨਾਲ ਮੇਲ ਖਾਂਦਾ)' },
        language: { en: 'CLB 4+ minimum (CLB 8+ gives max 20/110 grid points)', pa: 'CLB 4+ ਘੱਟੋ-ਘੱਟ (ਵੱਧ ਅੰਕਾਂ ਲਈ CLB 8+)' },
        education: { en: '1+ yr post-secondary degree, diploma, or trade certificate + ECA', pa: '1+ ਸਾਲ ਡਿਪਲੋਮਾ/ਡਿਗਰੀ + ECA' },
        occupations: { en: 'TEER 0, 1, 2, or 3 NOCs NOT on the SINP Excluded Occupation List (Note: SINP enforces sector caps on hospitality/retail/admin)', pa: 'SINP Excluded ਸੂਚੀ ਤੋਂ ਬਾਹਰਲੇ TEER 0–3 ਕਿੱਤੇ' },
        fundsOrWage: { en: 'IRCC settlement funds ($14,690+ single held 3+ months) + 60/110 minimum grid', pa: 'ਸੈਟਲਮੈਂਟ ਫੰਡ ($14,690+ 3+ ਮਹੀਨੇ ਪੁਰਾਣੇ) + 60/110 ਅੰਕ' },
        keyCriteria: { en: 'NO job offer required; score 60+ / 110 and wait for EOI draw (recent cutoffs ~68–84). Note: ~76% of 5,261 quota issued — effectively 0 spots left for 2026.', pa: 'ਕੋਈ ਜੌਬ ਆਫਰ ਜ਼ਰੂਰੀ ਨਹੀਂ; 60+/110 ਅੰਕ (2026 ਦਾ 5,261 ਕੋਟਾ ਲਗਭਗ ਖਤਮ ਹੈ)।' }
      },
      {
        name: { en: 'ISW: Saskatchewan Express Entry (+600 CRS, No Job Offer)', pa: 'ISW: Saskatchewan Express Entry (+600, ਬਿਨਾਂ ਆਫਰ)' },
        status: 'Limited',
        jobOfferRequired: false,
        expressEntry: true,
        workExp: { en: '1+ yr skilled work in last 10 yrs matching education', pa: '1+ ਸਾਲ TEER 0–3 ਕੰਮ (ਪੜ੍ਹਾਈ ਨਾਲ ਮੇਲ ਖਾਂਦਾ)' },
        language: { en: 'CLB 7+ in all 4 abilities (Express Entry minimum)', pa: 'ਚਾਰੋਂ ਹੁਨਰਾਂ ਵਿੱਚ CLB 7+ (Express Entry ਸ਼ਰਤ)' },
        education: { en: '1+ yr post-secondary + ECA', pa: '1+ ਸਾਲ ਡਿਪਲੋਮਾ/ਡਿਗਰੀ + ECA' },
        occupations: { en: 'Eligible TEER 0–3 NOCs not on SINP Excluded List', pa: 'Excluded ਸੂਚੀ ਤੋਂ ਬਾਹਰਲੇ TEER 0–3 ਕਿੱਤੇ' },
        fundsOrWage: { en: 'IRCC settlement funds held 3+ months + active Express Entry profile', pa: '3+ ਮਹੀਨੇ ਪੁਰਾਣੇ ਫੰਡ + EE ਪ੍ਰੋਫਾਈਲ' },
        keyCriteria: { en: 'Active Express Entry profile + 60/110 SINP grid; adds +600 CRS upon nomination with NO job offer needed.', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਪ੍ਰੋਫਾਈਲ + 60/110 ਅੰਕ + ਫੰਡ; ਜੌਬ ਆਫਰ ਦੀ ਲੋੜ ਨਹੀਂ।' }
      },
      {
        name: { en: 'ISW: Employment Offer', pa: 'ISW: Employment Offer' },
        status: 'Limited',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '1+ yr in last 10 yrs in intended TEER 0–3 occupation', pa: 'ਪਿਛਲੇ 10 ਸਾਲਾਂ ਵਿੱਚ 1+ ਸਾਲ ਸੰਬੰਧਿਤ ਕੰਮ' },
        language: { en: 'CLB 4+ in all 4 abilities', pa: 'ਚਾਰੋਂ ਹੁਨਰਾਂ ਵਿੱਚ CLB 4+' },
        education: { en: 'Per occupation / Saskatchewan licensing', pa: 'ਕਿੱਤੇ / ਲਾਇਸੰਸ ਅਨੁਸਾਰ' },
        occupations: { en: 'Any TEER 0–3 occupation OR designated trades with SINP Job Approval Letter', pa: 'Job Approval Letter ਵਾਲੇ TEER 0–3 ਜਾਂ ਟ੍ਰੇਡ ਕਿੱਤੇ' },
        fundsOrWage: { en: 'Permanent full-time SK job offer; Job Approval Letter (JAL) required', pa: 'ਪੱਕਾ ਫੁੱਲ-ਟਾਈਮ SK ਆਫਰ + Job Approval Letter' },
        keyCriteria: { en: 'Employer obtains SINP Job Approval Letter (JAL) + applicant scores 60/110 on SINP selection grid.', pa: 'SK ਰੁਜ਼ਗਾਰਦਾਤਾ ਤੋਂ Job Approval Letter + 60/110 ਅੰਕ।' }
      },
      {
        name: { en: 'Saskatchewan Experience & Hard-to-Fill Skills Pilot', pa: 'Saskatchewan Experience ਅਤੇ Hard-to-Fill ਪਾਇਲਟ' },
        status: 'Limited',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '6+ mo (780 hrs) working inside SK (Experience / Hospitality / Trucking / Health) or 1 yr abroad / 6 mo SK (Hard-to-Fill)', pa: 'SK ਵਿੱਚ 6+ ਮਹੀਨੇ (780 ਘੰਟੇ) ਕੰਮ' },
        language: { en: 'CLB 4+ (TEER 4/5 / Hard-to-Fill / Trucking / Hospitality) or CLB 5+ (TEER 0–3)', pa: 'CLB 4+ (TEER 4/5 / ਟਰੱਕ / ਹੋਟਲ) ਜਾਂ CLB 5+' },
        education: { en: 'High school+ (Hard-to-Fill); SK grad (Students)', pa: 'ਹਾਈ ਸਕੂਲ+ / SK ਗ੍ਰੈਜੂਏਟ' },
        occupations: { en: 'Sub-categories: Existing Work Permit, Healthcare, Hospitality (servers/cooks/housekeeping), Long-Haul Truck Drivers (73300), Students, Agriculture, and TEER 4/5 Hard-to-Fill list', pa: 'ਵਰਕ ਪਰਮਿਟ, ਸਿਹਤ, ਹੋਟਲ (ਕੁੱਕ/ਸਰਵਰ/ਹਾਊਸਕੀਪਿੰਗ), ਟਰੱਕ ਡਰਾਈਵਰ (73300), ਖੇਤੀਬਾੜੀ ਅਤੇ TEER 4/5' },
        fundsOrWage: { en: 'Permanent full-time SK employer offer + JAL', pa: 'SK ਵਿੱਚ ਪੱਕਾ ਆਫਰ + JAL' },
        keyCriteria: { en: 'Covers inland SK workers, long-haul truckers, hospitality, healthcare, and eligible TEER 4/5 workers.', pa: 'SK ਵਿੱਚ ਕੰਮ ਕਰ ਰਹੇ ਕਾਮਿਆਂ, ਟਰੱਕ ਡਰਾਈਵਰਾਂ, ਸਿਹਤ ਤੇ TEER 4/5 ਲਈ।' }
      }
    ]
  },
  {
    code: 'MB',
    name: { en: 'Manitoba (MPNP)', pa: 'ਮੈਨੀਟੋਬਾ (MPNP)' },
    alloc: '6,239',
    status: { en: 'Open — Regular Draws', pa: 'ਖੁੱਲ੍ਹਾ — ਨਿਯਮਿਤ ਡਰਾਅ' },
    statusTone: 'open',
    jobOffer: { en: 'Required in MB (6 mo work) OR overseas with strong Manitoba friend/family/education tie', pa: 'MB ਵਿੱਚ ਕੰਮ/ਆਫਰ ਜਾਂ ਬਾਹਰੋਂ MB ਰਿਸ਼ਤੇਦਾਰ/ਦੋਸਤ ਦਾ ਸੰਬੰਧ ਜ਼ਰੂਰੀ' },
    scoreSystem: 'MPNP EOI / 1,000 points',
    eeOption: true,
    streams: { en: 'Skilled Worker in Manitoba, Skilled Worker Overseas (EE & Regular), International Education Stream', pa: 'Skilled Worker in Manitoba, Overseas, International Education' },
    keyFact: { en: 'Recent draws: #284 (19 Nov 2026: 1,116 LAAs) & #283 (5 Nov 2026: 526 LAAs in Agriculture/Mfg NOC 8–9). Strong MB friend/family ties heavily rewarded.', pa: 'ਤਾਜ਼ਾ ਡਰਾਅ: #284 (19 ਨਵੰ. 2026: 1,116 LAAs) ਅਤੇ #283 (5 ਨਵੰ.: 526 LAAs)। ਮੈਨੀਟੋਬਾ ਵਿੱਚ ਰਿਸ਼ਤੇਦਾਰ/ਦੋਸਤ ਹੋਣ ’ਤੇ ਵੱਡੇ ਅੰਕ ਮਿਲਦੇ ਹਨ।' },
    url: 'https://immigratemanitoba.com/',
    feeCad: '$500 CAD',
    processingNote: { en: 'Active Nov 2026 draws (#283 & #284); 1,000-pt EOI grid', pa: 'ਨਵੰ. 2026 ਵਿੱਚ ਲਗਾਤਾਰ ਡਰਾਅ (#283 ਅਤੇ #284); 1,000-ਅੰਕ EOI' },
    occupationFocus: {
      en: 'Uses the Manitoba In-Demand Occupations list (TEER 0–5 eligible in-province; overseas & graduates focus on high-demand Healthcare, Trades, Transport, Manufacturing, Tech, ECE, and Agri-food).',
      pa: 'ਮੈਨੀਟੋਬਾ ਮੰਗ ਵਾਲੇ ਕਿੱਤਿਆਂ ਦੀ ਸੂਚੀ (ਸੂਬੇ ਅੰਦਰ TEER 0–5; ਬਾਹਰੋਂ/ਗ੍ਰੈਜੂਏਟਾਂ ਲਈ ਸਿਹਤ, ਟ੍ਰੇਡਜ਼, ਟ੍ਰਾਂਸਪੋਰਟ, ਫੈਕਟਰੀ, ਟੈਕ, ECE)।'
    },
    languageSummary: {
      en: 'TEER 0/1 regulated: CLB 7; TEER 2/3: CLB 5; TEER 4/5 (SWM): CLB 4; International Education Stream: CLB 7+; SWO Express Entry: CLB 7+.',
      pa: 'TEER 0/1: CLB 7; TEER 2/3: CLB 5; TEER 4/5 (SWM): CLB 4; IES ਅਤੇ SWO Express Entry: CLB 7+।'
    },
    workExpSummary: {
      en: 'SWM: 6+ months continuous full-time work with MB employer (12 mo if worked/studied in another Canadian province); SWO: 2+ yrs in last 5 yrs; IES Career Employment: 0 mo wait with In-Demand offer.',
      pa: 'SWM: MB ਵਿੱਚ 6+ ਮਹੀਨੇ ਕੰਮ (ਹੋਰ ਸੂਬੇ ਤੋਂ ਆਇਆਂ ਲਈ 12 ਮਹੀਨੇ); SWO: 5 ਸਾਲਾਂ ਵਿੱਚ 2+ ਸਾਲ; IES: 0 ਮਹੀਨੇ ਉਡੀਕ।'
    },
    streamsDetail: [
      {
        name: { en: 'Skilled Worker in Manitoba (SWM)', pa: 'Skilled Worker in Manitoba (SWM)' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '6+ months continuous full-time work with MB employer (12 mo if graduated/worked in another province; note point deductions for non-MB Canadian history)', pa: 'MB ਰੁਜ਼ਗਾਰਦਾਤਾ ਨਾਲ 6+ ਮਹੀਨੇ ਲਗਾਤਾਰ ਕੰਮ (ਹੋਰ ਸੂਬੇ ਤੋਂ ਆਏ ਲਈ 12 ਮਹੀਨੇ)' },
        language: { en: 'CLB 4 (TEER 4/5), CLB 5 (TEER 2/3), CLB 7 (TEER 0/1 / regulated)', pa: 'CLB 4 (TEER 4/5), CLB 5 (TEER 2/3), CLB 7 (TEER 0/1)' },
        education: { en: 'Per occupation requirements', pa: 'ਕਿੱਤੇ ਅਨੁਸਾਰ' },
        occupations: { en: 'All TEER 0–5 occupations in Manitoba (Priority EOI draws often target specific TEERs, Healthcare, Trades, Manufacturing & Trucking)', pa: 'ਮੈਨੀਟੋਬਾ ਵਿੱਚ ਸਾਰੇ TEER 0–5 ਕਿੱਤੇ (ਸਿਹਤ, ਟ੍ਰੇਡਜ਼, ਫੈਕਟਰੀ, ਟਰੱਕਿੰਗ ਨੂੰ ਖਾਸ ਡਰਾਅ)' },
        fundsOrWage: { en: 'Long-term full-time MB offer meeting regional median/industry wage', pa: 'ਲੰਬੇ ਸਮੇਂ ਦਾ MB ਜੌਬ ਆਫਰ + ਮਾਰਕੀਟ ਤਨਖਾਹ' },
        keyCriteria: { en: 'Active MB work permit + employer 3+ yrs established in MB + EOI / 1,000 selection.', pa: 'MB ਵਿੱਚ ਵੈਧ ਵਰਕ ਪਰਮਿਟ + ਪੱਕਾ ਆਫਰ + EOI / 1,000।' }
      },
      {
        name: { en: 'Skilled Worker Overseas (SWO — Express Entry & Regular)', pa: 'Skilled Worker Overseas (ਬਾਹਰੋਂ ਅਪਲਾਈ)' },
        status: 'Open',
        jobOfferRequired: false,
        expressEntry: true,
        workExp: { en: '2+ years full-time skilled work in last 5 years', pa: 'ਪਿਛਲੇ 5 ਸਾਲਾਂ ਵਿੱਚ 2+ ਸਾਲ ਕੰਮ' },
        language: { en: 'CLB 5+ minimum (Regular) OR CLB 7+ (Express Entry pathway)', pa: 'CLB 5+ (Regular) ਜਾਂ CLB 7+ (Express Entry)' },
        education: { en: 'Post-secondary degree/diploma/trade training (+ ECA for EE)', pa: 'ਪੋਸਟ-ਸੈਕੰਡਰੀ ਪੜ੍ਹਾਈ (+ EE ਲਈ ECA)' },
        occupations: { en: 'Manitoba In-Demand Occupations list (TEER 0–3; Strategic Recruitment targets Healthcare, Skilled Trades, Tech, Agriculture)', pa: 'ਮੈਨੀਟੋਬਾ ਮੰਗ ਸੂਚੀ (TEER 0–3: ਸਿਹਤ, ਟ੍ਰੇਡਜ਼, ਟੈਕ, ਖੇਤੀਬਾੜੀ)' },
        fundsOrWage: { en: '$10,000+ CAD (+ $2,000 per dependent) liquid settlement funds', pa: '$10,000+ CAD (+ $2,000 ਪ੍ਰਤੀ ਮੈਂਬਰ) ਫੰਡ' },
        keyCriteria: { en: 'Must score 60/100 initial points AND prove Manitoba Connection (+200 close relative / +50 distant family or friend / past MB study/work / Strategic ITA); EOI / 1,000.', pa: '60/100 ਅੰਕ + ਮੈਨੀਟੋਬਾ ਵਿੱਚ ਰਿਸ਼ਤੇਦਾਰ (+200 ਅੰਕ) ਜਾਂ ਦੋਸਤ (+50) ਦਾ ਸਪੋਰਟ / Strategic ਸੱਦਾ ਜ਼ਰੂਰੀ।' }
      },
      {
        name: { en: 'International Education Stream (IES — Career Employment / Internship / Entr.)', pa: 'International Education Stream (MB ਗ੍ਰੈਜੂਏਟ)' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '0 months work wait if holding an eligible Career Employment offer (or Mitacs research internship for Master’s/PhD)', pa: 'ਮੰਗ ਵਾਲੇ ਕਿੱਤੇ ਵਿੱਚ ਆਫਰ ਹੋਣ ’ਤੇ 0 ਮਹੀਨੇ ਉਡੀਕ (Mitacs ਇੰਟਰਨਸ਼ਿਪ ਲਈ ਆਫਰ ਨਹੀਂ)' },
        language: { en: 'Minimum CLB 7 in all 4 skills', pa: 'ਚਾਰੋਂ ਹੁਨਰਾਂ ਵਿੱਚ ਘੱਟੋ-ਘੱਟ CLB 7' },
        education: { en: 'Graduated within past 3 yrs from designated MB post-secondary (1+ yr FT program)', pa: 'MB ਕਾਲਜ/ਯੂਨੀਵਰਸਿਟੀ ਤੋਂ 1+ ਸਾਲ ਦੀ ਪੜ੍ਹਾਈ (ਪਿਛਲੇ 3 ਸਾਲਾਂ ਵਿੱਚ)' },
        occupations: { en: 'TEER 0–3 roles on the Manitoba In-Demand Occupations list related to your MB field of study', pa: 'MB ਮੰਗ ਸੂਚੀ ਵਿੱਚ ਪੜ੍ਹਾਈ ਨਾਲ ਸੰਬੰਧਿਤ TEER 0–3 ਕਿੱਤੇ' },
        fundsOrWage: { en: '1-yr+ FT MB job offer + LICO settlement funds for 6 months', pa: '1-ਸਾਲ+ ਦਾ MB ਜੌਬ ਆਫਰ + 6 ਮਹੀਨੇ ਦੇ ਫੰਡ' },
        keyCriteria: { en: 'Fast-track route for Manitoba graduates bypassing the 6-month work wait under SWM.', pa: 'MB ਗ੍ਰੈਜੂਏਟਾਂ ਲਈ 6 ਮਹੀਨੇ ਦੇ ਕੰਮ ਦੀ ਉਡੀਕ ਤੋਂ ਬਿਨਾਂ ਸਿੱਧਾ PR ਮਾਰਗ।' }
      }
    ]
  },
  {
    code: 'NS',
    name: { en: 'Nova Scotia (NSNP)', pa: 'ਨੋਵਾ ਸਕੋਸ਼ੀਆ (NSNP)' },
    alloc: '~4,100 (est.)',
    status: { en: 'Open — Targeted Priorities', pa: 'ਖੁੱਲ੍ਹਾ — ਖਾਸ ਕਿੱਤਿਆਂ ਲਈ' },
    statusTone: 'open',
    jobOffer: { en: 'Required for Skilled Worker; NS Experience EE requires 1 year NS skilled work', pa: 'Skilled Worker ਲਈ ਜ਼ਰੂਰੀ; NS Experience EE ਲਈ 1 ਸਾਲ NS ਕੰਮ' },
    scoreSystem: 'Eligibility + Labour Market Priorities',
    eeOption: true,
    streams: { en: 'Consolidated into 4 Core Streams (Feb 2026): Skilled Worker, NS Graduate, Entrepreneur, NS: Express Entry', pa: '4 ਮੁੱਖ ਸਟ੍ਰੀਮਾਂ (ਫਰਵਰੀ 2026 ਤੋਂ): Skilled Worker, NS Graduate, Entrepreneur, NS: Express Entry' },
    keyFact: { en: 'NSNP consolidated 10 streams into 4 (18 Feb 2026), added provincial fees (1 Sep 2026), and enforces 12-month EOI validity; NS Express Entry needs 1 yr NS work.', pa: '18 ਫਰਵਰੀ 2026 ਤੋਂ 10 ਤੋਂ 4 ਸਟ੍ਰੀਮਾਂ ਬਣੀਆਂ, 1 ਸਤੰਬਰ ਤੋਂ ਫੀਸਾਂ ਲਾਗੂ ਤੇ EOI 12 ਮਹੀਨੇ ਵੈਧ; EE ਲਈ 1 ਸਾਲ NS ਕੰਮ ਜ਼ਰੂਰੀ।' },
    url: 'https://novascotiaimmigration.com/move-here/',
    feeCad: 'Provincial fees introduced Sep 1, 2026 (verify stream fee)',
    processingNote: { en: '12-month EOI validity; temporary work permit retention priority', pa: 'EOI 12 ਮਹੀਨੇ ਵੈਧ; ਵਰਕ ਪਰਮਿਟ ਵਾਲਿਆਂ ਨੂੰ ਤਰਜੀਹ' },
    occupationFocus: {
      en: 'Targeted focus on Healthcare, 21 Critical Construction Worker NOCs, Transport Truck Drivers (73300), Nurse Aides/PSWs (33102), Heavy Equipment Operators (73400), Early Childhood Educators (42202), and French speakers. Note: Food/Accommodations intake tightened in 2026.',
      pa: 'ਮੁੱਖ ਕਿੱਤੇ: ਸਿਹਤ, 21 Critical Construction ਟ੍ਰੇਡ, ਟਰੱਕ ਡਰਾਈਵਰ (73300), PSW (33102), ਮਸ਼ੀਨ ਆਪਰੇਟਰ, ECE ਅਤੇ ਫ੍ਰੈਂਚ ਬੋਲਣ ਵਾਲੇ।'
    },
    languageSummary: {
      en: 'NS Experience EE: CLB 7 (TEER 0/1) or CLB 5 (TEER 2/3); Skilled Worker / Critical Construction: CLB 5 (TEER 0–3) or CLB 4 (TEER 4/5); Occupations in Demand: CLB 4+.',
      pa: 'NS Experience EE: CLB 7 (TEER 0/1) ਜਾਂ CLB 5 (TEER 2/3); Skilled Worker: CLB 5 (0–3) / CLB 4 (4/5); OinD: CLB 4+।'
    },
    workExpSummary: {
      en: 'NS Experience EE: 1+ yr (1,560 hrs) work INSIDE Nova Scotia; Skilled Worker / OinD: 1 yr related work (TEER 4/5 needs 6 mo with same NS employer).',
      pa: 'NS Experience EE: NS ਦੇ ਅੰਦਰ 1+ ਸਾਲ ਕੰਮ; Skilled Worker: 1 ਸਾਲ ਕੰਮ (TEER 4/5 ਲਈ NS ਵਿੱਚ 6 ਮਹੀਨੇ)।'
    },
    streamsDetail: [
      {
        name: { en: 'Nova Scotia Experience: Express Entry (+600 CRS)', pa: 'Nova Scotia Experience: Express Entry (+600)' },
        status: 'Open',
        jobOfferRequired: false,
        expressEntry: true,
        workExp: { en: '1+ year (1,560 hrs) full-time TEER 0–3 work performed INSIDE Nova Scotia in last 3 yrs', pa: 'ਪਿਛਲੇ 3 ਸਾਲਾਂ ਵਿੱਚ ਨੋਵਾ ਸਕੋਸ਼ੀਆ ਦੇ ਅੰਦਰ 1+ ਸਾਲ TEER 0–3 ਕੰਮ' },
        language: { en: 'CLB 7 (TEER 0/1) or CLB 5 (TEER 2/3)', pa: 'CLB 7 (TEER 0/1) ਜਾਂ CLB 5 (TEER 2/3)' },
        education: { en: 'Canadian high school or foreign degree/diploma with ECA', pa: 'ਹਾਈ ਸਕੂਲ ਜਾਂ ਵਿਦੇਸ਼ੀ ਡਿਗਰੀ ਲਈ ECA' },
        occupations: { en: 'Eligible TEER 0, 1, 2, or 3 roles performed inside Nova Scotia (work done during full-time study does not count)', pa: 'NS ਦੇ ਅੰਦਰ ਕੀਤੇ TEER 0–3 ਕਿੱਤੇ (ਪੜ੍ਹਾਈ ਦੌਰਾਨ ਕੀਤਾ ਕੰਮ ਨਹੀਂ ਗਿਣਿਆ ਜਾਂਦਾ)' },
        fundsOrWage: { en: 'Age 21–55 + valid work authorization during NS experience', pa: 'ਉਮਰ 21–55 + ਵੈਧ ਵਰਕ ਪਰਮਿਟ' },
        keyCriteria: { en: 'Work MUST have been physically performed in Nova Scotia; connects directly to your Express Entry profile for +600 CRS.', pa: 'ਕੰਮ NS ਦੇ ਅੰਦਰ ਹੋਇਆ ਹੋਣਾ ਲਾਜ਼ਮੀ ਹੈ; +600 CRS ਅੰਕ ਮਿਲਦੇ ਹਨ।' }
      },
      {
        name: { en: 'Labour Market Priorities (Express Entry +600 CRS)', pa: 'Labour Market Priorities (Express Entry)' },
        status: 'Limited',
        jobOfferRequired: false,
        expressEntry: true,
        workExp: { en: 'Per targeted draw (typically 1–2+ yrs in selected NOC)', pa: 'ਡਰਾਅ ਅਨੁਸਾਰ (ਆਮ ਤੌਰ ’ਤੇ 1–2+ ਸਾਲ)' },
        language: { en: 'CLB 7+ English or NCLC 7+ French (for Francophone draws)', pa: 'CLB 7+ ਅੰਗਰੇਜ਼ੀ ਜਾਂ NCLC 7+ ਫ੍ਰੈਂਚ' },
        education: { en: 'Per draw criteria (+ ECA)', pa: 'ਡਰਾਅ ਅਨੁਸਾਰ (+ ECA)' },
        occupations: { en: 'Periodic Express Entry pool picks targeting Registered Nurses, Physicians, Carpenters/Construction, Early Childhood Educators, or French Speakers', pa: 'ਨਰਸਾਂ, ਡਾਕਟਰ, ਉਸਾਰੀ ਕਾਰੀਗਰ, ECE ਜਾਂ ਫ੍ਰੈਂਚ ਬੋਲਣ ਵਾਲਿਆਂ ਲਈ ਸਿੱਧੇ LOI' },
        fundsOrWage: { en: 'Must meet Express Entry settlement funds & hold active EE profile', pa: 'Express Entry ਫੰਡ + ਸਰਗਰਮ EE ਪ੍ਰੋਫਾਈਲ' },
        keyCriteria: { en: 'Invite-only—NSNP sends Letters of Interest directly inside the federal Express Entry pool.', pa: 'ਸਿੱਧਾ ਅਪਲਾਈ ਨਹੀਂ ਹੁੰਦਾ — NSNP ਖੁਦ Express Entry ਪੂਲ ਵਿੱਚੋਂ LOI ਭੇਜਦਾ ਹੈ।' }
      },
      {
        name: { en: 'NS Skilled Worker & Critical Construction Worker Pilot', pa: 'NS Skilled Worker ਅਤੇ Critical Construction ਪਾਇਲਟ' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '1 yr related experience (TEER 4/5 requires 6 mo with same NS employer)', pa: '1 ਸਾਲ ਸੰਬੰਧਿਤ ਕੰਮ (TEER 4/5 ਲਈ NS ਵਿੱਚ 6 ਮਹੀਨੇ)' },
        language: { en: 'CLB 5 (TEER 0–3) or CLB 4 (TEER 4/5)', pa: 'CLB 5 (TEER 0–3) ਜਾਂ CLB 4 (TEER 4/5)' },
        education: { en: 'High school diploma (+ trade certificate/licensing for construction trades)', pa: 'ਹਾਈ ਸਕੂਲ (+ ਟ੍ਰੇਡ ਸਰਟੀਫਿਕੇਟ)' },
        occupations: { en: 'TEER 0–5 offers (Critical Construction covers 21 NOCs: Carpenters 72310, Electricians 72200, Plumbers 72300, Welders 72106, Construction Trades Helpers 75110, Roofers 73110, Concrete Finishers 73100)', pa: 'TEER 0–5 ਆਫਰ; Critical Construction ਵਿੱਚ 21 ਉਸਾਰੀ NOC (ਤਰਖਾਣ, ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ, ਪਲੰਬਰ, ਵੈਲਡਰ, ਹੈਲਪਰ 75110)' },
        fundsOrWage: { en: 'Age 21–55 + permanent FT NS offer + employer active 2+ yrs in NS', pa: 'ਉਮਰ 21–55 + NS ਵਿੱਚ ਪੱਕਾ ਆਫਰ' },
        keyCriteria: { en: 'Fast employer-driven provincial pathway with $0 NSNP application fee.', pa: '$0 ਸਰਕਾਰੀ ਫੀਸ ਨਾਲ NS ਰੁਜ਼ਗਾਰਦਾਤਾ ਰਾਹੀਂ ਪੱਕਾ ਰਸਤਾ।' }
      },
      {
        name: { en: 'Occupations in Demand & Physician Streams', pa: 'Occupations in Demand ਅਤੇ Physician ਸਟ੍ਰੀਮ' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: true,
        workExp: { en: '1 yr related experience (OinD); Nova Scotia medical license (Physician)', pa: '1 ਸਾਲ ਕੰਮ (OinD) / ਡਾਕਟਰੀ ਲਾਇਸੰਸ' },
        language: { en: 'CLB 4+ (Occupations in Demand)', pa: 'CLB 4+ (OinD)' },
        education: { en: 'High school+ / Medical degree (MD)', pa: 'ਹਾਈ ਸਕੂਲ+ / MD' },
        occupations: { en: 'Strict OinD list: Nurse Aides/PSW (33102), Transport Truck Drivers (73300), Heavy Equipment Operators (73400), Construction Trades Helpers (75110), Food/Counter (65201 if eligible); Physicians (31100/31102)', pa: 'ਖਾਸ OinD ਸੂਚੀ: PSW (33102), ਟਰੱਕ ਡਰਾਈਵਰ (73300), ਮਸ਼ੀਨ ਆਪਰੇਟਰ (73400), ਉਸਾਰੀ ਹੈਲਪਰ (75110) ਅਤੇ ਡਾਕਟਰ' },
        fundsOrWage: { en: 'Permanent FT NS offer meeting provincial wage rate; age 21–55', pa: 'ਮਾਰਕੀਟ ਤਨਖਾਹ + ਉਮਰ 21–55' },
        keyCriteria: { en: 'Targeted route for intermediate TEER 3–5 roles in high demand across Nova Scotia.', pa: 'ਨੋਵਾ ਸਕੋਸ਼ੀਆ ਵਿੱਚ ਮੰਗ ਵਾਲੇ TEER 3–5 ਕਿੱਤਿਆਂ ਲਈ ਖਾਸ ਰਸਤਾ।' }
      }
    ]
  },
  {
    code: 'NB',
    name: { en: 'New Brunswick (NBPNP)', pa: 'ਨਿਊ ਬਰੰਜ਼ਵਿਕ (NBPNP)' },
    alloc: '~2,750',
    status: { en: 'Open', pa: 'ਖੁੱਲ੍ਹਾ' },
    statusTone: 'open',
    jobOffer: { en: 'Required for Skilled Worker; EE prioritizes NB workers, grads & French speakers', pa: 'Skilled Worker ਲਈ ਜ਼ਰੂਰੀ; EE ਵਿੱਚ NB ਕਾਮਿਆਂ ਅਤੇ ਫ੍ਰੈਂਚ ਨੂੰ ਤਰਜੀਹ' },
    scoreSystem: '67 / 100 selection grid + Priorities',
    eeOption: true,
    streams: { en: 'NB Express Entry, NB Skilled Worker, NB Critical Worker Pilot, Private Career College Grad', pa: 'NB Express Entry, Skilled Worker, Critical Worker Pilot, Private College Grad' },
    keyFact: { en: 'Mid-Nov 2026 draw issued 390 NBPNP ITAs + 73 AIP. Hospitality (NAICS 72) restricted in general draws; new AIP employer designations paused for rest of 2026.', pa: 'ਮੱਧ-ਨਵੰ. 2026 ਡਰਾਅ ਵਿੱਚ 390 NBPNP + 73 AIP ਸੱਦੇ। NAICS 72 ਹੋਟਲ ਸੈਕਟਰ ਸੀਮਤ; ਨਵੇਂ AIP ਰੁਜ਼ਗਾਰਦਾਤਾ ਰੁਕੇ ਹਨ।' },
    url: 'https://www.welcomenb.ca/',
    feeCad: '$250 CAD',
    processingNote: { en: 'Active Nov 2026 draws (390 ITAs); French, health & trades priority', pa: 'ਨਵੰ. 2026 ਵਿੱਚ 390 ITAs; ਫ੍ਰੈਂਚ, ਸਿਹਤ ਅਤੇ ਟ੍ਰੇਡਜ਼ ਤਰਜੀਹ' },
    occupationFocus: {
      en: 'Targets Healthcare, Construction & Trades, Education/ECE, Agriculture, IT/Tech, Seafood/Food Processing, and French-speaking workers. In 2026, hospitality/retail food-service intakes remain tight outside Critical Worker.',
      pa: 'ਮੁੱਖ ਕਿੱਤੇ: ਸਿਹਤ, ਉਸਾਰੀ/ਟ੍ਰੇਡਜ਼, ਸਿੱਖਿਆ/ECE, ਖੇਤੀਬਾੜੀ, IT, ਫੂਡ ਪ੍ਰੋਸੈਸਿੰਗ ਅਤੇ ਫ੍ਰੈਂਚ ਬੋਲਣ ਵਾਲੇ ਕਾਮੇ।'
    },
    languageSummary: {
      en: 'NB Skilled Worker & Critical Worker: CLB 4+ in all 4 skills; NB Express Entry: CLB 7+ English or NCLC 7+ French; Private Career College Pilot: CLB 5+.',
      pa: 'Skilled/Critical Worker: CLB 4+; NB Express Entry: CLB 7+ ਅੰਗਰੇਜ਼ੀ ਜਾਂ NCLC 7+ ਫ੍ਰੈਂਚ; Private College: CLB 5+।'
    },
    workExpSummary: {
      en: 'Skilled Worker: 1 yr in last 5 yrs (exempt for eligible NB grads); Express Entry: 1+ yr FSWP/CEC; NB Employment connection typically requires 12 mo NB work or NB offer.',
      pa: 'Skilled Worker: 5 ਸਾਲਾਂ ਵਿੱਚ 1 ਸਾਲ ਕੰਮ (NB ਗ੍ਰੈਜੂਏਟਾਂ ਨੂੰ ਛੋਟ); EE: 1+ ਸਾਲ FSWP/CEC।'
    },
    streamsDetail: [
      {
        name: { en: 'NB Express Entry Stream (+600 CRS)', pa: 'NB Express Entry ਸਟ੍ਰੀਮ (+600)' },
        status: 'Open',
        jobOfferRequired: false,
        expressEntry: true,
        workExp: { en: '1+ yr skilled work (FSWP or CEC; 1 yr NB work for NB Employment connection)', pa: '1+ ਸਾਲ ਹੁਨਰਮੰਦ ਕੰਮ (FSWP/CEC)' },
        language: { en: 'CLB 7+ English or NCLC 7+ French in all 4 skills', pa: 'CLB 7+ ਅੰਗਰੇਜ਼ੀ ਜਾਂ NCLC 7+ ਫ੍ਰੈਂਚ' },
        education: { en: 'High school+ (+ ECA for foreign credentials)', pa: 'ਹਾਈ ਸਕੂਲ+ (+ ECA)' },
        occupations: { en: 'TEER 0–3 occupations (priority pathways for NB Workers, NB Student Connection, Healthcare, Trades, Tech, and Francophones)', pa: 'TEER 0–3 ਕਿੱਤੇ (NB ਕਾਮੇ, ਗ੍ਰੈਜੂਏਟ, ਸਿਹਤ, ਟ੍ਰੇਡਜ਼, ਟੈਕ ਅਤੇ ਫ੍ਰੈਂਚ ਨੂੰ ਤਰਜੀਹ)' },
        fundsOrWage: { en: '67/100 NB selection grid + Express Entry settlement funds', pa: '67/100 NB ਅੰਕ + EE ਫੰਡ' },
        keyCriteria: { en: 'Active EE profile + 67/100 NB grid; intakes prioritize NB Employment connection, NB grads, and French speakers.', pa: '67/100 NB ਅੰਕ + EE ਪ੍ਰੋਫਾਈਲ; NB ਕਾਮਿਆਂ, ਗ੍ਰੈਜੂਏਟਾਂ ਅਤੇ ਫ੍ਰੈਂਚ ਬੋਲਣ ਵਾਲਿਆਂ ਨੂੰ ਤਰਜੀਹ।' }
      },
      {
        name: { en: 'NB Skilled Worker Stream', pa: 'NB Skilled Worker ਸਟ੍ਰੀਮ' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '1 yr related experience in last 5 yrs (exempt for eligible NB public college grads)', pa: 'ਪਿਛਲੇ 5 ਸਾਲਾਂ ਵਿੱਚ 1 ਸਾਲ ਕੰਮ (NB ਗ੍ਰੈਜੂਏਟਾਂ ਨੂੰ ਛੋਟ)' },
        language: { en: 'CLB 4+ in all 4 skills', pa: 'ਚਾਰੋਂ ਹੁਨਰਾਂ ਵਿੱਚ CLB 4+' },
        education: { en: 'High school diploma minimum (+ ECA if foreign)', pa: 'ਘੱਟੋ-ਘੱਟ ਹਾਈ ਸਕੂਲ (+ ECA)' },
        occupations: { en: 'Eligible TEER 0–5 full-time non-seasonal occupations (excluding restricted NOCs per intake)', pa: 'ਯੋਗ TEER 0–5 ਪੱਕੇ ਕਿੱਤੇ' },
        fundsOrWage: { en: 'Age 19–55 + 67/100 NB selection grid + competitive NB median wage', pa: 'ਉਮਰ 19–55 + 67/100 ਅੰਕ + NB ਤਨਖਾਹ' },
        keyCriteria: { en: 'Permanent full-time NB job offer from established NB employer (operating 2+ yrs).', pa: 'NB ਵਿੱਚ 2+ ਸਾਲ ਪੁਰਾਣੇ ਰੁਜ਼ਗਾਰਦਾਤਾ ਦਾ ਪੱਕਾ ਜੌਬ ਆਫਰ।' }
      },
      {
        name: { en: 'NB Critical Worker Pilot & Private Career College Pilot', pa: 'NB Critical Worker ਅਤੇ Private College ਪਾਇਲਟ' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: 'Employer-matched (Critical) or eligible 1–2 yr NB private college grad', pa: 'ਰੁਜ਼ਗਾਰਦਾਤਾ ਅਨੁਸਾਰ / NB ਕਾਲਜ ਗ੍ਰੈਜੂਏਟ' },
        language: { en: 'CLB 4+ (Critical Worker) or CLB 5+ (Private Career College)', pa: 'CLB 4+ (Critical Worker) / CLB 5+ (College)' },
        education: { en: 'High school or eligible 1–2 yr NB private career college in 19 priority programs', pa: 'ਹਾਈ ਸਕੂਲ ਜਾਂ 19 ਤਰਜੀਹੀ NB ਪ੍ਰਾਈਵੇਟ ਕਾਲਜ ਪ੍ਰੋਗਰਾਮ' },
        occupations: { en: 'Critical Worker: Aquaculture, Forestry, Food/Seafood Processing, Manufacturing, Transport; Private College: Healthcare, IT, Trades, Childcare, Supply Chain', pa: 'Critical Worker: ਫੂਡ ਪ੍ਰੋਸੈਸਿੰਗ, ਜੰਗਲਾਤ, ਫੈਕਟਰੀ, ਟ੍ਰਾਂਸਪੋਰਟ; College: ਸਿਹਤ, IT, ਟ੍ਰੇਡਜ਼, ECE' },
        fundsOrWage: { en: 'Includes up to 200 hrs employer-provided settlement & language training (Critical Worker)', pa: 'ਰੁਜ਼ਗਾਰਦਾਤਾ ਵੱਲੋਂ ਰਿਹਾਇਸ਼ ਤੇ ਭਾਸ਼ਾ ਸਿਖਲਾਈ ਸਹਾਇਤਾ' },
        keyCriteria: { en: 'Job offer from 1 of 6 participating major NB employers (Cooke, Groupe Savoie, Groupe Westco, Imperial Mfg, J.D. Irving, McCain Foods) or targeted college grad offer.', pa: '6 ਵੱਡੇ ਮਨਜ਼ੂਰਸ਼ੁਦਾ NB ਰੁਜ਼ਗਾਰਦਾਤਿਆਂ ਤੋਂ ਆਫਰ ਜਾਂ ਸਿਹਤ/IT/ਟ੍ਰੇਡਜ਼ ਗ੍ਰੈਜੂਏਟ।' }
      }
    ]
  },
  {
    code: 'NL',
    name: { en: 'Newfoundland & Labrador (NLPNP)', pa: 'ਨਿਊਫਾਊਂਡਲੈਂਡ ਅਤੇ ਲੈਬਰਾਡੋਰ' },
    alloc: '~1,500',
    status: { en: 'Open', pa: 'ਖੁੱਲ੍ਹਾ' },
    statusTone: 'open',
    jobOffer: { en: 'Required for Skilled Worker & EE (except Priority Skills NL invitations)', pa: 'Skilled Worker ਅਤੇ EE ਲਈ ਜ਼ਰੂਰੀ (Priority Skills ਤੋਂ ਬਿਨਾਂ)' },
    scoreSystem: '67 / 100 grid + Priority EOI',
    eeOption: true,
    streams: { en: 'Express Entry Skilled Worker, Skilled Worker, International Graduate, Priority Skills NL', pa: 'EE Skilled Worker, Skilled Worker, International Graduate, Priority Skills' },
    keyFact: { en: 'Immigration Accelerator EOI draws issued 98 ITAs (19 Nov) & 54 ITAs (16 Nov). Temporary BOWP without AOR active through 31 Dec 2026.', pa: '19 ਨਵੰ. ਨੂੰ 98 ਅਤੇ 16 ਨਵੰ. ਨੂੰ 54 EOI ਸੱਦੇ ਜਾਰੀ। 31 ਦਸੰ. 2026 ਤੱਕ ਬਿਨਾਂ AOR ਦੇ BOWP ਸਹੂਲਤ ਚਾਲੂ।' },
    url: 'https://www.gov.nl.ca/immigration/',
    feeCad: '$250 CAD (Skilled Worker) · $0 (EE / Grad)',
    processingNote: { en: 'Frequent Nov 2026 EOI draws; Priority Skills target ~25 business days', pa: 'ਨਵੰ. 2026 ਵਿੱਚ ਲਗਾਤਾਰ EOI ਡਰਾਅ; Priority Skills ~25 ਦਿਨ' },
    occupationFocus: {
      en: 'Priority Skills NL targets Healthcare (Doctors, Nurses, Pharmacists, Psychologists), Tech/ICT (Software, AI, Cyber, Cloud), Ocean/Marine Tech, and Agriculture/Aquaculture. Skilled Worker accepts TEER 0–5 with Job Vacancy Assessment (JVA).',
      pa: 'Priority Skills: ਸਿਹਤ, IT/ਸਾਫਟਵੇਅਰ/AI, ਸਮੁੰਦਰੀ ਤਕਨਾਲੋਜੀ ਅਤੇ ਖੇਤੀਬਾੜੀ। Skilled Worker: JVA ਸਮੇਤ TEER 0–5।'
    },
    languageSummary: {
      en: 'Skilled Worker: CLB 5 (TEER 0–3) / CLB 4 (TEER 4/5); Express Entry Skilled Worker: CLB 7+; Priority Skills NL: minimum CLB 5+ (test taken within 12 months).',
      pa: 'Skilled Worker: CLB 4–5; EE Skilled Worker: CLB 7+; Priority Skills NL: CLB 5+ (12 ਮਹੀਨਿਆਂ ਦੇ ਅੰਦਰ)।'
    },
    workExpSummary: {
      en: 'EE Skilled Worker: 1+ yr FSWP/CEC; Skilled Worker: NL offer + valid work permit (or job experience); Priority Skills: 1+ yr priority work in past 10 yrs OR MUN Master’s/PhD in past 3 yrs.',
      pa: 'EE: 1+ ਸਾਲ; Skilled Worker: NL ਆਫਰ + ਵਰਕ ਪਰਮਿਟ; Priority Skills: 1+ ਸਾਲ ਮੰਗ ਵਾਲਾ ਕੰਮ ਜਾਂ MUN Master’s/PhD।'
    },
    streamsDetail: [
      {
        name: { en: 'NLPNP Express Entry Skilled Worker (+600 CRS)', pa: 'NLPNP Express Entry Skilled Worker (+600)' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: true,
        workExp: { en: '1+ yr skilled work (FSWP or CEC)', pa: '1+ ਸਾਲ ਹੁਨਰਮੰਦ ਕੰਮ (FSWP/CEC)' },
        language: { en: 'CLB 7+ (or Express Entry minimum)', pa: 'CLB 7+' },
        education: { en: 'Post-secondary degree/diploma (+ ECA if foreign)', pa: 'ਡਿਗਰੀ/ਡਿਪਲੋਮਾ (+ ECA)' },
        occupations: { en: 'TEER 0, 1, 2, or 3 roles in Newfoundland & Labrador', pa: 'NL ਵਿੱਚ TEER 0–3 ਕਿੱਤੇ' },
        fundsOrWage: { en: '67/100 NLPNP grid + settlement funds + 2-yr+ FT NL job offer', pa: '67/100 ਅੰਕ + 2-ਸਾਲ+ NL ਆਫਰ' },
        keyCriteria: { en: 'Active Express Entry profile + full-time high-skilled NL job offer for 2+ yrs + employer Job Vacancy Assessment (JVA).', pa: 'EE ਪ੍ਰੋਫਾਈਲ + NL ਵਿੱਚ 2+ ਸਾਲ ਦਾ TEER 0–3 ਆਫਰ + JVA।' }
      },
      {
        name: { en: 'Skilled Worker & International Graduate Categories', pa: 'Skilled Worker ਅਤੇ International Graduate' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: 'Valid work permit (4+ mo remaining) & NL offer (Skilled Worker); 0–1 yr (MUN/CNA Graduate)', pa: 'NL ਜੌਬ ਆਫਰ + ਵਰਕ ਪਰਮਿਟ; MUN/CNA ਗ੍ਰੈਜੂਏਟ' },
        language: { en: 'CLB 5 (TEER 0–3) or CLB 4 (TEER 4/5)', pa: 'CLB 5 (TEER 0–3) / CLB 4 (TEER 4/5)' },
        education: { en: 'High school+ (Skilled Worker); MUN / CNA / eligible Canadian grad (Graduate)', pa: 'ਹਾਈ ਸਕੂਲ+ / MUN-CNA ਗ੍ਰੈਜੂਏਟ' },
        occupations: { en: 'TEER 0–5 roles (Graduate stream requires TEER 0–3 or in-demand role related to field of study)', pa: 'TEER 0–5 ਕਿੱਤੇ (ਗ੍ਰੈਜੂਏਟ ਲਈ TEER 0–3)' },
        fundsOrWage: { en: 'Age 21–59 + 2-yr+ FT NL offer with JVA + $0 fee for Graduates', pa: 'ਉਮਰ 21–59 + 2+ ਸਾਲ ਆਫਰ + ਗ੍ਰੈਜੂਏਟਾਂ ਲਈ $0 ਫੀਸ' },
        keyCriteria: { en: 'Employer Job Vacancy Assessment (JVA) proves local recruitment efforts unless exempt.', pa: 'NL ਰੁਜ਼ਗਾਰਦਾਤਾ ਤੋਂ 2+ ਸਾਲ ਦਾ ਜੌਬ ਆਫਰ + JVA; ਉਮਰ 21–59।' }
      },
      {
        name: { en: 'Priority Skills NL (No Job Offer Required)', pa: 'Priority Skills NL (ਬਿਨਾਂ ਜੌਬ ਆਫਰ)' },
        status: 'Open',
        jobOfferRequired: false,
        expressEntry: true,
        workExp: { en: '1+ yr in high-demand NL priority occupation in past 10 yrs (or MUN Master’s/PhD)', pa: 'ਪਿਛਲੇ 10 ਸਾਲਾਂ ਵਿੱਚ 1+ ਸਾਲ ਮੰਗ ਵਾਲੇ ਕਿੱਤੇ ਵਿੱਚ (ਜਾਂ MUN Master’s/PhD)' },
        language: { en: 'CLB 5+ minimum (valid IELTS/CELPIP/PTE within last 12 months)', pa: 'CLB 5+ (12 ਮਹੀਨਿਆਂ ਦੇ ਅੰਦਰ)' },
        education: { en: 'Master’s/PhD from Memorial University (MUN) in last 3 yrs OR Bachelor’s+ with priority work', pa: 'MUN ਤੋਂ Master’s/PhD ਜਾਂ ਬੈਚਲਰ + ਮੰਗ ਵਾਲਾ ਕੰਮ' },
        occupations: { en: 'Specific In-Demand List: Tech/Software Developers, AI/Data/Cybersecurity, Physicians, Registered Nurses, Nurse Practitioners, Pharmacists, Ocean/Marine Engineers, Agriculture Specialists', pa: 'ਖਾਸ ਸੂਚੀ: ਸਾਫਟਵੇਅਰ/IT/AI/ਸਾਈਬਰ, ਡਾਕਟਰ, ਨਰਸਾਂ, ਫਾਰਮਾਸਿਸਟ, ਸਮੁੰਦਰੀ ਇੰਜੀਨੀਅਰ, ਖੇਤੀ ਮਾਹਿਰ' },
        fundsOrWage: { en: 'Age 21+ + genuine intent to settle in NL', pa: 'ਉਮਰ 21+ + NL ਵਿੱਚ ਵੱਸਣ ਦਾ ਇਰਾਦਾ' },
        keyCriteria: { en: 'EOI pool; invited candidates can receive provincial nomination without needing a prior NL job offer.', pa: 'EOI ਪੂਲ; ਚੁਣੇ ਜਾਣ ’ਤੇ ਬਿਨਾਂ ਜੌਬ ਆਫਰ ਦੇ ਨਾਮਜ਼ਦਗੀ ਮਿਲ ਸਕਦੀ ਹੈ।' }
      }
    ]
  },
  {
    code: 'PE',
    name: { en: 'Prince Edward Island (PEI PNP)', pa: 'ਪ੍ਰਿੰਸ ਐਡਵਰਡ ਆਈਲੈਂਡ (PEI)' },
    alloc: '~1,050',
    status: { en: 'Open — Sector Focused', pa: 'ਖੁੱਲ੍ਹਾ — ਖਾਸ ਸੈਕਟਰ' },
    statusTone: 'limited',
    jobOffer: { en: 'Required for Labour Impact; EE draws prioritize PEI workers in healthcare/trades', pa: 'Labour Impact ਲਈ ਜ਼ਰੂਰੀ; EE ਵਿੱਚ ਸਿਹਤ/ਟ੍ਰੇਡਜ਼ ਨੂੰ ਤਰਜੀਹ' },
    scoreSystem: 'PEI EOI / 100 points',
    eeOption: true,
    streams: { en: 'PEI Express Entry, Labour Impact: Skilled Worker, Critical Worker, International Graduate', pa: 'PEI Express Entry, Skilled Worker, Critical Worker, International Graduate' },
    keyFact: { en: '9 Nov 2026 draw issued 192 ITAs (health, trades, childcare, mfg, local grads). Post-ITA submission window shortened from 60 to 30 calendar days.', pa: '9 ਨਵੰ. 2026 ਨੂੰ 192 ਸੱਦੇ (ਸਿਹਤ, ਟ੍ਰੇਡਜ਼, ECE, ਫੈਕਟਰੀ)। ITA ਤੋਂ ਬਾਅਦ ਅਰਜ਼ੀ ਸਮਾਂ ਘਟਾ ਕੇ 30 ਦਿਨ ਕੀਤਾ ਗਿਆ ਹੈ।' },
    url: 'https://www.princeedwardisland.ca/en/topic/office-immigration',
    feeCad: '$300 CAD',
    processingNote: { en: '9 Nov 2026 draw (192 ITAs); 30-day ITA filing rule; refreshed EOI portal', pa: '9 ਨਵੰ. 2026 ਡਰਾਅ (192 ITAs); 30 ਦਿਨ ਅਰਜ਼ੀ ਨਿਯਮ' },
    occupationFocus: {
      en: '2026 PEI EOI draws heavily prioritize Healthcare (nurses, paramedics, PSWs), Construction & Skilled Trades, Manufacturing/Food Processing, and Early Childhood Education (ECE). Non-priority food/retail draws reduced.',
      pa: '2026 PEI ਡਰਾਅ ਖਾਸ ਕਰਕੇ ਸਿਹਤ, ਉਸਾਰੀ/ਟ੍ਰੇਡਜ਼, ਫੈਕਟਰੀ/ਫੂਡ ਪ੍ਰੋਸੈਸਿੰਗ ਅਤੇ ਬਾਲ ਸਿੱਖਿਆ (ECE) ਨੂੰ ਸੱਦਾ ਦਿੰਦੇ ਹਨ।'
    },
    languageSummary: {
      en: 'Labour Impact Skilled Worker & Critical Worker (TEER 4/5): minimum CLB 4; International Graduate: sufficient for job (CLB 4+); PEI Express Entry: CLB 7+.',
      pa: 'Skilled/Critical Worker (TEER 4/5): ਘੱਟੋ-ਘੱਟ CLB 4; Int’l Graduate: CLB 4+; PEI Express Entry: CLB 7+।'
    },
    workExpSummary: {
      en: 'Skilled Worker: 2+ yrs in past 5 yrs (note: workers living inside PEI can qualify faster if employer-supported); Critical Worker: 6+ mo IN PEI + 2 yrs in past 5 yrs; Graduate: 0 yrs.',
      pa: 'Skilled Worker: 5 ਸਾਲਾਂ ਵਿੱਚ 2+ ਸਾਲ; Critical Worker: PEI ਵਿੱਚ 6+ ਮਹੀਨੇ + 2 ਸਾਲ; Graduate: 0 ਸਾਲ।'
    },
    streamsDetail: [
      {
        name: { en: 'PEI Express Entry (+600 CRS)', pa: 'PEI Express Entry (+600)' },
        status: 'Limited',
        jobOfferRequired: false,
        expressEntry: true,
        workExp: { en: 'Meets Express Entry FSWP/CEC/FSTP; workers already inside PEI for 9+ months strongly favoured', pa: 'Express Entry ਯੋਗਤਾ; PEI ਵਿੱਚ ਕੰਮ ਕਰਨ ਵਾਲਿਆਂ ਨੂੰ ਤਰਜੀਹ' },
        language: { en: 'CLB 7+ (Express Entry threshold)', pa: 'CLB 7+' },
        education: { en: 'Per Express Entry (+ ECA)', pa: 'EE ਅਨੁਸਾਰ (+ ECA)' },
        occupations: { en: 'Priority given to Healthcare, Construction Trades, Manufacturing/Bioscience, and Early Childhood Education', pa: 'ਸਿਹਤ, ਉਸਾਰੀ, ਫੈਕਟਰੀ ਅਤੇ ECE ਕਿੱਤਿਆਂ ਨੂੰ ਤਰਜੀਹ' },
        fundsOrWage: { en: 'IRCC Express Entry funds + PEI EOI / 100 ranking', pa: 'EE ਫੰਡ + PEI EOI / 100 ਅੰਕ' },
        keyCriteria: { en: 'Active EE profile + PEI EOI / 100; draws predominantly invite candidates already living and working in PEI.', pa: 'EE ਪ੍ਰੋਫਾਈਲ + PEI EOI; PEI ਵਿੱਚ ਪਹਿਲਾਂ ਤੋਂ ਕੰਮ ਕਰਨ ਵਾਲਿਆਂ ਨੂੰ ਵੱਡੀ ਤਰਜੀਹ।' }
      },
      {
        name: { en: 'Labour Impact: Skilled Worker', pa: 'Labour Impact: Skilled Worker' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '2+ years full-time work experience in last 5 yrs', pa: 'ਪਿਛਲੇ 5 ਸਾਲਾਂ ਵਿੱਚ 2+ ਸਾਲ ਕੰਮ' },
        language: { en: 'CLB 4+ in all 4 skills', pa: 'ਚਾਰੋਂ ਹੁਨਰਾਂ ਵਿੱਚ CLB 4+' },
        education: { en: '2-year+ post-secondary degree or diploma', pa: '2+ ਸਾਲ ਦਾ ਡਿਪਲੋਮਾ/ਡਿਗਰੀ' },
        occupations: { en: 'TEER 0, 1, 2, or 3 roles in PEI (priority sectors favoured in monthly draws)', pa: 'PEI ਵਿੱਚ TEER 0–3 ਕਿੱਤੇ' },
        fundsOrWage: { en: 'Age 18–59 + 2+ yr permanent FT PEI offer + $10,000+ settlement funds', pa: 'ਉਮਰ 18–59 + 2+ ਸਾਲ ਪੱਕਾ ਆਫਰ + $10,000+ ਫੰਡ' },
        keyCriteria: { en: 'Permanent full-time PEI employer offer + EOI / 100 selection.', pa: 'PEI ਵਿੱਚ ਪੱਕਾ TEER 0–3 ਜੌਬ ਆਫਰ + ਉਮਰ 18–59 + EOI / 100।' }
      },
      {
        name: { en: 'Labour Impact: Critical Worker (TEER 4/5)', pa: 'Labour Impact: Critical Worker (TEER 4/5)' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '6+ months full-time working in PEI with same employer + 2 yrs FT work in last 5 yrs', pa: 'PEI ਵਿੱਚ 6+ ਮਹੀਨੇ ਕੰਮ + 5 ਸਾਲਾਂ ਵਿੱਚ 2 ਸਾਲ ਤਜਰਬਾ' },
        language: { en: 'CLB 4+ in all 4 skills', pa: 'ਚਾਰੋਂ ਹੁਨਰਾਂ ਵਿੱਚ CLB 4+' },
        education: { en: 'High school diploma', pa: 'ਹਾਈ ਸਕੂਲ (12ਵੀਂ)' },
        occupations: { en: 'Specific TEER 4/5 list: Truck Drivers (73300), Customer Service/Cashiers, Food & Beverage Servers, Housekeeping/Cleaners, General Labourers', pa: 'ਖਾਸ TEER 4/5 ਸੂਚੀ: ਟਰੱਕ ਡਰਾਈਵਰ (73300), ਹਾਊਸਕੀਪਿੰਗ, ਫੂਡ ਸਰਵਰ, ਫੈਕਟਰੀ ਮਜ਼ਦੂਰ' },
        fundsOrWage: { en: 'Age 18–59 + permanent (2+ yr) FT PEI offer + valid work permit', pa: 'ਉਮਰ 18–59 + 2+ ਸਾਲ ਆਫਰ + ਵੈਧ ਵਰਕ ਪਰਮਿਟ' },
        keyCriteria: { en: 'Requires already working 6+ months in PEI before nomination under TEER 4/5.', pa: 'TEER 4/5 ਲਈ PEI ਵਿੱਚ ਪਹਿਲਾਂ 6+ ਮਹੀਨੇ ਕੰਮ ਕਰਨਾ ਜ਼ਰੂਰੀ ਹੈ।' }
      },
      {
        name: { en: 'Labour Impact: International Graduate', pa: 'Labour Impact: International Graduate' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '0 yrs prior experience required (or working 6+ mo if outside field of study)', pa: 'ਪੜ੍ਹਾਈ ਦੇ ਖੇਤਰ ਵਿੱਚ ਆਫਰ ਹੋਣ ’ਤੇ 0 ਸਾਲ ਤਜਰਬਾ' },
        language: { en: 'CLB 4+ / employer language proficiency', pa: 'ਨੌਕਰੀ ਅਨੁਸਾਰ CLB 4+' },
        education: { en: 'Graduated from UPEI, Holland College, or Collège de l’Île (2+ yr program)', pa: 'UPEI, Holland College ਜਾਂ Collège de l’Île ਤੋਂ 2+ ਸਾਲ ਗ੍ਰੈਜੂਏਟ' },
        occupations: { en: 'TEER 0, 1, 2, or 3 job offer in PEI matching field of study', pa: 'ਪੜ੍ਹਾਈ ਨਾਲ ਮੇਲ ਖਾਂਦਾ TEER 0–3 ਕਿੱਤਾ' },
        fundsOrWage: { en: 'Age 18–59 + valid PGWP + permanent 2+ yr FT PEI offer', pa: 'ਉਮਰ 18–59 + PGWP + 2+ ਸਾਲ ਪੱਕਾ ਆਫਰ' },
        keyCriteria: { en: 'Dedicated graduate pathway for alumni of PEI’s three public institutions.', pa: 'PEI ਦੇ 3 ਪਬਲਿਕ ਕਾਲਜਾਂ/ਯੂਨੀਵਰਸਿਟੀਆਂ ਦੇ ਗ੍ਰੈਜੂਏਟਾਂ ਲਈ ਸਿੱਧਾ ਰਸਤਾ।' }
      }
    ]
  },
  {
    code: 'YT',
    name: { en: 'Yukon (YNP)', pa: 'ਯੂਕੋਨ (YNP)' },
    alloc: '282 (up from 215)',
    status: { en: 'Open — Scheduled Intakes', pa: 'ਖੁੱਲ੍ਹਾ — ਨਿਰਧਾਰਤ ਵਿੰਡੋ' },
    statusTone: 'open',
    jobOffer: { en: 'Full-time year-round Yukon job offer required', pa: 'ਯੂਕੋਨ ਵਿੱਚ ਪੂਰੇ ਸਾਲ ਦਾ ਫੁੱਲ-ਟਾਈਮ ਜੌਬ ਆਫਰ ਜ਼ਰੂਰੀ' },
    scoreSystem: 'Employer EOI Intake Windows (Jan/Jul)',
    eeOption: true,
    streams: { en: 'Yukon Express Entry, Skilled Worker, Critical Impact Worker (TEER 4/5), Yukon Community Pilot', pa: 'Yukon Express Entry, Skilled Worker, Critical Impact Worker, YCP' },
    keyFact: { en: '2026 federal cap is 282 nominations (prioritizing healthcare, rural Yukon, 1+ yr Yukon residents, YukonU grads & Francophones). Covers TEER 4/5.', pa: '2026 ਕੋਟਾ 282 (ਸਿਹਤ, ਪੇਂਡੂ ਯੂਕੋਨ, 1+ ਸਾਲ ਵਾਸੀਆਂ ਤੇ ਫ੍ਰੈਂਚ ਨੂੰ ਤਰਜੀਹ)। TEER 4/5 ਵੀ ਸ਼ਾਮਲ।' },
    url: 'https://yukon.ca/en/doing-business/yukon-nominee-program',
    feeCad: '$0 CAD (no YNP application fee)',
    processingNote: { en: 'Employer-led Jan/Jul EOI windows; $0 YNP fee', pa: 'ਰੁਜ਼ਗਾਰਦਾਤਾ ਵੱਲੋਂ ਜਨ./ਜੁਲਾਈ EOI ਵਿੰਡੋ; $0 ਫੀਸ' },
    occupationFocus: {
      en: 'Covers ALL TEER 0–5 occupations in Yukon (regulated/high-priority: Healthcare, Construction Trades, Mining/Engineering, Tourism/Hospitality, Retail, Childcare, Transport, and General Services).',
      pa: 'ਯੂਕੋਨ ਵਿੱਚ ਸਾਰੇ TEER 0–5 ਕਿੱਤੇ ਸ਼ਾਮਲ ਹਨ (ਸਿਹਤ, ਉਸਾਰੀ, ਮਾਈਨਿੰਗ, ਹੋਟਲ/ਟੂਰਿਜ਼ਮ, ਰਿਟੇਲ, ECE, ਟ੍ਰਾਂਸਪੋਰਟ)।'
    },
    languageSummary: {
      en: 'Yukon Express Entry: CLB 7+ (per EE); Skilled Worker: CLB 7 (TEER 0/1) or CLB 5 (TEER 2/3); Critical Impact Worker (TEER 4/5): minimum CLB 4+.',
      pa: 'Yukon EE: CLB 7+; Skilled Worker: CLB 7 (TEER 0/1) / CLB 5 (TEER 2/3); Critical Impact (TEER 4/5): CLB 4+।'
    },
    workExpSummary: {
      en: 'Skilled Worker: 1+ yr directly related work; Critical Impact Worker (TEER 4/5): 6+ months full-time related work; Express Entry: meets FSWP/CEC/FSTP criteria.',
      pa: 'Skilled Worker: 1+ ਸਾਲ; Critical Impact (TEER 4/5): 6+ ਮਹੀਨੇ; Express Entry: FSWP/CEC ਸ਼ਰਤਾਂ।'
    },
    streamsDetail: [
      {
        name: { en: 'Yukon Express Entry (+600 CRS)', pa: 'Yukon Express Entry (+600)' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: true,
        workExp: { en: 'Meets Express Entry FSWP/CEC/FSTP work criteria (1+ yr TEER 0–3)', pa: 'Express Entry ਤਜਰਬਾ ਸ਼ਰਤਾਂ ਪੂਰੀਆਂ (1+ ਸਾਲ)' },
        language: { en: 'CLB 7+ (Express Entry threshold)', pa: 'CLB 7+' },
        education: { en: 'Per Express Entry (+ ECA)', pa: 'EE ਅਨੁਸਾਰ (+ ECA)' },
        occupations: { en: 'Any TEER 0, 1, 2, or 3 occupation with year-round Yukon employer need', pa: 'ਯੂਕੋਨ ਵਿੱਚ ਕੋਈ ਵੀ TEER 0–3 ਕਿੱਤਾ' },
        fundsOrWage: { en: 'Median Yukon wage + settlement funds (unless CEC) + $0 YNP fee', pa: 'ਯੂਕੋਨ median wage + ਫੰਡ + $0 YNP ਫੀਸ' },
        keyCriteria: { en: 'Active Express Entry profile + permanent full-time year-round Yukon job offer after 4 weeks employer local advertising.', pa: 'EE ਪ੍ਰੋਫਾਈਲ + ਯੂਕੋਨ ਵਿੱਚ ਪੱਕਾ TEER 0–3 ਜੌਬ ਆਫਰ।' }
      },
      {
        name: { en: 'Yukon Skilled Worker (TEER 0–3)', pa: 'Yukon Skilled Worker (TEER 0–3)' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '1+ year full-time directly related work experience', pa: '1+ ਸਾਲ ਸੰਬੰਧਿਤ ਕੰਮ ਦਾ ਤਜਰਬਾ' },
        language: { en: 'CLB 7 (TEER 0/1) or CLB 5 (TEER 2/3)', pa: 'CLB 7 (TEER 0/1) ਜਾਂ CLB 5 (TEER 2/3)' },
        education: { en: 'High school diploma (+ occupation degree/trade cert if required)', pa: 'ਹਾਈ ਸਕੂਲ (+ ਕਿੱਤੇ ਅਨੁਸਾਰ ਡਿਗਰੀ/ਟ੍ਰੇਡ)' },
        occupations: { en: 'All TEER 0–3 skilled, supervisory, technical & trades roles across Yukon', pa: 'ਸਾਰੇ TEER 0–3 ਹੁਨਰਮੰਦ ਅਤੇ ਟ੍ਰੇਡਜ਼ ਕਿੱਤੇ' },
        fundsOrWage: { en: 'Permanent year-round FT Yukon offer (30–40 hrs/wk) at median wage; $0 fee', pa: 'ਪੂਰੇ ਸਾਲ ਦਾ ਫੁੱਲ-ਟਾਈਮ ਆਫਰ + $0 ਫੀਸ' },
        keyCriteria: { en: 'No points lottery—employer submits EOI during Yukon’s scheduled intake windows (priority for Yukon-resident workers).', pa: 'ਕੋਈ ਅੰਕ ਦੌੜ ਨਹੀਂ — ਰੁਜ਼ਗਾਰਦਾਤਾ ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰਦਾ ਹੈ ($0 ਫੀਸ)।' }
      },
      {
        name: { en: 'Critical Impact Worker (TEER 4 & 5)', pa: 'Critical Impact Worker (TEER 4 ਅਤੇ 5)' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '6+ months full-time related experience', pa: '6+ ਮਹੀਨੇ ਸੰਬੰਧਿਤ ਕੰਮ' },
        language: { en: 'CLB 4+ in all 4 abilities', pa: 'ਚਾਰੋਂ ਹੁਨਰਾਂ ਵਿੱਚ CLB 4+' },
        education: { en: 'High school diploma', pa: 'ਹਾਈ ਸਕੂਲ (12ਵੀਂ)' },
        occupations: { en: 'TEER 4 & 5 roles: Retail Sales, Food Counter Attendants, Housekeeping/Room Attendants, Kitchen Helpers, Caregivers, Cashiers, General Labourers', pa: 'TEER 4 & 5: ਰਿਟੇਲ, ਫੂਡ ਕਾਊਂਟਰ, ਹਾਊਸਕੀਪਿੰਗ, ਕੇਅਰ, ਕੈਸ਼ੀਅਰ, ਮਜ਼ਦੂਰ' },
        fundsOrWage: { en: 'Employer-covered airfare (if outside Yukon) + median wage + $0 fee', pa: 'ਯੂਕੋਨ median wage + $0 ਸਰਕਾਰੀ ਫੀਸ' },
        keyCriteria: { en: 'Dedicated PR path for entry-level & service workers in Whitehorse and rural Yukon communities.', pa: 'ਯੂਕੋਨ ਵਿੱਚ TEER 4/5 ਕਾਮਿਆਂ ਲਈ ਸਿੱਧਾ PR ਰਸਤਾ।' }
      },
      {
        name: { en: 'Yukon Community Pilot (YCP — Seasonal / Multi-Job)', pa: 'Yukon Community Pilot (YCP — ਕਮਿਊਨਿਟੀ ਪਾਇਲਟ)' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: 'Meets YNP stream work criteria; allows combining 2–3 part-time/seasonal offers', pa: 'YNP ਕੰਮ ਸ਼ਰਤਾਂ ਪੂਰੀਆਂ; 2–3 ਮੌਸਮੀ ਆਫਰ ਜੋੜੇ ਜਾ ਸਕਦੇ ਹਨ' },
        language: { en: 'CLB 4–7+ depending on NOC TEER', pa: 'NOC TEER ਅਨੁਸਾਰ CLB 4–7+' },
        education: { en: 'High school diploma+', pa: 'ਹਾਈ ਸਕੂਲ+' },
        occupations: { en: 'Any TEER 0–5 roles inside Whitehorse, Watson Lake, Dawson City, Haines Junction, Carmacks, or Carcross', pa: 'Whitehorse, Dawson City, Watson Lake ਆਦਿ 6 ਕਸਬਿਆਂ ਵਿੱਚ TEER 0–5 ਕਿੱਤੇ' },
        fundsOrWage: { en: 'Combined 30+ hrs/wk across up to 3 employers + signed YNP nomination letter', pa: '2–3 ਰੁਜ਼ਗਾਰਦਾਤਿਆਂ ਨਾਲ ਕੁੱਲ 30+ ਘੰਟੇ/ਹਫ਼ਤਾ' },
        keyCriteria: { en: 'Unlocks a 2-year location-restricted open work permit while your PR application is processed.', pa: '6 ਯੂਕੋਨ ਕਸਬਿਆਂ ਵਿੱਚ 2–3 ਜੌਬ ਆਫਰ ਜੋੜ ਕੇ 2-ਸਾਲ ਦਾ ਵਰਕ ਪਰਮਿਟ ਤੇ PR।' }
      }
    ]
  },
  {
    code: 'NT',
    name: { en: 'Northwest Territories (NTNP)', pa: 'ਨਾਰਥਵੈਸਟ ਟੈਰੀਟਰੀਜ਼ (NTNP)' },
    alloc: '350 (boosted +50 Nov 2026)',
    status: { en: 'Open — EOI Draws Active', pa: 'ਖੁੱਲ੍ਹਾ — EOI ਡਰਾਅ ਚਾਲੂ' },
    statusTone: 'open',
    jobOffer: { en: 'Full-time permanent NWT job offer required', pa: 'NWT ਵਿੱਚ ਪੱਕਾ ਫੁੱਲ-ਟਾਈਮ ਜੌਬ ਆਫਰ ਜ਼ਰੂਰੀ' },
    scoreSystem: 'Points-Ranked EOI (Employer Driven)',
    eeOption: true,
    streams: { en: 'Express Entry Skilled Worker, Employer Driven (Skilled & Entry-Level), Francophone', pa: 'EE Skilled Worker, Employer Driven, Francophone' },
    keyFact: { en: '2026 quota boosted twice from 197 → 300 → 350 spaces in Nov 2026; 18 Nov EOI draw held (1-week turnaround). Francophone stays first-come.', pa: 'ਨਵੰ. 2026 ਵਿੱਚ ਕੋਟਾ 197 → 300 → 350 ਵਧਾਇਆ; 18 ਨਵੰ. ਨੂੰ EOI ਡਰਾਅ (1 ਹਫ਼ਤੇ ਵਿੱਚ ਫਾਈਲਿੰਗ)।' },
    url: 'https://www.immigratenwt.ca/',
    feeCad: '$0 CAD (no NTNP application fee)',
    processingNote: { en: 'Employer-Driven moved to EOI draws in 2026; $0 fee', pa: '2026 ਤੋਂ Employer-Driven EOI ਡਰਾਅ ਰਾਹੀਂ; $0 ਫੀਸ' },
    occupationFocus: {
      en: 'Covers ALL TEER 0–3 skilled occupations (and ANY TEER 0–5 under NWT Francophone & Entry-Level/Semi-Skilled after 6 mo NWT work). Priority needs in Yellowknife/NWT: Healthcare, Construction, Aviation/Transport, Mining, Hospitality, and Retail.',
      pa: 'TEER 0–3 ਦੇ ਸਾਰੇ ਕਿੱਤੇ (ਅਤੇ 6 ਮਹੀਨੇ NWT ਕੰਮ ਜਾਂ Francophone ਅਧੀਨ TEER 4/5 ਵੀ)। ਸਿਹਤ, ਉਸਾਰੀ, ਹਵਾਬਾਜ਼ੀ, ਮਾਈਨਿੰਗ ਅਤੇ ਹੋਟਲ ਪ੍ਰਮੁੱਖ ਹਨ।'
    },
    languageSummary: {
      en: 'Express Entry: CLB 7+; Employer Driven Skilled: CLB 6 (TEER 0/1) or CLB 5 (TEER 2/3); Entry-Level (TEER 4/5): CLB 4+; NWT Francophone: French NCLC 5+ AND English CLB 4+.',
      pa: 'Express Entry: CLB 7+; Skilled Worker: CLB 6 (0/1) / CLB 5 (2/3); TEER 4/5: CLB 4+; Francophone: ਫ੍ਰੈਂਚ NCLC 5+ ਅਤੇ ਅੰਗਰੇਜ਼ੀ CLB 4+।'
    },
    workExpSummary: {
      en: 'Skilled Worker: 1+ yr FT in same NOC in last 10 yrs (or 6 mo NWT grad); Entry-Level (TEER 4/5): MUST work 6+ mo inside NWT first; Francophone: 1 yr (0–3) or 6 mo NWT (4/5).',
      pa: 'Skilled Worker: 1+ ਸਾਲ ਉਸੇ NOC ਵਿੱਚ; Entry-Level (TEER 4/5): NWT ਦੇ ਅੰਦਰ 6+ ਮਹੀਨੇ ਕੰਮ ਲਾਜ਼ਮੀ; Francophone: 1 ਸਾਲ (0–3) / 6 ਮਹੀਨੇ NWT (4/5)।'
    },
    streamsDetail: [
      {
        name: { en: 'NWT Express Entry Skilled Worker (+600 CRS)', pa: 'NWT Express Entry Skilled Worker (+600)' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: true,
        workExp: { en: 'Meets Express Entry FSWP/CEC/FSTP work criteria (1+ yr TEER 0–3)', pa: 'Express Entry ਤਜਰਬਾ ਸ਼ਰਤਾਂ' },
        language: { en: 'CLB 7+ in all 4 abilities', pa: 'CLB 7+' },
        education: { en: 'Per Express Entry (+ ECA)', pa: 'EE ਅਨੁਸਾਰ (+ ECA)' },
        occupations: { en: 'Any TEER 0, 1, 2, or 3 role with permanent full-time NWT employer demand', pa: 'NWT ਵਿੱਚ ਕੋਈ ਵੀ TEER 0–3 ਕਿੱਤਾ' },
        fundsOrWage: { en: 'NWT median/prevailing wage + EE settlement funds + $0 NTNP fee', pa: 'NWT ਤਨਖਾਹ + EE ਫੰਡ + $0 NTNP ਫੀਸ' },
        keyCriteria: { en: 'Active Express Entry profile + permanent FT NWT job offer + employer local recruitment proof.', pa: 'EE ਪ੍ਰੋਫਾਈਲ + NWT ਵਿੱਚ ਪੱਕਾ TEER 0–3 ਜੌਬ ਆਫਰ।' }
      },
      {
        name: { en: 'Employer Driven: Skilled Worker (TEER 0–3)', pa: 'Employer Driven: Skilled Worker' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '1+ year full-time in same NOC in last 10 yrs', pa: 'ਪਿਛਲੇ 10 ਸਾਲਾਂ ਵਿੱਚ 1+ ਸਾਲ ਉਸੇ ਕਿੱਤੇ ਵਿੱਚ ਕੰਮ' },
        language: { en: 'CLB 6 (TEER 0/1) or CLB 5 (TEER 2/3)', pa: 'CLB 6 (TEER 0/1) ਜਾਂ CLB 5 (TEER 2/3)' },
        education: { en: 'Trade certificate / degree / diploma required for the NOC', pa: 'NOC ਅਨੁਸਾਰ ਪੜ੍ਹਾਈ / ਸਰਟੀਫਿਕੇਟ' },
        occupations: { en: 'TEER 0, 1, 2, or 3 roles (Aviation, Trades, Health, Admin, IT, Hospitality Supervisors)', pa: 'TEER 0–3 ਕਿੱਤੇ (ਹਵਾਬਾਜ਼ੀ, ਟ੍ਰੇਡਜ਼, ਸਿਹਤ, IT, ਸੁਪਰਵਾਈਜ਼ਰ)' },
        fundsOrWage: { en: 'Permanent FT NWT offer (37.5 hrs/wk) + $10,000+ funds (or $0 if inside NWT); $0 fee', pa: 'ਪੱਕਾ NWT ਆਫਰ + $0 ਸਰਕਾਰੀ ਫੀਸ' },
        keyCriteria: { en: 'No EOI ranking points; employer must be registered & operating 1+ yr in NWT.', pa: 'ਕੋਈ EOI ਅੰਕ ਦੌੜ ਨਹੀਂ; NWT ਵਿੱਚ ਪੱਕਾ TEER 0–3 ਜੌਬ ਆਫਰ।' }
      },
      {
        name: { en: 'Employer Driven: Entry Level / Semi-Skilled (TEER 4/5)', pa: 'Entry Level / Semi-Skilled (TEER 4/5)' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '6+ months full-time in same TEER 4/5 role INSIDE NWT before applying', pa: 'NWT ਵਿੱਚ ਉਸੇ TEER 4/5 ਨੌਕਰੀ ਵਿੱਚ 6+ ਮਹੀਨੇ ਕੰਮ' },
        language: { en: 'CLB 4+ in all 4 skills', pa: 'ਚਾਰੋਂ ਹੁਨਰਾਂ ਵਿੱਚ CLB 4+' },
        education: { en: 'High school diploma / on-the-job training', pa: 'ਹਾਈ ਸਕੂਲ / ਸਿਖਲਾਈ' },
        occupations: { en: 'All TEER 4 & 5 roles inside NWT (Hospitality, Food Service, Retail, Housekeeping, General Labour, Transport Support)', pa: 'NWT ਵਿੱਚ ਸਾਰੇ TEER 4 & 5 ਕਿੱਤੇ (ਹੋਟਲ, ਰਿਟੇਲ, ਹਾਊਸਕੀਪਿੰਗ, ਮਜ਼ਦੂਰ)' },
        fundsOrWage: { en: 'Same NWT employer offering permanent FT job + NWT median wage', pa: 'ਉਸੇ NWT ਰੁਜ਼ਗਾਰਦਾਤਾ ਤੋਂ ਪੱਕਾ ਆਫਰ' },
        keyCriteria: { en: 'Must already be working 6+ mo on a valid work permit in NWT for the nominating employer.', pa: 'NWT ਵਿੱਚ 6+ ਮਹੀਨੇ ਕੰਮ ਕਰ ਰਹੇ ਹੋ + ਉਸੇ ਰੁਜ਼ਗਾਰਦਾਤਾ ਦਾ ਪੱਕਾ ਆਫਰ।' }
      },
      {
        name: { en: 'NWT Francophone Stream (TEER 0–5)', pa: 'NWT Francophone ਸਟ੍ਰੀਮ (TEER 0–5)' },
        status: 'Open',
        jobOfferRequired: true,
        expressEntry: false,
        workExp: { en: '1 yr (TEER 0–3) or 6 mo in NWT (TEER 4/5)', pa: '1 ਸਾਲ (TEER 0–3) ਜਾਂ NWT ਵਿੱਚ 6 ਮਹੀਨੇ (TEER 4/5)' },
        language: { en: 'French NCLC 5+ AND English CLB 4+ in all 4 skills', pa: 'ਫ੍ਰੈਂਚ NCLC 5+ ਅਤੇ ਅੰਗਰੇਜ਼ੀ CLB 4+' },
        education: { en: 'Per NOC qualification requirements', pa: 'NOC ਅਨੁਸਾਰ ਪੜ੍ਹਾਈ' },
        occupations: { en: 'Any TEER 0, 1, 2, 3, 4, or 5 occupation across NWT where bilingual French/English skills apply', pa: 'NWT ਵਿੱਚ ਕੋਈ ਵੀ TEER 0–5 ਕਿੱਤਾ' },
        fundsOrWage: { en: 'Permanent FT NWT offer + employer active 6+ mo in NWT; $0 fee', pa: 'ਪੱਕਾ NWT ਆਫਰ + $0 ਸਰਕਾਰੀ ਫੀਸ' },
        keyCriteria: { en: 'Dedicated bilingual Francophone pathway covering all TEER levels 0–5.', pa: 'ਫ੍ਰੈਂਚ ਬੋਲਣ ਵਾਲਿਆਂ ਲਈ ਕਿਸੇ ਵੀ TEER 0–5 ਕਿੱਤੇ ਵਿੱਚ ਪੱਕਾ NWT ਆਫਰ।' }
      }
    ]
  }
];

export const RCIP_COMMUNITIES = [
  'Pictou County, NS',
  'North Bay, ON',
  'Sudbury, ON',
  'Timmins, ON',
  'Sault Ste. Marie, ON',
  'Thunder Bay, ON',
  'Steinbach, MB',
  'Altona / Rhineland, MB',
  'Brandon, MB',
  'Moose Jaw, SK',
  'Claresholm, AB',
  'West Kootenay, BC',
  'North Okanagan Shuswap, BC',
  'Peace Liard, BC'
];

export const FCIP_COMMUNITIES = [
  'Acadian Peninsula, NB',
  'Sudbury, ON',
  'Timmins, ON',
  'Superior East Region, ON',
  'St. Pierre Jolys, MB',
  'Kelowna, BC'
];

export const LANGUAGE_TABLE = [
  { clb: 'CLB / NCLC 10+', ielts: 'L 8.5 · R 8.0 · W 7.5 · S 7.5', celpip: '10–12 each', pte: 'L 89 · R 88 · W 90 · S 89', tef: 'L/R 546+ · W 558+ · S 556+', tcf: 'L/R 549+ · W/S 16+' },
  { clb: 'CLB / NCLC 9', ielts: 'L 8.0 · R 7.0 · W 7.0 · S 7.0', celpip: '9 each', pte: 'L 82 · R 78 · W 88 · S 84', tef: 'L/R 503+ · W 512+ · S 518+', tcf: 'L 523+ · R 524+ · W/S 14–15' },
  { clb: 'CLB / NCLC 8', ielts: 'L 7.5 · R 6.5 · W 6.5 · S 6.5', celpip: '8 each', pte: 'L 71 · R 69 · W 79 · S 76', tef: 'L/R 462+ · W 471+ · S 494+', tcf: 'L 503+ · R 499+ · W/S 12–13' },
  { clb: 'CLB / NCLC 7', ielts: 'L 6.0 · R 6.0 · W 6.0 · S 6.0', celpip: '7 each', pte: 'L 60 · R 60 · W 69 · S 68', tef: 'L/R 434+ · W 428+ · S 456+', tcf: 'L 458+ · R 453+ · W/S 10–11' },
  { clb: 'CLB / NCLC 6', ielts: 'L 5.5 · R 5.0 · W 5.5 · S 5.5', celpip: '6 each', pte: 'L 50 · R 51 · W 60 · S 59', tef: 'L/R 393+ · W 379+ · S 422+', tcf: 'L 398+ · R 406+ · W/S 7–9' },
  { clb: 'CLB / NCLC 5', ielts: 'L 5.0 · R 4.0 · W 5.0 · S 5.0', celpip: '5 each', pte: 'L 40 · R 42 · W 51 · S 51', tef: 'L/R 352+ · W 330+ · S 387+', tcf: 'L 369+ · R 375+ · W/S 6' },
  { clb: 'CLB / NCLC 4', ielts: 'L 4.5 · R 3.5 · W 4.0 · S 4.0', celpip: '4 each', pte: 'L 33 · R 33 · W 41 · S 42', tef: 'L/R 306+ · W 268+ · S 328+', tcf: 'L 331+ · R 342+ · W/S 4–5' }
];

export const TEER_TABLE = [
  { teer: 'TEER 0', level: { en: 'Management occupations', pa: 'ਮੈਨੇਜਮੈਂਟ ਕਿੱਤੇ' }, ex: { en: 'Advertising managers, restaurant managers, IT directors', pa: 'ਮੈਨੇਜਰ, ਰੈਸਟੋਰੈਂਟ ਮੈਨੇਜਰ, IT ਡਾਇਰੈਕਟਰ' }, ee: true },
  { teer: 'TEER 1', level: { en: 'Usually requires a university degree', pa: 'ਆਮ ਤੌਰ ’ਤੇ ਯੂਨੀਵਰਸਿਟੀ ਡਿਗਰੀ' }, ex: { en: 'Software engineers, nurses, doctors, accountants, teachers', pa: 'ਸਾਫਟਵੇਅਰ ਇੰਜੀਨੀਅਰ, ਨਰਸਾਂ, ਡਾਕਟਰ, ਅਕਾਊਂਟੈਂਟ' }, ee: true },
  { teer: 'TEER 2', level: { en: '2+ yr college diploma / apprenticeship / supervisory', pa: '2+ ਸਾਲ ਦਾ ਡਿਪਲੋਮਾ / ਅਪ੍ਰੈਂਟਿਸਸ਼ਿਪ' }, ex: { en: 'Electricians, plumbers, carpenters, IT technicians, cooks', pa: 'ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ, ਪਲੰਬਰ, ਤਰਖਾਣ, ਕੁੱਕ, ਟੈਕਨੀਸ਼ੀਅਨ' }, ee: true },
  { teer: 'TEER 3', level: { en: '< 2 yr college diploma / > 6 mo on-the-job training', pa: '2 ਸਾਲ ਤੋਂ ਘੱਟ ਡਿਪਲੋਮਾ / ਸਿਖਲਾਈ' }, ex: { en: 'Bakers, dental assistants, truck/transport mechanics, admin', pa: 'ਬੇਕਰ, ਡੈਂਟਲ ਅਸਿਸਟੈਂਟ, ਮਕੈਨਿਕ, ਟਰੱਕ/ਲੌਜਿਸਟਿਕਸ' }, ee: true },
  { teer: 'TEER 4', level: { en: 'High school diploma or several weeks on-the-job training', pa: 'ਹਾਈ ਸਕੂਲ / ਕੁਝ ਹਫ਼ਤਿਆਂ ਦੀ ਸਿਖਲਾਈ' }, ex: { en: 'Retail salespersons, food counter attendants, home support', pa: 'ਰਿਟੇਲ ਸੇਲਜ਼, ਫੂਡ ਕਾਊਂਟਰ, ਕੇਅਰਗਿਵਰ' }, ee: false },
  { teer: 'TEER 5', level: { en: 'Short work demonstration, no formal education', pa: 'ਕੋਈ ਰਸਮੀ ਪੜ੍ਹਾਈ ਨਹੀਂ' }, ex: { en: 'Labourers, cleaners, harvest workers, cashiers', pa: 'ਮਜ਼ਦੂਰ, ਸਫ਼ਾਈ ਕਾਮੇ, ਖੇਤ ਮਜ਼ਦੂਰ, ਕੈਸ਼ੀਅਰ' }, ee: false }
];

export const ECA_ORGS = [
  { name: 'WES (World Education Services)', speed: '~3–5 weeks after docs', note: { en: 'Fastest and most popular for standard university degrees', pa: 'ਆਮ ਡਿਗਰੀਆਂ ਲਈ ਸਭ ਤੋਂ ਤੇਜ਼ ਅਤੇ ਪ੍ਰਸਿੱਧ' }, url: 'https://www.wes.org/ca/' },
  { name: 'ICAS (International Credential Assessment Service)', speed: '~12–20 weeks', note: { en: 'Often chosen for technical diplomas or trade certificates', pa: 'ਤਕਨੀਕੀ ਡਿਪਲੋਮਿਆਂ ਲਈ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ' }, url: 'https://www.icascanada.ca/' },
  { name: 'CES (University of Toronto)', speed: '~8–14 weeks', note: { en: 'Strong for academic degrees from South Asia and Europe', pa: 'ਯੂਨੀਵਰਸਿਟੀ ਆਫ ਟੋਰਾਂਟੋ ਵੱਲੋਂ ਡਿਗਰੀ ਮੁਲਾਂਕਣ' }, url: 'https://learn.utoronto.ca/comparative-education-service' },
  { name: 'IQAS (International Qualifications Assessment)', speed: '~12–18 weeks', note: { en: 'Alberta government service; good for multi-year degrees', pa: 'ਅਲਬਰਟਾ ਸਰਕਾਰ ਦੀ ਸੇਵਾ' }, url: 'https://www.alberta.ca/iqas-immigration' },
  { name: 'ICES (BCIT) · MCC (Doctors) · PEBC (Pharmacists)', speed: '4–16 weeks', note: { en: 'MCC required for physicians; PEBC required for pharmacists', pa: 'ਡਾਕਟਰਾਂ ਲਈ MCC ਅਤੇ ਫਾਰਮਾਸਿਸਟਾਂ ਲਈ PEBC ਲਾਜ਼ਮੀ' }, url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/education-assessed/how.html' }
];

export const GLOSSARY_DATA = [
  { term: 'ITA', full: 'Invitation to Apply', desc: { en: 'Official IRCC invitation after an Express Entry draw giving you 60 days to submit your full PR application.', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਡਰਾਅ ਤੋਂ ਬਾਅਦ IRCC ਵੱਲੋਂ 60 ਦਿਨਾਂ ਵਿੱਚ ਪੂਰੀ PR ਅਰਜ਼ੀ ਭੇਜਣ ਦਾ ਸੱਦਾ।' } },
  { term: 'CRS', full: 'Comprehensive Ranking System', desc: { en: 'The 1,200-point scoring system ranking candidates inside the Express Entry pool.', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਪੂਲ ਵਿੱਚ ਉਮੀਦਵਾਰਾਂ ਨੂੰ ਰੈਂਕ ਦੇਣ ਵਾਲਾ 1,200 ਅੰਕਾਂ ਦਾ ਸਿਸਟਮ।' } },
  { term: 'NOC', full: 'National Occupational Classification', desc: { en: 'Canada’s 5-digit code system classifying every occupation (e.g., 21231 Software Engineer, 72200 Electrician).', pa: 'ਕੈਨੇਡਾ ਦਾ 5-ਅੰਕਾਂ ਵਾਲਾ ਕੋਡ ਸਿਸਟਮ ਜੋ ਹਰ ਨੌਕਰੀ ਦੀ ਸ਼੍ਰੇਣੀ ਦੱਸਦਾ ਹੈ।' } },
  { term: 'TEER', full: 'Training, Education, Experience & Responsibilities', desc: { en: 'The 0 to 5 skill levels inside NOC. TEER 0–3 count as skilled work for Express Entry.', pa: 'NOC ਦੇ ਅੰਦਰ 0 ਤੋਂ 5 ਤੱਕ ਹੁਨਰ ਦਾ ਪੱਧਰ। TEER 0–3 ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਲਈ ਯੋਗ ਹਨ।' } },
  { term: 'CLB / NCLC', full: 'Canadian Language Benchmarks', desc: { en: 'Standard 1–12 scale converting IELTS/CELPIP/PTE (CLB) or TEF/TCF (NCLC) scores.', pa: 'ਭਾਸ਼ਾ ਟੈਸਟ ਦੇ ਨੰਬਰਾਂ ਨੂੰ ਕੈਨੇਡੀਅਨ ਪੱਧਰ (1–12) ਵਿੱਚ ਬਦਲਣ ਦਾ ਪੈਮਾਨਾ।' } },
  { term: 'ECA', full: 'Educational Credential Assessment', desc: { en: 'A report proving your foreign degree or diploma equals a Canadian credential (valid 5 years).', pa: 'ਵਿਦੇਸ਼ੀ ਡਿਗਰੀ ਨੂੰ ਕੈਨੇਡੀਅਨ ਡਿਗਰੀ ਦੇ ਬਰਾਬਰ ਸਾਬਤ ਕਰਨ ਵਾਲੀ ਰਿਪੋਰਟ (5 ਸਾਲ ਵੈਧ)।' } },
  { term: 'CSQ', full: 'Certificat de sélection du Québec', desc: { en: 'Quebec Selection Certificate issued by Quebec before you apply to IRCC for federal PR.', pa: 'ਕਿਊਬੈਕ ਸਰਕਾਰ ਵੱਲੋਂ ਫੈਡਰਲ PR ਅਰਜ਼ੀ ਤੋਂ ਪਹਿਲਾਂ ਦਿੱਤਾ ਜਾਣ ਵਾਲਾ ਚੋਣ ਸਰਟੀਫਿਕੇਟ।' } },
  { term: 'EOI', full: 'Expression of Interest', desc: { en: 'An online profile submitted to a PNP province or Quebec Arrima to be selected in a draw.', pa: 'ਕਿਸੇ ਸੂਬੇ (PNP) ਜਾਂ ਕਿਊਬੈਕ ਨੂੰ PR ਸੱਦਾ ਲੈਣ ਲਈ ਭੇਜੀ ਗਈ ਸ਼ੁਰੂਆਤੀ ਪ੍ਰੋਫਾਈਲ।' } },
  { term: 'LAA', full: 'Letter of Advice to Apply', desc: { en: 'An invitation letter issued by provinces like Manitoba or Saskatchewan after an EOI draw.', pa: 'ਮੈਨੀਟੋਬਾ ਜਾਂ ਸਸਕੈਚਵਨ ਵਰਗੇ ਸੂਬਿਆਂ ਵੱਲੋਂ ਅਪਲਾਈ ਕਰਨ ਲਈ ਭੇਜਿਆ ਸੱਦਾ ਪੱਤਰ।' } },
  { term: 'AOR', full: 'Acknowledgement of Receipt', desc: { en: 'Official IRCC confirmation receipt showing your PR application and fees were received.', pa: 'IRCC ਵੱਲੋਂ ਤੁਹਾਡੀ PR ਅਰਜ਼ੀ ਅਤੇ ਫੀਸ ਮਿਲਣ ਦੀ ਪੁਸ਼ਟੀ ਰਸੀਦ।' } },
  { term: 'COPR', full: 'Confirmation of Permanent Residence', desc: { en: 'Final approval document confirming your PR status upon landing or virtual eCOPR portal confirmation.', pa: 'ਅੰਤਿਮ ਪ੍ਰਵਾਨਗੀ ਦਸਤਾਵੇਜ਼ ਜਿਸ ਨਾਲ ਤੁਹਾਨੂੰ PR ਦਾ ਦਰਜਾ ਮਿਲਦਾ ਹੈ।' } },
  { term: 'PGWP', full: 'Post-Graduation Work Permit', desc: { en: 'Open work permit (up to 3 years) for eligible Canadian graduates to gain work experience for PR.', pa: 'ਕੈਨੇਡਾ ਵਿੱਚ ਪੜ੍ਹਾਈ ਪੂਰੀ ਕਰਨ ਵਾਲੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਮਿਲਣ ਵਾਲਾ ਓਪਨ ਵਰਕ ਪਰਮਿਟ।' } },
  { term: 'LMIA', full: 'Labour Market Impact Assessment', desc: { en: 'Employer permission from ESDC. Under 3 Nov 2026 rules, up to 150 Labour Market Integration CRS points do NOT require an LMIA.', pa: 'ਰੁਜ਼ਗਾਰਦਾਤਾ ਵੱਲੋਂ ESDC ਤੋਂ ਲਿਆ ਦਸਤਾਵੇਜ਼। 3 ਨਵੰਬਰ 2026 ਦੇ ਨਵੇਂ ਨਿਯਮਾਂ ਅਧੀਨ 150 ਤੱਕ CRS ਅੰਕ ਬਿਨਾਂ LMIA ਦੇ ਮਿਲਦੇ ਹਨ।' } }
];

export const FAQ_DATA: FaqEntry[] = [
  // GENERAL (8)
  { cat: 'general', q: { en: 'What is Canada’s PR target for 2026?', pa: '2026 ਲਈ ਕੈਨੇਡਾ ਦਾ PR ਟੀਚਾ ਕਿੰਨਾ ਹੈ?' }, a: { en: 'Canada’s 2026 Immigration Levels Plan targets 380,000 new permanent residents, including ~109,000 via Express Entry and ~91,500 via Provincial Nominee Programs (PNPs).', pa: '2026 ਲਈ ਕੈਨੇਡਾ ਦਾ ਟੀਚਾ 380,000 ਨਵੇਂ PR ਹਨ, ਜਿਸ ਵਿੱਚੋਂ ~109,000 ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਅਤੇ ~91,500 PNP ਰਾਹੀਂ ਹਨ।' } },
  { cat: 'general', q: { en: 'Why is Express Entry paused since 3 November 2026?', pa: '3 ਨਵੰਬਰ 2026 ਤੋਂ ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਕਿਉਂ ਰੁਕੀ ਹੋਈ ਹੈ?' }, a: { en: 'IRCC paused draws starting 3 Nov 2026 while rolling out the new Labour Market Integration CRS factor (up to 150 points without needing an LMIA) and recalibrating scoring.', pa: 'IRCC 3 ਨਵੰਬਰ 2026 ਤੋਂ ਨਵਾਂ ਲੇਬਰ ਮਾਰਕੀਟ ਇੰਟੀਗ੍ਰੇਸ਼ਨ CRS ਫੈਕਟਰ (ਬਿਨਾਂ LMIA ਦੇ 150 ਅੰਕਾਂ ਤੱਕ) ਲਾਗੂ ਕਰਨ ਲਈ ਸਿਸਟਮ ਅੱਪਡੇਟ ਕਰ ਰਿਹਾ ਹੈ।' } },
  { cat: 'general', q: { en: 'Do I need a job offer to immigrate to Canada?', pa: 'ਕੀ ਕੈਨੇਡਾ PR ਲਈ ਜੌਬ ਆਫਰ ਜ਼ਰੂਰੀ ਹੈ?' }, a: { en: 'No. Federal Skilled Worker (FSWP), Canadian Experience Class (CEC), French category draws, and Saskatchewan In-Demand/EE do not require a job offer.', pa: 'ਨਹੀਂ। FSWP, CEC, ਫ੍ਰੈਂਚ ਡਰਾਅ ਅਤੇ ਸਸਕੈਚਵਨ ਦੇ ਕੁਝ ਰਸਤਿਆਂ ਲਈ ਜੌਬ ਆਫਰ ਜ਼ਰੂਰੀ ਨਹੀਂ ਹੈ।' } },
  { cat: 'general', q: { en: 'Do I need an immigration agent or lawyer to apply?', pa: 'ਕੀ ਅਪਲਾਈ ਕਰਨ ਲਈ ਏਜੰਟ ਜਾਂ ਵਕੀਲ ਜ਼ਰੂਰੀ ਹੈ?' }, a: { en: 'No. Every federal and provincial portal lets you apply yourself for free (you only pay official government fees). If you hire help, only use a licensed RCIC (verify on college-ic.ca) or Canadian lawyer.', pa: 'ਨਹੀਂ, ਤੁਸੀਂ ਖੁਦ ਅਧਿਕਾਰਤ ਪੋਰਟਲ ’ਤੇ ਅਪਲਾਈ ਕਰ ਸਕਦੇ ਹੋ। ਜੇ ਮਦਦ ਲੈਣੀ ਹੋਵੇ ਤਾਂ ਸਿਰਫ਼ ਲਾਇਸੰਸਸ਼ੁਦਾ RCIC ਜਾਂ ਵਕੀਲ ਹੀ ਚੁਣੋ।' } },
  { cat: 'general', q: { en: 'Can I include my spouse and children in my PR application?', pa: 'ਕੀ ਮੈਂ ਆਪਣੀ PR ਅਰਜ਼ੀ ਵਿੱਚ ਪਤੀ/ਪਤਨੀ ਅਤੇ ਬੱਚਿਆਂ ਨੂੰ ਸ਼ਾਮਲ ਕਰ ਸਕਦਾ ਹਾਂ?' }, a: { en: 'Yes. Your spouse/common-law partner and unmarried dependent children under 22 can be included and receive PR alongside you.', pa: 'ਹਾਂ, ਤੁਸੀਂ ਆਪਣੇ ਜੀਵਨ ਸਾਥੀ ਅਤੇ 22 ਸਾਲ ਤੋਂ ਘੱਟ ਕੁਆਰੇ ਬੱਚਿਆਂ ਨੂੰ ਨਾਲ ਸ਼ਾਮਲ ਕਰ ਸਕਦੇ ਹੋ।' } },
  { cat: 'general', q: { en: 'What is the minimum or maximum age for Canada PR?', pa: 'ਕੈਨੇਡਾ PR ਲਈ ਘੱਟੋ-ਘੱਟ ਜਾਂ ਵੱਧ ਤੋਂ ਵੱਧ ਉਮਰ ਕਿੰਨੀ ਹੈ?' }, a: { en: 'You must be at least 18 to be the principal applicant. There is no hard upper age limit, though CRS age points peak at 20–29 and drop to 0 at age 45+.', pa: 'ਮੁੱਖ ਬਿਨੈਕਾਰ ਦੀ ਉਮਰ ਘੱਟੋ-ਘੱਟ 18 ਸਾਲ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ। ਕੋਈ ਵੱਧ ਤੋਂ ਵੱਧ ਸੀਮਾ ਨਹੀਂ, ਪਰ 29 ਤੋਂ ਬਾਅਦ ਉਮਰ ਦੇ ਅੰਕ ਘਟਦੇ ਹਨ।' } },
  { cat: 'general', q: { en: 'What if I have a past visa refusal or medical issue?', pa: 'ਜੇ ਪੁਰਾਣਾ ਵੀਜ਼ਾ ਰਿਫਿਊਜ਼ਲ ਜਾਂ ਸਿਹਤ ਸਮੱਸਿਆ ਹੋਵੇ ਤਾਂ ਕੀ ਹੁੰਦਾ ਹੈ?' }, a: { en: 'You MUST declare every past visa refusal truthfully—hiding one is a 5-year ban. Medical or criminal issues are assessed individually; consult a Canadian immigration lawyer.', pa: 'ਹਰ ਪੁਰਾਣਾ ਰਿਫਿਊਜ਼ਲ ਸੱਚ-ਸੱਚ ਦੱਸਣਾ ਲਾਜ਼ਮੀ ਹੈ—ਛੁਪਾਉਣ ’ਤੇ 5 ਸਾਲ ਦਾ ਬੈਨ ਲੱਗ ਸਕਦਾ ਹੈ।' } },
  { cat: 'general', q: { en: 'Do I have to live in Canada right after getting COPR?', pa: 'ਕੀ PR ਮਿਲਣ ਤੋਂ ਤੁਰੰਤ ਬਾਅਦ ਕੈਨੇਡਾ ਵਿੱਚ ਰਹਿਣਾ ਜ਼ਰੂਰੀ ਹੈ?' }, a: { en: 'You must land in Canada before your COPR expires. Afterward, to keep PR status, you must be physically in Canada for at least 730 days (2 years) in every 5-year period.', pa: 'COPR ਦੀ ਮਿਆਦ ਤੋਂ ਪਹਿਲਾਂ ਲੈਂਡ ਕਰਨਾ ਪੈਂਦਾ ਹੈ। PR ਬਰਕਰਾਰ ਰੱਖਣ ਲਈ 5 ਸਾਲਾਂ ਵਿੱਚ 730 ਦਿਨ (2 ਸਾਲ) ਕੈਨੇਡਾ ਵਿੱਚ ਰਹਿਣਾ ਜ਼ਰੂਰੀ ਹੈ।' } },

  // EXPRESS ENTRY (13)
  { cat: 'ee', q: { en: 'What is the difference between FSWP, CEC, and FSTP?', pa: 'FSWP, CEC ਅਤੇ FSTP ਵਿੱਚ ਕੀ ਫ਼ਰਕ ਹੈ?' }, a: { en: 'FSWP is for skilled workers with 1+ yr continuous work + 67/100 grid + funds. CEC is for 1+ yr Canadian work in the last 3 years (no funds). FSTP is for 2+ yrs skilled trades + job offer or trade certificate.', pa: 'FSWP ਵਿਦੇਸ਼ੀ/ਕੈਨੇਡੀਅਨ ਤਜਰਬੇ (67/100 ਅੰਕ + ਫੰਡ) ਲਈ ਹੈ। CEC 1 ਸਾਲ ਦੇ ਕੈਨੇਡੀਅਨ ਕੰਮ ਲਈ (ਬਿਨਾਂ ਫੰਡ)। FSTP 2 ਸਾਲ ਦੇ ਟ੍ਰੇਡਜ਼ ਤਜਰਬੇ ਲਈ ਹੈ।' } },
  { cat: 'ee', q: { en: 'What is the new 3 Nov 2026 Labour Market Integration factor?', pa: '3 ਨਵੰਬਰ 2026 ਦਾ ਨਵਾਂ ਲੇਬਰ ਮਾਰਕੀਟ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਫੈਕਟਰ ਕੀ ਹੈ?' }, a: { en: 'It awards up to 150 CRS points for strong Canadian labour market integration (verified domestic employment, regional/sector integration) WITHOUT requiring an LMIA.', pa: 'ਇਹ ਬਿਨਾਂ LMIA ਦੇ ਕੈਨੇਡੀਅਨ ਲੇਬਰ ਮਾਰਕੀਟ ਵਿੱਚ ਮਜ਼ਬੂਤ ਸ਼ਮੂਲੀਅਤ ਲਈ 150 ਤੱਕ CRS ਅੰਕ ਦਿੰਦਾ ਹੈ।' } },
  { cat: 'ee', q: { en: 'How many candidates are currently above CRS 500?', pa: 'ਇਸ ਵੇਲੇ CRS 500 ਤੋਂ ਉੱਪਰ ਕਿੰਨੇ ਉਮੀਦਵਾਰ ਹਨ?' }, a: { en: 'In the 25 Oct 2026 pool of 228,724 candidates, only 21,322 profiles (787 at 601+ and 20,535 at 501–600) are above 500.', pa: '25 ਅਕਤੂਬਰ 2026 ਦੇ 228,724 ਉਮੀਦਵਾਰਾਂ ਵਿੱਚੋਂ ਸਿਰਫ਼ 21,322 ਹੀ 500 ਤੋਂ ਉੱਪਰ ਹਨ।' } },
  { cat: 'ee', q: { en: 'Does part-time work count toward CEC or FSWP?', pa: 'ਕੀ ਪਾਰਟ-ਟਾਈਮ ਕੰਮ CEC ਜਾਂ FSWP ਵਿੱਚ ਗਿਣਿਆ ਜਾਂਦਾ ਹੈ?' }, a: { en: 'Yes, 15 hours/week for 24 months equals 1 full-time year (1,560 hours). Note: Work performed while studying full-time in Canada does NOT count for CEC.', pa: 'ਹਾਂ, 2 ਸਾਲ 15 ਘੰਟੇ/ਹਫ਼ਤਾ = 1 ਪੂਰਾ ਸਾਲ (1,560 ਘੰਟੇ)। ਪਰ ਕੈਨੇਡਾ ਵਿੱਚ ਫੁੱਲ-ਟਾਈਮ ਪੜ੍ਹਾਈ ਦੌਰਾਨ ਕੀਤਾ ਕੰਮ CEC ਵਿੱਚ ਨਹੀਂ ਗਿਣਿਆ ਜਾਂਦਾ।' } },
  { cat: 'ee', q: { en: 'Can self-employment in Canada count for CEC?', pa: 'ਕੀ ਕੈਨੇਡਾ ਵਿੱਚ ਸੈਲਫ-ਇੰਪਲਾਇਮੈਂਟ CEC ਵਿੱਚ ਗਿਣੀ ਜਾਂਦੀ ਹੈ?' }, a: { en: 'No. Self-employment (or contractor T4A gig work) in Canada does NOT count for CEC, though continuous skilled self-employment can count for FSWP.', pa: 'ਨਹੀਂ, ਕੈਨੇਡਾ ਵਿੱਚ ਸੈਲਫ-ਇੰਪਲਾਇਮੈਂਟ CEC ਵਿੱਚ ਨਹੀਂ ਗਿਣੀ ਜਾਂਦੀ।' } },
  { cat: 'ee', q: { en: 'What is “continuous” 1 year of work for FSWP?', pa: 'FSWP ਲਈ 1 ਸਾਲ ਦਾ “ਲਗਾਤਾਰ” ਕੰਮ ਕੀ ਹੁੰਦਾ ਹੈ?' }, a: { en: 'At least 12 consecutive months full-time (30+ hrs/week = 1,560 hrs) in one single primary NOC TEER 0–3 occupation with no gaps.', pa: 'ਇੱਕ ਹੀ ਮੁੱਖ NOC TEER 0–3 ਕਿੱਤੇ ਵਿੱਚ ਬਿਨਾਂ ਕਿਸੇ ਗੈਪ ਦੇ ਲਗਾਤਾਰ 12 ਮਹੀਨੇ ਕੰਮ।' } },
  { cat: 'ee', q: { en: 'Do CEC candidates need Proof of Funds?', pa: 'ਕੀ CEC ਬਿਨੈਕਾਰਾਂ ਨੂੰ ਬੈਂਕ ਫੰਡ ਦਿਖਾਉਣੇ ਪੈਂਦੇ ਹਨ?' }, a: { en: 'No. CEC applicants are exempt from settlement proof of funds (simply upload a short letter stating you are invited under CEC).', pa: 'ਨਹੀਂ! CEC ਉਮੀਦਵਾਰਾਂ ਨੂੰ ਸੈਟਲਮੈਂਟ ਫੰਡ ਦਿਖਾਉਣ ਦੀ ਲੋੜ ਨਹੀਂ ਹੈ।' } },
  { cat: 'ee', q: { en: 'How much Proof of Funds does a single FSWP applicant need?', pa: 'ਇੱਕਲੇ FSWP ਬਿਨੈਕਾਰ ਨੂੰ ਕਿੰਨੇ ਫੰਡ ਦਿਖਾਉਣੇ ਪੈਂਦੇ ਹਨ?' }, a: { en: 'At least $14,690 CAD for 1 person, $18,288 for 2, $22,483 for 3, and $27,297 for 4.', pa: '1 ਵਿਅਕਤੀ ਲਈ ਘੱਟੋ-ਘੱਟ $14,690 CAD, 2 ਲਈ $18,288, 3 ਲਈ $22,483, 4 ਲਈ $27,297।' } },
  { cat: 'ee', q: { en: 'What are all 9 Express Entry category-based draw groups in 2026?', pa: '2026 ਵਿੱਚ ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਦੀਆਂ 9 ਸ਼੍ਰੇਣੀਆਂ ਕਿਹੜੀਆਂ ਹਨ?' }, a: { en: 'French Proficiency, Healthcare & Social Services, STEM, Trades, Agriculture & Agri-Food, Education, Transport, Physicians, and Senior Managers.', pa: 'ਫ੍ਰੈਂਚ, ਸਿਹਤ/ਸਮਾਜਿਕ ਸੇਵਾਵਾਂ, STEM, ਟ੍ਰੇਡਜ਼, ਖੇਤੀਬਾੜੀ, ਸਿੱਖਿਆ, ਟ੍ਰਾਂਸਪੋਰਟ, ਡਾਕਟਰ ਅਤੇ ਸੀਨੀਅਰ ਮੈਨੇਜਰ।' } },
  { cat: 'ee', q: { en: 'Do I get points for a brother or sister in Canada?', pa: 'ਕੀ ਕੈਨੇਡਾ ਵਿੱਚ ਭਰਾ ਜਾਂ ਭੈਣ ਹੋਣ ਦੇ ਅੰਕ ਮਿਲਦੇ ਹਨ?' }, a: { en: 'Yes, +15 CRS points (and +5 FSWP adaptability points) if you or your spouse have a sibling 18+ living in Canada who is a PR or Citizen.', pa: 'ਹਾਂ, +15 CRS ਅੰਕ ਮਿਲਦੇ ਹਨ।' } },
  { cat: 'ee', q: { en: 'Can my CRS score drop after I receive an ITA?', pa: 'ਕੀ ITA ਮਿਲਣ ਤੋਂ ਬਾਅਦ ਮੇਰਾ CRS ਘਟ ਸਕਦਾ ਹੈ?' }, a: { en: 'Your age points lock on the day you receive an ITA, though other changes (losing a qualifying factor) can still affect eligibility.', pa: 'ITA ਮਿਲਣ ’ਤੇ ਉਮਰ ਦੇ ਅੰਕ ਲੌਕ ਹੋ ਜਾਂਦੇ ਹਨ।' } },
  { cat: 'ee', q: { en: 'How do I qualify for a Category-Based Draw?', pa: 'ਸ਼੍ਰੇਣੀ-ਅਧਾਰਤ ਡਰਾਅ ਲਈ ਕੀ ਯੋਗਤਾ ਚਾਹੀਦੀ ਹੈ?' }, a: { en: 'You must first be eligible for FSWP, CEC, or FSTP, and have at least 6 months of continuous full-time work experience in the past 3 years in an eligible NOC (or NCLC 7+ for French).', pa: 'ਪਹਿਲਾਂ FSWP/CEC/FSTP ਲਈ ਯੋਗ ਹੋਣਾ ਅਤੇ ਪਿਛਲੇ 3 ਸਾਲਾਂ ਵਿੱਚ 6 ਮਹੀਨੇ ਸੰਬੰਧਿਤ NOC ਵਿੱਚ ਕੰਮ (ਜਾਂ ਫ੍ਰੈਂਚ NCLC 7+) ਜ਼ਰੂਰੀ ਹੈ।' } },
  { cat: 'ee', q: { en: 'Should I put my spouse as accompanying or non-accompanying?', pa: 'ਕੀ ਮੈਨੂੰ ਜੀਵਨ ਸਾਥੀ ਨੂੰ Accompanying ਜਾਂ Non-accompanying ਰੱਖਣਾ ਚਾਹੀਦਾ ਹੈ?' }, a: { en: 'Be honest about your real intention. If your spouse is non-accompanying solely to gain points, IRCC scrutinizes it carefully and you would have to sponsor them later (takes 12+ months).', pa: 'ਹਮੇਸ਼ਾ ਸੱਚਾ ਇਰਾਦਾ ਦੱਸੋ। ਜੇ ਬਾਅਦ ਵਿੱਚ ਸਪਾਂਸਰ ਕਰਨਾ ਪਿਆ ਤਾਂ 12+ ਮਹੀਨੇ ਵੱਖ ਰਹਿਣਾ ਪੈ ਸਕਦਾ ਹੈ।' } },

  // LANGUAGE TESTS & ECA (7)
  { cat: 'language', q: { en: 'Which English and French language tests are accepted by IRCC in 2026?', pa: '2026 ਵਿੱਚ IRCC ਵੱਲੋਂ ਕਿਹੜੇ ਅੰਗਰੇਜ਼ੀ ਅਤੇ ਫ੍ਰੈਂਚ ਟੈਸਟ ਮਨਜ਼ੂਰ ਹਨ?' }, a: { en: 'For economic PR: IELTS General Training, CELPIP-General, and PTE Core (English); TEF Canada and TCF Canada (French). IELTS Academic and TOEFL are NOT accepted for PR.', pa: 'ਅੰਗਰੇਜ਼ੀ ਲਈ: IELTS General Training, CELPIP-G, PTE Core। ਫ੍ਰੈਂਚ ਲਈ: TEF Canada ਅਤੇ TCF Canada। IELTS Academic ਜਾਂ TOEFL PR ਲਈ ਮਨਜ਼ੂਰ ਨਹੀਂ ਹਨ।' } },
  { cat: 'language', q: { en: 'Is IELTS Academic accepted for Canada PR?', pa: 'ਕੀ ਕੈਨੇਡਾ PR ਲਈ IELTS Academic ਮਨਜ਼ੂਰ ਹੈ?' }, a: { en: 'No! Only IELTS General Training, CELPIP-General, PTE Core, TEF Canada, or TCF Canada are accepted for PR.', pa: 'ਨਹੀਂ! PR ਲਈ ਸਿਰਫ਼ IELTS General Training, CELPIP-G, PTE Core, TEF ਜਾਂ TCF ਹੀ ਮਨਜ਼ੂਰ ਹਨ।' } },
  { cat: 'language', q: { en: 'Can I combine two IELTS tests or use IELTS One Skill Retake for Express Entry?', pa: 'ਕੀ ਮੈਂ Express Entry ਲਈ ਦੋ IELTS ਟੈਸਟ ਜੋੜ ਸਕਦਾ ਹਾਂ ਜਾਂ One Skill Retake ਵਰਤ ਸਕਦਾ ਹਾਂ?' }, a: { en: 'No. For Express Entry, all 4 abilities (Listening, Reading, Writing, Speaking) must come from one single test sitting on one Test Report Form (TRF).', pa: 'ਨਹੀਂ। Express Entry ਲਈ ਚਾਰੋਂ ਹੁਨਰਾਂ (L/R/W/S) ਦੇ ਨੰਬਰ ਇੱਕ ਹੀ ਟੈਸਟ ਦੇ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ—One Skill Retake ਮਨਜ਼ੂਰ ਨਹੀਂ ਹੈ।' } },
  { cat: 'language', q: { en: 'How long are language test results valid?', pa: 'ਭਾਸ਼ਾ ਟੈਸਟ ਦੇ ਨਤੀਜੇ ਕਿੰਨੀ ਦੇਰ ਤੱਕ ਵੈਧ ਰਹਿੰਦੇ ਹਨ?' }, a: { en: 'Language test results are valid for 2 years from the issue date and must still be valid on the day you submit your complete e-APR.', pa: 'ਨਤੀਜੇ ਜਾਰੀ ਹੋਣ ਦੀ ਮਿਤੀ ਤੋਂ 2 ਸਾਲ ਤੱਕ ਵੈਧ ਰਹਿੰਦੇ ਹਨ ਅਤੇ ਪੂਰੀ ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰਨ ਵੇਲੇ ਵੈਧ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ।' } },
  { cat: 'language', q: { en: 'How many extra CRS points does French give?', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਵਿੱਚ ਫ੍ਰੈਂਚ ਦੇ ਕਿੰਨੇ ਵਾਧੂ ਅੰਕ ਮਿਲਦੇ ਹਨ?' }, a: { en: 'NCLC 7+ in all 4 French skills gives +25 bonus points, or +50 if you also have English CLB 5+, plus access to French category draws (recent cutoff CRS 407).', pa: 'NCLC 7+ ਲੈਣ ’ਤੇ +25 ਅੰਕ (English CLB 5+ ਨਾਲ +50) ਅਤੇ ਘੱਟ CRS ਵਾਲੇ ਫ੍ਰੈਂਚ ਡਰਾਅ (407) ਮਿਲਦੇ ਹਨ।' } },
  { cat: 'language', q: { en: 'What French level does FCIP require?', pa: 'FCIP ਲਈ ਕਿੰਨੀ ਫ੍ਰੈਂਚ ਚਾਹੀਦੀ ਹੈ?' }, a: { en: 'French NCLC 5 in all 4 abilities plus a valid job offer from a designated employer in one of the 6 FCIP communities.', pa: 'ਫ੍ਰੈਂਚ NCLC 5 ਅਤੇ 6 FCIP ਕਮਿਊਨਿਟੀਆਂ ਵਿੱਚੋਂ ਕਿਸੇ ਵਿੱਚ ਜੌਬ ਆਫਰ।' } },
  { cat: 'language', q: { en: 'How long is an Educational Credential Assessment (ECA) valid?', pa: 'ECA ਰਿਪੋਰਟ ਕਿੰਨੀ ਦੇਰ ਤੱਕ ਵੈਧ ਹੁੰਦੀ ਹੈ?' }, a: { en: 'An ECA from WES, ICAS, CES, IQAS, or ICES is valid for 5 years from the date issued.', pa: 'WES, ICAS, CES, IQAS ਜਾਂ ICES ਦੀ ECA ਰਿਪੋਰਟ 5 ਸਾਲਾਂ ਲਈ ਵੈਧ ਹੁੰਦੀ ਹੈ।' } },

  // PNP & QUEBEC (11)
  { cat: 'pnp', q: { en: 'How many CRS points does an Express Entry PNP give?', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ PNP ਨਾਲ ਕਿੰਨੇ CRS ਅੰਕ ਮਿਲਦੇ ਹਨ?' }, a: { en: 'A provincial nomination linked to Express Entry gives +600 CRS points, virtually guaranteeing an ITA in the next PNP draw.', pa: '+600 CRS ਅੰਕ ਮਿਲਦੇ ਹਨ।' } },
  { cat: 'pnp', q: { en: 'Which Ontario OINP streams are open right now?', pa: 'ਓਂਟਾਰੀਓ (OINP) ਦੀਆਂ ਕਿਹੜੀਆਂ ਸਟ੍ਰੀਮਾਂ ਹੁਣ ਖੁੱਲ੍ਹੀਆਂ ਹਨ?' }, a: { en: 'Under Ontario Reg 47/26, OINP consolidated its pathways into the Ontario Workforce Priority (OWP) stream (plus REDI regional pilot and updated Oct 5 CRA earnings scoring).', pa: 'Reg 47/26 ਅਧੀਨ OINP ਨੇ ਸਟ੍ਰੀਮਾਂ ਨੂੰ Ontario Workforce Priority (OWP) ਵਿੱਚ ਇਕੱਠਾ ਕਰ ਦਿੱਤਾ ਹੈ (5 ਅਕਤੂਬਰ ਨੂੰ ਤਨਖਾਹ ਅੰਕ ਅੱਪਡੇਟ ਸਮੇਤ)।' } },
  { cat: 'pnp', q: { en: 'Is the BC Entry Level and Semi-Skilled (ELSS) stream open?', pa: 'ਕੀ BC ਦੀ Entry Level (ELSS) ਸਟ੍ਰੀਮ ਖੁੱਲ੍ਹੀ ਹੈ?' }, a: { en: 'No. BC’s ELSS stream is currently closed.', pa: 'ਨਹੀਂ, BC ਦੀ ELSS ਸਟ੍ਰੀਮ ਬੰਦ ਹੈ।' } },
  { cat: 'pnp', q: { en: 'Which province has the clearest no-job-offer PNP route?', pa: 'ਬਿਨਾਂ ਜੌਬ ਆਫਰ ਦੇ ਸਭ ਤੋਂ ਸਾਫ਼ PNP ਰਸਤਾ ਕਿਹੜੇ ਸੂਬੇ ਵਿੱਚ ਹੈ?' }, a: { en: 'Saskatchewan (SINP Occupation In-Demand & Express Entry) has the clearest 60/110 no-job-offer framework, though standard EOI draws are paused in 2026 in favour of employer-driven sector caps.', pa: 'ਸਸਕੈਚਵਨ (60/110) ਸਭ ਤੋਂ ਸਾਫ਼ ਰਸਤਾ ਹੈ, ਹਾਲਾਂਕਿ 2026 ਵਿੱਚ ਸਧਾਰਨ EOI ਡਰਾਅ ਰੁਕੇ ਹਨ।' } },
  { cat: 'pnp', q: { en: 'What CRS score does Alberta Express Entry look for?', pa: 'ਅਲਬਰਟਾ ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਲਈ ਕਿੰਨਾ CRS ਚਾਹੀਦਾ ਹੈ?' }, a: { en: 'Minimum CRS 300+ paired with AAIP priority factors (healthcare, tech, family connection, Alberta job). Only 495 of 6,603 spots remain for 2026.', pa: 'ਘੱਟੋ-ਘੱਟ CRS 300+। 2026 ਦੇ 6,603 ਵਿੱਚੋਂ ਸਿਰਫ਼ 495 ਥਾਵਾਂ ਬਾਕੀ ਹਨ।' } },
  { cat: 'pnp', q: { en: 'Can I apply to Nova Scotia Express Entry from outside Canada?', pa: 'ਕੀ ਮੈਂ ਕੈਨੇਡਾ ਤੋਂ ਬਾਹਰੋਂ Nova Scotia Express Entry ਵਿੱਚ ਅਪਲਾਈ ਕਰ ਸਕਦਾ ਹਾਂ?' }, a: { en: 'Not for NS Experience: Express Entry, which strictly requires 1 year of skilled work inside Nova Scotia.', pa: 'NS Experience Express Entry ਲਈ ਨੋਵਾ ਸਕੋਸ਼ੀਆ ਦੇ ਅੰਦਰ 1 ਸਾਲ ਦਾ ਕੰਮ ਜ਼ਰੂਰੀ ਹੈ।' } },
  { cat: 'pnp', q: { en: 'Must I live in the province that nominated me?', pa: 'ਕੀ ਮੈਨੂੰ ਉਸੇ ਸੂਬੇ ਵਿੱਚ ਰਹਿਣਾ ਪਵੇਗਾ ਜਿਸਨੇ ਮੈਨੂੰ PNP ਦਿੱਤੀ?' }, a: { en: 'Yes—you sign a declaration of genuine intent to reside in that nominating province.', pa: 'ਹਾਂ, ਤੁਹਾਨੂੰ ਉਸ ਸੂਬੇ ਵਿੱਚ ਵੱਸਣ ਦਾ ਸੱਚਾ ਇਰਾਦਾ ਰੱਖਣਾ ਪੈਂਦਾ ਹੈ।' } },
  { cat: 'pnp', q: { en: 'How is Quebec immigration different from the rest of Canada?', pa: 'ਕਿਊਬੈਕ ਦੀ ਇਮੀਗ੍ਰੇਸ਼ਨ ਬਾਕੀ ਕੈਨੇਡਾ ਨਾਲੋਂ ਕਿਵੇਂ ਵੱਖਰੀ ਹੈ?' }, a: { en: 'Quebec runs its own selection system (PSTQ via Arrima). You obtain a CSQ from Quebec first, then apply federally for PR.', pa: 'ਕਿਊਬੈਕ ਦਾ ਵੱਖਰਾ ਸਿਸਟਮ ਹੈ: ਪਹਿਲਾਂ CSQ ਲਓ, ਫਿਰ ਫੈਡਰਲ PR ਅਪਲਾਈ ਕਰੋ।' } },
  { cat: 'pnp', q: { en: 'Do I need French to immigrate to Quebec?', pa: 'ਕੀ ਕਿਊਬੈਕ ਜਾਣ ਲਈ ਫ੍ਰੈਂਚ ਜ਼ਰੂਰੀ ਹੈ?' }, a: { en: 'Practically yes—PSTQ requires oral French 7 and written French 5 (NCLC 7 / 5 equivalent).', pa: 'ਹਾਂ, PSTQ ਲਈ ਮੌਖਿਕ 7 ਅਤੇ ਲਿਖਤੀ 5 ਪੱਧਰ ਦੀ ਫ੍ਰੈਂਚ ਲਗਭਗ ਲਾਜ਼ਮੀ ਹੈ।' } },
  { cat: 'pnp', q: { en: 'What happened to Quebec’s PEQ program in 2026?', pa: '2026 ਵਿੱਚ ਕਿਊਬੈਕ ਦੇ PEQ ਪ੍ਰੋਗਰਾਮ ਦਾ ਕੀ ਬਣਿਆ?' }, a: { en: 'Quebec abolished the PEQ in late 2025; candidates must now apply through the Skilled Worker Selection Program (PSTQ) via Arrima with strong French.', pa: 'ਕਿਊਬੈਕ ਨੇ PEQ ਬੰਦ ਕਰ ਦਿੱਤਾ ਹੈ; ਹੁਣ ਉਮੀਦਵਾਰ Arrima ਰਾਹੀਂ PSTQ ਵਿੱਚ ਅਪਲਾਈ ਕਰਦੇ ਹਨ।' } },
  { cat: 'pnp', q: { en: 'How long does non-Express Entry (base) PNP take?', pa: 'ਨਾਨ-ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ PNP ਨੂੰ ਕਿੰਨਾ ਸਮਾਂ ਲੱਗਦਾ ਹੈ?' }, a: { en: 'Typically 12–20 months at the federal stage after receiving provincial nomination, compared to ~6 months for Express Entry PNPs.', pa: 'ਨਾਮਜ਼ਦਗੀ ਤੋਂ ਬਾਅਦ ਫੈਡਰਲ ਪੱਧਰ ’ਤੇ ਆਮ ਤੌਰ ’ਤੇ 12–20 ਮਹੀਨੇ ਲੱਗਦੇ ਹਨ।' } },

  // REGIONAL, STUDY, FAMILY, CLOSED (10)
  { cat: 'regional', q: { en: 'What is the Atlantic Immigration Program (AIP)?', pa: 'ਅਟਲਾਂਟਿਕ ਇਮੀਗ੍ਰੇਸ਼ਨ ਪ੍ਰੋਗਰਾਮ (AIP) ਕੀ ਹੈ?' }, a: { en: 'An employer-driven PR pathway (~4,000/year) for NB, NS, PEI, and NL covering TEER 0–4 jobs with CLB 4–5 and a designated employer job offer.', pa: 'NB, NS, PEI, NL ਲਈ TEER 0–4 ਨੌਕਰੀਆਂ (CLB 4–5) ਵਾਲਾ ਪ੍ਰੋਗਰਾਮ (~4,000/ਸਾਲ)।' } },
  { cat: 'regional', q: { en: 'What replaced the old RNIP pilot?', pa: 'ਪੁਰਾਣੇ RNIP ਪਾਇਲਟ ਦੀ ਥਾਂ ਕਿਸ ਨੇ ਲਈ ਹੈ?' }, a: { en: 'RNIP ended 31 Aug 2024 and was replaced by RCIP (14 rural communities) and FCIP (6 Francophone communities).', pa: 'RNIP 31 ਅਗਸਤ 2024 ਨੂੰ ਖਤਮ ਹੋਇਆ। ਇਸਦੀ ਥਾਂ RCIP (14 ਕਸਬੇ) ਅਤੇ FCIP (6 ਫ੍ਰੈਂਚ ਕਸਬੇ) ਨੇ ਲਈ।' } },
  { cat: 'regional', q: { en: 'Are the Home Care Worker pilots open?', pa: 'ਕੀ Home Care Worker ਪਾਇਲਟ ਖੁੱਲ੍ਹੇ ਹਨ?' }, a: { en: 'No. Home Care Worker pilots closed on 19 December 2025.', pa: 'ਨਹੀਂ, ਇਹ 19 ਦਸੰਬਰ 2025 ਨੂੰ ਬੰਦ ਹੋ ਗਏ ਸਨ।' } },
  { cat: 'regional', q: { en: 'Is the Agri-Food Pilot still open?', pa: 'ਕੀ Agri-Food Pilot ਹਾਲੇ ਖੁੱਲ੍ਹਾ ਹੈ?' }, a: { en: 'No. The Agri-Food Pilot ended on 14 May 2025.', pa: 'ਨਹੀਂ, ਇਹ 14 ਮਈ 2025 ਨੂੰ ਖਤਮ ਹੋ ਗਿਆ ਸੀ।' } },
  { cat: 'regional', q: { en: 'Is the Start-up Visa open in 2026?', pa: 'ਕੀ Start-up Visa 2026 ਵਿੱਚ ਖੁੱਲ੍ਹਾ ਹੈ?' }, a: { en: 'No. The federal Start-up Visa program is paused.', pa: 'ਨਹੀਂ, Start-up Visa ਰੋਕਿਆ (Paused) ਹੋਇਆ ਹੈ।' } },
  { cat: 'regional', q: { en: 'How does the Study → PGWP → PR pathway work?', pa: 'Study → PGWP → PR ਰਸਤਾ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ?' }, a: { en: 'Complete a PGWP-eligible program at a DLI (meeting language & field rules), work 1+ year in TEER 0–3 on your PGWP, then apply via CEC or PNP.', pa: 'PGWP-ਯੋਗ ਕਾਲਜ ਤੋਂ ਪੜ੍ਹਾਈ ਪੂਰੀ ਕਰਕੇ 1+ ਸਾਲ TEER 0–3 ਕੰਮ ਕਰੋ, ਫਿਰ CEC ਜਾਂ PNP ਅਪਲਾਈ ਕਰੋ।' } },
  { cat: 'regional', q: { en: 'Can a Canadian Citizen or PR sponsor their spouse?', pa: 'ਕੀ ਕੈਨੇਡੀਅਨ ਨਾਗਰਿਕ ਜਾਂ PR ਆਪਣੇ ਜੀਵਨ ਸਾਥੀ ਨੂੰ ਸਪਾਂਸਰ ਕਰ ਸਕਦਾ ਹੈ?' }, a: { en: 'Yes, via Inland or Outland spousal sponsorship with no minimum income threshold in most cases.', pa: 'ਹਾਂ, ਕੈਨੇਡਾ ਅੰਦਰੋਂ ਜਾਂ ਬਾਹਰੋਂ ਸਪਾਂਸਰ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ।' } },
  { cat: 'regional', q: { en: 'How can I bring my parents or grandparents to Canada?', pa: 'ਮੈਂ ਆਪਣੇ ਮਾਪਿਆਂ ਜਾਂ ਦਾਦਾ-ਦਾਦੀ ਨੂੰ ਕੈਨੇਡਾ ਕਿਵੇਂ ਬੁਲਾ ਸਕਦਾ ਹਾਂ?' }, a: { en: 'Through the Parents & Grandparents Program (PGP) when IRCC sends invitations, or a Super Visa (allows stays up to 5 years at a time).', pa: 'PGP ਸੱਦਾ ਖੁੱਲ੍ਹਣ ’ਤੇ PR ਲਈ, ਜਾਂ 5 ਸਾਲ ਤੱਕ ਰਹਿਣ ਲਈ Super Visa ਰਾਹੀਂ।' } },
  { cat: 'regional', q: { en: 'Do tradespeople need a Red Seal for FSTP?', pa: 'ਕੀ FSTP ਲਈ Red Seal ਜ਼ਰੂਰੀ ਹੈ?' }, a: { en: 'You need EITHER a Canadian provincial/territorial Certificate of Qualification (such as Red Seal) OR a valid 1-year full-time skilled trade job offer.', pa: 'ਤੁਹਾਡੇ ਕੋਲ ਜਾਂ ਤਾਂ ਕੈਨੇਡੀਅਨ ਟ੍ਰੇਡ ਸਰਟੀਫਿਕੇਟ (ਜਿਵੇਂ Red Seal) ਹੋਵੇ ਜਾਂ 1 ਸਾਲ ਦਾ ਪੱਕਾ ਜੌਬ ਆਫਰ।' } },
  { cat: 'regional', q: { en: 'Are there PR options for TEER 4 and TEER 5 workers?', pa: 'ਕੀ TEER 4 ਅਤੇ 5 ਕਾਮਿਆਂ ਲਈ ਕੋਈ PR ਰਸਤਾ ਹੈ?' }, a: { en: 'Yes: AIP (includes TEER 4), RCIP/FCIP, Yukon Critical Impact Worker, NWT Entry-Level, and select employer-driven streams.', pa: 'ਹਾਂ: AIP (TEER 4), RCIP/FCIP, ਯੂਕੋਨ Critical Impact ਅਤੇ NWT ਸਟ੍ਰੀਮਾਂ।' } },

  // DOCS, FEES & FRAUD (10)
  { cat: 'docs', q: { en: 'How much are official IRCC PR fees in 2026?', pa: '2026 ਵਿੱਚ ਸਰਕਾਰੀ PR ਫੀਸ ਕਿੰਨੀ ਹੈ?' }, a: { en: 'Principal applicant: $950 processing + $575 Right of Permanent Residence Fee ($1,525 total) + $85 biometrics. Spouse: $1,525. Dependent child: $260.', pa: 'ਮੁੱਖ ਬਿਨੈਕਾਰ: $950 + $575 ($1,525) + $85 ਬਾਇਓਮੈਟ੍ਰਿਕਸ। ਜੀਵਨ ਸਾਥੀ: $1,525। ਬੱਚਾ: $260।' } },
  { cat: 'docs', q: { en: 'How long does Express Entry PR processing take after AOR?', pa: 'AOR ਤੋਂ ਬਾਅਦ ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਨੂੰ ਕਿੰਨਾ ਸਮਾਂ ਲੱਗਦਾ ਹੈ?' }, a: { en: 'IRCC’s standard target is 5–6 months for complete Express Entry applications.', pa: 'ਪੂਰੀ ਅਰਜ਼ੀ ਤੋਂ ਬਾਅਦ ਆਮ ਤੌਰ ’ਤੇ 5–6 ਮਹੀਨੇ ਲੱਗਦੇ ਹਨ।' } },
  { cat: 'docs', q: { en: 'What must be included in an employer reference letter?', pa: 'ਕੰਮ ਦੇ ਤਜਰਬੇ ਵਾਲੀ ਚਿੱਠੀ ਵਿੱਚ ਕੀ ਹੋਣਾ ਜ਼ਰੂਰੀ ਹੈ?' }, a: { en: 'Company letterhead, your name, job title, exact dates, hours/week, annual salary/benefits, detailed main duties matching your NOC, and manager signature/contact.', pa: 'ਕੰਪਨੀ ਲੈਟਰਹੈੱਡ, ਅਹੁਦਾ, ਮਿਤੀਆਂ, ਹਫ਼ਤੇ ਦੇ ਘੰਟੇ, ਤਨਖਾਹ, NOC ਅਨੁਸਾਰ ਮੁੱਖ ਡਿਊਟੀਆਂ ਅਤੇ ਦਸਤਖਤ।' } },
  { cat: 'docs', q: { en: 'Can an agent sell an LMIA or guaranteed job offer?', pa: 'ਕੀ ਕੋਈ ਏਜੰਟ LMIA ਜਾਂ ਪੱਕੀ ਨੌਕਰੀ ਵੇਚ ਸਕਦਾ ਹੈ?' }, a: { en: 'NO! Buying or selling an LMIA or job offer is illegal under Canadian law and leads to refusal plus a 5-year ban.', pa: 'ਨਹੀਂ! LMIA ਜਾਂ ਜੌਬ ਆਫਰ ਵੇਚਣਾ-ਖਰੀਦਣਾ ਗੈਰ-ਕਾਨੂੰਨੀ ਹੈ ਅਤੇ 5 ਸਾਲ ਦਾ ਬੈਨ ਲੱਗ ਸਕਦਾ ਹੈ।' } },
  { cat: 'docs', q: { en: 'Can any consultant guarantee Canada PR?', pa: 'ਕੀ ਕੋਈ ਸਲਾਹਕਾਰ PR ਦੀ ਗਾਰੰਟੀ ਦੇ ਸਕਦਾ ਹੈ?' }, a: { en: 'No. Only IRCC officers decide PR applications. Any "100% PR guarantee" is a red flag for fraud.', pa: 'ਨਹੀਂ। ਸਿਰਫ਼ IRCC ਹੀ PR ਦਿੰਦਾ ਹੈ। 100% ਗਾਰੰਟੀ ਦਾ ਦਾਅਵਾ ਧੋਖਾ ਹੈ।' } },
  { cat: 'docs', q: { en: 'How do I verify if an immigration consultant is licensed?', pa: 'ਮੈਂ ਕਿਵੇਂ ਜਾਂਚ ਕਰਾਂ ਕਿ ਸਲਾਹਕਾਰ ਲਾਇਸੰਸਸ਼ੁਦਾ ਹੈ?' }, a: { en: 'Look up their name or R-number in the public register of the College of Immigration and Citizenship Consultants (college-ic.ca).', pa: 'college-ic.ca ’ਤੇ ਜਾ ਕੇ ਉਨ੍ਹਾਂ ਦਾ ਨਾਮ ਜਾਂ R-ਨੰਬਰ ਚੈੱਕ ਕਰੋ।' } },
  { cat: 'docs', q: { en: 'What is misrepresentation and what happens if caught?', pa: 'Misrepresentation ਕੀ ਹੁੰਦੀ ਹੈ ਅਤੇ ਇਸਦੀ ਕੀ ਸਜ਼ਾ ਹੈ?' }, a: { en: 'Providing false information or fake documents (even by an agent on your behalf). Penalty: automatic refusal + 5-year inadmissibility ban.', pa: 'ਝੂਠੀ ਜਾਣਕਾਰੀ ਜਾਂ ਨਕਲੀ ਦਸਤਾਵੇਜ਼ ਦੇਣਾ। ਸਜ਼ਾ: ਅਰਜ਼ੀ ਰੱਦ + 5 ਸਾਲ ਦਾ ਬੈਨ।' } },
  { cat: 'docs', q: { en: 'What if my previous employer closed down and cannot sign a letter?', pa: 'ਜੇ ਮੇਰੀ ਪੁਰਾਣੀ ਕੰਪਨੀ ਬੰਦ ਹੋ ਗਈ ਹੈ ਤਾਂ ਤਜਰਬਾ ਕਿਵੇਂ ਸਾਬਤ ਕਰਾਂ?' }, a: { en: 'Submit an explanation letter, company closure proof, offer letter, pay stubs, tax returns (T4/ITR), bank statements, and a colleague’s notarized declaration with ID.', pa: 'ਵਿਆਖਿਆ ਪੱਤਰ, ਪੇ-ਸਲਿੱਪ, ਟੈਕਸ ਰਿਟਰਨ, ਬੈਂਕ ਸਟੇਟਮੈਂਟ ਅਤੇ ਸਾਥੀ ਦਾ ਹਲਫ਼ੀਆ ਬਿਆਨ ਦਿਓ।' } },
  { cat: 'docs', q: { en: 'Which countries require police clearance certificates?', pa: 'ਮੈਨੂੰ ਕਿਹੜੇ ਦੇਸ਼ਾਂ ਦਾ ਪੁਲਿਸ ਸਰਟੀਫਿਕੇਟ ਚਾਹੀਦਾ ਹੈ?' }, a: { en: 'Every country/territory where you have lived for 6 consecutive months or more since turning 18.', pa: '18 ਸਾਲ ਦੀ ਉਮਰ ਤੋਂ ਬਾਅਦ ਜਿੱਥੇ ਵੀ ਤੁਸੀਂ ਲਗਾਤਾਰ 6 ਮਹੀਨੇ ਜਾਂ ਵੱਧ ਰਹੇ ਹੋ।' } },
  { cat: 'docs', q: { en: 'Can I keep working in Canada while waiting for PR approval?', pa: 'PR ਦੀ ਉਡੀਕ ਵਿੱਚ ਕੀ ਮੈਂ ਕੈਨੇਡਾ ਵਿੱਚ ਕੰਮ ਜਾਰੀ ਰੱਖ ਸਕਦਾ ਹਾਂ?' }, a: { en: 'Yes—once you receive your PR AOR inside Canada and your work permit expires within 4 months, you can usually apply for a Bridging Open Work Permit (BOWP).', pa: 'ਹਾਂ, ਕੈਨੇਡਾ ਅੰਦਰ AOR ਮਿਲਣ ’ਤੇ ਤੁਸੀਂ Bridging Open Work Permit (BOWP) ਅਪਲਾਈ ਕਰ ਸਕਦੇ ਹੋ।' } }
];

export const PLAN_TEMPLATES: Record<string, PlanTemplate> = {
  cec: {
    id: 'cec',
    name: { en: 'Express Entry — CEC (Inside Canada)', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ — CEC' },
    timeline: { en: '~6–9 months end-to-end', pa: '~6–9 ਮਹੀਨੇ' },
    steps: [
      { id: 'cec1', en: 'Confirm 1+ yr (1,560 hrs) skilled Canadian work (TEER 0–3) in last 3 years', pa: 'ਪਿਛਲੇ 3 ਸਾਲਾਂ ਵਿੱਚ 1+ ਸਾਲ ਕੈਨੇਡੀਅਨ TEER 0–3 ਕੰਮ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ' },
      { id: 'cec2', en: 'Pass English/French test (CLB 7+ for TEER 0/1; CLB 5+ for TEER 2/3)', pa: 'ਭਾਸ਼ਾ ਟੈਸਟ ਪਾਸ ਕਰੋ (TEER 0/1 ਲਈ CLB 7; TEER 2/3 ਲਈ CLB 5)' },
      { id: 'cec3', en: 'Collect employer reference letters with NOC duties, pay stubs, T4s, and NOAs', pa: 'ਕੰਪਨੀ ਰੈਫਰੈਂਸ ਲੈਟਰ, T4 ਅਤੇ NOA ਇਕੱਠੇ ਕਰੋ' },
      { id: 'cec4', en: 'Optional: Get ECA for foreign degrees & check Labour Market Integration CRS', pa: 'ਵਿਦੇਸ਼ੀ ਡਿਗਰੀ ਲਈ ECA ਅਤੇ ਲੇਬਰ ਮਾਰਕੀਟ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਅੰਕ ਚੈੱਕ ਕਰੋ' },
      { id: 'cec5', en: 'Create Express Entry profile on canada.ca', pa: 'canada.ca ’ਤੇ ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ' },
      { id: 'cec6', en: 'Receive ITA → Upload police certificates, upfront medical & PR docs within 60 days', pa: 'ITA ਮਿਲਣ ’ਤੇ 60 ਦਿਨਾਂ ਵਿੱਚ ਪੁਲਿਸ, ਮੈਡੀਕਲ ਅਤੇ PR ਦਸਤਾਵੇਜ਼ ਅੱਪਲੋਡ ਕਰੋ' }
    ]
  },
  fswp: {
    id: 'fswp',
    name: { en: 'Express Entry — FSWP (Outside / Skilled Worker)', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ — FSWP' },
    timeline: { en: '~8–14 months end-to-end', pa: '~8–14 ਮਹੀਨੇ' },
    steps: [
      { id: 'fsw1', en: 'Verify 1 yr continuous full-time skilled work (TEER 0–3) in 1 primary NOC', pa: '1 ਸਾਲ ਲਗਾਤਾਰ TEER 0–3 ਕੰਮ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ' },
      { id: 'fsw2', en: 'Score minimum CLB 7 in all 4 skills (target CLB 9+ for competitive CRS)', pa: 'ਚਾਰੋਂ ਹੁਨਰਾਂ ਵਿੱਚ ਘੱਟੋ-ਘੱਟ CLB 7 (ਟੀਚਾ CLB 9+) ਲਓ' },
      { id: 'fsw3', en: 'Complete ECA (WES/ICAS/CES/IQAS) for highest foreign education', pa: 'ਵਿਦੇਸ਼ੀ ਪੜ੍ਹਾਈ ਲਈ ECA (WES ਆਦਿ) ਕਰਵਾਓ' },
      { id: 'fsw4', en: 'Verify 67/100 points on the FSWP selection grid', pa: 'FSWP ਗਰਿੱਡ ਵਿੱਚ 67/100 ਅੰਕ ਚੈੱਕ ਕਰੋ' },
      { id: 'fsw5', en: 'Prepare liquid Proof of Funds ($14,690+ single CAD) with 6-mo bank history', pa: 'ਬੈਂਕ ਵਿੱਚ ਲੋੜੀਂਦੇ ਸੈਟਲਮੈਂਟ ਫੰਡ ($14,690+ ਇੱਕਲੇ ਲਈ) ਤਿਆਰ ਰੱਖੋ' },
      { id: 'fsw6', en: 'Submit Express Entry profile & prepare police/medical docs for ITA', pa: 'ਪ੍ਰੋਫਾਈਲ ਜਮ੍ਹਾਂ ਕਰੋ ਅਤੇ ITA ਲਈ ਦਸਤਾਵੇਜ਼ ਤਿਆਰ ਕਰੋ' }
    ]
  },
  pnp: {
    id: 'pnp',
    name: { en: 'Provincial Nominee Program (PNP +600 CRS)', pa: 'ਸੂਬਾਈ ਨਾਮਜ਼ਦਗੀ ਪ੍ਰੋਗਰਾਮ (PNP)' },
    timeline: { en: '~10–20 months end-to-end', pa: '~10–20 ਮਹੀਨੇ' },
    steps: [
      { id: 'pnp1', en: 'Choose target province (check 2026 quota & open streams)', pa: '2026 ਕੋਟੇ ਅਤੇ ਖੁੱਲ੍ਹੀਆਂ ਸਟ੍ਰੀਮਾਂ ਅਨੁਸਾਰ ਸੂਬਾ ਚੁਣੋ' },
      { id: 'pnp2', en: 'Pass language test (CLB 4–7) & complete ECA if foreign education', pa: 'ਭਾਸ਼ਾ ਟੈਸਟ ਅਤੇ ECA ਪੂਰਾ ਕਰੋ' },
      { id: 'pnp3', en: 'Create Express Entry profile first (for EE-aligned PNP streams)', pa: 'ਪਹਿਲਾਂ ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ' },
      { id: 'pnp4', en: 'Submit provincial EOI & wait for LAA / NOI invitation', pa: 'ਸੂਬੇ ਦੇ ਪੋਰਟਲ ’ਤੇ EOI ਬਣਾਓ ਅਤੇ ਸੱਦੇ ਦੀ ਉਡੀਕ ਕਰੋ' },
      { id: 'pnp5', en: 'Submit provincial nomination forms → Accept +600 CRS points', pa: 'ਸੂਬਾਈ ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰੋ → +600 CRS ਅੰਕ ਸਵੀਕਾਰ ਕਰੋ' },
      { id: 'pnp6', en: 'Receive federal ITA & file complete PR application within 60 days', pa: 'ਫੈਡਰਲ ITA ਮਿਲਣ ’ਤੇ 60 ਦਿਨਾਂ ਵਿੱਚ PR ਅਰਜ਼ੀ ਭੇਜੋ' }
    ]
  },
  french: {
    id: 'french',
    name: { en: 'French-Speaking Category / FCIP / Quebec', pa: 'ਫ੍ਰੈਂਚ ਭਾਸ਼ਾ ਮਾਰਗ' },
    timeline: { en: '~6–14 months end-to-end', pa: '~6–14 ਮਹੀਨੇ' },
    steps: [
      { id: 'fr1', en: 'Pass TEF Canada or TCF Canada (NCLC 7+ for EE/Quebec; NCLC 5+ for FCIP)', pa: 'TEF ਜਾਂ TCF ਕੈਨੇਡਾ ਪਾਸ ਕਰੋ (NCLC 7+ / FCIP ਲਈ 5)' },
      { id: 'fr2', en: 'Also pass IELTS/CELPIP (CLB 5+) to unlock +50 bilingual CRS bonus', pa: 'ਪੂਰੇ +50 ਅੰਕਾਂ ਲਈ ਅੰਗਰੇਜ਼ੀ (CLB 5+) ਟੈਸਟ ਵੀ ਦਿਓ' },
      { id: 'fr3', en: 'Get ECA & gather skilled work experience letters', pa: 'ECA ਅਤੇ ਕੰਮ ਦੇ ਰੈਫਰੈਂਸ ਲੈਟਰ ਲਓ' },
      { id: 'fr4', en: 'Apply via Express Entry French draws (~407 CRS), Quebec Arrima (PSTQ), or FCIP', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ, ਕਿਊਬੈਕ Arrima, ਜਾਂ FCIP ਵਿੱਚ ਅਪਲਾਈ ਕਰੋ' }
    ]
  },
  study: {
    id: 'study',
    name: { en: 'Study → PGWP → CEC/PNP Route', pa: 'ਪੜ੍ਹਾਈ → PGWP → PR ਮਾਰਗ' },
    timeline: { en: '~3–4 years total journey', pa: '~3–4 ਸਾਲ ਕੁੱਲ ਸਮਾਂ' },
    steps: [
      { id: 'st1', en: 'Pick a PGWP-eligible DLI program (check field-of-study & public college rules)', pa: 'PGWP-ਯੋਗ DLI ਕਾਲਜ/ਯੂਨੀਵਰਸਿਟੀ ਚੁਣੋ' },
      { id: 'st2', en: 'Get Provincial Attestation Letter (PAL) & Study Permit', pa: 'PAL ਲਓ ਅਤੇ ਸਟੱਡੀ ਪਰਮਿਟ ਅਪਲਾਈ ਕਰੋ' },
      { id: 'st3', en: 'Graduate & meet PGWP language test (CLB 7 university / CLB 5 college)', pa: 'ਪੜ੍ਹਾਈ ਪੂਰੀ ਕਰਕੇ PGWP ਭਾਸ਼ਾ ਟੈਸਟ ਪਾਸ ਕਰੋ' },
      { id: 'st4', en: 'Work 1+ year full-time in TEER 0–3 on PGWP', pa: 'PGWP ’ਤੇ 1+ ਸਾਲ TEER 0–3 ਕੰਮ ਕਰੋ' },
      { id: 'st5', en: 'Apply for PR via CEC or provincial graduate PNP', pa: 'CEC ਜਾਂ ਸੂਬਾਈ PNP ਰਾਹੀਂ PR ਅਪਲਾਈ ਕਰੋ' }
    ]
  },
  aip: {
    id: 'aip',
    name: { en: 'Atlantic / Rural Community (AIP / RCIP)', pa: 'ਅਟਲਾਂਟਿਕ / ਪੇਂਡੂ ਪ੍ਰੋਗਰਾਮ (AIP / RCIP)' },
    timeline: { en: '~8–14 months end-to-end', pa: '~8–14 ਮਹੀਨੇ' },
    steps: [
      { id: 'ai1', en: 'Secure job offer from Designated Employer in NB/NS/PEI/NL (AIP) or 14 RCIP towns', pa: 'ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਰੁਜ਼ਗਾਰਦਾਤਾ (AIP ਜਾਂ 14 RCIP ਕਸਬੇ) ਤੋਂ ਆਫਰ ਲਓ' },
      { id: 'ai2', en: 'Pass language test (CLB 4–5+) & obtain ECA if foreign degree', pa: 'ਭਾਸ਼ਾ ਟੈਸਟ (CLB 4–5+) ਅਤੇ ECA ਪੂਰਾ ਕਰੋ' },
      { id: 'ai3', en: 'Employer secures Provincial Endorsement (AIP) or Community Recommendation (RCIP)', pa: 'ਰੁਜ਼ਗਾਰਦਾਤਾ ਤੋਂ ਸੂਬਾਈ/ਕਮਿਊਨਿਟੀ ਸਿਫਾਰਸ਼ ਲਓ' },
      { id: 'ai4', en: 'Submit federal PR application (plus optional work permit)', pa: 'ਫੈਡਰਲ PR ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰੋ' }
    ]
  }
};
