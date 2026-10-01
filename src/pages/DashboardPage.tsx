import { useLanguage } from '../i18n/LanguageContext';
import { Accessibility, Bus, Hand, Route } from 'lucide-react';
import type { AppView } from '../types/travel';
interface DashboardPageProps {
    journeyStarted: boolean;
    vehicleConnected: boolean;
    onNavigate: (view: AppView) => void;
    onOpenPlanner: (destination?: string) => void;
    onOpenAssistance: () => void;
    onOpenPreferences: () => void;
    onOpenFeedback: () => void;
    onStartJourney: () => void;
    onConnectVehicle: () => void;
}
export default function DashboardPage({ journeyStarted, vehicleConnected, onNavigate, onOpenPlanner, onOpenAssistance, onOpenPreferences, onOpenFeedback, onStartJourney, onConnectVehicle }: DashboardPageProps) {
    const { t } = useLanguage();
    return <section className="view active quiet-dashboard" aria-labelledby="home-heading">
    <div className="view-heading"><div><h1 id="home-heading">{t("Your travel")}</h1><p>{t("What would you like to do?")}</p></div></div>
    <div className="task-grid">
      <button className="task-card task-primary" type="button" onClick={() => onOpenPlanner()}><Route aria-hidden="true"/><strong>{t("Plan a journey")}</strong><span>{t("Choose where you want to go.")}</span></button>
      <button className="task-card" type="button" onClick={onOpenAssistance}><Hand aria-hidden="true"/><strong>{t("Get assistance")}</strong><span>{t("Choose the help you need.")}</span></button>
      <button className="task-card" type="button" onClick={() => onNavigate('accessibility')}><Accessibility aria-hidden="true"/><strong>{t("My support needs")}</strong><span>{t("Change your accessibility settings.")}</span></button>
    </div>
    <section className="panel quiet-journey" aria-labelledby="next-journey-heading">
      <h2 id="next-journey-heading">{t("Next journey")}<span className="demo-label">{t("Example")}</span></h2>
      <p className="quiet-destination">{t("Leicester Station to Haymarket")}</p>
      <p className="quiet-route"><Bus aria-hidden="true"/>{t("Bus 24 \u00B7 14:35 \u00B7 18 minutes")}</p>
      <p>{t("Step-free route")}</p>
      <div className="panel-actions"><button className="primary-button" type="button" onClick={onStartJourney}>{journeyStarted ? t("View journey") : t("Start journey")}</button><button className="secondary-button" type="button" onClick={() => onNavigate('journeys')}>{t("Journey details")}</button></div>
    </section>
    <details className="simple-about more-travel"><summary>{t("More travel options")}</summary><div className="more-actions">
      <button className="secondary-button" type="button" onClick={onConnectVehicle}>{vehicleConnected ? t("Connected to Bus 24") : t("Connect to a vehicle")}</button>
      <button className="secondary-button" type="button" onClick={onOpenPreferences}>{t("Journey preferences")}</button>
      <button className="secondary-button" type="button" onClick={onOpenFeedback}>{t("Share feedback")}</button>
      <button className="secondary-button" type="button" onClick={() => onNavigate('alerts')}>{t("Travel updates")}</button>
    </div></details>
  </section>;
}
