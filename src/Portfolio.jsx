import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { ServiceHeader, ServiceFooter } from './Services.jsx';
import ControlTowerCase, { RecruitLandingMock } from './ControlTowerCase.jsx';
import './portfolio.css';

/* Videos approved by the owner can be placed in /public/media/portfolio/
   and enabled here. No live operational footage or customer information is published by default. */
export const portfolioVideos = {
  control: null,
  recruit: null,
  ventas: null,
};

export const projects = [
  {
    slug:'control-tower', number:'01', type:'control', label:'Control operativo · Logística',
    name:'MR&B Control Tower', category:'Operación logística', mark:'CONTROL TOWER',
    headline:'Entender dónde comenzó el problema.',
    description:'Un dashboard para organizar entregas, conductores, vehículos e incidencias. Diseñado desde la experiencia real en rutas, bodegas y distribución.',
    problem:'En logística, una entrega fallida no siempre comienza en la calle.',
    solution:'Control de entregas y prioridades con registro de incidencias y su origen.',
    points:['Entregas, vehículos y choferes','Seguimiento de incidencias','Visibilidad de fricciones en la operación'],
    href:'/portafolio/control-tower',
    detail:'El software existe como MVP. El recorrido disponible es una demostración visual con datos de ejemplo.',
    accent:'blue',
  },
  {
    slug:'recruit', number:'02', type:'recruit', label:'Captación digital · Transporte',
    name:'MR&B Recruit', category:'Landing y reclutamiento',
    mark:'RECRUIT',
    headline:'De una visita a una postulación organizada.',
    description:'Una landing de captación de transportistas conectada conceptualmente al flujo de reclutamiento: vehículo, comuna, disponibilidad y operación de interés.',
    problem:'Los interesados llegan por diferentes canales y los datos pueden quedar incompletos.',
    solution:'Un punto de entrada digital para estructurar las postulaciones y facilitar su revisión.',
    points:['Formulario de postulación','Selección de operación y vehículo','Información organizada para seguimiento'],
    href:'/portafolio/recruit',
    detail:'Landing desarrollada dentro del ecosistema MR&B. Los formularios del recorrido son demostrativos y no registran postulantes.',
    accent:'green',
  },
  {
    slug:'ventas', number:'03', type:'ventas', label:'Gestión comercial · Notas de venta',
    name:'Sistema de ventas y notas', category:'Comercio',
    mark:'VENTAS',
    headline:'Un proceso de venta que se puede seguir.',
    description:'Un trabajo de desarrollo para un cliente del rubro de las paltas. El material audiovisual del sistema está pendiente de revisión y autorización para publicarse.',
    problem:'Las notas de venta necesitan orden y un seguimiento claro.',
    solution:'Mostrar el registro de notas y su recorrido en una vista simple, a partir del video real del proyecto.',
    points:['Notas de venta','Flujo comercial','Material real por incorporar'],
    href:'/portafolio/ventas',
    detail:'Proyecto informado por MUVORY. La experiencia interactiva es conceptual; no se exhiben pantallas ni datos del cliente sin autorización.',
    accent:'orange',
  },
];

export function getProject(slug){return projects.find(project=>project.slug===slug)||null;}

