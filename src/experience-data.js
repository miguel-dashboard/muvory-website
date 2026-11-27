/**
 * Product tour content: examples are illustrative, not customer case studies.
 * MUVORY builds solutions for people, teams and organizations in many sectors.
 */
export const experienceSlides = Object.freeze([
  {
    id: 'software',
    number: '01',
    label: 'Software',
    icon: 'layers',
    kicker: 'SISTEMAS A MEDIDA',
    heading: 'Todo tu proyecto, en una sola vista.',
    description: 'Imagina solicitudes, personas y avances organizados en un espacio que se adapta a tu forma de trabajar.',
    benefits: ['Información centralizada', 'Responsables claros', 'Seguimiento sencillo'],
    scene: 'Panel de gestión',
    takeaway: 'En lugar de adaptar tu trabajo al software, diseñamos el software alrededor de tu necesidad.',
  },
  {
    id: 'automatizacion',
    number: '02',
    label: 'Automatización',
    icon: 'workflow',
    kicker: 'PROCESOS CONECTADOS',
    heading: 'Cada paso conectado con el siguiente.',
    description: 'Un flujo puede validar información, actualizar registros y avisar a las personas correctas sin repetir tareas.',
    benefits: ['Menos pasos manuales', 'Procesos visibles', 'Reglas bajo control'],
    scene: 'Flujo de ejemplo',
    takeaway: 'La automatización no reemplaza tu criterio: ayuda a ejecutar lo repetitivo con reglas claras.',
  },
  {
    id: 'inteligencia-artificial',
    number: '03',
    label: 'IA aplicada',
    icon: 'spark',
    kicker: 'ASISTENTES INTELIGENTES',
    heading: 'Asistencia cuando realmente aporta.',
    description: 'Explora cómo un asistente puede orientar consultas, ordenar información y apoyar análisis con supervisión humana.',
    benefits: ['Respuestas orientativas', 'Clasificación de consultas', 'Apoyo a decisiones'],
    scene: 'Laboratorio de IA',
    takeaway: 'La IA debe utilizar información autorizada y mantener una persona al mando de las decisiones importantes.',
  },
  {
    id: 'datos',
    number: '04',
    label: 'Datos',
    icon: 'chart',
    kicker: 'PANELES Y DASHBOARDS',
    heading: 'De datos dispersos a decisiones más claras.',
    description: 'Un tablero puede ayudarte a identificar tendencias, seguir tareas y entender dónde conviene actuar.',
    benefits: ['Indicadores útiles', 'Tendencias visibles', 'Seguimiento por periodo'],
    scene: 'Panel de indicadores',
    takeaway: 'Una buena visualización muestra lo que importa, no solo gráficos bonitos.',
  },
]);

export const softwareRecords = Object.freeze([
  { id:'SOL-101', title:'Solicitud de nuevo proyecto', owner:'Equipo de diseño', status:'En revisión' },
  { id:'SOL-102', title:'Revisión de prototipo', owner:'Equipo de desarrollo', status:'En curso' },
  { id:'SOL-103', title:'Publicación de contenido', owner:'Equipo de operaciones', status:'Completado' },
  { id:'SOL-104', title:'Organización de archivos', owner:'Equipo administrativo', status:'En curso' },
]);

export const workflowSteps = Object.freeze([
  { title:'Solicitud recibida', detail:'Una persona completa un formulario.' },
  { title:'Validación', detail:'Las reglas verifican los datos necesarios.' },
  { title:'Notificación', detail:'Se avisa al responsable correspondiente.' },
  { title:'Registro actualizado', detail:'El proceso deja su estado disponible.' },
]);

export const aiDemos = Object.freeze([
  {
    label:'Atención',
    question:'¿Cómo puedo comenzar con un sistema propio?',
    answer:'Podríamos partir identificando tu necesidad, quién utilizará la herramienta y las primeras funciones indispensables.',
  },
  {
    label:'Clasificación',
    question:'Recibí varias solicitudes, ¿cómo las organizo?',
    answer:'El sistema podría proponer categorías como consulta, soporte o proyecto nuevo para que cada solicitud llegue al responsable correcto.',
  },
  {
    label:'Análisis',
    question:'¿Qué puedo aprender de mis datos operativos?',
    answer:'Un asistente podría resumir incidencias frecuentes y señalar patrones para revisión humana, siempre con datos autorizados.',
  },
]);

export const chartExamples = Object.freeze([
  { label:'Solicitudes', values:[8,13,11,17,15,20], unit:'registros', headline:'20', subtitle:'registros de ejemplo en el último periodo' },
  { label:'Procesos', values:[5,9,12,10,15,18], unit:'procesos', headline:'18', subtitle:'procesos de ejemplo en el último periodo' },
  { label:'Seguimiento', values:[4,7,8,13,12,16], unit:'actividades', headline:'16', subtitle:'actividades de ejemplo en el último periodo' },
]);
