import { useState, useEffect } from 'react';
import CommercialAssistant from './CommercialAssistant.jsx';

const services = [
  {
    number: '01',
    icon: 'layers',
    title: 'Software a medida',
    description: 'Organiza información, usuarios y procesos en soluciones adaptadas a cada actividad.',
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
  { label: 'Logística y operaciones', icon: 'truck' },
  { label: 'Educación y formación', icon: 'layers' },
  { label: 'Proyectos y organizaciones', icon: 'spark' }
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

const heroShowcases=[
 {name:'Software',icon:'layers',tag:'GESTIÓN A MEDIDA',title:'Toda la información, en un solo lugar.',rows:['Solicitudes organizadas','Tareas en seguimiento','Acceso por responsables'],status:'Panel de gestión · ejemplo'},
 {name:'Automatización',icon:'workflow',tag:'FLUJOS CONECTADOS',title:'Menos pasos manuales. Más continuidad.',rows:['Solicitud recibida','Regla de validación','Aviso preparado'],status:'Flujo de trabajo · ejemplo'},
 {name:'Inteligencia artificial',icon:'spark',tag:'ASISTENCIA DIGITAL',title:'Información útil cuando la necesitas.',rows:['Consulta recibida','Contenido autorizado','Respuesta para revisión'],status:'Asistente guiado · ejemplo'}
];
function HeroExperience(){
 const [selected,setSelected]=useState(0);
 const active=heroShowcases[selected];
 return <div className="hero-experience" aria-label="Explora ejemplos de tecnología MUVORY">
  <OrbVisual />
  <div className="hero-lab">
   <div className="hero-lab-top"><span className="hero-lab-live"><span aria-hidden="true"/> MUVORY / LAB</span><span>DEMOSTRACIÓN INTERACTIVA</span></div>
   <div className="hero-lab-tabs" role="group" aria-label="Tipo de solución">
    {heroShowcases.map((item,i)=><button key={item.name} type="button" aria-pressed={selected===i} onClick={()=>setSelected(i)}><Icon name={item.icon} size={15}/>{item.name}</button>)}
   </div>
   <div className="hero-lab-content" aria-live="polite">
    <span className="hero-lab-tag">{active.tag}</span>
    <strong>{active.title}</strong>
    <div className="hero-lab-rows">{active.rows.map((row,i)=><div key={row}><span className="hero-lab-row-icon">{i+1}</span><span>{row}</span><Icon name={i===2?'arrow':'check'} size={14}/></div>)}</div>
    <div className="hero-lab-bottom"><span>{active.status}</span><span>DATOS ILUSTRATIVOS</span></div>
   </div>
  </div>
 </div>;
}

const demoOptions = {
 software: {title:'GESTIÓN EMPRESARIAL',tabs:['Productos','Clientes','Pedidos'], rows:[['Producto A','Producto B','Producto C'],['Cliente A','Cliente B','Cliente C'],['Pedido 001','Pedido 002','Pedido 003']]},
 data:{title:'INTELIGENCIA COMERCIAL',tabs:['Ventas','Clientes','Inventario'],rows:[[32,52,42,70,58,86,76],[46,36,68,48,79,62,91],[82,64,78,50,63,42,57]]},
 ai:{title:'AGENTE INTELIGENTE',tabs:['Atender','Clasificar','Agendar'],rows:['Hola, puedo orientarte sobre los servicios de la empresa.','Solicitud clasificada para revisión humana.','Preferencia de horario registrada para confirmar disponibilidad.']},
 web:{title:'EXPERIENCIA DIGITAL',tabs:['Escritorio','Móvil']}
};
function CapabilityDemo({kind}) {
 const [choice,setChoice]=useState(0);
 const [activeRecord,setActiveRecord]=useState(0);
 const [recordDone,setRecordDone]=useState(false);
 const [flowStep,setFlowStep]=useState(0);
 const [aiQuestion,setAiQuestion]=useState(-1);
 const d=demoOptions[kind];
 const flowStages=['Solicitud recibida','Información validada','Registro actualizado'];
 const aiQuestions=['¿Qué puedes resolver?','¿Cómo comenzamos?','¿Necesito un sistema grande?'];
 const aiAnswers=[
  'Podemos explorar sistemas, automatización y herramientas digitales según tu necesidad. Cada propuesta requiere evaluación humana.',
  'Primero entendemos el desafío. Luego definimos un alcance posible, un prototipo y los pasos siguientes.',
  'No necesariamente. Es posible comenzar con una herramienta pequeña y ampliar funcionalidades cuando aporten valor.'
 ];
 return <div className="tech-demo">
  <div className="demo-top"><span>{d?.title || 'FLUJO CONECTADO'}</span><span>DEMO INTERACTIVA</span></div>
  {d&&<div className="demo-tabs">{d.tabs.map((v,i)=><button key={v} type="button" aria-pressed={choice===i} onClick={()=>{setChoice(i);setActiveRecord(0);setRecordDone(false);setAiQuestion(-1);}}>{v}</button>)}</div>}
  {kind==='software'&&<>
   <div className="demo-table demo-table-interactive" role="group" aria-label="Registros de ejemplo">
    {d.rows[choice].map((v,i)=><button key={v} type="button" aria-pressed={activeRecord===i} onClick={()=>{setActiveRecord(i);setRecordDone(false);}}><Icon name="layers" size={15}/><span>{v}</span><small>{activeRecord===i?'Seleccionado':'Ver registro'}</small></button>)}
   </div>
   <div className="demo-record-detail" aria-live="polite">
    <span>Registro: <strong>{d.rows[choice][activeRecord]}</strong></span>
    <span className={recordDone?'demo-state-done':'demo-state-pending'}>{recordDone?'Revisado':'Pendiente de revisión'}</span>
   </div>
   <button className="demo-action" type="button" onClick={()=>setRecordDone(v=>!v)}>{recordDone?'Volver a pendiente':'Marcar como revisado'} <Icon name="check" size={15}/></button>
  </>}
  {kind==='data'&&<div className="demo-bars" role="img" aria-label={'Distribución ilustrativa de '+d.tabs[choice]}>{d.rows[choice].map((n,i)=><i key={i} style={{height:n+'%'}}/>)}</div>}
  {kind==='flow'&&<>
   <div className="demo-flow" aria-live="polite">{flowStages.map((v,i)=><div key={v} className={flowStep>i?'is-done':flowStep===i?'is-current':''}><span>{flowStep>i?'✓':String(i+1).padStart(2,'0')}</span>{v}</div>)}</div>
   <button className="demo-action" type="button" onClick={()=>setFlowStep(v=>v===3?0:v+1)}>{flowStep===3?'Reiniciar flujo':'Ejecutar siguiente paso'} <Icon name={flowStep===3?'workflow':'arrow'} size={15}/></button>
   <small role="status">{flowStep===3?'Flujo simulado completado.':flowStep===0?'Inicia la simulación.':'Etapa '+flowStep+' de 3 completada.'} No hay integraciones activas.</small>
  </>}
  {kind==='ai'&&<>
   <div className="demo-chat" aria-live="polite"><Icon name="spark" size={22}/><div className="demo-chat-body"><p>{aiQuestion<0?d.rows[choice]:aiAnswers[aiQuestion]}</p></div></div>
   <div className="demo-ai-questions" role="group" aria-label="Preguntas de ejemplo">{aiQuestions.map((question,i)=><button key={question} type="button" aria-pressed={aiQuestion===i} onClick={()=>setAiQuestion(i)}>{question}</button>)}</div>
  </>}
  {kind==='web'&&<div className={'demo-browser '+(choice===1?'demo-mobile':'')} aria-hidden="true"><div className="demo-toolbar">● ● ●</div><div className="demo-webhero"><i/><i/><b/></div><div className="demo-webcards"><i/><i/><i/></div></div>}
  {kind!=='flow'&&<small>{kind==='ai'?'Conversación simulada · no hay IA en vivo':kind==='software'?'Cambios locales de demostración · no se guardan datos':'Vista ilustrativa · datos de ejemplo'}</small>}
 </div>;
}
const capabilities = [
 {kind:'software',title:'Software a medida',icon:'layers',description:'Desarrollamos plataformas y sistemas que se adaptan a las necesidades de cada proyecto.'},
 {kind:'data',title:'Inteligencia de datos',icon:'chart',description:'Transforma información dispersa en indicadores claros para tomar mejores decisiones.'},
 {kind:'flow',title:'Automatización inteligente',icon:'workflow',description:'Integra herramientas y reduce tareas repetitivas mediante flujos conectados.'},
 {kind:'ai',title:'Agentes de IA',icon:'spark',description:'Asistentes para atención, clasificación y gestión, con supervisión humana.'},
 {kind:'web',title:'Web y plataformas digitales',icon:'globe',description:'Creamos experiencias web para informar, gestionar servicios y conectar con usuarios.'}
];
function Applications() {
 const [active,setActive]=useState(0);
 const [step,setStep]=useState(0);
 const cases=[
  {name:'Comercio',icon:'store',title:'Ventas e inventario conectados',desc:'Unifica pedidos, disponibilidad de productos y seguimiento de ventas en un solo lugar.',steps:['Pedido registrado','Inventario actualizado','Resumen disponible'],sample:['Pedido #1042','Stock sincronizado','Resumen del día']},
  {name:'Servicios jurídicos',icon:'briefcase',title:'Documentos y plazos organizados',desc:'Visualiza expedientes, tareas y recordatorios para facilitar el seguimiento administrativo.',steps:['Expediente registrado','Plazo identificado','Recordatorio preparado'],sample:['Expediente de ejemplo','Vencimiento próximo','Tarea por revisar']},
  {name:'Logística',icon:'truck',title:'Seguimiento operativo centralizado',desc:'Consulta despachos, estados e incidencias para comprender qué ocurre en la operación.',steps:['Despacho asignado','Estado actualizado','Incidencia visible'],sample:['Ruta asignada','Entrega en seguimiento','Alerta por revisar']},
  {name:'Educación',icon:'layers',title:'Gestión de formación digital',desc:'Organiza inscripciones, contenidos y avances mediante una plataforma accesible.',steps:['Inscripción recibida','Contenido disponible','Progreso registrado'],sample:['Curso de ejemplo','Módulo disponible','Progreso actualizado']},
  {name:'Inmobiliarias',icon:'building',title:'Consultas y seguimiento comercial',desc:'Conecta solicitudes de interesados con una vista clara para organizar respuestas.',steps:['Consulta recibida','Interés clasificado','Seguimiento pendiente'],sample:['Consulta de propiedad','Interesado registrado','Contacto programable']},
  {name:'Otros proyectos',icon:'spark',title:'Una solución para cada idea',desc:'Desde portales y herramientas internas hasta automatizaciones para necesidades específicas.',steps:['Necesidad identificada','Flujo diseñado','Prototipo evaluado'],sample:['Solicitud de proyecto','Etapa de diseño','Próxima revisión']}
 ];
 const item=cases[active];
 function selectArea(index){ setActive(index); setStep(0); }
 function advance(){ setStep(current=>Math.min(3,current+1)); }
 function requestSolution(){
  window.dispatchEvent(new CustomEvent('muvory:diagnostic',{detail:'Interés en solución tecnológica para '+item.name+': '+item.title+'. Ejemplo ilustrativo explorado en el sitio web.'}));
 }
 return <>
  <div className="industry-tabs" role="group" aria-label="Explora aplicaciones por área">
   {cases.map((c,i)=><button type="button" key={c.name} aria-pressed={active===i} onClick={()=>selectArea(i)}><Icon name={c.icon} size={18}/>{c.name}</button>)}
  </div>
  <div className="application-panel">
   <div className="application-copy">
    <span className="section-kicker">APLICACIÓN ILUSTRATIVA · {item.name.toUpperCase()}</span>
    <h3>{item.title}</h3>
    <p>{item.desc}</p>
    <div className="application-steps">{item.steps.map((step,i)=><div key={step}><span>{String(i+1).padStart(2,'0')}</span>{step}</div>)}</div>
    <a className="text-link" href="#contacto" onClick={requestSolution}>Conversemos sobre esta solución <Icon name="arrow" size={17}/></a>
   </div>
   <div className="application-preview" aria-live="polite" aria-atomic="true">
    <div className="application-preview-header"><span>VISTA DE PLATAFORMA</span><span className="application-preview-demo">DEMO · SIN DATOS REALES</span></div>
    <div className="application-preview-title"><Icon name={item.icon} size={22}/><div><strong>{item.name}</strong><small>Panel ilustrativo de seguimiento</small></div></div>
    <div className="application-preview-list">
     {item.sample.map((label,i)=><div key={label} className={'application-preview-row'+(step>i?' is-complete':'')}><span className="application-preview-index">0{i+1}</span><span>{label}</span><small>{step>i?'Completado':i===step?'Siguiente paso':'Pendiente'}</small></div>)}
    </div>
    <div className="application-preview-controls">
     <div className="application-preview-progress" aria-live="polite" role="status">{step===0?'Inicia una simulación de este proceso.':step===3?'Simulación completada. Puedes reiniciarla.':'Paso '+step+' de 3 completado.'}</div>
     <button className="application-preview-run" type="button" onClick={step===3?()=>setStep(0):advance}>{step===3?'Reiniciar simulación':'Simular siguiente paso'} <Icon name={step===3?'workflow':'arrow'} size={17}/></button>
    </div>
    <div className="application-preview-bottom"><span className="application-preview-light" /> Simulación local, sin datos reales ni operaciones externas</div>
   </div>
  </div>
 </>;
}


/* Explorador guiado: propuestas ilustrativas, sin diagnóstico automático ni IA conectada. */
function SolutionConfigurator() {
 const goals=[
  {id:'organizar',label:'Organizar información',icon:'layers',headline:'Centraliza lo importante',detail:'Un espacio digital puede organizar registros, archivos, tareas y responsables.',flow:['Captura de información','Vista compartida','Seguimiento de estados']},
  {id:'automatizar',label:'Automatizar tareas',icon:'workflow',headline:'Haz que los procesos avancen',detail:'Podemos conectar pasos repetitivos para reducir trabajo manual y facilitar revisiones.',flow:['Evento de entrada','Regla de automatización','Aviso o actualización']},
  {id:'analizar',label:'Entender mis datos',icon:'chart',headline:'Convierte datos en decisiones',detail:'Una vista clara permite explorar indicadores, tendencias y puntos que requieren atención.',flow:['Fuentes de datos','Indicadores relevantes','Panel de seguimiento']},
  {id:'crear',label:'Crear una plataforma',icon:'globe',headline:'Da forma a una idea digital',detail:'Diseñamos experiencias para que personas y equipos puedan consultar, solicitar o gestionar servicios.',flow:['Necesidad y usuarios','Prototipo de experiencia','Plataforma evolutiva']}
 ];
 const contexts=['Comercio y servicios','Logística y operaciones','Educación y formación','Organización o proyecto propio'];
 const [goal,setGoal]=useState(0);
 const [context,setContext]=useState(0);
 const [showPlan,setShowPlan]=useState(false);
 const selected=goals[goal];
 function carryToContact(){
  const note='Explorador de soluciones MUVORY (propuesta ilustrativa)\\nNecesidad: '+selected.label+'\\nÁrea: '+contexts[context]+'\\nPosible enfoque: '+selected.headline+'\\nEtapas sugeridas: '+selected.flow.join(' → ')+'.';
  window.dispatchEvent(new CustomEvent('muvory:diagnostic',{detail:note}));
  document.getElementById('contacto')?.scrollIntoView({behavior:'smooth'});
 }
 return <section className="section solution-explorer section-anchor" id="explorador">
  <div className="container">
   <div className="section-heading">
    <div><p className="section-kicker">EXPERIENCIA INTERACTIVA</p><h2>Cuéntanos el desafío. <em>Explora una solución.</em></h2></div>
    <p>Selecciona lo que quieres mejorar y descubre cómo podría comenzar un proyecto tecnológico. Todo es ilustrativo, sin datos reales.</p>
   </div>
   <div className="solution-configurator">
    <div className="solution-configurator-controls">
     <p className="solution-configurator-label">01 / ¿Qué necesitas conseguir?</p>
     <div className="solution-choice-grid" role="group" aria-label="Objetivo del proyecto">
      {goals.map((item,i)=><button type="button" key={item.id} aria-pressed={goal===i} onClick={()=>{setGoal(i);setShowPlan(false);}}><Icon name={item.icon} size={20}/><span>{item.label}</span></button>)}
     </div>
     <label className="solution-context-label" htmlFor="solution-context">02 / ¿En qué área lo aplicarías?</label>
     <select id="solution-context" value={context} onChange={e=>{setContext(Number(e.target.value));setShowPlan(false);}}>
      {contexts.map((label,i)=><option key={label} value={i}>{label}</option>)}
     </select>
     <button type="button" className="solution-preview-button" onClick={()=>setShowPlan(v=>!v)} aria-expanded={showPlan} aria-controls="solution-plan">{showPlan?'Ocultar propuesta':'Explorar propuesta'} <Icon name="arrow" size={17}/></button>
    </div>
    <div className="solution-configurator-preview" id="solution-plan" aria-live="polite">
     <div className="solution-configurator-top"><span>POSIBLE SOLUCIÓN DIGITAL</span><span>DEMO · ILUSTRATIVA</span></div>
     <div className="solution-configurator-heading"><Icon name={selected.icon} size={27}/><div><h3>{selected.headline}</h3><p>{contexts[context]}</p></div></div>
     <p className="solution-configurator-summary">{selected.detail}</p>
     {showPlan?<div className="solution-configurator-flow">{selected.flow.map((part,i)=><div className="solution-configurator-step" key={part}><small>ETAPA 0{i+1}</small><strong>{part}</strong></div>)}</div>:<div className="solution-configurator-empty"><Icon name="spark" size={28}/><p>Selecciona tus preferencias y pulsa «Explorar propuesta» para visualizar un posible recorrido.</p></div>}
     {showPlan&&<button type="button" className="solution-contact-button" onClick={carryToContact}>Consultar por esta idea <Icon name="arrowUp" size={17}/></button>}
     <p className="solution-configurator-note">Ejemplo conceptual: no representa un presupuesto, desarrollo realizado ni un resultado garantizado.</p>
    </div>
   </div>
  </div>
 </section>;
}

function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
  const [context,setContext]=useState('');
  useEffect(()=>{const listener=e=>setContext(prev=>[prev,e.detail].filter(Boolean).join('\n\n').slice(0,3000));window.addEventListener('muvory:diagnostic',listener);return ()=>window.removeEventListener('muvory:diagnostic',listener);},[]);

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
      setContext('');
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
          <option>Software a medida</option>
          <option>Dashboards y analítica</option>
          <option>Automatización de procesos</option>
          <option>Agentes de inteligencia artificial</option>
          <option>Desarrollo web</option>
          <option>Necesito orientación</option>
        </select>
      </label>
      <label>Cuéntanos sobre tu proyecto
        <textarea value={context} onChange={e=>setContext(e.target.value)} name="mensaje" placeholder="¿Qué te gustaría crear o resolver?" rows="4" minLength="10" maxLength="3000" required />
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
              <h1>Tus desafíos merecen <span>algo más que una solución genérica.</span></h1>
              <p className="hero-description">Creamos software a medida, plataformas digitales, automatizaciones y soluciones con IA para convertir necesidades concretas en herramientas útiles.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#explorador">Explora tu solución <Icon name="arrowUp" size={18}/></a>
                <a className="button button-outline" href="#contacto">Cuéntanos tu idea <Icon name="arrow" size={18}/></a>
              </div>
              <p className="hero-experience-hint"><Icon name="spark" size={15}/> Prueba las opciones del laboratorio interactivo.</p>
            </div>
            <HeroExperience />
          </div>
        </section>

        <section className="section section-solutions section-anchor" id="soluciones">
          <div className="container">
            <div className="section-heading">
              <div><p className="section-kicker">QUÉ HACEMOS</p><h2>Soluciones digitales <em>de alto impacto.</em></h2></div>
              <p>Desde una herramienta puntual hasta una plataforma integral, diseñamos tecnología útil para cada necesidad.</p>
            </div>
            <div className="capability-grid">{capabilities.map(item=><article className={'capability-card capability-'+item.kind} key={item.kind}><div className="capability-heading"><Icon name={item.icon} size={23}/><h3>{item.title}</h3></div><p>{item.description}</p><CapabilityDemo kind={item.kind}/><a className="capability-link" href="#contacto">Conversemos <Icon name="arrowUp" size={15}/></a></article>)}</div><p className="cases-disclaimer">Demostraciones interactivas con datos y respuestas de ejemplo. No son sistemas conectados en vivo.</p></div>
        </section>

        <section className="section section-cases section-anchor" id="casos">
          <div className="container">
            <div className="cases-head">
              <div><p className="section-kicker">TECNOLOGÍA APLICADA</p><h2>Tecnología aplicada <em>a desafíos reales.</em></h2></div>
              <p>Explora aplicaciones posibles en diferentes áreas. Cada solución se adapta a su contexto y alcance.</p>
            </div>
            <Applications />
            <p className="cases-disclaimer">Aplicaciones ilustrativas. No representan clientes ni proyectos terminados.</p>
          </div>
        </section>

        <section className="section section-agents section-anchor" id="agentes">
          <div className="container agents-layout">
            <div className="agents-intro">
              <p className="section-kicker">INTELIGENCIA ARTIFICIAL APLICADA</p>
              <h2>Agentes de IA <em>para diferentes necesidades.</em></h2>
              <p>Diseñamos asistentes para orientar consultas, organizar información y apoyar procesos, con acceso autorizado y supervisión humana cuando corresponde.</p>
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
              <div><p className="section-kicker">DONDE GENERAMOS VALOR</p><h2>La tecnología se adapta <em>a cada desafío.</em></h2></div>
              <p>Trabajamos con distintas áreas, actividades y organizaciones. Estos sectores son ejemplos, no los límites de lo que podemos desarrollar.</p>
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

        <SolutionConfigurator />

        <section className="section section-contact section-anchor" id="contacto">
          <div className="container contact-layout">
            <div className="contact-copy">
              <p className="section-kicker">HABLEMOS</p>
              <h2>Tu próximo paso digital <em>comienza con una conversación.</em></h2>
              <p>Cuéntanos qué quieres crear, mejorar o automatizar. Revisaremos tu necesidad y te ayudaremos a identificar un primer paso concreto.</p>
              <div className="contact-promise"><Icon name="check" size={19}/> Conversación inicial sin compromiso</div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main"><Brand footer/><p>Diseñamos tecnología para resolver desafíos reales en distintas áreas.</p><a href="#inicio">Volver arriba ↑</a></div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} MUVORY Technologies. Nombre comercial sujeto a validación.</span><span>Software · Automatización · IA</span></div>
      </footer>
      <CommercialAssistant />
    </>
  );
}

export default App;
