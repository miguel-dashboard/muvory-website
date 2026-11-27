import { useState } from 'react';
import Icon from './Icon.jsx';
import './capabilities.css';

const capabilities = [
  { kind: 'software', title: 'Software a medida', icon: 'layers', description: 'Información, personas y procesos en un sistema que se adapta a tu forma de trabajar.', cta: 'Hablemos de tu sistema' },
  { kind: 'data', title: 'Inteligencia de datos', icon: 'chart', description: 'Una visión clara de tus datos para entender lo que ocurre y decidir el siguiente paso.', cta: 'Exploremos tus datos' },
  { kind: 'flow', title: 'Automatización', icon: 'workflow', description: 'Conectamos herramientas y tareas para que la información avance con menos trabajo manual.', cta: 'Conectemos tus procesos' },
  { kind: 'ai', title: 'Inteligencia artificial', icon: 'spark', description: 'Asistentes que orientan, clasifican y apoyan procesos, con información autorizada y revisión humana.', cta: 'Conversemos sobre IA' },
  { kind: 'web', title: 'Web y plataformas', icon: 'globe', description: 'Experiencias digitales para presentar una idea, ofrecer servicios y conectar con las personas.', cta: 'Demos forma a tu plataforma' },
];

function DemoTabs({ label, options, selected, onSelect }) {
  return <div className="cap-tabs" role="group" aria-label={label}>
    {options.map((option, index) => <button key={option} type="button" aria-pressed={selected === index} onClick={() => onSelect(index)}>{option}</button>)}
  </div>;
}

function SoftwareDemo() {
  const [view, setView] = useState(0);
  const [selected, setSelected] = useState(0);
  const [reviewed, setReviewed] = useState({});
  const records = [
    ['Producto A', 'Producto B', 'Producto C'],
    ['Cliente A', 'Cliente B', 'Cliente C'],
    ['Pedido 001', 'Pedido 002', 'Pedido 003'],
  ];
  const record = records[view][selected];
  const recordKey = `${view}-${selected}`;
  return <>
    <DemoTabs label="Vista de gestión" options={['Productos', 'Clientes', 'Pedidos']} selected={view} onSelect={index => { setView(index); setSelected(0); }} />
    <div className="cap-records" role="group" aria-label="Registros de ejemplo">
      {records[view].map((name, index) => <button key={name} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>
        <Icon name="layers" size={16} /><span>{name}</span><span className={reviewed[`${view}-${index}`] ? 'cap-record-state is-done' : 'cap-record-state'}>{reviewed[`${view}-${index}`] ? 'Revisado' : 'Pendiente'}</span>
      </button>)}
    </div>
    <p className="cap-record-selection" role="status">{record}: <strong>{reviewed[recordKey] ? 'revisión completada' : 'por revisar'}</strong></p>
    <button className="cap-action" type="button" onClick={() => setReviewed(previous => ({ ...previous, [recordKey]: !previous[recordKey] }))}>
      <Icon name="check" size={16} />{reviewed[recordKey] ? 'Volver a pendiente' : 'Marcar como revisado'}
    </button>
    <p className="cap-note">Cambios de ejemplo. Se conservan hasta recargar.</p>
  </>;
}

function DataDemo() {
  const [view, setView] = useState(0);
  const [selected, setSelected] = useState(4);
  const views = ['Ventas', 'Clientes', 'Inventario'];
  const values = [[32, 52, 42, 70, 86], [46, 36, 68, 48, 79], [82, 64, 78, 50, 63]];
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May'];
  return <>
    <DemoTabs label="Indicador del gráfico" options={views} selected={view} onSelect={setView} />
    <div className="cap-chart-readout" aria-live="polite" aria-atomic="true"><span>{views[view]} · {months[selected]}</span><strong>{values[view][selected]}<small> unidades de ejemplo</small></strong></div>
    <div className="cap-bars" role="group" aria-label={`Gráfico ilustrativo de ${views[view]}. Selecciona un mes para ver su valor.`}>
      {values[view].map((value, index) => <button key={months[index]} type="button" aria-label={`${months[index]}: ${value} unidades de ejemplo`} aria-pressed={selected === index} onClick={() => setSelected(index)}>
        <span className="cap-bar-track"><span className="cap-bar" style={{ height: `${value}%` }} /></span><span className="cap-bar-label">{months[index]}</span>
      </button>)}
    </div>
    <p className="cap-chart-hint">Selecciona una barra para explorar el dato.</p>
    <p className="cap-note">Datos ilustrativos. No representan resultados reales.</p>
  </>;
}

