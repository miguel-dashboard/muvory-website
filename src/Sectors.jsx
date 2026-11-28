import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { ServiceHeader, ServiceFooter } from './Services.jsx';
import { sectors, getSector } from './sectors-data.js';
import './sectors.css';

export function GroundedSectorTeaser({compact=false}){
  return <div className={compact?'field-teaser field-teaser-compact':'field-teaser'}>
    <div className="field-teaser-heading">
      <span>CONOCIMIENTO DE PRIMERA MANO</span>
      <h3>Entendemos los problemas porque <em>conocemos la operación.</em></h3>
      <p>Hay decisiones que no se aprenden mirando un dashboard. Las aprendemos entre expedientes, rutas de reparto y reposición de mercadería.</p>
      <a href="/sectores" className="field-plain-link">Conoce nuestra mirada <Icon name="arrow" size={17}/></a>
    </div>
    <div className="field-teaser-list">
      {sectors.map((item)=><a className={'field-teaser-item field-'+item.slug} href={'/sectores/'+item.slug} key={item.slug}>
        <div className="field-teaser-image"><img src={item.photo} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer"/><span>FOTO REFERENCIAL</span></div>
        <div className="field-teaser-text"><small>{item.number} / EXPERIENCIA OPERATIVA</small><strong>{item.short}</strong><span>{item.focus[0]}</span></div><Icon name="arrowUp" size={21}/>
      </a>)}
    </div>
  </div>;
}

function SectorPhoto({sector,kind='hero'}){
  return <figure className={'sector-photo sector-photo-'+kind}>
    <img src={sector.photo} alt={sector.photoAlt} fetchPriority={kind==='hero'?'high':undefined} loading={kind==='hero'?'eager':'lazy'} decoding="async" referrerPolicy="no-referrer"/>
    <figcaption><span>Imagen referencial · No representa clientes ni operaciones de MUVORY</span><a target="_blank" rel="noopener noreferrer" href={sector.photoUrl}>{sector.photoCredit}</a></figcaption>
  </figure>;
}

function SectorDemo({sector}){
  const [active,setActive]=useState(0);
  const [resolved,setResolved]=useState(false);
  useEffect(()=>{setActive(0);setResolved(false);},[sector.slug]);
  const step=sector.demoItems[active];
  return <div className="sector-demo">
    <div className="sector-demo-top"><span>MUVORY / SISTEMA CONCEPTUAL</span><span className="sector-demo-badge">DEMO · SIN DATOS REALES</span></div>
    <div className="sector-demo-inside">
      <p className="sector-demo-small">EJEMPLO DE GESTIÓN</p>
      <h3>{sector.demoTitle}</h3>
      <div className="sector-demo-steps">
        {sector.demoItems.map((item,index)=><button type="button" key={item} aria-pressed={index===active} onClick={()=>{setActive(index);setResolved(false)}}>
          <span>0{index+1}</span><strong>{item}</strong><Icon name={index===active?'arrow':'check'} size={15}/>
        </button>)}
      </div>
      <div className="sector-demo-result" aria-live="polite">
        <div className="sector-demo-state"><span className={resolved?'done':''}/>{resolved?'Etapa revisada':'Pendiente de revisar'}</div>
        <strong>{step}</strong>
        <p>{resolved?'El registro de ejemplo cambió de estado. En un sistema real habría responsables, historial y permisos configurados.':'Selecciona una etapa y simula su revisión. El recorrido muestra una posibilidad de software, no una operación conectada.'}</p>
        <button type="button" onClick={()=>setResolved(v=>!v)}>{resolved?'Marcar pendiente':'Marcar revisado'} <Icon name="check" size={16}/></button>
      </div>
      <p className="sector-demo-note">Interacción local con información ficticia. No guarda datos ni sustituye procesos profesionales.</p>
    </div>
  </div>;
}

