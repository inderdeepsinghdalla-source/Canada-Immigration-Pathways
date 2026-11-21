import { PNP_PROVINCES } from '../data/immigrationData';
import {
  ActionPlanItem,
  BiText,
  CrsBreakdown,
  CrsInput,
  EducationLevel,
  EligibilityProfile,
  PathwayEvaluation,
  WizardState
} from '../types';

export function getRequiredFunds(familySize: number): number {
  const table: Record<number, number> = {
    1: 14690,
    2: 18288,
    3: 22483,
    4: 27297,
    5: 30960,
    6: 34917,
    7: 38875
  };
  if (familySize <= 1) return 14690;
  if (familySize <= 7) return table[familySize];
  return 38875 + (familySize - 7) * 3958;
}

function getAgePoints(age: number, married: boolean): number {
  const singleTable: Record<number, number> = {
    18: 99, 19: 105, 20: 110, 21: 110, 22: 110, 23: 110, 24: 110, 25: 110, 26: 110, 27: 110, 28: 110, 29: 110,
    30: 105, 31: 99, 32: 94, 33: 88, 34: 83, 35: 77, 36: 72, 37: 66, 38: 61, 39: 55, 40: 50, 41: 39, 42: 28, 43: 17, 44: 6
  };
  const marriedTable: Record<number, number> = {
    18: 90, 19: 95, 20: 100, 21: 100, 22: 100, 23: 100, 24: 100, 25: 100, 26: 100, 27: 100, 28: 100, 29: 100,
    30: 95, 31: 90, 32: 85, 33: 80, 34: 75, 35: 70, 36: 65, 37: 60, 38: 55, 39: 50, 40: 45, 41: 35, 42: 25, 43: 15, 44: 5
  };
  if (age < 18 || age >= 45) return 0;
  return married ? (marriedTable[age] ?? 0) : (singleTable[age] ?? 0);
}

function getEduPoints(edu: EducationLevel, married: boolean): number {
  const single: Record<EducationLevel, number> = { hs: 30, '1yr': 90, '2yr': 98, bach: 120, two: 128, mast: 135, phd: 150 };
  const withSpouse: Record<EducationLevel, number> = { hs: 28, '1yr': 84, '2yr': 91, bach: 112, two: 119, mast: 126, phd: 140 };
  return married ? withSpouse[edu] : single[edu];
}

function getSkillPoints(clb: number, married: boolean): number {
  if (clb >= 10) return married ? 32 : 34;
  if (clb === 9) return married ? 29 : 31;
  if (clb === 8) return married ? 22 : 23;
  if (clb === 7) return married ? 16 : 17;
  if (clb === 6) return married ? 8 : 9;
  if (clb === 5) return 6;
  if (clb === 4) return 6;
  return 0;
}

export function calculateCRS(input: CrsInput): CrsBreakdown {
  const m = input.married;
  const agePts = getAgePoints(input.age, m);
  const eduPts = getEduPoints(input.education, m);

  const l1Pts =
    getSkillPoints(input.l1Listening, m) +
    getSkillPoints(input.l1Reading, m) +
    getSkillPoints(input.l1Writing, m) +
    getSkillPoints(input.l1Speaking, m);

  let l2PerSkill = 0;
  if (input.l2MinClb >= 9) l2PerSkill = 6;
  else if (input.l2MinClb >= 7) l2PerSkill = 3;
  else if (input.l2MinClb >= 5) l2PerSkill = 1;
  const l2Pts = Math.min(m ? 22 : 24, l2PerSkill * 4);

  const cExpMapSingle: Record<number, number> = { 0: 0, 1: 40, 2: 53, 3: 64, 4: 72, 5: 80 };
  const cExpMapMarried: Record<number, number> = { 0: 0, 1: 35, 2: 46, 3: 56, 4: 63, 5: 70 };
  const cYrs = Math.min(5, Math.max(0, Math.floor(input.canadianWorkYears)));
  const canWorkPts = m ? cExpMapMarried[cYrs] : cExpMapSingle[cYrs];

  const coreHumanCapital = agePts + eduPts + l1Pts + l2Pts + canWorkPts;

  let spouseFactors = 0;
  if (m) {
    const spEdu: Record<EducationLevel, number> = { hs: 2, '1yr': 6, '2yr': 7, bach: 8, two: 9, mast: 10, phd: 10 };
    const spLang = input.spouseLangMin >= 9 ? 20 : input.spouseLangMin >= 7 ? 12 : input.spouseLangMin >= 5 ? 4 : 0;
    const spWorkMap: Record<number, number> = { 0: 0, 1: 5, 2: 7, 3: 8, 4: 9, 5: 10 };
    const spWork = spWorkMap[Math.min(5, Math.max(0, Math.floor(input.spouseCanWorkYears)))] ?? 0;
    spouseFactors = spEdu[input.spouseEducation] + spLang + spWork;
  }

  // Skill Transferability (Max 100)
  const minClb = Math.min(input.l1Listening, input.l1Reading, input.l1Writing, input.l1Speaking);
  const allClb9 = minClb >= 9;
  const allClb7 = minClb >= 7;
  const allClb5 = minClb >= 5;

  const isHigherEdu = input.education === 'two' || input.education === 'mast' || input.education === 'phd';
  const isPostSec = input.education !== 'hs';

  let eduLang = 0;
  if (isHigherEdu) eduLang = allClb9 ? 50 : allClb7 ? 25 : 0;
  else if (isPostSec) eduLang = allClb9 ? 25 : allClb7 ? 13 : 0;

  let eduCan = 0;
  if (isHigherEdu) eduCan = cYrs >= 2 ? 50 : cYrs >= 1 ? 25 : 0;
  else if (isPostSec) eduCan = cYrs >= 2 ? 25 : cYrs >= 1 ? 13 : 0;

  const eduSub = Math.min(50, eduLang + eduCan);

  const fYrs = Math.min(5, Math.max(0, Math.floor(input.foreignWorkYears)));
  let fLang = 0;
  if (fYrs >= 3) fLang = allClb9 ? 50 : allClb7 ? 25 : 0;
  else if (fYrs >= 1) fLang = allClb9 ? 25 : allClb7 ? 13 : 0;

  let fCan = 0;
  if (fYrs >= 3) fCan = cYrs >= 2 ? 50 : cYrs >= 1 ? 25 : 0;
  else if (fYrs >= 1) fCan = cYrs >= 2 ? 25 : cYrs >= 1 ? 13 : 0;

  const foreignSub = Math.min(50, fLang + fCan);
  const tradeSub = input.tradeCert ? (allClb7 ? 50 : allClb5 ? 25 : 0) : 0;

  const skillTransferability = Math.min(100, eduSub + foreignSub + tradeSub);

  // Additional Points (Max 600)
  let add = 0;
  if (input.pnpNomination) add += 600;
  add += input.integrationPoints; // New Nov 3, 2026 Labour Market Integration (0/50/100/150)
  if (input.canadianStudy === '3p') add += 30;
  else if (input.canadianStudy === '12') add += 15;
  if (input.frenchBonus === 'bilingual') add += 50;
  else if (input.frenchBonus === 'french_only') add += 25;
  if (input.siblingInCanada) add += 15;

  const additionalPoints = Math.min(600, add);
  const total = Math.min(1200, coreHumanCapital + spouseFactors + skillTransferability + additionalPoints);

  return { coreHumanCapital, spouseFactors, skillTransferability, additionalPoints, total };
}

export function calculateFSWP67(params: {
  age: number;
  edu: EducationLevel;
  l1MinClb: number;
  l2Clb5: boolean;
  skilledYears: number;
  arrangedJob: boolean;
  adaptabilityPts: number;
}): { total: number; pass: boolean } {
  const agePts =
    params.age >= 18 && params.age <= 35
      ? 12
      : params.age > 35 && params.age < 47
        ? 12 - (params.age - 35)
        : 0;
  const eduMap: Record<EducationLevel, number> = { hs: 5, '1yr': 15, '2yr': 19, bach: 21, two: 22, mast: 23, phd: 25 };
  const l1Pts = params.l1MinClb >= 9 ? 24 : params.l1MinClb === 8 ? 20 : params.l1MinClb === 7 ? 16 : 0;
  const l2Pts = params.l2Clb5 ? 4 : 0;
  const expPts =
    params.skilledYears >= 6 ? 15 : params.skilledYears >= 4 ? 13 : params.skilledYears >= 2 ? 11 : params.skilledYears >= 1 ? 9 : 0;
  const jobPts = params.arrangedJob ? 10 : 0;
  const adaptPts = Math.min(10, params.adaptabilityPts);
  const total = agePts + eduMap[params.edu] + l1Pts + l2Pts + expPts + jobPts + adaptPts;
  return { total, pass: total >= 67 && params.l1MinClb >= 7 };
}

