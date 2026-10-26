# Neon State — Open-World Gameplay Pass

This update pushes the original Port Meridian prototype toward a cinematic 1980s-inspired open-world driving sandbox without copying proprietary GTA assets or story content.

## Implemented systems
- Five-step wanted meter and readable pursuit HUD.
- Two lightweight pursuit vehicles with blue/red rooftop lights that track the player when wanted.
- Wanted level increases after high-speed traffic collisions; pursuit can cool down after the player creates distance.
- Vehicle condition meter, collision damage, and checkpoint recovery/repair.
- Timed street sprint with seven sequential gates, minimap route hints, cash payout, and nitro refill.
- T key and on-screen control for starting/cancelling a street sprint while driving.
- Minimap markers for race gates and police units.
- Duplicate relic counter markup removed and vehicle condition displayed in the driving HUD.

## Verification checklist (not marked passed until manually tested)
- [ ] Load freeze.html from a local web server and confirm no console errors.
- [ ] Enter the gold car with F; confirm speed, nitro and vehicle condition UI appear.
- [ ] Drive through traffic at speed and confirm wanted stars appear.
- [ ] Confirm police vehicles follow the player during an active pursuit.
- [ ] Escape far enough for the wanted level to cool down.
- [ ] Confirm vehicle condition decreases after collisions and R repairs at a checkpoint.
- [ ] Start the street sprint with T and pass all seven gold gates in order.
- [ ] Confirm successful sprint pays cash and refills nitro.
- [ ] Confirm minimap shows the current gate and police cars.
- [ ] Test HIGH, ULTRA, EXTREME and PERFORMANCE presets on the target PC.
- [ ] Test mouse look, pause/resume, all three protagonists, missions and relic saves.
- [ ] Test at desktop and mobile viewport sizes.

## Known limits
- This remains a procedural prototype: pedestrians are simple roaming figures, traffic is lightweight, and police behaviour is arcade-style rather than a full pathfinding simulation.
- Browser/GPU playtesting is still required before calling the experience production-ready.


## Detailed regression matrix

