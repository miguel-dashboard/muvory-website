import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {getStory,sceneIndex,sceneSeconds,productStories} from '../src/product-stories.js';
test('four timed scenes per product and no out-of-bounds index at the end',()=>{
 for(const type of ['control','recruit','ventas']){
  const story=getStory(type);
  assert.equal(story.scenes.length,4);
  assert.equal(sceneIndex(0,4),0);
  assert.equal(sceneIndex(sceneSeconds-1,4),0);
  assert.equal(sceneIndex(sceneSeconds,4),1);
  assert.equal(sceneIndex(24,4),3);
  assert.equal(sceneIndex(-1,4),0);
 }
});
test('scripted scenarios reach truthful outcomes',()=>{
 assert.deepEqual(productStories.control.scenes[3].scene.resolved,['D-105']);
 assert.equal(productStories.recruit.scenes[3].scene.status,'Aprobado');
 const sale=productStories.ventas.scenes[3].scene;
 assert.equal(sale.saved,true);
 assert.equal(sale.qty.reduce((n,q,i)=>n+q*[12500,8900,5400][i],0),35700);
});
test('player reuses the product UI and does not pretend to be actual footage',()=>{
 const film=readFileSync(new URL('../src/ProductFilm.jsx',import.meta.url),'utf8');
 assert.match(film,/<ProductLab type=\{type\} scene=\{current.scene\}/);
 assert.match(film,/inert=\{true\}/);
 assert.match(film,/type="range"/);
 assert.match(film,/clearInterval/);
 assert.match(film,/no es una grabación/);
 for(const filename of ['Portfolio.jsx','ControlTowerCase.jsx']){
  const page=readFileSync(new URL('../src/'+filename,import.meta.url),'utf8');
  assert.match(page,/<ProductFilm/);
  assert.match(page,/id="film"/);
 }
});

test('cinema mode uses a native modal, keyboard and touch controls, and returns focus',()=>{
 const film=readFileSync(new URL('../src/ProductFilm.jsx',import.meta.url),'utf8');
 assert.match(film,/dialog\.showModal\(\)/);
 assert.match(film,/onCancel/);
 assert.match(film,/launchRef\.current\?\.focus/);
 assert.match(film,/ArrowRight/);
 assert.match(film,/onTouchEnd/);
 const css=readFileSync(new URL('../src/product-film.css',import.meta.url),'utf8');
 assert.match(css,/100dvh/);
 assert.match(css,/prefers-reduced-motion/);
});
test('depth and navigation transitions are progressive enhancements',()=>{
 const hero=readFileSync(new URL('../src/CinematicHero.jsx',import.meta.url),'utf8');
 const css=readFileSync(new URL('../src/layout-polish.css',import.meta.url),'utf8');
 assert.match(hero,/onPointerMove=\{trackDepth\}/);
 assert.match(hero,/prefers-reduced-motion/);
 assert.match(css,/@view-transition\s*\{\s*navigation: auto/);
 assert.match(css,/prefers-reduced-motion/);
});
