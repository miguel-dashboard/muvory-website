import { useEffect, useId, useRef, useState } from 'react';
import './assistants.css';

const modes = [
  { name: 'Atención', purpose: 'Orientar con información autorizada.', question: '¿Cómo podría atender consultas?', answer: 'Un asistente puede consultar contenidos aprobados, responder preguntas frecuentes y derivar las solicitudes que requieren a una persona. Tú defines qué información utiliza y cuándo debe pedir ayuda.', outcome: 'Consulta comprendida · respuesta orientativa · derivación humana' },
  { name: 'Clasificación', purpose: 'Dar orden a solicitudes y documentos.', question: '¿Cómo organizaría una solicitud?', answer: 'Por ejemplo, una consulta sobre el estado de un pedido puede clasificarse como seguimiento y prepararse para el equipo correspondiente. La prioridad y el destino se validan según las reglas que acuerdes.', outcome: 'Solicitud de ejemplo · categoría sugerida · revisión del equipo' },
  { name: 'Análisis', purpose: 'Hacer más fácil explorar información.', question: '¿Cómo me ayudaría a entender datos?', answer: 'Puede resumir información disponible, señalar variaciones y ayudarte a formular preguntas. Los datos deben estar autorizados y los resultados se contrastan antes de tomar decisiones.', outcome: 'Datos autorizados · síntesis sugerida · validación humana' },
];

