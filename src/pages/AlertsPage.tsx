import { useLanguage } from '../i18n/LanguageContext';
import { Accessibility, Bell, Check, Sparkles, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import type { JourneyAlert } from '../types/travel';
type Filter = 'all' | 'unread' | 'journey';
interface AlertsPageProps {
    alerts: JourneyAlert[];
    onMarkAllRead: () => void;
    onDismiss: (id: string) => void;
    onFeedback: () => void;
}
const toneIcons = {
    amber: TriangleAlert,
    blue: Accessibility,
    mint: Check,
    lilac: Sparkles,
};
export default function AlertsPage({ alerts, onMarkAllRead, onDismiss, onFeedback }: AlertsPageProps) {
    const { t } = useLanguage();
    const [filter, setFilter] = useState<Filter>('all');
    const filtered = alerts.filter((alert) => filter === 'all' || (filter === 'unread' && alert.unread) || (filter === 'journey' && alert.category === 'journey'));
    const unreadCount = alerts.filter((alert) => alert.unread).length;
    return (<section className="view active" aria-labelledby="alerts-heading">
      <div className="view-heading"><div><p className="eyebrow">{t("Stay informed")}</p><h1 id="alerts-heading">{t("Journey alerts")}</h1><p>{t("Updates that may affect your travel.")}</p></div><button className="secondary-button" type="button" onClick={onMarkAllRead}>{t("Mark all as read")}</button></div>
      <div className="filter-tabs" role="tablist" aria-label={t("Alert filters")}>
        <button className={filter === 'all' ? "active" : ""} type="button" onClick={() => setFilter('all')}>{t("All")}<span>{alerts.length}</span></button>
        <button className={filter === 'unread' ? "active" : ""} type="button" onClick={() => setFilter('unread')}>{t("Unread")}<span>{unreadCount}</span></button>
        <button className={filter === 'journey' ? "active" : ""} type="button" onClick={() => setFilter('journey')}>{t("My journeys")}</button>
      </div>
      {filtered.length > 0 ? (<div className="alert-list">
          {filtered.map((alert) => {
                const Icon = toneIcons[alert.tone];
                return (<article className={`alert-card ${alert.unread ? 'unread' : ''}`} key={alert.id}>
                <span className={`alert-icon ${alert.tone}`}><Icon /></span>
                <div><div className="alert-meta"><span>{t(alert.type)}</span><time>{t(alert.timeLabel)}</time></div><h2>{t(alert.title)}</h2><p>{t(alert.message)}</p><div className="alert-actions">{alert.id === 'alert-feedback' ? <button className="text-button" type="button" onClick={onFeedback}>{t("Share feedback")}</button> : null}<button className="dismiss-alert" type="button" onClick={() => onDismiss(alert.id)}>{t("Dismiss")}</button></div></div>
                {alert.unread ? <i className="unread-dot" aria-label={t("Unread")}/> : null}
              </article>);
            })}
        </div>) : (<div className="empty-state"><Bell /><h2>{t("You\u2019re all caught up")}</h2><p>{t("There are no alerts in this view.")}</p></div>)}
    </section>);
}
