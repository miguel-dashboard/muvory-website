import { useState, useRef } from 'react';
import Icon from './Icon.jsx';

const routes = [
  {slug:'software',title:'Software a medida',tag:'Sistemas',icon:'layers',description:'Plataformas que se adaptan a tu forma de trabajar.'},
  {slug:'automatizacion',title:'Automatización',tag:'Flujos',icon:'workflow',description:'Tareas conectadas para trabajar con menos fricción.'},
  {slug:'inteligencia-artificial',title:'Inteligencia artificial',tag:'IA aplicada',icon:'spark',description:'Asistentes útiles con personas al mando.'},
  {slug:'plataformas',title:'Plataformas digitales',tag:'Web',icon:'globe',description:'Experiencias donde cada clic lleva más lejos.'},
];

function NexusArtwork(){
  return <svg className="cinema-nexus-svg" viewBox="0 0 650 620" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="mv-nebula" cx="48%" cy="49%" r="55%">
        <stop offset="0%" stopColor="#2BB3C3" stopOpacity=".40"/>
        <stop offset="43%" stopColor="#0D475C" stopOpacity=".27"/>
        <stop offset="100%" stopColor="#071823" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="mv-nexus-core" cx="32%" cy="23%" r="88%">
        <stop offset="0%" stopColor="#CEFFFF"/>
        <stop offset="15%" stopColor="#7DE6E8"/>
        <stop offset="36%" stopColor="#1B8C9F"/>
        <stop offset="62%" stopColor="#043344"/>
        <stop offset="80%" stopColor="#011A2A"/>
        <stop offset="100%" stopColor="#46BCC4"/>
      </radialGradient>
      <linearGradient id="mv-nexus-ribbon" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#DAFFFE" stopOpacity=".95"/>
        <stop offset=".18" stopColor="#63CDDA" stopOpacity=".95"/>
        <stop offset=".48" stopColor="#114F68" stopOpacity=".20"/>
        <stop offset=".69" stopColor="#8EF6ED" stopOpacity=".80"/>
        <stop offset="1" stopColor="#0E3B55" stopOpacity=".18"/>
      </linearGradient>
      <linearGradient id="mv-nexus-liquid" x1="155" y1="60" x2="485" y2="530" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9BF7F2"/>
        <stop offset=".27" stopColor="#164F66"/>
        <stop offset=".5" stopColor="#021927"/>
        <stop offset=".76" stopColor="#65D4DB"/>
        <stop offset="1" stopColor="#0B344E"/>
      </linearGradient>
      <filter id="mv-nexus-blur" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="24"/></filter>
      <filter id="mv-nexus-shadow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>
    </defs>
    <circle cx="325" cy="300" r="270" fill="url(#mv-nebula)" />
    <ellipse cx="327" cy="546" rx="181" ry="16" fill="#4FE7DF" opacity=".19" filter="url(#mv-nexus-blur)"/>
    <g className="cinema-slow-orbit">
      <ellipse cx="325" cy="293" rx="266" ry="180" transform="rotate(-28 325 293)" fill="none" stroke="#83D8DE" strokeOpacity=".21" strokeWidth="1"/>
      <ellipse cx="325" cy="293" rx="265" ry="178" transform="rotate(26 325 293)" fill="none" stroke="#7FD8D9" strokeOpacity=".16" strokeDasharray="5 9"/>
    </g>
    <g className="cinema-nexus-body">
      <ellipse cx="326" cy="300" rx="179" ry="180" fill="url(#mv-nexus-core)" opacity=".65"/>
      <ellipse cx="326" cy="300" rx="180" ry="180" fill="none" stroke="#96F3F0" strokeOpacity=".42" strokeWidth="1.4"/>
      <g className="cinema-ribbon-one">
        <ellipse cx="326" cy="300" rx="192" ry="76" transform="rotate(-35 326 300)" fill="none" stroke="#51D4D4" strokeWidth="24" strokeOpacity=".15" filter="url(#mv-nexus-shadow)"/>
        <ellipse cx="326" cy="300" rx="192" ry="76" transform="rotate(-35 326 300)" fill="none" stroke="url(#mv-nexus-ribbon)" strokeWidth="14" strokeOpacity=".86"/>
        <ellipse cx="326" cy="300" rx="190" ry="76" transform="rotate(-35 326 300)" fill="none" stroke="#E7FFFF" strokeWidth="1.1" strokeOpacity=".62"/>
      </g>
      <g className="cinema-ribbon-two">
        <ellipse cx="326" cy="300" rx="196" ry="88" transform="rotate(44 326 300)" fill="none" stroke="url(#mv-nexus-liquid)" strokeWidth="21" strokeOpacity=".94"/>
        <ellipse cx="326" cy="300" rx="196" ry="88" transform="rotate(44 326 300)" fill="none" stroke="#D8FEF9" strokeWidth="1" strokeOpacity=".65"/>
      </g>
      <g className="cinema-ribbon-three">
        <ellipse cx="326" cy="300" rx="200" ry="99" transform="rotate(103 326 300)" fill="none" stroke="url(#mv-nexus-ribbon)" strokeWidth="10" strokeOpacity=".71"/>
      </g>
      <circle cx="326" cy="300" r="72" fill="#051C2A" stroke="#81D6DF" strokeOpacity=".18"/>
      <circle cx="326" cy="300" r="37" fill="#55E0DE" opacity=".22" filter="url(#mv-nexus-blur)"/>
      <circle cx="326" cy="300" r="19" fill="#B2FFFC" opacity=".76" />
      <circle cx="326" cy="300" r="6" fill="#ECFFFF" />
    </g>
    {Array.from({length:21},(_,i)=>{
      const angle=i*2.399;
      const rx=255+(i%4)*11;
      return <circle key={i} cx={325+Math.cos(angle)*rx} cy={300+Math.sin(angle)*rx*.85} r={i%5===0?2.4:1.1} fill="#9BF4F0" opacity={.2+(i%6)*.09}/>;
    })}
    <path d="M63 315C154 263 199 396 309 301S481 221 597 284" fill="none" stroke="#62E4E1" strokeOpacity=".2" strokeWidth="1.3"/>
    <path d="M76 346C190 428 227 227 350 296S506 350 590 217" fill="none" stroke="#ACFFFC" strokeOpacity=".49" strokeWidth="1.4"/>
  </svg>;
}

