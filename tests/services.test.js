import test from 'node:test';
import assert from 'node:assert/strict';
import {services,getService} from '../src/services-data.js';

test('each MUVORY service has its own reachable route and specific editorial content',()=>{
  assert.equal(services.length,5);
  assert.equal(new Set(services.map(s=>s.slug)).size,5);
  for(const item of services){
    assert.match(item.slug,/^[a-z]+(?:-[a-z]+)*$/);
    assert.equal(getService(item.slug),item);
    assert.ok(item.title.length>20);
    assert.ok(item.lead.length>65);
    assert.ok(item.problem.length>40);
    assert.ok(item.approach.length>40);
    assert.equal(item.features.length,3);
    assert.equal(item.walkthrough.length,3);
    assert.ok(item.walkthrough.every(step=>step.title && step.body));
  }
});
test('invalid service slugs fail closed instead of displaying invented content',()=>{
  assert.equal(getService(''),null);
  assert.equal(getService('consultoria-inexistente'),null);
  assert.equal(getService('../secret'),null);
});
test('service demonstration links resolve to actual chapters in MUVORY Experience',async()=>{
  const {experienceSlides}=await import('../src/experience-data.js');
  const ids=new Set(experienceSlides.map(x=>x.id));
  for(const service of services){assert.ok(ids.has(service.demo),service.slug+' '+service.demo);}
});
test('MUVORY services include all five current offers, without narrowing to B2B only',()=>{
  assert.deepEqual(services.map(s=>s.slug),[
    'software','automatizacion','inteligencia-artificial','datos','plataformas'
  ]);
});
