import { useEffect } from 'react';
import { useLanguage } from './i18n/LanguageContext';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PublicHome from './pages/PublicHome';
import PassengerApp from './pages/PassengerApp';
import InformationPage from './pages/InformationPage';

export default function App() {
  const { pathname } = useLocation();
  const { language, t } = useLanguage();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname]);
  useEffect(() => {
    const titles: Record<string, string> = { '/about': 'About us', '/services': 'Services', '/insights': 'Insights', '/news': 'News', '/careers': 'Careers', '/contact': 'Contact us' };
    document.title = `${t(titles[pathname] ?? 'Your travel')} · TravelMate`;
  }, [pathname, language]);
  return (
    <Routes>
      <Route path="/" element={<PublicHome />} />
      <Route path="/app/:view" element={<PassengerApp />} />
      <Route path="/app" element={<Navigate to="/app/home" replace />} />
      <Route path="/:page" element={<InformationPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
