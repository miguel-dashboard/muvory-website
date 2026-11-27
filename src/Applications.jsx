import { useState } from 'react';
import Icon from './Icon.jsx';
import './applications.css';

const areas = [
  {
    id: 'commerce', name: 'Comercio y distribución', icon: 'store',
    title: 'Del pedido al inventario, todo conectado.',
    problem: 'Pedidos en un lugar. Stock en otro. Seguimiento manual.',
    description: 'Una plataforma a medida puede reunir ventas, disponibilidad y despachos para que cada movimiento tenga contexto.',
    scene: 'Gestión de pedidos',
    steps: ['Registrar pedido', 'Actualizar inventario', 'Preparar despacho'],
    outcomes: ['El pedido aparece en la vista compartida.', 'La disponibilidad refleja las unidades reservadas.', 'El pedido queda preparado para coordinar su despacho.'],
    cta: 'Conversemos sobre tu operación',
  },
  {
    id: 'logistics', name: 'Logística y operaciones', icon: 'truck',
    title: 'Una vista clara de lo que está en movimiento.',
    problem: 'Estados dispersos y consultas constantes para saber qué ocurre.',
    description: 'Centraliza asignaciones, seguimiento e incidencias en una herramienta que acompañe el trabajo de tu equipo.',
    scene: 'Seguimiento de una entrega',
    steps: ['Asignar recorrido', 'Actualizar estado', 'Registrar entrega'],
    outcomes: ['El recorrido queda asignado al equipo de operación.', 'La entrega cambia a “En recorrido”.', 'La recepción queda registrada para su seguimiento.'],
    cta: 'Exploremos tu flujo operativo',
  },
  {
    id: 'professional', name: 'Servicios profesionales y jurídicos', icon: 'briefcase',
    title: 'Cada documento, tarea y plazo en su lugar.',
    problem: 'Archivos y pendientes repartidos entre correos y planillas.',
    description: 'Organiza solicitudes, expedientes y recordatorios para facilitar la gestión administrativa y la revisión profesional.',
    scene: 'Espacio de seguimiento',
    steps: ['Abrir expediente', 'Organizar documentos', 'Preparar recordatorio'],
    outcomes: ['Se crea un expediente de ejemplo.', 'Los documentos quedan vinculados a su solicitud.', 'El recordatorio queda preparado para revisión humana.'],
    cta: 'Hablemos de tu gestión diaria',
  },
  {
    id: 'education', name: 'Educación', icon: 'layers',
    title: 'Una experiencia que acompaña el aprendizaje.',
    problem: 'Inscripciones, contenidos y avances difíciles de coordinar.',
    description: 'Conecta a estudiantes y equipos de formación con una plataforma accesible para organizar cada etapa.',
    scene: 'Aula digital',
    steps: ['Recibir inscripción', 'Habilitar contenido', 'Registrar avance'],
    outcomes: ['La inscripción aparece en el aula de ejemplo.', 'El primer módulo queda disponible.', 'El avance del módulo se refleja en el seguimiento.'],
    cta: 'Conversemos sobre tu plataforma',
  },
  {
    id: 'property', name: 'Inmobiliarias', icon: 'building',
    title: 'De una consulta a un seguimiento con contexto.',
    problem: 'Interesados y propiedades sin un historial compartido.',
    description: 'Vincula consultas con propiedades y organiza la atención para dar continuidad a cada conversación.',
    scene: 'Gestión de una consulta',
    steps: ['Recibir consulta', 'Vincular propiedad', 'Preparar seguimiento'],
    outcomes: ['La consulta se incorpora al panel.', 'El interés queda vinculado a la propiedad de ejemplo.', 'El equipo puede revisar y coordinar el siguiente contacto.'],
    cta: 'Exploremos tu gestión de consultas',
  },
  {
    id: 'projects', name: 'Otros proyectos', icon: 'spark',
    title: 'Tu idea también puede tener su propia herramienta.',
    problem: 'Una necesidad concreta que las herramientas actuales no resuelven.',
    description: 'Portales, herramientas internas o nuevos servicios digitales: partimos del contexto para definir una solución posible.',
    scene: 'Recorrido de una idea',
    steps: ['Definir necesidad', 'Diseñar el flujo', 'Revisar prototipo'],
    outcomes: ['La necesidad queda descrita en una ficha.', 'Se conecta la idea con un posible recorrido de uso.', 'El prototipo queda listo para recoger observaciones.'],
    cta: 'Cuéntanos qué quieres crear',
  },
];

