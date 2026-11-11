import { useState } from 'react';

const services = [
  {
    number: '01',
    icon: 'layers',
    title: 'Software empresarial',
    description: 'Sistemas a medida para organizar operaciones, clientes, productos y procesos en un mismo lugar.',
    tag: 'Desarrollo a medida'
  },
  {
    number: '02',
    icon: 'chart',
    title: 'Dashboards y analítica',
    description: 'Información ordenada, indicadores útiles y visibilidad para decidir con mayor claridad.',
    tag: 'Datos y gestión'
  },
  {
    number: '03',
    icon: 'workflow',
    title: 'Automatización',
    description: 'Integramos herramientas y automatizamos tareas repetitivas para liberar tiempo de tu equipo.',
    tag: 'Procesos conectados'
  },
  {
    number: '04',
    icon: 'globe',
    title: 'Web y plataformas',
    description: 'Experiencias digitales profesionales para presentar tus servicios y conectar con clientes.',
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

function RobotIllustration() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="halo halo-one" />
      <div className="halo halo-two" />
      <svg className="robot-svg" viewBox="0 0 520 570" fill="none">
        <defs>
          <linearGradient id="headSurface" x1="140" y1="90" x2="395" y2="375" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D8E6ED" /><stop offset=".48" stopColor="#8299A9" /><stop offset="1" stopColor="#324F62" />
          </linearGradient>
          <linearGradient id="bodySurface" x1="146" y1="363" x2="408" y2="546" gradientUnits="userSpaceOnUse">
            <stop stopColor="#92AFBD" /><stop offset="1" stopColor="#1A4152" />
          </linearGradient>
          <linearGradient id="face" x1="174" y1="156" x2="360" y2="320" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0A2733" /><stop offset="1" stopColor="#020E18" />
          </linearGradient>
          <filter id="eyeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="7" result="blur" /><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <ellipse cx="268" cy="533" rx="171" ry="18" fill="#0CB4BD" opacity=".12"/>
        <path d="M166 405c18-29 48-46 95-48 47-2 86 13 111 48 23 31 33 76 39 126H112c5-48 25-93 54-126Z" fill="url(#bodySurface)" stroke="#6994A6" strokeWidth="2"/>
        <path d="M157 466h214" stroke="#D3E6EC" opacity=".14" strokeWidth="2"/>
        <path d="M233 355h68v43c0 22-68 22-68 0v-43Z" fill="#1B3749" stroke="#719AAB" strokeWidth="2"/>
        <rect x="121" y="86" width="286" height="292" rx="135" fill="url(#headSurface)" stroke="#D3E7F0" strokeOpacity=".68" strokeWidth="2.5"/>
        <path d="M147 211c0-68 46-105 119-105 77 0 119 43 119 105v50c0 63-52 99-118 99-70 0-120-41-120-99v-50Z" fill="url(#face)" stroke="#356173" strokeWidth="5"/>
        <path d="M161 193c17-47 53-68 107-68 55 0 91 20 104 68" stroke="#74E2E3" strokeOpacity=".17" strokeWidth="3"/>
        <path d="M199 254c11-14 29-14 40 0M292 254c11-14 29-14 40 0" stroke="#7FF4EA" strokeWidth="8" strokeLinecap="round" filter="url(#eyeGlow)"/>
        <path d="M248 299c12 8 26 8 39 0" stroke="#78E8E3" strokeWidth="4" strokeLinecap="round" opacity=".75"/>
        <rect x="105" y="202" width="38" height="78" rx="19" fill="#244A60" stroke="#B4CDD7" strokeWidth="3"/>
        <rect x="386" y="202" width="38" height="78" rx="19" fill="#244A60" stroke="#B4CDD7" strokeWidth="3"/>
        <circle cx="124" cy="241" r="11" stroke="#69DBD9" strokeWidth="4" opacity=".85"/>
        <circle cx="405" cy="241" r="11" stroke="#69DBD9" strokeWidth="4" opacity=".85"/>
        <circle cx="267" cy="443" r="18" stroke="#7CE5DC" strokeWidth="3" opacity=".6"/>
        <circle cx="267" cy="443" r="7" fill="#7CE5DC" opacity=".65"/>
      </svg>
      <span className="art-orbit orbit-first" />
      <span className="art-orbit orbit-second" />
      <div className="art-label"><span className="status-dot" /> Inteligencia aplicada</div>
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
        <section id="inicio" className="hero section-anchor">
          <div className="hero-glow" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> SOFTWARE · AUTOMATIZACIÓN · IA</div>
              <h1>Tecnología que <span>impulsa negocios.</span></h1>
              <p className="hero-description">Creamos soluciones digitales que simplifican procesos, conectan información y abren nuevas oportunidades para tu empresa.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contacto">Conversemos sobre tu proyecto <Icon name="arrowUp" size={18}/></a>
                <a className="button button-outline" href="#soluciones">Explorar soluciones <Icon name="arrow" size={18}/></a>
              </div>
              <div className="hero-caption"><span className="mini-line" /> Soluciones pensadas para problemas reales.</div>
            </div>
            <RobotIllustration />
          </div>
          <div className="container hero-bottom"><span>DESARROLLO A MEDIDA</span><span>DATOS Y ANALÍTICA</span><span>AUTOMATIZACIÓN INTELIGENTE</span></div>
        </section>

        <section className="section section-solutions section-anchor" id="soluciones">
          <div className="container">
            <div className="section-heading">
              <div><p className="section-kicker">QUÉ HACEMOS</p><h2>Soluciones para que tu empresa <em>avance.</em></h2></div>
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

        <section className="section section-agents section-anchor" id="agentes">
          <div className="container agents-layout">
            <div className="agents-intro">
              <p className="section-kicker">INTELIGENCIA ARTIFICIAL APLICADA</p>
              <h2>Agentes de IA para tareas que <em>no deberían frenarte.</em></h2>
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
