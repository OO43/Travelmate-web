import { useLanguage } from '../i18n/LanguageContext';
import { Check } from 'lucide-react';
import type { ToastMessage } from '../types/travel';
interface ToastProps {
    toast: ToastMessage | null;
}
export default function Toast({ toast }: ToastProps) {
    const { t } = useLanguage();
    if (!toast)
        return null;
    return (<div className="toast" role="status" aria-live="polite">
      <span className="toast-icon"><Check aria-hidden="true"/></span>
      <div>
        <strong>{t(toast.title)}</strong>
        <span>{t(toast.message)}</span>
      </div>
    </div>);
}