function Scene({ area, step }) {
  if (area.id === 'commerce') {
    return <div className="mv-app-orders">
      <div className="mv-app-table-head"><span>Pedido</span><span>Estado</span><span>Stock</span></div>
      {['Pedido de ejemplo A', 'Pedido de ejemplo B', 'Pedido de ejemplo C'].map((label, index) =>
        <div className={'mv-app-table-row' + (index === 0 && step > 0 ? ' is-highlighted' : '')} key={label}>
          <span><Icon name="layers" size={16} />{label}</span>
          <span className={index === 0 && step > 0 ? 'mv-app-state' : ''}>{index === 0 ? ['Pendiente', 'Registrado', 'Reservado', 'Preparado'][step] : 'En revisión'}</span>
          <span>{index === 0 && step > 1 ? 'Reservado' : 'Disponible'}</span>
        </div>)}
      <div className="mv-app-scene-note"><Icon name="store" size={18} /><span>{step > 1 ? 'Inventario actualizado en esta demostración.' : 'Pedidos e inventario en una misma vista.'}</span></div>
    </div>;
  }
  if (area.id === 'logistics') {
    return <div className="mv-app-route">
      <div className="mv-app-route-map" aria-hidden="true">
        <svg viewBox="0 0 480 130" fill="none">
          <path className="mv-app-map-grid" d="M0 32H480M0 65H480M0 98H480M60 0V130M140 0V130M220 0V130M300 0V130M380 0V130M460 0V130" />
          <path className="mv-app-map-path" d="M65 82H165Q185 82 185 62V43Q185 28 205 28H280Q300 28 300 48V62Q300 82 320 82H410" />
          <path className={'mv-app-map-progress phase-' + step} d="M65 82H165Q185 82 185 62V43Q185 28 205 28H280Q300 28 300 48V62Q300 82 320 82H410" pathLength="100" />
          <circle cx="65" cy="82" r="8" className="mv-app-map-node" /><circle cx="245" cy="28" r="8" className={step > 1 ? 'mv-app-map-node' : 'mv-app-map-node-muted'} /><circle cx="410" cy="82" r="8" className={step > 2 ? 'mv-app-map-node' : 'mv-app-map-node-muted'} />
        </svg>
        <div className="mv-app-route-labels"><span>Origen</span><span>En recorrido</span><span>Destino</span></div>
      </div>
      <div className="mv-app-scene-note"><Icon name="truck" size={22} /><div><strong>Entrega de ejemplo</strong><span>{['Por asignar', 'Recorrido asignado', 'En recorrido', 'Recepción registrada'][step]}</span></div></div>
    </div>;
  }
  if (area.id === 'professional') {
    return <div className="mv-app-dossier">
      <div className="mv-app-folder"><Icon name="briefcase" size={28} /><strong>Expediente de ejemplo</strong><span>{step > 0 ? 'Solicitud registrada' : 'Solicitud por revisar'}</span></div>
      <div className="mv-app-document-list">
        <div><Icon name="layers" size={18} /><span>Antecedentes</span><small>{step > 1 ? 'Vinculados' : 'Por organizar'}</small></div>
        <div><Icon name="layers" size={18} /><span>Documento de trabajo</span><small>{step > 1 ? 'Vinculado' : 'Por organizar'}</small></div>
        <div className={step > 2 ? 'is-highlighted' : ''}><Icon name="check" size={18} /><span>Próxima revisión</span><small>{step > 2 ? 'Recordatorio preparado' : 'Por definir'}</small></div>
      </div>
    </div>;
  }
  if (area.id === 'education') {
    return <div className="mv-app-classroom">
      <div className="mv-app-course-heading"><Icon name="layers" size={26} /><div><strong>Curso de ejemplo</strong><span>{step > 0 ? 'Inscripción registrada' : 'Inscripción pendiente'}</span></div><span className="mv-app-course-progress">{step > 2 ? '1 / 3' : '0 / 3'}<small>módulos</small></span></div>
      <div className="mv-app-course-track" aria-hidden="true"><span style={{ width: step > 2 ? '33.333%' : '0%' }} /></div>
      <div className="mv-app-modules">{['Introducción', 'Recursos', 'Actividad'].map((label, index) => <div key={label} className={index === 0 && step > 1 ? 'is-highlighted' : ''}><span>{label}</span><small>{index === 0 ? (step > 2 ? 'Completado' : step > 1 ? 'Disponible' : 'Por habilitar') : 'Próximo módulo'}</small></div>)}</div>
    </div>;
  }
  if (area.id === 'property') {
    return <div className="mv-app-property">
      <div className="mv-app-property-art" aria-hidden="true"><svg viewBox="0 0 200 150" fill="none"><path d="M32 125V52l64-28 69 28v73M96 24v101M20 125h160M48 69l30-12v22L48 90V69ZM48 101l30-9v21l-30 5v-17ZM113 58l34 12v22l-34-11V58ZM113 94l34 9v16l-34-5V94Z" /><path d="M32 52l64 27 69-27" /></svg></div>
      <div className="mv-app-property-detail"><span className="mv-app-mini-label">Propiedad de ejemplo</span><strong>Espacio por descubrir</strong><div><span>Consulta</span><b>{step > 0 ? 'Recibida' : 'Pendiente'}</b></div><div><span>Propiedad</span><b>{step > 1 ? 'Vinculada' : 'Por vincular'}</b></div><div><span>Seguimiento</span><b>{step > 2 ? 'Preparado' : 'Por preparar'}</b></div></div>
    </div>;
  }
  return <div className="mv-app-project">
    <div className="mv-app-project-flow">{['Necesidad', 'Diseño', 'Prototipo'].map((label, index) => <div className={step > index ? 'is-highlighted' : ''} key={label}><Icon name={['message', 'workflow', 'globe'][index]} size={22} /><strong>{label}</strong><span>{step > index ? ['Definida', 'Flujo conectado', 'Listo para revisar'][index] : 'Por explorar'}</span></div>)}</div>
    <div className="mv-app-scene-note"><Icon name="spark" size={18} /><span>Un punto de partida adaptable a tu proyecto.</span></div>
  </div>;
}

