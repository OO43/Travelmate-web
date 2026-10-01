import { useLanguage } from '../i18n/LanguageContext';
import { Accessibility, Bell, Bus, Check, Hand, Lock, Route, Signal, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Brand from '../components/Brand';
import SiteFooter from '../components/SiteFooter';
import LanguageSelector from '../components/LanguageSelector';
import heroImage from '../assets/travelmate-accessible-journey.webp';
function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
export default function PublicHome() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const openApp = () => navigate('/app/home');
    return (<div className="public-site">
      <a className="skip-link" href="#public-main">{t("Skip to main content")}</a>
      <header className="public-header">
        <div className="public-container header-inner">
          <Brand publicStyle/>
          <LanguageSelector />
          <nav className="public-nav" aria-label={t("Website navigation")}>
            <button type="button" onClick={() => scrollToSection('purpose')}>{t("Purpose")}</button>
            <button type="button" onClick={() => scrollToSection('how-it-works')}>{t("How it works")}</button>
            <button type="button" onClick={() => scrollToSection('for-everyone')}>{t("Who it supports")}</button>
          </nav>
          <button className="primary-button header-cta" type="button" onClick={openApp}>{t("Try the web app")}<span aria-hidden="true">→</span></button>
        </div>
      </header>

      <main id="public-main">
        <section className="public-hero">
          <div className="public-container hero-grid">
            <div className="hero-copy">
              <span className="hero-kicker"><i />{t("Accessible public transport")}</span>
              <h1>{t("Travel with confidence.")}</h1>
              <p>{t("Plan your journey, choose your support and get travel updates.")}</p>
              <div className="hero-actions">
                <button className="primary-button hero-primary" type="button" onClick={() => navigate('/app/home?task=plan')}>{t("Plan a journey")}<span aria-hidden="true">→</span></button>
                <button className="hero-link" type="button" onClick={() => scrollToSection('purpose')}>{t("How it works")}<span aria-hidden="true">↓</span></button>
              </div>
              <div className="hero-principles" aria-label={t("Travelmate principles")}>
                <span><i><Check /></i>{t("Passenger-led")}</span>
                <span><i><Lock /></i>{t("Consent-based")}</span>
                <span><i><Signal /></i>{t("Journey-aware")}</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-frame">
                <img src={heroImage} alt={t("Passengers with different accessibility needs boarding an accessible city bus")}/>
                <div className="hero-status-card">
                  <span className="status-symbol"><Check /></span>
                  <span><small>{t("Assistance confirmed")}</small><strong>{t("Support ready before boarding")}</strong></span>
                </div>
              </div>
              <div className="hero-route-card">
                <span className="mode-badge"><Bus />24</span>
                <div><small>{t("Your accessible route")}</small><strong>{t("18 min \u00B7 Step-free")}</strong></div>
                <span className="route-ready">{t("Ready")}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="purpose-section" id="purpose">
          <div className="public-container purpose-grid">
            <div className="section-intro sticky-intro">
              <span className="public-eyebrow">{t("WHY TRAVELMATE")}</span>
              <h2>{t("Support for your journey.")}</h2>
              <p>{t("Choose a route and the help you need before you travel.")}</p>
            </div>
            <div className="purpose-cards">
              <article><span className="purpose-number">01</span><div><h3>{t("Plan with confidence")}</h3><p>{t("Find routes that match your support needs.")}</p></div></article>
              <article><span className="purpose-number">02</span><div><h3>{t("Ask for help")}</h3><p>{t("Tell transport staff what help you need.")}</p></div></article>
              <article><span className="purpose-number">03</span><div><h3>{t("Stay informed")}</h3><p>{t("Get reminders and updates during your journey.")}</p></div></article>
            </div>
          </div>
        </section>

        <section className="platform-section" id="how-it-works">
          <div className="public-container">
            <div className="section-intro centred-intro">
              <span className="public-eyebrow">{t("HOW THE PLATFORM WORKS")}</span>
              <h2>{t("How it works")}</h2>
              <p>{t("Four steps to plan your trip.")}</p>
            </div>
            <div className="journey-steps">
              <article><span className="step-icon mint"><Accessibility /></span><small>{t("STEP 1")}</small><h3>{t("Set your needs")}</h3><p>{t("Choose what helps you travel.")}</p></article>
              <article><span className="step-icon blue"><Route /></span><small>{t("STEP 2")}</small><h3>{t("Plan your route")}</h3><p>{t("Find a route to your destination.")}</p></article>
              <article><span className="step-icon peach"><Signal /></span><small>{t("STEP 3")}</small><h3>{t("Connect support")}</h3><p>{t("Ask for help with boarding or travelling.")}</p></article>
              <article><span className="step-icon lilac"><Bell /></span><small>{t("STEP 4")}</small><h3>{t("Travel informed")}</h3><p>{t("Get stop reminders and travel updates.")}</p></article>
            </div>
          </div>
        </section>

        <section className="personalisation-section">
          <div className="public-container personalisation-grid">
            <div className="personalisation-panel">
              <span className="public-eyebrow light">{t("PERSONALISATION WITH PERMISSION")}</span>
              <h2>{t("You choose your support.")}</h2>
              <p>{t("Your preferences help us suggest useful support. You decide what information can be shared.")}</p>
              <ul>
                <li><Check />{t("Change your preferences at any time")}</li>
                <li><Check />{t("Choose what to share with staff")}</li>
                <li><Check />{t("See why support is suggested")}</li>
              </ul>
            </div>
            <div className="personalisation-demo" aria-label={t("Example personalised journey support")}>
              <div className="demo-top"><span><Sparkles />{t("Suggested for this journey")}</span><small>{t("Based on your preferences")}</small></div>
              <div className="demo-route"><div><small>{t("Oxford Street")}</small><strong>14:20</strong></div><span><i /><i /><i /></span><div><small>{t("Victoria Street")}</small><strong>14:53</strong></div></div>
              <div className="demo-support-list">
                <div><span className="action-icon mint"><Accessibility /></span><span><strong>{t("Step-free route selected")}</strong><small>{t("Avoids stairs throughout the journey")}</small></span><span className="demo-check"><Check /></span></div>
                <div><span className="action-icon blue"><Hand /></span><span><strong>{t("Boarding assistance ready")}</strong><small>{t("Request sent before departure")}</small></span><span className="demo-check"><Check /></span></div>
                <div><span className="action-icon lilac"><Bell /></span><span><strong>{t("Vibration reminder")}</strong><small>{t("Scheduled two stops before arrival")}</small></span><span className="demo-check"><Check /></span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="audience-section" id="for-everyone">
          <div className="public-container">
            <div className="section-intro audience-intro">
              <span className="public-eyebrow">{t("A CONNECTED ACCESSIBILITY PLATFORM")}</span>
              <h2>{t("Who TravelMate helps")}</h2>
            </div>
            <div className="audience-grid">
              <article><span className="audience-icon"><Accessibility /></span><h3>{t("For passengers")}</h3><p>{t("Plan journeys and choose your support.")}</p><span className="audience-outcome">{t("Confidence & independence")}</span></article>
              <article><span className="audience-icon"><Bus /></span><h3>{t("For transport operators")}</h3><p>{t("Understand passenger needs before boarding.")}</p><span className="audience-outcome">{t("Prepared, timely support")}</span></article>
              <article><span className="audience-icon"><Route /></span><h3>{t("For mobility partners")}</h3><p>{t("Connect passengers with travel support.")}</p><span className="audience-outcome">{t("Connected journey delivery")}</span></article>
            </div>
          </div>
        </section>

        <section className="outcomes-section">
          <div className="public-container outcomes-inner">
            <div><span className="public-eyebrow light">{t("WHAT SUCCESS LOOKS LIKE")}</span><h2>{t("Public transport that adapts to people.")}</h2></div>
            <div className="outcomes-list"><span>{t("More confident journeys")}</span><span>{t("Fewer missed assistance needs")}</span><span>{t("Clearer passenger communication")}</span><span>{t("Better-informed transport teams")}</span></div>
          </div>
        </section>

        <section className="public-cta">
          <div className="public-container cta-card">
            <div><span className="public-eyebrow">{t("SEE TRAVELMATE IN ACTION")}</span><h2>{t("Try TravelMate")}</h2><p>{t("Try journey planning and support settings. This demo uses example journeys and simulated requests.")}</p></div>
            <button className="primary-button hero-primary" type="button" onClick={openApp}>{t("Try the web app")}<span aria-hidden="true">→</span></button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>);
}
