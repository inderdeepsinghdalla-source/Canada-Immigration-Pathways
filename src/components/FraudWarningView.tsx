import { ShieldAlert, ExternalLink } from 'lucide-react';
import { Lang } from '../types';
import { DisclaimerBanner } from './DisclaimerBanner';

interface Props {
  lang: Lang;
}

export function FraudWarningView({ lang }: Props) {
  const pa = lang === 'pa';

  const rules = [
    {
      title: { en: 'Nobody can sell an LMIA or guaranteed job offer', pa: 'ਕੋਈ ਵੀ LMIA ਜਾਂ ਪੱਕਾ ਜੌਬ ਆਫਰ ਨਹੀਂ ਵੇਚ ਸਕਦਾ' },
      desc: {
        en: 'Charging a worker money for an LMIA or Canadian job offer is illegal under Canadian federal and provincial law. If anyone asks for $10,000–$50,000 for a "job offer + PR", walk away immediately.',
        pa: 'ਕਿਸੇ ਕਾਮੇ ਤੋਂ LMIA ਜਾਂ ਕੈਨੇਡੀਅਨ ਜੌਬ ਆਫਰ ਦੇ ਬਦਲੇ ਪੈਸੇ ਲੈਣਾ ਗੈਰ-ਕਾਨੂੰਨੀ ਹੈ। ਜੇ ਕੋਈ ਜੌਬ ਆਫਰ ਲਈ ਲੱਖਾਂ ਰੁਪਏ ਮੰਗੇ ਤਾਂ ਤੁਰੰਤ ਸਾਵਧਾਨ ਹੋ ਜਾਓ।'
      }
    },
    {
      title: { en: 'No agent or lawyer can guarantee Canada PR', pa: 'ਕੋਈ ਵੀ ਏਜੰਟ ਜਾਂ ਵਕੀਲ PR ਦੀ 100% ਗਾਰੰਟੀ ਨਹੀਂ ਦੇ ਸਕਦਾ' },
      desc: {
        en: 'Only Immigration, Refugees and Citizenship Canada (IRCC) officers can approve PR. Any consultant promising "100% guaranteed PR" or "special inside contacts" is committing fraud.',
        pa: 'ਸਿਰਫ਼ IRCC ਅਧਿਕਾਰੀ ਹੀ PR ਮਨਜ਼ੂਰ ਕਰ ਸਕਦੇ ਹਨ। "100% ਗਾਰੰਟੀ" ਜਾਂ "ਅੰਦਰੂਨੀ ਸੈਟਿੰਗ" ਦਾ ਦਾਅਵਾ ਕਰਨ ਵਾਲਾ ਹਰ ਏਜੰਟ ਝੂਠ ਬੋਲ ਰਿਹਾ ਹੈ।'
      }
    },
    {
      title: { en: 'Never pay for a job offer or use fake experience letters', pa: 'ਕਦੇ ਵੀ ਨੌਕਰੀ ਲਈ ਪੈਸੇ ਨਾ ਦਿਓ ਅਤੇ ਨਕਲੀ ਕਾਗਜ਼ ਨਾ ਲਾਓ' },
      desc: {
        en: 'Submitting fake pay stubs, altered IELTS certificates, or false work letters — even if an agent created them — results in application refusal AND a 5-year ban from Canada for misrepresentation.',
        pa: 'ਨਕਲੀ ਤਜਰਬੇ, ਨਕਲੀ ਪੇ-ਸਲਿੱਪ ਜਾਂ ਝੂਠੇ ਦਸਤਾਵੇਜ਼ ਲਗਾਉਣ (ਭਾਵੇਂ ਏਜੰਟ ਨੇ ਹੀ ਕਿਉਂ ਨਾ ਲਗਾਏ ਹੋਣ) ’ਤੇ 5 ਸਾਲ ਦਾ ਕੈਨੇਡਾ ਬੈਨ ਲੱਗ ਜਾਂਦਾ ਹੈ।'
      }
    },
    {
      title: { en: 'Always verify if your consultant is a licensed RCIC', pa: 'ਸਲਾਹਕਾਰ ਦੇ ਲਾਇਸੰਸ (RCIC) ਦੀ ਹਮੇਸ਼ਾ ਪੁਸ਼ਟੀ ਕਰੋ' },
      desc: {
        en: 'Before paying any representative, search their name and R-number on the official College of Immigration and Citizenship Consultants (CICC) register. You also have the legal right to apply yourself with zero agent.',
        pa: 'ਪੈਸੇ ਦੇਣ ਤੋਂ ਪਹਿਲਾਂ CICC (college-ic.ca) ’ਤੇ ਉਨ੍ਹਾਂ ਦਾ ਨਾਮ ਅਤੇ R-ਨੰਬਰ ਚੈੱਕ ਕਰੋ। ਤੁਸੀਂ ਬਿਨਾਂ ਕਿਸੇ ਏਜੰਟ ਦੇ ਖੁਦ ਵੀ ਅਪਲਾਈ ਕਰ ਸਕਦੇ ਹੋ।'
      }
    }
  ];

  return (
    <div className="space-y-6">
      <DisclaimerBanner lang={lang} />

      <section className="rounded-3xl bg-red-900 text-white p-6 sm:p-10 shadow-sm">
        <div className="flex items-start gap-3">
          <ShieldAlert className="h-8 w-8 shrink-0 text-red-200 mt-1" aria-hidden="true" />
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
              {pa ? 'ਧੋਖਾਧੜੀ ਤੋਂ ਸਾਵਧਾਨ: ਆਪਣੇ ਪੈਸੇ ਅਤੇ ਭਵਿੱਖ ਨੂੰ ਬਚਾਓ' : 'Fraud Warning: Protect Your Money & Your Future in Canada'}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-red-100 max-w-3xl leading-relaxed">
              {pa
                ? 'ਹਰ ਸਾਲ ਹਜ਼ਾਰਾਂ ਬਿਨੈਕਾਰ ਨਕਲੀ ਜੌਬ ਆਫਰਾਂ, ਗੈਰ-ਲਾਇਸੰਸਸ਼ੁਦਾ “ਘੋਸਟ” ਏਜੰਟਾਂ ਅਤੇ ਝੂਠੇ ਵਾਅਦਿਆਂ ਦਾ ਸ਼ਿਕਾਰ ਹੁੰਦੇ ਹਨ। ਅਸਲ ਨਿਯਮ ਸਮਝ ਕੇ ਆਪਣਾ ਬਚਾਅ ਕਰੋ।'
                : 'Every year, applicants lose life savings and receive 5-year Canadian entry bans because of ghost consultants and illegal job-offer sales. Know the law before paying anyone.'}
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((r, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="text-xs font-mono font-bold text-red-700">0{i + 1}</div>
            <h2 className="mt-1 text-lg font-bold text-slate-900">{pa ? r.title.pa : r.title.en}</h2>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">{pa ? r.desc.pa : r.desc.en}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h2 className="text-xl font-bold text-slate-900">
          {pa ? 'ਅਧਿਕਾਰਤ ਪੜਤਾਲ ਅਤੇ ਰਿਪੋਰਟ ਲਿੰਕ' : 'Official Verification & Scam Reporting Links'}
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="https://college-ic.ca/protecting-the-public/find-an-immigration-consultant"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[44px] rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <span>{pa ? 'ਲਾਇਸੰਸਸ਼ੁਦਾ RCIC ਚੈੱਕ ਕਰੋ (CICC)' : 'Verify Licensed RCIC (college-ic.ca)'}</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship/services/protect-fraud/report-fraud.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[44px] rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            <span>{pa ? 'IRCC ਨੂੰ ਧੋਖਾਧੜੀ ਦੀ ਰਿਪੋਰਟ ਕਰੋ' : 'Report Immigration Fraud to IRCC'}</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
