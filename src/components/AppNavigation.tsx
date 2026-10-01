import { useLanguage } from '../i18n/LanguageContext';
import { Accessibility, Bell, Hand, Home, Route } from 'lucide-react';
import Brand from './Brand';
import type { AppView } from '../types/travel';
interface AppNavigationProps {
    activeView: AppView;
    unreadCount: number;
    onNavigate: (view: AppView) => void;
    onAssist: () => void;
    onContact: () => void;
}
const navItems: Array<{
    view: AppView;
    label: string;
    icon: typeof Home;
}> = [
    { view: 'home', label: 'Home', icon: Home },
    { view: 'journeys', label: 'Journeys', icon: Route },
    { view: 'accessibility', label: 'Support needs', icon: Accessibility },
    { view: 'alerts', label: 'Alerts', icon: Bell },
];
export default function AppNavigation({ activeView, unreadCount, onNavigate, onAssist, onContact }: AppNavigationProps) {
    const { t } = useLanguage();
    return (<>
      <aside className="sidebar" aria-label={t("Primary navigation")}>
        <Brand />
        <nav className="side-nav">
          {navItems.map(({ view, label, icon: Icon }) => (<button className={`nav-item ${activeView === view ? 'active' : ''}`} type="button" key={view} onClick={() => onNavigate(view)}>
              <span className="nav-icon"><Icon aria-hidden="true"/></span>
              <span>{t(label)}</span>
              {view === 'alerts' && unreadCount > 0 ? <span className="nav-count">{unreadCount}</span> : null}
            </button>))}
        </nav>
        <div className="sidebar-support">
          <div className="support-orbit" aria-hidden="true"><span>?</span></div>
          <p>{t("Need support?")}</p>
          <span>{t("We\u2019re here throughout your journey.")}</span>
          <button className="text-button" type="button" onClick={onContact}>{t("Contact us")}<span aria-hidden="true">→</span></button>
        </div>
        <button className="profile-chip nav-profile" type="button" onClick={() => onNavigate('profile')}>
          <span className="avatar">{t("OO")}</span>
          <span><strong>{t("Ooreoluwa")}</strong><small>{t("Passenger")}</small></span>
          <span aria-hidden="true">•••</span>
        </button>
      </aside>

      <nav className="bottom-nav" aria-label={t("Mobile navigation")}>
        <button className={activeView === 'home' ? "active" : ""} type="button" onClick={() => onNavigate('home')}><Home /><span>{t("Home")}</span></button>
        <button className={activeView === 'journeys' ? "active" : ""} type="button" onClick={() => onNavigate('journeys')}><Route /><span>{t("Journeys")}</span></button>
        <button className="assist-fab" type="button" onClick={onAssist}><Hand /><span>{t("Get help")}</span></button>
        <button className={activeView === 'accessibility' ? "active" : ""} type="button" onClick={() => onNavigate('accessibility')}><Accessibility /><span>{t("Support")}</span></button>
        <button className={activeView === 'alerts' ? "active" : ""} type="button" onClick={() => onNavigate('alerts')}><Bell /><span>{t("Alerts")}</span>{unreadCount > 0 ? <i>{unreadCount}</i> : null}</button>
      </nav>
    </>);
}