function SectorHub(){
  useEffect(()=>{document.title='Sectores que conocemos | MUVORY Technologies';window.scrollTo(0,0);},[]);
  return <div className="sv-site sector-hub">
    <a className="skip-link" href="#sector-content">Saltar al contenido</a><ServiceHeader/>
    <main id="sector-content">
      <section className="sector-hub-hero">
        <div className="sv-shell">
          <div className="sector-hub-eyebrow">TECNOLOGÍA DESDE LA OPERACIÓN · MUVORY</div>
          <h1>No partimos del software.<br/><em>Partimos del problema real.</em></h1>
          <p>En tres mundos que conocemos de cerca —la gestión jurídica, el transporte y el comercio de barrio— sabemos que los detalles operativos hacen la diferencia. Por eso primero escuchamos qué falla y después diseñamos la tecnología.</p>
          <a href="#areas" className="sector-hub-cta">Conoce las tres áreas <Icon name="arrow" size={17}/></a>
          <div className="sector-hub-small">NUESTRO ENFOQUE NO SE LIMITA A ESTOS SECTORES</div>
        </div>
      </section>
      <section className="sector-hub-index" id="areas"><div className="sv-shell">
        <div className="sector-hub-section-title"><span>01—03 / DESDE ADENTRO</span><h2>Tres realidades. Tres formas distintas de trabajar.</h2></div>
        {sectors.map(sector=><article className={'sector-hub-row sector-hub-row-'+sector.slug} key={sector.slug}>
          <SectorPhoto sector={sector} kind="tile"/>
          <div className="sector-hub-row-content"><small>{sector.number} / {sector.tag}</small><h3>{sector.short}</h3><p>{sector.insight}</p>
            <a href={'/sectores/'+sector.slug}>Descubre las soluciones <Icon name="arrow" size={18}/></a>
          </div>
        </article>)}
      </div></section>
      <section className="sector-hub-else"><div className="sv-shell"><span>NO NOS LIMITAMOS A TRES INDUSTRIAS</span><h2>¿Tu desafío es diferente? Hablemos de él.</h2><p>El conocimiento práctico nos orienta. Las herramientas tecnológicas pueden adaptarse a muchas otras actividades.</p><a href="/servicios">Explorar todos los servicios <Icon name="arrow" size={18}/></a></div></section>
    </main><ServiceFooter/>
  </div>;
}

function SectorDetail({sector}){
  useEffect(()=>{document.title=sector.short+' | MUVORY Technologies';window.scrollTo(0,0);},[sector.slug]);
  return <div className={'sv-site sector-detail sector-tone-'+sector.slug}>
    <a className="skip-link" href="#sector-content">Saltar al contenido</a><ServiceHeader/>
    <main id="sector-content">
      <section className="sector-detail-hero">
        <div className="sv-shell">
          <a className="sector-back" href="/sectores"><Icon name="arrow" size={16}/> Todos los sectores</a>
          <div className="sector-detail-layout">
            <div className="sector-detail-copy">
              <span className="sector-detail-kicker">{sector.number} / {sector.tag}</span>
              <h1>{sector.title}</h1>
              <p>{sector.summary}</p>
              <div className="sector-detail-actions">
                <a className="sector-button-main" href="#situaciones">Ver los problemas que resolvemos <Icon name="arrow" size={17}/></a>
                <a className="sector-button-alt" href="/#contacto">Conversemos <Icon name="arrowUp" size={16}/></a>
              </div>
            </div>
            <SectorPhoto sector={sector}/>
          </div>
        </div>
      </section>
      <section id="situaciones" className="sector-friction"><div className="sv-shell">
        <div className="sector-friction-head"><div><span className="sector-section-tag">LO QUE CONOCEMOS EN LA PRÁCTICA</span><h2>El problema suele estar <em>antes del resultado.</em></h2></div><p>{sector.insight}</p></div>
        <div className="sector-friction-grid"><div className="sector-friction-list"><span className="sector-friction-label">DÓNDE SE PIERDE EL CONTROL</span>
          {sector.focus.map((str,i)=><div key={str}><small>0{i+1}</small><p>{str}</p></div>)}
        </div><div className="sector-solution-list"><span className="sector-friction-label">QUÉ PODEMOS CONSTRUIR</span>
          {sector.solutions.map((str,i)=><div key={str}><Icon name="check" size={18}/><p>{str}</p></div>)}
        </div></div>
      </div></section>
      <section className="sector-lab" id="sector-lab"><div className="sv-shell sector-lab-layout">
        <div className="sector-lab-copy"><span className="sector-section-tag">DEL PROBLEMA A UNA HERRAMIENTA</span><h2>En vez de más planillas, <em>un proceso claro.</em></h2><p>Esta demostración recorre una situación común del sector. Puedes cambiar de etapa y marcarla como revisada. No representa un software vendido ni un cliente real.</p>
          <ul>{sector.solutions.map(text=><li key={text}><Icon name="arrow" size={16}/>{text}</li>)}</ul>
        </div><SectorDemo sector={sector}/></div></section>
      <section className="sector-end"><div className="sv-shell"><span className="sector-section-tag">CONSTRUIMOS SEGÚN TU CONTEXTO</span><h2>Conoces tu trabajo.<br/>Hagamos que la tecnología te acompañe.</h2><p>{sector.disclaimer} Diseñamos cada proyecto a partir de un diagnóstico y un alcance acordado.</p><div className="sector-end-buttons"><a href="/#contacto">Cuéntanos tu necesidad <Icon name="arrow" size={17}/></a><a href="/sectores">Ver otros sectores</a></div></div></section>
    </main><ServiceFooter/>
  </div>;
}

export default function Sectors({slug}){
  const sector=slug?getSector(slug):null;
  if(slug&&!sector) return <div className="sv-site sector-hub"><ServiceHeader/><main id="sector-content" className="sv-not-found sv-shell"><h1>Sector no encontrado.</h1><a href="/sectores" className="sv-primary">Ver todos los sectores</a></main><ServiceFooter/></div>;
  return sector?<SectorDetail key={sector.slug} sector={sector}/>:<SectorHub/>;
}
