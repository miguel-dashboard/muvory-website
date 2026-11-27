import { useState } from 'react';
import Icon from './Icon.jsx';

function OrbVisual() {
  const particles = Array.from({ length: 74 }, (_, i) => {
    const angle = i * 2.399963229728653;
    const distance = Math.sqrt((i + 0.5) / 74);
    return {
      x: 330 + Math.cos(angle) * (74 + distance * 145),
      y: 263 + Math.sin(angle) * (27 + distance * 106),
      r: i % 9 === 0 ? 1.5 : 0.8,
      opacity: 0.22 + ((i * 7) % 10) / 15
    };
  });
  return (
    <div className="orb-scene" aria-label="Ilustración abstracta de conexiones digitales e inteligencia artificial" role="img">
      <svg viewBox="0 0 660 540" className="orb-svg" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="orb-core" cx="33%" cy="25%" r="75%">
            <stop offset="0%" stopColor="#A4FFFF" stopOpacity=".46" />
            <stop offset="21%" stopColor="#2B91A0" stopOpacity=".46" />
            <stop offset="50%" stopColor="#0B394C" stopOpacity=".72" />
            <stop offset="81%" stopColor="#011721" stopOpacity=".95" />
            <stop offset="100%" stopColor="#65DFDA" stopOpacity=".58" />
          </radialGradient>
          <radialGradient id="orb-halo">
            <stop offset="0%" stopColor="#2CE2DD" stopOpacity=".38" />
            <stop offset="100%" stopColor="#2CE2DD" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="orb-wave" x1="45" y1="255" x2="610" y2="255" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#52DADE" stopOpacity="0"/>
            <stop offset="32%" stopColor="#67E7E7" stopOpacity=".48"/>
            <stop offset="58%" stopColor="#D4FFFF" stopOpacity=".96"/>
            <stop offset="86%" stopColor="#65DBE6" stopOpacity=".64"/>
            <stop offset="100%" stopColor="#55D5DF" stopOpacity="0"/>
          </linearGradient>
          <filter id="orb-soft-glow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="12"/>
          </filter>
        </defs>
        <ellipse cx="350" cy="288" rx="246" ry="205" fill="url(#orb-halo)"/>
        <ellipse cx="346" cy="458" rx="176" ry="12" fill="#48C7CD" opacity=".20" filter="url(#orb-soft-glow)"/>
        <circle cx="348" cy="252" r="174" fill="url(#orb-core)" stroke="#8DEBEA" strokeOpacity=".41" strokeWidth="1.4"/>
        <ellipse cx="342" cy="254" rx="175" ry="173" stroke="#A9F0EE" strokeOpacity=".30" strokeWidth="1" fill="none"/>
        <g className="orb-svg-meridian"><ellipse cx="348" cy="252" rx="88" ry="174" stroke="#9FE5E3" strokeOpacity=".22" fill="none" transform="rotate(24 348 252)"/></g>
        <g className="orb-svg-latitude"><ellipse cx="348" cy="252" rx="162" ry="55" stroke="#9FE5E3" strokeOpacity=".22" fill="none" transform="rotate(-19 348 252)"/></g>
        <path d="M55 292 C168 378 219 182 311 268 S468 311 606 181" stroke="url(#orb-wave)" strokeWidth="26" strokeOpacity=".20" strokeLinecap="round" fill="none" filter="url(#orb-soft-glow)"/>
        <path d="M55 292 C168 378 219 182 311 268 S468 311 606 181" stroke="url(#orb-wave)" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <path d="M58 333 C204 389 217 185 345 258 S494 303 629 228" stroke="#8BF2EF" strokeOpacity=".50" strokeWidth="1.25" fill="none"/>
        <path d="M97 365 C252 374 247 189 358 269 S504 326 611 244" stroke="#66CBD7" strokeOpacity=".34" strokeWidth="1" fill="none"/>
        <g className="orb-svg-outer-ring"><ellipse cx="346" cy="275" rx="267" ry="100" transform="rotate(-22 346 275)" stroke="#89E8EA" strokeOpacity=".42" strokeWidth="1.8" fill="none" strokeDasharray="600 850"/></g>
        <g className="orb-svg-inner-ring"><ellipse cx="346" cy="275" rx="266" ry="98" transform="rotate(-22 346 275)" stroke="#86E8E6" strokeOpacity=".12" fill="none"/></g>
        {particles.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={p.r} fill="#A5FFFF" opacity={p.opacity}/>)}
        <circle cx="348" cy="252" r="176" stroke="#B6FCF7" strokeOpacity=".13" strokeWidth="5" fill="none" filter="url(#orb-soft-glow)"/>
      </svg>
      <span className="orb-lightline" aria-hidden="true" />
    </div>
  );
}

const orbitalFeatures=[
 {key:'software',name:'Software',icon:'layers',headline:'Software a medida',description:'Sistemas que organizan información y simplifican el trabajo cotidiano.'},
 {key:'automation',name:'Automatización',icon:'workflow',headline:'Procesos conectados',description:'Automatizaciones para unir tareas, herramientas y etapas de trabajo.'},
 {key:'ai',name:'Inteligencia artificial',icon:'spark',headline:'IA aplicada',description:'Asistentes para orientar, clasificar y apoyar decisiones con supervisión humana.'},
 {key:'web',name:'Plataformas digitales',icon:'globe',headline:'Experiencias digitales',description:'Plataformas y sitios que conectan servicios, contenidos y personas.'}
];
export default function HeroExperience(){
 const [selected,setSelected]=useState(0);
 const [paused,setPaused]=useState(false);
 const active=orbitalFeatures[selected];
 return <div className={'hero-experience'+(paused?' is-paused':'')} aria-label="Explora las soluciones de MUVORY">
  <div className={'hero-orbital hero-orbital-'+active.key}>
   <OrbVisual />
   <div className="orbital-orbit orbital-orbit-outer" aria-hidden="true"/>
   <div className="orbital-orbit orbital-orbit-inner" aria-hidden="true"/>
   <div className="orbital-nodes" role="group" aria-label="Selecciona una solución tecnológica">
    {orbitalFeatures.map((item,i)=><button className={'orbital-node orbital-node-'+item.key} type="button" key={item.key} aria-pressed={selected===i} onClick={()=>setSelected(i)}><Icon name={item.icon} size={18}/><span>{item.name}</span></button>)}
   </div>
  </div>
  <button className="motion-toggle" type="button" aria-pressed={paused} onClick={()=>setPaused(v=>!v)}>{paused?'Activar movimiento':'Pausar movimiento'}</button>
  <div className="orbital-feature" aria-live="polite" aria-atomic="true">
   <span className="orbital-feature-eyebrow">CONEXIONES QUE CREAN POSIBILIDADES</span>
   <strong>{active.headline}</strong>
   <p>{active.description}</p>
   <a href="#soluciones">Ver soluciones</a>
  </div>
 </div>;
}
