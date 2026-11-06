# Neon State Photorealism Upgrade — Status

Target: photorealistic presentation with performance-first adaptive rendering.

## Implemented in this branch

- Procedural PMREM environment lighting and clearcoat vehicle paint from the preceding graphics pass.
- Performance-aware quality presets and adaptive render scaling.
- Optional weather runtime with clear, rain, and fog modes.
- Rain particle field follows the active player position.
- Wet-road material response and lightweight reflective puddle decals are enabled during rain.
- Renderer telemetry samples FPS, frame time, draw calls, triangles, geometry/texture counts, pixel ratio, and available WebGL/device limits.
- In-browser diagnostic report is exposed as `window.__neonStatePerfReport()` for manual profiling.
- Existing city, missions, vehicle selection, controls, and save key remain unchanged by the weather module.

## Still required before calling the upgrade complete

- Replace procedural placeholder buildings, cars, and pedestrian primitives with authored, optimized GLTF assets. No external asset pack is silently pulled into the game; asset licenses and download sizes must be reviewed.
- Migrate the player vehicle to Cannon `RaycastVehicle` with chassis/wheel collision, static building colliders, and input/garage compatibility. The existing driving controller is still the active controller.
- Generate a walkable Recast navmesh from actual sidewalks/crossings and route pedestrian goals through `NavMeshQuery`. Current pedestrian steering remains the fallback and active behavior.
- Add real material texture sets (base color, normal, roughness/metalness, AO) and verify wet-road reflection quality on supported GPUs.
- Perform browser/GPU visual testing on at least one integrated GPU and one discrete GPU. Capture measured FPS/frame-time and renderer statistics; do not substitute target FPS for measurements.

## Manual browser/GPU test procedure

1. Open the deployed preview and wait for the city to finish loading.
2. Open DevTools Console and run `window.__neonStatePerfReport()` after at least 10 seconds of gameplay.
3. Record the hardware block and latest/sample values for each graphics preset.
4. Cycle WEATHER through CLEAR, RAIN, and FOG; verify rain particles and wet-road response only appear in RAIN.
5. Cycle DAYLIGHT, GOLDEN HOUR, and NEON NIGHT while changing weather; verify the fog density returns to the atmosphere baseline when weather is CLEAR.
6. Walk and drive the same route for at least two minutes in PERFORMANCE, HIGH, ULTRA, and EXTREME.
7. Verify missions, controls, collisions, garage selection, and save/load behavior after each run.
8. Attach screenshots and the diagnostic report to the pull request before merging.

## Merge gate

Do not merge to `main` until all required items above are implemented or explicitly scoped out, CI passes on the latest head, and browser/GPU regression testing is recorded. Current target FPS values are goals, not measured results.
