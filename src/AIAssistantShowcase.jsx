import { useEffect, useRef, useState } from 'react';
import './assistants.css';

const modes = [
  { name: 'Atención', purpose: 'Orientar con información autorizada.', question: '¿Cómo podría atender consultas?', answer: 'Un asistente puede consultar contenidos aprobados, responder preguntas frecuentes y derivar las solicitudes que requieren a una persona. Tú defines qué información utiliza y cuándo debe pedir ayuda.', outcome: 'Consulta comprendida · respuesta orientativa · derivación humana' },
  { name: 'Clasificación', purpose: 'Dar orden a solicitudes y documentos.', question: '¿Cómo organizaría una solicitud?', answer: 'Por ejemplo, una consulta sobre el estado de un pedido puede clasificarse como seguimiento y prepararse para el equipo correspondiente. La prioridad y el destino se validan según las reglas que acuerdes.', outcome: 'Solicitud de ejemplo · categoría sugerida · revisión del equipo' },
  { name: 'Análisis', purpose: 'Hacer más fácil explorar información.', question: '¿Cómo me ayudaría a entender datos?', answer: 'Puede resumir información disponible, señalar variaciones y ayudarte a formular preguntas. Los datos deben estar autorizados y los resultados se contrastan antes de tomar decisiones.', outcome: 'Datos autorizados · síntesis sugerida · validación humana' },
];

function IntelligenceCore({ processing, selected, paused, onToggleMotion, reactionToken }) {
  const mode = modes[selected];
  return (
    <div className={'intelligence-core mv-robot mv-robot-mode-' + selected + (processing ? ' is-processing' : '') + (paused ? ' is-paused' : '')}>
      <div className="mv-robot-image-frame">
        <span className="mv-robot-aura" aria-hidden="true"/>
        <img
          className="mv-robot-art"
          src="/muvory-ai-assistant.avif"
          alt="Asistente tecnológico original de MUVORY: robot blanco metálico con visor oscuro y ojos azules, interactuando con un panel holográfico."
          width="400"
          height="320"
          loading="lazy"
          decoding="async"
        />
        <span className="mv-ai-interface-glow" aria-hidden="true"/>
        <span className="mv-ai-interface-ripple" key={'reaction-' + reactionToken} aria-hidden="true"/>
        <span className="mv-robot-mode-badge" aria-hidden="true"><i/>{processing ? 'PROCESANDO' : mode.name.toUpperCase()}</span>
      </div>
      <div className="core-caption">
        <span>{processing ? 'Preparando una respuesta ilustrativa' : mode.purpose}</span>
        <small>Ilustración 3D original · respuestas simuladas</small>
        <button className="core-motion-toggle" type="button" aria-pressed={paused} onClick={onToggleMotion}>{paused ? 'Reanudar animación' : 'Pausar animación'}</button>
      </div>
    </div>
  );
}
export default function AIAssistantShowcase() {
  const [selected, setSelected] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reactionToken, setReactionToken] = useState(0);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  function selectMode(index) { clearTimeout(timer.current); setSelected(index); setProcessing(false); setAnswered(false); setReactionToken(value => value + 1); }
  function ask() {
    clearTimeout(timer.current); setAnswered(false); setProcessing(true); setReactionToken(value => value + 1);
    timer.current = setTimeout(() => { setProcessing(false); setAnswered(true); }, 1000);
  }
  const mode = modes[selected];
  return (
    <div className="ai-showcase">
      <div className="section-heading ai-showcase-heading"><div><p className="section-kicker">INTELIGENCIA ARTIFICIAL APLICADA</p><h2>Inteligencia útil.<br /><em>Bajo tu control.</em></h2></div><p>Asistentes que orientan, organizan y apoyan procesos. Con información autorizada, límites claros y supervisión humana.</p></div>
      <div className="ai-showcase-stage">
        <IntelligenceCore processing={processing} selected={selected} paused={paused} reactionToken={reactionToken} onToggleMotion={() => setPaused(value => !value)} />
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
