# Neon State — Freeze Build 0.1

## What this build is
A playable, browser-based 3D vertical slice for deadline demonstration. It uses Three.js from a public CDN, procedural primitive geometry, original characters, and original story writing. It is not a finished open-world release.

## Launch
1. Open `freeze.html` in a modern desktop browser with internet access.
2. If direct file loading blocks ES modules, serve the repository folder with Python: `python -m http.server 8000`.
3. Open `http://localhost:8000/freeze.html`.
4. Wait for the city to load. WebGL and access to jsDelivr are required for the 3D renderer.

## Controls
- **WASD / arrow keys:** move relative to the camera direction around the city.
- **Mouse look:** click inside the 3D city to capture the cursor, then move the mouse to orbit the third-person camera. Press **Esc** to release the cursor; click the city again to recapture. Use **RESET CAMERA** to restore the default view.
- **Shift:** run while on foot.
- **F:** enter or exit the gold sports car near the starting intersection.
- **WASD / arrow keys while driving:** accelerate, reverse, and steer; the camera follows the vehicle.
- **Space while driving:** handbrake; the vehicle HUD shows speed, gear/state, and sound-effects volume.
- **E or Space on foot:** start / continue the current story interaction; the final dialogue line presents a choice.
- **R:** restart at the current story objective checkpoint.
- **1 / 2 / 3:** switch between Jax, Nia, and Eli, each with independent mission progress.
- **Esc:** releases the mouse cursor; press Esc again when the cursor is released to pause/resume. Use the menu to reset progress.
- **Graphics presets:** cycle High, Ultra, and Performance to trade image quality for frame rate. High is the default; Ultra uses a higher render scale and larger shadow map.
- **Atmosphere toggle:** switch between Golden Hour and Neon Night, with coordinated sky/fog colors, ambient and directional lighting, exposure, and brighter emissive windows/neon signage.

## Three personal storylines
- **Jax Mercer — The Long Way Home:** a courier delivery, a suspicious route change, and a choice about his future.
- **Nia Vale — The Missing Ledger:** a missing financial record, a freight investigation, and a public-records reveal.
- **Eli Cross — Favors Owed:** a neighborhood dispute, a search for the missing delivery, and a community agreement.

Each protagonist has three short story beats with dialogue and a cash reward. Switch characters at any time to play another storyline.

## Implemented
- 3D third-person camera with pointer-locked mouse look, camera-relative on-foot movement, camera recentering, and High/Ultra/Performance graphics presets.
- Higher render resolution, improved tone mapping, and a larger soft-shadow map in the High/Ultra presets.
- One-click Golden Hour / Neon Night atmosphere toggle that updates the scene palette, fog, lighting, exposure, window glow, and neon sign intensity.
- Procedurally assembled city blocks with a Vice City-inspired golden-hour palette, warm/cool cinematic lighting, emissive neon shop signs, lit windows, palm trees, textured asphalt, double center lines, crosswalks, beach edge, oceanfront, sunset disc, fog, and shadows.
- First drivable sports car with acceleration/braking, reverse, grip/handbrake tuning, collision response, enter/exit interaction, speed/gear HUD, generated engine/skid audio, and a vehicle-follow camera.
- Procedurally articulated original character silhouettes with pivot-based limb motion and smoother turning/running.
- District identity pass: facade accents, rooftop beacons, street lamps, and custom civic/freight/waterfront landmark silhouettes.
- Branching dialogue choices with saved decisions, reward differences, local save/load for cash and story progress, and objective checkpoint restart.
- Distinct player colors and independent mission progress for three protagonists.
- Floating story markers, proximity interaction, dialogue panel, cash counter, minimap, pause/reset menu, and ambient traffic/pedestrians.
- Original fictional city, characters, and dialogue.

## Known limitations
This is an early vertical slice, not a complete AAA-scale game. These are first-pass implementations for roadmap Phases 1–4, not full production completion. The character is still procedural geometry rather than a professionally rigged external model; the city is procedural rather than a handcrafted streamed world; and choices currently change rewards and persist decisions rather than unlocking fully different mission scenes. There is one usable car, no advanced vehicle simulation, interiors, voice acting, combat, police AI, cloud saves, or mobile touch controls. Traffic/pedestrians remain ambient decoration. The renderer requires WebGL and an internet connection for the Three.js CDN. Browser syntax checks pass, but real gameplay, audio balance, collision tuning, and save/load still need a hands-on browser playtest on the target computer.


## Vehicle nitro boost
- Enter the car with **F** and accelerate with **W**.
- Hold **Shift + W** to spend nitro fuel and accelerate beyond the normal top speed.
- Nitro drains while boosting and recharges automatically when you stop boosting; the vehicle HUD shows the current fuel percentage.
- **Space** remains the handbrake. Nitro does not activate while the handbrake is held or when reversing.
