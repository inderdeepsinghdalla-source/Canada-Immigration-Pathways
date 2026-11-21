import { Scale } from 'lucide-react';
import { DISCLAIMER_TEXT } from '../data/immigrationData';
import { Lang } from '../types';

interface Props {
  lang: Lang;
}

export function DisclaimerBanner({ lang }: Props) {
  return (
    <aside
      role="note"
      aria-label={lang === 'pa' ? 'ਕਾਨੂੰਨੀ ਸੂਚਨਾ' : 'Legal Disclaimer'}
      className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/75 px-4 py-3 text-sm leading-relaxed text-amber-950"
    >
      <Scale className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
      <div>
        <span className="font-semibold">
          {lang === 'pa' ? 'ਮਹੱਤਵਪੂਰਨ ਸੂਚਨਾ: ' : 'Important notice: '}
        </span>
        <span>{DISCLAIMER_TEXT[lang]}</span>
      </div>
    </aside>
  );
}