export default function Applications() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const area = areas[active];

  function selectArea(index) {
    setActive(index);
    setStep(0);
  }

  function requestSolution() {
    const note = [
      'Aplicación explorada en MUVORY (ejemplo ilustrativo)',
      'Área: ' + area.name,
      'Interés: ' + area.title,
      'Posible recorrido: ' + area.steps.join(' · ') + '.',
    ].join('\n');
    window.dispatchEvent(new CustomEvent('muvory:diagnostic', { detail: note }));
  }

  return <div className="mv-applications">
    <div className="mv-app-selector" role="group" aria-label="Selecciona un área de aplicación">
      <p className="mv-app-selector-label">Elige tu contexto</p>
      {areas.map((item, index) => <button type="button" className="mv-app-area-button" key={item.id} aria-pressed={active === index} aria-controls="mv-app-detail" onClick={() => selectArea(index)}><Icon name={item.icon} size={20} /><span>{item.name}</span></button>)}
      <p className="mv-app-selector-note">Una misma tecnología.<br />Distintas formas de aportar.</p>
    </div>

    <div className="mv-app-detail" id="mv-app-detail">
      <div className="mv-app-intro">
        <span className="mv-app-eyebrow">Posibilidades para tu área</span>
        <h3>{area.title}</h3>
        <p className="mv-app-problem">{area.problem}</p>
        <p className="mv-app-description">{area.description}</p>
      </div>

      <div className="mv-app-simulation" aria-label={'Demostración de ' + area.name}>
        <div className="mv-app-scene-header"><span><Icon name={area.icon} size={17} />{area.scene}</span><span className="mv-app-demo-label">Ejemplo interactivo</span></div>
        <div className="mv-app-scene"><Scene area={area} step={step} /></div>
        <ol className="mv-app-steps" aria-label="Etapas de la simulación">{area.steps.map((label, index) => <li key={label} className={step > index ? 'is-complete' : ''} aria-current={step === index ? 'step' : undefined}><span className="mv-app-step-marker" aria-hidden="true">{step > index ? <Icon name="check" size={14} /> : index + 1}</span><span>{label}</span><span className="mv-app-sr-only">{step > index ? ', completado' : ', pendiente'}</span></li>)}</ol>
        <div className="mv-app-simulation-controls"><button type="button" className="mv-app-run" onClick={() => setStep(current => Math.min(3, current + 1))} disabled={step === 3}>{step === 0 ? 'Iniciar simulación' : step === 3 ? 'Simulación completada' : 'Simular siguiente paso'}</button><button type="button" className="mv-app-reset" onClick={() => setStep(0)} disabled={step === 0}>Reiniciar</button><span className="mv-app-count">{step} de 3 pasos</span></div>
        <p className="mv-app-feedback" role="status" aria-live="polite" aria-atomic="true">{step === 0 ? 'Explora el proceso paso a paso, sin modificar datos reales.' : area.outcomes[step - 1]}</p>
      </div>

      <div className="mv-app-footer"><p>Demostración local con datos ficticios.<br />No representa un caso real ni un sistema conectado.</p><a href="#contacto" onClick={requestSolution}>{area.cta}</a></div>
    </div>
  </div>;
}
