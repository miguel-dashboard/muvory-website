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
 const ref=useRef(null);
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
  if(!expanded)return;
  const onKey=e=>{if(e.key==='Escape')setExpanded(false);};
  window.addEventListener('keydown',onKey);
  return ()=>window.removeEventListener('keydown',onKey);
 },[expanded]);
 const seek=value=>{setPlaying(false);setSeconds(Math.max(0,Math.min(duration,value)));};
 const toggle=()=>{if(seconds===duration)setSeconds(0);setPlaying(p=>!p);};
 return <div ref={ref} className={'mf-player mf-'+type+(expanded?' mf-expanded':'')} aria-label={'Recorrido animado: '+story.title}>
  <div className="mf-header"><span><Icon name="spark" size={16}/> MUVORY / PRODUCT STORIES</span><span>RECREACIÓN ANIMADA · 24 S</span><button type="button" aria-expanded={expanded} onClick={()=>setExpanded(v=>!v)}>{expanded?'Reducir':'Ampliar'} <Icon name="arrowUp" size={15}/></button></div>
  <div className="mf-stage">
   <div className="mf-story-copy" key={index}><span className="mf-scene-kicker">ESCENA {index+1} / {story.scenes.length}</span><h3>{current.title}</h3><p>{current.caption}</p><span className="mf-focus"><span/> {current.focus}</span></div>
   <div className="mf-screen"><div className="mf-screen-inner" key={type+'-'+index} inert={true} aria-hidden="true"><ProductLab type={type} scene={current.scene}/></div><span className="mf-screen-tag">INTERFAZ DE DEMOSTRACIÓN</span></div>
  </div>
  <div className="mf-caption" aria-live="polite">{current.caption}</div>
  <div className="mf-transport">
   <button type="button" className="mf-play" onClick={toggle} aria-label={playing?'Pausar reproducción':seconds===duration?'Repetir reproducción':'Reproducir presentación'}>{playing?'Ⅱ':seconds===duration?'↻':'▶'} <span>{playing?'Pausar':seconds===duration?'Repetir':'Reproducir'}</span></button>
   <span className="mf-time">{formatTime(seconds)} / {formatTime(duration)}</span>
   <input type="range" min="0" max={duration} step="1" value={seconds} aria-label="Posición del recorrido en segundos" onChange={e=>seek(Number(e.target.value))}/>
   <button type="button" onClick={()=>seek((index-1)*sceneSeconds)} disabled={index===0} aria-label="Escena anterior">‹</button>
   <button type="button" onClick={()=>seek((index+1)*sceneSeconds)} disabled={index===story.scenes.length-1} aria-label="Escena siguiente">›</button>
  </div>
  <div className="mf-chapters" role="group" aria-label="Escenas de la presentación">{story.scenes.map((s,i)=><button type="button" key={s.title} aria-pressed={index===i} onClick={()=>seek(i*sceneSeconds)}><small>0{i+1}</small><span>{s.focus}</span></button>)}</div>
  <div className="mf-footer"><span>Recreación con datos ficticios; no es una grabación del sistema real.</span>{onTry&&<button type="button" onClick={()=>{setPlaying(false);setExpanded(false);onTry();}}>Ahora pruébalo tú <Icon name="arrow" size={16}/></button>}</div>
 </div>;
}
