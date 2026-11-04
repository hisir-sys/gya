# Phases 7–9 playtest checklist

Run the 3D build locally with `python -m http.server 8000`, then open `http://localhost:8000/freeze.html`.

## Phase 7 — traffic
- [ ] Drive ahead of ambient traffic in the same lane and confirm it slows smoothly.
- [ ] Watch two ambient cars share a lane and confirm the following car eases off.
- [ ] Confirm traffic still turns around at blocked building edges and wraps at the city boundary.
- [ ] Confirm a high-speed player collision still damages the car and raises the wanted level.

## Phase 8 — city contracts
- [ ] Exit the car and press **Y**; confirm the next unfinished contract starts.
- [ ] Follow each checkpoint and confirm the route advances in order.
- [ ] Complete a route without a traffic collision and confirm the 20% clean-delivery bonus.
- [ ] Complete another route after a traffic collision and confirm the clean bonus is not paid.
- [ ] Reload the page and confirm completed contracts remain completed.
- [ ] Confirm **T** cancels an active route and street sprints still work while driving.

## Phase 9 — dispatch response
- [ ] Trigger a wanted alert and confirm patrol cars appear around the player's current location.
- [ ] Increase the wanted level and confirm response speed increases.
- [ ] Allow a patrol car to make contact on foot and in a vehicle; confirm a citation is applied without a forced reset.
- [ ] Move away from patrol cars and confirm the search can cool down and clear.
- [ ] Confirm the minimap and wanted HUD update during the response.

## Regression checks
- [ ] Switch between Jax, Nia, and Eli without losing story progress.
- [ ] Confirm dialogue choices, relic collection, garage upgrades, and local saves still work.
- [ ] Test keyboard and touch controls, desktop and mobile aspect ratios, and an integrated-GPU device.

CI syntax checks cannot verify traffic spacing, pursuit feel, route readability, or real GPU/touch behaviour; those still need hands-on playtesting.
