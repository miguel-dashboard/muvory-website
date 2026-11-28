import {useEffect,useState,useRef} from 'react';
import Icon from './Icon.jsx';
import {ProductLab} from './ProductLab.jsx';
import {getStory,sceneIndex,sceneSeconds} from './product-stories.js';
import './product-film.css';

const formatTime=seconds=>'0:'+String(seconds).padStart(2,'0');
export default function ProductFilm({type='control',onTry}){
 const story=getStory(type);
 const duration=story.scenes.length*sceneSeconds;
 const [seconds,setSeconds]=useState(0);
 const [playing,setPlaying]=useState(false);
 const [expanded,setExpanded]=useState(false);
 const dialogRef=useRef(null);
 const launchRef=useRef(null);
 const closeRef=useRef(null);
 const touchStart=useRef(null);
 const index=sceneIndex(seconds,story.scenes.length);
 const current=story.scenes[index];
 useEffect(()=>{setSeconds(0);setPlaying(false);},[type]);
 useEffect(()=>{
  if(!playing)return;
  const id=window.setInterval(()=>setSeconds(s=>Math.min(duration,s+1)),1000);
  return ()=>window.clearInterval(id);
 },[playing,duration]);
 useEffect(()=>{if(seconds===duration)setPlaying(false);},[seconds,duration]);
 useEffect(()=>{
  const dialog=dialogRef.current;
  if(!expanded||!dialog)return;
  if(!dialog.open)dialog.showModal();
  closeRef.current?.focus();
  return ()=>{if(dialog.open)dialog.close();};
 },[expanded]);
 const closeCinema=()=>{setExpanded(false);window.requestAnimationFrame(()=>launchRef.current?.focus());};
 const seek=value=>{setPlaying(false);setSeconds(Math.max(0,Math.min(duration,value)));};
 const toggle=()=>{if(seconds===duration)setSeconds(0);setPlaying(p=>!p);};
 const onPlayerKey=e=>{if(e.target.closest('button,input,select,textarea,a'))return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();seek((index+(e.key==='ArrowRight'?1:-1))*sceneSeconds);}if(e.code==='Space'){e.preventDefault();toggle();}};
 const player=<div tabIndex={0} onKeyDown={onPlayerKey} className={'mf-player mf-'+type+(expanded?' mf-expanded':'')} aria-label={'Recorrido animado: '+story.title}>
  <div className="mf-header"><span><Icon name="spark" size={16}/> MUVORY / PRODUCT STORIES</span><span>RECREACIÓN ANIMADA · 24 S</span><button ref={expanded?closeRef:launchRef} type="button" aria-expanded={expanded} onClick={()=>expanded?closeCinema():setExpanded(true)}>{expanded?'Salir de cine':'Modo cine'} <Icon name={expanded?'close':'arrowUp'} size={15}/></button></div>
  <div className="mf-stage" onTouchStart={e=>{touchStart.current=[e.touches[0].clientX,e.touches[0].clientY];}} onTouchEnd={e=>{const start=touchStart.current;touchStart.current=null;if(!start)return;const dx=e.changedTouches[0].clientX-start[0],dy=e.changedTouches[0].clientY-start[1];if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.5)seek((index+(dx<0?1:-1))*sceneSeconds);}}>
   <div className="mf-story-copy" key={index}><span className="mf-scene-kicker">ESCENA {index+1} / {story.scenes.length}</span><h3>{current.title}</h3><p>{current.caption}</p><span className="mf-focus"><span/> {current.focus}</span></div>
   <div className="mf-screen"><div className="mf-screen-inner" data-scene={index} key={type+'-'+index} inert={true} aria-hidden="true"><ProductLab type={type} scene={current.scene}/></div><span className="mf-screen-tag">INTERFAZ DE DEMOSTRACIÓN</span></div>
  </div>
  <div className="mf-caption" aria-live={playing?"off":"polite"}>{current.caption}</div>
  <div className="mf-transport">
   <button type="button" className="mf-play" onClick={toggle} aria-label={playing?'Pausar reproducción':seconds===duration?'Repetir reproducción':'Reproducir presentación'}>{playing?'Ⅱ':seconds===duration?'↻':'▶'} <span>{playing?'Pausar':seconds===duration?'Repetir':'Reproducir'}</span></button>
   <span className="mf-time">{formatTime(seconds)} / {formatTime(duration)}</span>
   <input type="range" min="0" max={duration} step="1" value={seconds} aria-label="Posición del recorrido en segundos" onChange={e=>seek(Number(e.target.value))}/>
   <button type="button" onClick={()=>seek((index-1)*sceneSeconds)} disabled={index===0} aria-label="Escena anterior">‹</button>
   <button type="button" onClick={()=>seek((index+1)*sceneSeconds)} disabled={index===story.scenes.length-1} aria-label="Escena siguiente">›</button>
  </div>
  <div className="mf-chapters" role="group" aria-label="Escenas de la presentación">{story.scenes.map((s,i)=><button type="button" key={s.title} aria-pressed={index===i} onClick={()=>seek(i*sceneSeconds)}><small>0{i+1}</small><span>{s.focus}</span></button>)}</div>
  <div className="mf-footer"><span>Recreación con datos ficticios; no es una grabación del sistema real.</span>{onTry&&<button type="button" onClick={()=>{setPlaying(false);if(expanded)closeCinema();window.requestAnimationFrame(()=>onTry());}}>Ahora pruébalo tú <Icon name="arrow" size={16}/></button>}</div>
 </div>;
 return <><div className="mf-inline-slot">{!expanded?player:<div className="mf-placeholder">Presentación abierta en modo cine.</div>}</div><dialog ref={dialogRef} className="mf-cinema-dialog" aria-label={'Modo cine: '+story.title} onCancel={e=>{e.preventDefault();closeCinema();}}>{expanded&&player}</dialog></>;
}