- [ ] Startup: verify the city finishes loading and the loading overlay fades away.
- [ ] Startup: verify the game starts with zero wanted stars and no visible police cars.
- [ ] Startup: verify the sprint gates remain hidden until a sprint is started.
- [ ] Startup: verify the default cash total and relic count render once each.
- [ ] Startup: verify the new HUD remains readable over bright sunset colors.
- [ ] Startup: verify the new HUD remains readable in Neon Night mode.
- [ ] Startup: verify the city can be entered after a browser refresh.
- [ ] Startup: verify the controls remain responsive after the pointer is released.
- [ ] Startup: verify the pause overlay prevents driving input from moving the car.
- [ ] Startup: verify resuming from pause restores normal movement.
- [ ] Driving: verify entering the car hides the avatar without hiding the vehicle.
- [ ] Driving: verify exiting the car places the avatar in a clear nearby spot.
- [ ] Driving: verify steering works in both forward and reverse directions.
- [ ] Driving: verify the handbrake reduces speed and allows a tight turn.
- [ ] Driving: verify nitro drains only while boosting forward.
- [ ] Driving: verify nitro recharges when boost is not active.
- [ ] Driving: verify the speed readout never displays a negative speed value.
- [ ] Driving: verify the gear readout switches between P, D and R sensibly.
- [ ] Driving: verify car condition decreases after a building collision.
- [ ] Driving: verify car condition is restored by checkpoint recovery.
- [ ] Wanted: verify a fast traffic impact raises the wanted meter by one step.
- [ ] Wanted: verify the meter never exceeds five stars.
- [ ] Wanted: verify a low-speed brush does not create a wanted level.
- [ ] Wanted: verify police cars appear only while a wanted level is active.
- [ ] Wanted: verify police vehicles steer toward the player instead of driving straight.
- [ ] Wanted: verify police pursuit follows the on-foot player after exiting the car.
- [ ] Wanted: verify distance from police allows the search to cool down.
- [ ] Wanted: verify a pull-over reduces wanted level and applies a cash fine.
- [ ] Wanted: verify cash cannot fall below zero after a fine.
- [ ] Wanted: verify losing the search hides police cars and clears the status label.
- [ ] Sprint: verify the on-screen sprint button starts a sprint only while driving.
- [ ] Sprint: verify pressing T starts the sprint from the driver's seat.
- [ ] Sprint: verify pressing T again cancels an active sprint.
- [ ] Sprint: verify only the first gate is visible at the start.
- [ ] Sprint: verify driving through gate one reveals gate two.
- [ ] Sprint: verify gates must be collected in route order.
- [ ] Sprint: verify each gate is hidden after it is passed.
- [ ] Sprint: verify the minimap marks the currently active gate.
- [ ] Sprint: verify the race timer increases smoothly while active.
- [ ] Sprint: verify the final gate completes the sprint.
- [ ] Sprint: verify a successful finish awards cash exactly once.
- [ ] Sprint: verify sprint completion refills nitro to 100 percent.
- [ ] Sprint: verify cancelling a sprint hides every visible gate.
- [ ] Sprint: verify sprint state is cleared when switching protagonists.
- [ ] Sprint: verify the route is reachable on the existing road grid.
- [ ] Sprint: verify a player who leaves the car cannot finish gates on foot.
- [ ] Sprint: verify the sprint status returns to the idle prompt after completion.
- [ ] Sprint: verify cash HUD refreshes immediately after the payout.
- [ ] Sprint: verify the minimap route marker stays inside the map canvas.
- [ ] Sprint: verify the sprint can be started again after a completed run.
- [ ] Map: verify police markers are red and distinguishable from the player marker.
- [ ] Map: verify race gates use gold markers distinct from relic markers.
- [ ] Map: verify the player marker follows the player continuously.
- [ ] Map: verify the mission marker remains visible during a sprint.
- [ ] Map: verify the map redraw remains smooth with police active.
- [ ] Map: verify all markers remain within the 150-by-150 canvas bounds.
- [ ] Map: verify buildings and road lines remain legible beneath the markers.
- [ ] Map: verify the map updates after checkpoint recovery.
- [ ] Map: verify the map updates after switching protagonists.
- [ ] Map: verify map drawing continues when wanted level returns to zero.
- [ ] UI: verify wanted stars fit without covering the minimap on desktop.
- [ ] UI: verify wanted stars fit on narrow mobile screens.
- [ ] UI: verify the race status does not overlap the objective card on desktop.
- [ ] UI: verify the race status remains readable on mobile.
- [ ] UI: verify vehicle condition is visible only with the driving HUD.
- [ ] UI: verify the vehicle condition bar changes width as damage occurs.
- [ ] UI: verify the new sprint button has a clear hover/focus state.
- [ ] UI: verify all new HUD text meets contrast expectations in both atmospheres.
- [ ] UI: verify the duplicate relic counter is no longer present in the header.
- [ ] UI: verify the top bar remains responsive after the wanted label is added.
- [ ] Performance: verify pursuit uses only two extra police meshes.
- [ ] Performance: verify no new animation loop is created per police car.
- [ ] Performance: verify sprint gates are hidden when the sprint is inactive.
- [ ] Performance: verify HIGH quality remains playable on an integrated GPU.
- [ ] Performance: verify EXTREME quality still follows the existing preset cap.
- [ ] Performance: verify renderer resizing still works after opening the sprint HUD.
- [ ] Performance: verify police pursuit does not cause obvious frame-rate spikes.
- [ ] Performance: verify minimap updates do not allocate a new canvas each frame.
- [ ] Performance: verify the game remains responsive after multiple sprint runs.
- [ ] Performance: verify switching graphics presets does not reset the gameplay state.
- [ ] Recovery: verify a stalled vehicle cannot accelerate until repaired.
- [ ] Recovery: verify R restores vehicle condition and zeroes residual speed.