# Neon State — Visual Pass Playtest Checklist

Use this checklist after changing the procedural city, lighting, camera, or graphics presets. The browser prototype has syntax validation, but visual quality and performance still require a real browser run on the target machine.

## Quick launch

1. From the repository root, run `python -m http.server 8000`.
2. Open `http://localhost:8000/freeze.html` in a desktop browser.
3. Confirm the browser can load the Three.js module from jsDelivr and that WebGL is enabled.
4. Open DevTools Console and keep it visible during the first pass.

## Visual checks

- [ ] The scene renders with the golden-hour sky, warm sun, cool fill light, and distance fog.
- [ ] Neon facade signs display readable text and do not show mirrored or stretched lettering from the intended viewing direction.
- [ ] Window grids, building roofs, and facade accents remain attached to buildings while moving around.
- [ ] Palm fronds and trunks are visible at street level and do not dominate the sidewalk.
- [ ] Double-yellow road lines, dashed lane markings, sidewalks, and crosswalks sit above the road surface without obvious flicker (z-fighting).
- [ ] The beach, seawall, and ocean meet cleanly; no large gaps or unintended overlaps are visible from the waterfront.
- [ ] Street lamps and emissive signs remain legible without washing out nearby buildings.
- [ ] Shadows are enabled, stable while moving, and not visibly clipped across the main playable area.
- [ ] The minimap, objective markers, dialogue, vehicle HUD, and pause UI remain readable over the 3D scene.

## Gameplay regression checks

- [ ] Walk in all four directions and run with Shift; camera-relative movement still feels consistent.
- [ ] Click the world to enable mouse look; Esc releases the pointer and the reset-camera control restores the view.
- [ ] Enter and exit the car, drive, reverse, steer, and use Space for the handbrake.
- [ ] Start and finish a dialogue interaction; confirm the selected reward and objective update.
- [ ] Switch between protagonists and verify each storyline keeps its own progress.
- [ ] Reload the page and verify saved progress behaves as expected.
- [ ] Check the browser console for module errors, missing assets, and repeated warnings.

## Performance pass

Test the same route and camera angle with **Performance**, **High**, and **Ultra** presets.

| Record | What to note |
| --- | --- |
| Device | CPU, GPU, RAM, browser, and screen resolution |
| Preset | Performance / High / Ultra |
| Frame pacing | Smooth, occasional stutter, or frequent stutter |
| Visual defects | Flicker, pop-in, clipped shadows, unreadable signs |
| Console | Errors or warnings, if any |

Do not mark a browser playtest complete based on JavaScript syntax checks alone. Record the device and any visible defects so future performance changes can be compared fairly.

## Current known scope

This is an early browser-based 3D vertical slice using procedural geometry and generated textures. The Vice City-inspired color palette is an original homage, not a reproduction of proprietary game assets. Professional character rigs, handcrafted/streamed environments, detailed vehicle models, and production-level effects remain future work.
