import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone } from 'lucide-react';
import Brand from './Brand';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';

export default function SiteFooter() {
  const { t } = useLanguage();
  const [cookiesOpen, setCookiesOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!cookiesOpen) return;
    dialogRef.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [cookiesOpen]);
  const closeCookies = () => { setCookiesOpen(false); setSaved(false); };
  const groups = [
    { title: 'Company', links: [['About us', '/about'], ['Careers', '/careers'], ['Contact us', '/contact']] },
    { title: 'Explore', links: [['Services', '/services'], ['Insights', '/insights'], ['News', '/news']] },
  ];
  return <footer className="public-footer site-footer">
    <div className="public-container">
      <div className="footer-top"><div><Brand publicStyle /><p>{t('Accessible travel, with your needs in mind.')}</p></div><LanguageSelector /></div>
      <div className="footer-link-groups">{groups.map((group) => <nav key={group.title} aria-label={t(group.title)}><h2>{t(group.title)}</h2>{group.links.map(([label, path]) => <Link key={path} to={path}>{t(label)}</Link>)}</nav>)}<nav aria-label={t('Support')}><h2>{t('Support')}</h2><Link to="/app/accessibility">{t('My support needs')}</Link><Link to="/app/home">{t('Try the web app')}</Link><button type="button" onClick={() => setCookiesOpen(true)}>{t('Cookie settings')}</button></nav></div>
      <div className="footer-bottom"><div className="footer-store-row" aria-label={t('Mobile app coming soon')}><span>{t('Mobile app coming soon')}</span><div><span className="footer-store"><Smartphone aria-hidden="true" /> App Store</span><span className="footer-store"><Smartphone aria-hidden="true" /> Google Play</span></div></div><button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}>{t('Back to top')} ↑</button></div>
      <p className="footer-copyright">© {new Date().getFullYear()} TravelMate</p>
    </div>
    {cookiesOpen ? <dialog ref={dialogRef} className="cookie-dialog" aria-labelledby="cookie-heading" onCancel={closeCookies}><h2 id="cookie-heading">{t('Cookie settings')}</h2><p>{t('This demo uses browser storage to remember your language and accessibility settings.')}</p><div className="cookie-setting"><strong>{t('Essential preferences')}</strong><span>{t('Always active')}</span></div><p>{t('No advertising or analytics cookies are used in this demo.')}</p><p role="status">{saved ? t('Preferences saved') : ''}</p><div className="cookie-actions"><button autoFocus className="primary-button" type="button" onClick={() => { try { localStorage.setItem('travelmate-cookie-preferences', JSON.stringify({ analytics: false, advertising: false, savedAt: new Date().toISOString() })); } catch { /* No optional cookies are activated. */ } setSaved(true); }}>{t('Save preferences')}</button><button className="secondary-button" type="button" onClick={closeCookies}>{t('Close')}</button></div></dialog> : null}
  </footer>;
}
