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
  'graphics-toggle', 'atmosphere-toggle', 'weather-toggle', 'fullscreen-toggle', 'npc-hint',
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
assert.match(js, /HOWRAH RIVERFRONT/, 'The Marina district must be discoverable');
assert.match(js, /COLLEGE STREET/, 'The Arts district must be discoverable');
assert.match(js, /VICTORIA MEMORIAL/, 'The Hillside district must be discoverable');
assert.match(js, /discoveredDistricts/, 'District discovery must persist locally');
assert.match(js, /function nearestPedestrian\(/, 'Nearby pedestrians must be discoverable for interaction');
assert.match(js, /function talkToPedestrian\(/, 'Pedestrians must have a conversation action');
assert.match(js, /state:'WANDER'/, 'Pedestrians must have an autonomous movement state');
assert.match(js, /function buildCityServices\(/, 'Phase 13 service destinations must be constructed');
assert.match(js, /KOLKATA MOTOR WORKS/, 'The Marina repair hub must exist');
assert.match(js, /GHAT FUEL & TEA/, 'The fuel and market hub must exist');
assert.match(js, /function nearestCityService\(/, 'Nearby city services must be discoverable');
assert.match(js, /function useCityService\(/, 'City services must have working interactions');
assert.match(js, /function makePlayerCar\(type=selectedVehicle\)/, 'Phase 14 must support vehicle variants');
assert.match(js, /function addVehicleDetail\(/, 'Player and traffic vehicles must use the detailed shared vehicle builder');
assert.match(js, /function addTree\(/, 'The city must construct procedural Kolkata rain-tree foliage');
assert.match(js, /bumpMap:asphaltTexture/, 'Road surfaces must use the asphalt surface detail map');
assert.match(js, /let graphicsQuality='HIGH'/, 'The balanced high-quality preset must be active on first load');
assert.match(js, /const followDistance=\(driving\?11\.8:8\.5\)/, 'Driving camera must use the closer cinematic chase distance');
assert.match(js, /SPORT:\{label:'SPORT COUPE'/, 'Sports coupe must remain available');
assert.match(js, /SEDAN:\{label:'CITY SEDAN'/, 'City sedan must be available');
assert.match(js, /SUV:\{label:'CITY SUV'/, 'Coastal SUV must be available');
assert.match(js, /selectedVehicle,completedServices,audioMuted,updatedAt/, 'Selected vehicle must persist in the local save');
assert.match(html, /data-vehicle="SEDAN"/, 'Garage must expose the sedan selector');
assert.match(html, /data-vehicle="SUV"/, 'Garage must expose the SUV selector');
assert.match(css, /\.vehicle-picker/, 'Vehicle selector needs responsive styling');
assert.match(js, /const startled=distance<8/, 'Pedestrians must react to nearby player movement');
assert.match(js, /npc-hint/, 'Nearby pedestrian interaction prompt must be wired');
assert.match(css, /#waypoint-compass/, 'Objective compass needs styling');
assert.match(css, /#stamina-hud/, 'Stamina HUD needs styling');
assert.match(css, /#vehicle-hud\.low-health/, 'Critical vehicle damage needs visual feedback');

console.log(`Neon State smoke checks passed: ${ids.length} unique IDs and ${requiredIds.length} required HUD elements.`);


assert(ids.includes('journal-panel'), 'Mission journal panel must exist');
assert(ids.includes('journal-content'), 'Mission journal content host must exist');
assert(ids.includes('journal-toggle'), 'Journal toggle must exist');
assert(ids.includes('sound-toggle'), 'Sound toggle must exist');
assert.match(html, /JOURNAL · J/, 'Journal keyboard shortcut must be visible');
assert.match(js, /function renderJournal\(/, 'Journal must render campaign state');
assert.match(js, /function toggleJournal\(/, 'Journal must open and close');
assert.match(js, /decisions\[index\]\[missionIndex\]/, 'Journal must show saved story choices');
assert.match(js, /function playUiCue\(/, 'Gameplay events must have short audio cues');
assert.match(js, /audioMuted,updatedAt:Date\.now\(\)/, 'Audio mute state must persist');
assert.match(js, /audioMuted\?0:Number\(document\.querySelector\('#volume'\)/, 'Mute must silence engine and skid mix');
assert.match(js, /data-vehicle.*selectedVehicle|dataset\.vehicle===selectedVehicle/, 'Garage must show the selected vehicle');
assert.match(js, /if\(money<100\).*NOT ENOUGH CASH/s, 'Repair service must enforce its $100 cost');
console.log('Neon State Phase 15–16 smoke checks passed.');

assert.match(js, /Hooghly riverfront|Hooghly river/i, 'Kolkata world must include the Hooghly river');
assert.match(js, /function addHowrahBridge\(/, 'Kolkata world must procedurally build Howrah Bridge');
assert.match(js, /kolkataShopNames/, 'Kolkata storefronts must include Bengali and English signs');
assert.match(js, /College Street|COLLEGE STREET/, 'Kolkata districts must replace fictional districts');
assert.match(js, /addLocalVehicle\(.*'taxi'/, 'Kolkata taxis must be represented in the world');
assert.match(js, /addLocalVehicle\(.*'auto'/, 'Kolkata auto-rickshaws must be represented in the world');
assert.match(js, /sleeperMat/, 'The local tram corridor must have rail sleepers');
assert.match(js, /neon-state-kolkata-v1/, 'Kolkata map progress must use a versioned save key');
console.log('Kolkata offline world checks passed.');

assert.match(js, /function applyKolkataAtmosphere\(/, 'Kolkata must provide local day, golden-hour and night lighting modes');
assert.match(js, /const modes=\['DAYLIGHT','GOLDEN HOUR','NEON NIGHT'\]/, 'Atmosphere control must cycle day, dusk and night');
console.log('Kolkata day/night lighting checks passed.');

assert.match(js, /Procedural HDR-style image-based lighting/, 'Scene must build an offline image-based environment for PBR reflections');
assert.match(js, /PMREMGenerator/, 'Environment lighting must be prefiltered for physically based materials');
assert.match(js, /clearcoat/, 'Vehicle paint must use a clearcoat physical material');
assert.match(js, /shadow:3072/, 'Extreme graphics preset must offer a high-resolution shadow map');
assert.match(js, /shadow:2048/, 'Ultra graphics preset must offer a high-resolution shadow map');
console.log('Neon State PBR and image-based lighting checks passed.');

assert.match(html, /id="weather-toggle"/, 'Weather control must be available in the HUD');
assert.match(js, /createWeatherSystem/, 'Optional weather runtime must be connected');
assert.match(js, /weatherSystem\?\.update\(dt,player\.position\)/, 'Weather particles must follow the active player position');
assert.match(js, /createPerformanceMonitor/, 'GPU telemetry must be connected to the renderer');
assert.match(js, /performanceMonitor\?\.endFrame\(frameDelta\)/, 'GPU telemetry must sample completed render frames');
assert.match(js, /dataset\.graphicsQuality=graphicsQuality/, 'Active graphics preset must be exposed for diagnostics');
assert.match(html, /WEATHER · CLEAR/, 'Weather control must start in the safe clear-weather state');
console.log('Neon State weather and GPU telemetry wiring checks passed.');

const visual = await readFile(new URL('../neon-visual-overhaul.js', import.meta.url), 'utf8');
assert.match(js, /import\('\.\/neon-visual-overhaul\.js'\)/, 'Visual overhaul module must load optionally');
assert.match(js, /upgradeCityVisuals\?\.\(THREE,city,buildings,renderer\)/, 'Kolkata buildings must receive the visual detail pass');
assert.match(js, /enhanceAvatar\?\.\(THREE,avatar,color,box,mat\)/, 'Player avatar must receive the anatomy and garment detail pass');
assert.match(visual, /new THREE\.InstancedMesh/, 'Architectural detail must be instanced for draw-call efficiency');
assert.match(visual, /balconySlabs/, 'Buildings must receive balcony geometry');
assert.match(visual, /acUnits/, 'Buildings must receive air-conditioning units');
assert.match(visual, /drainPipes/, 'Buildings must receive facade utility pipes');
assert.match(visual, /plasterBump/, 'Building facades must use procedural surface relief');
assert.match(visual, /streetFurniture/, 'The city must receive street furniture');
assert.match(visual, /realisticPass/, 'Avatar detail pass must avoid duplicate additions');
console.log('Neon State realistic-world visual pass checks passed.');

assert.match(js, /function addVehicleDetail\(/, 'Shared detailed vehicle builder must remain available');
assert.match(js, /steering=new THREE\.Mesh\(new THREE\.TorusGeometry/, 'Vehicles must include a visible steering wheel');
assert.match(js, /seatMat/, 'Vehicles must include cockpit seating');
assert.match(js, /wheelRadius\*\.58/, 'Vehicles must include detailed wheel hubs');
assert.match(js, /function makePed\(/, 'Pedestrian builder must remain available');
assert.match(js, /new THREE\.CapsuleGeometry\(\.25,\.56/, 'Pedestrians must use smooth anatomical torso geometry');
assert.match(js, /u\.armL\.rotation\.x/, 'Pedestrian walking animation must drive articulated arms');
assert.match(visual, /new THREE\.CapsuleGeometry\(\.34, \.66/, 'Player torso must use smooth anatomical geometry');
assert.match(visual, /pivot\.clear\(\)/, 'Player limb pivots must retain animation while replacing block meshes');
console.log('Neon State vehicle and character geometry checks passed.');

assert.match(js, /loadPolyHavenStreetEnvironment/, 'Optional photographic HDR environment must be wired into the scene');
assert.match(js, /proceduralEnvironmentTarget/, 'Procedural environment must be retained for safe resource replacement');
assert.match(html, /three\/addons\//, 'Three.js addon imports must resolve through the import map');
assert.match(visual, /urban_street_01_1k\.hdr/, 'Photographic HDRI must use the CC0 Poly Haven street environment');
assert.match(visual, /procedural lighting/, 'HDRI failure must preserve procedural lighting fallback');
console.log('Neon State HDR environment lighting checks passed.');


const cinematic = await readFile(new URL('../neon-cinematic-world.js', import.meta.url), 'utf8');
assert.match(js, /import\('\.\/neon-cinematic-world\.js'\)/, 'Cinematic city pass must load optionally');
assert.match(js, /installCinematicWorldPass\?\.\(THREE,city,buildings,renderer\)/, 'Cinematic city pass must run after city construction');
assert.match(cinematic, /Both long side walls get windows/, 'Previously blank side walls must receive window grids');
assert.match(cinematic, /Rear wall windows/, 'Rear building facades must receive window grids');
assert.match(cinematic, /new THREE\.InstancedMesh/, 'Cinematic facade additions must use instancing');
assert.match(cinematic, /plasterBump/, 'Building masses must receive PBR surface relief');
assert.match(cinematic, /Rooftop water tanks/, 'Building roofs must receive rooftop utility details');
assert.match(cinematic, /Aged asphalt response/, 'Existing road meshes must receive the aged asphalt material pass');
console.log('Neon State cinematic facade and surface checks passed.');


const [mapCatalog, sideStories, districtScenes] = await Promise.all([
  readFile(new URL('../neon-map-catalog.js', import.meta.url), 'utf8'),
  readFile(new URL('../neon-side-stories.js', import.meta.url), 'utf8'),
  readFile(new URL('../neon-district-scenes.js', import.meta.url), 'utf8'),
]);
assert(ids.includes('district-panel'), 'District selector panel must exist');
assert(ids.includes('district-toggle'), 'District selector must have a visible toggle');
assert(ids.includes('district-list'), 'District selector must expose the map list');
assert(ids.includes('side-story-list'), 'District selector must expose optional side stories');
assert.match(html, /data-map="kumartuli"/, 'Kumartuli must be selectable');
assert.match(html, /data-map="sector-v"/, 'Sector V must be selectable');
assert.match(html, /data-map="south-lakes"/, 'South Kolkata Lakes must be selectable');
assert.match(html, /data-map="eco-park"/, 'Eco Park must be selectable');
assert.match(html, /DISTRICTS · M/, 'District selector keyboard shortcut must be discoverable');
assert.match(css, /#district-panel/, 'District selector must have responsive panel styling');
assert.match(js, /buildNewDistrictScenes/, 'New map scenery must be created in the Three.js world');
assert.match(js, /function travelToMap\(/, 'District selection must teleport to a safe spawn');
assert.match(js, /function activateSideStory\(/, 'Side stories must be startable from the selector');
assert.match(js, /sideStoryProgress/, 'Side-story progress must be persisted separately');
assert.match(js, /activeMapId,activeSideStoryId,sideStoryProgress/, 'Save data must retain map and side-story state');
assert.match(js, /state.completed=state.step>=story.missions.length/, 'Side stories must complete after their final mission');
assert.match(js, /host.replaceChildren\(summary,\.\.\.cards,\.\.\.sideCards\)/, 'Journal must display side-story progress');
assert.match(mapCatalog, /KUMARTULI & NORTH KOLKATA/, 'Kumartuli region metadata must exist');
assert.match(mapCatalog, /SALT LAKE SECTOR V/, 'Sector V region metadata must exist');
assert.match(mapCatalog, /SOUTH KOLKATA LAKES/, 'South Kolkata Lakes region metadata must exist');
assert.match(mapCatalog, /NEW TOWN ECO PARK/, 'Eco Park region metadata must exist');
assert.match(sideStories, /LANTERNS OF KUMARTULI/, 'Kumartuli story arc must exist');
assert.match(sideStories, /AFTER HOURS, SECTOR V/, 'Sector V story arc must exist');
assert.match(sideStories, /THE LAKE KEEPS TIME/, 'Lakeside story arc must exist');
assert.equal((sideStories.match(/title: '/g) || []).length >= 9, true, 'Side-story module must define at least nine mission beats');
assert.match(sideStories, /normalizeSideStoryProgress/, 'Old saves must receive safe side-story defaults');
assert.match(districtScenes, /buildNewDistrictScenes/, 'Each new district must have dedicated 3D scenery');
assert.match(districtScenes, /kumartuli|sector-v|south-lakes|eco-park/, 'District scene builder must cover all new map themes');
assert.equal((sideStories.match(/\"title\":/g) || []).length, 28, 'The three district stories must include all 28 added playable beats');
const addedStoryBeats = [...sideStories.matchAll(/\{\"title\":\"([^\"]+)\",\"text\":\"([^\"]+)\",\"x\":(-?\d+),\"z\":(-?\d+),\"reward\":(\d+),\"speaker\":\"([^\"]+)\",\"lines\":\[\"([^\"]+)\",\"([^\"]+)\"\],\"choices\":\[\"([^\"]+)\",\"([^\"]+)\"\]\}/g)];
assert.equal(addedStoryBeats.length, 28, 'Every added district beat must have a complete mission payload');
assert.ok(addedStoryBeats.every(match => Number(match[5]) > 0 && match[7] && match[8] && match[9] && match[10]), 'Every added beat needs a reward, dialogue and two choices');
assert.match(js, /const storyTotal=activeSideStoryId\?\(currentSideStory\(\)\?\.missions\.length\|\|0\):3/, 'Side-story HUD must show its actual mission total');
console.log('Neon State new maps and side-story checks passed.');

// Guard the fullscreen startup regression and ensure touch input cannot remain stuck.

assert.match(js, /fullscreenButton=document\.querySelector\('#fullscreen-toggle'\)/, 'Fullscreen control must be bound before its handlers are registered');
assert.match(js, /fullscreenButton\?\.addEventListener\('click'/, 'Fullscreen control must handle user clicks without blocking startup when absent');
assert.match(js, /document\.addEventListener\('fullscreenchange',syncFullscreenButton\)/, 'Fullscreen label and accessibility state must follow browser fullscreen changes');
assert.match(js, /function syncFullscreenButton\(\)/, 'Fullscreen control must expose its current state');
assert.match(js, /setAttribute\('aria-pressed',String\(active\)\)/, 'Fullscreen state must be exposed to assistive technology');
assert.match(js, /touchControls\?\.addEventListener\('pointercancel'/, 'Touch movement must stop when a pointer is cancelled');
assert.match(js, /touchControls\?\.addEventListener\('lostpointercapture'/, 'Touch movement must stop when pointer capture is lost');
console.log('Neon State fullscreen and touch-input regression checks passed.');

// Execute the pure district/story data modules without requiring a browser or bundler.

const mapModule = await import('data:text/javascript;base64,' + Buffer.from(await readFile(new URL('../neon-map-catalog.js', import.meta.url), 'utf8')).toString('base64'));
const storyModule = await import('data:text/javascript;base64,' + Buffer.from(await readFile(new URL('../neon-side-stories.js', import.meta.url), 'utf8')).toString('base64'));
const { MAP_REGIONS, STORY_ARCS, getMapRegion, getMapRegionAt } = mapModule;
const { SIDE_STORIES, createSideStoryProgress, normalizeSideStoryProgress, getCurrentSideMission } = storyModule;

assert.equal(MAP_REGIONS.length, 4, 'All four Kolkata districts must remain in the map catalog.');
console.log('Kolkata district catalog count check passed.');

// test: enforce unique Kolkata district ids
assert.equal(new Set(MAP_REGIONS.map(region => region.id)).size, MAP_REGIONS.length, 'District ids must be unique.');

// test: lock the four explorable district ids
assert.deepEqual(MAP_REGIONS.map(region => region.id), ['kumartuli', 'sector-v', 'south-lakes', 'eco-park'], 'The four established district ids must remain stable for saved games.');

// test: validate district world coordinates
assert.ok(MAP_REGIONS.every(region => Number.isFinite(region.x) && Number.isFinite(region.z)), 'Every district needs finite world coordinates.');

// test: keep district spawns aligned with map centers
assert.ok(MAP_REGIONS.every(region => region.spawn && region.spawn.x === region.x && region.spawn.z === region.z), 'Each district spawn must match its catalog center.');

// test: require positive district discovery radii
assert.ok(MAP_REGIONS.every(region => Number.isFinite(region.radius) && region.radius > 0), 'Every district needs a positive discovery radius.');

// test: validate district palette completeness
assert.ok(MAP_REGIONS.every(region => Array.isArray(region.palette) && region.palette.length === 3), 'Each district must provide its three base palette colors.');

// test: validate district accent colors
assert.ok(MAP_REGIONS.every(region => /^#[0-9a-f]{6}$/i.test(region.accent)), 'Every district accent must be a six-digit hex color.');

// test: require district descriptions
assert.ok(MAP_REGIONS.every(region => typeof region.description === 'string' && region.description.trim().length > 12), 'Every district needs a useful description.');

// test: resolve known Kolkata districts
assert.equal(getMapRegion('kumartuli'), MAP_REGIONS[0], 'Known district ids must resolve to their catalog record.');

// test: reject unknown Kolkata district ids
assert.equal(getMapRegion('not-a-real-district'), null, 'Unknown district ids must not resolve to a fallback region.');

// test: resolve districts at their map centers
for (const region of MAP_REGIONS) assert.equal(getMapRegionAt(region.x, region.z), region, region.id + ' must be discoverable at its center.');

// test: include district discovery radius boundary
for (const region of MAP_REGIONS) assert.equal(getMapRegionAt(region.x + region.radius, region.z), region, region.id + ' must include the edge of its discovery radius.');

// test: exclude positions beyond district radius
for (const region of MAP_REGIONS) assert.equal(getMapRegionAt(region.x + region.radius + 1, region.z), null, region.id + ' must not discover positions outside its radius.');
