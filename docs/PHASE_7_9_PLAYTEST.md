# Phases 7–9 playtest checklist

Run the 3D build locally with `python -m http.server 8000`, then open `http://localhost:8000/freeze.html`.

## Phase 7 — traffic

- [ ] Drive behind ambient traffic in the same direction and confirm it slows smoothly rather than clipping into the player car.
- [ ] Watch two ambient cars share a lane and confirm the following car eases off.
- [ ] Confirm traffic still turns around at blocked building edges and wraps at the city boundary.
- [ ] Confirm a high-speed player collision still damages the car and raises the wanted level.

## Phase 8 — city contracts

- [ ] Exit the car and press **Y**; confirm the first unfinished contract starts.
- [ ] Follow each visible checkpoint and confirm the route advances in order.
- [ ] Complete a route without a traffic collision and confirm the 20% clean-delivery bonus.
- [ ] Start another contract, collide with traffic, finish it, and confirm the base reward is paid without the clean bonus.
- [ ] Reload the page and confirm completed contracts remain completed.
- [ ] Confirm **T** cancels a route and the street sprint still works while driving.

## Phase 9 — dispatch response

- [ ] Trigger a wanted alert and confirm patrol cars appear around the player's current location.
- [ ] Increase the wanted level and confirm police pursuit speed increases.
- [ ] Allow a patrol car to make contact on foot and in the vehicle; confirm a citation is applied without a forced reset.
- [ ] Move away from patrol cars and confirm the search can cool down and clear.
- [ ] Confirm the minimap shows active patrol cars and the wanted HUD updates.

## Regression checks

- [ ] Switch between Jax, Nia, and Eli without losing story progress.
- [ ] Confirm dialogue choices, relic collection, garage upgrades, and local saves still work.
- [ ] Test keyboard and touch controls, desktop and mobile aspect ratios, and at least one integrated-GPU device.

This checklist is manual by design: CI syntax checks cannot verify traffic spacing, pursuit feel, route readability, or real GPU/touch behaviour.
