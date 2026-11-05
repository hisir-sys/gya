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
| Shift | Sprint (stamina-limited) / nitro while driving |
| E / Space | Start or continue the current story interaction |
| 1 / 2 / 3 | Switch protagonists |
| Esc | Pause / resume |
| F | Enter / exit the gold sports car |
| T | Start / cancel a street sprint |
| R | Recover at the current story checkpoint |
| Mouse wheel / + / - | Camera zoom |

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

This is an evolving browser prototype, not a finished commercial open-world game. The city uses procedural primitive geometry; traffic and pedestrians are lightweight ambient simulation, and police pursuit is an early gameplay system rather than a full traffic-aware AI. There are no interiors, voice acting, online multiplayer, or cloud saves. Browser storage is local to the current browser profile. The renderer needs WebGL and internet access for the Three.js CDN. Actual browser, GPU, and touchscreen playtesting on target devices is still required.

## Development workflow

The original 2D prototype remains available in `index.html`; the 3D freeze build is in `freeze.html` and `freeze.js`. Keep future gameplay work in focused feature branches and merge only after checking the actual browser build.

## Vice Coast visual edition

The 3D Freeze Build uses a neon-noir coastal presentation inspired by the supplied Vice Coast concept: a hot-pink and cyan accent palette, sunset framing, frosted purple HUD panels, and matching mission, wanted-level, street-sprint, and vehicle overlays. The existing current-branch gameplay runtime is preserved rather than replaced with an older prototype copy, so its relic hunt, nitro, wanted system, vehicle condition, and street sprint remain wired to their existing controls.

The city, characters, story, and visual direction are original. This is a browser-based prototype, not a complete commercial open-world game and not an implementation of GTA or Rockstar assets.


## Fullscreen and graphics update

The 3D Freeze Build now uses a viewport-filling layout and includes a fullscreen toggle in the in-game controls. The HUD, wanted indicator, minimap, sprint display, and vehicle readouts have been tuned for a high-contrast neon-noir presentation across desktop and mobile aspect ratios. The graphics preset selector still provides PERFORMANCE, HIGH, ULTRA, and EXTREME profiles; use PERFORMANCE or HIGH on integrated graphics and increase quality only if frame rate remains smooth. Fullscreen requests depend on browser support and user interaction. Visual changes are syntax-checked in CI, but actual GPU performance must be measured on the target machine.


## Current gameplay improvements

The current build includes a live objective compass, a heading-aware minimap player marker, stamina-limited running with automatic recovery, safer vehicle recovery after collisions, a story-interaction check that requires exiting the car, and automatic local saves when the page is hidden or closed. When the browser tab becomes hidden, the game pauses to prevent unattended simulation from continuing.


## Phase 5–6: City exploration and pedestrian life

- Explore three additional named districts: Marina Promenade, Arts District, and Hillside, each with a distinct skyline feature and a one-time discovery reward.
- District discoveries are saved in the browser-local game save alongside story and relic progress.
- Pedestrians now roam around their home areas, choose new nearby destinations, avoid building collisions, and move away when the player approaches too quickly or drives nearby.
- Walk up calmly to a pedestrian and press **E** to hear a short local conversation. A contextual prompt appears when someone is close enough to talk to.
- Story-marker interactions take priority over ambient conversations, and relic collection keeps its existing priority.

These are lightweight prototype behaviours; they are not a full navigation mesh, pathfinding system, or simulated city schedule. Browser playtesting is still needed to tune pedestrian density, movement, and district boundaries.

## Phases 7–9: living traffic, city contracts, and public-safety response

- **Phase 7 — traffic behaviour:** ambient cars slow for same-lane traffic and for the player's car when it is ahead in their lane. Vehicles still turn away from blocked building edges; collision damage remains active.
- **Phase 8 — city contracts:** on foot, press **Y** to accept a parcel or service route. Complete the checkpoints in Marina, the Arts District, or Hillside. A collision-free delivery earns a 20% bonus; a traffic collision removes that bonus. Each contract is saved as completed.
- **Phase 9 — dispatch response:** the first wanted alert positions patrol cars around the player's current location. Response speed increases with wanted level, and officers can issue a non-violent citation on foot or in a vehicle. The existing wanted HUD and search cooldown remain in place.

The new contracts share the existing route checkpoint visuals with street sprints. This keeps the prototype lightweight and avoids introducing a second route-rendering system. Static checks cover the new control, save fields, route definitions, and dispatch presentation; in-browser traffic spacing, route navigation, and graphics still need hands-on playtesting.

## Phases 10–12: progression, accessibility, and performance

- **Phase 10 — vehicle progression:** press **G** while on foot (or use the touch garage button) to open the garage. Engine, handling, and armor each have three permanent upgrade levels purchased with in-game cash. Engine upgrades improve acceleration and top speed, handling upgrades improve steering response, and armor reduces collision damage while increasing the vehicle's repair capacity. Upgrade levels are stored in the existing local save.
- **Phase 11 — settings and accessibility:** graphics quality, atmosphere, volume, and reduced-motion preference are stored locally. The Settings control toggles reduced motion; it suppresses atmospheric particle effects and reduces interface transitions. The volume slider remains available in the vehicle HUD.
- **Phase 12 — performance and recovery:** the minimap is capped at 10 updates per second, adaptive render scaling now responds across all graphics presets, and WebGL context loss/restoration is handled without continuing to render into a lost context. Contract checkpoint markers follow the active contract route on the minimap.

These are browser-local prototype systems. Garage upgrades do not change the story or affect other players. Automated CI checks validate syntax and key integration hooks; real device/GPU profiling and gameplay balance checks still require playtesting.


## Phases 13–14: city services and vehicle selection

- **Phase 13 — city destinations:** Port Meridian now has four service stops: Marina Motor Works (vehicle repair), Palm Fuel & Market (nitro refill), Neon Customs (return to the sports coupe), and Arts Corner Cafe (a small cash reward). Walk into the marked service area and press **E**. Service markers are built from lightweight scene geometry and do not replace story, relic, or pedestrian interactions.
- **Phase 14 — vehicle expansion:** the garage now offers a sports coupe, city sedan, and coastal SUV. Select a vehicle while on foot; the choice is saved locally. The variants use distinct body proportions, paint, wheel sizes, acceleration, top speed, and steering response. The existing engine/handling upgrades continue to apply to each vehicle.

The vehicle selector is a prototype fleet, not a claim of full vehicle physics or a large commercial vehicle roster. Browser, keyboard, controller, mobile, and GPU playtesting are still required.


## Phases 15–16: mission journal and audio controls

- **Phase 15 — mission journal:** press **J** or use JOURNAL to review all three protagonists, chapter completion, current/locked story beats, saved dialogue choices, cash, relics, city contracts, and discovered districts. The journal reads the same local campaign state as the HUD and does not create a second save source.
- **Phase 16 — audio controls:** SOUND toggles game audio on/off and the existing SFX slider controls the master level for engine, skid, and short story/relic/service cues. Mute and volume are saved locally. Browser audio still requires a user interaction before playback.
- Repair now checks that the player has the full $100 service fee before restoring vehicle condition; it no longer silently grants free repairs to players with insufficient cash.

Automated checks cover journal wiring, saved audio state, selector synchronization, and repair affordability. Real browser audio-device, keyboard, and mobile playtesting remains required.
