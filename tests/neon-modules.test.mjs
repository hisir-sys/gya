import test from 'node:test';
import assert from 'node:assert/strict';
import { MAP_REGIONS, STORY_ARCS, getMapRegion, getMapRegionAt } from '../neon-map-catalog.js';
import { SIDE_STORIES, createSideStoryProgress, normalizeSideStoryProgress, getCurrentSideMission } from '../neon-side-stories.js';

test('map region identifiers are unique and stable', () => {
  const ids = MAP_REGIONS.map(region => region.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(ids, ['kumartuli', 'sector-v', 'south-lakes', 'eco-park']);
});

test('every map region has valid spawn and discovery metadata', () => {
  for (const region of MAP_REGIONS) {
    assert.ok(Number.isFinite(region.spawn.x));
    assert.ok(Number.isFinite(region.spawn.z));
    assert.ok(region.radius > 0);
    assert.ok(region.palette.length >= 3);
    assert.ok(region.description.length > 10);
  }
});

test('region lookup returns null for unknown identifiers', () => {
  assert.equal(getMapRegion('not-a-district'), null);
  assert.equal(getMapRegion(null), null);
});

test('region lookup returns the matching region object', () => {
  for (const region of MAP_REGIONS) assert.equal(getMapRegion(region.id), region);
});

test('district discovery uses the configured radius', () => {
  for (const region of MAP_REGIONS) {
    assert.equal(getMapRegionAt(region.x, region.z), region);
    assert.equal(getMapRegionAt(region.x + region.radius + 1, region.z), null);
  }
});

test('story arcs reference real districts and unique identifiers', () => {
  assert.equal(new Set(STORY_ARCS.map(arc => arc.id)).size, STORY_ARCS.length);
  for (const arc of STORY_ARCS) {
    assert.ok(MAP_REGIONS.some(region => region.id === arc.region));
    assert.ok(arc.title.length > 4);
    assert.ok(arc.summary.length > 12);
  }
});

test('side story identifiers and mission arrays are valid', () => {
  assert.equal(new Set(SIDE_STORIES.map(story => story.id)).size, SIDE_STORIES.length);
  for (const story of SIDE_STORIES) {
    assert.ok(story.missions.length >= 3);
    assert.ok(story.missions.every(mission => mission.title && mission.text));
  }
});

test('every side mission has a complete playable payload', () => {
  for (const story of SIDE_STORIES) {
    for (const mission of story.missions) {
      assert.ok(Number.isFinite(mission.x) && Number.isFinite(mission.z));
      assert.ok(Number.isFinite(mission.reward) && mission.reward > 0);
      assert.ok(mission.speaker);
      assert.ok(mission.lines.length >= 2);
      assert.equal(mission.choices.length, 2);
    }
  }
});

test('new side story progress starts at the first mission', () => {
  const progress = createSideStoryProgress();
  for (const story of SIDE_STORIES) {
    assert.deepEqual(progress[story.id], { step: 0, completed: false, choices: [] });
  }
});

test('progress normalization supplies defaults for missing and malformed saves', () => {
  assert.deepEqual(normalizeSideStoryProgress(null), createSideStoryProgress());
  assert.deepEqual(normalizeSideStoryProgress(undefined), createSideStoryProgress());
  assert.deepEqual(normalizeSideStoryProgress('invalid'), createSideStoryProgress());
});

test('progress normalization clamps mission steps to each story length', () => {
  const progress = normalizeSideStoryProgress({
    lanterns: { step: -10 },
    'after-hours': { step: 999 },
    'lake-time': { step: 1.9 }
  });
  assert.equal(progress.lanterns.step, 0);
  assert.equal(progress['after-hours'].step, SIDE_STORIES.find(s => s.id === 'after-hours').missions.length);
  assert.equal(progress['lake-time'].step, 1);
});

test('completed stories cannot point beyond their final mission', () => {
  const story = SIDE_STORIES[0];
  const progress = normalizeSideStoryProgress({ [story.id]: { step: story.missions.length } });
  assert.equal(progress[story.id].completed, true);
  assert.equal(progress[story.id].step, story.missions.length);
});

test('choice history is bounded and only accepts the two supported choices', () => {
  const story = SIDE_STORIES[0];
  const progress = normalizeSideStoryProgress({
    [story.id]: { step: 3, choices: [0, 1, 9, '1', null, 0] }
  });
  assert.deepEqual(progress[story.id].choices, [0, 1, null, null, null, 0].slice(0, story.missions.length));
});

test('unknown story keys in old saves are ignored', () => {
  const progress = normalizeSideStoryProgress({ obsolete: { step: 5 }, lanterns: { step: 1 } });
  assert.equal(Object.hasOwn(progress, 'obsolete'), false);
  assert.equal(progress.lanterns.step, 1);
});

test('current side mission resolves the active step', () => {
  const story = SIDE_STORIES[0];
  const progress = createSideStoryProgress();
  assert.equal(getCurrentSideMission(story, progress), story.missions[0]);
  progress[story.id].step = 1;
  assert.equal(getCurrentSideMission(story, progress), story.missions[1]);
});

test('completed or missing story progress has no current mission', () => {
  const story = SIDE_STORIES[0];
  assert.equal(getCurrentSideMission(story, {}), null);
  assert.equal(getCurrentSideMission(story, { [story.id]: { step: 0, completed: true } }), null);
  assert.equal(getCurrentSideMission(null, {}), null);
});

test('all side story mission rewards are positive and coordinates remain finite', () => {
  for (const story of SIDE_STORIES) {
    const total = story.missions.reduce((sum, mission) => sum + mission.reward, 0);
    assert.ok(total > 0);
    assert.ok(story.missions.every(mission => Number.isFinite(mission.x + mission.z)));
  }
});

test('normalizing progress does not mutate the saved object', () => {
  const saved = { lanterns: { step: 2, completed: false, choices: [1, 0] } };
  const before = structuredClone(saved);
  normalizeSideStoryProgress(saved);
  assert.deepEqual(saved, before);
});


test('district display names are present and distinct', () => {
  const names = MAP_REGIONS.map(region => region.name);
  assert.equal(new Set(names).size, names.length);
  assert.ok(names.every(name => typeof name === 'string' && name.length > 4));
});


test('district palettes contain valid six-digit hex colours', () => {
  for (const region of MAP_REGIONS) {
    for (const colour of region.palette) assert.match(colour, /^#[0-9a-f]{6}$/i);
    assert.match(region.accent, /^#[0-9a-f]{6}$/i);
  }
});


test('region centre and spawn coordinates stay synchronized', () => {
  for (const region of MAP_REGIONS) {
    assert.equal(region.spawn.x, region.x);
    assert.equal(region.spawn.z, region.z);
  }
});


test('district discovery circles do not overlap', () => {
  for (let i = 0; i < MAP_REGIONS.length; i++) {
    for (let j = i + 1; j < MAP_REGIONS.length; j++) {
      const a = MAP_REGIONS[i], b = MAP_REGIONS[j];
      assert.ok(Math.hypot(a.x - b.x, a.z - b.z) > a.radius + b.radius);
    }
  }
});


test('every story arc has a corresponding playable side story', () => {
  for (const arc of STORY_ARCS) {
    const story = SIDE_STORIES.find(item => item.id === arc.id);
    assert.ok(story, 'Missing playable story for ' + arc.id);
    assert.equal(story.region, arc.region);
    assert.equal(story.title, arc.title);
  }
});


test('side story titles are non-empty and distinct', () => {
  const titles = SIDE_STORIES.map(story => story.title);
  assert.equal(new Set(titles).size, titles.length);
  assert.ok(titles.every(title => title.trim().length > 4));
});


test('mission titles are unique within each story', () => {
  for (const story of SIDE_STORIES) {
    const titles = story.missions.map(mission => mission.title);
    assert.equal(new Set(titles).size, titles.length, story.id + ' has duplicate mission titles');
  }
});


test('mission dialogue is always a pair of readable strings', () => {
  for (const story of SIDE_STORIES) for (const mission of story.missions) {
    assert.ok(mission.lines.every(line => typeof line === 'string' && line.trim().length > 0));
  }
});


test('mission choices are always two readable strings', () => {
  for (const story of SIDE_STORIES) for (const mission of story.missions) {
    assert.ok(mission.choices.every(choice => typeof choice === 'string' && choice.trim().length > 0));
  }
});


test('mission rewards are whole non-negative currency amounts', () => {
  for (const story of SIDE_STORIES) for (const mission of story.missions) {
    assert.ok(Number.isInteger(mission.reward));
    assert.ok(mission.reward >= 0);
  }
});
