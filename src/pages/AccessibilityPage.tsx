import { useLanguage } from '../i18n/LanguageContext';
import { Check, Eye, Hand, ShieldCheck } from 'lucide-react';
import Toggle from '../components/Toggle';
import type { AccessibilitySettings } from '../types/travel';
interface AccessibilityPageProps {
    settings: AccessibilitySettings;
    saved: boolean;
    onUpdate: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
}
export default function AccessibilityPage({ settings, saved, onUpdate }: AccessibilityPageProps) {
    const { t } = useLanguage();
    return (<section className="view active" aria-labelledby="accessibility-heading">
      <div className="view-heading">
        <div><h1 id="accessibility-heading">{t("My support needs")}</h1><p>{t("Choose what helps you travel. Changes save automatically.")}</p></div>
        <span className={`saved-indicator ${saved ? 'visible' : ''}`}><Check />{t("Saved")}</span>
      </div>

      <div className="settings-grid">
        <section className="panel setting-section">
          <div className="setting-heading"><span className="setting-icon"><Eye /></span><div><h2>{t("Seeing and hearing")}</h2><p>{t("How information is presented during your journey.")}</p></div></div>
          <Toggle checked={settings.haptics} label={t("Vibration alerts")} description={t("Vibrate for turns, stops and important updates")} onChange={(value) => onUpdate('haptics', value)}/>
          <Toggle checked={settings.largeText} label={t("Large text")} description={t("Increase the size of journey instructions")} onChange={(value) => onUpdate('largeText', value)}/>
          <Toggle checked={settings.highContrast} label={t("High contrast")} description={t("Make controls and journey details easier to see")} onChange={(value) => onUpdate('highContrast', value)}/>
          <Toggle checked={settings.audio} label={t("Audio guidance")} description={t("Read important journey instructions aloud")} onChange={(value) => onUpdate('audio', value)}/>
        </section>
        <section className="panel setting-section">
          <div className="setting-heading"><span className="setting-icon"><Hand /></span><div><h2>{t("Moving and boarding")}</h2><p>{t("Support you may need while boarding or travelling.")}</p></div></div>
          <Toggle checked={settings.stepFree} label={t("Step-free routes")} description={t("Prioritise routes without stairs")} onChange={(value) => onUpdate('stepFree', value)}/>
          <Toggle checked={settings.boarding} label={t("Boarding assistance")} description={t("Notify staff before you arrive")} onChange={(value) => onUpdate('boarding', value)}/>
          <Toggle checked={settings.extraTime} label={t("Extra transfer time")} description={t("Allow more time when changing services")} onChange={(value) => onUpdate('extraTime', value)}/>
          <Toggle checked={settings.seating} label={t("Priority seating")} description={t("Include a seating request with assistance")} onChange={(value) => onUpdate('seating', value)}/>
        </section>
      </div>
      <section className="panel consent-panel">
        <div className="setting-heading"><span className="setting-icon"><ShieldCheck /></span><div><h2>{t("Consent and data use")}</h2><p>{t("You control how your accessibility information is used.")}</p></div></div>
        <div className="consent-row"><div><strong>{t("Share needs with transport staff")}</strong><p>{t("Only during an active journey when assistance is required.")}</p></div><select aria-label={t("Sharing preference")} defaultValue="needed"><option value="needed">{t("Only when needed")}</option><option value="always">{t("Every journey")}</option><option value="never">{t("Never")}</option></select></div>
        <div className="consent-row"><div><strong>{t("Personalised journey suggestions")}</strong><p>{t("Use your preferences to improve route and alert recommendations.")}</p></div><label aria-label={t("Personalised journey suggestions")}><input className="toggle-input" type="checkbox" checked={settings.personalisation} onChange={(event) => onUpdate('personalisation', event.target.checked)}/><span className="toggle" aria-hidden="true"/></label></div>
      </section>
    </section>);
}
