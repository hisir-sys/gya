# Neon State — 3D Playtest Checklist

Use this checklist with `python -m http.server 8000` and open `http://localhost:8000/freeze.html` in a modern desktop browser. This is a manual QA plan; items are **not marked passed** until someone tests them in a browser.

## Core startup
- [ ] **01 — Startup:** the page loads and the city appears without a JavaScript console error.

## World and controls
- [ ] **02 — WebGL support:** Confirm the browser supports WebGL and the renderer canvas is visible.
- [ ] **03 — Loading overlay:** Confirm the loading overlay disappears after the city finishes initializing.
- [ ] **04 — Initial HUD:** Check the protagonist name, role, mission title, cash, and relic counter are readable.
- [ ] **05 — Keyboard movement:** Use W, A, S, and D to move; confirm movement responds in each direction.
- [ ] **06 — Arrow-key movement:** Repeat movement with the arrow keys and confirm no key remains stuck.
- [ ] **07 — Sprint:** Hold Shift while walking and confirm sprinting works without driving.
- [ ] **08 — Camera mouse look:** Click the game viewport and move the mouse to verify camera look.
- [ ] **09 — Cursor release:** Press Escape and confirm the pointer is released and the game pauses as expected.
- [ ] **10 — Resume:** Resume after pausing and confirm movement and camera controls work again.
- [ ] **11 — Protagonist switching:** Use keys 1, 2, and 3 and confirm each protagonist's name and mission update.

## Stories and missions
- [ ] **12 — Mission marker:** Find the glowing mission marker and confirm it follows the selected protagonist's current mission.
- [ ] **13 — Mission proximity:** Press E far from a mission and confirm the game gives a helpful proximity hint.
- [ ] **14 — Dialogue progression:** Approach a mission and advance each dialogue line with the interaction control.
- [ ] **15 — Dialogue choices:** Reach a mission choice and verify both options can be selected.
- [ ] **16 — Mission reward:** Finish a mission and confirm the cash reward updates once, not repeatedly.
- [ ] **17 — Mission progression:** Complete a story beat and confirm the next objective appears.
- [ ] **18 — Story completion:** Complete all beats for one protagonist and confirm the completion message is clear.

## Collectibles
- [ ] **19 — Relic proximity:** Approach a neon relic and confirm the interaction hint appears only when close enough.
- [ ] **20 — Relic collection:** Collect one relic and confirm it disappears and the counter increments once.
- [ ] **21 — Relic reward:** Collect a relic and confirm the cash reward is reflected in the HUD.
- [ ] **22 — Relic persistence:** Reload after collecting a relic and confirm it remains collected if save persistence is working.
- [ ] **23 — Relic completion bonus:** Collect all twelve relics and verify the completion bonus is awarded only once.
- [ ] **24 — Vehicle entry:** Enter the drivable car using the documented interaction and confirm the vehicle HUD appears.
- [ ] **25 — Vehicle steering:** Steer left and right while driving and confirm the car turns smoothly.
- [ ] **26 — Vehicle braking:** Use the handbrake/brake control and confirm the car slows without reversing unexpectedly.
- [ ] **27 — Nitro activation:** While driving forward, hold Shift with throttle and confirm nitro fuel drains and speed increases.
- [ ] **28 — Nitro recharge:** Stop boosting and confirm the nitro meter recharges over time.
- [ ] **29 — Nitro restrictions:** Test nitro while reversing and while using the handbrake; confirm it does not boost in restricted states.
- [ ] **30 — Vehicle exit:** Exit the vehicle and confirm on-foot controls return and the vehicle HUD hides.

## Presentation and persistence
- [ ] **31 — Graphics preset:** Switch graphics quality and confirm the selected preset label updates.
- [ ] **32 — Atmosphere toggle:** Switch between Golden Hour and Neon Night and confirm lighting, sky, and fog update.
- [ ] **33 — Minimap:** Move around the city and confirm the minimap player marker updates with position.
- [ ] **34 — Location label:** Move through different city zones and confirm the location tag updates where zones are defined.
- [ ] **35 — Save status:** Complete a mission or collect a relic and check that the save-status label reports the result.
