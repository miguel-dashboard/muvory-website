// Original, fictional playback scenarios. Each scene uses the actual demo UI.
export const sceneSeconds=6;
export const productStories={
 control:{title:'Del problema a la decisión',accent:'control',scenes:[
  {title:'01. Una operación visible',caption:'El supervisor comienza con cinco entregas de ejemplo y sus estados.',focus:'Resumen de entregas',scene:{filter:'Todas',selected:'D-105'}},
  {title:'02. Detectar la incidencia',caption:'El filtro de incidencias reduce la vista a los casos que requieren atención.',focus:'Filtrar incidencias',scene:{filter:'Incidencia',selected:'D-105'}},
  {title:'03. Identificar el origen',caption:'La entrega D-105 señala una demora en bodega; la causa queda visible para el equipo.',focus:'Origen: Bodega',scene:{filter:'Incidencia',selected:'D-105'}},
  {title:'04. Resolver y comprobar',caption:'Al simular el cierre de D-105, la cantidad de entregas completadas aumenta y las incidencias disminuyen.',focus:'Indicadores actualizados',scene:{filter:'Todas',selected:'D-105',resolved:['D-105']}}
 ]},
 recruit:{title:'De una visita a una postulación',accent:'recruit',scenes:[
  {title:'01. Captar el interés',caption:'Una persona con un vehículo explora las opciones de una postulación de ejemplo.',focus:'Formulario de captación',scene:{view:'Postulación'}},
  {title:'02. Completar el perfil',caption:'Selecciona un camión y una operación de primera milla. No se solicitan datos personales.',focus:'Vehículo y operación',scene:{view:'Postulación',vehicle:'Camión',operation:'Primera milla'}},
  {title:'03. Organizar la revisión',caption:'La postulación simulada ingresa al pipeline y pasa a revisión.',focus:'Pipeline · En revisión',scene:{view:'Pipeline',vehicle:'Camión',operation:'Primera milla',status:'En revisión'}},
  {title:'04. Registrar una decisión',caption:'El perfil de prueba llega a aprobado. Esta acción no asigna un cupo ni envía información.',focus:'Pipeline · Aprobado',scene:{view:'Pipeline',vehicle:'Camión',operation:'Primera milla',status:'Aprobado'}}
 ]},
 ventas:{title:'Del producto a la nota de venta',accent:'ventas',scenes:[
  {title:'01. Iniciar una nota',caption:'Abrimos una nota conceptual con un producto de ejemplo, sin datos del cliente.',focus:'Nueva nota',scene:{qty:[1,0,0]}},
  {title:'02. Seleccionar cantidades',caption:'Añadimos dos unidades del producto B. El total cambia automáticamente.',focus:'Cantidad y subtotal',scene:{qty:[1,2,0]}},
  {title:'03. Revisar el total',caption:'Agregamos el producto C y comprobamos el importe de $35.700.',focus:'Total calculado',scene:{qty:[1,2,1]}},
  {title:'04. Confirmar el registro',caption:'La nota de ejemplo queda registrada solo en esta demostración local.',focus:'Nota NV-DEMO registrada',scene:{qty:[1,2,1],saved:true}}
 ]}
};
export function getStory(type){return productStories[type]||productStories.control;}
export function sceneIndex(seconds,count){return Math.max(0,Math.min(count-1,Math.floor(seconds/sceneSeconds)));}
