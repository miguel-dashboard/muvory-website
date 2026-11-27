import { useEffect, useId, useRef, useState } from 'react';
import './assistants.css';

const modes = [
  { name: 'Atención', purpose: 'Orientar con información autorizada.', question: '¿Cómo podría atender consultas?', answer: 'Un asistente puede consultar contenidos aprobados, responder preguntas frecuentes y derivar las solicitudes que requieren a una persona. Tú defines qué información utiliza y cuándo debe pedir ayuda.', outcome: 'Consulta comprendida · respuesta orientativa · derivación humana' },
  { name: 'Clasificación', purpose: 'Dar orden a solicitudes y documentos.', question: '¿Cómo organizaría una solicitud?', answer: 'Por ejemplo, una consulta sobre el estado de un pedido puede clasificarse como seguimiento y prepararse para el equipo correspondiente. La prioridad y el destino se validan según las reglas que acuerdes.', outcome: 'Solicitud de ejemplo · categoría sugerida · revisión del equipo' },
  { name: 'Análisis', purpose: 'Hacer más fácil explorar información.', question: '¿Cómo me ayudaría a entender datos?', answer: 'Puede resumir información disponible, señalar variaciones y ayudarte a formular preguntas. Los datos deben estar autorizados y los resultados se contrastan antes de tomar decisiones.', outcome: 'Datos autorizados · síntesis sugerida · validación humana' },
];

function IntelligenceCore({ processing, selected, paused, onToggleMotion }) {
  const id = useId().replaceAll(':', '');
  return (
    <div className={'intelligence-core' + (processing ? ' is-processing' : '') + (paused ? ' is-paused' : '')}>
      <svg className="intelligence-core-art" viewBox="0 0 460 400" role="img" aria-label="Núcleo holográfico abstracto del asistente demostrativo">
        <defs>
          <radialGradient id={`${id}-halo`}><stop stopColor="#5ccdc4" stopOpacity=".16" /><stop offset="1" stopColor="#5ccdc4" stopOpacity="0" /></radialGradient>
          <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8ce8d9" stopOpacity=".22" /><stop offset=".48" stopColor="#236370" stopOpacity=".28" /><stop offset="1" stopColor="#071722" stopOpacity=".9" /></linearGradient>
          <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d3fff1" /><stop offset=".5" stopColor="#6ad5cc" stopOpacity=".45" /><stop offset="1" stopColor="#92eadd" stopOpacity=".1" /></linearGradient>
          <linearGradient id={`${id}-beam`}><stop stopColor="#5dc9c5" stopOpacity="0" /><stop offset=".5" stopColor="#caffef" /><stop offset="1" stopColor="#5dc9c5" stopOpacity="0" /></linearGradient>
        </defs>
        <circle cx="230" cy="190" r="195" fill={`url(#${id}-halo)`} />
        <g className="core-orbit" fill="none" stroke="#82e1d3" strokeWidth=".7"><ellipse cx="230" cy="195" rx="182" ry="63" transform="rotate(-24 230 195)" opacity=".3" /><ellipse cx="230" cy="195" rx="167" ry="55" transform="rotate(30 230 195)" opacity=".12" /></g>
        <g className="core-suspension">
          <path d="M230 63 316 110 330 231 279 290 230 319 181 290 130 231 144 110Z" fill={`url(#${id}-glass)`} stroke={`url(#${id}-edge)`} strokeWidth="1.5" />
          <path d="m230 63 0 256M144 110l86 43 86-43M130 231l100 88 100-88M144 110l37 180M316 110l-37 180" fill="none" stroke="#92eadd" opacity=".18" />
          <path d="m230 98 63 35 9 87-38 44-34 19-34-19-38-44 9-87Z" fill="#071c28" fillOpacity=".8" stroke="#6bb8b4" strokeOpacity=".36" />
          <path d="m171 164 59 17 59-17-8 54-51 24-51-24Z" fill="#153944" stroke="#96e7d7" strokeOpacity=".25" />
          <path className="core-light" d="m181 185 49 13 49-13" stroke={`url(#${id}-beam)`} strokeWidth="3" fill="none" />
          <path d="m207 249 23 12 23-12" stroke="#8ae6d8" strokeOpacity=".5" fill="none" />
          <path className="core-scan" d="M156 158h148" stroke={`url(#${id}-beam)`} strokeWidth="1" />
          <g fill="#b1f7e6"><circle cx="230" cy="63" r="2.5" /><circle cx="144" cy="110" r="2" opacity=".55" /><circle cx="316" cy="110" r="2" opacity=".55" /><circle cx="230" cy="319" r="2.5" opacity=".55" /></g>
        </g>
        <ellipse cx="230" cy="351" rx="72" ry="8" fill="none" stroke="#82e1d3" opacity=".2" />
        <path d="M63 67h24M63 67v24M397 67h-24M397 67v24M63 322h24M63 322v-24M397 322h-24M397 322v-24" stroke="#82e1d3" strokeOpacity=".3" fill="none" />
      </svg>
      <div className="core-caption"><span>{processing ? 'Preparando ejemplo' : modes[selected].purpose}</span><small>Visualización conceptual</small><button className="core-motion-toggle" type="button" aria-pressed={paused} onClick={onToggleMotion}>{paused ? 'Reanudar animación' : 'Pausar animación'}</button></div>
    </div>
  );
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
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650;
    timer.current = setTimeout(() => { setProcessing(false); setAnswered(true); }, delay);
  }
  const mode = modes[selected];
  return (
    <div className="ai-showcase">
      <div className="section-heading ai-showcase-heading"><div><p className="section-kicker">INTELIGENCIA ARTIFICIAL APLICADA</p><h2>Inteligencia útil.<br /><em>Bajo tu control.</em></h2></div><p>Asistentes que orientan, organizan y apoyan procesos. Con información autorizada, límites claros y supervisión humana.</p></div>
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
