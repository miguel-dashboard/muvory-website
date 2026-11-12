import { useState } from 'react';

const services = [
  {
    number: '01',
    icon: 'layers',
    title: 'Software empresarial',
    description: 'Centraliza la información de tu empresa y reduce el desorden de los procesos manuales.',
    tag: 'Desarrollo a medida'
  },
  {
    number: '02',
    icon: 'chart',
    title: 'Dashboards y analítica',
    description: 'Transforma datos dispersos en una visión clara de ventas, clientes y operación.',
    tag: 'Datos y gestión'
  },
  {
    number: '03',
    icon: 'workflow',
    title: 'Automatización',
    description: 'Conecta herramientas y libera horas de trabajo manual con flujos más eficientes.',
    tag: 'Procesos conectados'
  },
  {
    number: '04',
    icon: 'globe',
    title: 'Web y plataformas',
    description: 'Convierte tu presencia digital en una puerta de entrada para nuevos clientes.',
    tag: 'Presencia digital'
  }
];

const agents = [
  { icon: 'message', title: 'Asistente comercial', description: 'Apoya la atención de consultas, captura prospectos y organiza seguimientos.' },
  { icon: 'spark', title: 'Agente de atención', description: 'Responde preguntas frecuentes a partir de información autorizada de tu empresa.' },
  { icon: 'chart', title: 'Analista de información', description: 'Ayuda a interpretar datos y detectar oportunidades de mejora.' }
];

const industries = [
  { label: 'Comercio y distribución', icon: 'store' },
  { label: 'Inmobiliarias', icon: 'building' },
  { label: 'Servicios profesionales', icon: 'briefcase' },
  { label: 'Logística y operaciones', icon: 'truck' }
];

function Icon({ name, size = 24, className = '' }) {
  const paths = {
    arrow: <><path d="M4 12h16" /><path d="m13 5 7 7-7 7" /></>,
    arrowUp: <><path d="m7 17 10-10" /><path d="M8 7h9v9" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></>,
    chart: <><path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20v-12" /></>,
    workflow: <><rect x="2" y="3" width="7" height="6" rx="1" /><rect x="15" y="15" width="7" height="6" rx="1" /><path d="M5.5 9v5a4 4 0 0 0 4 4H15" /><path d="M15 6h6" /><path d="m18 3 3 3-3 3" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18" /><path d="M12 3a15 15 0 0 0 0 18" /></>,
    message: <><path d="M20 11.5a8.5 8.5 0 0 1-8.5 8.5 9.1 9.1 0 0 1-4-.9L3 21l1.9-4.5A8.5 8.5 0 1 1 20 11.5Z" /><path d="M8 12h8" /><path d="M8 9h5" /></>,
    spark: <><path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2Z" /></>,
    store: <><path d="M3 10h18l-2-6H5l-2 6Z" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></>,
    building: <><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" /><path d="M10 21v-3h4v3" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12a22 22 0 0 0 18 0" /></>,
    truck: <><path d="M3 5h12v12H3z" /><path d="M15 9h4l3 4v4h-7" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    check: <><path d="m4 12 5 5L20 6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M5 5l14 14M19 5 5 19" /></>
  };
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.spark}</svg>;
}

function Brand({ footer = false }) {
  return (
    <a className={'brand' + (footer ? ' brand-footer' : '')} href="#inicio" aria-label="MUVORY Technologies, ir al inicio">
      <svg className="brand-mark" viewBox="0 0 50 50" fill="none" aria-hidden="true">
        <path d="M34 7.8A20 20 0 0 0 10 36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M16 42.2A20 20 0 0 0 40 14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="36.5" cy="8.5" r="4.4" stroke="currentColor" strokeWidth="3.6" fill="#071A25" />
        <circle cx="13.5" cy="41.5" r="4.4" stroke="currentColor" strokeWidth="3.6" fill="#071A25" />
        <circle cx="25" cy="25" r="6.2" stroke="currentColor" strokeWidth="3.6" />
      </svg>
      <span className="brand-type"><strong>MUVORY</strong><small>TECHNOLOGIES</small></span>
    </a>
  );
}

