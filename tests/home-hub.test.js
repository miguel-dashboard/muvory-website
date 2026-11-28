import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = path => readFileSync(new URL('../src/'+path,import.meta.url),'utf8');
test('home includes focused previews and shortcuts without the full detailed sections',()=>{
 const app=read('App.jsx');
 const home=app.split('{isHome && <>')[1].split('{isAI &&')[0];
 assert.match(home,/home-directory-grid/);
 assert.match(home,/home-offers-grid/);
 assert.match(home,/<PortfolioTeaser\s*\/>/);
 assert.match(home,/home-difference/);
 for(const href of ['/servicios','/experience','/portafolio','/contacto']) assert.ok(home.includes('href="'+href+'"'),href);
 assert.doesNotMatch(home,/<AIAssistantShowcase|<SolutionConfigurator|<ContactForm|className="methodology/);
 assert.match(app,/isContact && <>/);
 assert.match(app,/isAbout && <>/);
 assert.match(app,/isAI && <section/);
 assert.match(app,/contacto:'\/contacto'/);
});
test('portfolio directory points to project pages instead of replaying identical demos',()=>{
 const portfolio=read('Portfolio.jsx');
 const cards=portfolio.split('function ProjectCard')[1].split('function PortfolioHome')[0];
 assert.doesNotMatch(cards,/<ProjectMedia|<GuidedTour/);
 assert.match(cards,/href=\{project.href\}/);
 assert.match(portfolio,/<ProductPreview type=\{project.type\}/);
 assert.match(portfolio,/<ProductLab type=\{project.type\}/);
 assert.match(portfolio,/ControlTowerCase video=\{portfolioVideos.control\}/);
});
