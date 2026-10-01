import { Link, Navigate, useParams } from 'react-router-dom';
import Brand from '../components/Brand';
import SiteFooter from '../components/SiteFooter';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';
export default function InformationPage() {
  const { page } = useParams();
  const { t } = useLanguage();
  const titles: Record<string,string> = { about: 'About us', services: 'Services', insights: 'Insights', news: 'News', careers: 'Careers', contact: 'Contact us' };
  const title = titles[page ?? ''];
  if (!title) return <Navigate to="/" replace />;
  return <div className="public-site info-site"><a className="skip-link" href="#info-main">{t('Skip to main content')}</a><header className="public-header"><div className="public-container header-inner"><Brand publicStyle /><LanguageSelector /><Link className="secondary-button" to="/">{t('Home')}</Link></div></header><main id="info-main" className="info-main public-container"><Link className="info-back" to="/">← {t('Back to home')}</Link><h1>{t(title)}</h1>
    {page === 'about' ? <div className="info-content"><p>{t('TravelMate helps passengers plan public transport journeys and choose the support they need.')}</p><h2>{t('Our purpose')}</h2><p>{t('Make travel easier to understand, with clear information and practical accessibility support.')}</p><h2>{t('Built around passengers')}</h2><p>{t('You choose your preferences and control what information you share.')}</p><Link className="primary-button" to="/app/home">{t('Try the web app')}</Link></div> : null}
    {page === 'services' ? <div className="info-card-grid">{[['Plan a journey', 'Find a route to your destination.', '/app/home?task=plan'], ['Get assistance', 'Choose the help you need.', '/app/home?task=assist'], ['My support needs', 'Change your accessibility settings.', '/app/accessibility'], ['Travel updates', 'View journey alerts and reminders.', '/app/alerts']].map(([name,body,path]) => <Link className="info-card" key={path} to={path}><h2>{t(name)}</h2><p>{t(body)}</p></Link>)}<p className="info-note">{t('The web app is a demo. Routes and assistance requests are simulated.')}</p></div> : null}
    {page === 'insights' ? <div className="info-content"><p>{t('Practical ways to prepare for a journey.')}</p><article className="info-article"><h2>{t('Set your support needs before travelling')}</h2><p>{t('Choose step-free routes, larger text or extra time between services in your support settings.')}</p><Link to="/app/accessibility">{t('Review my support needs')}</Link></article><article className="info-article"><h2>{t('Check your journey details')}</h2><p>{t('Review your departure time, destination and planned support before you travel.')}</p><Link to="/app/journeys">{t('View my journeys')}</Link></article></div> : null}
    {page === 'news' ? <div className="info-content"><p>{t('No news updates have been published yet.')}</p><p>{t('Project and launch updates will appear here.')}</p></div> : null}
    {page === 'careers' ? <div className="info-content"><p>{t('There are no advertised vacancies at the moment.')}</p><p>{t('Future opportunities will be listed here.')}</p></div> : null}
    {page === 'contact' ? <div className="info-content"><h2>{t('Travel support')}</h2><p>{t('Use the passenger demo to explore assistance requests.')}</p><Link className="primary-button" to="/app/home?task=assist">{t('Get assistance')}</Link><h2>{t('General enquiries')}</h2><p>{t('Public contact details will be available at launch.')}</p></div> : null}
  </main><SiteFooter /></div>;
}