export default function CinematicHero(){
  const [active,setActive]=useState(0);
  const [paused,setPaused]=useState(false);
  const frameRef=useRef(null);
  const resetDepth=()=>{frameRef.current?.style.setProperty('--nexus-x','0deg');frameRef.current?.style.setProperty('--nexus-y','0deg');};
  const trackDepth=event=>{if(paused||event.pointerType!=='mouse'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const rect=event.currentTarget.getBoundingClientRect();event.currentTarget.style.setProperty('--nexus-x',((event.clientY-rect.top)/rect.height-.5)*-8+'deg');event.currentTarget.style.setProperty('--nexus-y',((event.clientX-rect.left)/rect.width-.5)*10+'deg');};
  return <div className={'cinema-visual'+(paused?' cinema-motion-paused':'')} aria-label="Explora las áreas de MUVORY">
    <div ref={frameRef} className="cinema-visual-frame" onPointerMove={trackDepth} onPointerLeave={resetDepth}>
      <span className="cinema-visual-label" aria-hidden="true"><span/> MUVORY / NEXUS</span>
      <div className="cinema-depth-layer"><NexusArtwork/></div>
      <div className="cinema-floating-links" aria-label="Explorar servicios">
        {routes.map((item,index)=><a
          key={item.slug}
          className={'cinema-floating-link cinema-floating-link-'+index+(active===index?' is-active':'')}
          href={'/servicios/'+item.slug}
          onMouseEnter={()=>setActive(index)}
          onFocus={()=>setActive(index)}>
          <Icon name={item.icon} size={17}/><span>{item.tag}</span><Icon name="arrowUp" size={12}/>
        </a>)}
      </div>
    </div>
    <div className="cinema-visual-caption">
      <div><span className="cinema-caption-index">0{active+1} / 04</span><strong>{routes[active].title}</strong><p>{routes[active].description}</p></div>
      <button type="button" className="cinema-motion-button" aria-pressed={paused} onClick={()=>{resetDepth();setPaused(v=>!v);}}>{paused?'Reanudar movimiento':'Pausar movimiento'}</button>
    </div>
  </div>;
}
