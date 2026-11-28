import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { ControlLab } from './ProductLab.jsx';
import ProductFilm from './ProductFilm.jsx';
import { ServiceHeader, ServiceFooter } from './Services.jsx';
import './case-study.css';

export const controlTowerChapters = [
  {
    id:'problema', number:'01', label:'El problema',
    kicker:'EL ORIGEN · NO SOLO EL RESULTADO',
    title:'Una entrega fallida no cuenta toda la historia.',
    intro:'En la última milla, los atrasos pueden nacer en bodega, durante la planificación o en la ruta. Sin una vista común, todo parece responsabilidad del chofer.',
    details:['Esperas entre citación y carga','Incidencias sin causa identificada','Entregas y vehículos registrados por separado'],
  },
  {
    id:'dashboard', number:'02', label:'Control Tower',
    kicker:'LA SOLUCIÓN · VISIBILIDAD OPERATIVA',
    title:'Una torre de control para tomar decisiones.',
    intro:'MR&B Control Tower reúne entregas, choferes y vehículos, incorporando el seguimiento de incidencias, prioridades y problemas operacionales.',
    details:['Estado general de las entregas','Tiempos de espera y salidas atrasadas','Problemas asociados a bodega y entregas críticas'],
  },
  {
    id:'trazabilidad', number:'03', label:'Trazabilidad',
    kicker:'CADA REGISTRO TIENE CONTEXTO',
    title:'Registrar qué ocurrió y dónde comenzó.',
    intro:'El control de entregas contempla estados, prioridades, origen del problema y tipo de incidencia. Eso permite ir más allá del clásico “no entregado”.',
    details:['Estados: pendiente, en ruta, entregada o incidencia','Origen: bodega, cliente, dirección, tráfico y otros','Observaciones y datos de la operación'],
  },
  {
    id:'captacion', number:'04', label:'Landing Recruit',
    kicker:'CAPTACIÓN DIGITAL · RECLUTAMIENTO LOGÍSTICO',
    title:'Una landing que convierte interés en postulaciones.',
    intro:'MR&B Recruit incorpora una landing de captación. Su formulario solicita datos del transportista, vehículo, comuna y disponibilidad y está diseñado para organizar las postulaciones.',
    details:['Formularios adaptados a móvil con campos de postulación','Selección de operación, tipo de vehículo y disponibilidad','Conexión prevista con la API de postulantes y seguimiento de campañas'],
  },
  {
    id:'valor', number:'05', label:'Qué aporta',
    kicker:'EL OBJETIVO · MÁS CONTROL',
    title:'Información útil, menos improvisación.',
    intro:'Lo importante no es la tecnología que hay detrás, sino hacer visibles las decisiones diarias de la operación y ordenar el ingreso de nuevos transportistas.',
    details:['Priorizar incidencias con contexto operativo','Reducir la información repartida entre mensajes','Ordenar la captación de colaboradores con un proceso claro'],
  },
];

function PreviewMetric({label,value,foot}) {
  return <div className="case-metric"><small>{label}</small><strong>{value}</strong><span>{foot}</span></div>;
}

