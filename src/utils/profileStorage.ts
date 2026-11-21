import { BiText, Lang, UserLocalProfile } from '../types';

const PROFILE_STORAGE_KEY = 'cip_2026_user_profile_v1';

export function tText(text: BiText | string, lang: Lang): string {
  if (typeof text === 'string') return text;
  return text[lang] || text.en;
}

export function getDefaultProfile(): UserLocalProfile {
  return {
    displayName: '',
    targetYear: '2026–2027',
    pathwayId: 'cec',
    checkedSteps: {},
    notes: '',
    wizardSelections: { where: 'outside', job: 'no', lang: 'clb7' },
    lastCrsScore: null,
    eligibilitySnapshot: null,
    updatedAt: new Date().toISOString()
  };
}

export function loadUserProfile(): UserLocalProfile {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return getDefaultProfile();
    const parsed = JSON.parse(raw) as Partial<UserLocalProfile>;
    return {
      ...getDefaultProfile(),
      ...parsed,
      wizardSelections: {
        ...getDefaultProfile().wizardSelections,
        ...(parsed.wizardSelections || {})
      },
      checkedSteps: parsed.checkedSteps || {}
    };
  } catch {
    return getDefaultProfile();
  }
}

export function saveUserProfile(profile: UserLocalProfile): UserLocalProfile {
  const next: UserLocalProfile = {
    ...profile,
    updatedAt: new Date().toISOString()
  };
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage quota errors silently
  }
  return next;
}

const AUTOSAVE_KEY = 'cip_2026_autosave_v1';

export function loadAutoSavePreference(): boolean {
  try {
    const raw = localStorage.getItem(AUTOSAVE_KEY);
    return raw === null ? true : raw === 'true';
  } catch {
    return true;
  }
}

export function saveAutoSavePreference(enabled: boolean): void {
  try {
    localStorage.setItem(AUTOSAVE_KEY, String(enabled));
  } catch {
    // Ignore storage errors
  }
}