export function evaluateAllPathways(p: EligibilityProfile): PathwayEvaluation[] {
  const results: PathwayEvaluation[] = [];
  const bestLang = Math.max(p.englishClb, p.frenchNclc);
  const famSize = p.spouse === 'single' ? 1 : 2;
  const reqFunds = getRequiredFunds(famSize);
  const hasSkilledOffer = p.jobOffer === 'skilled' || p.jobOffer === 'aip' || p.jobOffer === 'rcip';
  const totalSkilledYrs = (p.foreignTeer <= 3 ? p.foreignYears : 0) + (p.canadianTeer <= 3 ? p.canadianYears : 0);

  let adapt = 0;
  if (p.canadianStudy !== 'none') adapt += 5;
  if (p.canadianYears >= 1) adapt += 10;
  if (p.siblingInCanada) adapt += 5;
  if (hasSkilledOffer) adapt += 5;

  const fsw67 = calculateFSWP67({
    age: p.age,
    edu: p.education,
    l1MinClb: bestLang,
    l2Clb5: p.englishClb >= 5 && p.frenchNclc >= 5,
    skilledYears: totalSkilledYrs,
    arrangedJob: hasSkilledOffer,
    adaptabilityPts: adapt
  });

  // 1. FSWP
  const fswMiss: BiText[] = [];
  if (!((p.foreignYears >= 1 && p.foreignTeer <= 3) || (p.canadianYears >= 1 && p.canadianTeer <= 3))) {
    fswMiss.push({ en: '1 year continuous skilled work (TEER 0–3)', pa: '1 ਸਾਲ ਲਗਾਤਾਰ ਹੁਨਰਮੰਦ ਕੰਮ (TEER 0–3)' });
  }
  if (bestLang < 7) {
    fswMiss.push({ en: `Language CLB/NCLC 7+ (currently ${bestLang})`, pa: `ਭਾਸ਼ਾ CLB/NCLC 7+ (ਹੁਣ ${bestLang})` });
  }
  if (fsw67.total < 67) {
    fswMiss.push({ en: `67/100 FSWP grid points (currently ~${fsw67.total}/100)`, pa: `FSWP ਗਰਿੱਡ ਵਿੱਚ 67/100 ਅੰਕ (ਹੁਣ ~${fsw67.total})` });
  }
  if (p.fundsCad < reqFunds && !hasSkilledOffer) {
    fswMiss.push({ en: `$${reqFunds.toLocaleString()} CAD proof of funds`, pa: `$${reqFunds.toLocaleString()} CAD ਬੈਂਕ ਫੰਡ` });
  }
  if (p.age < 18) fswMiss.push({ en: 'Age 18+', pa: 'ਉਮਰ 18+' });

  results.push({
    id: 'fswp',
    name: { en: `Express Entry — FSWP (Grid: ${fsw67.total}/100)`, pa: `ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ — FSWP (${fsw67.total}/100)` },
    category: { en: 'Federal Express Entry', pa: 'ਫੈਡਰਲ ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ' },
    status: fswMiss.length === 0 ? 'eligible' : fswMiss.length <= 2 && bestLang >= 5 ? 'almost' : 'not',
    summary:
      fswMiss.length === 0
        ? { en: `Meets all FSWP minimums (${fsw67.total}/100). Eligible for general or category draws.`, pa: `ਸਾਰੀਆਂ FSWP ਸ਼ਰਤਾਂ ਪੂਰੀਆਂ (${fsw67.total}/100)।` }
        : { en: 'Close or missing minimum requirements for FSWP.', pa: 'FSWP ਲਈ ਕੁਝ ਜ਼ਰੂਰੀ ਸ਼ਰਤਾਂ ਬਾਕੀ ਹਨ।' },
    missing: fswMiss,
    planKey: 'fswp'
  });

  // 2. CEC
  const cecMiss: BiText[] = [];
  if (p.canadianYears < 1 || p.canadianTeer > 3) {
    cecMiss.push({ en: '1 year Canadian skilled work (TEER 0–3) in last 3 years', pa: 'ਪਿਛਲੇ 3 ਸਾਲਾਂ ਵਿੱਚ 1 ਸਾਲ ਕੈਨੇਡੀਅਨ TEER 0–3 ਕੰਮ' });
  }
  const reqCecLang = p.canadianTeer <= 1 ? 7 : 5;
  if (bestLang < reqCecLang) {
    cecMiss.push({ en: `CLB/NCLC ${reqCecLang}+ for TEER ${p.canadianTeer}`, pa: `TEER ${p.canadianTeer} ਲਈ CLB ${reqCecLang}+` });
  }
  results.push({
    id: 'cec',
    name: { en: 'Express Entry — CEC (No Funds Required)', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ — CEC (ਫੰਡ ਲੋੜ ਨਹੀਂ)' },
    category: { en: 'Federal Express Entry', pa: 'ਫੈਡਰਲ ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ' },
    status: cecMiss.length === 0 ? 'eligible' : (p.canadianYears > 0 && p.canadianTeer <= 3) || p.canadianStudy !== 'none' ? 'almost' : 'not',
    summary:
      cecMiss.length === 0
        ? { en: 'Eligible for CEC! Also qualifies for Nov 2026 Labour Market Integration points.', pa: 'CEC ਲਈ ਯੋਗ! ਨਵੇਂ ਲੇਬਰ ਮਾਰਕੀਟ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਅੰਕਾਂ ਦਾ ਵੀ ਲਾਭ।' }
        : { en: 'Needs Canadian TEER 0–3 work experience and required CLB.', pa: 'ਕੈਨੇਡੀਅਨ ਕੰਮ ਦਾ ਤਜਰਬਾ ਅਤੇ ਲੋੜੀਂਦਾ CLB ਚਾਹੀਦਾ ਹੈ।' },
    missing: cecMiss,
    planKey: 'cec'
  });

  // 3. FSTP
  const fstpMiss: BiText[] = [];
  const tradeExp = (p.foreignTeer === 2 || p.foreignTeer === 3 ? p.foreignYears : 0) + (p.canadianTeer === 2 || p.canadianTeer === 3 ? p.canadianYears : 0);
  if (tradeExp < 2) fstpMiss.push({ en: '2 years skilled trades experience (TEER 2/3) in last 5 yrs', pa: 'ਪਿਛਲੇ 5 ਸਾਲਾਂ ਵਿੱਚ 2 ਸਾਲ ਟ੍ਰੇਡਜ਼ ਤਜਰਬਾ' });
  if (bestLang < 5) fstpMiss.push({ en: 'CLB 5 speaking/listening & CLB 4 reading/writing', pa: 'CLB 5 ਬੋਲਣਾ/ਸੁਣਨਾ ਅਤੇ CLB 4 ਪੜ੍ਹਨਾ/ਲਿਖਣਾ' });
  if (!hasSkilledOffer && p.jobOffer !== 'trade_cert') {
    fstpMiss.push({ en: '1-year job offer OR Canadian Certificate of Qualification (Red Seal)', pa: '1-ਸਾਲ ਦਾ ਜੌਬ ਆਫਰ ਜਾਂ Red Seal ਸਰਟੀਫਿਕੇਟ' });
  }
  results.push({
    id: 'fstp',
    name: { en: 'Express Entry — FSTP (Skilled Trades)', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ — FSTP (ਟ੍ਰੇਡਜ਼)' },
    category: { en: 'Federal Express Entry', pa: 'ਫੈਡਰਲ ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ' },
    status: fstpMiss.length === 0 ? 'eligible' : fstpMiss.length === 1 && tradeExp >= 1 ? 'almost' : 'not',
    summary:
      fstpMiss.length === 0
        ? { en: 'Meets FSTP requirements and eligible for Trades category draws.', pa: 'FSTP ਅਤੇ ਟ੍ਰੇਡਜ਼ ਸ਼੍ਰੇਣੀ ਡਰਾਅ ਲਈ ਯੋਗ।' }
        : { en: 'Trades pathway requires 2 yrs trades experience + offer/certificate.', pa: '2 ਸਾਲ ਟ੍ਰੇਡ ਤਜਰਬਾ ਅਤੇ ਆਫਰ/ਸਰਟੀਫਿਕੇਟ ਜ਼ਰੂਰੀ ਹੈ।' },
    missing: fstpMiss,
    planKey: 'fswp'
  });

  // 4. All 11 PNPs
  PNP_PROVINCES.forEach((prov) => {
    if (p.provincePref !== 'ANY' && p.provincePref !== 'QC' && p.provincePref !== prov.code) return;
    let status: PathwayEvaluation['status'] = 'not';
    let summary: BiText = { en: '', pa: '' };
    const missing: BiText[] = [];

    if (prov.code === 'SK') {
      if (bestLang >= 4 && totalSkilledYrs >= 1 && p.education !== 'hs') {
        status = 'almost';
        summary = {
          en: 'Profile meets 60/110 no-job-offer criteria, BUT 2026 SK allocation (5,261; ~76% issued) has effectively 0 spots left.',
          pa: 'ਬਿਨਾਂ ਜੌਬ ਆਫਰ 60/110 ਸ਼ਰਤਾਂ ਪੂਰੀਆਂ, ਪਰ 2026 ਕੋਟਾ ਲਗਭਗ ਖਤਮ ਹੋ ਚੁੱਕਾ ਹੈ।'
        };
        missing.push({ en: 'Wait for new 2027 SINP quota opening (or get SK job offer)', pa: '2027 ਦੇ ਨਵੇਂ SINP ਕੋਟੇ ਦੀ ਉਡੀਕ (ਜਾਂ SK ਜੌਬ ਆਫਰ)' });
      } else {
        summary = { en: 'Requires CLB 4+, 1+ yr skilled work, post-secondary education (and 2026 quota is full).', pa: 'CLB 4+, 1+ ਸਾਲ ਕੰਮ ਅਤੇ ਡਿਪਲੋਮਾ/ਡਿਗਰੀ ਜ਼ਰੂਰੀ।' };
        if (bestLang < 4) missing.push({ en: 'CLB 4+', pa: 'CLB 4+' });
        if (totalSkilledYrs < 1) missing.push({ en: '1+ yr skilled work', pa: '1+ ਸਾਲ ਹੁਨਰਮੰਦ ਕੰਮ' });
      }
    } else if (prov.code === 'AB') {
      if (hasSkilledOffer || (bestLang >= 7 && totalSkilledYrs >= 1 && (p.siblingInCanada || p.frenchNclc >= 7))) {
        status = 'eligible';
        summary = {
          en: 'Strong candidate for Alberta Express Entry (CRS 300+) or Opportunity Stream (only 495 spots left in 2026).',
          pa: 'ਅਲਬਰਟਾ Express Entry (CRS 300+) ਜਾਂ Opportunity ਲਈ ਯੋਗ (495 ਥਾਵਾਂ ਬਾਕੀ)।'
        };
      } else if (bestLang >= 5 && totalSkilledYrs >= 1) {
        status = 'almost';
        summary = { en: 'Meets baseline language & work; needs Alberta employer offer or Alberta family/sector link.', pa: 'ਅਲਬਰਟਾ ਜੌਬ ਆਫਰ ਜਾਂ ਪਰਿਵਾਰਕ/ਸੈਕਟਰ ਸੰਬੰਧ ਦੀ ਲੋੜ ਹੈ।' };
        missing.push({ en: 'Alberta job offer OR close Alberta family tie', pa: 'ਅਲਬਰਟਾ ਜੌਬ ਆਫਰ ਜਾਂ ਪਰਿਵਾਰਕ ਸੰਬੰਧ' });
      } else {
        summary = { en: 'Needs CLB 5+ and skilled experience / Alberta offer.', pa: 'CLB 5+ ਅਤੇ ਹੁਨਰਮੰਦ ਤਜਰਬਾ ਜ਼ਰੂਰੀ।' };
        missing.push({ en: 'CLB 5+ & Alberta offer/tie', pa: 'CLB 5+ ਅਤੇ ਅਲਬਰਟਾ ਆਫਰ' });
      }
    } else if (prov.code === 'ON') {
      if (hasSkilledOffer && bestLang >= 5) {
        status = 'eligible';
        summary = {
          en: 'Matches Ontario Workforce Priority (currently the ONLY OINP stream actively open).',
          pa: 'ਓਂਟਾਰੀਓ Workforce Priority (ਇਕਲੌਤੀ ਖੁੱਲ੍ਹੀ ਸਟ੍ਰੀਮ) ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ।'
        };
      } else if (bestLang >= 7 && totalSkilledYrs >= 1) {
        status = 'almost';
        summary = {
          en: 'Strong Human Capital/French profile, but currently only Ontario Workforce Priority job-offer pathways are open.',
          pa: 'ਵਧੀਆ ਪ੍ਰੋਫਾਈਲ, ਪਰ ਹੁਣ ਸਿਰਫ਼ Workforce Priority ਜੌਬ-ਆਫਰ ਸਟ੍ਰੀਮ ਖੁੱਲ੍ਹੀ ਹੈ।'
        };
        missing.push({ en: 'Ontario Workforce Priority employer job offer', pa: 'ਓਂਟਾਰੀਓ Workforce Priority ਜੌਬ ਆਫਰ' });
      } else {
        summary = { en: 'Needs Ontario Workforce Priority job offer and CLB 5+.', pa: 'ਓਂਟਾਰੀਓ Workforce Priority ਜੌਬ ਆਫਰ ਅਤੇ CLB 5+ ਜ਼ਰੂਰੀ।' };
        missing.push({ en: 'Ontario employer offer + CLB 5+', pa: 'ਓਂਟਾਰੀਓ ਆਫਰ + CLB 5+' });
      }
    } else if (prov.code === 'NS') {
      if (p.canadianYears >= 1 && p.canadianTeer <= 3 && bestLang >= 7) {
        status = 'almost';
        summary = {
          en: 'Qualifies for NS Experience: Express Entry ONLY if your 1 yr Canadian work was inside Nova Scotia.',
          pa: 'NS Experience Express Entry ਲਈ 1 ਸਾਲ ਕੰਮ ਨੋਵਾ ਸਕੋਸ਼ੀਆ ਦੇ ਅੰਦਰ ਹੋਣਾ ਜ਼ਰੂਰੀ ਹੈ।'
        };
        missing.push({ en: 'Confirm 1 yr skilled work was physically in Nova Scotia (or get NS job offer)', pa: 'ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ 1 ਸਾਲ ਕੰਮ NS ਵਿੱਚ ਸੀ (ਜਾਂ NS ਆਫਰ ਲਓ)' });
      } else if (hasSkilledOffer && bestLang >= 5) {
        status = 'eligible';
        summary = { en: 'Eligible for NS Skilled Worker with valid Nova Scotia employer offer.', pa: 'NS ਰੁਜ਼ਗਾਰਦਾਤਾ ਦੇ ਆਫਰ ਨਾਲ Skilled Worker ਲਈ ਯੋਗ।' };
      } else {
        summary = { en: 'Requires 1 yr NS work experience (for EE) or NS job offer.', pa: '1 ਸਾਲ NS ਕੰਮ ਜਾਂ NS ਜੌਬ ਆਫਰ ਜ਼ਰੂਰੀ।' };
        missing.push({ en: '1 yr NS work or NS job offer', pa: '1 ਸਾਲ NS ਕੰਮ ਜਾਂ ਆਫਰ' });
      }
    } else if (prov.code === 'NB') {
      if (hasSkilledOffer && bestLang >= 4) {
        status = 'eligible';
        summary = {
          en: 'Matches NB Skilled Worker / Express Entry / Critical Worker (CLB 4+ with NB employer offer).',
          pa: 'NB Skilled Worker ਜਾਂ Express Entry ਲਈ ਯੋਗ (NB ਜੌਬ ਆਫਰ + CLB 4+)।'
        };
      } else if ((p.frenchNclc >= 7 && totalSkilledYrs >= 1) || (bestLang >= 5 && totalSkilledYrs >= 1)) {
        status = 'almost';
        summary = {
          en: p.frenchNclc >= 7
            ? 'Strong NB Express Entry French-priority profile; watch NB EE intake windows or secure NB job offer.'
            : 'Meets NB base work/language criteria; needs an NB employer offer or NB Express Entry connection.',
          pa: p.frenchNclc >= 7
            ? 'ਫ੍ਰੈਂਚ NB Express Entry ਲਈ ਵਧੀਆ ਪ੍ਰੋਫਾਈਲ; NB EE ਵਿੰਡੋ ਜਾਂ ਜੌਬ ਆਫਰ ਦੀ ਲੋੜ ਹੈ।'
            : 'NB ਰੁਜ਼ਗਾਰਦਾਤਾ ਦਾ ਜੌਬ ਆਫਰ ਜਾਂ NB ਸੰਬੰਧ ਜ਼ਰੂਰੀ ਹੈ।'
        };
        missing.push({ en: 'NB employer job offer or NB Express Entry intake tie', pa: 'NB ਜੌਬ ਆਫਰ ਜਾਂ NB Express Entry ਸਬੰਧ' });
      } else {
        summary = { en: 'Needs CLB 4+, high school+, and NB job offer (or French NCLC 7+ EE).', pa: 'CLB 4+ ਅਤੇ NB ਜੌਬ ਆਫਰ ਜ਼ਰੂਰੀ।' };
        missing.push({ en: 'CLB 4+ and NB employer offer', pa: 'CLB 4+ ਅਤੇ NB ਆਫਰ' });
      }
    } else if (prov.code === 'NL') {
      if ((hasSkilledOffer && bestLang >= 4) || (bestLang >= 5 && totalSkilledYrs >= 1 && p.education !== 'hs')) {
        status = hasSkilledOffer ? 'eligible' : 'almost';
        summary = hasSkilledOffer
          ? { en: 'Eligible for NLPNP Skilled Worker or Express Entry with 2+ yr NL employer offer.', pa: 'NL ਜੌਬ ਆਫਰ ਨਾਲ NLPNP Skilled Worker / EE ਲਈ ਯੋਗ।' }
          : { en: 'May qualify for Priority Skills NL (no job offer) if in high-demand tech/health/ocean/agri, or get NL offer.', pa: 'ਜੇ ਮੰਗ ਵਾਲੇ ਟੈਕ/ਸਿਹਤ ਕਿੱਤੇ ਵਿੱਚ ਹੋ ਤਾਂ Priority Skills NL (ਬਿਨਾਂ ਆਫਰ), ਜਾਂ NL ਜੌਬ ਆਫਰ ਲਓ।' };
        if (!hasSkilledOffer) {
          missing.push({ en: 'Invitation via Priority Skills NL EOI OR 2-yr NL job offer', pa: 'Priority Skills NL ਸੱਦਾ ਜਾਂ 2-ਸਾਲ NL ਜੌਬ ਆਫਰ' });
        }
      } else {
        summary = { en: 'Needs NL job offer (CLB 4–7) or Priority Skills NL invitation.', pa: 'NL ਜੌਬ ਆਫਰ ਜਾਂ Priority Skills ਸੱਦਾ ਜ਼ਰੂਰੀ।' };
        missing.push({ en: 'NL job offer or Priority Skills EOI', pa: 'NL ਜੌਬ ਆਫਰ ਜਾਂ Priority EOI' });
      }
    } else if (prov.code === 'YT' || prov.code === 'NT') {
      if (hasSkilledOffer && bestLang >= 4) {
        status = 'eligible';
        summary = {
          en: `Eligible for ${prov.name.en} Skilled / Critical Impact (covers TEER 0–5 with local employer offer & CLB 4+).`,
          pa: `${prov.name.pa} ਵਿੱਚ ਸਥਾਨਕ ਆਫਰ ਅਤੇ CLB 4+ ਨਾਲ TEER 0–5 ਲਈ ਯੋਗ।`
        };
      } else if (prov.code === 'NT' && p.frenchNclc >= 5 && p.englishClb >= 4) {
        status = 'almost';
        summary = {
          en: 'Meets NWT Francophone bilingual language (NCLC 5+ French & CLB 4+ English); needs permanent NWT offer.',
          pa: 'NWT Francophone ਭਾਸ਼ਾ ਸ਼ਰਤ ਪੂਰੀ (NCLC 5+); NWT ਵਿੱਚ ਪੱਕਾ ਆਫਰ ਚਾਹੀਦਾ ਹੈ।'
        };
        missing.push({ en: 'Permanent full-time NWT job offer (any TEER 0–5)', pa: 'NWT ਵਿੱਚ ਪੱਕਾ ਜੌਬ ਆਫਰ (TEER 0–5)' });
      } else if (bestLang >= 4 && (totalSkilledYrs >= 1 || p.canadianYears >= 0.5)) {
        status = 'almost';
        summary = {
          en: `Meets language & experience baseline; needs full-time job offer in ${prov.code}.`,
          pa: `ਭਾਸ਼ਾ ਤੇ ਤਜਰਬਾ ਠੀਕ; ${prov.code} ਵਿੱਚ ਪੱਕਾ ਜੌਬ ਆਫਰ ਚਾਹੀਦਾ ਹੈ।`
        };
        missing.push({ en: `Full-time job offer in ${prov.code}`, pa: `${prov.code} ਵਿੱਚ ਪੱਕਾ ਜੌਬ ਆਫਰ` });
      } else {
        summary = { en: `Needs CLB 4+ and full-time employer offer in ${prov.code}.`, pa: `CLB 4+ ਅਤੇ ${prov.code} ਆਫਰ ਜ਼ਰੂਰੀ।` };
        missing.push({ en: `CLB 4+ & ${prov.code} job offer`, pa: `CLB 4+ ਅਤੇ ${prov.code} ਆਫਰ` });
      }
    } else {
      if (hasSkilledOffer && bestLang >= (prov.code === 'BC' || prov.code === 'PE' ? 4 : 5)) {
        status = 'eligible';
        summary = {
          en: `Can apply via ${prov.name.en} employer-supported stream (offer must be from an employer in ${prov.code}${prov.code === 'BC' ? '; note BC ELSS is closed' : ''}).`,
          pa: `${prov.name.pa} ਵਿੱਚ ਸਥਾਨਕ ਰੁਜ਼ਗਾਰਦਾਤਾ ਦੇ ਆਫਰ ਨਾਲ ਅਪਲਾਈ ਕਰ ਸਕਦੇ ਹੋ${prov.code === 'BC' ? ' (BC ELSS ਬੰਦ ਹੈ)' : ''}।`
        };
      } else if (bestLang >= 5 && totalSkilledYrs >= 1) {
        status = 'almost';
        summary = {
          en: `Good language & work base; missing local ${prov.code} job offer${prov.code === 'MB' ? ' (or close friend/relative in Manitoba)' : ''}.`,
          pa: `ਵਧੀਆ ਤਜਰਬਾ; ${prov.code} ਵਿੱਚ ਜੌਬ ਆਫਰ${prov.code === 'MB' ? ' (ਜਾਂ ਮੈਨੀਟੋਬਾ ਵਿੱਚ ਰਿਸ਼ਤੇਦਾਰ)' : ''} ਦੀ ਲੋੜ ਹੈ।`
        };
        missing.push({ en: `Job offer inside ${prov.code}${prov.code === 'MB' ? ' or close MB tie' : ''}`, pa: `${prov.code} ਵਿੱਚ ਜੌਬ ਆਫਰ` });
      } else {
        summary = { en: `Needs CLB 5+ and employer job offer in ${prov.code}.`, pa: `CLB 5+ ਅਤੇ ${prov.code} ਵਿੱਚ ਜੌਬ ਆਫਰ ਜ਼ਰੂਰੀ।` };
        missing.push({ en: `CLB 5+ and ${prov.code} job offer`, pa: `CLB 5+ ਅਤੇ ${prov.code} ਆਫਰ` });
      }
    }

    results.push({
      id: `pnp-${prov.code}`,
      name: prov.name,
      category: { en: 'Provincial Nominee (PNP)', pa: 'ਸੂਬਾਈ ਨਾਮਜ਼ਦਗੀ (PNP)' },
      status,
      summary,
      missing,
      planKey: 'pnp'
    });
  });

  // 5. AIP
  const aipMiss: BiText[] = [];
  if (p.jobOffer !== 'aip') aipMiss.push({ en: 'Job offer from AIP-designated employer (NB, NS, PEI, or NL)', pa: 'NB/NS/PEI/NL ਦੇ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਰੁਜ਼ਗਾਰਦਾਤਾ ਦਾ ਆਫਰ' });
  if (bestLang < 4) aipMiss.push({ en: 'CLB 4 (TEER 4) or CLB 5 (TEER 0–3)', pa: 'CLB 4 (TEER 4) ਜਾਂ CLB 5 (TEER 0–3)' });
  results.push({
    id: 'aip',
    name: { en: 'Atlantic Immigration Program (AIP — TEER 0–4)', pa: 'ਅਟਲਾਂਟਿਕ ਇਮੀਗ੍ਰੇਸ਼ਨ ਪ੍ਰੋਗਰਾਮ (AIP)' },
    category: { en: 'Regional Pathway', pa: 'ਖੇਤਰੀ ਰਸਤਾ' },
    status: aipMiss.length === 0 ? 'eligible' : bestLang >= 4 && (totalSkilledYrs >= 1 || p.canadianStudy !== 'none') ? 'almost' : 'not',
    summary:
      aipMiss.length === 0
        ? { en: 'Eligible for AIP (~4,000 spots/yr) with designated Atlantic employer offer!', pa: 'AIP (~4,000/ਸਾਲ) ਲਈ ਯੋਗ!' }
        : { en: 'Requires designated employer offer in Atlantic Canada.', pa: 'ਅਟਲਾਂਟਿਕ ਕੈਨੇਡਾ ਦੇ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਰੁਜ਼ਗਾਰਦਾਤਾ ਦਾ ਆਫਰ ਜ਼ਰੂਰੀ।' },
    missing: aipMiss,
    planKey: 'aip'
  });

  // 6. RCIP
  const rcipMiss: BiText[] = [];
  if (p.jobOffer !== 'rcip') rcipMiss.push({ en: 'Job offer from designated employer in 1 of 14 RCIP towns', pa: '14 RCIP ਕਸਬਿਆਂ ਵਿੱਚੋਂ ਕਿਸੇ ਦੇ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਰੁਜ਼ਗਾਰਦਾਤਾ ਦਾ ਆਫਰ' });
  if (bestLang < 4) rcipMiss.push({ en: 'CLB 4–6 depending on NOC TEER', pa: 'NOC ਅਨੁਸਾਰ CLB 4–6' });
  results.push({
    id: 'rcip',
    name: { en: 'RCIP (Rural Community Pilot — 14 Towns)', pa: 'RCIP (ਪੇਂਡੂ ਕਮਿਊਨਿਟੀ ਪਾਇਲਟ — 14 ਕਸਬੇ)' },
    category: { en: 'Regional Pilot', pa: 'ਖੇਤਰੀ ਪਾਇਲਟ' },
    status: rcipMiss.length === 0 ? 'eligible' : bestLang >= 4 && totalSkilledYrs >= 1 ? 'almost' : 'not',
    summary:
      rcipMiss.length === 0
        ? { en: 'Eligible for RCIP community recommendation & PR!', pa: 'RCIP ਕਮਿਊਨਿਟੀ ਸਿਫਾਰਸ਼ ਅਤੇ PR ਲਈ ਯੋਗ!' }
        : { en: 'Needs designated community employer offer in 1 of 14 RCIP towns.', pa: '14 RCIP ਕਸਬਿਆਂ ਵਿੱਚੋਂ ਕਿਸੇ ਵਿੱਚ ਜੌਬ ਆਫਰ ਜ਼ਰੂਰੀ।' },
    missing: rcipMiss,
    planKey: 'aip'
  });

  // 7. FCIP
  const fcipMiss: BiText[] = [];
  if (p.frenchNclc < 5) fcipMiss.push({ en: `French NCLC 5+ (currently ${p.frenchNclc})`, pa: `ਫ੍ਰੈਂਚ NCLC 5+ (ਹੁਣ ${p.frenchNclc})` });
  if (p.jobOffer !== 'rcip') fcipMiss.push({ en: 'Job offer in 1 of 6 FCIP Francophone communities', pa: '6 FCIP ਫ੍ਰੈਂਚ ਕਮਿਊਨਿਟੀਆਂ ਵਿੱਚੋਂ ਕਿਸੇ ਵਿੱਚ ਜੌਬ ਆਫਰ' });
  results.push({
    id: 'fcip',
    name: { en: 'FCIP (Francophone Pilot — 6 Towns, NCLC 5)', pa: 'FCIP (ਫ੍ਰੈਂਚ ਕਮਿਊਨਿਟੀ ਪਾਇਲਟ — 6 ਕਸਬੇ)' },
    category: { en: 'Regional Pilot', pa: 'ਖੇਤਰੀ ਪਾਇਲਟ' },
    status: fcipMiss.length === 0 ? 'eligible' : p.frenchNclc >= 5 || p.jobOffer === 'rcip' ? 'almost' : 'not',
    summary:
      fcipMiss.length === 0
        ? { en: 'Eligible for FCIP with French NCLC 5+ & community employer!', pa: 'ਫ੍ਰੈਂਚ NCLC 5+ ਅਤੇ ਕਮਿਊਨਿਟੀ ਆਫਰ ਨਾਲ ਯੋਗ!' }
        : { en: 'Requires French NCLC 5+ and offer in 1 of 6 FCIP communities.', pa: 'ਫ੍ਰੈਂਚ NCLC 5+ ਅਤੇ 6 FCIP ਕਸਬਿਆਂ ਵਿੱਚ ਆਫਰ ਜ਼ਰੂਰੀ।' },
    missing: fcipMiss,
    planKey: 'french'
  });

  // 8. Quebec PSTQ / PEQ
  const qcMiss: BiText[] = [];
  if (p.frenchNclc < 7) qcMiss.push({ en: `French oral 7 / written 5 (currently NCLC ${p.frenchNclc})`, pa: `ਮੌਖਿਕ ਫ੍ਰੈਂਚ 7 / ਲਿਖਤੀ 5 (ਹੁਣ NCLC ${p.frenchNclc})` });
  if (totalSkilledYrs < 1) qcMiss.push({ en: 'Skilled work experience (or eligible Quebec study/work for PEQ)', pa: 'ਹੁਨਰਮੰਦ ਕੰਮ (ਜਾਂ PEQ ਲਈ ਕਿਊਬੈਕ ਪੜ੍ਹਾਈ/ਕੰਮ)' });
  results.push({
    id: 'quebec',
    name: { en: 'Quebec PSTQ (Arrima → CSQ → PR) & PEQ', pa: 'ਕਿਊਬੈਕ PSTQ (Arrima → CSQ) ਅਤੇ PEQ' },
    category: { en: 'Quebec Separate System', pa: 'ਕਿਊਬੈਕ ਵੱਖਰਾ ਸਿਸਟਮ' },
    status: qcMiss.length === 0 ? 'eligible' : p.frenchNclc >= 5 ? 'almost' : 'not',
    summary:
      qcMiss.length === 0
        ? { en: 'Meets French threshold for Quebec PSTQ (and PEQ reopened 2 Jul 2026 – 2 Jul 2028).', pa: 'ਕਿਊਬੈਕ PSTQ ਲਈ ਫ੍ਰੈਂਚ ਪੱਧਰ ਪੂਰਾ (PEQ 2 ਜੁਲਾਈ 2026 – 2028 ਤੱਕ ਖੁੱਲ੍ਹਾ)।' }
        : { en: 'French oral 7 / written 5 is practically essential for Quebec selection.', pa: 'ਕਿਊਬੈਕ ਲਈ ਮੌਖਿਕ ਫ੍ਰੈਂਚ 7 / ਲਿਖਤੀ 5 ਲਗਭਗ ਲਾਜ਼ਮੀ ਹੈ।' },
    missing: qcMiss,
    planKey: 'french'
  });

  // 9. Family Sponsorship
  results.push({
    id: 'family',
    name: { en: 'Family Sponsorship (Spouse / Partner)', pa: 'ਪਰਿਵਾਰਕ ਸਪਾਂਸਰਸ਼ਿਪ (ਜੀਵਨ ਸਾਥੀ)' },
    category: { en: 'Family Class', pa: 'ਪਰਿਵਾਰਕ ਸ਼੍ਰੇਣੀ' },
    status: p.spouse === 'canadian' ? 'eligible' : 'not',
    summary:
      p.spouse === 'canadian'
        ? { en: 'Eligible! Your Canadian Citizen or PR spouse/partner can sponsor you directly.', pa: 'ਯੋਗ! ਤੁਹਾਡਾ ਕੈਨੇਡੀਅਨ ਨਾਗਰਿਕ/PR ਜੀਵਨ ਸਾਥੀ ਤੁਹਾਨੂੰ ਸਪਾਂਸਰ ਕਰ ਸਕਦਾ ਹੈ।' }
        : { en: 'Requires a Canadian Citizen or PR spouse, common-law partner, or eligible relative.', pa: 'ਕੈਨੇਡੀਅਨ ਨਾਗਰਿਕ ਜਾਂ PR ਜੀਵਨ ਸਾਥੀ ਹੋਣਾ ਜ਼ਰੂਰੀ ਹੈ।' },
    missing: p.spouse === 'canadian' ? [] : [{ en: 'Canadian Citizen / PR spouse or eligible family sponsor', pa: 'ਕੈਨੇਡੀਅਨ ਨਾਗਰਿਕ / PR ਜੀਵਨ ਸਾਥੀ' }],
    planKey: 'cec'
  });

  // 10. Start-up Visa
  results.push({
    id: 'suv',
    name: { en: 'Start-up Visa (SUV)', pa: 'ਸਟਾਰਟ-ਅੱਪ ਵੀਜ਼ਾ (SUV)' },
    category: { en: 'Business / Paused', pa: 'ਕਾਰੋਬਾਰ / ਰੋਕਿਆ ਗਿਆ' },
    status: 'not',
    summary: { en: 'PAUSED: The federal Start-up Visa program is paused in 2026.', pa: 'ਰੋਕਿਆ ਗਿਆ (PAUSED): ਫੈਡਰਲ ਸਟਾਰਟ-ਅੱਪ ਵੀਜ਼ਾ ਇਸ ਵੇਲੇ ਬੰਦ ਹੈ।' },
    missing: [{ en: 'Program currently paused by IRCC', pa: 'IRCC ਵੱਲੋਂ ਪ੍ਰੋਗਰਾਮ ਫਿਲਹਾਲ ਰੋਕਿਆ ਹੋਇਆ ਹੈ' }]
  });

  // 11. Study-to-PR
  const studyMiss: BiText[] = [];
  if (p.canadianStudy === 'none') studyMiss.push({ en: 'Complete PGWP-eligible Canadian program (requires PAL + study permit + tuition)', pa: 'PGWP-ਯੋਗ ਕੈਨੇਡੀਅਨ ਕਾਲਜ/ਯੂਨੀਵਰਸਿਟੀ ਪੜ੍ਹਾਈ ਪੂਰੀ ਕਰਨੀ' });
  if (p.canadianYears < 1) studyMiss.push({ en: '1 yr TEER 0–3 work on PGWP after graduation', pa: 'ਗ੍ਰੈਜੂਏਸ਼ਨ ਤੋਂ ਬਾਅਦ PGWP ’ਤੇ 1 ਸਾਲ TEER 0–3 ਕੰਮ' });
  results.push({
    id: 'study',
    name: { en: 'Study → PGWP → CEC / PNP Route', pa: 'ਪੜ੍ਹਾਈ → PGWP → CEC/PNP ਰਸਤਾ' },
    category: { en: 'Education Pathway', pa: 'ਪੜ੍ਹਾਈ ਰਾਹੀਂ PR' },
    status: p.canadianStudy !== 'none' && p.canadianYears >= 1 ? 'eligible' : 'almost',
    summary:
      p.canadianStudy !== 'none' && p.canadianYears >= 1
        ? { en: 'You have both Canadian education (+15/+30 CRS) and Canadian work experience!', pa: 'ਤੁਹਾਡੇ ਕੋਲ ਕੈਨੇਡੀਅਨ ਪੜ੍ਹਾਈ ਅਤੇ ਕੰਮ ਦੋਵੇਂ ਹਨ!' }
        : { en: 'Open future route: study at a PGWP-eligible DLI, then work 1 yr for CEC or graduate PNP.', pa: 'ਭਵਿੱਖੀ ਰਸਤਾ: PGWP-ਯੋਗ ਕਾਲਜ ਵਿੱਚ ਪੜ੍ਹ ਕੇ 1 ਸਾਲ ਕੰਮ ਕਰੋ।' },
    missing: studyMiss,
    planKey: 'study'
  });

  return results;
}

export function getWizardRecommendations(wiz: WizardState): {
  paths: { planKey: string; title: BiText; why: BiText }[];
  steps: BiText[];
} {
  const paths: { planKey: string; title: BiText; why: BiText }[] = [];
  const steps: BiText[] = [];

  if (wiz.lang === 'french') {
    paths.push({
      planKey: 'french',
      title: { en: 'Express Entry — French Category (Recent Cutoff ~407)', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ — ਫ੍ਰੈਂਚ ਸ਼੍ਰੇਣੀ (ਕੱਟਆਫ ~407)' },
      why: { en: '2026 French draws invited 5,000 candidates per round at CRS ~407, plus +50 bilingual bonus points.', pa: '2026 ਵਿੱਚ ਫ੍ਰੈਂਚ ਡਰਾਅ 407 CRS ਦੇ ਨੇੜੇ ਰਹੇ ਹਨ ਅਤੇ +50 ਵਾਧੂ ਅੰਕ ਵੀ ਮਿਲਦੇ ਹਨ।' }
    });
    paths.push({
      planKey: 'french',
      title: { en: 'Quebec PSTQ / PEQ or FCIP (6 Towns)', pa: 'ਕਿਊਬੈਕ PSTQ / PEQ ਜਾਂ FCIP (6 ਕਸਬੇ)' },
      why: { en: 'Quebec prioritizes oral French 7 / written 5 (PEQ reopened 2 Jul 2026); FCIP needs NCLC 5 + community offer.', pa: 'ਕਿਊਬੈਕ ਅਤੇ 6 FCIP ਕਮਿਊਨਿਟੀਆਂ ਫ੍ਰੈਂਚ ਬੋਲਣ ਵਾਲਿਆਂ ਨੂੰ ਖਾਸ ਤਰਜੀਹ ਦਿੰਦੀਆਂ ਹਨ।' }
    });
  }

  if (wiz.where === 'worker' || wiz.where === 'student') {
    paths.push({
      planKey: 'cec',
      title: { en: 'Canadian Experience Class (CEC)', pa: 'ਕੈਨੇਡੀਅਨ ਤਜਰਬਾ ਸ਼੍ਰੇਣੀ (CEC)' },
      why: { en: '1 year skilled Canadian work (TEER 0–3) in last 3 years, NO proof of funds needed, plus up to +150 Nov 2026 Integration points.', pa: '1 ਸਾਲ ਕੈਨੇਡੀਅਨ ਕੰਮ, ਫੰਡਾਂ ਦੀ ਲੋੜ ਨਹੀਂ, ਅਤੇ ਨਵੇਂ ਲੇਬਰ ਮਾਰਕੀਟ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਅੰਕ।' }
    });
  }

  if (wiz.where === 'student' && wiz.lang !== 'low') {
    paths.push({
      planKey: 'study',
      title: { en: 'PGWP → CEC / Provincial Graduate PNP', pa: 'PGWP → CEC / ਸੂਬਾਈ ਗ੍ਰੈਜੂਏਟ PNP' },
      why: { en: 'Canadian study gives +15 or +30 CRS points and opens provincial streams once you work 1 year.', pa: 'ਕੈਨੇਡੀਅਨ ਪੜ੍ਹਾਈ ਨਾਲ +15/+30 CRS ਅੰਕ ਅਤੇ 1 ਸਾਲ ਦੇ ਕੰਮ ਤੋਂ ਬਾਅਦ CEC/PNP ਖੁੱਲ੍ਹਦਾ ਹੈ।' }
    });
  }

  if (wiz.job === 'yes_trade') {
    paths.push({
      planKey: 'aip',
      title: { en: 'Trades (FSTP) / AIP / RCIP Rural Pilots', pa: 'ਟ੍ਰੇਡਜ਼ FSTP / AIP / RCIP ਪੇਂਡੂ ਪਾਇਲਟ' },
      why: { en: 'Trades draws (~476 CRS), AIP (NB/NS/PEI/NL, TEER 0–4), and RCIP (14 communities) accept CLB 4–5.', pa: 'ਟ੍ਰੇਡਜ਼, AIP (TEER 0–4) ਅਤੇ RCIP (14 ਕਸਬੇ) CLB 4–5 ਨਾਲ ਵੀ PR ਦਿੰਦੇ ਹਨ।' }
    });
  }

  if (wiz.job === 'yes_valid') {
    paths.push({
      planKey: 'pnp',
      title: { en: 'PNP Employer Streams (+600 CRS) & Integration CRS', pa: 'PNP ਜੌਬ ਸਟ੍ਰੀਮ (+600 CRS)' },
      why: { en: 'A valid skilled job offer unlocks BC, Alberta, Ontario Workforce Priority, Atlantic, and up to +150 Integration points.', pa: 'ਪੱਕੇ ਜੌਬ ਆਫਰ ਨਾਲ PNP (+600 CRS) ਅਤੇ ਲੇਬਰ ਮਾਰਕੀਟ ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਅੰਕ ਮਿਲਦੇ ਹਨ।' }
    });
  }

  if (wiz.where === 'outside' && (wiz.lang === 'clb9' || wiz.lang === 'clb7') && wiz.job === 'no') {
    paths.push({
      planKey: 'fswp',
      title: { en: 'Federal Skilled Worker (FSWP) + Category Draws', pa: 'ਫੈਡਰਲ ਹੁਨਰਮੰਦ ਕਾਮੇ (FSWP)' },
      why: { en: 'No job offer needed. Requires 1 yr continuous skilled work, CLB 7+, 67/100 grid, and $14,690+ single proof of funds.', pa: 'ਬਿਨਾਂ ਜੌਬ ਆਫਰ। 1 ਸਾਲ ਲਗਾਤਾਰ ਕੰਮ, CLB 7+, 67/100 ਅੰਕ ਅਤੇ ਫੰਡ ਜ਼ਰੂਰੀ।' }
    });
    paths.push({
      planKey: 'pnp',
      title: { en: 'Category Draws (Healthcare/STEM/Trades) & Manitoba/SK PNP', pa: 'ਸ਼੍ਰੇਣੀ ਡਰਾਅ ਅਤੇ ਮੈਨੀਟੋਬਾ/SK PNP' },
      why: { en: 'Look at Healthcare/STEM/Trades/Transport category draws, Manitoba (if close tie), or Saskatchewan 2027 quota reset.', pa: 'ਸਿਹਤ/STEM/ਟ੍ਰੇਡਜ਼ ਸ਼੍ਰੇਣੀ ਡਰਾਅ ਜਾਂ ਮੈਨੀਟੋਬਾ (ਜੇ ਰਿਸ਼ਤੇਦਾਰ ਹੈ) ਦੇਖੋ।' }
    });
  }

  if (wiz.lang === 'low' || wiz.where === 'visitor') {
    paths.push({
      planKey: 'study',
      title: { en: 'Reach CLB 5–7 First or Consider Study → PGWP Route', pa: 'ਪਹਿਲਾਂ CLB 5–7 ਲਓ ਜਾਂ ਪੜ੍ਹਾਈ ਰਸਤਾ ਦੇਖੋ' },
      why: { en: 'Economic PR pathways require at least CLB 4–5 (AIP/FSTP/Yukon) or CLB 7 (FSWP). A visitor visa alone does not grant PR.', pa: 'ਲਗਭਗ ਹਰ PR ਰਸਤੇ ਲਈ CLB 4–7 ਜ਼ਰੂਰੀ ਹੈ। ਸਿਰਫ਼ ਵਿਜ਼ਿਟਰ ਵੀਜ਼ੇ ’ਤੇ PR ਨਹੀਂ ਮਿਲਦੀ।' }
    });
  }

  while (paths.length < 2) {
    paths.push({
      planKey: 'pnp',
      title: { en: 'Province-wise PNP Explorer (11 Provinces)', pa: 'ਸੂਬਾਈ PNP ਖੋਜ (11 ਸੂਬੇ)' },
      why: { en: 'Canada targets ~91,500 PNP admissions in 2026 across targeted healthcare, trades, tech, and regional jobs.', pa: '2026 ਵਿੱਚ ਸੂਬੇ ~91,500 ਲੋਕਾਂ ਨੂੰ ਨਾਮਜ਼ਦ ਕਰਨਗੇ।' }
    });
  }

  steps.push({ en: 'Look up your exact 5-digit NOC 2021 code and TEER level (0–5) in the Reference Library.', pa: 'ਰੈਫਰੈਂਸ ਲਾਇਬ੍ਰੇਰੀ ਵਿੱਚ ਆਪਣਾ ਸਹੀ 5-ਅੰਕਾਂ ਵਾਲਾ NOC ਕੋਡ ਅਤੇ TEER ਪੱਧਰ ਚੈੱਕ ਕਰੋ।' });
  steps.push({ en: 'Take an IRCC-approved language test (IELTS General, CELPIP-G, PTE Core, TEF, or TCF) — aim for CLB 7+ or 9+.', pa: 'ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਭਾਸ਼ਾ ਟੈਸਟ (IELTS General / CELPIP / PTE Core / TEF) ਦਿਓ।' });
  if (wiz.where === 'outside') {
    steps.push({ en: 'Get an ECA (WES, ICAS, CES, IQAS) for your highest degree and prepare liquid settlement funds ($14,690+ single).', pa: 'ਵਿਦੇਸ਼ੀ ਡਿਗਰੀ ਲਈ ECA ਕਰਵਾਓ ਅਤੇ ਬੈਂਕ ਫੰਡ ($14,690+ ਇੱਕਲੇ ਲਈ) ਤਿਆਰ ਕਰੋ।' });
  } else {
    steps.push({ en: 'Gather Canadian employer reference letters (listing NOC duties & hours), pay stubs, T4s, and Notice of Assessments.', pa: 'ਕੈਨੇਡੀਅਨ ਕੰਪਨੀ ਰੈਫਰੈਂਸ ਲੈਟਰ, ਪੇ-ਸਲਿੱਪ, T4 ਅਤੇ NOA ਇਕੱਠੇ ਕਰੋ।' });
  }
  steps.push({ en: 'Run the full Eligibility Checker & CRS Calculator, save your plan to My Plan, and verify on canada.ca.', pa: 'ਪੂਰੀ ਯੋਗਤਾ ਜਾਂਚ ਅਤੇ CRS ਕੈਲਕੁਲੇਟਰ ਚਲਾਓ, My Plan ਵਿੱਚ ਸੇਵ ਕਰੋ ਅਤੇ canada.ca ’ਤੇ ਪੁਸ਼ਟੀ ਕਰੋ।' });

  return { paths: paths.slice(0, 3), steps };
}

const PNP_PORTAL_GUIDANCE: Record<string, BiText> = {
  ON: {
    en: 'Work with an eligible Ontario employer to submit an Expression of Interest (EOI) under Ontario Workforce Priority (other OINP streams are currently paused).',
    pa: 'ਓਂਟਾਰੀਓ Workforce Priority ਅਧੀਨ ਯੋਗ ਰੁਜ਼ਗਾਰਦਾਤਾ ਰਾਹੀਂ EOI ਜਮ੍ਹਾਂ ਕਰੋ (ਹੋਰ OINP ਸਟ੍ਰੀਮਾਂ ਫਿਲਹਾਲ ਬੰਦ ਹਨ)।'
  },
  BC: {
    en: 'Register a Skills Immigration profile in BC PNP Online (note ELSS is closed) and target priority Healthcare, Construction, or Tech occupations.',
    pa: 'BC PNP ਆਨਲਾਈਨ ਪੋਰਟਲ ’ਤੇ Skills Immigration ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ (ELSS ਬੰਦ ਹੈ) ਅਤੇ ਸਿਹਤ/ਉਸਾਰੀ/ਟੈਕ ਕਿੱਤੇ ਚੁਣੋ।'
  },
  AB: {
    en: 'Submit an Alberta Advantage Immigration Program (AAIP) EOI — Alberta Express Entry draws at CRS 300+ (note Opportunity Stream quota is nearly full).',
    pa: 'AAIP ਪੋਰਟਲ ’ਤੇ EOI ਜਮ੍ਹਾਂ ਕਰੋ — ਅਲਬਰਟਾ Express Entry CRS 300+ ਤੋਂ ਸੱਦੇ ਦਿੰਦਾ ਹੈ।'
  },
  SK: {
    en: 'Monitor SINP portal for 2027 quota reset (2026 allocation is ~76% issued / effectively full) or secure a Job Approval Letter from an SK employer.',
    pa: '2027 SINP ਕੋਟਾ ਖੁੱਲ੍ਹਣ ’ਤੇ ਨਜ਼ਰ ਰੱਖੋ (2026 ਕੋਟਾ ਲਗਭਗ ਭਰ ਚੁੱਕਾ) ਜਾਂ SK ਰੁਜ਼ਗਾਰਦਾਤਾ ਤੋਂ Job Approval Letter ਲਓ।'
  },
  MB: {
    en: 'Create a Manitoba MPNP Expression of Interest (EOI) highlighting Skilled Worker in Manitoba / Overseas work and any Manitoba family/friend ties.',
    pa: 'ਮੈਨੀਟੋਬਾ MPNP EOI ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ ਅਤੇ ਕੰਮ ਜਾਂ ਮੈਨੀਟੋਬਾ ਪਰਿਵਾਰਕ/ਦੋਸਤਾਨਾ ਸਬੰਧ ਦਰਜ ਕਰੋ।'
  },
  NS: {
    en: 'Apply via Nova Scotia’s online MyNS / NSNP portal under Skilled Worker or NS Experience: Express Entry (if 1 yr NS work completed).',
    pa: 'MyNS / NSNP ਪੋਰਟਲ ਰਾਹੀਂ Skilled Worker ਜਾਂ NS Experience Express Entry ਵਿੱਚ ਅਪਲਾਈ ਕਰੋ।'
  },
  NB: {
    en: 'Create an INB (Immigration New Brunswick) candidate profile and target NB Skilled Worker, Express Entry, or French-priority intake windows.',
    pa: 'INB ਪੋਰਟਲ ’ਤੇ ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ ਅਤੇ NB Skilled Worker, Express Entry ਜਾਂ ਫ੍ਰੈਂਚ ਤਰਜੀਹੀ ਵਿੰਡੋ ਲਈ ਅਪਲਾਈ ਕਰੋ।'
  },
  NL: {
    en: 'Submit an EOI via the Newfoundland & Labrador NLPNP portal (Priority Skills NL if in tech/health/ocean/agri, or Skilled Worker with NL job offer).',
    pa: 'NLPNP ਪੋਰਟਲ ’ਤੇ EOI ਜਮ੍ਹਾਂ ਕਰੋ (ਬਿਨਾਂ ਆਫਰ Priority Skills NL ਜਾਂ 2-ਸਾਲ NL ਜੌਬ ਆਫਰ ਨਾਲ Skilled Worker)।'
  },
  PE: {
    en: 'Register in the PEI Expression of Interest (EOI) system — PEI holds monthly invitations prioritizing Healthcare, Trades, and local workers.',
    pa: 'PEI EOI ਸਿਸਟਮ ਵਿੱਚ ਰਜਿਸਟਰ ਕਰੋ — PEI ਹਰ ਮਹੀਨੇ ਸਿਹਤ, ਟ੍ਰੇਡਜ਼ ਅਤੇ ਸਥਾਨਕ ਕਾਮਿਆਂ ਨੂੰ ਤਰਜੀਹ ਦਿੰਦਾ ਹੈ।'
  },
  YT: {
    en: 'Secure a full-time permanent offer from a Yukon employer so the employer can submit your Yukon Nominee Program (YNP) application.',
    pa: 'ਯੂਕੋਨ ਰੁਜ਼ਗਾਰਦਾਤਾ ਤੋਂ ਪੱਕਾ ਜੌਬ ਆਫਰ ਪ੍ਰਾਪਤ ਕਰੋ ਤਾਂ ਜੋ ਉਹ YNP ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰ ਸਕਣ।'
  },
  NT: {
    en: 'Have your Northwest Territories employer submit an Employer Driven NTNP application (TEER 0–5, or Francophone stream with NCLC 5+ French).',
    pa: 'NWT ਰੁਜ਼ਗਾਰਦਾਤਾ ਰਾਹੀਂ NTNP ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰਵਾਓ (TEER 0–5, ਜਾਂ ਫ੍ਰੈਂਚ NCLC 5+ Francophone ਸਟ੍ਰੀਮ)।'
  }
};

function buildWhyFits(p: EligibilityProfile, item: PathwayEvaluation): BiText {
  const bestLang = Math.max(p.englishClb, p.frenchNclc);
  const totalSkilledYrs = (p.foreignTeer <= 3 ? p.foreignYears : 0) + (p.canadianTeer <= 3 ? p.canadianYears : 0);
  const hasOffer = p.jobOffer === 'skilled' || p.jobOffer === 'aip' || p.jobOffer === 'rcip';

  if (item.id === 'family') {
    return {
      en: 'Having a Canadian Citizen or PR spouse/partner bypasses CRS point competition and economic job requirements.',
      pa: 'ਕੈਨੇਡੀਅਨ ਨਾਗਰਿਕ ਜਾਂ PR ਜੀਵਨ ਸਾਥੀ ਹੋਣ ਕਰਕੇ ਤੁਹਾਨੂੰ CRS ਅੰਕਾਂ ਜਾਂ ਜੌਬ ਆਫਰ ਦੀ ਲੋੜ ਨਹੀਂ ਪੈਂਦੀ।'
    };
  }
  if (item.id === 'cec') {
    return item.status === 'eligible'
      ? {
          en: `Your ${p.canadianYears} yr Canadian TEER ${p.canadianTeer} work & CLB ${bestLang} qualify for CEC with $0 proof of funds and Nov 2026 Integration CRS points.`,
          pa: `ਤੁਹਾਡਾ ${p.canadianYears} ਸਾਲ ਕੈਨੇਡੀਅਨ TEER ${p.canadianTeer} ਤਜਰਬਾ ਅਤੇ CLB ${bestLang} ਬਿਨਾਂ ਬੈਂਕ ਫੰਡਾਂ ਦੇ CEC ਲਈ ਯੋਗ ਹਨ।`
        }
      : {
          en: 'CEC requires no settlement funds and offers strong Canadian work + Nov 2026 Integration CRS points once 1 yr Canadian TEER 0–3 work is complete.',
          pa: '1 ਸਾਲ ਕੈਨੇਡੀਅਨ TEER 0–3 ਕੰਮ ਪੂਰਾ ਹੋਣ ’ਤੇ CEC ਬਿਨਾਂ ਬੈਂਕ ਫੰਡਾਂ ਦੇ ਸਭ ਤੋਂ ਤੇਜ਼ ਫੈਡਰਲ ਰਸਤਾ ਹੈ।'
        };
  }
  if (item.id === 'fswp') {
    if (p.frenchNclc >= 7) {
      return {
        en: `Your French NCLC ${p.frenchNclc} unlocks Express Entry French Category draws (recent 2026 cutoffs ~407 CRS) plus +50 bilingual bonus points.`,
        pa: `ਤੁਹਾਡੀ ਫ੍ਰੈਂਚ NCLC ${p.frenchNclc} ਤੁਹਾਨੂੰ ਘੱਟ ਕੱਟਆਫ ਵਾਲੇ ਫ੍ਰੈਂਚ ਸ਼੍ਰੇਣੀ ਡਰਾਅ (~407 CRS) ਅਤੇ +50 ਬੋਨਸ ਅੰਕਾਂ ਲਈ ਯੋਗ ਬਣਾਉਂਦੀ ਹੈ।`
      };
    }
    return item.status === 'eligible'
      ? {
          en: `No Canadian job offer needed — your CLB ${bestLang}, ${totalSkilledYrs} yr skilled work, and $${p.fundsCad.toLocaleString()} CAD funds clear FSWP minimums.`,
          pa: `ਬਿਨਾਂ ਕੈਨੇਡੀਅਨ ਜੌਬ ਆਫਰ — ਤੁਹਾਡਾ CLB ${bestLang}, ${totalSkilledYrs} ਸਾਲ ਤਜਰਬਾ ਅਤੇ $${p.fundsCad.toLocaleString()} CAD ਫੰਡ FSWP ਸ਼ਰਤਾਂ ਪੂਰੀਆਂ ਕਰਦੇ ਹਨ।`
        }
      : {
          en: 'FSWP is your primary direct federal pathway without needing a Canadian employer, especially for Healthcare, STEM, Trades, or French category draws.',
          pa: 'ਬਿਨਾਂ ਕੈਨੇਡੀਅਨ ਜੌਬ ਆਫਰ ਦੇ FSWP ਮੁੱਖ ਫੈਡਰਲ ਰਸਤਾ ਹੈ, ਖਾਸ ਕਰਕੇ ਸ਼੍ਰੇਣੀ ਡਰਾਅ (ਸਿਹਤ/ਟ੍ਰੇਡਜ਼/STEM/ਫ੍ਰੈਂਚ) ਲਈ।'
        };
  }
  if (item.id === 'fstp') {
    return {
      en: `Targets TEER 2/3 skilled trades with lower language thresholds (CLB 4–5) and dedicated Express Entry Trades category draws (~476 CRS).`,
      pa: 'TEER 2/3 ਟ੍ਰੇਡਜ਼ ਕਿੱਤਿਆਂ ਲਈ ਘੱਟ ਭਾਸ਼ਾ ਸ਼ਰਤ (CLB 4–5) ਅਤੇ ਖਾਸ ਟ੍ਰੇਡਜ਼ ਸ਼੍ਰੇਣੀ ਡਰਾਅ (~476 CRS) ਮਿਲਦੇ ਹਨ।'
    };
  }
  if (item.id === 'aip') {
    return p.jobOffer === 'aip'
      ? {
          en: 'Your designated Atlantic employer offer makes AIP one of the fastest, lowest-CRS routes (no Express Entry pool wait needed).',
          pa: 'ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਅਟਲਾਂਟਿਕ ਰੁਜ਼ਗਾਰਦਾਤਾ ਦਾ ਆਫਰ ਹੋਣ ਕਰਕੇ AIP ਘੱਟ ਭਾਸ਼ਾ ਪੱਧਰ ’ਤੇ ਸਿੱਧਾ PR ਰਸਤਾ ਹੈ।'
        }
      : {
          en: 'Accepts TEER 0–4 jobs at CLB 4–5 across 4 Atlantic provinces (~4,000 spots/yr) once you secure a designated employer offer.',
          pa: '4 ਅਟਲਾਂਟਿਕ ਸੂਬਿਆਂ ਵਿੱਚ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਰੁਜ਼ਗਾਰਦਾਤਾ ਦਾ ਆਫਰ ਮਿਲਣ ’ਤੇ CLB 4–5 ਅਤੇ TEER 0–4 ਨਾਲ ਯੋਗ।'
        };
  }
  if (item.id === 'rcip' || item.id === 'fcip') {
    return {
      en:
        item.id === 'fcip'
          ? `Matches your French NCLC ${p.frenchNclc} across 6 designated Francophone rural communities with direct community recommendation.`
          : 'Dedicated employer-driven rural pathway across 14 designated towns with lower language thresholds (CLB 4–6) and no CRS lottery.',
      pa:
        item.id === 'fcip'
          ? '6 ਫ੍ਰੈਂਚ ਕਮਿਊਨਿਟੀਆਂ ਵਿੱਚ ਫ੍ਰੈਂਚ NCLC 5+ ਅਤੇ ਕਮਿਊਨਿਟੀ ਸਿਫਾਰਸ਼ ਨਾਲ ਸਿੱਧਾ PR ਰਸਤਾ।'
          : '14 ਪੇਂਡੂ ਕਸਬਿਆਂ ਵਿੱਚ ਬਿਨਾਂ CRS ਮੁਕਾਬਲੇ ਦੇ CLB 4–6 ਨਾਲ ਕਮਿਊਨਿਟੀ ਆਧਾਰਿਤ ਸਿੱਧਾ PR ਰਸਤਾ।'
    };
  }
  if (item.id === 'quebec') {
    return {
      en: 'Quebec runs its own selection system (Arrima PSTQ & reopened PEQ) heavily favoring French proficiency (oral 7 / written 5).',
      pa: 'ਕਿਊਬੈਕ ਦਾ ਆਪਣਾ ਸਿਸਟਮ (Arrima PSTQ ਅਤੇ ਮੁੜ ਖੁੱਲ੍ਹਿਆ PEQ) ਫ੍ਰੈਂਚ ਬੋਲਣ ਵਾਲਿਆਂ ਨੂੰ ਖਾਸ ਤਰਜੀਹ ਦਿੰਦਾ ਹੈ।'
    };
  }
  if (item.id === 'study') {
    return {
      en: 'Completing a PGWP-eligible Canadian credential boosts CRS (+15/+30), adds Integration points, and unlocks CEC and provincial graduate PNPs.',
      pa: 'PGWP-ਯੋਗ ਕੈਨੇਡੀਅਨ ਪੜ੍ਹਾਈ +15/+30 CRS ਅੰਕ, ਇੰਟੀਗ੍ਰੇਸ਼ਨ ਅੰਕ ਅਤੇ CEC/ਗ੍ਰੈਜੂਏਟ PNP ਰਸਤੇ ਖੋਲ੍ਹਦੀ ਹੈ।'
    };
  }

  const provCode = item.id.replace('pnp-', '');
  if (p.provincePref === provCode) {
    return {
      en: `Aligned with your preferred province (${provCode})${hasOffer ? ' and supported by your employer job offer (+600 Express Entry CRS if EE-aligned).' : ' — focus on securing a local offer or meeting its targeted occupation draws.'}`,
      pa: `ਤੁਹਾਡੇ ਚੁਣੇ ਹੋਏ ਸੂਬੇ (${provCode}) ਅਨੁਸਾਰ ਢੁੱਕਵਾਂ ਵਿਕਲਪ${hasOffer ? ' ਅਤੇ ਜੌਬ ਆਫਰ ਨਾਲ ਮਜ਼ਬੂਤ (+600 CRS ਜੇ EE-ਲਿੰਕਡ ਹੋਵੇ)।' : ' — ਸਥਾਨਕ ਆਫਰ ਜਾਂ ਟਾਰਗੇਟ ਕਿੱਤਾ ਡਰਾਅ ’ਤੇ ਧਿਆਨ ਦਿਓ।'}`
    };
  }
  return {
    en:
      item.status === 'eligible'
        ? `Your profile meets ${item.name.en} active intake criteria${hasOffer ? ' with an employer offer (+600 CRS boost if Express Entry aligned)' : ''}.`
        : `Active provincial pathway where closing the listed gap unlocks +600 Express Entry CRS points or direct provincial PR nomination.`,
    pa:
      item.status === 'eligible'
        ? `ਤੁਹਾਡਾ ਪ੍ਰੋਫਾਈਲ ${item.name.pa} ਦੀਆਂ ਮੌਜੂਦਾ ਸ਼ਰਤਾਂ ਪੂਰੀਆਂ ਕਰਦਾ ਹੈ।`
        : `ਸਰਗਰਮ ਸੂਬਾਈ ਰਸਤਾ — ਬਾਕੀ ਸ਼ਰਤ ਪੂਰੀ ਕਰਨ ’ਤੇ ਨਾਮਜ਼ਦਗੀ (+600 CRS) ਮਿਲ ਸਕਦੀ ਹੈ।`
  };
}

function buildActionSteps(p: EligibilityProfile, item: PathwayEvaluation): BiText[] {
  const steps: BiText[] = [];
  const bestLang = Math.max(p.englishClb, p.frenchNclc);

  // Step 1: Close explicit missing gaps OR confirm immediate filing readiness
  if (item.missing.length > 0) {
    const gapEn = item.missing.map((m) => m.en).join('; ');
    const gapPa = item.missing.map((m) => m.pa).join('; ');
    steps.push({
      en: `Close key gap first: ${gapEn}.`,
      pa: `ਪਹਿਲਾਂ ਮੁੱਖ ਘਾਟ ਪੂਰੀ ਕਰੋ: ${gapPa}।`
    });
  } else {
    steps.push({
      en: 'Core eligibility met — gather official proof (language test TRF, reference letters with NOC duties/hours, and IDs) immediately.',
      pa: 'ਮੁੱਖ ਸ਼ਰਤਾਂ ਪੂਰੀਆਂ ਹਨ — ਤੁਰੰਤ ਅਧਿਕਾਰਤ ਦਸਤਾਵੇਜ਼ (ਭਾਸ਼ਾ ਨਤੀਜਾ, NOC ਡਿਊਟੀਆਂ ਵਾਲਾ ਰੈਫਰੈਂਸ ਲੈਟਰ) ਤਿਆਰ ਕਰੋ।'
    });
  }

  // Step 2: Program-specific tactical step
  if (item.id === 'fswp' || item.id === 'cec' || item.id === 'fstp') {
    if (p.canadianYears === 0 && p.education !== 'hs') {
      steps.push({
        en: 'Obtain an Educational Credential Assessment (WES / ICAS / CES) for your highest foreign degree before creating your Express Entry profile.',
        pa: 'Express Entry ਪ੍ਰੋਫਾਈਲ ਬਣਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਆਪਣੀ ਵਿਦੇਸ਼ੀ ਡਿਗਰੀ ਲਈ WES / ICAS ਤੋਂ ECA ਕਰਵਾਓ।'
      });
    }
    if (bestLang < 9 && p.frenchNclc < 7) {
      steps.push({
        en: 'Push English to CLB 9+ (or add French NCLC 7+ via TEF/TCF) to reach competitive 2026 CRS draw cutoffs (~407 French / ~510–530 CEC).',
        pa: '2026 ਦੇ ਡਰਾਅ ਕੱਟਆਫ ਤੱਕ ਪਹੁੰਚਣ ਲਈ ਅੰਗਰੇਜ਼ੀ CLB 9+ ਕਰੋ ਜਾਂ ਫ੍ਰੈਂਚ NCLC 7+ (TEF/TCF) ਜੋੜੋ।'
      });
    } else {
      steps.push({
        en: 'Create your IRCC Express Entry profile and confirm your NOC 2021 code against 2026 category-based draws (Healthcare, Trades, STEM, Transport, French).',
        pa: 'IRCC Express Entry ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ ਅਤੇ 2026 ਸ਼੍ਰੇਣੀ ਡਰਾਅ (ਸਿਹਤ, ਟ੍ਰੇਡਜ਼, STEM, ਫ੍ਰੈਂਚ) ਵਿੱਚ ਆਪਣਾ NOC ਕੋਡ ਚੈੱਕ ਕਰੋ।'
      });
    }
  } else if (item.id.startsWith('pnp-')) {
    const provCode = item.id.replace('pnp-', '');
    const portalHint = PNP_PORTAL_GUIDANCE[provCode];
    if (portalHint) steps.push(portalHint);
    steps.push({
      en: 'Verify if your NOC TEER qualifies for the province’s Express Entry-linked stream (+600 CRS) vs. base paper/portal stream.',
      pa: 'ਜਾਂਚ ਕਰੋ ਕਿ ਤੁਹਾਡਾ NOC ਕੋਡ ਸੂਬੇ ਦੀ Express Entry ਸਟ੍ਰੀਮ (+600 CRS) ਵਿੱਚ ਆਉਂਦਾ ਹੈ ਜਾਂ ਬੇਸ ਸਟ੍ਰੀਮ ਵਿੱਚ।'
    });
  } else if (item.id === 'aip') {
    steps.push({
      en: 'Verify your employer appears on the official provincial AIP Designated Employer list (NB, NS, PEI, or NL) and complete your settlement plan.',
      pa: 'ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ ਰੁਜ਼ਗਾਰਦਾਤਾ NB/NS/PEI/NL ਦੀ AIP ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਸੂਚੀ ਵਿੱਚ ਹੈ ਅਤੇ ਸੈਟਲਮੈਂਟ ਪਲਾਨ ਤਿਆਰ ਕਰੋ।'
    });
  } else if (item.id === 'rcip' || item.id === 'fcip') {
    steps.push({
      en: 'Check the official community employer list for the 14 RCIP or 6 FCIP towns so the local economic development org can issue your Recommendation.',
      pa: '14 RCIP ਜਾਂ 6 FCIP ਕਸਬਿਆਂ ਦੀ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਰੁਜ਼ਗਾਰਦਾਤਾ ਸੂਚੀ ਵਿੱਚੋਂ ਆਫਰ ਅਤੇ ਕਮਿਊਨਿਟੀ ਸਿਫਾਰਸ਼ ਲਓ।'
    });
  } else if (item.id === 'quebec') {
    steps.push({
      en: 'Register an Arrima profile with verified TEF/TCF French scores (oral 7 / written 5) to pursue a Quebec Selection Certificate (CSQ).',
      pa: 'TEF/TCF ਫ੍ਰੈਂਚ ਸਕੋਰਾਂ ਨਾਲ Arrima ਪੋਰਟਲ ’ਤੇ ਰਜਿਸਟਰ ਕਰੋ ਅਤੇ CSQ (Quebec Selection Certificate) ਲਈ ਅਪਲਾਈ ਕਰੋ।'
    });
  } else if (item.id === 'family') {
    steps.push({
      en: 'Prepare marriage/common-law cohabitation proofs, sponsor undertaking forms, and apply via IRCC PR Portal (Inland applicants can also apply for an Open Work Permit).',
      pa: 'ਵਿਆਹ/ਰਿਸ਼ਤੇ ਦੇ ਸਬੂਤ ਇਕੱਠੇ ਕਰੋ ਅਤੇ IRCC PR ਪੋਰਟਲ ਰਾਹੀਂ ਅਪਲਾਈ ਕਰੋ (ਕੈਨੇਡਾ ਅੰਦਰ Open Work Permit ਵੀ ਮਿਲ ਸਕਦਾ ਹੈ)।'
    });
  } else if (item.id === 'study') {
    steps.push({
      en: 'Select a PGWP-eligible DLI program (Master’s, Trades, or Healthcare prioritized under 2026 rules) and budget tuition + Provincial Attestation Letter (PAL).',
      pa: 'PGWP-ਯੋਗ DLI ਕੋਰਸ (ਮਾਸਟਰ/ਟ੍ਰੇਡਜ਼/ਸਿਹਤ) ਚੁਣੋ ਅਤੇ PAL ਲੈਟਰ + ਫੀਸ ਦਾ ਪ੍ਰਬੰਧ ਕਰੋ।'
    });
  }

  // Step 3: Official verification & My Plan adoption
  steps.push({
    en: 'Adopt this pathway into My Plan to track documents, fees, police clearances, and verify live draw cutoffs on canada.ca.',
    pa: 'ਦਸਤਾਵੇਜ਼ਾਂ, ਫੀਸਾਂ ਅਤੇ ਮੈਡੀਕਲ/ਪੁਲਿਸ ਕਲੀਅਰੈਂਸ ਨੂੰ ਟਰੈਕ ਕਰਨ ਲਈ ਇਸ ਰਸਤੇ ਨੂੰ My Plan ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ।'
  });

  return steps.slice(0, 3);
}

function getTimelineEstimate(item: PathwayEvaluation): BiText {
  if (item.id === 'cec' || item.id === 'fswp' || item.id === 'fstp') {
    return { en: '~6 months PR processing after ITA', pa: 'ITA ਤੋਂ ਬਾਅਦ ~6 ਮਹੀਨੇ PR ਪ੍ਰੋਸੈਸਿੰਗ' };
  }
  if (item.id === 'family') {
    return { en: '~10–14 months (Outland/Inland Sponsorship)', pa: '~10–14 ਮਹੀਨੇ (ਸਪਾਂਸਰਸ਼ਿਪ ਪ੍ਰਕਿਰਿਆ)' };
  }
  if (item.id === 'aip' || item.id === 'rcip' || item.id === 'fcip') {
    return { en: '~8–14 months incl. endorsement/recommendation', pa: '~8–14 ਮਹੀਨੇ (ਸਿਫਾਰਸ਼ ਸਮੇਤ)' };
  }
  if (item.id === 'study') {
    return { en: '2–4 years (Study + 1 yr PGWP work + PR)', pa: '2–4 ਸਾਲ (ਪੜ੍ਹਾਈ + 1 ਸਾਲ ਕੰਮ + PR)' };
  }
  return { en: '~9–18 months (Nomination + Federal PR)', pa: '~9–18 ਮਹੀਨੇ (ਨਾਮਜ਼ਦਗੀ + ਫੈਡਰਲ PR)' };
}

export function getTopActionPlan(p: EligibilityProfile, results: PathwayEvaluation[]): ActionPlanItem[] {
  const bestLang = Math.max(p.englishClb, p.frenchNclc);
  const totalSkilledYrs = (p.foreignTeer <= 3 ? p.foreignYears : 0) + (p.canadianTeer <= 3 ? p.canadianYears : 0);
  const hasSkilledOffer = p.jobOffer === 'skilled' || p.jobOffer === 'aip' || p.jobOffer === 'rcip';

  const candidates = results.filter((item) => {
    if (item.id === 'suv') return false;
    if (item.id === 'family' && p.spouse !== 'canadian') return false;
    return true;
  });

  const scored = candidates.map((item) => {
    let score = item.status === 'eligible' ? 120 : item.status === 'almost' ? 55 : 5;

    if (item.id === 'family' && p.spouse === 'canadian') score += 130;

    if (item.id === 'cec') {
      if (item.status === 'eligible') score += 70;
      else if (p.canadianYears > 0 && p.canadianTeer <= 3) score += 35;
      else if (p.canadianStudy !== 'none') score += 20;
    } else if (item.id === 'fswp') {
      if (item.status === 'eligible') score += 60;
      if (p.frenchNclc >= 7) score += 45;
      if (bestLang >= 9) score += 25;
      if (p.jobOffer === 'none' && p.canadianYears === 0) score += 15;
    } else if (item.id === 'fstp') {
      if (item.status === 'eligible') score += 58;
      if (p.jobOffer === 'trade_cert' || p.foreignTeer === 2 || p.foreignTeer === 3 || p.canadianTeer === 2 || p.canadianTeer === 3) {
        score += 24;
      }
    } else if (item.id === 'aip') {
      if (p.jobOffer === 'aip') score += 95;
      else if (['NB', 'NS', 'PE', 'NL'].includes(p.provincePref)) score += 25;
      else if (!hasSkilledOffer && bestLang >= 4 && bestLang < 7) score += 14;
    } else if (item.id === 'rcip') {
      if (p.jobOffer === 'rcip') score += 92;
      else if (!hasSkilledOffer && bestLang >= 4 && totalSkilledYrs >= 1) score += 10;
    } else if (item.id === 'fcip') {
      if (p.frenchNclc >= 5 && p.jobOffer === 'rcip') score += 105;
      else if (p.frenchNclc >= 5) score += 26;
      else score -= 15;
    } else if (item.id === 'quebec') {
      if (p.provincePref === 'QC') score += 75;
      if (p.frenchNclc >= 7) score += 45;
      else score -= 35;
    } else if (item.id === 'study') {
      if (p.canadianStudy !== 'none' && p.canadianYears >= 1) score += 25;
      else score -= 35;
    } else if (item.id.startsWith('pnp-')) {
      const provCode = item.id.replace('pnp-', '');
      if (p.provincePref === provCode) score += 72;
      if (provCode === 'SK') {
        score -= p.provincePref === 'SK' ? 10 : 65;
      } else if (provCode === 'ON') {
        score += hasSkilledOffer ? 18 : -25;
      } else if (provCode === 'AB') {
        score += item.status === 'eligible' ? 30 : 16;
      } else if (['NB', 'NL', 'BC', 'NS'].includes(provCode)) {
        score += item.status === 'eligible' ? 22 : 12;
      } else {
        score += item.status === 'eligible' ? 16 : 8;
      }
    }

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Pick top 3 while ensuring balanced federal/regional/PNP diversity when user checks ANY province
  const chosen: PathwayEvaluation[] = [];
  const hasNonPnpViable = scored.some((s) => !s.item.id.startsWith('pnp-') && s.item.status !== 'not');
  let pnpCount = 0;

  for (const entry of scored) {
    if (chosen.length === 3) break;
    const isPnp = entry.item.id.startsWith('pnp-');
    if (isPnp && p.provincePref === 'ANY' && hasNonPnpViable && pnpCount >= 2) {
      continue;
    }
    chosen.push(entry.item);
    if (isPnp) pnpCount += 1;
  }

  for (const entry of scored) {
    if (chosen.length === 3) break;
    if (!chosen.some((c) => c.id === entry.item.id)) {
      chosen.push(entry.item);
    }
  }

  const rankTags: { eligible: BiText; fallback: BiText }[] = [
    {
      eligible: { en: 'Top Priority Match', pa: 'ਸਭ ਤੋਂ ਵਧੀਆ ਵਿਕਲਪ' },
      fallback: { en: 'Closest Viable Path', pa: 'ਸਭ ਤੋਂ ਨੇੜਲਾ ਰਸਤਾ' }
    },
    {
      eligible: { en: 'Strong Second Option', pa: 'ਮਜ਼ਬੂਤ ਦੂਜਾ ਵਿਕਲਪ' },
      fallback: { en: 'High-Potential Option', pa: 'ਉੱਚ ਸੰਭਾਵਨਾ ਵਾਲਾ ਰਸਤਾ' }
    },
    {
      eligible: { en: 'Strategic Backup', pa: 'ਤੀਜਾ ਰਣਨੀਤਕ ਵਿਕਲਪ' },
      fallback: { en: 'Bridge / Backup Route', pa: 'ਬੈਕਅੱਪ ਰਸਤਾ' }
    }
  ];

  return chosen.map((evaluation, idx) => {
    const rank = (idx + 1) as 1 | 2 | 3;
    const tagSet = rankTags[idx];
    return {
      rank,
      evaluation,
      priorityTag: evaluation.status === 'eligible' ? tagSet.eligible : tagSet.fallback,
      whyFits: buildWhyFits(p, evaluation),
      actionSteps: buildActionSteps(p, evaluation),
      timeline: getTimelineEstimate(evaluation)
    };
  });
}

