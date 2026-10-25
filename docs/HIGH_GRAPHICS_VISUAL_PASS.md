# Neon State — High Graphics Visual Pass

This document tracks manual graphics checks for the 3D Freeze Build. These are test instructions, **not claims that the browser tests have passed**. Higher presets use more GPU memory and may reduce frame rate on integrated graphics.

## Preset and performance checks

- [ ] **01 — Preset cycling:** click Graphics and confirm HIGH → ULTRA → EXTREME → PERFORMANCE → HIGH.
- [ ] **02 — ULTRA preset:** Verify the pixel-ratio cap changes to the ULTRA profile and the canvas stays correctly sized.
- [ ] **03 — EXTREME preset:** Verify EXTREME activates the largest configured shadow map and a 2.5 device-pixel-ratio cap.
- [ ] **04 — PERFORMANCE preset:** Verify PERFORMANCE disables shadows and lowers the pixel-ratio cap for slower machines.
- [ ] **05 — Preset labels:** Confirm the on-screen label always matches the active preset.
- [ ] **06 — Preset cycle recovery:** Cycle through all four presets twice and confirm the order never gets stuck.
- [ ] **07 — Resize after preset:** Resize the browser after changing presets and check that the renderer remains aligned.
- [ ] **08 — Initial preset:** Reload and confirm the initial preset label is HIGH.

## Rendering stability
- [ ] **09 — No console errors:** Check the browser console for errors while changing each graphics preset.
- [ ] **10 — Stable frame:** Walk around the city for two minutes and watch for severe hitching or freezing.
- [ ] **11 — Shadow visibility:** Inspect building and palm shadows in HIGH and ULTRA.
- [ ] **12 — Shadow quality:** Compare edges and self-shadow artifacts between ULTRA and EXTREME.
- [ ] **13 — Shadow recovery:** Switch to PERFORMANCE and back to ULTRA; confirm shadows return.
- [ ] **14 — Camera clipping:** Look across the skyline and confirm distant buildings do not vanish too early.
- [ ] **15 — Near clipping:** Move close to a building and check that nearby surfaces render normally.

## Atmosphere and lighting
- [ ] **16 — Fog at distance:** Check that distant blocks fade smoothly into the city atmosphere.
- [ ] **17 — Fog preset change:** Cycle presets and confirm the fog density updates without a visual pop.
- [ ] **18 — Golden Hour color:** Inspect warm sunset lighting on roads, buildings, and the beach.
- [ ] **19 — Neon Night color:** Switch to Neon Night and confirm the sky and fog change to cooler colors.
- [ ] **20 — Night window lights:** Confirm emissive window materials remain visible in Neon Night.
- [ ] **21 — Neon sign glow:** Check that neon signs remain readable at medium and long distances.
- [ ] **22 — Exposure balance:** Confirm EXTREME does not wash out bright signs or turn dark streets completely black.

## Sunset depth and atmosphere
- [ ] **23 — Sunset disc:** Confirm the sunset disc is visible without distracting from the playable area.
- [ ] **24 — Halo artifact check:** Look for obvious hard edges or depth-sorting artifacts around the sunset halo.
- [ ] **25 — Dust in ULTRA:** Verify subtle atmospheric dust appears in ULTRA.
- [ ] **26 — Dust in EXTREME:** Verify the dust is slightly more visible in EXTREME without obscuring gameplay.
- [ ] **27 — Dust in HIGH:** Verify the dust effect is hidden in HIGH for a lighter render workload.
- [ ] **28 — Dust in PERFORMANCE:** Verify the dust effect is hidden in PERFORMANCE.
- [ ] **29 — Dust motion:** Observe the skyline and confirm the dust field drifts subtly rather than spinning visibly.

## Camera, world, and UI
- [ ] **30 — Camera follow:** Run and drive around the city; confirm the camera follows without visible jitter.
- [ ] **31 — Mouse look responsiveness:** Test quick and slow mouse movement in ULTRA and PERFORMANCE.
- [ ] **32 — Minimap clarity:** Confirm the minimap remains sharp and readable at each preset.
- [ ] **33 — HUD contrast:** Check HUD text remains readable against bright and dark parts of the world.
- [ ] **34 — UI unaffected by quality:** Confirm changing the 3D quality preset does not blur or scale the HTML interface.
- [ ] **35 — Vehicle reflections impression:** Inspect the car from multiple angles and note any material or lighting artifacts.
- [ ] **36 — Road markings:** Check road center lines remain visible and do not flicker as the camera moves.

## World asset inspection
- [ ] **37 — Palm foliage:** Check palm leaves render without excessive flickering when moving the camera.
- [ ] **38 — Building windows:** Inspect window rows for z-fighting, missing faces, or sudden material changes.
- [ ] **39 — Sign readability:** Confirm neon signage stays legible without harsh overexposure.
- [ ] **40 — Beach and sea:** Inspect the shoreline, seawall, and sea colors in both atmosphere modes.
- [ ] **41 — Pedestrian silhouettes:** Confirm pedestrians remain visible against sidewalks and building shadows.
- [ ] **42 — Traffic readability:** Check traffic vehicles remain distinguishable from the road surface.
- [ ] **43 — Relic visibility:** Confirm glowing relics remain noticeable against both day and night palettes.

## Gameplay readability and hardware
- [ ] **44 — Relic shimmer:** Watch a relic for thirty seconds and check that rotation remains smooth.
- [ ] **45 — Avatar lighting:** Inspect the player avatar in bright sunlight and shaded streets.
- [ ] **46 — Mission marker contrast:** Confirm the active story marker is distinct from collectible markers.
