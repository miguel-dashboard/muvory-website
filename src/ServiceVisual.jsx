import { useState } from 'react';
import Icon from './Icon.jsx';

const modes = [
  {title:'Organizar',caption:'Un sistema claro para seguir cada actividad',tag:'SOFTWARE',icon:'layers'},
  {title:'Conectar',caption:'Del formulario a la acción siguiente',tag:'AUTOMATIZACIÓN',icon:'workflow'},
  {title:'Entender',caption:'Información útil para tomar decisiones',tag:'DATOS',icon:'chart'},
];

export function StudioPreview(){
  const [mode,setMode] = useState(0);
  const selected=modes[mode];
  return <div className="sv-studio" aria-label="Explorar ejemplos de soluciones MUVORY">
    <div className="sv-studio-head">
      <div><span className="sv-studio-led"/><span>MUVORY / STUDIO</span></div>
      <span>VISTA ILUSTRATIVA</span>
    </div>
    <div className="sv-studio-tabs" role="group" aria-label="Tipo de solución">
      {modes.map((item,index)=><button key={item.title} type="button" aria-pressed={mode===index} onClick={()=>setMode(index)}>
        <Icon name={item.icon} size={17}/>{item.title}
      </button>)}
    </div>
    <div className="sv-studio-content" aria-live="polite">
      <div className="sv-studio-caption"><small>{selected.tag} / EJEMPLO</small><strong>{selected.caption}</strong></div>
      {mode===0 ? <div className="sv-studio-tasks">
        {['Solicitud registrada','Responsable asignado','Seguimiento disponible'].map((text,index)=><div key={text}>
          <span className="sv-task-check"><Icon name="check" size={16}/></span>
          <span>{text}</span><small>{index===2?'Por revisar':'Listo'}</small>
        </div>)}
      </div> : mode===1 ? <div className="sv-studio-flow">
        {['Recibir','Validar','Notificar'].map((text,index)=><div key={text}><span>0{index+1}</span><strong>{text}</strong></div>)}
      </div> : <div className="sv-studio-data">
        {[34,52,42,65,57,79,68].map((n,index)=><div key={index}><span style={{height:n+'%'}}/><small>{index+1}</small></div>)}
      </div>}
    </div>
    <div className="sv-studio-foot"><span><Icon name="spark" size={15}/> Demostración conceptual sin datos reales</span><a href="/experience">Explorar <Icon name="arrow" size={16}/></a></div>
  </div>;
}

export default function ServiceVisual({service}){
  const name=service.slug;
  return <div className={'sv-unique-visual sv-unique-'+name} aria-hidden="true">
    {name==='software' && <div className="sv-mini-window">
      <div className="sv-mini-header"><span className="sv-mini-dots">● ● ●</span><span>Plataforma / Vista general</span></div>
      <div className="sv-mini-body">
        <div className="sv-mini-side"><i/><i/><i/><i/></div>
        <div className="sv-mini-work"><span className="sv-mini-label">ACTIVIDADES</span><div className="sv-mini-metrics"><b>Proyectos</b><b>Equipo</b><b>Estado</b></div>
          {['Solicitud registrada','Tarea asignada','Pendiente de revisión'].map((txt,i)=><div className="sv-mini-row" key={txt}><span><i/> {txt}</span><span>{i===2?'Revisar':'Activo'}</span></div>)}
        </div>
      </div>
    </div>}
    {name==='automatizacion' && <div className="sv-mini-automation">
      <div className="sv-mini-flowline"/>
      {['Entrada','Validación','Acción'].map((txt,i)=><div key={txt} className="sv-mini-flowcard">
        <span><Icon name={i===0?'layers':i===1?'check':'workflow'} size={18}/></span>
        <small>ETAPA 0{i+1}</small><strong>{txt}</strong>
      </div>)}
    </div>}
    {name==='inteligencia-artificial' && <div className="sv-mini-ai">
      <img src="/muvory-ai-assistant.avif" alt="" loading="lazy" width="240" height="225"/>
      <div className="sv-mini-ai-chip"><Icon name="spark" size={17}/><span>Asistente digital<br/><b>IA aplicada</b></span></div>
      <div className="sv-mini-ai-bubble">¿Cómo puedo ayudarte?</div>
    </div>}
    {name==='datos' && <div className="sv-mini-analytics">
      <div className="sv-mini-analytics-head"><span>Panel de indicadores</span><Icon name="chart" size={20}/></div>
      <div className="sv-mini-bars">{[31,48,40,63,54,77,67,90].map((value,i)=><span key={i} style={{height:value+'%'}}/>)}</div>
      <div className="sv-mini-bottom"><span>01 / Periodo</span><span>Datos ilustrativos</span></div>
    </div>}
    {name==='plataformas' && <div className="sv-mini-site">
      <div className="sv-mini-site-top"><span>● ● ●</span><span>Tu plataforma</span></div>
      <div className="sv-mini-site-hero"><small>UNA EXPERIENCIA DIGITAL</small><strong>Diseñada para conectar.</strong><span/></div>
      <div className="sv-mini-site-cards"><i/><i/><i/></div>
    </div>}
  </div>;
}