const tourSteps={
 control:[
  {k:'ENTREGAS',title:'Un solo tablero',detail:'El equipo revisa entregas pendientes, en ruta y con incidencias.',signal:'24',caption:'Ejemplo ficticio'},
  {k:'INCIDENCIAS',title:'Detectar la fricción',detail:'Las incidencias se clasifican para entender dónde comenzó el problema.',signal:'03',caption:'Ejemplo ficticio'},
  {k:'DECISIONES',title:'Actuar con contexto',detail:'El supervisor dispone de una vista para dar seguimiento a lo pendiente.',signal:'✓',caption:'Vista ilustrativa'},
 ],
 recruit:[
  {k:'VISITA',title:'Captar el interés',detail:'Una persona conoce la oportunidad y revisa los requisitos.',signal:'01',caption:'Paso de ejemplo'},
  {k:'FORMULARIO',title:'Completar los datos',detail:'Registra vehículo, comuna, operación y disponibilidad.',signal:'02',caption:'Paso de ejemplo'},
  {k:'REVISIÓN',title:'Evaluar compatibilidad',detail:'La información queda organizada para revisión operativa.',signal:'03',caption:'Paso de ejemplo'},
 ],
 ventas:[
  {k:'NOTA DE VENTA',title:'Iniciar un registro',detail:'Una nota de venta identifica un movimiento comercial.',signal:'01',caption:'Flujo conceptual'},
  {k:'REVISIÓN',title:'Comprobar información',detail:'Se revisan los datos antes de continuar el proceso.',signal:'02',caption:'Flujo conceptual'},
  {k:'SEGUIMIENTO',title:'Consultar el estado',detail:'El registro puede ser localizado y revisado.',signal:'03',caption:'Flujo conceptual'},
 ]
};
export function GuidedTour({type='control',compact=false}){
  const [step,setStep]=useState(0);
  const [playing,setPlaying]=useState(false);
  const steps=tourSteps[type]||tourSteps.control;
  useEffect(()=>{setStep(0);setPlaying(false);},[type]);
  useEffect(()=>{
    if(!playing)return;
    const id=window.setInterval(()=>setStep(prev=>(prev+1)%steps.length),3400);
    return ()=>window.clearInterval(id);
  },[playing,steps.length]);
  const current=steps[step];
  return <div className={'pf-tour pf-tour-'+type+(compact?' pf-tour-compact':'')}>
    <div className="pf-tour-top"><span className="pf-tour-lights" aria-hidden="true"><i/><i/><i/></span><span>{type==='control'?'MR&B / CONTROL TOWER':type==='recruit'?'MR&B / RECRUIT':'GESTIÓN COMERCIAL'}</span><span>DEMO ILUSTRATIVA</span></div>
    <div className="pf-tour-screen">
      <div className="pf-tour-side" aria-hidden="true"><strong>{type==='ventas'?'NV':'MR&B'}</strong><i/><i/><i/><i/></div>
      <div className="pf-tour-content" aria-live="polite">
        <div className="pf-tour-identity"><span>{current.k}</span><span>{String(step+1).padStart(2,'0')} / 03</span></div>
        <div className="pf-tour-center">
          <div className="pf-tour-number" key={type+'-'+step}><span>{current.signal}</span><small>{current.caption}</small></div>
          <div className="pf-tour-caption" key={type+'-text-'+step}><strong>{current.title}</strong><p>{current.detail}</p></div>
        </div>
        <div className="pf-tour-bottom-bars" aria-hidden="true">{[26,62,38,82,56].map((height,i)=><span key={i} style={{height:(height+(step*7)%14)+'%'}}/>)}</div>
      </div>
    </div>
    <div className="pf-tour-controls">
      <span>RECORRIDO GUIADO · DATOS DE EJEMPLO</span>
      <div>
        {steps.map((item,index)=><button type="button" key={item.k} className={'pf-tour-dot'+(index===step?' active':'')} aria-label={'Mostrar etapa '+(index+1)} aria-pressed={index===step} onClick={()=>{setStep(index);setPlaying(false);}}/>)}
        <button type="button" className="pf-tour-play" onClick={()=>setPlaying(v=>!v)} aria-label={playing?'Pausar recorrido':'Reproducir recorrido'}>{playing?'Pausar':'Reproducir'} <Icon name={playing?'close':'arrow'} size={13}/></button>
      </div>
    </div>
  </div>;
}

export function ProjectMedia({project,compact=false}){
  const video=portfolioVideos[project.type];
  const [error,setError]=useState(false);
  useEffect(()=>setError(false),[project.type,video]);
  if(video&&!error)return <div className="pf-video-wrapper">
    <video controls playsInline preload="metadata" onError={()=>setError(true)} aria-label={'Video del proyecto '+project.name}>
      <source src={video} type="video/mp4" />
      Tu navegador no permite reproducir el video.
    </video>
    <small>Video real del proyecto · Sin información privada</small>
  </div>;
  return <GuidedTour type={project.type} compact={compact}/>;
}

function ProjectCard({project}){
  const icons={control:'chart',recruit:'briefcase',ventas:'store'};
  return <article className={'pf-card pf-tone-'+project.accent}>
    <a className={'pf-project-cover pf-project-cover-'+project.type} href={project.href} aria-label={'Explorar '+project.name}>
      <span>{project.label}</span><Icon name={icons[project.type]} size={54}/><strong>{project.mark}</strong><small>EXPLORAR PROYECTO <Icon name="arrowUp" size={15}/></small>
    </a>
    <div className="pf-card-copy">
      <h3>{project.name}</h3><p>{project.description}</p>
      <a href={project.href}>Explorar el proyecto <Icon name="arrow" size={17}/></a>
    </div>
  </article>;
}

export function PortfolioTeaser(){
  return <a className="home-door" href="/portafolio"><span className="home-door-icon"><Icon name="chart" size={27}/></span><div><h2>Nuestro trabajo</h2><p>Conoce los sistemas que estamos desarrollando.</p></div><Icon name="arrowUp" size={20}/></a>;
}

