import { useEffect, useState } from 'react';
import {
  Globe,
  Home,
  CheckCircle2,
  MapPin,
  ClipboardList,
  Menu,
  X,
  BarChart3,
  Calculator,
  BookOpen,
  ShieldAlert,
  Compass,
  Landmark,
  Plane
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { DATA_LAST_CHECKED, PLAN_TEMPLATES } from './data/immigrationData';
import { AppSection, Lang, SavedEligibilitySnapshot, UserLocalProfile, WizardState } from './types';
import {
  loadAutoSavePreference,
  loadUserProfile,
  saveAutoSavePreference,
  saveUserProfile
} from './utils/profileStorage';
import { StartHereView } from './components/StartHereView';
import { EligibilityView } from './components/EligibilityView';
import { ExpressEntryView } from './components/ExpressEntryView';
import { PnpExplorerView, PnpFocusRequest } from './components/PnpExplorerView';
import { QuebecView, RegionalView } from './components/QuebecRegionalView';
import { DrawsTrackerView } from './components/DrawsTrackerView';
import { CalculatorsView } from './components/CalculatorsView';
import { LibraryFocusRequest, ReferenceLibraryView } from './components/ReferenceLibraryView';
import { FraudWarningView } from './components/FraudWarningView';
import { MyPlanView } from './components/MyPlanView';
import { GlobalSearchAction, GlobalSearchBar } from './components/GlobalSearchBar';

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('cip_lang');
    return saved === 'pa' ? 'pa' : 'en';
  });

  const [section, setSection] = useState<AppSection>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pnpFocus, setPnpFocus] = useState<PnpFocusRequest | null>(null);
  const [libraryFocus, setLibraryFocus] = useState<LibraryFocusRequest | null>(null);
  const [profile, setProfile] = useState<UserLocalProfile>(() => loadUserProfile());
  const [autoSave, setAutoSave] = useState<boolean>(() => loadAutoSavePreference());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('cip_lang', lang);
  }, [lang]);

  const updateProfile = (next: UserLocalProfile) => {
    if (autoSave) {
      const saved = saveUserProfile(next);
      setProfile(saved);
      setHasUnsavedChanges(false);
    } else {
      setProfile(next);
      setHasUnsavedChanges(true);
    }
  };

  const handleToggleAutoSave = () => {
    const nextVal = !autoSave;
    setAutoSave(nextVal);
    saveAutoSavePreference(nextVal);
    if (nextVal && hasUnsavedChanges) {
      const saved = saveUserProfile(profile);
      setProfile(saved);
      setHasUnsavedChanges(false);
    }
  };

  const handleManualSave = () => {
    const saved = saveUserProfile(profile);
    setProfile(saved);
    setHasUnsavedChanges(false);
  };

  const handleWizardChange = (wiz: WizardState) => {
    updateProfile({ ...profile, wizardSelections: wiz });
  };

  const handleAdoptPathway = (planKey: string) => {
    updateProfile({ ...profile, pathwayId: PLAN_TEMPLATES[planKey] ? planKey : 'cec' });
    setSection('myplan');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveCrs = (score: number) => {
    updateProfile({ ...profile, lastCrsScore: score });
  };

  const handleSaveSnapshot = (snapshot: SavedEligibilitySnapshot) => {
    updateProfile({ ...profile, eligibilitySnapshot: snapshot });
  };

  const navigate = (sec: AppSection) => {
    setPnpFocus(null);
    setLibraryFocus(null);
    setSection(sec);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGlobalSearchSelect = (action: GlobalSearchAction) => {
    const seq = Date.now();
    if (action.pnpFocus) {
      setPnpFocus({ ...action.pnpFocus, seq });
    } else {
      setPnpFocus(null);
    }
    if (action.libraryFocus) {
      setLibraryFocus({ ...action.libraryFocus, seq });
    } else {
      setLibraryFocus(null);
    }
    setSection(action.section);
    setMobileMenuOpen(false);
    if (!action.pnpFocus) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const pa = lang === 'pa';

  const currentTemplate = PLAN_TEMPLATES[profile.pathwayId] || PLAN_TEMPLATES.cec;
  const doneSteps = currentTemplate.steps.filter((s) => profile.checkedSteps[s.id]).length;
  const planPct = Math.round((doneSteps / currentTemplate.steps.length) * 100);

  const allSections: { id: AppSection; en: string; pa: string; icon: typeof Home }[] = [
    { id: 'home', en: 'Start Here', pa: 'ਸ਼ੁਰੂ ਕਰੋ', icon: Home },
    { id: 'checker', en: 'Eligibility Checker', pa: 'ਯੋਗਤਾ ਜਾਂਚ', icon: CheckCircle2 },
    { id: 'ee', en: 'Express Entry', pa: 'ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ', icon: Plane },
    { id: 'pnp', en: 'PNP Map (11)', pa: 'PNP ਨਕਸ਼ਾ (11)', icon: MapPin },
    { id: 'quebec', en: 'Quebec', pa: 'ਕਿਊਬੈਕ', icon: Landmark },
    { id: 'regional', en: 'Regional & Closed', pa: 'ਖੇਤਰੀ ਅਤੇ ਬੰਦ', icon: Compass },
    { id: 'draws', en: 'LIVE Draws', pa: 'ਲਾਈਵ ਡਰਾਅ', icon: BarChart3 },
    { id: 'calculators', en: 'Calculators', pa: 'ਕੈਲਕੁਲੇਟਰ', icon: Calculator },
    { id: 'library', en: 'Library & 50+ FAQ', pa: 'ਲਾਇਬ੍ਰੇਰੀ / FAQ', icon: BookOpen },
    { id: 'fraud', en: 'Fraud Alert', pa: 'ਧੋਖਾਧੜੀ ਚੇਤਾਵਨੀ', icon: ShieldAlert },
    { id: 'myplan', en: `My Plan (${planPct}%)`, pa: `ਮੇਰੀ ਯੋਜਨਾ (${planPct}%)`, icon: ClipboardList }
  ];

  const isPathwayGroup = section === 'ee' || section === 'pnp' || section === 'quebec' || section === 'regional';
  const isToolsGroup = section === 'calculators' || section === 'library' || section === 'fraud' || section === 'myplan';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-20 lg:pb-0">
      {/* Strict 1-Row, 3-Zone Top Bar */}
      <header className="sticky top-0 z-40 h-14 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => navigate('home')}
            className="flex items-center gap-2 text-left whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white shrink-0" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1.5l1.9 4.7 3.6-1.3-1.2 4.3 3.7 1.1-1.3 2.5 2.3 1.4-4.7 2.2.7 2.4-4-0.6v4.3h-2v-4.3l-4 0.6.7-2.4L3 14.2l2.3-1.4-1.3-2.5 3.7-1.1-1.2-4.3 3.6 1.3z" />
              </svg>
            </span>
            <span className="text-sm sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
              {pa ? 'ਕੈਨੇਡਾ PR ਗਾਈਡ 2026' : 'Canada PR Guide 2026'}
            </span>
          </button>

          {/* Zone 2: 5 Concise Single-Line Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-semibold text-slate-600" aria-label="Primary navigation">
            <button
              type="button"
              onClick={() => navigate('home')}
              className={`whitespace-nowrap shrink-0 py-1 cursor-pointer transition-colors ${section === 'home' ? 'text-red-700 underline underline-offset-8 decoration-2' : 'hover:text-slate-900'}`}
            >
              {pa ? 'ਸ਼ੁਰੂ ਕਰੋ' : 'Start Here'}
            </button>
            <button
              type="button"
              onClick={() => navigate('checker')}
              className={`whitespace-nowrap shrink-0 py-1 cursor-pointer transition-colors ${section === 'checker' ? 'text-red-700 underline underline-offset-8 decoration-2' : 'hover:text-slate-900'}`}
            >
              {pa ? 'ਯੋਗਤਾ' : 'Eligibility'}
            </button>
            <button
              type="button"
              onClick={() => navigate('pnp')}
              className={`whitespace-nowrap shrink-0 py-1 cursor-pointer transition-colors ${isPathwayGroup ? 'text-red-700 underline underline-offset-8 decoration-2' : 'hover:text-slate-900'}`}
            >
              {pa ? 'ਮਾਰਗ ਅਤੇ PNP' : 'Pathways'}
            </button>
            <button
              type="button"
              onClick={() => navigate('draws')}
              className={`whitespace-nowrap shrink-0 py-1 cursor-pointer transition-colors ${section === 'draws' ? 'text-red-700 underline underline-offset-8 decoration-2' : 'hover:text-slate-900'}`}
            >
              {pa ? 'ਲਾਈਵ ਡਰਾਅ' : 'Live Draws'}
            </button>
            <button
              type="button"
              onClick={() => navigate('myplan')}
              className={`whitespace-nowrap shrink-0 py-1 cursor-pointer transition-colors ${isToolsGroup ? 'text-red-700 underline underline-offset-8 decoration-2' : 'hover:text-slate-900'}`}
            >
              {pa ? 'ਟੂਲ ਅਤੇ ਯੋਜਨਾ' : 'Tools & Plan'}
            </button>
          </nav>

          {/* Zone 3: Global Search + Language Switch + Mobile Menu Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <GlobalSearchBar lang={lang} onSelectResult={handleGlobalSearchSelect} />

            <button
              type="button"
              onClick={() => setLang((prev) => (prev === 'en' ? 'pa' : 'en'))}
              className="inline-flex items-center gap-1.5 min-h-[40px] rounded-lg bg-slate-900 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
              aria-label="Toggle English and Punjabi"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span>{pa ? 'English' : 'ਪੰਜਾਬੀ'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={pa ? 'ਸਾਰੇ ਭਾਗ ਖੋਲ੍ਹੋ' : 'Open all sections menu'}
              className="lg:hidden inline-flex items-center justify-center min-h-[40px] min-w-[40px] rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Non-sticky Full Section Switcher Bar (1-click horizontal swipe on mobile) */}
      <div className="border-b border-slate-200 bg-white no-print">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 overflow-x-auto px-3 py-2 sm:px-6 no-scrollbar snap-x">
          {allSections.map((s) => {
            const active = section === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => navigate(s.id)}
                className={`min-h-[40px] rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 snap-start transition-colors cursor-pointer ${
                  active ? 'bg-red-600 text-white' : 'bg-slate-100/80 sm:bg-transparent text-slate-700 hover:bg-slate-100'
                }`}
              >
                {pa ? s.pa : s.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-3 py-5 sm:px-6 sm:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${section}-${lang}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            {section === 'home' && (
              <StartHereView
                lang={lang}
                wiz={profile.wizardSelections}
                onChangeWiz={handleWizardChange}
                onAdoptPathway={handleAdoptPathway}
                onNavigate={navigate}
              />
            )}
            {section === 'checker' && (
              <EligibilityView
                lang={lang}
                onSaveSnapshot={handleSaveSnapshot}
                onAdoptPathway={handleAdoptPathway}
              />
            )}
            {section === 'ee' && <ExpressEntryView lang={lang} onSaveCrs={handleSaveCrs} />}
            {section === 'pnp' && (
              <PnpExplorerView
                lang={lang}
                onGoQuebec={() => navigate('quebec')}
                focusRequest={pnpFocus}
              />
            )}
            {section === 'quebec' && <QuebecView lang={lang} />}
            {section === 'regional' && <RegionalView lang={lang} />}
            {section === 'draws' && <DrawsTrackerView lang={lang} />}
            {section === 'calculators' && <CalculatorsView lang={lang} onSaveCrs={handleSaveCrs} />}
            {section === 'library' && (
              <ReferenceLibraryView lang={lang} focusRequest={libraryFocus} />
            )}
            {section === 'fraud' && <FraudWarningView lang={lang} />}
            {section === 'myplan' && (
              <MyPlanView
                lang={lang}
                profile={profile}
                autoSave={autoSave}
                hasUnsavedChanges={hasUnsavedChanges}
                onToggleAutoSave={handleToggleAutoSave}
                onManualSave={handleManualSave}
                onUpdateProfile={updateProfile}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 py-8 text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="font-bold text-white">
              {pa ? 'ਕੈਨੇਡਾ ਇਮੀਗ੍ਰੇਸ਼ਨ ਮਾਰਗ — 2026' : 'Canada Immigration Pathways — Canada PR Guide 2026'}
            </div>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              {pa
                ? `ਡੇਟਾ ਜਾਂਚ: ${DATA_LAST_CHECKED} · ਸਾਰੇ ਕੈਲਕੁਲੇਟਰ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਆਫਲਾਈਨ ਕੰਮ ਕਰਦੇ ਹਨ।`
                : `Data verified: ${DATA_LAST_CHECKED} · All calculators work offline in your browser with localStorage persistence.`}
            </p>
          </div>
          <div>
            <div className="font-bold text-white">{pa ? 'ਅਧਿਕਾਰਤ ਸਰੋਤ' : 'Official Sources'}</div>
            <ul className="mt-1.5 space-y-1 text-xs">
              <li>
                <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:underline">
                  IRCC — canada.ca
                </a>
              </li>
              <li>
                <a href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:underline">
                  Express Entry Rounds of Invitations
                </a>
              </li>
              <li>
                <a href="https://college-ic.ca/protecting-the-public/find-an-immigration-consultant" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:underline">
                  Verify Licensed RCIC (CICC)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-white">{pa ? 'ਕਾਨੂੰਨੀ ਨੋਟਿਸ' : 'Legal Notice'}</div>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              {pa
                ? 'ਇਹ ਸਿਰਫ਼ ਆਮ ਜਾਣਕਾਰੀ ਹੈ, ਕਾਨੂੰਨੀ ਸਲਾਹ ਨਹੀਂ। ਅਪਲਾਈ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ canada.ca ’ਤੇ ਪੁਸ਼ਟੀ ਕਰੋ।'
                : 'General information only, not legal advice. Always verify current rules on canada.ca and official provincial portals.'}
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Full-Sections Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/50 backdrop-blur-xs no-print">
          <div className="max-h-[82vh] overflow-y-auto rounded-t-3xl bg-white p-5 pb-8 shadow-xl safe-bottom-bar">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div>
                <div className="text-xs font-semibold text-slate-500">
                  {pa ? 'ਸਾਰੇ 11 ਭਾਗ' : 'All 11 Guide Sections'}
                </div>
                <div className="text-base font-bold text-slate-900">
                  {pa ? 'ਕਿੱਥੇ ਜਾਣਾ ਚਾਹੁੰਦੇ ਹੋ?' : 'Jump to Any Section'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={pa ? 'ਮੇਨੂ ਬੰਦ ਕਰੋ' : 'Close menu'}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {allSections.map((s) => {
                const Icon = s.icon;
                const active = section === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => navigate(s.id)}
                    className={`min-h-[48px] flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'border-red-600 bg-red-50 text-red-900'
                        : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-red-700' : 'text-slate-500'}`} aria-hidden="true" />
                    <span>{pa ? s.pa : s.en}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Thumb Bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md grid grid-cols-5 items-center safe-bottom-bar no-print"
        aria-label="Mobile quick navigation"
      >
        {[
          { id: 'home' as AppSection, icon: Home, en: 'Start', pa: 'ਸ਼ੁਰੂ' },
          { id: 'checker' as AppSection, icon: CheckCircle2, en: 'Check', pa: 'ਜਾਂਚ' },
          { id: 'pnp' as AppSection, icon: MapPin, en: 'PNP (11)', pa: 'PNP (11)' },
          { id: 'myplan' as AppSection, icon: ClipboardList, en: 'Plan', pa: 'ਯੋਜਨਾ' }
        ].map((item) => {
          const Icon = item.icon;
          const active = section === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              className={`flex flex-col items-center justify-center min-h-[56px] py-1 cursor-pointer ${
                active ? 'text-red-700 font-bold' : 'text-slate-600'
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="text-[11px] mt-0.5 leading-none whitespace-nowrap">
                {pa ? item.pa : item.en}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className={`flex flex-col items-center justify-center min-h-[56px] py-1 cursor-pointer ${
            mobileMenuOpen ? 'text-red-700 font-bold' : 'text-slate-600'
          }`}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
          <span className="text-[11px] mt-0.5 leading-none whitespace-nowrap">
            {pa ? 'ਸਾਰੇ (11)' : 'All (11)'}
          </span>
        </button>
      </nav>
    </div>
  );
}
