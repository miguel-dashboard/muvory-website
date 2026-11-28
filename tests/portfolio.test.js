import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const portfolio=readFileSync(new URL('../src/Portfolio.jsx',import.meta.url),'utf8');
const routes=readFileSync(new URL('../src/main.jsx',import.meta.url),'utf8');
const app=readFileSync(new URL('../src/App.jsx',import.meta.url),'utf8');
const header=readFileSync(new URL('../src/Services.jsx',import.meta.url),'utf8');
const sectors=readFileSync(new URL('../src/Sectors.jsx',import.meta.url),'utf8');
const caseStudy=readFileSync(new URL('../src/ControlTowerCase.jsx',import.meta.url),'utf8');

test('portfolio has internal routes, home teaser, header link, three project-specific destinations',()=>{
 assert.match(routes,/path === '\/portafolio'/);
 assert.match(routes,/path.startsWith\('\/portafolio\/'\)/);
 assert.match(app,/<PortfolioTeaser\s*\/>/);
 assert.match(header,/href="\/portafolio"/);
 for(const slug of ['control-tower','recruit','ventas']) assert.match(portfolio,new RegExp("slug:'"+slug+"'"));
 assert.match(portfolio,/href:'\/casos\/control-tower'/);
 assert.match(portfolio,/href:'\/portafolio\/recruit'/);
 assert.match(portfolio,/href:'\/portafolio\/ventas'/);
 assert.match(sectors,/href="\/portafolio\/ventas"/);
 assert.match(sectors,/href="\/casos\/control-tower"/);
});

test('portfolio features interactive tours, playback controls, and real video support for future approved media',()=>{
 assert.match(portfolio,/setInterval/);
 assert.match(portfolio,/playing/);
 assert.match(portfolio,/<video controls playsInline preload="metadata"/);
 assert.match(portfolio,/portfolioVideos/);
 assert.match(portfolio,/control: null,/);
 assert.match(portfolio,/recruit: null,/);
 assert.match(portfolio,/ventas: null,/);
 assert.match(portfolio,/DEMO ILUSTRATIVA/);
 assert.match(portfolio,/no es una grabación real/);
});

test('portfolio and case study contain no external code redirects or unapproved data',()=>{
 assert.doesNotMatch(portfolio,/href="https:\/\/github\.com/);
 assert.doesNotMatch(caseStudy,/href="https:\/\/github\.com/);
 assert.doesNotMatch(portfolio,/clientes satisfechos|100% cumplimiento|ventas aumentaron/i);
 assert.match(portfolio,/pendiente de revisión y autorización/);
 assert.match(portfolio,/sin información privada/i);
});
