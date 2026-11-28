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
test('presentation has four navigable chapters and clearly simulated visual data',()=>{
 for (const chapter of ['problema','dashboard','trazabilidad','arquitectura']) assert.match(jsx,new RegExp("id:'"+chapter+"'"));
 assert.match(jsx,/controlTowerChapters\.map/);
 assert.match(jsx,/setSlide/);
 assert.match(jsx,/Dato ficticio/);
 assert.match(jsx,/visualizaciones ilustrativas/);
 assert.match(jsx,/MVP/);
});
test('link to inspected GitHub is explicit, not a false customer testimonial',()=>{
 assert.match(jsx,/https:\/\/github\.com\/miguel-dashboard\/MRB-dashboard-MVP/);
 assert.doesNotMatch(jsx,/clientes satisfechos|100% de cumplimiento|aumento de ventas/i);
});