function DashboardMock(){
  return <div className="case-product-mock" aria-label="Visualización de ejemplo basada en funciones de MR&B">
    <div className="case-mock-sidebar">
      <div className="case-mock-brand"><span className="case-logo-box">M</span> MR&B</div>
      {['Dashboard','Entregas','Choferes','Vehículos','Incidencias'].map((t,i)=><span key={t} className={i===0?'case-mock-nav-active':''}><i/>{t}</span>)}
    </div>
    <div className="case-mock-main">
      <div className="case-mock-top"><div><small>MR&B CONTROL TOWER</small><strong>Resumen operativo</strong></div><span className="case-mock-status">MVP · DEMOSTRACIÓN</span></div>
      <div className="case-mock-metrics">
        <PreviewMetric label="Entregas" value="24" foot="Dato ficticio"/>
        <PreviewMetric label="Pendientes" value="06" foot="Dato ficticio"/>
        <PreviewMetric label="Incidencias" value="03" foot="Dato ficticio"/>
        <PreviewMetric label="Espera promedio" value="42 min" foot="Dato ficticio"/>
      </div>
      <div className="case-mock-lower">
        <div><small>ESTADOS DE ENTREGA · EJEMPLO</small>
          <div className="case-mock-bars"><span style={{height:'47%'}}/><span style={{height:'77%'}}/><span style={{height:'62%'}}/><span style={{height:'88%'}}/><span style={{height:'55%'}}/></div>
          <div className="case-mock-labels"><span>Pend.</span><span>Ruta</span><span>Entreg.</span><span>Incid.</span><span>Rev.</span></div>
        </div>
        <div className="case-mock-alert"><small>FRICCIONES · EJEMPLO</small>
          <p><span className="case-dot amber"/>Demora en bodega</p>
          <p><span className="case-dot cyan"/>Salida en seguimiento</p>
          <p><span className="case-dot red"/>Incidencia por revisar</p>
        </div>
      </div>
    </div>
  </div>;
}

function WorkflowMock(){
  const [active,setActive]=useState(0);
  const labels=['Entrega registrada','En ruta','Incidencia identificada'];
  return <div className="case-workflow-mock">
    <div className="case-workflow-head"><span>REGISTRO ILUSTRATIVO</span><span>3 ETAPAS</span></div>
    <div className="case-workflow-steps">{labels.map((label,index)=><button type="button" key={label} aria-pressed={active===index} onClick={()=>setActive(index)}>
      <small>0{index+1}</small><strong>{label}</strong><Icon name={active===index?'arrow':'check'} size={15}/>
    </button>)}</div>
    <div className="case-workflow-inspect" aria-live="polite">
      <span>VISTA DE EJEMPLO</span>
      <h3>{labels[active]}</h3>
      <p>{['Se registra el cliente, la comuna, la dirección, el conductor y el vehículo.','El estado cambia a “En ruta” y mantiene los datos asociados a la entrega.','Se documenta la incidencia y se clasifica su origen para una revisión posterior.'][active]}</p>
      <div><span>ESTADO</span><strong>{['Pendiente','En ruta','Incidencia'][active]}</strong></div>
    </div>
  </div>;
}

export function RecruitLandingMock(){
  const [stage,setStage]=useState(0);
  const steps=[
    {label:'Datos personales',detail:'Nombre, teléfono y comuna para iniciar una postulación.'},
    {label:'Vehículo y operación',detail:'Tipo de vehículo, operación de interés y disponibilidad.'},
    {label:'Envío de postulación',detail:'Información estructurada para revisión de compatibilidad.'},
  ];
  return <div className="case-recruit-mock" aria-label="Recreación ilustrativa de MR&B Recruit basada en el código de su landing">
    <div className="case-recruit-head"><div className="case-recruit-logo"><span>MR&B</span><strong>Recruit</strong></div><small>CAPTACIÓN LOGÍSTICA · VISTA ILUSTRATIVA</small></div>
    <div className="case-recruit-content">
      <span className="case-recruit-eyebrow">POSTULACIÓN DE TRANSPORTISTAS</span>
      <h3>Tu vehículo.<br/><em>Nuevas posibilidades.</em></h3>
      <p>Un punto de entrada digital para personas con camionetas, furgones y camiones que buscan participar en operaciones logísticas.</p>
      <div className="case-recruit-form" aria-label="Etapas de ejemplo del formulario; no envía datos">
        <div className="case-recruit-progress">{steps.map((step,i)=><button type="button" key={step.label} onClick={()=>setStage(i)} aria-pressed={stage===i} aria-label={'Mostrar '+step.label}>{String(i+1).padStart(2,'0')}</button>)}</div>
        <div aria-live="polite"><small>ETAPA {stage+1} DE 3</small><strong>{steps[stage].label}</strong><span>{steps[stage].detail}</span></div>
      </div>
      <div className="case-recruit-trust"><span>Evaluación por operación</span><span>Formulario adaptable</span><span>Sin cupo automático</span></div>
    </div>
    <div className="case-recruit-footer">Demostración ilustrativa de MR&B Recruit. No recoge ni transmite información.</div>
  </div>;
}

