import { useLanguage } from '../i18n/LanguageContext';
import { Accessibility, Bell, Bus, Check, Hand, MapPin, MessageSquare, ShieldAlert, Sparkles, } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import AppNavigation from '../components/AppNavigation';
import Brand from '../components/Brand';
import LanguageSelector from '../components/LanguageSelector';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import Toggle from '../components/Toggle';
import { defaultAccessibilitySettings, initialAlerts, initialProfile } from '../data/demo';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { travelmateApi } from '../services/travelmateApi';
import type { AccessibilitySettings, AppView, JourneyAlert, ModalName, PassengerProfile, RouteOption, ToastMessage, } from '../types/travel';
import AccessibilityPage from './AccessibilityPage';
import AlertsPage from './AlertsPage';
import DashboardPage from './DashboardPage';
import JourneysPage from './JourneysPage';
import ProfilePage from './ProfilePage';
const validViews: AppView[] = ['home', 'journeys', 'accessibility', 'alerts', 'profile'];
export default function PassengerApp() {
    const { t } = useLanguage();
    const { view } = useParams();
    const navigate = useNavigate();
    const activeView: AppView = validViews.includes(view as AppView) ? (view as AppView) : 'home';
    const [modal, setModal] = useState<ModalName>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const requestedTask = searchParams.get('task');
    const [vehicleConnected, setVehicleConnected] = useState(false);
    const [journeyStarted, setJourneyStarted] = useState(false);
    const [alerts, setAlerts] = useState<JourneyAlert[]>(initialAlerts);
    const [profile, setProfile] = useState<PassengerProfile>(initialProfile);
    const [settings, setSettings] = useLocalStorage<AccessibilitySettings>('travelmate-settings', defaultAccessibilitySettings);
    const [toast, setToast] = useState<ToastMessage | null>(null);
    const [settingsSaved, setSettingsSaved] = useState(false);
    const [plannerDestination, setPlannerDestination] = useState('');
    const [routeResults, setRouteResults] = useState<RouteOption[]>([]);
    const [routesLoading, setRoutesLoading] = useState(false);
    const [assistanceType, setAssistanceType] = useState('boarding');
    const [rating, setRating] = useState(0);
    const unreadCount = useMemo(() => alerts.filter((alert) => alert.unread).length, [alerts]);
    const notify = useCallback((title: string, message: string) => {
        setToast({ title, message });
        window.setTimeout(() => setToast(null), 3400);
    }, []);
    const onNavigate = (nextView: AppView) => {
        navigate(`/app/${nextView}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    useEffect(() => {
        document.body.classList.toggle('large-text', settings.largeText);
        document.body.classList.toggle('high-contrast', settings.highContrast);
        return () => {
            document.body.classList.remove('large-text', 'high-contrast');
        };
    }, [settings.largeText, settings.highContrast]);
    const updateSetting = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
        setSettings((current) => ({ ...current, [key]: value }));
        setSettingsSaved(true);
        window.setTimeout(() => setSettingsSaved(false), 1600);
    };
    useEffect(() => {
        if (requestedTask === 'plan' || requestedTask === 'assist') {
            setModal(requestedTask === 'plan' ? 'planner' : 'assistance');
            setSearchParams({}, { replace: true });
        }
    }, [requestedTask, setSearchParams]);
    const openPlanner = (destination = '') => {
        setPlannerDestination(destination);
        setRouteResults([]);
        setModal('planner');
    };
    const submitPlanner = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const origin = String(data.get('origin') ?? 'Current location');
        const destination = String(data.get('destination') ?? '');
        if (!destination.trim())
            return;
        setRoutesLoading(true);
        try {
            setRouteResults(await travelmateApi.planJourney(origin, destination));
        }
        finally {
            setRoutesLoading(false);
        }
    };
    const selectRoute = () => {
        setModal(null);
        onNavigate('journeys');
        notify('Journey planned', 'Your accessible route has been added to upcoming journeys.');
    };
    const startJourney = () => {
        if (journeyStarted) {
            onNavigate('journeys');
            return;
        }
        setJourneyStarted(true);
        notify('Journey started', 'Haptic guidance and stop reminders are now active.');
    };
    const connectVehicle = () => {
        notify('Connecting', 'Looking for your scheduled vehicle.');
        window.setTimeout(() => {
            setVehicleConnected(true);
            notify('Vehicle connected', 'Bus 24 can now receive your assistance requests.');
        }, 700);
    };
    const sendAssistance = () => {
        setModal(null);
        notify('Request sent', 'Your assistance request has been shared with transport staff.');
    };
    return (<div className="app-shell">
      <a className="skip-link" href="#main-content">{t("Skip to main content")}</a>
      <AppNavigation activeView={activeView} unreadCount={unreadCount} onNavigate={onNavigate} onAssist={() => setModal('assistance')} onContact={() => setModal('contact')}/>

      <div className="main-column">
        <header className="topbar">
          <span className="mobile-brand"><Brand publicStyle/></span>
          <div className="topbar-actions">
            <LanguageSelector /><span className="demo-label">{t("Demo")}</span>
            <button className="icon-button" type="button" onClick={() => onNavigate('alerts')} aria-label={t("View alerts")}><Bell />{unreadCount > 0 ? <i>{unreadCount}</i> : null}</button>
            <button className="avatar-button" type="button" onClick={() => onNavigate('profile')} aria-label={t("Open profile")}>{t("OO")}</button>
          </div>
        </header>

        <main id="main-content" tabIndex={-1}>
          {activeView === 'home' ? <DashboardPage journeyStarted={journeyStarted} vehicleConnected={vehicleConnected} onNavigate={onNavigate} onOpenPlanner={openPlanner} onOpenAssistance={() => setModal('assistance')} onOpenPreferences={() => setModal('preferences')} onOpenFeedback={() => setModal('feedback')} onStartJourney={startJourney} onConnectVehicle={connectVehicle}/> : null}
          {activeView === 'journeys' ? <JourneysPage onOpenPlanner={() => openPlanner()} onDetails={() => notify('Journey ready', 'Boarding assistance and haptic alerts are confirmed.')}/> : null}
          {activeView === 'accessibility' ? <AccessibilityPage settings={settings} saved={settingsSaved} onUpdate={updateSetting}/> : null}
          {activeView === 'alerts' ? <AlertsPage alerts={alerts} onMarkAllRead={() => { setAlerts((current) => current.map((alert) => ({ ...alert, unread: false }))); notify('All caught up', 'Every alert has been marked as read.'); }} onDismiss={(id) => { setAlerts((current) => current.filter((alert) => alert.id !== id)); notify('Alert dismissed', 'The update has been removed from your list.'); }} onFeedback={() => setModal('feedback')}/> : null}
          {activeView === 'profile' ? <ProfilePage profile={profile} onChange={setProfile} onSave={() => notify('Profile saved', 'Your personal details are up to date.')}/> : null}
        </main>
      </div>

      <Modal open={modal === 'planner'} title={t("Where are you going?")} eyebrow={t("NEW JOURNEY")} onClose={() => setModal(null)} wide>
        <form onSubmit={submitPlanner}>
          <div className="modal-location-fields">
            <label><span>{t("From")}</span><div><MapPin /><input name="origin" defaultValue={t("Current location")}/></div></label>
            <label><span>{t("To")}</span><div><MapPin /><input name="destination" value={plannerDestination} onChange={(event) => setPlannerDestination(event.target.value)} placeholder={t("Enter a destination")} required/></div></label>
          </div>
          <div className="date-time-row"><label><span>{t("Date")}</span><input type="date" name="date" defaultValue="2026-09-25"/></label><label><span>{t("Leave at")}</span><input type="time" name="time" defaultValue="14:30"/></label></div>
          <label className="route-option"><input type="checkbox" defaultChecked/><span><strong>{t("Use my accessibility preferences")}</strong><small>{t("Prioritise step-free routes and allow extra transfer time")}</small></span></label>
          <button type="submit" className="primary-button full-button" disabled={routesLoading}>{routesLoading ? t("Finding accessible routes\u2026") : routeResults.length ? 'Refresh routes' : 'Find accessible routes'}</button>
        </form>
        {routeResults.length > 0 ? <div className="route-results"><div className="results-heading"><div><span className="section-kicker">{routeResults.length} {t("ROUTES FOUND")}</span><h3>{t("Recommended for you")}</h3></div><span>{t("Updated now")}</span></div>{routeResults.map((route) => <button className={`route-result ${route.recommended ? 'recommended' : ''}`} type="button" key={route.id} onClick={selectRoute}>{route.recommended ? <span className="recommend-chip"><Sparkles />{t("Best match")}</span> : null}<div className="result-times"><strong>{route.departureTime}</strong><span /><strong>{route.arrivalTime}</strong></div><div className="result-main"><span className="mode-badge"><Bus />{route.routeNumber}</span><div><strong>{route.durationMinutes} {t("min \u00B7")}{route.changes === 0 ? t("Direct") : `${route.changes} ${t("change")}`}</strong><small>{route.origin} → {route.destination}</small></div><strong>{route.price}</strong></div><div className="result-features">{route.features.map((feature) => <span key={t(feature)}>{t(feature)}</span>)}</div></button>)}</div> : null}
      </Modal>

      <Modal open={modal === 'assistance'} title={t("Request assistance")} eyebrow={t("TRAVEL SUPPORT")} onClose={() => setModal(null)}>
        <p className="modal-intro">{t("What help do you need?")}</p>
        <div className="assistance-options">
          {[
            { value: 'boarding', title: 'Boarding assistance', detail: 'Help getting onto the vehicle', icon: Hand, tone: 'coral' },
            { value: 'wheelchair', title: 'Wheelchair space', detail: 'Reserve an accessible space', icon: Accessibility, tone: 'blue' },
            { value: 'urgent', title: 'Urgent help', detail: 'Alert staff during your journey', icon: ShieldAlert, tone: 'amber' },
        ].map(({ value, title, detail, icon: Icon, tone }) => <label key={value}><input type="radio" name="assistance" value={value} checked={assistanceType === value} onChange={() => setAssistanceType(value)}/><span className={`action-icon ${tone}`}><Icon /></span><span><strong>{t(title)}</strong><small>{t(detail)}</small></span><i /></label>)}
        </div>
        <button className="primary-button full-button" type="button" onClick={sendAssistance}>{t("Send request")}</button>
      </Modal>

      <Modal open={modal === 'feedback'} title={t("How was your trip?")} eyebrow={t("JOURNEY FEEDBACK")} onClose={() => setModal(null)}>
        <p className="modal-intro">{t("Your feedback helps us improve future support.")}</p>
        <div className="rating-row" role="group" aria-label={t("Journey rating")}>{[1, 2, 3, 4, 5].map((star) => <button className={rating >= star ? "selected" : ""} type="button" key={star} onClick={() => setRating(star)} aria-label={`${star} ${t("star rating")}`}>★</button>)}</div>
        <label className="feedback-label"><span>{t("Anything else we should know?")}</span><textarea rows={4} placeholder={t("Tell us what worked well or could be better")}/></label>
        <button className="primary-button full-button" type="button" onClick={() => { if (!rating) {
        notify('Choose a rating', 'Select a star rating before submitting.');
        return;
    } setModal(null); setRating(0); notify('Feedback received', 'Thank you for helping improve Travelmate.'); }}>{t("Submit feedback")}</button>
      </Modal>

      <Modal open={modal === 'preferences'} title={t("Journey support")} eyebrow={t("QUICK SETTINGS")} onClose={() => setModal(null)}>
        <Toggle checked={settings.haptics} label={t("Haptic stop reminders")} description={t("Vibrate two stops before arrival")} onChange={(value) => updateSetting('haptics', value)}/>
        <Toggle checked={settings.stepFree} label={t("Step-free routes")} description={t("Avoid stairs where possible")} onChange={(value) => updateSetting('stepFree', value)}/>
        <Toggle checked={settings.extraTime} label={t("Extra transfer time")} description={t("Add 8 minutes between services")} onChange={(value) => updateSetting('extraTime', value)}/>
        <button className="primary-button full-button" type="button" onClick={() => setModal(null)}>{t("Done")}</button>
      </Modal>

      <Modal open={modal === 'contact'} title={t("Contact Travelmate")} eyebrow={t("HELP & SUPPORT")} onClose={() => setModal(null)}>
        <div className="contact-options"><button type="button" onClick={() => notify('Live chat', 'A support specialist will join shortly.')}><MessageSquare /><span><strong>{t("Live chat")}</strong><small>{t("Usually replies in 2 minutes")}</small></span></button><button type="button" onClick={() => notify('Call support', 'Support is available 24 hours a day.')}><Bell /><span><strong>{t("Call support")}</strong><small>{t("Available 24 hours")}</small></span></button></div>
      </Modal>

      <Toast toast={toast}/>
    </div>);
}
