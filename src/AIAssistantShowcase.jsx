import { useEffect, useRef, useState } from 'react';
import './assistants.css';

const modes = [
  { name: 'Atención', purpose: 'Orientar con información autorizada.', question: '¿Cómo podría atender consultas?', answer: 'Un asistente puede consultar contenidos aprobados, responder preguntas frecuentes y derivar las solicitudes que requieren a una persona. Tú defines qué información utiliza y cuándo debe pedir ayuda.', outcome: 'Consulta comprendida · respuesta orientativa · derivación humana' },
  { name: 'Clasificación', purpose: 'Dar orden a solicitudes y documentos.', question: '¿Cómo organizaría una solicitud?', answer: 'Por ejemplo, una consulta sobre el estado de un pedido puede clasificarse como seguimiento y prepararse para el equipo correspondiente. La prioridad y el destino se validan según las reglas que acuerdes.', outcome: 'Solicitud de ejemplo · categoría sugerida · revisión del equipo' },
  { name: 'Análisis', purpose: 'Hacer más fácil explorar información.', question: '¿Cómo me ayudaría a entender datos?', answer: 'Puede resumir información disponible, señalar variaciones y ayudarte a formular preguntas. Los datos deben estar autorizados y los resultados se contrastan antes de tomar decisiones.', outcome: 'Datos autorizados · síntesis sugerida · validación humana' },
];

function IntelligenceCore({ processing, selected, paused, onToggleMotion }) {
  const mode = modes[selected];
  const nodes = [
    ['01','Entrada autorizada','Consulta o documento de ejemplo'],
    ['02','Motor de análisis',mode.name],
    ['03','Control humano','Validación antes de ejecutar']
  ];
  return <div className="studio-ai-pipeline">
    <div className="studio-top"><span><i/> MUVORY / INTELLIGENCE</span><span>SIMULACIÓN</span></div>
    <div className="studio-ai-architecture">
      {nodes.map(([number,title,description],index)=><div key={number} className={'studio-ai-node'+(index===1&&processing&&!paused?' is-processing':'')}><span>{number}</span><div><strong>{title}</strong><small>{description}</small></div><i aria-hidden="true"/></div>)}
      <p role="status">{processing?'Procesando ejemplo…':mode.purpose}</p>
      <button className="core-motion-toggle" type="button" aria-pressed={paused} onClick={onToggleMotion}>{paused?'Activar animación':'Pausar animación'}</button>
    </div>
  </div>;
}
export default function AIAssistantShowcase() {
  const [selected, setSelected] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  function selectMode(index) { clearTimeout(timer.current); setSelected(index); setProcessing(false); setAnswered(false); }
  function ask() {
    clearTimeout(timer.current); setAnswered(false); setProcessing(true);
    timer.current = setTimeout(() => { setProcessing(false); setAnswered(true); }, 1000);
  }
  const mode = modes[selected];
  return (
    <div className="ai-showcase">
      <div className="section-heading ai-showcase-heading"><div><p className="section-kicker">03 / INTELIGENCIA ARTIFICIAL APLICADA</p><h2>Inteligencia útil.<br /><em>Bajo tu control.</em></h2></div><p>Asistentes que orientan, organizan y apoyan procesos. Con información autorizada, límites claros y supervisión humana.</p></div>
      <div className="ai-showcase-stage">
        <IntelligenceCore processing={processing} selected={selected} paused={paused} onToggleMotion={() => setPaused(value => !value)} />
        <div className="ai-showcase-console">
          <div className="ai-console-label"><span>EXPLORA UN ASISTENTE</span><span className="ai-demo-badge">Demo guiada</span></div>
          <div className="ai-mode-selector" role="group" aria-label="Aplicación del asistente demostrativo">{modes.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} onClick={() => selectMode(index)}>{item.name}</button>)}</div>
          <h3>{mode.purpose}</h3>
          <button className="ai-example-question" type="button" onClick={ask} disabled={processing} aria-controls="ai-example-response">{mode.question}<span aria-hidden="true">?</span></button>
          <div className="ai-example-response" id="ai-example-response" aria-live="polite" aria-atomic="true" aria-busy={processing}><span className="ai-response-label">{processing ? 'PREPARANDO RESPUESTA' : answered ? 'RESPUESTA DE EJEMPLO' : 'PRUEBA LA DEMOSTRACIÓN'}</span><p>{processing ? 'Organizando una respuesta de ejemplo…' : answered ? mode.answer : 'Selecciona una aplicación y pulsa la pregunta para ver cómo podría ayudarte un asistente.'}</p>{answered && <p className="ai-response-outcome">{mode.outcome}</p>}</div>
          <p className="ai-simulation-note">Respuestas predefinidas. Esta demostración no usa IA generativa ni procesa tus datos.</p>
        </div>
      </div>
    </div>
  );
}
