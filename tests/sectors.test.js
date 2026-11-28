import test from 'node:test';
import assert from 'node:assert/strict';
import {sectors,getSector} from '../src/sectors-data.js';

test('MUVORY 2.0 covers three authentic sector specializations',()=>{
 assert.deepEqual(sectors.map(s=>s.slug),['juridico','logistica','comercio']);
 for (const item of sectors){
  assert.equal(getSector(item.slug),item);
  assert.ok(item.title.length>30);
  assert.ok(item.summary.length>55);
  assert.ok(item.insight.length>90);
  assert.equal(item.focus.length,3);
  assert.equal(item.solutions.length,3);
  assert.equal(item.demoItems.length,3);
  assert.ok(item.disclaimer.length>50);
 }
});

test('referential media includes visible credit and may not be presented as client work',()=>{
 for(const sector of sectors){
  assert.match(sector.photo,/^https:\/\/images\.unsplash\.com\/photo-/);
  assert.match(sector.photoUrl,/^https:\/\/unsplash\.com\/photos\//);
  assert.match(sector.photoAlt,/referencial/i);
  assert.match(sector.photoCredit,/Unsplash/);
 }
});

test('unknown sectors are not silently mapped to misleading case studies',()=>{
 assert.equal(getSector(''),null);
 assert.equal(getSector('../secret'),null);
 assert.equal(getSector('salud'),null);
});
