export type Lang = 'en' | 'pa';

export interface BiText {
  en: string;
  pa: string;
}

export type AppSection =
  | 'home'
  | 'checker'
  | 'ee'
  | 'pnp'
  | 'quebec'
  | 'regional'
  | 'draws'
  | 'calculators'
  | 'library'
  | 'fraud'
  | 'myplan';

export interface WizardState {
  where: 'outside' | 'worker' | 'student' | 'visitor';
  job: 'yes_valid' | 'yes_trade' | 'no';
  lang: 'clb9' | 'clb7' | 'clb5' | 'french' | 'low';
}

export type EducationLevel = 'hs' | '1yr' | '2yr' | 'bach' | 'two' | 'mast' | 'phd';
export type JobOfferType = 'none' | 'skilled' | 'aip' | 'rcip' | 'trade_cert';
export type SpouseStatus = 'single' | 'foreign' | 'canadian';
export type CanadianStudyType = 'none' | '12' | '3p';

export interface EligibilityProfile {
  age: number;
  education: EducationLevel;
  englishClb: number;
  frenchNclc: number;
  foreignYears: number;
  foreignTeer: number;
  canadianYears: number;
  canadianTeer: number;
  jobOffer: JobOfferType;
  provincePref: string;
  spouse: SpouseStatus;
  fundsCad: number;
  siblingInCanada: boolean;
  canadianStudy: CanadianStudyType;
}

export type EligibilityStatus = 'eligible' | 'almost' | 'not';

export interface PathwayEvaluation {
  id: string;
  name: BiText;
  category: BiText;
  status: EligibilityStatus;
  summary: BiText;
  missing: BiText[];
  planKey?: string;
}

export interface ActionPlanItem {
  rank: 1 | 2 | 3;
  evaluation: PathwayEvaluation;
  priorityTag: BiText;
  whyFits: BiText;
  actionSteps: BiText[];
  timeline: BiText;
}

export interface PnpStreamDetail {
  name: BiText;
  status: 'Open' | 'Limited' | 'Paused' | 'Closed';
  jobOfferRequired: boolean;
  expressEntry: boolean;
  workExp: BiText;
  language: BiText;
  education: BiText;
  occupations: BiText;
  fundsOrWage: BiText;
  keyCriteria: BiText;
}

export interface PnpProvinceInfo {
  code: string;
  name: BiText;
  alloc: string;
  status: BiText;
  statusTone: 'open' | 'limited' | 'closed';
  jobOffer: BiText;
  scoreSystem: string;
  eeOption: boolean;
  streams: BiText;
  keyFact: BiText;
  url: string;
  feeCad: string;
  processingNote: BiText;
  occupationFocus: BiText;
  languageSummary: BiText;
  workExpSummary: BiText;
  streamsDetail: PnpStreamDetail[];
}

export interface DrawRecord {
  id: string;
  scope: 'Federal' | 'Province';
  prov?: string;
  date: string;
  program: BiText;
  itas: string;
  crs: string;
  note: BiText;
}

export interface QuotaProgress {
  prov: BiText;
  totalLabel: string;
  detail: BiText;
  pct: number;
  tone: 'healthy' | 'warning' | 'full';
}

export interface FaqEntry {
  cat: 'general' | 'ee' | 'pnp' | 'language' | 'regional' | 'docs';
  q: BiText;
  a: BiText;
}

export interface PlanStep {
  id: string;
  en: string;
  pa: string;
}

export interface PlanTemplate {
  id: string;
  name: BiText;
  timeline: BiText;
  steps: PlanStep[];
}

export interface CrsInput {
  married: boolean;
  age: number;
  education: EducationLevel;
  l1Listening: number;
  l1Reading: number;
  l1Writing: number;
  l1Speaking: number;
  l2MinClb: number;
  canadianWorkYears: number;
  foreignWorkYears: number;
  spouseEducation: EducationLevel;
  spouseLangMin: number;
  spouseCanWorkYears: number;
  tradeCert: boolean;
  pnpNomination: boolean;
  integrationPoints: 0 | 50 | 100 | 150;
  canadianStudy: CanadianStudyType;
  frenchBonus: 'none' | 'french_only' | 'bilingual';
  siblingInCanada: boolean;
}

export interface CrsBreakdown {
  coreHumanCapital: number;
  spouseFactors: number;
  skillTransferability: number;
  additionalPoints: number;
  total: number;
}

export interface SavedEligibilitySnapshot {
  savedAt: string;
  eligibleCount: number;
  almostCount: number;
  topEligibleNames: string[];
  profile: EligibilityProfile;
}

export interface UserLocalProfile {
  displayName: string;
  targetYear: string;
  pathwayId: string;
  checkedSteps: Record<string, boolean>;
  notes: string;
  wizardSelections: WizardState;
  lastCrsScore: number | null;
  eligibilitySnapshot: SavedEligibilitySnapshot | null;
  updatedAt: string;
}
