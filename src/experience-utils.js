import { experienceSlides, softwareRecords, workflowSteps, aiDemos, chartExamples } from './experience-data.js';

export function boundedSlide(index, count = experienceSlides.length) {
  if (!Number.isFinite(index) || count < 1) return 0;
  return Math.min(count - 1, Math.max(0, Math.trunc(index)));
}
export function nextSlide(index, count = experienceSlides.length) {
  return boundedSlide(index + 1, count);
}
export function previousSlide(index, count = experienceSlides.length) {
  return boundedSlide(index - 1, count);
}
export function filteredRecords(filter, records = softwareRecords) {
  return filter === 'Todos' ? records : records.filter(item => item.status === filter);
}
export function advanceWorkflow(completed, count = workflowSteps.length) {
  return Math.min(count, Math.max(0, completed + 1));
}
export function slideIndexFromHash(hash) {
  const slug = String(hash || '').replace(/^#/, '');
  const match = experienceSlides.findIndex(item => item.id === slug);
  return match >= 0 ? match : 0;
}
export { experienceSlides, softwareRecords, workflowSteps, aiDemos, chartExamples };