function ImpactMock(){
  return <div className="case-friction-mock case-impact-mock" aria-label="Resumen ilustrativo del valor propuesto">
    <span className="case-friction-kicker">ANTES / DESPUÉS · BENEFICIOS ESPERADOS</span>
    {[
      ['Visibilidad','Datos dispersos','Vista común de la operación'],
      ['Incidencias','Problemas sin contexto','Registro del origen y seguimiento'],
      ['Captación','Contactos sin clasificar','Postulaciones organizadas'],
    ].map(([name,before,after],i)=><div key={name}>
      <span>0{i+1}</span><div><strong>{name}</strong><p>{before}</p></div><small>{after}</small>
    </div>)}
    <div className="case-friction-question">Resultados a validar en cada implementación.</div>
  </div>;
}

function ProblemMock(){
  return <div className="case-friction-mock">
    <span className="case-friction-kicker">TRES SITUACIONES DE LA CALLE</span>
    {[
      ['Bodega','La carga no sale a la hora prevista','Inicio del atraso'],
      ['Ruta','Una dirección no coincide','Incidencia en reparto'],
      ['Control','No se conoce el origen de la falla','Visibilidad incompleta'],
    ].map((item,i)=><div key={item[0]}>
      <span>0{i+1}</span><div><strong>{item[0]}</strong><p>{item[1]}</p></div><small>{item[2]}</small>
    </div>)}
    <div className="case-friction-question">¿Dónde nació realmente el problema?</div>
  </div>;
}

