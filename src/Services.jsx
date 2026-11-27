import { useEffect, useState } from 'react';
import Brand from './Brand.jsx';
import Icon from './Icon.jsx';
import { services, getService } from './services-data.js';
import ServiceVisual, { StudioPreview } from './ServiceVisual.jsx';
import './services.css';
import './services-premium.css';

function ServiceHeader(){
  const [open,setOpen] = useState(false);
  return <header className="sv-header">
    <div className="sv-shell sv-header-inner">
      <Brand href="/"/>
      <button type="button" className="sv-menu-toggle" aria-expanded={open} aria-controls="sv-main-nav" onClick={()=>setOpen(value=>!value)}><Icon name={open?'close':'menu'} size={21}/><span>Menú</span></button>
      <nav id="sv-main-nav" className={open?'sv-nav sv-nav-open':'sv-nav'} aria-label="Navegación de servicios">
        <a href="/" onClick={()=>setOpen(false)}>Inicio</a>
        <a href="/servicios" onClick={()=>setOpen(false)}>Servicios</a>
        <a href="/experience" onClick={()=>setOpen(false)}>Experiencia</a>
        <a href="/#nosotros" onClick={()=>setOpen(false)}>Nosotros</a>
      </nav>
      <a className="sv-header-cta" href="/#contacto">Hablemos <Icon name="arrowUp" size={16}/></a>
    </div>
  </header>;
}
function ServiceCard({service}){
  return <article className="sv-showcase-row">
    <div className="sv-showcase-copy">
      <span className="sv-showcase-index">{service.index} / 05 · {service.eyebrow}</span>
      <h3>{service.name}</h3>
      <p>{service.lead}</p>
      <a href={'/servicios/'+service.slug} className="sv-showcase-action">Descubrir esta solución <Icon name="arrow" size={18}/></a>
    </div>
    <a href={'/servicios/'+service.slug} className="sv-showcase-media" aria-label={'Conocer '+service.name}>
      <ServiceVisual service={service}/>
    </a>
  </article>;
}

