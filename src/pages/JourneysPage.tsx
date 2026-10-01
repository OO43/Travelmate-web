import { useLanguage } from '../i18n/LanguageContext';
import { Briefcase, Bus, Heart, Home, Plus, Train } from 'lucide-react';
interface JourneysPageProps {
    onOpenPlanner: () => void;
    onDetails: () => void;
}
export default function JourneysPage({ onOpenPlanner, onDetails }: JourneysPageProps) {
    const { t } = useLanguage();
    return (<section className="view active" aria-labelledby="journeys-heading">
      <div className="view-heading"><div><h1 id="journeys-heading">{t("Journeys")}</h1><p>{t("Plan a new route or revisit a recent trip.")}</p></div><button className="primary-button compact" type="button" onClick={onOpenPlanner}><Plus />{t("Plan a journey")}</button></div>

      <div className="content-grid wide-left">
        <section className="panel">
          <div className="panel-header"><div><span className="section-kicker">{t("UPCOMING")}</span><h2>{t("Planned journeys")}</h2></div></div>
          <article className="journey-list-card featured"><div className="date-tile"><strong>25</strong><span>{t("SEP")}</span></div><div className="journey-list-main"><strong>{t("Leicester Station \u2192 Haymarket")}</strong><span>{t("Today \u00B7 14:35\u201314:53 \u00B7 Bus 24")}</span><div className="mini-tags"><span>{t("Step-free")}</span><span>{t("Vibration alerts")}</span></div></div><button className="secondary-button" type="button" onClick={onDetails}>{t("Details")}</button></article>
          <article className="journey-list-card"><div className="date-tile muted"><strong>27</strong><span>{t("SEP")}</span></div><div className="journey-list-main"><strong>{t("Home \u2192 Leicester Royal Infirmary")}</strong><span>{t("Saturday \u00B7 09:10\u201309:42 \u00B7 Bus 48")}</span><div className="mini-tags"><span>{t("Assistance requested")}</span></div></div><button className="icon-button" type="button" aria-label={t("Journey options")}>•••</button></article>
        </section>
        <section className="panel">
          <div className="panel-header"><div><span className="section-kicker">{t("SAVED")}</span><h2>{t("Your places")}</h2></div><button className="text-button" type="button">{t("Edit")}</button></div>
          <div className="saved-places">
            <button type="button"><span className="place-icon"><Home /></span><span><strong>{t("Home")}</strong><small>{t("Western Road, Leicester")}</small></span><span>›</span></button>
            <button type="button"><span className="place-icon"><Briefcase /></span><span><strong>{t("Work")}</strong><small>{t("City Centre, Leicester")}</small></span><span>›</span></button>
            <button type="button"><span className="place-icon"><Heart /></span><span><strong>{t("Leicester Station")}</strong><small>{t("London Road")}</small></span><span>›</span></button>
          </div>
        </section>
      </div>
      <section className="panel recent-panel">
        <div className="panel-header"><div><span className="section-kicker">{t("RECENT")}</span><h2>{t("Journey history")}</h2></div><button className="text-button" type="button">{t("View all")}</button></div>
        <div className="history-row"><span className="history-mode"><Bus /></span><div><strong>{t("Haymarket \u2192 Home")}</strong><span>{t("18 September \u00B7 Bus 24")}</span></div><span className="success-text">{t("Completed")}</span><strong>{t("22 min")}</strong></div>
        <div className="history-row"><span className="history-mode"><Train /></span><div><strong>{t("Leicester \u2192 Birmingham New Street")}</strong><span>{t("12 September \u00B7 CrossCountry")}</span></div><span className="success-text">{t("Completed")}</span><strong>{t("58 min")}</strong></div>
      </section>
    </section>);
}
