# Neon State — AAA-Style Development Roadmap

This roadmap targets the *feel and production discipline* of a modern 3D open-world game. It is a staged plan, not a claim that a small browser prototype can become a complete AAA production overnight.

## Current baseline

- Browser-based Three.js scene with a procedural city.
- Three protagonists with three short story beats each.
- On-foot movement, minimap, dialogue, and ambient traffic/pedestrians.
- One basic drivable sports car with enter/exit, acceleration, reverse, steering, and simple collision stops.
- Original fictional setting: Port Meridian.

## Phase 0 — Make the current build reliable (next)

**Goal:** every demo run works on the target computer.

- Playtest startup, movement, collision, vehicle enter/exit, and all nine story beats in a real browser.
- Fix camera clipping, spawn/exit placement, mission-marker readability, and edge cases.
- Add a visible loading/error state when WebGL or the Three.js CDN is unavailable.
- Add a repeatable smoke-test checklist and record supported browsers/GPU expectations.

**Done when:** a fresh checkout launches and a tester can complete one chapter without a blocking bug.

## Phase 1 — Make driving feel like a game

- Replace instant-feeling steering with acceleration, braking, grip, handbrake/drift tuning, and speed feedback.
- Add vehicle engine/road/skid sounds with volume controls.
- Add a vehicle HUD: speed, gear/state, and clear enter/exit prompts.
- Improve vehicle collision response and prevent the player/car getting trapped.
- Add several distinct vehicle types only after the first vehicle feels reliable.

**Done when:** driving is fun, readable, and reliable—not merely a car-shaped object moving around.

## Phase 2 — Character movement and animation

- Replace primitive player geometry with original rigged character models.
- Add idle, walk, run, turn, and enter/exit animations.
- Improve camera follow, camera obstruction handling, and movement smoothing.
- Add interaction prompts and NPC conversation states.

**Done when:** characters and movement no longer look like a grey-box prototype.

## Phase 3 — Build a distinctive city

- Replace repeated box buildings with original modular building kits and landmark silhouettes.
- Create named districts with distinct lighting, signage, street furniture, and atmosphere.
- Add level-of-detail, frustum culling, and chunk/zone loading before expanding map size.
- Add day/night and weather only after performance is stable.
- Keep assets licensed or original; do not copy GTA maps, characters, missions, or proprietary assets.

**Done when:** each district is recognizable and the scene holds a stable frame rate on the target hardware.

## Phase 4 — Turn stories into missions

- Move mission definitions into structured data rather than hard-coded scene logic.
- Add objective chains, checkpoints, failure/retry, rewards, and save/load.
- Give each protagonist meaningful choices and different mission outcomes.
- Add NPC schedules and mission-specific interactions only where they support the story.

**Done when:** each protagonist has a complete, replayable chapter with a clear beginning, middle, and ending.

## Phase 5 — Audio, effects, and world response

- Original music and ambient sound layers.
- Better lighting, shadows, particles, weather effects, and cinematic transitions.
- Reactive pedestrians/traffic and wanted/police systems only after driving and mission systems are stable.
- Add accessibility settings: volume, sensitivity, graphics quality, and remappable controls.

**Done when:** presentation polish reinforces gameplay instead of hiding missing systems.

## Phase 6 — Production hardening

- Profile CPU/GPU/memory; set a minimum hardware target.
- Add graphics presets and graceful fallback for weak GPUs.
- Test the full loop on clean installs and multiple browsers.
- Package the experience as a desktop build only if browser constraints become a real blocker.
- Keep the 2D prototype available until the 3D build has feature parity where needed.

## Rules for each milestone

1. Work on a dedicated branch and make small reviewable commits.
2. Run syntax checks and the relevant gameplay smoke tests before merging.
3. Do not claim a feature is complete until it has been tested in the running game.
4. Prioritize playable systems over adding many unfinished features.
5. Keep the existing 2D prototype intact while the 3D version matures.

## Immediate next sprint

1. Browser-playtest the current 3D build.
2. Fix any startup, camera, collision, or vehicle bugs found.
3. Improve car handling and add speed/vehicle HUD.
4. Add basic sound feedback.
5. Replace the player placeholder with an original animated character after selecting a suitable licensed/free asset pipeline.
