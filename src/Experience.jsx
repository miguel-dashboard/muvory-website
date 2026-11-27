
import { useEffect, useRef, useState } from 'react';
import Brand from './Brand.jsx';
import Icon from './Icon.jsx';
import {
  experienceSlides, softwareRecords, workflowSteps, aiDemos, chartExamples,
  boundedSlide, nextSlide, previousSlide, filteredRecords, advanceWorkflow,
  slideIndexFromHash,
} from './experience-utils.js';
import './experience.css';

const recordFilters = ['Todos', 'En revisión', 'En curso', 'Completado'];
const periodLabels = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];

function ExampleLabel({ children }) {
  return <span className="xp-example-label"><Icon name="spark" size={14} />{children || 'Demostración con datos de ejemplo'}</span>;
}

function SoftwareDemo() {
  const [filter, setFilter] = useState('Todos');
  const records = filteredRecords(filter);
  return <div className="xp-dashboard">
    <div className="xp-window-top"><span className="xp-window-lights" aria-hidden="true"><i/><i/><i/></span><span>Panel de gestión · muestra interactiva</span><span className="xp-online"><i/> Vista activa</span></div>
    <div className="xp-dashboard-body">
      <div className="xp-dashboard-head">
        <div><small>ESPACIO DE TRABAJO</small><h3>Visión general</h3></div>
        <span className="xp-dashboard-avatar" aria-hidden="true">MV</span>
      </div>
      <div className="xp-summary-strip">
        <div><span>Solicitudes</span><strong>04</strong><small>registros ficticios</small></div>
        <div><span>En curso</span><strong>02</strong><small>requieren seguimiento</small></div>
        <div><span>Completadas</span><strong>01</strong><small>ejemplo cerrado</small></div>
      </div>
      <div className="xp-table-heading"><strong>Actividades del equipo</strong><span>Filtra por estado</span></div>
      <div className="xp-filter-row" role="group" aria-label="Filtrar actividades de ejemplo">
        {recordFilters.map(item => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
      </div>
      <div className="xp-record-list" aria-live="polite">
        {records.map(item => <div className="xp-record-row" key={item.id}>
          <span className="xp-record-marker"><Icon name="layers" size={16}/></span>
          <div><small>{item.id} · {item.owner}</small><strong>{item.title}</strong></div>
          <span className={'xp-record-status xp-status-' + (item.status === 'Completado' ? 'done' : item.status === 'En curso' ? 'active' : 'pending')}>{item.status}</span>
        </div>)}
      </div>
      <ExampleLabel />
    </div>
  </div>;
}

function AutomationDemo() {
  const [completed, setCompleted] = useState(0);
  return <div className="xp-dashboard xp-flow-demo">
    <div className="xp-window-top"><span className="xp-window-lights" aria-hidden="true"><i/><i/><i/></span><span>Automatización · proceso ilustrativo</span><span className="xp-online"><i/> Simulación local</span></div>
    <div className="xp-dashboard-body">
      <div className="xp-dashboard-head">
        <div><small>FLUJO CONECTADO</small><h3>De una solicitud a una acción</h3></div>
        <span className="xp-flow-badge"><Icon name="workflow" size={18}/></span>
      </div>
      <ol className="xp-flow-steps">
        {workflowSteps.map((item, index) => <li key={item.title} className={index < completed ? 'xp-flow-done' : index === completed ? 'xp-flow-current' : ''}>
          <span className="xp-flow-index">{index < completed ? <Icon name="check" size={16}/> : String(index + 1).padStart(2, '0')}</span>
          <div><strong>{item.title}</strong><small>{item.detail}</small></div>
          <span className="xp-flow-state">{index < completed ? 'Completado' : index === completed ? 'Siguiente' : 'En espera'}</span>
        </li>)}
      </ol>
      <div className="xp-flow-actions">
        <button className="xp-demo-primary" type="button" disabled={completed === workflowSteps.length} onClick={() => setCompleted(value => advanceWorkflow(value))}>
          {completed === 0 ? 'Iniciar recorrido' : completed === workflowSteps.length ? 'Proceso completado' : 'Ejecutar siguiente paso'} <Icon name="arrow" size={17}/>
        </button>
        <button className="xp-demo-quiet" type="button" onClick={() => setCompleted(0)}>Reiniciar</button>
      </div>
      <p className="xp-flow-feedback" aria-live="polite">
        {completed === 0 ? 'Presiona el botón para simular la primera acción.' : completed === workflowSteps.length ? 'Simulación terminada. El registro quedó actualizado en este ejemplo.' : workflowSteps[completed - 1].detail}
      </p>
      <ExampleLabel>Pasos simulados · sin conexiones reales</ExampleLabel>
    </div>
  </div>;
}

function AIDemo() {
  const [mode, setMode] = useState(0);
  const [answered, setAnswered] = useState(false);
  const active = aiDemos[mode];
  return <div className="xp-dashboard xp-ai-demo">
    <div className="xp-window-top"><span className="xp-window-lights" aria-hidden="true"><i/><i/><i/></span><span>MUVORY AI · laboratorio visual</span><span className="xp-online"><i/> Modo demostración</span></div>
    <div className="xp-dashboard-body">
      <div className="xp-ai-console">
        <div className="xp-ai-avatar">
          <img src="/muvory-ai-assistant.avif" alt="Asistente digital original de MUVORY con visor azul y panel holográfico" width="250" height="200" loading="lazy" />
        </div>
        <div className="xp-ai-conversation">
          <small>ELIGE UNA APLICACIÓN</small>
          <div className="xp-ai-tabs" role="group" aria-label="Selecciona una aplicación de IA">
            {aiDemos.map((item, index) => <button type="button" key={item.label} aria-pressed={mode === index} onClick={() => { setMode(index); setAnswered(false); }}>{item.label}</button>)}
          </div>
          <div className="xp-ai-question"><small>CONSULTA DE EJEMPLO</small><strong>{active.question}</strong></div>
          {!answered
            ? <button className="xp-demo-primary" type="button" onClick={() => setAnswered(true)}>Ver respuesta de ejemplo <Icon name="arrow" size={17}/></button>
            : <div className="xp-ai-answer" aria-live="polite"><span><Icon name="spark" size={16}/> Asistente MUVORY · simulación</span><p>{active.answer}</p><button className="xp-demo-quiet" type="button" onClick={() => setAnswered(false)}>Volver a preguntar</button></div>}
        </div>
      </div>
      <ExampleLabel>Respuestas predefinidas · no hay IA conectada en vivo</ExampleLabel>
    </div>
  </div>;
}

function DataDemo() {
  const [selected, setSelected] = useState(0);
  const example = chartExamples[selected];
  return <div className="xp-dashboard xp-data-demo">
    <div className="xp-window-top"><span className="xp-window-lights" aria-hidden="true"><i/><i/><i/></span><span>Inteligencia de datos · panel ilustrativo</span><span className="xp-online"><i/> Datos de muestra</span></div>
    <div className="xp-dashboard-body">
      <div className="xp-dashboard-head">
        <div><small>INDICADORES</small><h3>Lo que quieres entender</h3></div>
        <span className="xp-flow-badge"><Icon name="chart" size={18}/></span>
      </div>
      <div className="xp-data-tabs" role="group" aria-label="Cambiar indicador">
        {chartExamples.map((item, index) => <button type="button" key={item.label} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.label}</button>)}
      </div>
      <div className="xp-data-metric" aria-live="polite"><strong>{example.headline}</strong><span>{example.subtitle}</span></div>
      <div className="xp-data-chart" aria-label={'Gráfico de ' + example.label.toLowerCase() + ': ' + example.values.join(', ') + ' unidades de ejemplo en seis periodos'}>
        {example.values.map((value, index) => <div className="xp-data-column" key={index}>
          <div className="xp-bar-track"><span className={index === example.values.length - 1 ? 'xp-bar-last' : ''} style={{height:(value / 24 * 100) + '%'}}><b>{value}</b></span></div>
          <small>{periodLabels[index]}</small>
        </div>)}
      </div>
      <div className="xp-data-legend"><span><i/> Evolución ilustrativa</span><span>6 periodos</span></div>
      <ExampleLabel>Cifras ficticias · no representan resultados de clientes</ExampleLabel>
    </div>
  </div>;
}

const scenes = { software:SoftwareDemo, automatizacion:AutomationDemo, 'inteligencia-artificial':AIDemo, datos:DataDemo };

export default function Experience() {
  const [current, setCurrent] = useState(() => slideIndexFromHash(window.location.hash));
  const gesture = useRef(null);
  const slide = experienceSlides[current];
  const Scene = scenes[slide.id];

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'MUVORY Experience | Explora nuestra tecnología';
    const onHash = () => setCurrent(slideIndexFromHash(window.location.hash));
    window.addEventListener('hashchange', onHash);
    return () => { document.title = previousTitle; window.removeEventListener('hashchange', onHash); };
  }, []);

  function goTo(index) {
    const next = boundedSlide(index);
    setCurrent(next);
    window.history.replaceState(window.history.state, '', '#' + experienceSlides[next].id);
    if (window.scrollY > 120) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    }
  }

  useEffect(() => {
    const onKeys = event => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.target?.closest?.('button, a, input, select, textarea, [contenteditable="true"]')) return;
      if (event.key === 'ArrowRight') goTo(nextSlide(current));
      if (event.key === 'ArrowLeft') goTo(previousSlide(current));
    };
    window.addEventListener('keydown', onKeys);
    return () => window.removeEventListener('keydown', onKeys);
  }, [current]);

  function touchStart(event) {
    if (event.target?.closest?.('button, a, input, select, textarea')) { gesture.current=null; return; }
    const finger = event.touches[0];
    gesture.current = {x:finger.clientX, y:finger.clientY};
  }
  function touchEnd(event) {
    if (!gesture.current) return;
    const finger = event.changedTouches[0];
    const dx = finger.clientX - gesture.current.x;
    const dy = finger.clientY - gesture.current.y;
    gesture.current = null;
    if (Math.abs(dx) > 75 && Math.abs(dx) > Math.abs(dy)*1.6) goTo(dx < 0 ? nextSlide(current) : previousSlide(current));
  }

  return <div className="xp-app">
    <a className="skip-link" href="#experience-main">Saltar al contenido del recorrido</a>
    <header className="xp-header">
      <div className="xp-shell xp-header-inner">
        <Brand href="/" />
        <div className="xp-header-tag"><span/> EXPERIENCE <small>· DEMO INTERACTIVA</small></div>
        <a className="xp-close" href="/">Volver al sitio <Icon name="close" size={17}/></a>
      </div>
    </header>

    <main id="experience-main" tabIndex={-1} className="xp-main">
      <div className="xp-shell">
        <div className="xp-intro"><span className="xp-overline">MUVORY EXPERIENCE / RECORRIDO INTERACTIVO</span><span className="xp-intro-note">Experiencia ilustrativa · no es un producto conectado</span></div>
        <div className="xp-layout">
          <aside className="xp-sidebar" aria-label="Etapas del recorrido">
            <div className="xp-sidebar-head"><span className="xp-overline">DESCUBRE LO POSIBLE</span><h2>La tecnología<br/><em>en acción.</em></h2><p>Cuatro formas de convertir una necesidad en una herramienta que aporta valor.</p></div>
            <nav aria-label="Seleccionar una etapa" className="xp-steps"><ol>
              {experienceSlides.map((item, index) => <li key={item.id}><button type="button" onClick={() => goTo(index)} aria-current={current === index ? 'step' : undefined} className={current === index ? 'xp-step-active' : ''}>
                <span className="xp-step-number">{item.number}</span><span><strong>{item.label}</strong><small>{item.kicker.toLowerCase()}</small></span><Icon name={item.icon} size={19}/>
              </button></li>)}
            </ol></nav>
            <p className="xp-sidebar-hint">Selecciona una etapa o utiliza las flechas del teclado.</p>
          </aside>

          <div className="xp-content">
            <section className="xp-stage" onTouchStart={touchStart} onTouchEnd={touchEnd} aria-label={'Etapa ' + (current+1) + ': ' + slide.label}>
              <div className="xp-stage-copy" key={slide.id + '-copy'}>
                <p className="xp-overline">{slide.number} / 04 · {slide.kicker}</p>
                <h1 aria-live="polite" aria-atomic="true">{slide.heading}</h1>
                <p className="xp-stage-lead">{slide.description}</p>
                <ul className="xp-benefits">{slide.benefits.map(value => <li key={value}><Icon name="check" size={14}/>{value}</li>)}</ul>
              </div>
              <div className="xp-stage-scene" key={slide.id + '-scene'}>
                <Scene />
              </div>
            </section>
            <div className="xp-stage-bottom">
              <p><Icon name="spark" size={18}/>{slide.takeaway}</p>
              <div className="xp-stage-controls">
                <button type="button" onClick={() => goTo(previousSlide(current))} disabled={current===0} className="xp-previous"><Icon name="arrow" size={18}/> Anterior</button>
                <div className="xp-progress" role="group" aria-label="Progreso de la presentación">{experienceSlides.map((item,index) => <button key={item.id} onClick={() => goTo(index)} type="button" aria-label={'Ir a ' + item.label} aria-current={current===index ? 'step' : undefined}><span/></button>)}</div>
                {current < experienceSlides.length - 1 ?
                  <button type="button" className="xp-next" onClick={() => goTo(nextSlide(current))}>Siguiente <Icon name="arrow" size={18}/></button> :
                  <a className="xp-next xp-finish" href="/#contacto">Conversemos <Icon name="arrow" size={18}/></a>}
              </div>
            </div>
          </div>
        </div>
        <div className="xp-outro"><div><span className="xp-overline">UN PROYECTO EMPIEZA CON UNA IDEA</span><strong>¿Cómo podría verse tu solución?</strong></div><a href="/#contacto">Cuéntanos qué necesitas <Icon name="arrow" size={18}/></a></div>
      </div>
    </main>

    <nav className="xp-mobile-dock" aria-label="Navegación móvil del recorrido">
      {experienceSlides.map((item,index) => <button key={item.id} type="button" onClick={() => goTo(index)} aria-current={current===index ? 'step' : undefined}><Icon name={item.icon} size={21}/><span>{item.label}</span></button>)}
    </nav>
    <footer className="xp-footer"><div className="xp-shell"><span>© {new Date().getFullYear()} MUVORY Technologies.</span><span>Demostraciones simuladas · sin datos reales de clientes</span></div></footer>
  </div>;
}
