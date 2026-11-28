import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
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
    intro:'El MVP MR&B Dashboard reúne entregas, choferes y vehículos, mostrando también incidencias, prioridades y fricciones operacionales.',
    details:['Estado general de las entregas','Tiempos de espera y salidas atrasadas','Problemas asociados a bodega y entregas críticas'],
  },
  {
    id:'trazabilidad', number:'03', label:'Trazabilidad',
    kicker:'CADA REGISTRO TIENE CONTEXTO',
    title:'Registrar qué ocurrió y dónde comenzó.',
    intro:'El modelo de entregas contempla estados, prioridades, origen del problema y tipo de incidencia. Eso permite ir más allá del clásico “no entregado”.',
    details:['Estados: pendiente, en ruta, entregada o incidencia','Origen: bodega, cliente, dirección, tráfico y otros','Observaciones y datos de la operación'],
  },
  {
    id:'captacion', number:'04', label:'Landing Recruit',
    kicker:'CAPTACIÓN DIGITAL · RECLUTAMIENTO LOGÍSTICO',
    title:'Una landing que convierte interés en postulaciones.',
    intro:'Dentro del mismo repositorio existe una landing pública de MR&B Recruit. Su formulario solicita datos del transportista, vehículo, comuna y disponibilidad y está diseñado para enviar postulaciones al sistema.',
    details:['Formularios adaptados a móvil con campos de postulación','Selección de operación, tipo de vehículo y disponibilidad','Conexión prevista con la API de postulantes y seguimiento de campañas'],
  },
  {
    id:'arquitectura', number:'05', label:'Cómo se construyó',
    kicker:'DE LA OPERACIÓN AL CÓDIGO',
    title:'Experiencia logística convertida en software.',
    intro:'El repositorio contiene un panel React, backend Node.js con Express, modelos MongoDB y una landing React separada dentro de mrb-recruit-landing. Son componentes del ecosistema MR&B, con publicación y usos diferentes.',
    details:['Dashboard y landing desarrollados en React','API Express para operaciones y postulantes','Persistencia MongoDB para datos operativos y reclutamiento'],
  },
];

function PreviewMetric({label,value,foot}) {
  return <div className="case-metric"><small>{label}</small><strong>{value}</strong><span>{foot}</span></div>;
}

function DashboardMock(){
  return <div className="case-product-mock" aria-label="Visualización de ejemplo basada en módulos del repositorio MR&B">
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

function RecruitLandingMock(){
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
    <div className="case-recruit-footer">Modelo visual basado en la landing del repositorio. No recoge ni transmite información.</div>
  </div>;
}

function TechMock(){
  return <div className="case-tech-mock" aria-label="Tecnologías confirmadas en el repositorio del MVP MR&B">
    <div><span>01 / EXPERIENCIA</span><strong>React</strong><small>Panel y vistas operativas</small></div>
    <Icon name="arrow" size={24}/>
    <div><span>02 / API</span><strong>Node.js + Express</strong><small>Entregas, conductores y vehículos</small></div>
    <Icon name="arrow" size={24}/>
    <div><span>03 / DATOS</span><strong>MongoDB</strong><small>Registros y modelos operacionales</small></div>
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

export default function ControlTowerCase(){
  const [slide,setSlide]=useState(0);
  const current=controlTowerChapters[slide];
  const setChapter=(next)=>setSlide((next+controlTowerChapters.length)%controlTowerChapters.length);
  useEffect(()=>{document.title='MR&B Control Tower · Caso de desarrollo | MUVORY';window.scrollTo(0,0)},[]);
  return <div className="sv-site case-page">
    <a className="skip-link" href="#case-main">Saltar al contenido</a>
    <ServiceHeader/>
    <main id="case-main">
      <section className="case-hero">
        <div className="sv-shell case-hero-inner">
          <a href="/sectores/logistica" className="case-back"><Icon name="arrow" size={16}/> Transporte y logística</a>
          <span className="case-eyebrow">DESARROLLO PROPIO · MR&B CONTROL TOWER · MVP</span>
          <h1>Del problema en la calle<br/><em>al control de la operación.</em></h1>
          <p>Dos desarrollos del ecosistema MR&B: una torre de control para la operación logística y una landing para captar transportistas. Una muestra de cómo el conocimiento del terreno se transforma en herramientas digitales.</p>
          <div className="case-hero-actions">
            <a href="#recorrido">Explorar el proyecto <Icon name="arrow" size={18}/></a>
            <a href="https://github.com/miguel-dashboard/MRB-dashboard-MVP" target="_blank" rel="noopener noreferrer">Consultar repositorio <Icon name="arrowUp" size={16}/></a>
          </div>
          <div className="case-hero-caption">Dashboard y landing MR&B Recruit verificados en el repositorio GitHub. La landing está en una rama de desarrollo, no en main. Las vistas de esta presentación son recreaciones ilustrativas, sin datos operativos reales.</div>
        </div>
      </section>
      <section className="case-presentation" id="recorrido" aria-label="Presentación interactiva de MR&B Control Tower">
        <div className="sv-shell">
          <div className="case-presentation-head">
            <div><span>RECORRIDO INTERACTIVO</span><h2>Conoce el proyecto en cinco pasos.</h2></div>
            <p>Elige una etapa para explorar el problema, la torre de control, la landing de captación y cómo se desarrollaron.</p>
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
            {current.id==='captacion'&&<a className="case-source-link" target="_blank" rel="noopener noreferrer" href="https://github.com/miguel-dashboard/MRB-dashboard-MVP/tree/feature/recruit-landing-starken-publish/mrb-recruit-landing">Ver código de la landing Recruit <Icon name="arrowUp" size={16}/></a>}
            <div className="case-stage-visual">
              {slide===0?<ProblemMock/>:slide===1?<DashboardMock/>:slide===2?<WorkflowMock/>:slide===3?<RecruitLandingMock/>:<TechMock/>}
            </div>
          </div>
          <div className="case-presentation-foot">
            <span>{String(slide+1).padStart(2,'0')} / 05</span>
            <div><button type="button" onClick={()=>setChapter(slide-1)} aria-label="Ver capítulo anterior"><Icon name="arrow" size={20}/></button>
            <button type="button" onClick={()=>setChapter(slide+1)}>Siguiente capítulo <Icon name="arrow" size={18}/></button></div>
          </div>
        </div>
      </section>
      <section className="case-end">
        <div className="sv-shell case-end-layout"><div><span>TECNOLOGÍA CON CONOCIMIENTO REAL</span><h2>¿Tu operación tiene dificultades similares?</h2><p>Podemos analizar el proceso, identificar las fricciones y diseñar un sistema adecuado a tu organización. La torre de control y la landing Recruit son desarrollos del ecosistema MR&B; las vistas aquí son ilustrativas y no implican implementaciones comerciales equivalentes en terceros.</p></div>
          <a href="/#contacto">Conversemos sobre tu operación <Icon name="arrow" size={17}/></a>
        </div>
      </section>
    </main><ServiceFooter/>
  </div>;
}
