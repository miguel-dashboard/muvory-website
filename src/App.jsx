import { useState, useEffect, useRef } from 'react';
import Brand from './Brand.jsx';
import Icon from './Icon.jsx';
import CinematicHero from './CinematicHero.jsx';
import ServicesTeaser from './ServicesTeaser.jsx';
import './cinematic.css';
import { GroundedSectorTeaser } from './Sectors.jsx';
import AIAssistantShowcase from './AIAssistantShowcase.jsx';
import SolutionConfigurator from './SolutionConfigurator.jsx';
import ContactForm from './ContactForm.jsx';
import CommercialAssistant from './CommercialAssistant.jsx';
import { PortfolioTeaser } from './Portfolio.jsx';

const methodology = [
  ['Entendemos el desafío', 'Analizamos necesidades, objetivos y contexto. El punto de partida es comprender qué necesitas resolver.'],
  ['Diseñamos la solución', 'Definimos funciones, experiencia y alcance. Acordamos un camino claro antes de construir.'],
  ['Desarrollamos y validamos', 'Construimos y probamos la solución, revisando su funcionamiento junto a quienes la utilizarán.'],
  ['Implementamos y evolucionamos', 'Facilitamos la puesta en marcha y definimos el acompañamiento que corresponda al proyecto.'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggle = useRef(null);
  const closeMenu = () => setMenuOpen(false);
  // A direct link from a service page to /#contacto must scroll after React mounts.
  useEffect(() => {
    const anchor = window.location.hash.slice(1);
    if (!anchor) return;
    const raf = window.requestAnimationFrame(() => {
      document.getElementById(anchor)?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(raf);
  }, []);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 961px)');
    const onResize = () => { if (media.matches) setMenuOpen(false); };
    media.addEventListener('change', onResize);
    return () => media.removeEventListener('change', onResize);
  }, []);

  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header" onKeyDown={event => {
      if (event.key === 'Escape' && menuOpen) { closeMenu(); menuToggle.current?.focus(); }
    }}>
      <div className="container nav-wrap">
        <Brand />
        <button ref={menuToggle} className="menu-toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(value => !value)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        <nav id="main-navigation" className={'nav' + (menuOpen ? ' nav-open' : '')} aria-label="Navegación principal">
          <a href="/servicios" onClick={closeMenu}>Servicios</a>
          <a href="/sectores" onClick={closeMenu}>Sectores</a>
          <a href="/experience" onClick={closeMenu}>Experiencia</a>
          <a href="/portafolio" onClick={closeMenu}>Proyectos</a>
          <a href="#agentes" onClick={closeMenu}>Inteligencia artificial</a>
          <a href="#nosotros" onClick={closeMenu}>Nosotros</a>
          <a className="nav-mobile-contact" href="#contacto" onClick={closeMenu}>Hablemos de tu proyecto</a>
        </nav>
        <a className="button button-nav" href="#contacto">Hablemos</a>
      </div>
    </header>

    <main id="contenido" tabIndex={-1}>
      <section id="inicio" className="hero hero-cinematic section-anchor">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true" />SOFTWARE · AUTOMATIZACIÓN · IA · PLATAFORMAS</p>
            <h1>Tecnología que entiende <span>tu negocio.</span></h1>
            <p className="hero-description">Convertimos los problemas cotidianos de una operación en sistemas a medida, automatizaciones y herramientas con IA. Conocemos el trabajo desde dentro y diseñamos soluciones que realmente se puedan usar.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="/sectores">Explorar soluciones reales <Icon name="arrow" size={17}/></a>
              <a className="button button-outline" href="#contacto">Cuéntanos qué necesitas resolver</a>
            </div>
            <p className="hero-note">Experiencia cercana en logística, gestión jurídica y comercio. Tecnología para muchos más sectores.</p>
          </div>
          <CinematicHero />
        </div>
        <div className="container hero-footnote"><span>Diseñado alrededor de tu necesidad.</span><span>Desarrollo a medida <i /> Integraciones <i /> Evolución continua</span></div>
      </section>

      <section className="section section-solutions section-anchor" id="soluciones">
        <div className="container">
          <div className="section-heading">
            <div><p className="section-kicker">QUÉ PODEMOS DESARROLLAR</p><h2>Soluciones que simplifican <em>el trabajo real.</em></h2></div>
            <p>Sistemas a medida, automatización, inteligencia artificial y plataformas digitales. Primero entendemos tu problema; después definimos qué conviene construir.</p>
          </div>
          <ServicesTeaser />
          <div className="experience-invite">
            <div>
              <span className="section-kicker">MUVORY EXPERIENCE</span>
              <h3>Explora nuestra tecnología en acción.</h3>
              <p>Un recorrido interactivo con software, automatización, inteligencia artificial y datos, para descubrir cómo podría funcionar tu solución.</p>
            </div>
            <a className="button button-outline" href="/experience">Iniciar experiencia <Icon name="arrow" size={18}/></a>
          </div>
        </div>
      </section>

      <section className="section section-applications section-anchor" id="aplicaciones">
        <span id="casos" className="anchor-alias" aria-hidden="true" /><span id="sectores" className="anchor-alias" aria-hidden="true" />
        <div className="container">
          <div className="section-heading">
            <div><p className="section-kicker">NUESTRA MAYOR DIFERENCIA</p><h2>Experiencia en el negocio. <em>Soluciones desde dentro.</em></h2></div>
            <p>Conocemos los problemas de estudios jurídicos, transporte y minimarkets. Los convertimos en propuestas de software prácticas, medibles y adaptadas a cada operación.</p>
          </div>
          <GroundedSectorTeaser />
        </div>
      </section>

      <PortfolioTeaser />

      <section className="section section-agents section-anchor" id="agentes"><div className="container"><AIAssistantShowcase /></div></section>

      <section className="section section-about section-anchor" id="nosotros">
        <div className="container">
          <div className="about-intro">
            <div><p className="section-kicker">POR QUÉ MUVORY</p><h2>Primero entendemos <em>tu operación.</em></h2></div>
            <div className="about-copy"><p>Conocemos los problemas cotidianos de gestionar negocios: diferencias de inventario, retrasos de distribución y tareas que se pierden entre correos y planillas.</p><p>Combinamos esa experiencia práctica con ingeniería de software. Trabajamos con un diagnóstico, una propuesta de alcance claro y avances comprobables. Sin venderte funciones que no necesitas.</p></div>
          </div>
          <div className="principles"><span><Icon name="layers" size={20} /> Diseño y desarrollo a medida</span><span><Icon name="message" size={20} /> Comunicación clara</span><span><Icon name="workflow" size={20} /> Soluciones que evolucionan</span></div>
          <div className="methodology section-anchor" id="metodologia">
            <div className="methodology-heading"><p className="section-kicker">CÓMO TRABAJAMOS</p><p>Un proceso claro, de la idea a su implementación.</p></div>
            <ol className="steps">{methodology.map(([title, description], index) => <li className="step" key={title}><span className="step-number" aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
          </div>
          {/* Add verified case studies here when approved content is available. */}
        </div>
      </section>

      <SolutionConfigurator />

      <section className="section section-contact section-anchor" id="contacto">
        <div className="container contact-layout">
          <div className="contact-copy">
            <p className="section-kicker">CONVERSEMOS</p>
            <h2>Todo empieza<br />con <em>tu desafío.</em></h2>
            <p>Una idea nueva. Un proceso que podría funcionar mejor. Una herramienta que todavía no existe.</p>
            <p>Cuéntanos qué quieres crear, mejorar o automatizar. Revisaremos el contexto para definir un siguiente paso.</p>
            <div className="contact-detail"><Icon name="message" size={22} /><span>Personas, proyectos y organizaciones.<br />El punto de partida lo pones tú.</span></div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>

    <footer className="site-footer">
      <div className="container footer-main"><Brand footer /><p>Tecnología con propósito.<br />Soluciones con identidad propia.</p><a className="footer-email" href="mailto:contacto@muvory.cl">contacto@muvory.cl</a><a href="#inicio">Volver al inicio</a></div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} MUVORY Technologies.</span><span>Software · Automatización · Inteligencia artificial</span></div>
    </footer>
    <CommercialAssistant />
  </>;
}

export default App;
