import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const jsx=readFileSync(new URL('../src/ControlTowerCase.jsx',import.meta.url),'utf8');
const routes=readFileSync(new URL('../src/main.jsx',import.meta.url),'utf8');
const sector=readFileSync(new URL('../src/Sectors.jsx',import.meta.url),'utf8');
test('Control Tower case is routed and linked from logistics',()=>{
 assert.match(routes,/\/casos\/control-tower/);
 assert.match(sector,/href="\/casos\/control-tower"/);
 assert.match(jsx,/MR&B Control Tower/);
});
test('presentation has five navigable chapters and clearly simulated visual data',()=>{
 for (const chapter of ['problema','dashboard','trazabilidad','captacion','valor']) assert.match(jsx,new RegExp("id:'"+chapter+"'"));
 assert.match(jsx,/controlTowerChapters\.map/);
 assert.match(jsx,/setSlide/);
 assert.match(jsx,/Dato ficticio/);
 assert.match(jsx,/recreaciones ilustrativas/i);
 assert.match(jsx,/MVP/);
});
test('case study stays inside MUVORY and avoids fake customer testimonials',()=>{
 assert.doesNotMatch(jsx,/href="https:\/\/github\.com/);
 assert.doesNotMatch(jsx,/Ver código de la landing/);
 assert.match(jsx,/href="\/portafolio"/);
 assert.doesNotMatch(jsx,/clientes satisfechos|100% de cumplimiento|aumento de ventas/i);
});
test('MR&B Recruit landing is presented as a controlled interactive illustration',()=>{
 assert.match(jsx,/function RecruitLandingMock/);
 assert.match(jsx,/No recoge ni transmite información/);
 assert.match(jsx,/Landing Recruit/);
 assert.doesNotMatch(jsx,/href="https:\/\/github\.com/);
});
