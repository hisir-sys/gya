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