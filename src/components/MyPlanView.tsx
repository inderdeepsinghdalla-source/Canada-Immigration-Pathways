import { useRef, useState } from 'react';
import { Printer, Download, Upload, Trash2, CheckSquare, Square, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { PLAN_TEMPLATES } from '../data/immigrationData';
import { Lang, UserLocalProfile } from '../types';
import { getDefaultProfile, tText } from '../utils/profileStorage';
import { DisclaimerBanner } from './DisclaimerBanner';

interface Props {
  lang: Lang;
  profile: UserLocalProfile;
  autoSave: boolean;
  hasUnsavedChanges: boolean;
  onToggleAutoSave: () => void;
  onManualSave: () => void;
  onUpdateProfile: (next: UserLocalProfile) => void;
}

export function MyPlanView({
  lang,
  profile,
  autoSave,
  hasUnsavedChanges,
  onToggleAutoSave,
  onManualSave,
  onUpdateProfile
}: Props) {
  const pa = lang === 'pa';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importMsg, setImportMsg] = useState<string>('');
  const [manualSavedFlash, setManualSavedFlash] = useState<boolean>(false);

  const template = PLAN_TEMPLATES[profile.pathwayId] || PLAN_TEMPLATES.cec;
  const completedCount = template.steps.filter((s) => profile.checkedSteps[s.id]).length;
  const pct = Math.round((completedCount / template.steps.length) * 100);

  const formattedUpdated = (() => {
    try {
      return new Date(profile.updatedAt).toLocaleString(pa ? 'pa-IN' : 'en-CA', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return profile.updatedAt;
    }
  })();

  const handleSaveNow = () => {
    onManualSave();
    setManualSavedFlash(true);
    setTimeout(() => setManualSavedFlash(false), 2400);
  };

  const toggleStep = (stepId: string) => {
    onUpdateProfile({
      ...profile,
      checkedSteps: {
        ...profile.checkedSteps,
        [stepId]: !profile.checkedSteps[stepId]
      }
    });
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `canada-pr-plan-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || '{}')) as Partial<UserLocalProfile>;
        if (!parsed.pathwayId || !parsed.checkedSteps) {
          setImportMsg(pa ? 'ਗਲਤ ਪ੍ਰੋਫਾਈਲ ਫਾਈਲ।' : 'Invalid profile backup file.');
          return;
        }
        onUpdateProfile({
          ...getDefaultProfile(),
          ...parsed
        });
        setImportMsg(pa ? 'ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ ਅਤੇ ਪਲਾਨ ਰੀਸਟੋਰ ਹੋ ਗਿਆ!' : 'Profile & My Plan restored successfully.');
      } catch {
        setImportMsg(pa ? 'ਫਾਈਲ ਪੜ੍ਹਨ ਵਿੱਚ ਗਲਤੀ।' : 'Could not parse backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    onUpdateProfile(getDefaultProfile());
    setImportMsg(pa ? 'ਲੋਕਲ ਪ੍ਰੋਫਾਈਲ ਸਾਫ਼ ਕਰ ਦਿੱਤੀ ਗਈ।' : 'Local profile reset to defaults.');
  };

  return (
    <div className="space-y-6">
      <DisclaimerBanner lang={lang} />

      {/* Top Saved Status & Persistence Control Summary */}
      <section
        aria-label={pa ? 'ਸੇਵ ਸਥਿਤੀ ਸੰਖੇਪ' : 'Saved Status Summary'}
        className={`rounded-2xl border p-4 sm:p-6 shadow-xs print-card ${
          hasUnsavedChanges
            ? 'border-amber-300 bg-amber-50/70'
            : 'border-emerald-200 bg-emerald-50/50'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {hasUnsavedChanges ? (
              <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" aria-hidden="true" />
            )}
            <div>
              <div className="text-xs font-semibold text-slate-600">
                {autoSave
                  ? pa ? 'ਆਟੋ-ਸੇਵ ਚਾਲੂ ਹੈ (localStorage)' : 'Auto-Save Enabled · Local Browser Storage'
                  : pa ? 'ਮੈਨੂਅਲ ਸੇਵ ਮੋਡ (ਆਟੋ-ਸੇਵ ਬੰਦ)' : 'Manual Save Mode · Auto-Save Off'}
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span>{pa ? `ਆਖਰੀ ਸੇਵ: ${formattedUpdated}` : `Last saved: ${formattedUpdated}`}</span>
              </div>
              <h2 className="mt-1 text-lg sm:text-xl font-bold text-slate-900">
                {hasUnsavedChanges
                  ? pa
                    ? 'ਤੁਹਾਡੀਆਂ ਤਬਦੀਲੀਆਂ ਹਾਲੇ ਡਿਵਾਈਸ ’ਤੇ ਸੇਵ ਨਹੀਂ ਹੋਈਆਂ'
                    : 'Unsaved changes in your current session'
                  : pa
                    ? 'ਤੁਹਾਡੀ ਯੋਜਨਾ ਅਤੇ ਪ੍ਰੋਫਾਈਲ ਇਸ ਡਿਵਾਈਸ ’ਤੇ ਸੁਰੱਖਿਅਤ ਸੇਵ ਹੈ'
                    : 'Your plan, pathway, and results are saved on this device'}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-700 tabular-nums">
                {pa
                  ? `ਚੁਣਿਆ ਰਸਤਾ: ${tText(template.name, lang)} · ਪ੍ਰਗਤੀ: ${pct}% (${completedCount}/${template.steps.length}) · CRS: ${profile.lastCrsScore ?? '—'}`
                  : `Pathway: ${tText(template.name, lang)} · Checklist: ${pct}% (${completedCount}/${template.steps.length}) · Saved CRS: ${profile.lastCrsScore ?? '—'}`}
              </p>
            </div>
          </div>

          <div className="no-print w-full lg:w-auto grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              role="switch"
              aria-checked={autoSave}
              onClick={onToggleAutoSave}
              className={`w-full sm:w-auto min-h-[44px] rounded-xl border px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer text-center ${
                autoSave
                  ? 'border-emerald-300 bg-white text-emerald-900 hover:bg-emerald-50'
                  : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              {autoSave
                ? pa ? 'ਆਟੋ-ਸੇਵ: ਚਾਲੂ (ਬੰਦ ਕਰੋ)' : 'Auto-Save: On (Switch to Manual)'
                : pa ? 'ਆਟੋ-ਸੇਵ: ਬੰਦ (ਚਾਲੂ ਕਰੋ)' : 'Auto-Save: Off (Enable Auto-Save)'}
            </button>

            <button
              type="button"
              onClick={handleSaveNow}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-colors cursor-pointer ${
                hasUnsavedChanges
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-slate-900 hover:bg-slate-800'
              }`}
            >
              <Save className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {manualSavedFlash
                  ? pa ? 'ਡਿਵਾਈਸ ’ਤੇ ਸੇਵ ਹੋ ਗਿਆ!' : 'Saved to Local Device!'
                  : pa ? 'ਪ੍ਰਗਤੀ ਲੋਕਲ ਡਿਵਾਈਸ ’ਤੇ ਸੇਵ ਕਰੋ' : 'Save Progress to Local Device'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Profile Header & Actions */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs print-card">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="text-xs font-medium text-slate-500">
              {pa
                ? 'ਬ੍ਰਾਊਜ਼ਰ localStorage · ਕੋਈ ਲੌਗਇਨ ਲੋੜੀਂਦਾ ਨਹੀਂ · JSON ਬੈਕਅੱਪ'
                : 'Offline browser profile · Portable JSON export/import supported'}
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">
              {pa ? 'ਮੇਰੀ PR ਯੋਜਨਾ ਅਤੇ ਪ੍ਰੋਫਾਈਲ (My Plan)' : 'My Plan & Saved Profile'}
            </h1>
          </div>
          <div className="no-print w-full lg:w-auto grid grid-cols-1 sm:flex sm:flex-wrap gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 cursor-pointer"
            >
              <Printer className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{pa ? 'ਪ੍ਰਿੰਟ / PDF ਸੇਵ' : 'Print / Save PDF'}</span>
            </button>
            <button
              type="button"
              onClick={handleExportJson}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer"
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{pa ? 'ਬੈਕਅੱਪ ਡਾਊਨਲੋਡ' : 'Export Backup'}</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer"
            >
              <Upload className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{pa ? 'ਰੀਸਟੋਰ ਕਰੋ' : 'Import Backup'}</span>
            </button>
            <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportJson} />
          </div>
        </div>

        {importMsg && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-900">
            {importMsg}
          </div>
        )}

        {/* Personal Profile Fields */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਤੁਹਾਡਾ ਨਾਮ (ਵਿਕਲਪਿਕ)' : 'Profile Name (Optional)'}</span>
            <input
              type="text"
              placeholder={pa ? 'ਜਿਵੇਂ: ਹਰਪ੍ਰੀਤ ਸਿੰਘ' : 'e.g., Harpreet Singh'}
              className="min-h-[44px] rounded-lg border border-slate-300 px-3 text-base sm:text-sm font-normal"
              value={profile.displayName}
              onChange={(e) => onUpdateProfile({ ...profile, displayName: e.target.value })}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਚੁਣਿਆ ਗਿਆ PR ਰਸਤਾ' : 'Chosen PR Pathway'}</span>
            <select
              className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm font-normal"
              value={profile.pathwayId}
              onChange={(e) => onUpdateProfile({ ...profile, pathwayId: e.target.value })}
            >
              {Object.values(PLAN_TEMPLATES).map((tmpl) => (
                <option key={tmpl.id} value={tmpl.id}>
                  {tText(tmpl.name, lang)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
            <span>{pa ? 'ਟੀਚਾ ਸਾਲ' : 'Target Timeline'}</span>
            <input
              type="text"
              className="min-h-[44px] rounded-lg border border-slate-300 px-3 text-base sm:text-sm font-normal"
              value={profile.targetYear}
              onChange={(e) => onUpdateProfile({ ...profile, targetYear: e.target.value })}
            />
          </label>
        </div>

        {/* Saved Metrics Summary */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div>
            <div className="text-xs text-slate-500">{pa ? 'ਸੇਵ ਕੀਤਾ CRS ਸਕੋਰ' : 'Saved CRS Score'}</div>
            <div className="mt-0.5 text-2xl font-bold font-mono tabular-nums text-slate-900">
              {profile.lastCrsScore !== null ? `${profile.lastCrsScore} / 1,200` : pa ? 'ਹਾਲੇ ਸੇਵ ਨਹੀਂ' : 'Not saved yet'}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">{pa ? 'ਸੇਵ ਕੀਤੀ ਯੋਗਤਾ ਜਾਂਚ' : 'Saved Eligibility Check'}</div>
            <div className="mt-0.5 text-sm font-bold text-slate-900 tabular-nums">
              {profile.eligibilitySnapshot
                ? pa
                  ? `${profile.eligibilitySnapshot.eligibleCount} ਯੋਗ · ${profile.eligibilitySnapshot.almostCount} ਲਗਭਗ`
                  : `${profile.eligibilitySnapshot.eligibleCount} Eligible · ${profile.eligibilitySnapshot.almostCount} Almost`
                : pa ? 'ਹਾਲੇ ਸੇਵ ਨਹੀਂ' : 'Not saved yet'}
            </div>
            {profile.eligibilitySnapshot && profile.eligibilitySnapshot.topEligibleNames.length > 0 && (
              <div className="mt-0.5 text-xs text-slate-600 truncate">
                {profile.eligibilitySnapshot.topEligibleNames.join(' · ')}
              </div>
            )}
          </div>
          <div>
            <div className="text-xs text-slate-500">{pa ? 'ਵਿਜ਼ਾਰਡ ਸਥਿਤੀ' : 'Start-Here Wizard Selection'}</div>
            <div className="mt-0.5 text-sm font-semibold text-slate-800">
              {profile.wizardSelections.where} · {profile.wizardSelections.job} · {profile.wizardSelections.lang}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Checklist & Progress */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs print-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{tText(template.name, lang)}</h2>
            <p className="text-xs text-slate-500">{tText(template.timeline, lang)}</p>
          </div>
          <div className="text-right tabular-nums">
            <span className="text-2xl font-extrabold font-mono text-red-700">{pct}%</span>
            <span className="ml-2 text-xs font-semibold text-slate-600">
              ({completedCount}/{template.steps.length})
            </span>
          </div>
        </div>

        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-emerald-600 transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>

        <div className="mt-5 space-y-2.5">
          {template.steps.map((step) => {
            const done = !!profile.checkedSteps[step.id];
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => toggleStep(step.id)}
                className={`w-full min-h-[52px] flex items-start gap-3 rounded-xl border p-3.5 text-left transition-colors cursor-pointer ${
                  done ? 'border-emerald-200 bg-emerald-50/70' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                {done ? (
                  <CheckSquare className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                ) : (
                  <Square className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                )}
                <span className={`text-sm sm:text-base ${done ? 'line-through text-slate-500' : 'font-medium text-slate-900'}`}>
                  {pa ? step.pa : step.en}
                </span>
              </button>
            );
          })}
        </div>

        <label className="mt-6 flex flex-col gap-1.5 text-sm font-semibold text-slate-800">
          <span>{pa ? 'ਨਿੱਜੀ ਨੋਟਸ (ਨੋਟ: ਟੈਸਟ ਮਿਤੀਆਂ, ਦਸਤਾਵੇਜ਼)' : 'Personal Notes (Test Dates, Document Reminders)'}</span>
          <textarea
            rows={4}
            placeholder={pa ? 'ਇੱਥੇ ਆਪਣੇ ਨੋਟਸ ਲਿਖੋ...' : 'Write your target IELTS/TEF date, WES reference number, or reminders here...'}
            className="rounded-xl border border-slate-300 p-3 text-base sm:text-sm font-normal"
            value={profile.notes}
            onChange={(e) => onUpdateProfile({ ...profile, notes: e.target.value })}
          />
        </label>

        <div className="no-print mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-xl border border-slate-200 sm:border-transparent px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-red-700 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            <span>{pa ? 'ਲੋਕਲ ਪ੍ਰੋਫਾਈਲ ਰੀਸੈਟ ਕਰੋ' : 'Reset Local Profile'}</span>
          </button>
        </div>
      </section>
    </div>
  );
}
