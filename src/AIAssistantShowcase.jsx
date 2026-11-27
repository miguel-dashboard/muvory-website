import { useEffect, useId, useRef, useState } from 'react';
import './assistants.css';

const modes = [
  { name: 'Atención', purpose: 'Orientar con información autorizada.', question: '¿Cómo podría atender consultas?', answer: 'Un asistente puede consultar contenidos aprobados, responder preguntas frecuentes y derivar las solicitudes que requieren a una persona. Tú defines qué información utiliza y cuándo debe pedir ayuda.', outcome: 'Consulta comprendida · respuesta orientativa · derivación humana' },
  { name: 'Clasificación', purpose: 'Dar orden a solicitudes y documentos.', question: '¿Cómo organizaría una solicitud?', answer: 'Por ejemplo, una consulta sobre el estado de un pedido puede clasificarse como seguimiento y prepararse para el equipo correspondiente. La prioridad y el destino se validan según las reglas que acuerdes.', outcome: 'Solicitud de ejemplo · categoría sugerida · revisión del equipo' },
  { name: 'Análisis', purpose: 'Hacer más fácil explorar información.', question: '¿Cómo me ayudaría a entender datos?', answer: 'Puede resumir información disponible, señalar variaciones y ayudarte a formular preguntas. Los datos deben estar autorizados y los resultados se contrastan antes de tomar decisiones.', outcome: 'Datos autorizados · síntesis sugerida · validación humana' },
];

