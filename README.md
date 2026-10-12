# Neon State

**Neon State** is an original open-world city-game prototype set in Port Meridian. Development happens in reviewable feature branches. The current game is a 2D top-down browser prototype—not a finished GTA-scale or 3D game.

All characters, mission writing, locations, and world design are original. This project does not include GTA V code, story, map data, or proprietary assets.

## Run the game

1. Download this branch using **Code → Download ZIP**, then extract it.
2. Open `index.html` in a modern desktop browser.
3. If local-file restrictions cause issues, run a local server:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

No package installation or build step is needed for this prototype. Google Fonts are optional.

## Controls

| Key | Action |
|---|---|
| WASD / arrows | Move |
| Shift | Sprint / faster driving |
| E | Enter or exit a nearby vehicle |
| 1 / 2 / 3 | Switch protagonists |
| F | Talk to a nearby character |
| Space | Interact / continue dialogue |
| Esc | Close dialogue |
| L | Open or close the campaign journal |
| R | Repair the current vehicle for $100 |
| P / O | Save / load in this browser |
| Sound On/Off | Toggle sound effects |
| Volume slider | Adjust sound-effect volume |
| New Game | Restart the current prototype session |

## Current prototype features

- Large procedurally drawn city grid with named districts and a waterfront.
- Three original switchable protagonists.
- Parked vehicles and simple driving, building collisions, and repair costs.
- Ambient moving traffic and lightweight pedestrian visuals.
- Named NPCs with dialogue panels.
- Three starter campaign objectives with cash rewards, plus free roam.
- Campaign journal showing completed, active, and upcoming objectives.
- Collectible cash, cash counter, and a basic heat indicator.
- Minimap, district/status HUD, and cycling day/night tint.
- Procedural sound cues for conversations, vehicles, pickups, and mission completion.
- Master sound toggle and adjustable sound-effect volume.
- Browser-local saves for player state, mission progress, cash, pickups, and vehicle positions.

## Limitations

This is an early prototype. The world is represented by simple 2D graphics. Traffic and pedestrians are basic visual simulations; they are not advanced autonomous agents. The project does not yet include a full 3D renderer, advanced vehicle physics, a branching campaign, combat, police AI, voice acting, authored soundtrack, multiplayer, or cloud saves. Save data remains in the current browser profile and device.

## Branch strategy

- `main`: stable baseline.
- `feature/world-simulation`: traffic/world simulation experiment.
- `feature/campaign-expansion`: mission journal and campaign progress UI.
- `feature/audio-polish`: sound volume controls.
- `feature/gameplay-upgrade`: combined integration branch for review.

Features listed as future work are not yet implemented. A GitHub Actions workflow runs `node --check` against both JavaScript files. The integration branch should pass that check and be tested in a browser before merging into `main`.
