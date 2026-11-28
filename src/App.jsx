import { useState, useEffect, useRef } from 'react';
import Brand from './Brand.jsx';
import Icon from './Icon.jsx';
import CinematicHero from './CinematicHero.jsx';
import './cinematic.css';
import AIAssistantShowcase from './AIAssistantShowcase.jsx';
import SolutionConfigurator from './SolutionConfigurator.jsx';
import ContactForm from './ContactForm.jsx';
import CommercialAssistant from './CommercialAssistant.jsx';
import { PortfolioTeaser } from './Portfolio.jsx';
import { services } from './services-data.js';
import './home-hub.css';

const methodology = [
  ['Entendemos el desafío', 'Analizamos necesidades, objetivos y contexto. El punto de partida es comprender qué necesitas resolver.'],
  ['Diseñamos la solución', 'Definimos funciones, experiencia y alcance. Acordamos un camino claro antes de construir.'],
  ['Desarrollamos y validamos', 'Construimos y probamos la solución, revisando su funcionamiento junto a quienes la utilizarán.'],
  ['Implementamos y evolucionamos', 'Facilitamos la puesta en marcha y definimos el acompañamiento que corresponda al proyecto.'],
];

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const isHome = path === '/';
  const isAbout = path === '/nosotros';
  const isContact = path === '/contacto';
  const isAI = path === '/inteligencia-artificial';
  useEffect(() => { if (!isHome) document.title = (isAbout ? 'Nosotros' : isContact ? 'Contacto' : isAI ? 'Inteligencia artificial' : 'Página no encontrada') + ' | MUVORY Technologies'; }, [isHome,isAbout,isContact,isAI]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggle = useRef(null);
  const closeMenu = () => setMenuOpen(false);
  // A direct link from a service page to /#contacto must scroll after React mounts.
  useEffect(() => {
    const anchor = window.location.hash.slice(1);
    const legacy = {contacto:'/contacto',nosotros:'/nosotros',metodologia:'/nosotros#metodologia',agentes:'/inteligencia-artificial',explorador:'/contacto#explorador',soluciones:'/servicios',aplicaciones:'/sectores',casos:'/portafolio',sectores:'/sectores'};
    if (isHome && Object.hasOwn(legacy,anchor)) { window.location.replace(legacy[anchor]); return; }
    if (!anchor) return;
    const raf = window.requestAnimationFrame(() => {
      document.getElementById(anchor)?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(raf);
  }, [isHome]);
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
        <Brand href="/" />
        <button ref={menuToggle} className="menu-toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(value => !value)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        <nav id="main-navigation" className={'nav' + (menuOpen ? ' nav-open' : '')} aria-label="Navegación principal">
          <a href="/servicios" onClick={closeMenu}>Servicios</a>
          <a href="/sectores" onClick={closeMenu}>Sectores</a>
          <a href="/experience" onClick={closeMenu}>Experiencia</a>
          <a href="/portafolio" onClick={closeMenu}>Proyectos</a>
          <a href="/inteligencia-artificial" onClick={closeMenu}>Inteligencia artificial</a>
          <a href="/nosotros" onClick={closeMenu}>Nosotros</a>
          <a className="nav-mobile-contact" href="/contacto" onClick={closeMenu}>Hablemos de tu proyecto</a>
        </nav>
        <a className="button button-nav" href="/contacto">Hablemos</a>
      </div>
    </header>

    <main id="contenido" tabIndex={-1} className={isHome ? "muvory-home-hub" : "muvory-inner-page"}>
      {isHome && <>
      <section id="inicio" className="hero hero-cinematic section-anchor">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true" />SOFTWARE · AUTOMATIZACIÓN · IA · PLATAFORMAS</p>
            <h1>Tecnología que entiende <span>tu negocio.</span></h1>
            <p className="hero-description">Desarrollamos software, automatizaciones e inteligencia artificial para resolver desafíos de operación, gestión y crecimiento.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="/portafolio">Explorar nuestros proyectos <Icon name="arrow" size={17}/></a>
              <a className="button button-outline" href="/servicios">Conocer servicios</a>
            </div>
          </div>
          <CinematicHero />
        </div>
      </section>

      <section className="home-directory" id="portada-accesos" aria-label="Explora MUVORY">
        <div className="container">
          <div className="home-directory-grid">
            <a className="home-door" href="/servicios"><span className="home-door-icon"><Icon name="layers" size={27}/></span><div><h2>Qué ofrecemos</h2><p>Software, automatización, IA, datos y plataformas.</p></div><Icon name="arrowUp" size={20}/></a>
            <a className="home-door" href="/portafolio"><span className="home-door-icon"><Icon name="chart" size={27}/></span><div><h2>Nuestro trabajo</h2><p>Explora los sistemas que desarrollamos.</p></div><Icon name="arrowUp" size={20}/></a>
            <a className="home-door" href="/experience"><span className="home-door-icon"><Icon name="spark" size={27}/></span><div><h2>Experimenta</h2><p>Prueba nuestras demostraciones interactivas.</p></div><Icon name="arrowUp" size={20}/></a>
          </div>
          <div className="home-secondary-links"><a href="/sectores">Sectores y soluciones <Icon name="arrow" size={15}/></a><a href="/inteligencia-artificial">Inteligencia artificial <Icon name="arrow" size={15}/></a><a href="/nosotros">Conoce MUVORY <Icon name="arrow" size={15}/></a></div>
        </div>
      </section>
      <section className="home-offers"><div className="container">
        <div className="home-section-head"><div><p className="section-kicker">NUESTRAS ESPECIALIDADES</p><h2>Qué podemos <em>construir.</em></h2></div><a href="/servicios">Todos los servicios <Icon name="arrow" size={17}/></a></div>
        <div className="home-offers-grid">{services.map((service,i)=><a key={service.slug} href={'/servicios/'+service.slug}><Icon name={service.icon} size={24}/><h3>{service.name}</h3><p>{['Sistemas que se adaptan a tu operación.','Conecta tareas y elimina pasos manuales.','Asistentes y análisis para trabajar mejor.','Convierte información en decisiones.','Experiencias digitales para tu negocio.'][i]}</p><Icon name="arrowUp" size={16}/></a>)}</div>
      </div></section>
      <PortfolioTeaser />
      <section className="home-difference"><div className="container"><div><p className="section-kicker">NUESTRA FORMA DE TRABAJAR</p><h2>No solo desarrollamos. <em>Entendemos la operación.</em></h2><p>Combinamos experiencia práctica con ingeniería de software para resolver problemas concretos.</p></div><div className="home-difference-links"><a href="/nosotros">Cómo trabajamos <Icon name="arrow" size={17}/></a><a href="/sectores">Soluciones por sector <Icon name="arrow" size={17}/></a><a href="/experience">Prueba nuestra tecnología <Icon name="arrow" size={17}/></a></div></div></section>
      <section className="home-contact-strip"><div className="container"><div><h2>¿Qué te gustaría construir?</h2><p>Conversemos sobre tu proyecto.</p></div><a className="button button-primary" href="/contacto">Hablemos <Icon name="arrow" size={17}/></a></div></section>
      </>}
      {isAI && <section className="section section-agents section-anchor" id="agentes"><div className="container"><a className="home-back" href="/">← Inicio</a><AIAssistantShowcase /><a className="button button-primary" href="/contacto">Hablemos de tu solución <Icon name="arrow" size={17}/></a></div></section>}
      {isAbout && <>
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

      <section className="home-contact-strip"><div className="container"><div><h2>Convirtamos una idea en solución.</h2></div><a className="button button-primary" href="/contacto">Hablemos <Icon name="arrow" size={17}/></a></div></section>
      </>}
      {isContact && <>
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
      <SolutionConfigurator />
      </>}
      {!isHome && !isAbout && !isContact && !isAI && <section className="section"><div className="container"><h1>Página no encontrada</h1><a href="/">Volver al inicio</a></div></section>}
    </main>

    <footer className="site-footer">
      <div className="container footer-main"><Brand footer href="/" /><p>Tecnología con propósito.<br />Soluciones con identidad propia.</p><a className="footer-email" href="mailto:contacto@muvory.cl">contacto@muvory.cl</a><a href="/">Volver al inicio</a></div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} MUVORY Technologies.</span><span>Software · Automatización · Inteligencia artificial</span></div>
    </footer>
    {isContact && <CommercialAssistant />}
  </>;
}

export default App;
