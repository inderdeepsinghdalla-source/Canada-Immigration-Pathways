import { ExternalLink } from 'lucide-react';
import { FCIP_COMMUNITIES, RCIP_COMMUNITIES } from '../data/immigrationData';
import { Lang } from '../types';
import { DisclaimerBanner } from './DisclaimerBanner';

interface Props {
  lang: Lang;
}

export function QuebecView({ lang }: Props) {
  const pa = lang === 'pa';
  return (
    <div className="space-y-6">
      <DisclaimerBanner lang={lang} />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs">
        <div className="text-xs font-semibold text-blue-800">
          {pa ? 'ਕਿਊਬੈਕ ਵੱਖਰਾ ਇਮੀਗ੍ਰੇਸ਼ਨ ਸਿਸਟਮ' : 'Quebec · Separate Immigration System'}
        </div>
        <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">
          {pa ? 'ਕਿਊਬੈਕ — PSTQ, Arrima, CSQ ਅਤੇ PEQ' : 'Quebec — PSTQ via Arrima, CSQ & Reopened PEQ'}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {pa
            ? 'ਕਿਊਬੈਕ Express Entry ਜਾਂ PNP ਦਾ ਹਿੱਸਾ ਨਹੀਂ ਹੈ। ਪਹਿਲਾਂ ਤੁਹਾਨੂੰ ਕਿਊਬੈਕ ਸਰਕਾਰ ਤੋਂ CSQ (Certificat de sélection du Québec) ਲੈਣਾ ਪੈਂਦਾ ਹੈ, ਅਤੇ ਫਿਰ ਫੈਡਰਲ PR ਲਈ IRCC ਨੂੰ ਅਪਲਾਈ ਕਰਨਾ ਹੁੰਦਾ ਹੈ।'
            : 'Quebec does NOT use Express Entry or federal PNP. Instead, you apply to the Quebec government (MIFI) to obtain a Certificat de sélection du Québec (CSQ), and then apply to IRCC federally for Permanent Residence.'}
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5">
            <h2 className="text-lg font-bold text-slate-900">
              {pa ? '1. PSTQ (Arrima → CSQ → Federal PR)' : '1. PSTQ via Arrima → CSQ → Federal PR'}
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>PSTQ:</strong>{' '}
                {pa
                  ? 'Programme de sélection des travailleurs qualifiés (ਕਿਊਬੈਕ ਦਾ ਮੁੱਖ ਹੁਨਰਮੰਦ ਕਾਮਾ ਪ੍ਰੋਗਰਾਮ)।'
                  : 'Programme de sélection des travailleurs qualifiés — Quebec’s main skilled worker selection stream.'}
              </li>
              <li>
                <strong>Arrima:</strong>{' '}
                {pa
                  ? 'ਕਿਊਬੈਕ ਦਾ ਆਨਲਾਈਨ EOI ਪੋਰਟਲ ਜਿੱਥੇ ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ ਨੂੰ ਅੰਕ ਮਿਲਦੇ ਹਨ।'
                  : 'Quebec’s online Expression of Interest (EOI) portal where candidates are scored and invited.'}
              </li>
              <li>
                <strong>{pa ? 'ਫ੍ਰੈਂਚ ਸ਼ਰਤ:' : 'French Requirement:'}</strong>{' '}
                {pa
                  ? 'ਫ੍ਰੈਂਚ ਲਗਭਗ ਲਾਜ਼ਮੀ ਹੈ — ਮੌਖਿਕ ਪੱਧਰ 7 ਅਤੇ ਲਿਖਤੀ ਪੱਧਰ 5 (NCLC 7 / 5 ਦੇ ਬਰਾਬਰ)।'
                  : 'French is practically essential — Oral Level 7 and Written Level 5 on the Quebec scale (matching NCLC 7 / 5).'}
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
            <h2 className="text-lg font-bold text-slate-900">
              {pa ? '2. PEQ ਮੁੜ ਖੁੱਲ੍ਹਿਆ (2 ਜੁਲਾਈ 2026 – 2 ਜੁਲਾਈ 2028)' : '2. PEQ Reopened (2 July 2026 – 2 July 2028)'}
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>PEQ:</strong>{' '}
                {pa
                  ? 'Programme de l’expérience québécoise — ਕਿਊਬੈਕ ਵਿੱਚ ਪੜ੍ਹੇ ਗ੍ਰੈਜੂਏਟਾਂ ਅਤੇ ਕੰਮ ਕਰਨ ਵਾਲੇ ਕਾਮਿਆਂ ਲਈ।'
                  : 'Programme de l’expérience québécoise — for eligible Quebec graduates and temporary workers inside Quebec.'}
              </li>
              <li>
                <strong>{pa ? 'ਵਿੰਡੋ:' : 'Active Window:'}</strong>{' '}
                {pa ? '2 ਜੁਲਾਈ 2026 ਤੋਂ 2 ਜੁਲਾਈ 2028 ਤੱਕ ਮੁੜ ਖੁੱਲ੍ਹਿਆ ਹੈ।' : 'Reopened from 2 July 2026 to 2 July 2028.'}
              </li>
              <li>
                <strong>{pa ? 'ਫ੍ਰੈਂਚ ਪੱਧਰ:' : 'French Threshold:'}</strong>{' '}
                {pa ? 'ਮੌਖਿਕ ਫ੍ਰੈਂਚ ਪੱਧਰ 7 ਅਤੇ ਯੋਗ ਕਿਊਬੈਕ ਤਜਰਬਾ/ਪੜ੍ਹਾਈ।' : 'Oral French Level 7 required alongside eligible Quebec work or study.'}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <a
            href="https://www.quebec.ca/en/immigration"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[44px] rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <span>{pa ? 'ਅਧਿਕਾਰਤ ਕਿਊਬੈਕ ਇਮੀਗ੍ਰੇਸ਼ਨ ਪੋਰਟਲ (quebec.ca)' : 'Official Quebec Immigration (quebec.ca)'}</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}

export function RegionalView({ lang }: Props) {
  const pa = lang === 'pa';
  return (
    <div className="space-y-8">
      <DisclaimerBanner lang={lang} />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {pa ? 'ਖੇਤਰੀ, ਪਰਿਵਾਰਕ, ਪੜ੍ਹਾਈ ਅਤੇ ਕਾਰੋਬਾਰੀ ਰਸਤੇ' : 'Regional, Family, Study & Business Pathways'}
        </h1>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
            <div className="text-xs font-semibold text-emerald-800">~4,000 / year · NB, NS, PEI, NL</div>
            <h2 className="mt-1 text-lg font-bold text-slate-900">
              {pa ? 'ਅਟਲਾਂਟਿਕ ਇਮੀਗ੍ਰੇਸ਼ਨ ਪ੍ਰੋਗਰਾਮ (AIP)' : 'Atlantic Immigration Program (AIP)'}
            </h2>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              {pa
                ? 'NB, NS, PEI ਜਾਂ NL ਵਿੱਚ ਕਿਸੇ AIP-ਮਨਜ਼ੂਰਸ਼ੁਦਾ (Designated) ਰੁਜ਼ਗਾਰਦਾਤਾ ਤੋਂ ਜੌਬ ਆਫਰ ਚਾਹੀਦਾ ਹੈ। TEER 0–4 ਨੌਕਰੀਆਂ ਸ਼ਾਮਲ ਹਨ (TEER 4 ਲਈ CLB 4; TEER 0–3 ਲਈ CLB 5)।'
                : 'Employer-driven PR (~4,000/year) for New Brunswick, Nova Scotia, PEI, and Newfoundland & Labrador. Covers TEER 0–4 jobs (CLB 4 for TEER 4; CLB 5 for TEER 0–3) with a job offer from an AIP-designated employer.'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
            <div className="text-xs font-semibold text-blue-800">
              {pa ? '14 ਪੇਂਡੂ ਕਸਬੇ · 6 ਫ੍ਰੈਂਚ ਕਸਬੇ' : '14 Rural Towns · 6 Francophone Towns'}
            </div>
            <h2 className="mt-1 text-lg font-bold text-slate-900">
              RCIP &amp; FCIP {pa ? 'ਕਮਿਊਨਿਟੀ ਪਾਇਲਟ' : 'Community Pilots'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>RCIP (14):</strong> {RCIP_COMMUNITIES.join(' · ')}
            </p>
            <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>FCIP (6, French NCLC 5):</strong> {FCIP_COMMUNITIES.join(' · ')}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-bold text-slate-900">
              {pa ? 'ਪਰਿਵਾਰਕ ਸਪਾਂਸਰਸ਼ਿਪ' : 'Family Sponsorship'}
            </h2>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              {pa
                ? 'ਕੈਨੇਡੀਅਨ ਨਾਗਰਿਕ ਜਾਂ PR (18+) ਆਪਣੇ ਜੀਵਨ ਸਾਥੀ (Spouse/Common-law) ਅਤੇ 22 ਸਾਲ ਤੋਂ ਘੱਟ ਕੁਆਰੇ ਬੱਚਿਆਂ ਨੂੰ ਸਪਾਂਸਰ ਕਰ ਸਕਦੇ ਹਨ। ਮਾਪਿਆਂ/ਦਾਦਾ-ਦਾਦੀ ਲਈ PGP ਜਾਂ 5-ਸਾਲਾ Super Visa ਹੈ।'
                : 'Canadian Citizens and PRs (18+) can sponsor a spouse, common-law/conjugal partner, or dependent child under 22 (inland or outland). Parents & grandparents are sponsored via PGP invitations or visit via the 5-year Super Visa.'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-bold text-slate-900">
              {pa ? 'ਪੜ੍ਹਾਈ → PGWP → CEC / PNP ਰਸਤਾ' : 'Study → PGWP → CEC / PNP Route'}
            </h2>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              {pa
                ? 'PGWP-ਯੋਗ DLI ਕਾਲਜ/ਯੂਨੀਵਰਸਿਟੀ ਤੋਂ ਪੜ੍ਹਾਈ ਪੂਰੀ ਕਰੋ, PGWP (Post-Graduation Work Permit) ਲਓ, 1+ ਸਾਲ TEER 0–3 ਕੰਮ ਕਰੋ, ਅਤੇ ਫਿਰ CEC ਜਾਂ ਸੂਬਾਈ ਗ੍ਰੈਜੂਏਟ PNP ਰਾਹੀਂ PR ਅਪਲਾਈ ਕਰੋ।'
                : 'Graduate from a PGWP-eligible Designated Learning Institution (meeting field & CLB 5/7 language rules), work 1+ yr in TEER 0–3 on your PGWP, then apply via CEC or provincial graduate PNP.'}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-5">
          <h2 className="text-lg font-bold text-slate-900">
            {pa ? 'ਕਾਰੋਬਾਰੀ / ਉੱਦਮੀ (Business / Entrepreneur) PNP' : 'Business / Entrepreneur PNP Streams'}
          </h2>
          <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
            {pa
              ? 'BC, ਅਲਬਰਟਾ, ਸਸਕੈਚਵਨ, ਮੈਨੀਟੋਬਾ, NB, NS, PEI ਅਤੇ ਯੂਕੋਨ ਕਾਰੋਬਾਰੀਆਂ ਨੂੰ ਪਹਿਲਾਂ ਵਰਕ ਪਰਮਿਟ ’ਤੇ ਕਾਰੋਬਾਰ ਚਲਾਉਣ (12–24 ਮਹੀਨੇ) ਤੋਂ ਬਾਅਦ PNP ਨਾਮਜ਼ਦਗੀ ਦਿੰਦੇ ਹਨ।'
              : 'Provinces (BC, AB, SK, MB, NB, NS, PEI, YT) allow business owners/managers to launch or purchase a local business on a work permit first, then receive provincial nomination after operating 12–24 months.'}
          </p>
        </div>
      </section>

      {/* Honest Closed & Paused List */}
      <section className="rounded-2xl border border-red-200 bg-red-50/60 p-5 sm:p-8">
        <h2 className="text-xl font-bold text-red-900">
          {pa ? 'ਬੰਦ ਅਤੇ ਰੋਕੇ ਗਏ ਪ੍ਰੋਗਰਾਮ (ਸੱਚੀ ਜਾਣਕਾਰੀ)' : 'Closed & Paused Programs — Honest 2026 Status'}
        </h2>
        <p className="mt-1 text-sm text-red-900/90">
          {pa
            ? 'ਕਿਸੇ ਵੀ ਏਜੰਟ ਨੂੰ ਹੇਠ ਲਿਖੇ ਬੰਦ ਪ੍ਰੋਗਰਾਮਾਂ ਵਿੱਚ ਅਪਲਾਈ ਕਰਨ ਦੇ ਨਾਮ ’ਤੇ ਪੈਸੇ ਨਾ ਦਿਓ:'
            : 'Do not pay anyone promising to submit an application to these closed or paused federal programs:'}
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-xl border border-red-200 bg-white p-4">
            <div className="font-bold text-slate-900">Start-up Visa (SUV)</div>
            <div className="mt-1 text-sm font-semibold text-red-700">
              {pa ? 'ਰੋਕਿਆ ਗਿਆ (Paused)' : 'Paused in 2026'}
            </div>
          </div>
          <div className="rounded-xl border border-red-200 bg-white p-4">
            <div className="font-bold text-slate-900">Home Care Worker Pilots</div>
            <div className="mt-1 text-sm font-semibold text-slate-700">
              {pa ? '19 ਦਸੰਬਰ 2025 ਨੂੰ ਬੰਦ' : 'Closed 19 Dec 2025'}
            </div>
          </div>
          <div className="rounded-xl border border-red-200 bg-white p-4">
            <div className="font-bold text-slate-900">Agri-Food Pilot</div>
            <div className="mt-1 text-sm font-semibold text-slate-700">
              {pa ? '14 ਮਈ 2025 ਨੂੰ ਖਤਮ' : 'Ended 14 May 2025'}
            </div>
          </div>
          <div className="rounded-xl border border-red-200 bg-white p-4">
            <div className="font-bold text-slate-900">RNIP Pilot</div>
            <div className="mt-1 text-sm font-semibold text-slate-700">
              {pa ? '31 ਅਗਸਤ 2024 ਨੂੰ ਖਤਮ (ਹੁਣ RCIP)' : 'Ended 31 Aug 2024 (Replaced by RCIP)'}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
