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
const statusTone=s=>({'Entregada':'ok','En ruta':'route','Incidencia':'alert','Pendiente':'wait','Nuevo':'route','En revisión':'wait','Aprobado':'ok'}[s]||'neutral');
function PreviewTop({name}){return <div className="ml-top"><span className="ml-brand-mark"><Icon name="layers" size={13}/></span><span>{name}</span><i/><i/><i/></div>;}
function MiniRoute(){return <svg viewBox="0 0 210 100" role="presentation" className="ml-mini-route"><rect width="210" height="100" rx="7" fill="#102630"/><g stroke="#36515a" strokeWidth="1" fill="none"><path d="M0 22L210 42M0 65L210 81M32 0L74 100M105 0L122 100M172 0L162 100M0 96L210 8M0 39L210 52"/></g><path d="M22 75L60 49L101 60L137 22L184 35" stroke="#6edbdc" strokeWidth="3" strokeDasharray="4 4" fill="none"/>{[[22,75],[60,49],[101,60],[137,22],[184,35]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5" fill={i===2?'#ffbd75':'#8ce7ef'} stroke="#0b2632" strokeWidth="2"/>)}</svg>;}
export function ProductPreview({type}){
 const d=previews[type]||previews.control;
 return <div className={'ml-preview ml-'+type} aria-hidden="true">
  <PreviewTop name={d.name}/>
  {type==='recruit'?<div className="ml-recruit-preview"><div className="ml-recruit-hero"><span>ÚNETE A NUEVAS RUTAS</span><strong>Tu vehículo.<br/>Tu oportunidad.</strong><div className="ml-truck-art"><Icon name="truck" size={35}/><span>Distribución urbana</span></div></div><div className="ml-recruit-preview-form"><small>POSTULACIÓN · 01 / 03</small><b>Selecciona tu vehículo</b><div className="ml-fake-field">Furgón <span>⌄</span></div><div className="ml-fake-field">Jornada completa <span>⌄</span></div><div className="ml-fake-cta">Continuar <Icon name="arrow" size={12}/></div></div><div className="ml-preview-pipeline">{['Nuevo','En revisión','Aprobado'].map((s,i)=><div key={s}><span>{s}</span><b>{[8,4,2][i]}</b><i/></div>)}</div></div>
  :type==='ventas'?<div className="ml-sales-preview"><div className="ml-sales-head"><div><small>GESTIÓN / NOTAS</small><strong>Nueva nota de venta</strong></div><span>NV-DEMO</span></div><div className="ml-sales-sheet"><div className="ml-sales-row ml-sales-label"><span>Producto</span><span>Cant.</span><span>Subtotal</span></div>{[['Producto A','1','$12.500'],['Producto B','1','$8.900'],['Producto C','0','$0']].map(row=><div className="ml-sales-row" key={row[0]}>{row.map((v,i)=><span key={i}>{v}</span>)}</div>)}</div><div className="ml-sales-total"><span>TOTAL DE EJEMPLO</span><strong>$21.400</strong></div></div>
  :<div className="ml-preview-body"><div className="ml-side">{['Resumen',...d.tabs].map(t=><span key={t}><Icon name={t==='Resumen'?'chart':t==='Flota'?'truck':'layers'} size={12}/>{t}</span>)}</div><div className="ml-content"><strong>{d.title}</strong><div className="ml-metrics">{d.metrics.map(([label,value])=><div key={label}><small>{label}</small><b>{value}</b></div>)}</div><div className="ml-control-preview-lower"><MiniRoute/><div className="ml-mini-table">{d.rows.map(([a,b])=><div key={a}><span>{a}</span><em>{b}</em></div>)}</div></div></div></div>}
 </div>;
}
const labNav={control:[['chart','Operación'],['layers','Entregas'],['truck','Incidencias']],recruit:[['briefcase','Captación'],['workflow','Postulantes'],['layers','Pipeline']],ventas:[['store','Comercial'],['layers','Notas'],['chart','Totales']]};
function LabFrame({type,title,children,reset}){
 return <div className={'ml-lab ml-'+type}><div className="ml-top"><span className="ml-brand-mark"><Icon name="layers" size={16}/></span><span>{title}</span><span className="ml-demo-indicator">SIMULACIÓN LOCAL</span></div><div className="ml-workspace"><aside className="ml-lab-sidebar" aria-label="Módulos ilustrativos"><span>ESPACIO DE PRUEBA</span>{labNav[type].map(([icon,label],i)=><div key={label} className={i===0?'is-current':''}><Icon name={icon} size={17}/><span>{label}</span></div>)}<div className="ml-sidebar-foot"><i/> Entorno aislado</div></aside><div className="ml-lab-body">{children}</div></div><footer><span>Datos ficticios · No se envía información</span><button type="button" onClick={reset}>Reiniciar demo</button></footer></div>;
}
function Controls({items,value,onChange,label}){
 return <div className="ml-controls" role="group" aria-label={label}>{items.map(item=><button type="button" key={item} aria-pressed={value===item} onClick={()=>onChange(item)}>{item}</button>)}</div>;
}
export function ControlLab({scene}={}){
 const [filter,setFilter]=useState(scene?.filter||'Todas');const [selected,setSelected]=useState(scene?.selected||'D-105');const [resolved,setResolved]=useState(scene?.resolved||[]);
 const rows=deliveryExamples.map(row=>resolved.includes(row[0])?[row[0],row[1],'Entregada',row[3]]:row);
 const visible=rows.filter(r=>filter==='Todas'||r[2]===filter);
 const detail=visible.find(r=>r[0]===selected)||visible[0];
 return <LabFrame type="control" title="MR&B CONTROL TOWER" reset={()=>{setFilter('Todas');setSelected('D-105');setResolved([]);}}>
 <div className="ml-page-heading"><div><small>OPERACIÓN / DISTRIBUCIÓN</small><h3>Control de entregas</h3></div><span className="ml-state ml-state-ok">Datos de prueba</span></div><div className="ml-metrics">{['Entregada','En ruta','Incidencia'].map(s=><div key={s}><small>{s}</small><b>{rows.filter(r=>r[2]===s).length}</b><div className={"ml-meter ml-meter-"+statusTone(s)}><i style={{width:(rows.filter(r=>r[2]===s).length/rows.length*100)+"%"}}/></div></div>)}</div>
 <Controls items={['Todas','Entregada','En ruta','Pendiente','Incidencia']} value={filter} onChange={setFilter} label="Filtrar entregas"/>
 <div className="ml-table-wrap"><table><thead><tr><th>Entrega</th><th>Comuna</th><th>Estado</th><th>Origen</th></tr></thead><tbody>{visible.map(r=><tr key={r[0]}><td><button type="button" aria-pressed={detail?.[0]===r[0]} onClick={()=>setSelected(r[0])}>{r[0]}</button></td><td>{r[1]}</td><td><span className={"ml-state ml-state-"+statusTone(r[2])}>{r[2]}</span></td><td>{r[3]}</td></tr>)}</tbody></table>{!visible.length&&<p>No hay entregas en este filtro.</p>}</div>
 {detail&&<div className="ml-inspector" aria-live="polite"><div className="ml-inspector-copy"><span className="ml-inspector-symbol"><Icon name="workflow" size={20}/></span><div><small>ENTREGA {detail[0]}</small><strong>{detail[3]==='Sin incidencia'?'Seguimiento operativo':'Origen registrado: '+detail[3]}</strong><p>{detail[2]==='Incidencia'?'Revisa el origen y simula el cierre del caso.':'Estado actual: '+detail[2]}</p></div></div>{detail[2]==='Incidencia'&&<button type="button" onClick={()=>setResolved(a=>[...a,detail[0]])}>Simular resolución</button>}</div>}
 </LabFrame>;
}
export function RecruitLab({scene}={}){
 const [vehicle,setVehicle]=useState(scene?.vehicle||'Furgón');const [operation,setOperation]=useState(scene?.operation||'Distribución urbana');const [availability,setAvailability]=useState('Jornada completa');const [status,setStatus]=useState(scene?.status||'');const [view,setView]=useState(scene?.view||'Postulación');
 const reset=()=>{setVehicle('Furgón');setOperation('Distribución urbana');setAvailability('Jornada completa');setStatus('');setView('Postulación');};
 return <LabFrame type="recruit" title="MR&B RECRUIT" reset={reset}>
 <Controls items={['Postulación','Pipeline']} value={view} onChange={setView} label="Vista del reclutamiento"/>
 {view==='Postulación'?<><div className="ml-recruit-banner"><div><small>CAPTACIÓN DIGITAL</small><h3>Tu vehículo. Nuevas posibilidades.</h3><p>Prueba un perfil de ejemplo, sin ingresar datos personales.</p></div><Icon name="truck" size={44}/></div><div className="ml-form"><label>Tipo de vehículo<select disabled={!!status} value={vehicle} onChange={e=>setVehicle(e.target.value)}>{['Furgón','Camioneta','Camión'].map(v=><option key={v}>{v}</option>)}</select></label><label>Operación<select disabled={!!status} value={operation} onChange={e=>setOperation(e.target.value)}>{['Distribución urbana','Reparto comercial','Primera milla'].map(v=><option key={v}>{v}</option>)}</select></label><label>Disponibilidad<select disabled={!!status} value={availability} onChange={e=>setAvailability(e.target.value)}>{['Jornada completa','Parcial'].map(v=><option key={v}>{v}</option>)}</select></label></div><button className="ml-primary" type="button" disabled={!!status} onClick={()=>{setStatus('Nuevo');setView('Pipeline');}}>Simular postulación</button>{status&&<p>Ya existe una postulación simulada. Reinicia para crear otra.</p>}</>:<><h3>Pipeline de postulaciones</h3><div className="ml-pipeline">{['Nuevo','En revisión','Aprobado'].map(s=><div key={s}><div className="ml-pipeline-head"><span className={"ml-state ml-state-"+statusTone(s)}>{s}</span><b>{status===s?1:0}</b></div>{status===s?<div className="ml-candidate"><span><Icon name="truck" size={17}/></span><div><strong>{vehicle}</strong><p>{operation}<br/>{availability}</p><small>PERFIL DEMO</small></div></div>:<div className="ml-pipeline-empty">Sin postulantes</div>}</div>)}</div>{status&&status!=='Aprobado'?<button className="ml-primary" type="button" onClick={()=>setStatus(status==='Nuevo'?'En revisión':'Aprobado')}>Avanzar a {status==='Nuevo'?'revisión':'aprobado'}</button>:<p role="status">{status?'Perfil de ejemplo aprobado. No se asigna un cupo real.':'Crea una postulación de ejemplo para probar el pipeline.'}</p>}</>}
 </LabFrame>;
}
export function SalesLab({scene}={}){
 const [qty,setQty]=useState(scene?.qty||[1,0,0]);const [saved,setSaved]=useState(scene?.saved||false);
 const total=qty.reduce((sum,n,i)=>sum+n*salesProducts[i][1],0);
 return <LabFrame type="ventas" title="NOTAS DE VENTA / EJEMPLO CONCEPTUAL" reset={()=>{setQty([1,0,0]);setSaved(false);}}>
 <div className="ml-page-heading"><div><small>COMERCIAL / DOCUMENTOS</small><h3>{saved?'Nota de ejemplo registrada':'Nueva nota de venta'}</h3></div><span className={'ml-state ml-state-'+(saved?'ok':'wait')}>{saved?'Registrada':'Borrador'}</span></div><p>Flujo conceptual, no es una copia del sistema del cliente.</p>
 <div className="ml-table-wrap"><table><thead><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr></thead><tbody>{salesProducts.map(([name,price],i)=><tr key={name}><td>{name}</td><td>{money(price)}</td><td><input aria-label={'Cantidad '+name} type="number" min="0" max="99" value={qty[i]} disabled={saved} onChange={e=>setQty(old=>old.map((n,j)=>j===i?Math.min(99,Math.max(0,Math.trunc(Number(e.target.value)||0))):n))}/></td><td>{money(qty[i]*price)}</td></tr>)}</tbody></table></div>
 <div className="ml-inspector ml-invoice-total"><div><small>TOTAL ILUSTRATIVO</small><strong aria-live="polite">{money(total)}</strong></div><button type="button" disabled={!total||saved} onClick={()=>setSaved(true)}>{saved?'Registrada':'Simular registro'}</button></div>{saved&&<div className="ml-success" role="status"><Icon name="check" size={22}/><div><strong>Nota NV-DEMO registrada</strong><p>Guardada solo durante esta sesión de demostración.</p></div></div>}
 </LabFrame>;
}
export function ProductLab({type,scene}){return type==='control'?<ControlLab scene={scene}/>:type==='recruit'?<RecruitLab scene={scene}/>:<SalesLab scene={scene}/>;}
