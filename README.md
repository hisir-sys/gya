# Neon State

**Neon State** is an original open-world city-game prototype set in Port Meridian. Development is split into feature branches so gameplay changes can be reviewed independently. The current build is a 2D top-down browser prototype—not a finished 3D game.

All characters, mission writing, locations, and world design are original. This project does not include GTA V code, story, map data, or proprietary assets.

## Run

1. Download this branch with **Code → Download ZIP** and extract it.
2. Open `index.html` in a modern desktop browser.
3. If needed, run `python -m http.server 8000` from the extracted folder and visit `http://localhost:8000`.

No package installation or build step is required. Google Fonts are optional.

## Controls

| Key | Action |
|---|---|
| WASD / arrows | Move |
| W / Up Arrow | Move forward on foot / accelerate in a vehicle |\n| S / Down Arrow | Move down on foot / brake or reverse in a vehicle |\n| A / D | Move on foot / steer left and right in a vehicle |\n| Shift | Sprint / boost vehicle acceleration |
| E | Enter or exit a nearby vehicle |
| 1 / 2 / 3 | Switch protagonists |
| F | Talk to a nearby character |
| Space | Interact / continue dialogue |
| Esc | Close dialogue |
| L | Open / close the campaign journal |
| R | Repair current vehicle for $100 |
| P / O | Save / load in this browser |
| Sound On/Off | Toggle sound effects |
| Volume slider | Adjust sound-effect volume |
| New Game | Restart the prototype session |

## Implemented in this branch

- Large procedural 2D city grid, named districts, and a waterfront.
- Three original switchable protagonists.
- Parked vehicles, acceleration, steering, reverse, momentum, building collision, and repairs.
- Moving ambient traffic and lightweight pedestrian visuals.
- Named NPCs with dialogue panels.
- Three starter campaign objectives with cash rewards and a free-roam state.
- Campaign journal showing active, completed, and upcoming objectives.
- Collectible cash, cash counter, and a basic heat indicator.
- Minimap, zone/status HUD, and cycling day/night tint.
- Procedural sound effects, a sound toggle, and master volume slider.
- Browser-local saves for player state, mission progress, cash, pickups, and vehicle positions.

## Limitations

This is an early prototype. Graphics are simple 2D shapes, traffic is a basic looped simulation, and pedestrian movement is decorative. It does not yet include a full 3D renderer, advanced vehicle physics, branching story choices, combat, police AI, voice acting, authored music, multiplayer, or cloud saves. Saves remain in the current browser profile and device.

## Branch strategy

- `main`: stable baseline.
- `feature/world-simulation`: traffic experiment.
- `feature/campaign-expansion`: campaign journal.
- `feature/audio-polish`: sound volume control.
- `feature/gameplay-upgrade-v3`: integrated review branch.\n- `feature/vehicle-handling`: acceleration and steering refinement.

Features listed as future work are not yet implemented. The integration branch should pass the JavaScript syntax workflow and be tested in a browser before merging into `main`.
