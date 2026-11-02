import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [html, js, css] = await Promise.all([
  readFile(new URL('../freeze.html', import.meta.url), 'utf8'),
  readFile(new URL('../freeze.js', import.meta.url), 'utf8'),
  readFile(new URL('../freeze.css', import.meta.url), 'utf8'),
]);

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
assert.deepEqual(duplicates, [], `Duplicate HTML IDs: ${duplicates.join(', ')}`);

const requiredIds = [
  'viewport', 'map', 'hero-name', 'mission-title', 'distance',
  'waypoint-arrow', 'waypoint-distance', 'stamina-value', 'stamina-fill',
  'vehicle-hud', 'car-health', 'car-health-fill', 'nitro-fill',
  'dialogue', 'choice-options', 'pause', 'save-status',
  'graphics-toggle', 'atmosphere-toggle', 'fullscreen-toggle',
];
for (const id of requiredIds) {
  assert(ids.includes(id), `Missing required HUD element #${id}`);
}

assert.match(html, /type="module" src="freeze\.js"/, '3D module script must be loaded');
assert.match(js, /function currentMission\(/, 'Mission state helper must exist');
assert.match(js, /function collides\(/, 'World collision helper must exist');
assert.match(js, /function startInteraction\(/, 'Interaction handler must exist');
assert.match(js, /function toggleVehicle\(/, 'Vehicle handler must exist');
assert.match(js, /function updateRace\(/, 'Street sprint update must exist');
assert.match(js, /pagehide/, 'Progress should save when the page is hidden or closed');
assert.match(js, /waypoint-distance/, 'Objective distance must be wired to the compass');
assert.match(js, /stamina-fill/, 'Sprint stamina must update the HUD');
assert.match(js, /collisionCooldown/, 'Vehicle impacts must be rate-limited');
assert.match(css, /#waypoint-compass/, 'Objective compass needs styling');
assert.match(css, /#stamina-hud/, 'Stamina HUD needs styling');
assert.match(css, /#vehicle-hud\.low-health/, 'Critical vehicle damage needs visual feedback');

console.log(`Neon State smoke checks passed: ${ids.length} unique IDs and ${requiredIds.length} required HUD elements.`);
