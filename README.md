# Neon State

**Neon State** is an original open-world city-game prototype set in Port Meridian. It is being built in small, reviewable milestones. The current build is a 2D top-down browser prototype—not a finished GTA-scale or 3D game.

All characters, mission text, locations, and world design are original. This project does not include GTA V code, story, map data, or proprietary assets.

## Run the game

1. Download this repository using **Code → Download ZIP**, then extract it.
2. Open `index.html` in a modern desktop browser.
3. If your browser restricts local-file behavior, run a local server from this folder:
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000`.

No build step or package installation is required for the current prototype. Google Fonts are optional; the interface falls back to system fonts if unavailable.

## Controls

| Key | Action |
|---|---|
| W A S D / Arrow keys | Move |
| Shift | Sprint on foot / faster driving |
| E | Enter or exit a nearby unoccupied vehicle |
| 1 / 2 / 3 | Switch between Jax, Nia, and Eli |
| F | Talk to a nearby named character |
| Space | Continue dialogue, interact with a mission marker, or talk nearby |
| Esc | Close dialogue |
| R | Repair the current vehicle for $100 |
| P / O | Save / load in this browser |
| Sound On / Off | Toggle procedural sound cues |
| New Game | Reset mission, cash, pickups, and player position |

## Implemented in the current prototype

- A larger 2D city grid with distinct named areas and a waterfront.
- Three switchable original protagonists.
- Parked vehicles, enter/exit controls, driving, basic building collision, and repair costs.
- Named NPCs with dialogue panels.
- A three-step starter campaign with objective markers and cash rewards, followed by free roam.
- Collectible cash markers, a cash counter, and a lightweight heat indicator.
- A minimap, zone/status HUD, responsive layout, and a cycling day/night tint.
- Browser-generated UI, pickup, vehicle, and mission-completion sound cues with a sound toggle.
- Browser-local save/load for player position, active protagonist, mission progress, cash, heat, collected items, and vehicle positions.

## Current limitations

This is still a small prototype. The city is procedurally drawn with simple shapes; vehicles and pedestrians are lightweight visual representations. There is no full 3D renderer, mission branching system, traffic AI, police AI, combat system, voice acting, authored music, controller support, online multiplayer, or cross-device/cloud saves yet. Browser saves are local to the browser profile and device.

## Roadmap

1. **Stability and playtesting:** verify controls, collision boundaries, saving/loading, and responsive layouts in supported browsers.
2. **World simulation:** improve vehicle steering, traffic behavior, pedestrian routines, landmarks, and collision feedback.
3. **Campaign systems:** add mission checkpoints, choices with consequences, objective tracking, and more character-specific sequences.
4. **Presentation:** original illustrated assets, improved lighting, ambient music and sound design, accessibility options, and settings.
5. **Larger game architecture:** evaluate a dedicated 3D engine and asset pipeline before expanding toward a true 3D open world.

Features in the roadmap are plans, not claims about the current build.
