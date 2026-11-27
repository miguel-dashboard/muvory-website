import { useState, useEffect, useRef } from 'react';
import Brand from './Brand.jsx';
import Icon from './Icon.jsx';
import HeroExperience from './HeroExperience.jsx';
import Capabilities from './Capabilities.jsx';
import Applications from './Applications.jsx';
import AIAssistantShowcase from './AIAssistantShowcase.jsx';
import SolutionConfigurator from './SolutionConfigurator.jsx';
import ContactForm from './ContactForm.jsx';
import CommercialAssistant from './CommercialAssistant.jsx';

const methodology = [
  ['Entendemos el desafío', 'Analizamos necesidades, objetivos y contexto. El punto de partida es comprender qué necesitas resolver.'],
  ['Diseñamos la solución', 'Definimos funciones, experiencia y alcance. Acordamos un camino claro antes de construir.'],
  ['Desarrollamos y validamos', 'Construimos y probamos la solución, revisando su funcionamiento junto a quienes la utilizarán.'],
  ['Implementamos y evolucionamos', 'Facilitamos la puesta en marcha y definimos el acompañamiento que corresponda al proyecto.'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
      if (visible.length) setActiveSection(visible[0].target.id);
    }, {rootMargin:'-100px 0px -60% 0px'});
    document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));
    return ()=>observer.disconnect();
  }, []);
  const menuToggle = useRef(null);
  const closeMenu = () => setMenuOpen(false);
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
          <a href="#soluciones" aria-current={activeSection === 'soluciones' ? 'location' : undefined} onClick={closeMenu}>Soluciones</a>
          <a href="#aplicaciones" aria-current={activeSection === 'aplicaciones' ? 'location' : undefined} onClick={closeMenu}>Aplicaciones</a>
          <a href="/experience" onClick={closeMenu}>Experiencia</a>
          <a href="#agentes" aria-current={activeSection === 'agentes' ? 'location' : undefined} onClick={closeMenu}>Inteligencia artificial</a>
          <a href="#nosotros" aria-current={activeSection === 'nosotros' ? 'location' : undefined} onClick={closeMenu}>Nosotros</a>
          <a className="nav-mobile-contact" href="#contacto" onClick={closeMenu}>Hablemos de tu proyecto</a>
        </nav>
        <a className="button button-nav" href="#contacto">Hablemos</a>
      </div>
    </header>

    <main id="contenido" tabIndex={-1}>
      <section id="inicio" className="hero section-anchor">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true" />ESTUDIO DE INGENIERÍA DIGITAL · CHILE</p>
            <h1>Conecta tu operación. <span>Libera su potencial.</span></h1>
            <p className="hero-description">Diseñamos software, automatizamos procesos y aplicamos inteligencia artificial para conectar tus sistemas y transformar información en decisiones.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#soluciones">Explorar tecnología</a>
              <a className="button button-outline" href="#contacto">Diseñemos tu solución</a>
            </div>
            <p className="hero-note">Explora el laboratorio interactivo y prueba cómo se transforma un proceso.</p>
          </div>
          <HeroExperience />
        </div>
        <div className="container hero-footnote"><span>Diseñado alrededor de tu necesidad.</span><span>Desarrollo a medida <i /> Integraciones <i /> Evolución continua</span></div>
      </section>

      <section className="section section-solutions section-anchor" id="soluciones">
        <div className="container">
          <div className="section-heading">
            <div><p className="section-kicker">01 / CAPACIDADES</p><h2>Herramientas que trabajan.<br /><em>No solo interfaces.</em></h2></div>
            <p>Prueba cada tecnología con ejemplos funcionales: desde gestionar registros hasta conectar procesos y analizar información.</p>
          </div>
          <Capabilities />
          <div className="experience-invite">
            <div>
              <span className="section-kicker">MUVORY EXPERIENCE</span>
              <h3>Un recorrido por nuestros prototipos.</h3>
              <p>Explora cuatro prototipos guiados y descubre cómo se conectan software, automatización, IA y datos.</p>
            </div>
            <a className="button button-outline" href="/experience">Iniciar experiencia <Icon name="arrow" size={18}/></a>
          </div>
        </div>
      </section>

      <section className="section section-applications section-anchor" id="aplicaciones">
        <span id="casos" className="anchor-alias" aria-hidden="true" /><span id="sectores" className="anchor-alias" aria-hidden="true" />
        <div className="container">
          <div className="section-heading">
            <div><p className="section-kicker">02 / TECNOLOGÍA EN CONTEXTO</p><h2>Aplicaciones <em>por área.</em></h2></div>
            <p>La tecnología empieza con una necesidad concreta. Selecciona un área y recorre un proceso posible.</p>
          </div>
          <Applications />
        </div>
      </section>

      <section className="section section-agents section-anchor" id="agentes"><div className="container"><AIAssistantShowcase /></div></section>

      <section className="section section-about section-anchor" id="nosotros">
        <div className="container">
          <div className="about-intro">
            <div><p className="section-kicker">04 / INGENIERÍA Y MÉTODO</p><h2>Ingeniería centrada<br /><em>en tu operación.</em></h2></div>
            <div className="about-copy"><p>Partimos de las personas que usarán cada solución. Entendemos su contexto para diseñar y desarrollar herramientas claras, útiles y capaces de evolucionar.</p><p>Trabajamos con comunicación directa, alcance definido y decisiones con propósito. Cada proyecto merece una respuesta propia.</p></div>
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
            <p className="section-kicker">05 / INICIEMOS UN PROYECTO</p>
            <h2>Construyamos<br /><em>tu próxima solución.</em></h2>
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
