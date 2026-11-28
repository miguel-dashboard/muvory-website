import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const lab=readFileSync(new URL('../src/ProductLab.jsx',import.meta.url),'utf8');
const caseStudy=readFileSync(new URL('../src/ControlTowerCase.jsx',import.meta.url),'utf8');
test('three distinct simulations have user controls and reset',()=>{
 for(const name of ['ControlLab','RecruitLab','SalesLab'])assert.match(lab,new RegExp('function '+name));
 for(const action of ['Simular resolución','Simular postulación','Simular registro','Reiniciar demo'])assert.ok(lab.includes(action));
 assert.match(lab,/aria-pressed/);
 assert.match(lab,/Datos ficticios/);
 assert.doesNotMatch(lab,/\bfetch\s*\(|localStorage|sessionStorage|XMLHttpRequest/);
});
test('Control Tower retains its case presentation and adds a functional lab',()=>{
 assert.match(caseStudy,/<ControlLab\s*\/>/);
 assert.match(caseStudy,/id="demo-control"/);
 assert.match(caseStudy,/Reproducir recorrido/);
 assert.match(caseStudy,/Pausar recorrido/);
});