function PortfolioHome(){
 useEffect(()=>{document.title='Proyectos y soluciones desarrolladas | MUVORY Technologies';window.scrollTo(0,0);},[]);
 return <div className="sv-site pf-page"><a className="skip-link" href="#pf-main">Saltar al contenido</a><ServiceHeader/>
   <main id="pf-main">
     <section className="pf-hero"><div className="sv-shell">
       <span>PORTAFOLIO / DESARROLLOS Y EXPERIENCIAS</span>
       <h1>Del problema real<br/><em>a una solución digital.</em></h1>
       <p>Proyectos que nacen de necesidades operativas concretas. Conoce el enfoque, prueba recorridos y descubre cómo podemos desarrollar algo parecido para tu organización.</p>
       <a href="#proyectos">Conocer los proyectos <Icon name="arrow" size={17}/></a>
     </div></section>
     <section className="pf-index" id="proyectos"><div className="sv-shell">
       <div className="pf-index-intro"><span>PROYECTOS SELECCIONADOS</span><p>Elige un proyecto para conocer su propósito y recorrer su demostración. Las simulaciones se distinguen del material real.</p></div>
       <div className="pf-project-grid">{projects.map(project=><ProjectCard key={project.slug} project={project}/>)}</div>
       <div className="pf-source-note"><Icon name="check" size={18}/>Distinguimos lo desarrollado, los prototipos y el material audiovisual pendiente. No publicamos información privada de clientes ni operaciones.</div>
     </div></section>
     <section className="pf-end-cta"><div className="sv-shell"><div><span>HABLEMOS DE TU OPERACIÓN</span><h2>¿Qué parte de tu trabajo debería funcionar mejor?</h2></div><a href="/#contacto">Diseñemos tu solución <Icon name="arrow" size={17}/></a></div></section>
   </main><ServiceFooter/>
 </div>;
}

function ProjectDetail({project}){
 useEffect(()=>{document.title=project.name+' · Proyecto | MUVORY';window.scrollTo(0,0);},[project.slug]);
 return <div className={'sv-site pf-page pf-detail pf-detail-'+project.accent}>
   <a className="skip-link" href="#pf-main">Saltar al contenido</a><ServiceHeader/>
   <main id="pf-main">
     <section className="pf-detail-hero"><div className="sv-shell">
       <a className="pf-back" href="/portafolio"><Icon name="arrow" size={15}/> Todos los proyectos</a>
       <div className="pf-detail-hero-grid"><div>
         <span>{project.number} / {project.label}</span>
         <h1>{project.headline}</h1>
         <p>{project.description}</p>
         <div className="pf-detail-actions"><a href="#demostracion">Explorar recorrido <Icon name="arrow" size={17}/></a><a href="/#contacto">Hablemos de tu proyecto <Icon name="arrow" size={17}/></a></div>
       </div><div className="pf-detail-art">{project.type==='recruit'?<RecruitLandingMock/>:<ProjectMedia project={project}/>}</div></div>
     </div></section>
     <section className="pf-detail-story"><div className="sv-shell pf-story-grid">
       <div><span>EL PROBLEMA</span><h2>{project.problem}</h2></div>
       <div><span>NUESTRA RESPUESTA</span><p>{project.solution}</p><p>{project.detail}</p></div>
     </div></section>
     <section className="pf-detail-flow" id="demostracion"><div className="sv-shell">
       <div className="pf-flow-head"><span>CONOCE EL RECORRIDO</span><h2>Descubre cómo funciona <em>la idea.</em></h2><p>Selecciona los pasos o pulsa reproducir. Este recorrido es interactivo; no es una grabación real del sistema ni almacena datos.</p></div>
       {project.type==='recruit' && portfolioVideos.recruit && <ProjectMedia project={project}/>}
       <div className="pf-detail-demo-layout">{project.type==='recruit'?<RecruitLandingMock/>:<ProjectMedia project={project}/>}
         <div className="pf-flow-copy"><span>FUNCIONES QUE ILUSTRAMOS</span><ul>{project.points.map((point,i)=><li key={point}><small>0{i+1}</small>{point}</li>)}</ul>
           <p>{project.type==='ventas'?'La grabación del sistema de notas de venta se incorporará únicamente tras revisar y autorizar el video proporcionado por el equipo.':'Podemos adaptar este enfoque a otras necesidades, sistemas y procesos.'}</p>
           {project.type==='recruit'&&<a href="/casos/control-tower#recorrido">Ver también Control Tower <Icon name="arrow" size={17}/></a>}
         </div>
       </div>
     </div></section>
     <section className="pf-end-cta"><div className="sv-shell"><div><span>DESARROLLOS A MEDIDA</span><h2>Podemos estudiar tu proceso y construir una herramienta propia.</h2></div><a href="/#contacto">Solicitar conversación <Icon name="arrow" size={17}/></a></div></section>
   </main><ServiceFooter/>
 </div>;
}

export default function Portfolio({slug}){
 if(!slug)return <PortfolioHome/>;
 if(slug==='control-tower')return <ControlTowerCase video={portfolioVideos.control}/>;
 const project=getProject(slug);
 if(!project)return <div className="sv-site pf-page"><ServiceHeader/><main className="sv-shell pf-not-found"><h1>Proyecto no encontrado</h1><a href="/portafolio">Volver al portafolio</a></main><ServiceFooter/></div>;
 return <ProjectDetail project={project}/>;
}