function IntelligenceCore({ processing, selected, paused, onToggleMotion, reactionToken }) {
  const id = useId().replaceAll(':', '');
  const modeName = modes[selected].name;
  return (
    <div className={'intelligence-core mv-robot mv-robot-mode-' + selected + (processing ? ' is-processing' : '') + (paused ? ' is-paused' : '')}>
      <div className="mv-robot-canvas">
        <svg className="intelligence-core-art" viewBox="0 0 420 350" role="img" aria-label={'Asistente digital original MUVORY: robot compacto blanco perlado, visor oscuro y ojos luminosos turquesa. Modo ' + modeName}>
          <defs>
            <radialGradient id={id + '-atmosphere'}><stop stopColor="#59C9D1" stopOpacity=".18" /><stop offset="1" stopColor="#59C9D1" stopOpacity="0" /></radialGradient>
            <linearGradient id={id + '-pearl'} x1="0%" y1="0%" x2="94%" y2="100%">
              <stop stopColor="#FFFFFF" /><stop offset=".37" stopColor="#EFF8FA" /><stop offset=".77" stopColor="#BDD4DD" /><stop offset="1" stopColor="#6C939F" />
            </linearGradient>
            <linearGradient id={id + '-helmet'} x1="8%" y1="4%" x2="95%" y2="100%">
              <stop stopColor="#FFFFFF" /><stop offset=".52" stopColor="#E9F5F8" /><stop offset=".83" stopColor="#B7D1D9" /><stop offset="1" stopColor="#7399A6" />
            </linearGradient>
            <linearGradient id={id + '-visor'} x1="8%" y1="5%" x2="95%" y2="100%">
              <stop stopColor="#183E4A" /><stop offset=".33" stopColor="#071822" /><stop offset=".69" stopColor="#020D16" /><stop offset="1" stopColor="#17404D" />
            </linearGradient>
            <radialGradient id={id + '-eye'}><stop stopColor="#F0FFFF" /><stop offset=".46" stopColor="#9CFFFF" /><stop offset="1" stopColor="#46CDE0" /></radialGradient>
            <filter id={id + '-blur'} x="-75%" y="-120%" width="250%" height="340%"><feGaussianBlur stdDeviation="7"/></filter>
          </defs>
          <ellipse cx="213" cy="174" rx="172" ry="142" fill={'url(#' + id + '-atmosphere)'} />
          <ellipse className="mv-robot-orbit" cx="212" cy="183" rx="157" ry="69" transform="rotate(-17 212 183)" fill="none" stroke="#70E5DF" strokeOpacity=".18" strokeWidth="1" />
          <circle cx="63" cy="201" r="2.5" fill="#90EBE6" opacity=".65" />
          <circle cx="362" cy="114" r="3" fill="#86D5E1" opacity=".55" />
          <ellipse cx="212" cy="319" rx="94" ry="10" fill="#2BB8BA" opacity=".12" filter={'url(#' + id + '-blur)'} />
          <ellipse cx="212" cy="318" rx="70" ry="5" fill="none" stroke="#7EC9CE" strokeOpacity=".22" />
          <g className="mv-robot-idle">
            <g className="mv-robot-back">
              <rect x="164" y="289" width="38" height="20" rx="10" fill="#A5C1C9" stroke="#6F9CA9"/>
              <rect x="220" y="289" width="38" height="20" rx="10" fill="#A5C1C9" stroke="#6F9CA9"/>
              <path d="M161 307h42M221 307h42" stroke="#D9EEF0" strokeWidth="6" strokeLinecap="round"/>
            </g>
            <g className="mv-robot-left-arm">
              <circle cx="153" cy="243" r="12" fill="#345C6B" stroke="#89B5BF" strokeWidth="2"/>
              <path d="M147 248Q129 257 118 274" fill="none" stroke="#BFD6DE" strokeWidth="17" strokeLinecap="round"/>
              <path d="M146 247Q131 255 122 269" fill="none" stroke="#F5FEFF" strokeWidth="6" strokeLinecap="round"/>
              <ellipse cx="115" cy="282" rx="13" ry="12" fill={'url(#' + id + '-pearl)'} stroke="#91B4BE"/>
            </g>
            <path d="M163 228q49-18 97 0l22 37q8 26-9 39-54 23-116 0-17-13-9-39Z" fill={'url(#' + id + '-pearl)'} stroke="#86A9B3" strokeWidth="1.8"/>
            <path d="M169 255q43 14 87 0" fill="none" stroke="#FFFFFF" strokeOpacity=".62" strokeWidth="4" strokeLinecap="round"/>
            <path d="M182 289q30 8 60 0" fill="none" stroke="#6997A6" opacity=".42" strokeWidth="2"/>
            <circle cx="212" cy="269" r="16" fill="#102C3B" stroke="#8CD6D4" strokeWidth="1.5"/>
            <circle className="mv-robot-heart" cx="212" cy="269" r="7" fill="#8DF4E7"/>
            <g className="mv-robot-action" key={'gesture-' + reactionToken + '-' + selected}>
              <circle cx="271" cy="243" r="12" fill="#345C6B" stroke="#89B5BF" strokeWidth="2"/>
              {selected === 0 ?
                <g className={reactionToken > 0 ? 'mv-robot-gesture mv-robot-greeting' : ''}>
                  <path d="M274 239Q292 225 302 207" fill="none" stroke="#C2DBE1" strokeWidth="17" strokeLinecap="round"/>
                  <path d="M274 238Q288 226 298 210" fill="none" stroke="#FAFFFF" strokeWidth="6" strokeLinecap="round"/>
                  <circle cx="306" cy="202" r="12" fill={'url(#' + id + '-pearl)'} stroke="#83AAB4" strokeWidth="1.6"/>
                  <path d="M300 194v-9m6 8v-12m6 13v-8" stroke="#EEF9FA" strokeWidth="3.5" strokeLinecap="round"/>
                </g> :
                <g className={reactionToken > 0 ? 'mv-robot-gesture mv-robot-pointing' : ''}>
                  <path d="M274 244Q293 257 315 237" fill="none" stroke="#C2DBE1" strokeWidth="17" strokeLinecap="round"/>
                  <path d="M277 244Q295 252 312 238" fill="none" stroke="#FBFFFF" strokeWidth="6" strokeLinecap="round"/>
                  <circle cx="319" cy="231" r="11" fill={'url(#' + id + '-pearl)'} stroke="#83AAB4" strokeWidth="1.6"/>
                  <path d="M325 225l11-9" stroke="#F0FEFF" strokeWidth="4" strokeLinecap="round"/>
                </g>
              }
            </g>
            <g className="mv-robot-head">
              <rect x="110" y="77" width="205" height="151" rx="69" fill={'url(#' + id + '-helmet)'} stroke="#BCE1E6" strokeWidth="2"/>
              <path d="M129 104Q146 86 176 86h88" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeOpacity=".76" strokeLinecap="round"/>
              <rect x="104" y="134" width="16" height="43" rx="8" fill="#8BB0BD" stroke="#6A9AA8" strokeWidth="1.5"/>
              <rect x="307" y="134" width="16" height="43" rx="8" fill="#8BB0BD" stroke="#6A9AA8" strokeWidth="1.5"/>
              <circle cx="112" cy="155" r="5" fill="#5BD7D7" opacity=".7"/>
              <circle cx="315" cy="155" r="5" fill="#5BD7D7" opacity=".7"/>
              <rect x="128" y="103" width="170" height="104" rx="46" fill={'url(#' + id + '-visor)'} stroke="#6DABB4" strokeWidth="2"/>
              <path d="M146 118Q168 107 213 113" fill="none" stroke="#BBFAFF" strokeWidth="5" strokeOpacity=".16" strokeLinecap="round"/>
              <g className="mv-robot-gaze">
                <g className="mv-robot-eyes">
                  <ellipse cx="174" cy="154" rx="20" ry="17" fill="#55E8F4" opacity=".42" filter={'url(#' + id + '-blur)'}/>
                  <ellipse cx="251" cy="154" rx="20" ry="17" fill="#55E8F4" opacity=".42" filter={'url(#' + id + '-blur)'}/>
                  <ellipse className="mv-robot-eye" cx="174" cy="154" rx="13" ry="14" fill={'url(#' + id + '-eye)'}/>
                  <ellipse className="mv-robot-eye" cx="251" cy="154" rx="13" ry="14" fill={'url(#' + id + '-eye)'}/>
                  <ellipse cx="169" cy="149" rx="4" ry="3" fill="#FFFFFF" opacity=".66"/>
                  <ellipse cx="246" cy="149" rx="4" ry="3" fill="#FFFFFF" opacity=".66"/>
                </g>
              </g>
              <path className="mv-robot-smile" d="M201 183Q212 190 223 183" stroke="#8CE3DF" strokeOpacity=".72" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
              <g className="mv-robot-thinking-dots" fill="#9CFDF1">
                <circle cx="201" cy="184" r="3"/><circle cx="212" cy="184" r="3"/><circle cx="223" cy="184" r="3"/>
              </g>
              <path d="M175 217h73" stroke="#497889" strokeOpacity=".43" strokeWidth="2" strokeLinecap="round"/>
            </g>
          </g>
          {selected !== 0 && <g className="mv-robot-hologram" aria-hidden="true">
            <rect x="320" y="127" width="91" height="98" rx="12" fill="#0A2C3A" fillOpacity=".84" stroke="#77E0D9" strokeOpacity=".62" strokeWidth="1.5" />
            {selected === 1 ?
              <>
                <rect x="334" y="147" width="38" height="5" rx="2.5" fill="#A6ECE8" opacity=".85"/>
                <rect x="334" y="161" width="57" height="3" rx="1.5" fill="#7CB0BF" opacity=".65"/>
                <rect x="334" y="173" width="43" height="3" rx="1.5" fill="#7CB0BF" opacity=".65"/>
                <rect x="334" y="189" width="63" height="22" rx="7" fill="#1E6266" stroke="#86ECE0" strokeOpacity=".55"/>
                <path d="m346 199 6 5 10-11" fill="none" stroke="#B3FFF2" strokeWidth="2.4" strokeLinecap="round"/>
                <path d="M369 200h17" stroke="#A9EDE9" strokeWidth="2" strokeLinecap="round"/>
              </> :
              <>
                <path d="M335 199h61M335 199v-52" stroke="#709CAA" strokeWidth="1.5" fill="none"/>
                <rect x="343" y="178" width="10" height="21" rx="2" fill="#4C9DAA"/>
                <rect x="360" y="165" width="10" height="34" rx="2" fill="#78D9DC"/>
                <rect x="377" y="150" width="10" height="49" rx="2" fill="#8AEEE5"/>
                <path d="m341 161 15-11 14 6 18-18" stroke="#C4FFF4" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </>
            }
          </g>}
        </svg>
      </div>
      <div className="core-caption"><span>{processing ? 'Preparando una respuesta ilustrativa' : modes[selected].purpose}</span><small>Robot ilustrativo original · respuestas simuladas</small><button className="core-motion-toggle" type="button" aria-pressed={paused} onClick={onToggleMotion}>{paused ? 'Reanudar animación' : 'Pausar animación'}</button></div>
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