export default function ControlTowerCase({video=null}){
  const [slide,setSlide]=useState(0);
  const [playing,setPlaying]=useState(false);
  useEffect(()=>{if(!playing)return;const timer=window.setInterval(()=>setSlide(s=>(s+1)%controlTowerChapters.length),6500);return ()=>window.clearInterval(timer);},[playing]);
  const current=controlTowerChapters[slide];
  const setChapter=(next)=>{setPlaying(false);setSlide((next+controlTowerChapters.length)%controlTowerChapters.length);};
  useEffect(()=>{document.title='MR&B Control Tower · Caso de desarrollo | MUVORY';const anchor=window.location.hash.slice(1);if(['film','demo-control','recorrido'].includes(anchor)){const frame=window.requestAnimationFrame(()=>document.getElementById(anchor)?.scrollIntoView());return ()=>window.cancelAnimationFrame(frame);}window.scrollTo(0,0)},[]);
  return <div className="sv-site case-page">
    <a className="skip-link" href="#case-main">Saltar al contenido</a>
    <ServiceHeader/>
    <main id="case-main">
      <section className="case-hero">
        <div className="sv-shell case-hero-inner">
          <a href="/portafolio" className="case-back"><Icon name="arrow" size={16}/> Todos los proyectos</a>
          <span className="case-eyebrow">DESARROLLO PROPIO · MR&B CONTROL TOWER · MVP</span>
          <h1>Del problema en la calle<br/><em>al control de la operación.</em></h1>
          <p>Dos desarrollos del ecosistema MR&B: una torre de control para la operación logística y una landing para captar transportistas. Una muestra de cómo el conocimiento del terreno se transforma en herramientas digitales.</p>
          <div className="case-hero-actions">
            <a href="#demo-control">Probar el sistema <Icon name="arrow" size={18}/></a>
            <a href="#film">Ver recorrido animado <Icon name="arrow" size={16}/></a><a href="#recorrido">Conocer el caso <Icon name="arrow" size={16}/></a>
          </div>
          <div className="case-hero-caption">Desarrollos propios MR&B · El recorrido utiliza vistas ilustrativas y datos ficticios para proteger la información de la operación.</div>
        </div>
      </section>
      {video && <section className="case-presentation"><div className="sv-shell"><h2>Video del proyecto</h2><video controls playsInline preload="metadata" style={{width:'100%',maxWidth:1000}} aria-label="Video de MR&B Control Tower"><source src={video} type="video/mp4"/></video></div></section>}
      <section className="case-presentation mf-project-section" id="film"><div className="sv-shell"><div className="case-presentation-head"><div><span>PRODUCT STORIES</span><h2>Del problema a la decisión.</h2></div><p>Un recorrido de 24 segundos por la interfaz de demostración, con controles de reproducción.</p></div><ProductFilm type="control" onTry={()=>document.getElementById('demo-control')?.scrollIntoView()}/></div></section>
      <section className="case-presentation case-live-demo" id="demo-control"><div className="sv-shell"><div className="case-presentation-head"><div><span>LABORATORIO INTERACTIVO</span><h2>Prueba la torre de control.</h2></div><p>Filtra entregas, selecciona una incidencia e identifica su origen. Simula su resolución y observa cómo cambian los indicadores.</p></div><ControlLab/></div></section>
      <section className="case-presentation" id="recorrido" aria-label="Presentación interactiva de MR&B Control Tower">
        <div className="sv-shell">
          <div className="case-presentation-head">
            <div><span>RECORRIDO INTERACTIVO</span><h2>Conoce el proyecto en cinco pasos.</h2></div>
            <p>Elige una etapa para descubrir el problema, la torre de control, la captación de transportistas y el valor de estas soluciones.</p>
          </div>
          <div className="case-presentation-tabs" role="group" aria-label="Capítulos del proyecto">
            {controlTowerChapters.map((part,index)=><button type="button" key={part.id} onClick={()=>setChapter(index)} aria-pressed={slide===index} aria-controls="case-stage">
              <span>{part.number}</span>{part.label}
            </button>)}
          </div>
          <div className="case-stage" id="case-stage">
            <div className="case-stage-text" key={current.id}>
              <span>{current.kicker}</span>
              <h3>{current.title}</h3>
              <p>{current.intro}</p>
              <ul>{current.details.map(detail=><li key={detail}><Icon name="check" size={16}/>{detail}</li>)}</ul>
            </div>
            <div className="case-stage-visual">
              {slide===0?<ProblemMock/>:slide===1?<DashboardMock/>:slide===2?<WorkflowMock/>:slide===3?<RecruitLandingMock/>:<ImpactMock/>}
            </div>
          </div>
          <div className="case-presentation-foot">
            <span>{String(slide+1).padStart(2,'0')} / 05</span>
            <div><button type="button" onClick={()=>setPlaying(v=>!v)} aria-pressed={playing}>{playing?'Pausar recorrido':'Reproducir recorrido'}</button><button type="button" onClick={()=>setChapter(slide-1)} aria-label="Ver capítulo anterior"><Icon name="arrow" size={20}/></button>
            <button type="button" onClick={()=>setChapter(slide+1)}>Siguiente capítulo <Icon name="arrow" size={18}/></button></div>
          </div>
        </div>
      </section>
      <section className="case-end">
        <div className="sv-shell case-end-layout"><div><span>TECNOLOGÍA CON CONOCIMIENTO REAL</span><h2>¿Tu operación tiene dificultades similares?</h2><p>Podemos analizar el proceso, identificar las fricciones y diseñar un sistema adecuado a tu organización. La torre de control y la landing Recruit son desarrollos del ecosistema MR&B; las vistas aquí son ilustrativas y no implican implementaciones comerciales equivalentes en terceros.</p></div>
          <a href="/contacto">Conversemos sobre tu operación <Icon name="arrow" size={17}/></a>
        </div>
      </section>
    </main><ServiceFooter/>
  </div>;
}
