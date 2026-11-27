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
    <div className={'intelligence-core mv-robot mv-robot-mode-' + selected + (processing ? ' is-processing' : '') + (paused ? ' is-paused' : '')}>
      <div className="mv-robot-canvas">
        <svg className="intelligence-core-art" viewBox="0 0 420 420" role="img" aria-label={'Asistente humanoide MUVORY de carcasa plateada, visor negro y dos ojos LED turquesa. ' + ['Saluda y mira hacia la demostración.', 'Señala una tarjeta holográfica para clasificarla.', 'Observa un gráfico holográfico.'][selected]}>
          <defs>
            <linearGradient id={`${id}-shell`} x1="0" y1="0" x2="1" y2=".7"><stop stopColor="#fbffff"/><stop offset=".42" stopColor="#dfebf0"/><stop offset=".78" stopColor="#99afba"/><stop offset="1" stopColor="#e4eff1"/></linearGradient>
            <linearGradient id={`${id}-face`} x1="0" y1="0" x2=".7" y2="1"><stop stopColor="#fff"/><stop offset=".7" stopColor="#d8e7ed"/><stop offset="1" stopColor="#8ba6b2"/></linearGradient>
            <linearGradient id={`${id}-visor`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#142c3a"/><stop offset=".55" stopColor="#020b12"/><stop offset="1" stopColor="#0d222d"/></linearGradient>
            <linearGradient id={`${id}-hologram`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#144653" stopOpacity=".85"/><stop offset="1" stopColor="#07202b" stopOpacity=".6"/></linearGradient>
            <filter id={`${id}-led-glow`} x="-80%" y="-100%" width="260%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>
          </defs>
          <ellipse className="mv-robot-shadow" cx="210" cy="376" rx="67" ry="7" fill="#020b11" opacity=".5"/>
          <g className="mv-robot-body">
            {/* Full-body silhouette: compact head, narrow torso and articulated limbs. */}
            <g className="mv-robot-legs" stroke="#728f9c" strokeWidth="1.5">
              <path d="m181 280 27 0-3 44h-23Z" fill={`url(#${id}-shell)`}/><path d="m215 280 27 0-1 44h-23Z" fill={`url(#${id}-shell)`}/>
              <circle cx="193" cy="325" r="10" fill="#223c49"/><circle cx="230" cy="325" r="10" fill="#223c49"/>
              <path d="m183 329 21 0-1 27-27 0Z" fill={`url(#${id}-shell)`}/><path d="m220 329 20 0 7 27-26 0Z" fill={`url(#${id}-shell)`}/>
              <path d="m177 352 27 0 0 13-42 0q-1-9 15-13Z" fill={`url(#${id}-face)`}/><path d="m220 352 27 0q15 4 15 13h-42Z" fill={`url(#${id}-face)`}/>
            </g>
            <path d="m177 256 68 0-4 29-59 0Z" fill="#1b3442" stroke="#819ea8" strokeWidth="1.5"/>
            <path d="M181 265h59" stroke="#6d8c9b" strokeWidth="2"/>
            <g className="mv-robot-left-arm" stroke="#7896a2" strokeWidth="1.5">
              <circle cx="163" cy="181" r="13" fill="#27434f"/>
              <path d="m153 188 17 4-11 43-18-4Z" fill={`url(#${id}-shell)`}/><circle cx="149" cy="237" r="9" fill="#1b3542"/>
              <path d="m141 245 17 0-1 29-17 1Z" fill={`url(#${id}-shell)`}/><rect x="138" y="273" width="20" height="23" rx="8" fill={`url(#${id}-face)`}/><path d="m145 281 0 8m6-8v8" stroke="#829eaa"/>
            </g>
            <g className="mv-robot-right-arm" key={selected}>
              <circle cx="258" cy="181" r="13" fill="#27434f" stroke="#7896a2" strokeWidth="1.5"/>
              {selected === 0 ? <g className="mv-robot-wave-arm">
                <path d="m267 180 26-12" stroke="#9eb6c1" strokeWidth="20" strokeLinecap="round"/><path d="m266 176 24-11" stroke="#eff8fa" strokeWidth="8" strokeLinecap="round"/>
                <circle cx="295" cy="168" r="9" fill="#243f4d" stroke="#87a7b4"/>
                <g className="mv-robot-wave-hand"><path d="m297 158 0-33" stroke="#dbe9ee" strokeWidth="18" strokeLinecap="round"/><path d="m294 157 0-32" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
                  <rect x="286" y="104" width="25" height="27" rx="10" fill={`url(#${id}-face)`} stroke="#89a5b1"/><path d="M289 110V98m7 11V94m7 15V96m7 16v-10" stroke="#dcecf1" strokeWidth="5" strokeLinecap="round"/>
                </g>
              </g> : <g className="mv-robot-point-arm">
                <path d="m268 188 16 36" stroke="#c9dde5" strokeWidth="20" strokeLinecap="round"/><path d="m270 188 16 33" stroke="#fff" strokeWidth="5" strokeLinecap="round"/>
                <circle cx="286" cy="229" r="9" fill="#243f4d" stroke="#87a7b4"/>
                <path d="m294 228 17-9" stroke="#dcebef" strokeWidth="17" strokeLinecap="round"/>
                <path d="m310 217 14-5 7 3-7 9-11 0Z" fill={`url(#${id}-face)`} stroke="#8aa8b5"/><path d="m322 214 12-6" stroke="#eaf8fa" strokeWidth="5" strokeLinecap="round"/>
              </g>}
            </g>
            <rect x="199" y="144" width="25" height="24" rx="8" fill="#28434f" stroke="#89a7b0"/>
            <g className="mv-robot-torso">
              <path d="M182 162q29-7 59 0l15 22-9 67q-35 17-70 0l-10-67Z" fill={`url(#${id}-shell)`} stroke="#8daab6" strokeWidth="1.5"/>
              <path d="m180 180 63 0-5 55q-25 10-51 0Z" fill="#c8dce3" stroke="#f5ffff" strokeOpacity=".75"/>
              <path d="M191 244h42" stroke="#536e7e" strokeWidth="3" strokeLinecap="round"/>
              <path d="m201 195 11-6 11 6v13l-11 6-11-6Z" fill="#0d2837" stroke="#6c9ba6"/>
              <path className="mv-robot-chest-light" d="m207 199 5-3 5 3v6l-5 3-5-3Z" fill="#88e8df"/>
            </g>
            <g className="mv-robot-head">
              <rect x="149" y="66" width="124" height="85" rx="34" fill={`url(#${id}-face)`} stroke="#c1d8de" strokeWidth="1.5"/>
              <path d="M162 86q8-14 24-15h50" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".85"/>
              <rect x="143" y="94" width="9" height="32" rx="4.5" fill="#7697a5"/><rect x="271" y="94" width="9" height="32" rx="4.5" fill="#7697a5"/>
              <rect x="160" y="86" width="102" height="48" rx="20" fill={`url(#${id}-visor)`} stroke="#476573" strokeWidth="1.2"/>
              <path d="M171 95q36-9 76-1" stroke="#a9d8e8" strokeOpacity=".14" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <g className="mv-robot-gaze"><g className="mv-robot-eyes">
                <g className="mv-robot-eye-glow" filter={`url(#${id}-led-glow)`} opacity=".8"><rect x="177" y="102" width="22" height="12" rx="5"/><rect x="223" y="102" width="22" height="12" rx="5"/></g>
                <rect className="mv-robot-eye" x="177" y="102" width="22" height="12" rx="5"/><rect className="mv-robot-eye" x="223" y="102" width="22" height="12" rx="5"/>
                <path d="M181 105h13m33 0h13" stroke="#eaffff" strokeWidth="2" strokeLinecap="round"/>
              </g></g>
              <path className="mv-robot-visor-pulse" d="M172 126h77" stroke="#70e6ee" strokeWidth="1.2" strokeLinecap="round"/>
              <rect x="200" y="140" width="22" height="2" rx="1" fill="#70929f"/>
            </g>
          </g>
          {selected === 1 && <g className="mv-robot-hologram mv-robot-card" aria-hidden="true">
            <path d="m300 156 92 6v105l-92-6Z" fill={`url(#${id}-hologram)`} stroke="#72e4da" strokeOpacity=".7"/>
            <path d="m312 176 45 3m-45 9 64 4m-64 10 51 3" stroke="#9adddf" strokeWidth="3" strokeLinecap="round"/>
            <rect className="mv-classify-indicator" x="313" y="220" width="61" height="23" rx="4" fill="#7ddfd5" fillOpacity=".2"/>
            <path className="mv-classify-check" d="m322 231 5 5 10-11" fill="none" stroke="#a0ffee" strokeWidth="2.5" strokeLinecap="round"/><path d="M346 231h19" stroke="#9adddf" strokeWidth="2" strokeLinecap="round"/>
          </g>}
          {selected === 2 && <g className="mv-robot-hologram mv-robot-chart" aria-hidden="true">
            <path d="m298 154 96 7v108l-96-7Z" fill={`url(#${id}-hologram)`} stroke="#72d7e4" strokeOpacity=".7"/>
            <path d="M311 245h70M311 245v-72" fill="none" stroke="#6ea7b7" strokeWidth="1"/>
            <g className="mv-chart-bars" fill="#79d8e3"><rect x="321" y="218" width="10" height="26" rx="2"/><rect x="339" y="201" width="10" height="43" rx="2"/><rect x="357" y="183" width="10" height="61" rx="2"/></g>
            <path className="mv-chart-line" d="m317 207 18-16 17 3 22-24" stroke="#adfff0" strokeWidth="2" fill="none"/><circle className="mv-chart-point" cx="374" cy="170" r="3.5" fill="#c8fff4"/>
          </g>}
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
    timer.current = setTimeout(() => { setProcessing(false); setAnswered(true); }, 1000);
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
