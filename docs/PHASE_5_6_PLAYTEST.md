# Phase 5–6 Playtest: Districts and Pedestrian AI

Run the game from a local HTTP server:

`python -m http.server 8000` → `http://localhost:8000/freeze.html`

## District exploration
- [ ] Visit Marina Promenade and confirm the district label changes.
- [ ] Visit Arts District and confirm the district label changes.
- [ ] Visit Hillside and confirm the district label changes.
- [ ] Confirm each new district grants its discovery reward only once.
- [ ] Reload the page and revisit all three districts; rewards must not repeat.
- [ ] Confirm the previous six district labels still work.
- [ ] Confirm district discovery does not overwrite mission progress or relics.

## Pedestrian movement and reactions
- [ ] Observe pedestrians walking around their local starting areas.
- [ ] Wait for pedestrians to choose new nearby destinations.
- [ ] Walk calmly toward a pedestrian; they should remain approachable.
- [ ] Approach within interaction range and confirm the E prompt names the pedestrian.
- [ ] Press E and confirm a short role-specific conversation appears.
- [ ] Walk away and return; confirm the NPC can be spoken to again.
- [ ] Sprint toward a pedestrian; they should move away.
- [ ] Drive near pedestrians; they should move away from the vehicle.
- [ ] Confirm pedestrians do not walk through building collision volumes.

## Interaction priority and regression
- [ ] Stand on a mission marker near pedestrians; E should start the mission, not ambient dialogue.
- [ ] Stand near a relic; E should collect the relic as before.
- [ ] Confirm story dialogue and choice buttons still work.
- [ ] Confirm vehicle entry, driving, and exiting remain unchanged.
- [ ] Check the NPC prompt on desktop and mobile viewport sizes.

## Test notes
Record browser/version, OS, GPU, screen size, approximate FPS, and console errors. This checklist is manual; only mark a check after verifying it in the browser. Pedestrian navigation is intentionally lightweight and is not a full pathfinding or schedule simulation.