function OrbVisual() {
  const particles = Array.from({ length: 74 }, (_, i) => {
    const angle = i * 2.399963229728653;
    const distance = Math.sqrt((i + 0.5) / 74);
    return {
      x: 330 + Math.cos(angle) * (74 + distance * 145),
      y: 263 + Math.sin(angle) * (27 + distance * 106),
      r: i % 9 === 0 ? 1.5 : 0.8,
      opacity: 0.22 + ((i * 7) % 10) / 15
    };
  });
  return (
    <div className="orb-scene" aria-label="Ilustración abstracta de conexiones digitales e inteligencia artificial" role="img">
      <svg viewBox="0 0 660 540" className="orb-svg" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="orb-core" cx="33%" cy="25%" r="75%">
            <stop offset="0%" stopColor="#A4FFFF" stopOpacity=".46" />
            <stop offset="21%" stopColor="#2B91A0" stopOpacity=".46" />
            <stop offset="50%" stopColor="#0B394C" stopOpacity=".72" />
            <stop offset="81%" stopColor="#011721" stopOpacity=".95" />
            <stop offset="100%" stopColor="#65DFDA" stopOpacity=".58" />
          </radialGradient>
          <radialGradient id="orb-halo">
            <stop offset="0%" stopColor="#2CE2DD" stopOpacity=".38" />
            <stop offset="100%" stopColor="#2CE2DD" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="orb-wave" x1="45" y1="255" x2="610" y2="255" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#52DADE" stopOpacity="0"/>
            <stop offset="32%" stopColor="#67E7E7" stopOpacity=".48"/>
            <stop offset="58%" stopColor="#D4FFFF" stopOpacity=".96"/>
            <stop offset="86%" stopColor="#65DBE6" stopOpacity=".64"/>
            <stop offset="100%" stopColor="#55D5DF" stopOpacity="0"/>
          </linearGradient>
          <filter id="orb-soft-glow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="12"/>
          </filter>
        </defs>
        <ellipse cx="350" cy="288" rx="246" ry="205" fill="url(#orb-halo)"/>
        <ellipse cx="346" cy="458" rx="176" ry="12" fill="#48C7CD" opacity=".20" filter="url(#orb-soft-glow)"/>
        <circle cx="348" cy="252" r="174" fill="url(#orb-core)" stroke="#8DEBEA" strokeOpacity=".41" strokeWidth="1.4"/>
        <ellipse cx="342" cy="254" rx="175" ry="173" stroke="#A9F0EE" strokeOpacity=".30" strokeWidth="1" fill="none"/>
        <ellipse cx="348" cy="252" rx="88" ry="174" stroke="#9FE5E3" strokeOpacity=".22" fill="none" transform="rotate(24 348 252)"/>
        <ellipse cx="348" cy="252" rx="162" ry="55" stroke="#9FE5E3" strokeOpacity=".22" fill="none" transform="rotate(-19 348 252)"/>
        <path d="M55 292 C168 378 219 182 311 268 S468 311 606 181" stroke="url(#orb-wave)" strokeWidth="26" strokeOpacity=".20" strokeLinecap="round" fill="none" filter="url(#orb-soft-glow)"/>
        <path d="M55 292 C168 378 219 182 311 268 S468 311 606 181" stroke="url(#orb-wave)" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <path d="M58 333 C204 389 217 185 345 258 S494 303 629 228" stroke="#8BF2EF" strokeOpacity=".50" strokeWidth="1.25" fill="none"/>
        <path d="M97 365 C252 374 247 189 358 269 S504 326 611 244" stroke="#66CBD7" strokeOpacity=".34" strokeWidth="1" fill="none"/>
        <ellipse cx="346" cy="275" rx="267" ry="100" transform="rotate(-22 346 275)" stroke="#89E8EA" strokeOpacity=".42" strokeWidth="1.8" fill="none" strokeDasharray="600 850"/>
        <ellipse cx="346" cy="275" rx="266" ry="98" transform="rotate(-22 346 275)" stroke="#86E8E6" strokeOpacity=".12" fill="none"/>
        {particles.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={p.r} fill="#A5FFFF" opacity={p.opacity}/>)}
        <circle cx="348" cy="252" r="176" stroke="#B6FCF7" strokeOpacity=".13" strokeWidth="5" fill="none" filter="url(#orb-soft-glow)"/>
      </svg>
      <span className="orb-lightline" aria-hidden="true" />
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  async function handleSubmit(event) {
    event.preventDefault();
    if (!endpoint) {
      setStatus('unconfigured');
      setMessage('El formulario está en preparación. Antes de publicar conectaremos un destino real para recibir solicitudes.');
      return;
    }
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    setMessage('Enviando tu solicitud…');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('No se pudo enviar');
      form.reset();
      setStatus('success');
      setMessage('Tu solicitud fue enviada. Nos pondremos en contacto contigo.');
    } catch {
      setStatus('error');
      setMessage('No se pudo enviar tu solicitud. Intenta nuevamente más tarde.');
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Tu nombre <input name="nombre" type="text" placeholder="Nombre y apellido" autoComplete="name" required maxLength="120" /></label>
        <label>Correo de contacto <input name="email" type="email" placeholder="nombre@empresa.cl" autoComplete="email" required maxLength="200" /></label>
      </div>
      <label>¿En qué necesitas ayuda?
        <select name="servicio" defaultValue="" required>
          <option value="" disabled>Selecciona una solución</option>
          <option>Software empresarial</option>
          <option>Dashboard y analítica</option>
          <option>Automatización de procesos</option>
          <option>Agentes de inteligencia artificial</option>
          <option>Desarrollo web</option>
          <option>Necesito orientación</option>
        </select>
      </label>
      <label>Cuéntanos sobre tu negocio
        <textarea name="mensaje" placeholder="¿Qué problema buscas resolver?" rows="4" minLength="10" maxLength="3000" required />
      </label>
      <label className="consent"><input type="checkbox" name="consentimiento" value="si" required /><span>Autorizo el uso de estos datos únicamente para responder mi solicitud comercial.</span></label>
      <button className="button button-primary button-full" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Enviar solicitud'} <Icon name="arrowUp" size={18}/></button>
      <p className="form-note" role="status" aria-live="polite">{message || (!endpoint ? 'Vista preliminar: la recepción de mensajes se habilitará antes de publicar.' : 'Te responderemos por el correo que indiques.')}</p>
    </form>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-header">
        <div className="container nav-wrap">
          <Brand />
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(value => !value)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
          <nav id="main-navigation" className={'nav' + (menuOpen ? ' nav-open' : '')} aria-label="Navegación principal">
            <a href="#inicio" onClick={closeMenu}>Inicio</a>
            <a href="#soluciones" onClick={closeMenu}>Soluciones</a>
            <a href="#agentes" onClick={closeMenu}>Agentes IA</a>
            <a href="#sectores" onClick={closeMenu}>Sectores</a>
            <a href="#nosotros" onClick={closeMenu}>Nosotros</a>
            <a className="nav-mobile-contact" href="#contacto" onClick={closeMenu}>Contacto</a>
          </nav>
          <a className="button button-nav" href="#contacto">Hablemos <Icon name="arrowUp" size={16}/></a>
        </div>
      </header>

      <main id="contenido">
        <section id="inicio" className="hero hero-v3 section-anchor">
          <div className="hero-glow" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> SOFTWARE · AUTOMATIZACIÓN · AGENTES IA</div>
              <h1>Tecnología que impulsa <span>la eficiencia de tu negocio.</span></h1>
              <p className="hero-description">Creamos software, dashboards y automatizaciones inteligentes para que tu empresa trabaje con más control, menos tareas manuales y mejores decisiones.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contacto">Conversemos sobre tu proyecto <Icon name="arrowUp" size={18}/></a>
                <a className="button button-outline" href="#soluciones">Explorar soluciones <Icon name="arrow" size={18}/></a>
              </div>
            </div>
            <OrbVisual />
          </div>
        </section>

        <section className="section section-solutions section-anchor" id="soluciones">
          <div className="container">
            <div className="section-heading">
              <div><p className="section-kicker">QUÉ HACEMOS</p><h2>Soluciones digitales <em>de alto impacto.</em></h2></div>
              <p>Desde una necesidad puntual hasta una solución digital integral. Diseñamos cada proyecto según los desafíos de tu negocio.</p>
            </div>
            <div className="services-grid">
              {services.map(item => (
                <article className="service-card" key={item.number}>
                  <div className="card-top"><div className="service-icon"><Icon name={item.icon} size={28}/></div><span>{item.number}</span></div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="service-tag">{item.tag}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-cases section-anchor" id="casos">
          <div className="container">
            <div className="cases-head">
              <div><p className="section-kicker">TECNOLOGÍA APLICADA</p><h2>Tecnología aplicada <em>a desafíos reales.</em></h2></div>
              <p>Ejemplos de lo que podemos diseñar para tu empresa. Cada implementación se define según el alcance y la viabilidad técnica.</p>
            </div>
            <div className="cases-grid">
              <article className="case-card"><span className="case-counter">01 / COMERCIO</span><Icon name="store" size={29}/><h3>Control comercial</h3><p>Ventas, productos, inventario y clientes organizados en un solo sistema.</p><span className="case-footer">Software + dashboards <Icon name="arrowUp" size={16}/></span></article>
              <article className="case-card"><span className="case-counter">02 / INMOBILIARIAS</span><Icon name="building" size={29}/><h3>Prospectos conectados</h3><p>Captación de interesados, seguimiento comercial y automatizaciones de respuesta.</p><span className="case-footer">Web + CRM + IA <Icon name="arrowUp" size={16}/></span></article>
              <article className="case-card"><span className="case-counter">03 / SERVICIOS</span><Icon name="briefcase" size={29}/><h3>Menos tareas repetitivas</h3><p>Procesos internos, solicitudes y documentos con flujos más claros y eficientes.</p><span className="case-footer">Automatización + agentes IA <Icon name="arrowUp" size={16}/></span></article>
            </div>
            <p className="cases-disclaimer">Aplicaciones ilustrativas. No representan clientes ni proyectos terminados.</p>
          </div>
        </section>

        <section className="section section-agents section-anchor" id="agentes">
          <div className="container agents-layout">
            <div className="agents-intro">
              <p className="section-kicker">INTELIGENCIA ARTIFICIAL APLICADA</p>
              <h2>Agentes de IA <em>para tu empresa.</em></h2>
              <p>Exploramos, diseñamos e implementamos asistentes conectados a los procesos y la información autorizada de cada empresa, con supervisión humana cuando corresponde.</p>
              <a className="text-link" href="#contacto">Cuéntanos qué necesitas automatizar <Icon name="arrow" size={18}/></a>
            </div>
            <div className="agents-list">
              {agents.map((item, index) => (
                <article className="agent-item" key={item.title}>
                  <div className="agent-icon"><Icon name={item.icon}/></div>
                  <div><small>APLICACIÓN {String(index + 1).padStart(2, '0')}</small><h3>{item.title}</h3><p>{item.description}</p></div>
                  <Icon name="arrowUp" size={18} className="agent-arrow"/>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-sectors section-anchor" id="sectores">
          <div className="container">
            <div className="section-heading">
              <div><p className="section-kicker">DONDE GENERAMOS VALOR</p><h2>La tecnología se adapta <em>a tu industria.</em></h2></div>
              <p>Cada empresa tiene desafíos distintos. Por eso partimos entendiendo el negocio, no imponiendo una herramienta.</p>
            </div>
            <div className="sectors-grid">{industries.map(item => <div className="sector" key={item.label}><Icon name={item.icon} size={25}/><span>{item.label}</span><Icon name="arrowUp" size={16}/></div>)}</div>
          </div>
        </section>

        <section className="section section-approach section-anchor" id="nosotros">
          <div className="container approach-layout">
            <div>
              <p className="section-kicker">NUESTRA FORMA DE TRABAJAR</p>
              <h2>Primero entendemos el problema. <em>Después creamos la solución.</em></h2>
            </div>
            <div className="steps">
              {[['01','Conversamos','Identificamos el desafío, las prioridades y el resultado que buscas.'],['02','Diseñamos','Proponemos un alcance claro, entregables y una solución viable.'],['03','Construimos','Desarrollamos, validamos y acompañamos la puesta en marcha.']].map(([num,title,desc]) => <div className="step" key={num}><span>{num}</span><div><h3>{title}</h3><p>{desc}</p></div></div>)}
            </div>
          </div>
        </section>

        <section className="section section-contact section-anchor" id="contacto">
          <div className="container contact-layout">
            <div className="contact-copy">
              <p className="section-kicker">HABLEMOS</p>
              <h2>Tu próximo paso digital <em>comienza con una conversación.</em></h2>
              <p>Cuéntanos qué quieres mejorar en tu empresa. Revisaremos tu necesidad y te ayudaremos a identificar un primer paso concreto.</p>
              <div className="contact-promise"><Icon name="check" size={19}/> Conversación inicial sin compromiso</div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main"><Brand footer/><p>Diseñamos tecnología para resolver desafíos reales de negocio.</p><a href="#inicio">Volver arriba ↑</a></div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} MUVORY Technologies. Nombre comercial sujeto a validación.</span><span>Software · Automatización · IA</span></div>
      </footer>
    </>
  );
}

export default App;
