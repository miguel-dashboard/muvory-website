import { useEffect, useRef, useState } from 'react';
import './assistants.css';

const topics = [
  ['Comercio', '¿Cómo controlas actualmente ventas, productos e inventario?', 'Un sistema a medida puede centralizar esos registros. Un dashboard puede ayudarte a revisar ventas e inventario.'],
  ['Inmobiliaria', '¿Cómo recibes y haces seguimiento a los interesados en tus propiedades?', 'Una web conectada a un CRM puede organizar consultas, y un asistente puede orientar sobre propiedades aprobadas.'],
  ['Abogados y servicios', '¿Qué tareas administrativas o documentales te consumen más tiempo?', 'Podemos explorar gestión documental, clasificación de solicitudes y automatización administrativa con revisión profesional.'],
  ['Logística', '¿Qué proceso operativo te gustaría controlar mejor?', 'Podemos explorar sistemas de seguimiento, indicadores operacionales y automatización de registros.'],
  ['Educación y formación', '¿Qué experiencia, contenido o proceso de aprendizaje quieres mejorar?', 'Podemos explorar plataformas educativas, gestión de inscripciones y herramientas digitales para organizar contenidos y actividades.'],
  ['Otros proyectos', '¿Qué te gustaría crear, organizar o mejorar con tecnología?', 'Podemos evaluar software a medida, analítica, automatización o soluciones web según el objetivo de tu proyecto.'],
];
const needs = ['Organizar información', 'Ahorrar trabajo manual', 'Conectar con usuarios', 'Mejorar decisiones'];
const welcome = { role: 'assistant', text: 'Exploremos cómo la tecnología puede ayudarte. ¿En qué área o tipo de proyecto trabajas?' };

function AssistantSymbol() {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z" /><path d="m8 10 4 2 4-2M12 12v5" /></svg>;
}

export default function CommercialAssistant() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState(0);
  const [topic, setTopic] = useState(0);
  const [messages, setMessages] = useState([welcome]);
  const [detail, setDetail] = useState('');
  const [selected, setSelected] = useState('');
  const dialog = useRef(null);
  const conversation = useRef(null);
  const launcher = useRef(null);

  useEffect(() => {
    if (open && !dialog.current.open) dialog.current.showModal();
    if (!open && dialog.current.open) dialog.current.close();
  }, [open]);
  useEffect(() => {
    if (open && conversation.current) conversation.current.scrollTop = conversation.current.scrollHeight;
  }, [messages, stage, open]);

  function finish() {
    setOpen(false);
    dialog.current.close();
    launcher.current?.focus({ preventScroll: true });
  }
  function add(user, answer) { setMessages(current => [...current, { role: 'user', text: user }, { role: 'assistant', text: answer }]); }
  function chooseSector(index) { setTopic(index); add(topics[index][0], topics[index][1]); setStage(1); }
  function chooseNeed(need) { setSelected(need); add(need, 'Si quieres, describe brevemente tu proceso actual. Evita nombres, datos de clientes o documentos confidenciales.'); setStage(2); }
  function diagnose(event) {
    event.preventDefault();
    add(detail.trim() || 'Prefiero conversarlo con el equipo', topics[topic][2] + ' El alcance y presupuesto se definen con el equipo. Puedes llevar este contexto al formulario.');
    setStage(3);
  }
  function reset() { setStage(0); setTopic(0); setSelected(''); setDetail(''); setMessages([welcome]); }
  function contact() {
    const note = ['Orientación guiada MUVORY', 'Área: ' + topics[topic][0], 'Objetivo: ' + selected, detail.trim() ? 'Contexto: ' + detail.trim() : ''].filter(Boolean).join('\n');
    window.dispatchEvent(new CustomEvent('muvory:diagnostic', { detail: note }));
    finish();
    document.querySelector('#contacto textarea')?.focus({ preventScroll: true });
    document.getElementById('contacto')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  return (
    <>
      <div className="commercial-assistant-dock">
        <span className="assistant-dock-hint">¿Por dónde empezar?</span>
        <button ref={launcher} className="commercial-assistant-launch" type="button" aria-label="Abrir asistente de orientación MUVORY" aria-haspopup="dialog" aria-expanded={open} aria-controls="muvory-assistant-panel" onClick={() => setOpen(true)}><AssistantSymbol /><span>Ayuda</span></button>
      </div>
      <dialog ref={dialog} id="muvory-assistant-panel" className="commercial-assistant-panel" aria-labelledby="commercial-assistant-title" onKeyDown={event => {
        if (event.key !== 'Tab') return;
        const controls = [...dialog.current.querySelectorAll('button:not(:disabled), textarea, input, a[href]')];
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }} onCancel={event => { event.preventDefault(); finish(); }} onClose={() => setOpen(false)}>
        <header className="commercial-assistant-header"><AssistantSymbol /><div><strong id="commercial-assistant-title">Exploremos tu idea</strong><small>Orientación guiada MUVORY</small></div><button type="button" onClick={finish} aria-label="Cerrar asistente">×</button></header>
        <p className="commercial-assistant-disclosure">Respuestas predefinidas. Sin IA en vivo ni envío automático de datos.</p>
        <div ref={conversation} className="commercial-assistant-conversation">
          <div role="log" aria-live="polite" aria-relevant="additions" className="commercial-assistant-messages">{messages.map((message, index) => <p key={index} className={'commercial-message commercial-message-' + message.role}>{message.text}</p>)}</div>
          {stage === 0 && <div className="commercial-assistant-options" role="group" aria-label="Área del proyecto">{topics.map((item, index) => <button type="button" key={item[0]} onClick={() => chooseSector(index)}>{item[0]}</button>)}</div>}
          {stage === 1 && <div className="commercial-assistant-options" role="group" aria-label="Objetivo del proyecto">{needs.map(need => <button key={need} type="button" onClick={() => chooseNeed(need)}>{need}</button>)}</div>}
          {stage === 2 && <form className="commercial-assistant-detail" onSubmit={diagnose}><label htmlFor="assistant-context">Contexto (opcional)</label><textarea id="assistant-context" maxLength={500} value={detail} onChange={event => setDetail(event.target.value)} placeholder="Ej.: usamos planillas para organizar pedidos." /><button className="commercial-assistant-primary" type="submit">Ver orientación</button></form>}
          {stage === 3 && <button className="commercial-assistant-primary" type="button" onClick={contact}>Llevar contexto al formulario</button>}
        </div>
        <footer className="commercial-assistant-footer"><button type="button" onClick={reset}>Reiniciar</button><span>El contexto permanece en esta página.</span></footer>
      </dialog>
    </>
  );
}
