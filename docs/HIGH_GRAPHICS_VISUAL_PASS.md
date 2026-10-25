# Neon State — High Graphics Visual Pass

This document tracks manual graphics checks for the 3D Freeze Build. These are test instructions, **not claims that the browser tests have passed**. Higher presets use more GPU memory and may reduce frame rate on integrated graphics.

## Preset and performance checks

- [ ] **01 — Preset cycling:** click Graphics and confirm HIGH → ULTRA → EXTREME → PERFORMANCE → HIGH.
- [ ] **02 — ULTRA preset:** Verify the pixel-ratio cap changes to the ULTRA profile and the canvas stays correctly sized.
- [ ] **03 — EXTREME preset:** Verify EXTREME activates the largest configured shadow map and a 2.5 device-pixel-ratio cap.
- [ ] **04 — PERFORMANCE preset:** Verify PERFORMANCE disables shadows and lowers the pixel-ratio cap for slower machines.
