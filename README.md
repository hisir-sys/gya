# Neon State

**Neon State** is an original open-world city-game project set in Port Meridian, a fictional coastal city. It now includes two playable browser prototypes: the original 2D top-down sandbox and **Freeze Build 0.1**, a separate 3D vertical slice with three personal storylines.

All characters, mission writing, locations, and world design are original. This project does not include GTA V code, story, map data, or proprietary assets.

## Play the 3D Freeze Build

1. Download the repository from **Code → Download ZIP** and extract it.
2. Open a terminal in the extracted folder and run `python -m http.server 8000`.
3. Visit `http://localhost:8000/freeze.html`.
4. Use a modern desktop browser with WebGL and internet access (Three.js is loaded from jsDelivr).

If the 3D canvas does not load, check the browser console and confirm that WebGL and the CDN are accessible. Test the presentation computer ahead of time.

## 3D controls

| Key | Action |
|---|---|
| WASD / arrow keys | Move around the city |
| Shift | Run |
| E / Space | Start or continue the current story interaction |
| 1 / 2 / 3 | Switch protagonists |
| Esc | Pause / resume |

## Three personal storylines

- **Jax Mercer — The Long Way Home:** a courier delivery, a suspicious route change, and a choice about his future.
- **Nia Vale — The Missing Ledger:** a missing financial record, a freight investigation, and a public-records reveal.
- **Eli Cross — Favors Owed:** a neighborhood dispute, a search for a missing delivery, and a community agreement.

Each character has three short story beats with original dialogue, a separate mission path, and cash rewards. Switching protagonists preserves each character's mission progress for the current session.

Full launch notes and known limitations: [docs/FREEZE_BUILD.md](docs/FREEZE_BUILD.md).

## Original 2D prototype

Open `index.html` to play the original 2D sandbox. It includes a large procedural city grid, vehicles, ambient traffic, pedestrians, NPC dialogue, mission markers, pickups, a campaign journal, audio controls, and browser-local save/load.

## Freeze Build 0.1 includes

- A 3D perspective camera and a controllable third-person character.
- Procedurally assembled city blocks, streets, building windows, trees, lighting, fog, and shadows.
- Three original protagonists with independent three-beat storylines.
- Story markers, proximity interaction, dialogue, a cash counter, minimap, pause/reset menu, and ambient traffic/pedestrians.

## Known limitations

This is a deadline demo build, not a finished GTA-scale game. The 3D city uses procedural primitive geometry; traffic and pedestrians are ambient decoration. The 3D slice does not yet include vehicle driving, combat, police AI, interiors, voice acting, branching choices, cloud saves, or mobile touch controls. Its renderer needs WebGL and internet access for the Three.js CDN. Interactive browser testing on the final presentation computer is still required.

## Development workflow

The original 2D prototype remains available in `index.html`; the 3D freeze build is in `freeze.html` and `freeze.js`. Keep future gameplay work in focused feature branches and merge only after checking the actual browser build.
