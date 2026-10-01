import { Globe } from 'lucide-react';
import { languages, useLanguage, type Language } from '../i18n/LanguageContext';
export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  return <label className="language-selector"><Globe aria-hidden="true" /><span className="sr-only">{t('Language')}</span><select value={language} onChange={(event) => setLanguage(event.target.value as Language)}>{languages.map(({ code, name }) => <option lang={code} key={code} value={code}>{name}</option>)}</select></label>;
}
