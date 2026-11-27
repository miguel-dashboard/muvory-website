import { useState } from 'react';
import Icon from './Icon.jsx';

export default function SolutionConfigurator() {
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
  const note='Explorador de soluciones MUVORY (propuesta ilustrativa)\nNecesidad: '+selected.label+'\nÁrea: '+contexts[context]+'\nPosible enfoque: '+selected.headline+'\nEtapas sugeridas: '+selected.flow.join(' → ')+'.';
  window.dispatchEvent(new CustomEvent('muvory:diagnostic',{detail:note}));
  document.getElementById('contacto')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 }
 return <section className="section solution-explorer section-anchor" id="explorador">
  <div className="container">
   <div className="section-heading">
    <div><p className="section-kicker">TU PUNTO DE PARTIDA</p><h2>Una idea inicial. <em>Un camino posible.</em></h2></div>
    <p>Selecciona lo que quieres mejorar y descubre cómo podría comenzar un proyecto tecnológico. Todo es ilustrativo, sin datos reales.</p>
   </div>
   <div className="solution-configurator">
    <div className="solution-configurator-controls">
     <p className="solution-configurator-label">¿Qué necesitas conseguir?</p>
     <div className="solution-choice-grid" role="group" aria-label="Objetivo del proyecto">
      {goals.map((item,i)=><button type="button" key={item.id} aria-pressed={goal===i} onClick={()=>{setGoal(i);setShowPlan(false);}}><Icon name={item.icon} size={20}/><span>{item.label}</span></button>)}
     </div>
     <label className="solution-context-label" htmlFor="solution-context">¿En qué área lo aplicarías?</label>
     <select id="solution-context" value={context} onChange={e=>{setContext(Number(e.target.value));setShowPlan(false);}}>
      {contexts.map((label,i)=><option key={label} value={i}>{label}</option>)}
     </select>
     <button type="button" className="solution-preview-button" onClick={()=>setShowPlan(v=>!v)} aria-expanded={showPlan} aria-controls="solution-plan">{showPlan?'Ocultar propuesta':'Explorar propuesta'}</button>
    </div>
    <div className="solution-configurator-preview" id="solution-plan" aria-live="polite">
     <div className="solution-configurator-top"><span>POSIBLE SOLUCIÓN DIGITAL</span><span>DEMO · ILUSTRATIVA</span></div>
     <div className="solution-configurator-heading"><Icon name={selected.icon} size={27}/><div><h3>{selected.headline}</h3><p>{contexts[context]}</p></div></div>
     <p className="solution-configurator-summary">{selected.detail}</p>
     {showPlan?<div className="solution-configurator-flow">{selected.flow.map((part,i)=><div className="solution-configurator-step" key={part}><small>ETAPA 0{i+1}</small><strong>{part}</strong></div>)}</div>:<div className="solution-configurator-empty"><Icon name="spark" size={28}/><p>Selecciona tus preferencias y pulsa «Explorar propuesta» para visualizar un posible recorrido.</p></div>}
     {showPlan&&<button type="button" className="solution-contact-button" onClick={carryToContact}>Consultar por esta idea</button>}
     <p className="solution-configurator-note">Ejemplo conceptual: no representa un presupuesto, desarrollo realizado ni un resultado garantizado.</p>
    </div>
   </div>
  </div>
 </section>;
}
