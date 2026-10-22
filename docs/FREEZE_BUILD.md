# Neon State — Freeze Build 0.1

## What this build is
A playable, browser-based 3D vertical slice for deadline demonstration. It uses Three.js from a public CDN, procedural primitive geometry, original characters, and original story writing. It is not a finished open-world release.

## Launch
1. Open `freeze.html` in a modern desktop browser with internet access.
2. If direct file loading blocks ES modules, serve the repository folder with Python: `python -m http.server 8000`.
3. Open `http://localhost:8000/freeze.html`.
4. Wait for the city to load. WebGL and access to jsDelivr are required for the 3D renderer.

## Controls
- **WASD / arrow keys:** move around the city.
- **Shift:** run while on foot.
- **F:** enter or exit the gold sports car near the starting intersection.
- **WASD / arrow keys while driving:** accelerate, reverse, and steer; the camera follows the vehicle.
- **E or Space:** start / continue the current story interaction.
- **1 / 2 / 3:** switch between Jax, Nia, and Eli, each with independent mission progress.
- **Esc:** pause; Esc again resumes. Use the menu to reset progress.

## Three personal storylines
- **Jax Mercer — The Long Way Home:** a courier delivery, a suspicious route change, and a choice about his future.
- **Nia Vale — The Missing Ledger:** a missing financial record, a freight investigation, and a public-records reveal.
- **Eli Cross — Favors Owed:** a neighborhood dispute, a search for the missing delivery, and a community agreement.

Each protagonist has three short story beats with dialogue and a cash reward. Switch characters at any time to play another storyline.

## Implemented
- 3D perspective camera following a controllable character.
- Procedurally assembled city blocks, streets, windows, trees, waterfront-inspired colors, fog, lighting, and shadows.
- First drivable sports car with acceleration, reverse, steering, collision stops, enter/exit interaction, and a vehicle-follow camera.
- Distinct player colors and independent mission progress for three protagonists.
- Floating story markers, proximity interaction, dialogue panel, cash counter, minimap, pause/reset menu, and ambient traffic/pedestrians.
- Original fictional city, characters, and dialogue.

## Known limitations
This is an early vertical slice, not a complete AAA-scale game. The player can drive one basic sports car, but advanced vehicle physics, multiple usable vehicles, combat, police AI, interiors, voice acting, branching choices, cloud saves, and mobile touch controls are not implemented. The city is procedural and traffic/pedestrians are ambient decoration. The renderer requires WebGL and an internet connection for the Three.js CDN. Test on the actual presentation computer before the event.