function InteractivePreview({service}){
  const [step,setStep]=useState(0);
  useEffect(()=>{setStep(0);},[service.slug]);
  const colors=['#86e5dc','#65d1e1','#a7c3f4'];
  return <div className="sv-preview">
    <div className="sv-preview-top"><span className="sv-preview-lights" aria-hidden="true"><i/><i/><i/></span><span>{service.name} / Laboratorio</span><span>DEMO ILUSTRATIVA</span></div>
    <div className="sv-preview-inside">
      <div className="sv-preview-head"><span>PROCESO DE EJEMPLO</span><strong>{service.walkthrough[step].title}</strong><p>{service.walkthrough[step].body}</p></div>
      <div className={'sv-preview-visual sv-preview-'+service.slug}>
        {service.slug==='inteligencia-artificial' ? <div className="sv-preview-ai"><img src="/muvory-ai-assistant.avif" alt="Robot ilustrativo de inteligencia artificial de MUVORY" width="260" height="208" loading="lazy"/><div className="sv-preview-ai-text"><small>ASISTENTE · DEMOSTRACIÓN</small><strong>{step===0?'Definimos un caso de uso':step===1?'Establecemos fuentes y límites':'Evaluamos respuestas'}</strong><span>La IA ayuda a organizar la información; una persona valida el resultado.</span></div></div> :
        service.slug==='datos' ? <div className="sv-preview-chart">
          {[38,55,43,71,59,86].map((height,i)=><div key={i}><span style={{height:(Math.max(8,height-(step===0?12:step===1?5:0)))+'%'}}/><small>{String(i+1).padStart(2,'0')}</small></div>)}
        </div> :
        service.slug==='plataformas' ? <div className="sv-preview-web"><div className="sv-preview-browser"><span className="sv-web-toolbar"><i/><i/><i/></span><div className="sv-web-hero"><span>Tu nueva experiencia</span><strong>Diseñada para avanzar.</strong><small>Interactiva. Clara. Adaptable.</small></div><div className="sv-web-columns"><i/><i/><i/></div></div></div> :
        service.slug==='automatizacion' ? <div className="sv-preview-process">
          {['Solicitud','Validación','Registro'].map((name,i)=><div key={name} className={i<=step?'sv-process-active':''}><span>{i<step?<Icon name="check" size={16}/>:i+1}</span><strong>{name}</strong></div>)}
        </div> :
        <div className="sv-preview-software"><div className="sv-preview-sidebar"><span/><span/><span/><span/></div><div className="sv-preview-records">
          <strong>Panel de gestión</strong>
          {['Solicitud registrada','Tarea asignada','Seguimiento actualizado'].map((row,i)=><div className={i===step?'sv-record-active':''} key={row}><span><Icon name="layers" size={16}/>{row}</span><small>{i<=step?'Activo':'Pendiente'}</small></div>)}
        </div></div>}
      </div>
      <div className="sv-preview-controls">
        <div className="sv-preview-progress">{service.walkthrough.map((part,index)=><button type="button" key={part.title} aria-label={'Mostrar etapa '+(index+1)} aria-pressed={step===index} onClick={()=>setStep(index)}><span style={{background:step===index?colors[index]:undefined}}/></button>)}</div>
        <button type="button" onClick={()=>setStep((step+1)%service.walkthrough.length)}>{step===2?'Reiniciar':'Siguiente etapa'} <Icon name="arrow" size={16}/></button>
      </div>
      <p className="sv-preview-disclaimer">Visualización interactiva y simulada. No contiene datos de clientes ni conexiones activas.</p>
    </div>
  </div>;
}
function ServicesHome(){
  useEffect(()=>{document.title='Servicios tecnológicos a medida | MUVORY Technologies';},[]);
  return <div className="sv-site">
    <a className="skip-link" href="#sv-content">Saltar al contenido</a>
    <ServiceHeader/>
    <main id="sv-content">
      <section className="sv-hero sv-hero-index">
        <div className="sv-shell sv-index-hero-layout">
          <div className="sv-index-copy"><span className="sv-kicker"><span/>MUVORY / SERVICIOS</span><h1>Tecnología diseñada <em>para resolver.</em></h1><p>Software, automatización e IA para convertir necesidades concretas en herramientas útiles. Explora cada especialidad y descubre qué podríamos construir.</p>
          <div className="sv-hero-actions"><a className="sv-primary" href="#explorar">Explorar servicios <Icon name="arrow" size={18}/></a><a className="sv-secondary" href="/#contacto">Cuéntanos tu idea <Icon name="arrowUp" size={17}/></a></div>
          </div>
          <StudioPreview/>
        </div>
        <div className="sv-shell sv-hero-bottom"><span>DISEÑAMOS · DESARROLLAMOS · CONECTAMOS</span><span>01 — 05 / ÁREAS DE ESPECIALIDAD</span></div>
      </section>
      <section className="sv-services-section" id="explorar"><div className="sv-shell">
        <div className="sv-section-heading"><div><span className="sv-kicker">EXPLORA UNA POSIBILIDAD</span><h2>Soluciones con <em>un propósito claro.</em></h2></div><p>Entra en cada área para descubrir su enfoque, recorrer un ejemplo y comenzar tu proyecto.</p></div>
        <div className="sv-showcase">{services.map(service=><ServiceCard key={service.slug} service={service}/>)}</div>
      </div></section>
      <section className="sv-final-cta"><div className="sv-shell"><span className="sv-kicker">PROYECTOS CON IDENTIDAD PROPIA</span><h2>¿No encuentras exactamente lo que imaginas?</h2><p>Podemos explorar tu idea desde cero. Lo importante es entender el problema antes de elegir una tecnología.</p><a className="sv-primary" href="/#contacto">Hablemos de tu desafío <Icon name="arrow" size={17}/></a></div></section>
    </main>
    <ServiceFooter/>
  </div>;
}
function ServiceDetail({service}){
  useEffect(()=>{document.title=service.name+' | MUVORY Technologies';},[service.slug]);
  return <div className="sv-site">
    <ServiceHeader/>
    <main id="sv-content">
      <section className="sv-hero sv-detail-hero"><div className="sv-shell">
        <a className="sv-back" href="/servicios"><Icon name="arrow" size={17}/> Todos los servicios</a>
        <div className="sv-detail-hero-grid">
          <div><span className="sv-kicker">{service.index} / {service.eyebrow}</span><h1>{service.title}</h1><p>{service.lead}</p><div className="sv-hero-actions"><a href="/#contacto" className="sv-primary">Cuéntanos tu proyecto <Icon name="arrow" size={18}/></a><a href="#laboratorio" className="sv-secondary">Ver ejemplo <Icon name="arrow" size={17}/></a></div></div>
          <div className="sv-detail-art"><ServiceVisual service={service}/></div>
        </div>
      </div></section>
      <section className="sv-detail-context"><div className="sv-shell sv-context-grid">
        <div><span className="sv-kicker">EL PUNTO DE PARTIDA</span><h2>Entender antes de construir.</h2><p>{service.problem}</p></div>
        <div><span className="sv-kicker">NUESTRO ENFOQUE</span><h2>Una solución con dirección.</h2><p>{service.approach}</p></div>
      </div></section>
      <section id="laboratorio" className="sv-lab"><div className="sv-shell">
        <div className="sv-section-heading"><div><span className="sv-kicker">RECORRIDO INTERACTIVO</span><h2>Explora <em>cómo podría funcionar.</em></h2></div><p>Selecciona cada etapa para recorrer un ejemplo. Es una demostración visual, no un proyecto de cliente.</p></div>
        <div className="sv-lab-grid"><div className="sv-lab-description"><h3>{service.name}</h3><p>De la idea a la implementación: descubre el tipo de decisiones que podríamos tomar para construir tu solución.</p>
          <div className="sv-feature-list">{service.features.map((feature,index)=><div key={feature}><span>0{index+1}</span><strong>{feature}</strong><Icon name="check" size={18}/></div>)}</div>
          <a className="sv-secondary" href={'/experience#'+service.demo}>Explorar MUVORY Experience <Icon name="arrow" size={17}/></a>
        </div><InteractivePreview service={service}/></div>
      </div></section>
      <section className="sv-next-services"><div className="sv-shell"><span className="sv-kicker">CONTINÚA EXPLORANDO</span><h2>Otras posibilidades para tu proyecto.</h2><div>{services.filter(item=>item.slug!==service.slug).slice(0,3).map(item=><a href={'/servicios/'+item.slug} key={item.slug}><Icon name={item.icon} size={20}/><span>{item.name}</span><Icon name="arrowUp" size={16}/></a>)}</div></div></section>
      <section className="sv-final-cta"><div className="sv-shell"><span className="sv-kicker">DEMO ILUSTRATIVA · SOLUCIÓN REAL A DEFINIR</span><h2>El siguiente paso empieza con una conversación.</h2><p>Cuéntanos qué necesitas. Revisaremos el contexto, el alcance y una posible ruta de trabajo.</p><a className="sv-primary" href="/#contacto">Conversar con MUVORY <Icon name="arrow" size={17}/></a></div></section>
    </main>
    <ServiceFooter/>
  </div>;
}
function ServiceFooter(){
  return <footer className="sv-footer"><div className="sv-shell"><Brand footer href="/"/><p>Software · Automatización · IA · Experiencias digitales</p><a href="mailto:contacto@muvory.cl">contacto@muvory.cl</a><span>© {new Date().getFullYear()} MUVORY Technologies</span></div></footer>;
}
export default function Services({slug}){
  const service=slug?getService(slug):null;
  useEffect(()=>{window.scrollTo(0,0);},[slug]);
  if(slug&&!service)return <div className="sv-site"><a className="skip-link" href="#sv-content">Saltar al contenido</a><ServiceHeader/><main id="sv-content" className="sv-not-found sv-shell"><span className="sv-kicker">PÁGINA NO ENCONTRADA</span><h1>Este servicio no está disponible.</h1><a className="sv-primary" href="/servicios">Ver todos los servicios <Icon name="arrow" size={18}/></a></main><ServiceFooter/></div>;
  return service?<ServiceDetail key={service.slug} service={service}/>:<ServicesHome/>;
}