function IntelligenceCore({ processing, selected, paused, onToggleMotion }) {
  const id = useId().replaceAll(':', '');
  const expression = ['Atención', 'Clasificación', 'Análisis'][selected];
  return (
    <div className={'intelligence-core mv-robot' + (processing ? ' is-processing' : '') + (paused ? ' is-paused' : '') + ' mv-robot-mode-' + selected}>
      <div className="mv-robot-canvas">
        <svg className="intelligence-core-art" viewBox="0 0 460 400" role="img" aria-label={'Robot digital original MUVORY, visor oscuro y ojos turquesa brillantes. Modo ' + expression}>
          <defs>
            <radialGradient id={`${id}-halo`}><stop stopColor="#5ee9e2" stopOpacity=".21"/><stop offset="1" stopColor="#5ee9e2" stopOpacity="0"/></radialGradient>
            <linearGradient id={`${id}-shell`} x1="115" y1="100" x2="349" y2="330" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF"/><stop offset=".35" stopColor="#DCECF1"/><stop offset=".74" stopColor="#A5C1CA"/><stop offset="1" stopColor="#587782"/>
            </linearGradient>
            <linearGradient id={`${id}-shell-light`} x1="160" y1="110" x2="325" y2="265" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF"/><stop offset=".75" stopColor="#D6EAED"/><stop offset="1" stopColor="#86AFBB"/>
            </linearGradient>
            <linearGradient id={`${id}-visor`} x1="132" y1="144" x2="326" y2="220" gradientUnits="userSpaceOnUse">
              <stop stopColor="#102E3D"/><stop offset=".47" stopColor="#06131D"/><stop offset="1" stopColor="#143B4A"/>
            </linearGradient>
            <radialGradient id={`${id}-eye`}><stop stopColor="#E0FFFF"/><stop offset=".54" stopColor="#83FFFF"/><stop offset="1" stopColor="#2CCED8"/></radialGradient>
            <filter id={`${id}-eye-glow`} x="-90%" y="-160%" width="280%" height="420%"><feGaussianBlur stdDeviation="7"/></filter>
            <filter id={`${id}-soft-glow`} x="-75%" y="-75%" width="250%" height="250%"><feGaussianBlur stdDeviation="18"/></filter>
          </defs>
          <ellipse cx="232" cy="183" rx="195" ry="171" fill={`url(#${id}-halo)`}/>
          <g className="mv-robot-orbits" fill="none" stroke="#77DED7" strokeOpacity=".27" strokeWidth="1">
            <ellipse cx="228" cy="189" rx="191" ry="91" transform="rotate(-23 228 189)"/>
            <ellipse cx="230" cy="188" rx="177" ry="108" transform="rotate(29 230 188)" strokeDasharray="5 12"/>
          </g>
          <circle className="mv-robot-orbit-point" cx="68" cy="128" r="4" fill="#8AF7EE"/>
          <circle className="mv-robot-orbit-point second" cx="390" cy="265" r="3" fill="#8AF7EE"/>
          <ellipse cx="230" cy="366" rx="99" ry="13" fill="#60EEE2" fillOpacity=".29" filter={`url(#${id}-soft-glow)`}/>
          <ellipse cx="230" cy="368" rx="74" ry="5" fill="none" stroke="#7DDED8" strokeOpacity=".3"/>
          <g className="mv-robot-float">
            {/* Antenna and headphones create a recognisable but original assistant silhouette. */}
            <path d="M230 104V73" stroke="#B3DCE0" strokeWidth="9" strokeLinecap="round"/>
            <circle cx="230" cy="62" r="12" fill="#E7F8F9" stroke="#74CCD0" strokeWidth="3"/>
            <circle className="mv-robot-antenna" cx="230" cy="62" r="5" fill="#68EDE4"/>
            <rect x="95" y="165" width="33" height="65" rx="16" fill={`url(#${id}-shell)`} stroke="#79B5BE" strokeWidth="2"/>
            <rect x="331" y="165" width="33" height="65" rx="16" fill={`url(#${id}-shell)`} stroke="#79B5BE" strokeWidth="2"/>
            <rect x="107" y="172" width="11" height="48" rx="5.5" fill="#2B8290" opacity=".72"/>
            <rect x="342" y="172" width="11" height="48" rx="5.5" fill="#2B8290" opacity=".72"/>
            {/* Body and shoulder joints. */}
            <path d="M163 278Q230 258 297 278L321 317Q326 335 308 345H151Q133 335 139 317Z" fill={`url(#${id}-shell)`} stroke="#82B3BD" strokeWidth="2"/>
            <rect x="203" y="268" width="54" height="21" rx="10" fill="#335E6B"/>
            <path d="M170 285Q230 306 292 285" fill="none" stroke="#F3FFFF" strokeOpacity=".7" strokeWidth="3"/>
            <circle cx="230" cy="319" r="19" fill="#0F3949" stroke="#8FECDF" strokeOpacity=".8" strokeWidth="2"/>
            <circle className="mv-robot-heart" cx="230" cy="319" r="8" fill="#79F4E7"/>
            {/* Articulated arms, one slowly greeting. */}
            <g className="mv-robot-arm-left"><path d="M149 289Q125 295 109 315" stroke="#B9D6DE" strokeWidth="21" strokeLinecap="round"/><circle cx="106" cy="318" r="14" fill="#E7F2F5" stroke="#78BEC5" strokeWidth="2"/></g>
            <g className="mv-robot-arm-right"><path d="M312 291Q344 288 363 261" stroke="#BEDDE3" strokeWidth="21" strokeLinecap="round"/><circle cx="367" cy="254" r="15" fill="#ECF8FA" stroke="#79C7CA" strokeWidth="2"/><path d="M369 248V234M362 247l-8-8M376 247l9-8" fill="none" stroke="#5C9EAA" strokeWidth="3" strokeLinecap="round"/></g>
            {/* Head shell, softly rounded visor and expressive eyes. */}
            <rect x="118" y="108" width="224" height="165" rx="66" fill={`url(#${id}-shell)`} stroke="#A6E3E3" strokeOpacity=".82" strokeWidth="2"/>
            <path d="M138 143Q149 118 177 116H287Q312 120 325 144" fill="none" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth="6" strokeLinecap="round"/>
            <rect x="137" y="144" width="186" height="98" rx="43" fill={`url(#${id}-visor)`} stroke="#5C9BA8" strokeWidth="2"/>
            <path d="M161 158Q203 146 287 154" fill="none" stroke="#D7FFFF" strokeOpacity=".12" strokeWidth="7" strokeLinecap="round"/>
            <g className="mv-robot-eyes">
              <rect x="163" y="176" width="46" height="29" rx="14.5" fill="#4EFFF0" opacity=".65" filter={`url(#${id}-eye-glow)`}/>
              <rect x="252" y="176" width="46" height="29" rx="14.5" fill="#4EFFF0" opacity=".65" filter={`url(#${id}-eye-glow)`}/>
              <rect x="168" y="179" width="37" height="23" rx="11.5" fill={`url(#${id}-eye)`}/>
              <rect x="256" y="179" width="37" height="23" rx="11.5" fill={`url(#${id}-eye)`}/>
              <ellipse cx="179" cy="186" rx="7" ry="3" fill="#FFFFFF" opacity=".66"/>
              <ellipse cx="267" cy="186" rx="7" ry="3" fill="#FFFFFF" opacity=".66"/>
            </g>
            <path className="mv-robot-smile" d="M215 217Q230 228 245 217" fill="none" stroke="#7CEBE0" strokeWidth="3" strokeLinecap="round"/>
            <g className="mv-robot-process" fill="#89F3E8">
              <circle cx="219" cy="218" r="3.4"/><circle cx="230" cy="218" r="3.4"/><circle cx="241" cy="218" r="3.4"/>
            </g>
            <rect x="206" y="251" width="48" height="5" rx="2.5" fill="#3A8490" opacity=".55"/>
          </g>
          <g className="mv-robot-interface" fill="none" stroke="#86E6E0" strokeOpacity=".35" strokeWidth="1.5">
            <path d="M76 83h31M76 83v30M385 83h-31M385 83v30M76 305h31M76 305v-30M385 305h-31M385 305v-30"/>
          </g>
        </svg>
      </div>
      <div className="core-caption"><span>{processing ? 'Procesando una consulta de ejemplo' : modes[selected].purpose}</span><small>Asistente visual original · simulación local</small><button className="core-motion-toggle" type="button" aria-pressed={paused} onClick={onToggleMotion}>{paused ? 'Reanudar animación' : 'Pausar animación'}</button></div>
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
