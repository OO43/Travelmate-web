import { useLanguage } from '../i18n/LanguageContext';
import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
interface ModalProps {
    open: boolean;
    title: string;
    eyebrow: string;
    children: ReactNode;
    onClose: () => void;
    wide?: boolean;
}
export default function Modal({ open, title, eyebrow, children, onClose, wide = false }: ModalProps) {
    const { t } = useLanguage();
    useEffect(() => {
        if (!open)
            return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape')
                onClose();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [open, onClose]);
    if (!open)
        return null;
    return (<>
      <button className="modal-backdrop" type="button" onClick={onClose} aria-label={t("Close dialog")}/>
      <section className={`modal ${wide ? 'sheet' : 'compact-modal'}`} role="dialog" aria-modal="true" aria-labelledby="active-modal-title">
        <div className="modal-header">
          <div>
            <span className="section-kicker">{t(eyebrow)}</span>
            <h2 id="active-modal-title">{t(title)}</h2>
          </div>
          <button className="close-button" type="button" onClick={onClose} aria-label={t("Close")}>
            <X aria-hidden="true"/>
          </button>
        </div>
        {children}
      </section>
    </>);
}
