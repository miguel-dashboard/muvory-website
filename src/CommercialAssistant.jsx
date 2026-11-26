import { useState, useEffect, useRef } from 'react';

const topics = [
 ['Comercio','¿Cómo controlas actualmente ventas, productos e inventario?','Un sistema comercial a medida puede centralizar esos registros. Un dashboard puede ayudarte a revisar ventas e inventario.'],
 ['Inmobiliaria','¿Cómo recibes y haces seguimiento a los interesados en tus propiedades?','Una web conectada a un CRM puede organizar prospectos, y un agente puede orientar consultas sobre propiedades aprobadas.'],
 ['Abogados y servicios','¿Qué tareas administrativas o documentales te consumen más tiempo?','Podemos explorar gestión documental, clasificación de solicitudes y automatización administrativa con revisión profesional.'],
 ['Logística','¿Qué proceso operativo te gustaría controlar mejor?','Podemos explorar sistemas de seguimiento, indicadores operacionales y automatización de registros.'],
 ['Educación y formación','¿Qué experiencia, contenido o proceso de aprendizaje quieres mejorar?','Podemos explorar plataformas educativas, gestión de inscripciones y herramientas digitales para organizar contenidos y actividades.'],
 ['Otros proyectos','¿Qué te gustaría crear, organizar o mejorar con tecnología?','Podemos evaluar software a medida, analítica, automatización o soluciones web según el objetivo de tu proyecto.']
];
const needs=['Organizar información','Ahorrar trabajo manual','Conectar con usuarios','Mejorar decisiones'];
const welcome={role:'assistant',text:'Bienvenido a MUVORY. Exploremos cómo la tecnología puede ayudarte. ¿En qué área o tipo de proyecto trabajas?'};
export default function CommercialAssistant(){
 const [open,setOpen]=useState(false);
 const [stage,setStage]=useState(0);
 const [topic,setTopic]=useState(0);
 const [messages,setMessages]=useState([welcome]);
 const [detail,setDetail]=useState('');
 const [selected,setSelected]=useState('');
 const bottom=useRef(null), launcher=useRef(null), close=useRef(null);
 useEffect(()=>{if(open){bottom.current?.scrollIntoView({block:'nearest'});}},[messages,open]);
 useEffect(()=>{if(open)close.current?.focus();},[open]);
 function finish(){setOpen(false);launcher.current?.focus();}
 function add(user,answer){setMessages(m=>[...m,{role:'user',text:user},{role:'assistant',text:answer}]);}
 function chooseSector(i){setTopic(i);add(topics[i][0],topics[i][1]);setStage(1);}
 function chooseNeed(n){setSelected(n);add(n,'Gracias. Si quieres, describe brevemente tu proceso actual sin incluir nombres, datos de clientes ni documentos confidenciales.');setStage(2);}
 function diagnose(e){e.preventDefault();const value=detail.trim();add(value||'Prefiero conversarlo en una reunión',topics[topic][2]+' Para definir un alcance y presupuesto hace falta una conversación con nuestro equipo. Puedes llevar tu diagnóstico al formulario comercial.');setStage(3);}
 function reset(){setStage(0);setTopic(0);setSelected('');setDetail('');setMessages([welcome]);}
 function contact(){const note=['Diagnóstico guiado MUVORY','Sector: '+topics[topic][0],'Objetivo: '+selected,detail.trim()?'Contexto: '+detail.trim():''].filter(Boolean).join('\n');window.dispatchEvent(new CustomEvent('muvory:diagnostic',{detail:note}));finish();document.getElementById('contacto')?.scrollIntoView({behavior:'smooth'});}
 return <div className="muvory-assistant" onKeyDown={e=>{if(e.key==='Escape'&&open)finish();}}>
 <button ref={launcher} className="assistant-launch" type="button" aria-label={open?"Cerrar asistente comercial MUVORY":"Abrir asistente comercial MUVORY"} title="Explorar asistente comercial MUVORY" aria-expanded={open} aria-controls="muvory-assistant-panel" onClick={()=>open?finish():setOpen(true)}><span className="assistant-signal" aria-hidden="true">✧</span><span className="assistant-launch-copy">Explora MUVORY AI<small>Diagnóstico guiado</small></span></button>
 {open&&<section id="muvory-assistant-panel" className="assistant-panel" aria-label="Asistente comercial MUVORY">
 <header className="assistant-header"><span className="assistant-signal" aria-hidden="true">✧</span><div><strong>MUVORY AI</strong><small>Asistente comercial · demostración</small></div><button type="button" ref={close} onClick={finish} aria-label="Cerrar asistente">×</button></header>
 <div className="assistant-disclosure">Diagnóstico guiado con respuestas predefinidas. No hay IA en vivo ni envío automático de datos.</div>
 <div className="assistant-conversation" role="log" aria-live="polite">{messages.map((m,i)=><div key={i} className={'assistant-message assistant-'+m.role}>{m.text}</div>)}
 {stage===0&&<div className="assistant-options">{topics.map((t,i)=><button type="button" key={t[0]} onClick={()=>chooseSector(i)}>{t[0]}</button>)}</div>}
 {stage===1&&<div className="assistant-options">{needs.map(n=><button key={n} type="button" onClick={()=>chooseNeed(n)}>{n}</button>)}</div>}
 {stage===2&&<form className="assistant-detail" onSubmit={diagnose}><label htmlFor="assistant-context">Contexto (opcional)</label><textarea id="assistant-context" maxLength={500} value={detail} onChange={e=>setDetail(e.target.value)} placeholder="Ej.: usamos Excel para las ventas."/><button type="submit">Ver recomendación →</button></form>}
 {stage===3&&<button className="assistant-primary" type="button" onClick={contact}>Llevar diagnóstico al formulario →</button>}
 <div ref={bottom}/></div>
 <footer className="assistant-footer"><button type="button" onClick={reset}>Reiniciar conversación</button><span>No compartas información sensible.</span></footer>
 </section>}</div>;
}