function FlowDemo() {
  const [step, setStep] = useState(0);
  const stages = ['Solicitud recibida', 'Información validada', 'Registro actualizado'];
  return <>
    <div className="cap-flow-intro"><Icon name="workflow" size={18} /><span>De la solicitud al registro</span></div>
    <ol className="cap-flow">
      {stages.map((stage, index) => <li key={stage} className={step > index ? 'is-complete' : step === index ? 'is-current' : ''} aria-current={step === index ? 'step' : undefined}>
        <span className="cap-flow-marker">{step > index ? <Icon name="check" size={15} /> : index + 1}</span><span>{stage}<small>{step > index ? 'Completado' : step === index ? 'Siguiente paso' : 'En espera'}</small></span>
      </li>)}
    </ol>
    <button type="button" className="cap-action" onClick={() => setStep(current => current === 3 ? 0 : current + 1)}>{step === 3 ? 'Reiniciar flujo' : 'Ejecutar siguiente paso'}</button>
    <p className="cap-note" role="status">{step === 3 ? 'Flujo simulado completado.' : `${step} de 3 pasos completados.`} Sin integraciones activas.</p>
  </>;
}

function AiDemo() {
  const [view, setView] = useState(0);
  const [question, setQuestion] = useState(-1);
  const initial = [
    'Hola. Puedo mostrarte cómo un asistente orientaría una consulta sobre tus servicios.',
    'Ejemplo: una consulta sobre un pedido se clasifica como «Seguimiento» para revisión humana.',
    'Ejemplo: un asistente puede recoger preferencias de horario. La disponibilidad debe confirmarse.',
  ];
  const questions = ['¿Qué puedes resolver?', '¿Cómo comenzamos?', '¿Necesito un sistema grande?'];
  const answers = [
    'Podemos explorar atención de consultas, clasificación de información y apoyo a procesos. El alcance se define con el equipo.',
    'Primero entendemos la necesidad y la información disponible. Luego definimos qué puede hacer el asistente y cuándo debe intervenir una persona.',
    'No necesariamente. Podemos evaluar una herramienta acotada y ampliarla cuando nuevas funciones aporten valor.',
  ];
  return <>
    <DemoTabs label="Función del asistente de ejemplo" options={['Atender', 'Clasificar', 'Agendar']} selected={view} onSelect={index => { setView(index); setQuestion(-1); }} />
    <div className="cap-chat" aria-live="polite" aria-atomic="true"><Icon name="spark" size={22} /><p>{question < 0 ? initial[view] : answers[question]}</p></div>
    <div className="cap-questions" role="group" aria-label="Preguntas para la conversación simulada">
      {questions.map((text, index) => <button key={text} type="button" aria-pressed={question === index} onClick={() => setQuestion(index)}>{text}</button>)}
    </div>
    <p className="cap-note">Respuestas predefinidas. No hay IA conectada.</p>
  </>;
}

function WebDemo() {
  const [view, setView] = useState(0);
  return <>
    <DemoTabs label="Tamaño de la plataforma ilustrativa" options={['Escritorio', 'Móvil']} selected={view} onSelect={setView} />
    <div className="cap-web-stage">
      <div className={`cap-browser ${view === 1 ? 'is-mobile' : ''}`} role="img" aria-label={`Ejemplo de plataforma digital en vista ${view === 1 ? 'móvil' : 'de escritorio'}`}>
        <div className="cap-browser-toolbar" aria-hidden="true"><span /><span /><span /><small>Tu plataforma</small></div>
        <div className="cap-site-preview" aria-hidden="true"><div className="cap-site-nav"><Icon name="globe" size={17} /><span>Tu proyecto</span><i /></div><div className="cap-site-hero"><span>HECHO PARA LAS PERSONAS</span><strong>Una idea.<br />Nuevas posibilidades.</strong><div className="cap-site-decoration"><span /><span /><span /></div></div><div className="cap-site-content"><span>Conecta</span><span>Organiza</span><span>Crece</span></div></div>
      </div>
    </div>
    <p className="cap-web-status" role="status">{view === 1 ? 'La misma experiencia, adaptada a una pantalla móvil.' : 'Una experiencia clara, desde cualquier dispositivo.'}</p>
    <p className="cap-note">Prototipo visual. No es un sitio de cliente.</p>
  </>;
}

const demos = { software: SoftwareDemo, data: DataDemo, flow: FlowDemo, ai: AiDemo, web: WebDemo };

export default function Capabilities() {
  return <>
    <div className="cap-grid">
      {capabilities.map(item => {
        const Demo = demos[item.kind];
        return <article className={`cap-card cap-card-${item.kind}`} key={item.kind} aria-labelledby={`cap-title-${item.kind}`}>
          <div className="cap-heading"><Icon name={item.icon} size={22} /><h3 id={`cap-title-${item.kind}`}>{item.title}</h3></div>
          <p className="cap-description">{item.description}</p>
          <div className="cap-demo"><span className="cap-demo-label">DEMO INTERACTIVA</span><Demo /></div>
          <a className="cap-link" href="#contacto" onClick={() => window.dispatchEvent(new CustomEvent('muvory:diagnostic', { detail: `Me interesa ${item.title.toLowerCase()}. Exploré su demostración ilustrativa en MUVORY.` }))}>{item.cta}</a>
        </article>;
      })}
    </div>
    <p className="cap-disclaimer">Explora las demos: todas usan datos de ejemplo y funcionan localmente en tu navegador.</p>
  </>;
}
