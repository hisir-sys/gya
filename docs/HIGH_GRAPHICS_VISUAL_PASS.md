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
