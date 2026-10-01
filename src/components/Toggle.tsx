import { useLanguage } from '../i18n/LanguageContext';
interface ToggleProps {
    checked: boolean;
    label: string;
    description: string;
    onChange: (checked: boolean) => void;
}
export default function Toggle({ checked, label, description, onChange }: ToggleProps) {
    const { t } = useLanguage();
    return (<label className="setting-row">
      <span>
        <strong>{t(label)}</strong>
        <small>{t(description)}</small>
      </span>
      <input className="toggle-input" type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)}/>
      <span className="toggle" aria-hidden="true"/>
    </label>);
}
