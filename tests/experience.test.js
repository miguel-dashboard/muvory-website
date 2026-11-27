import test from 'node:test';
import assert from 'node:assert/strict';
import {
  experienceSlides, softwareRecords, workflowSteps, aiDemos, chartExamples,
  boundedSlide, nextSlide, previousSlide, filteredRecords,
  advanceWorkflow, slideIndexFromHash,
} from '../src/experience-utils.js';

test('MUVORY Experience offers four distinct illustrated stages', () => {
  assert.equal(experienceSlides.length, 4);
  assert.deepEqual(experienceSlides.map(item => item.id), ['software','automatizacion','inteligencia-artificial','datos']);
  assert.ok(experienceSlides.every(item => item.heading && item.description && item.benefits.length === 3));
});

test('slide navigation stays within presentation bounds', () => {
  assert.equal(boundedSlide(-10), 0);
  assert.equal(boundedSlide(2.9), 2);
  assert.equal(boundedSlide(120), 3);
  assert.equal(previousSlide(0), 0);
  assert.equal(nextSlide(3), 3);
  assert.equal(nextSlide(1), 2);
});

test('direct links can select a meaningful experience stage', () => {
  assert.equal(slideIndexFromHash('#software'), 0);
  assert.equal(slideIndexFromHash('#automatizacion'), 1);
  assert.equal(slideIndexFromHash('#inteligencia-artificial'), 2);
  assert.equal(slideIndexFromHash('#datos'), 3);
  assert.equal(slideIndexFromHash('#unknown'), 0);
});

test('software demo filters status without mutating original data', () => {
  assert.equal(filteredRecords('Todos').length, softwareRecords.length);
  assert.equal(filteredRecords('En curso').length, 2);
  assert.equal(filteredRecords('Completado')[0].id, 'SOL-103');
  assert.equal(filteredRecords('not-a-status').length, 0);
});

test('automation demo executes one step at a time and cannot overrun', () => {
  let current = 0;
  workflowSteps.forEach(() => { current = advanceWorkflow(current); });
  assert.equal(current, workflowSteps.length);
  assert.equal(advanceWorkflow(current), workflowSteps.length);
});

test('IA examples and chart samples are explicit, self-contained demos', () => {
  assert.equal(aiDemos.length, 3);
  assert.ok(aiDemos.every(example => example.label && example.question && example.answer));
  assert.equal(chartExamples.length, 3);
  assert.ok(chartExamples.every(example => example.values.length === 6 && example.values.every(value => Number.isFinite(value) && value > 0)));
});
