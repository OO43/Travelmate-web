import { useLanguage } from '../i18n/LanguageContext';
import type { PassengerProfile } from '../types/travel';
interface ProfilePageProps {
    profile: PassengerProfile;
    onChange: (profile: PassengerProfile) => void;
    onSave: () => void;
}
export default function ProfilePage({ profile, onChange, onSave }: ProfilePageProps) {
    const { t } = useLanguage();
    const update = (key: keyof PassengerProfile, value: string) => onChange({ ...profile, [key]: value });
    return (<section className="view active" aria-labelledby="profile-heading">
      <div className="view-heading"><div><h1 id="profile-heading">{t("Profile")}</h1><p>{t("Your contact details.")}</p></div><button className="primary-button compact" type="button" onClick={onSave}>{t("Save changes")}</button></div>
      <div className="profile-layout">

        <section className="panel profile-form-panel">
          <div className="panel-header"><div><span className="section-kicker">{t("PERSONAL DETAILS")}</span><h2>{t("About you")}</h2></div></div>
          <form className="form-grid" onSubmit={(event) => { event.preventDefault(); onSave(); }}>
            <label><span>{t("First name")}</span><input value={profile.firstName} onChange={(event) => update('firstName', event.target.value)}/></label>
            <label><span>{t("Last name")}</span><input value={profile.lastName} onChange={(event) => update('lastName', event.target.value)}/></label>
            <label className="full"><span>{t("Email address")}</span><input type="email" value={profile.email} onChange={(event) => update('email', event.target.value)}/></label>
            <label><span>{t("Phone number")}</span><input type="tel" value={profile.phone} onChange={(event) => update('phone', event.target.value)}/></label>
            <label><span>{t("Preferred language")}</span><select value={profile.preferredLanguage} onChange={(event) => update('preferredLanguage', event.target.value)}><option value="English">English</option><option value="Mandarin Chinese">中文（普通话）</option><option value="Spanish">Español</option><option value="French">Français</option><option value="Portuguese">Português</option></select></label>
            <label className="full"><span>{t("Emergency contact")}</span><input value={profile.emergencyContact} onChange={(event) => update('emergencyContact', event.target.value)}/></label>
          </form>
        </section>
      </div>
    </section>);
}
