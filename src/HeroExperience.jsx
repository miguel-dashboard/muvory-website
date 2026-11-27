import { useState } from 'react';
import Icon from './Icon.jsx';

const scenarios = [
 {name:'Software', title:'Centraliza tu operación', input:'Solicitudes dispersas', steps:['Capturar solicitud','Validar información','Asignar responsable'], output:'Operación visible', metric:'3 registros', icon:'layers'},
 {name:'Automatización', title:'Conecta tus procesos', input:'Nuevo pedido', steps:['Leer pedido','Actualizar sistema','Notificar al equipo'], output:'Pedido sincronizado', metric:'3 tareas', icon:'workflow'},
 {name:'IA aplicada', title:'Convierte información en acción', input:'Consulta de cliente', steps:['Clasificar intención','Consultar información','Enviar a revisión humana'], output:'Respuesta preparada', metric:'3 etapas', icon:'spark'},
 {name:'Datos', title:'Detecta lo que requiere atención', input:'Datos de operación', steps:['Consolidar registros','Detectar desviación','Priorizar revisión'], output:'Alerta priorizada', metric:'3 señales', icon:'chart'}
];

export default function HeroExperience() {
 const [selected,setSelected]=useState(0);
 const [step,setStep]=useState(0);
 const active=scenarios[selected];
 return <div className="studio-console" aria-label="Laboratorio interactivo MUVORY">
  <div className="studio-top"><span><i/> MUVORY / LAB</span><span>01 — SIMULADOR</span></div>
  <div className="studio-tabs" role="group" aria-label="Selecciona una solución">{scenarios.map((item,i)=><button key={item.name} type="button" aria-pressed={selected===i} onClick={()=>{setSelected(i);setStep(0)}}>{item.name}</button>)}</div>
  <div className="studio-body">
   <div className="studio-caption">ESCENARIO 0{selected+1} / 04</div>
   <h2>{active.title}</h2>
   <div className="studio-input"><Icon name={active.icon} size={20}/><div><small>ENTRADA</small><strong>{active.input}</strong></div></div>
   <ol className="studio-flow">{active.steps.map((label,i)=><li key={label} data-state={step>i?'done':step===i?'next':'waiting'}><span>{step>i?'✓':'0'+(i+1)}</span><strong>{label}</strong><small>{step>i?'Listo':step===i?'Siguiente':'En espera'}</small></li>)}</ol>
   <div className="studio-result" role="status"><div><small>RESULTADO SIMULADO</small><strong>{step===3?active.output:'Flujo por completar'}</strong></div><b>{step}/3</b></div>
   <div className="studio-progress" aria-hidden="true"><span style={{width:(step/3*100)+'%'}}/></div>
   <button className="button button-primary studio-run" type="button" onClick={()=>setStep(v=>v===3?0:v+1)}>{step===3?'Reiniciar simulación':step===0?'Ejecutar simulación':'Continuar flujo'} <Icon name="arrow" size={18}/></button>
  </div>
  <div className="studio-bottom">Datos ficticios · Ejecución local · Sin servicios conectados</div>
 </div>;
}
