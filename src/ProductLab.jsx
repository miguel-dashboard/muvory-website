import {useState} from 'react';
import Icon from './Icon.jsx';
import './product-lab.css';

const deliveryExamples=[
 ['D-104','Maipú','Entregada','Sin incidencia'],['D-105','Pudahuel','Incidencia','Bodega'],['D-106','La Reina','En ruta','Sin incidencia'],['D-107','Santiago','Pendiente','Planificación'],['D-108','Las Condes','Incidencia','Dirección']
];
const salesProducts=[['Producto A',12500],['Producto B',8900],['Producto C',5400]];
const money=n=>new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP'}).format(n);
const previews={
 control:{name:'MR&B / CONTROL TOWER',title:'Resumen operativo',tabs:['Entregas','Incidencias','Flota'],metrics:[['Entregadas','18'],['En ruta','6'],['Incidencias','2']],rows:[['D-104','Entregada'],['D-105','Bodega'],['D-106','En ruta']]},
 recruit:{name:'MR&B / RECRUIT',title:'Tu próxima ruta comienza aquí',tabs:['Postulación','Revisión','Pipeline'],metrics:[['Nuevos','8'],['En revisión','4'],['Aprobados','2']],rows:[['Furgón','Nuevo'],['Camioneta','En revisión'],['Camión','Aprobado']]},
 ventas:{name:'GESTIÓN COMERCIAL',title:'Nueva nota de venta',tabs:['Productos','Notas','Seguimiento'],metrics:[['Producto A','$12.500'],['Producto B','$8.900'],['Total','$21.400']],rows:[['Nota 001','Registrada'],['Nota 002','Borrador']]}
};
export function ProductPreview({type}){
 const d=previews[type]||previews.control;
 return <div className={'ml-preview ml-'+type} aria-hidden="true">
  <div className="ml-top"><span>{d.name}</span><i/><i/><i/></div>
  <div className="ml-preview-body"><div className="ml-side">{d.tabs.map(t=><span key={t}>{t}</span>)}</div><div className="ml-content"><strong>{d.title}</strong><div className="ml-metrics">{d.metrics.map(([label,value])=><div key={label}><small>{label}</small><b>{value}</b></div>)}</div><div className="ml-mini-table">{d.rows.map(([a,b])=><div key={a}><span>{a}</span><em>{b}</em></div>)}</div></div></div>
 </div>;
}
function LabFrame({type,title,children,reset}){
 return <div className={'ml-lab ml-'+type}><div className="ml-top"><span>{title}</span><span>SIMULACIÓN LOCAL</span></div><div className="ml-lab-body">{children}</div><footer><span>Datos ficticios · No se envía información</span><button type="button" onClick={reset}>Reiniciar demo</button></footer></div>;
}
function Controls({items,value,onChange,label}){
 return <div className="ml-controls" role="group" aria-label={label}>{items.map(item=><button type="button" key={item} aria-pressed={value===item} onClick={()=>onChange(item)}>{item}</button>)}</div>;
}
export function ControlLab(){
 const [filter,setFilter]=useState('Todas');const [selected,setSelected]=useState('D-105');const [resolved,setResolved]=useState([]);
 const rows=deliveryExamples.map(row=>resolved.includes(row[0])?[row[0],row[1],'Entregada',row[3]]:row);
 const visible=rows.filter(r=>filter==='Todas'||r[2]===filter);
 const detail=visible.find(r=>r[0]===selected)||visible[0];
 return <LabFrame type="control" title="MR&B CONTROL TOWER" reset={()=>{setFilter('Todas');setSelected('D-105');setResolved([]);}}>
 <h3>Control de entregas</h3><div className="ml-metrics">{['Entregada','En ruta','Incidencia'].map(s=><div key={s}><small>{s}</small><b>{rows.filter(r=>r[2]===s).length}</b></div>)}</div>
 <Controls items={['Todas','Entregada','En ruta','Pendiente','Incidencia']} value={filter} onChange={setFilter} label="Filtrar entregas"/>
 <div className="ml-table-wrap"><table><thead><tr><th>Entrega</th><th>Comuna</th><th>Estado</th><th>Origen</th></tr></thead><tbody>{visible.map(r=><tr key={r[0]}><td><button type="button" aria-pressed={detail?.[0]===r[0]} onClick={()=>setSelected(r[0])}>{r[0]}</button></td><td>{r[1]}</td><td><span className="ml-state">{r[2]}</span></td><td>{r[3]}</td></tr>)}</tbody></table>{!visible.length&&<p>No hay entregas en este filtro.</p>}</div>
 {detail&&<div className="ml-inspector" aria-live="polite"><div><small>ENTREGA {detail[0]}</small><strong>{detail[3]==='Sin incidencia'?'Seguimiento operativo':'Origen registrado: '+detail[3]}</strong><p>{detail[2]==='Incidencia'?'Revisa el origen y simula el cierre del caso.':'Estado actual: '+detail[2]}</p></div>{detail[2]==='Incidencia'&&<button type="button" onClick={()=>setResolved(a=>[...a,detail[0]])}>Simular resolución</button>}</div>}
 </LabFrame>;
}
export function RecruitLab(){
 const [vehicle,setVehicle]=useState('Furgón');const [operation,setOperation]=useState('Distribución urbana');const [availability,setAvailability]=useState('Jornada completa');const [status,setStatus]=useState('');const [view,setView]=useState('Postulación');
 const reset=()=>{setVehicle('Furgón');setOperation('Distribución urbana');setAvailability('Jornada completa');setStatus('');setView('Postulación');};
 return <LabFrame type="recruit" title="MR&B RECRUIT" reset={reset}>
 <Controls items={['Postulación','Pipeline']} value={view} onChange={setView} label="Vista del reclutamiento"/>
 {view==='Postulación'?<><h3>Tu vehículo. Nuevas posibilidades.</h3><p>Prueba un perfil de ejemplo, sin ingresar datos personales.</p><div className="ml-form"><label>Tipo de vehículo<select value={vehicle} onChange={e=>setVehicle(e.target.value)}>{['Furgón','Camioneta','Camión'].map(v=><option key={v}>{v}</option>)}</select></label><label>Operación<select value={operation} onChange={e=>setOperation(e.target.value)}>{['Distribución urbana','Reparto comercial','Primera milla'].map(v=><option key={v}>{v}</option>)}</select></label><label>Disponibilidad<select value={availability} onChange={e=>setAvailability(e.target.value)}>{['Jornada completa','Parcial'].map(v=><option key={v}>{v}</option>)}</select></label></div><button className="ml-primary" type="button" disabled={!!status} onClick={()=>{setStatus('Nuevo');setView('Pipeline');}}>Simular postulación</button>{status&&<p>Ya existe una postulación simulada. Reinicia para crear otra.</p>}</>:<><h3>Pipeline de postulaciones</h3><div className="ml-pipeline">{['Nuevo','En revisión','Aprobado'].map(s=><div key={s}><small>{s}</small><b>{status===s?1:0}</b>{status===s&&<p>{vehicle}<br/>{operation}<br/>{availability}</p>}</div>)}</div>{status&&status!=='Aprobado'?<button className="ml-primary" type="button" onClick={()=>setStatus(status==='Nuevo'?'En revisión':'Aprobado')}>Avanzar a {status==='Nuevo'?'revisión':'aprobado'}</button>:<p role="status">{status?'Perfil de ejemplo aprobado. No se asigna un cupo real.':'Crea una postulación de ejemplo para probar el pipeline.'}</p>}</>}
 </LabFrame>;
}
export function SalesLab(){
 const [qty,setQty]=useState([1,0,0]);const [saved,setSaved]=useState(false);
 const total=qty.reduce((sum,n,i)=>sum+n*salesProducts[i][1],0);
 return <LabFrame type="ventas" title="NOTAS DE VENTA / EJEMPLO CONCEPTUAL" reset={()=>{setQty([1,0,0]);setSaved(false);}}>
 <h3>{saved?'Nota de ejemplo registrada':'Nueva nota de venta'}</h3><p>Flujo conceptual, no es una copia del sistema del cliente.</p>
 <div className="ml-table-wrap"><table><thead><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr></thead><tbody>{salesProducts.map(([name,price],i)=><tr key={name}><td>{name}</td><td>{money(price)}</td><td><input aria-label={'Cantidad '+name} type="number" min="0" max="99" value={qty[i]} disabled={saved} onChange={e=>setQty(old=>old.map((n,j)=>j===i?Math.min(99,Math.max(0,Math.trunc(Number(e.target.value)||0))):n))}/></td><td>{money(qty[i]*price)}</td></tr>)}</tbody></table></div>
 <div className="ml-inspector"><div><small>TOTAL ILUSTRATIVO</small><strong aria-live="polite">{money(total)}</strong></div><button type="button" disabled={!total||saved} onClick={()=>setSaved(true)}>{saved?'Registrada':'Simular registro'}</button></div>{saved&&<p role="status">Nota NV-DEMO · Guardada solo durante esta sesión de demostración.</p>}
 </LabFrame>;
}
export function ProductLab({type}){return type==='control'?<ControlLab/>:type==='recruit'?<RecruitLab/>:<SalesLab/>;}
