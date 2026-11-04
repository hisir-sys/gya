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
  'graphics-toggle', 'atmosphere-toggle', 'fullscreen-toggle', 'npc-hint',
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
assert.match(js, /MARINA PROMENADE/, 'The Marina district must be discoverable');
assert.match(js, /ARTS DISTRICT/, 'The Arts district must be discoverable');
assert.match(js, /HILLSIDE/, 'The Hillside district must be discoverable');
assert.match(js, /discoveredDistricts/, 'District discovery must persist locally');
assert.match(js, /function nearestPedestrian\(/, 'Nearby pedestrians must be discoverable for interaction');
assert.match(js, /function talkToPedestrian\(/, 'Pedestrians must have a conversation action');
assert.match(js, /state:'WANDER'/, 'Pedestrians must have an autonomous movement state');
assert.match(js, /function buildCityServices\(/, 'Phase 13 service destinations must be constructed');
assert.match(js, /MARINA MOTOR WORKS/, 'The Marina repair hub must exist');
assert.match(js, /PALM FUEL & MARKET/, 'The fuel and market hub must exist');
assert.match(js, /function nearestCityService\(/, 'Nearby city services must be discoverable');
assert.match(js, /function useCityService\(/, 'City services must have working interactions');
assert.match(js, /function makePlayerCar\(type=selectedVehicle\)/, 'Phase 14 must support vehicle variants');
assert.match(js, /SPORT:\{label:'SPORT COUPE'/, 'Sports coupe must remain available');
assert.match(js, /SEDAN:\{label:'CITY SEDAN'/, 'City sedan must be available');
assert.match(js, /SUV:\{label:'COASTAL SUV'/, 'Coastal SUV must be available');
assert.match(js, /selectedVehicle,completedServices,updatedAt/, 'Selected vehicle must persist in the local save');
assert.match(html, /data-vehicle="SEDAN"/, 'Garage must expose the sedan selector');
assert.match(html, /data-vehicle="SUV"/, 'Garage must expose the SUV selector');
assert.match(css, /\.vehicle-picker/, 'Vehicle selector needs responsive styling');
assert.match(js, /const startled=distance<8/, 'Pedestrians must react to nearby player movement');
assert.match(js, /npc-hint/, 'Nearby pedestrian interaction prompt must be wired');
assert.match(css, /#waypoint-compass/, 'Objective compass needs styling');
assert.match(css, /#stamina-hud/, 'Stamina HUD needs styling');
assert.match(css, /#vehicle-hud\.low-health/, 'Critical vehicle damage needs visual feedback');

console.log(`Neon State smoke checks passed: ${ids.length} unique IDs and ${requiredIds.length} required HUD elements.`);
