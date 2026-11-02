# Gameplay Upgrade Playtest

Run the 3D build from a local HTTP server:

`python -m http.server 8000` → `http://localhost:8000/freeze.html`

## Core movement
- [ ] Move with WASD and arrow keys; diagonal movement should not be faster than straight movement.
- [ ] Hold Shift while moving; stamina should drain and stop sprinting at zero.
- [ ] Release Shift or stop moving; stamina should recover smoothly to 100%.
- [ ] Switch between Jax, Nia, and Eli; each character should retain their own chapter progress.
- [ ] Confirm the compass arrow points toward the active mission and distance decreases while approaching.
- [ ] Confirm the minimap player marker rotates with the character's heading.

## Story and save
- [ ] Walk to the active gold marker and press E.
- [ ] Advance dialogue and choose either response.
- [ ] Confirm the selected choice, cash reward, chapter progress, and next marker update.
- [ ] Reload the page; progress, choices, cash, and relic collection should remain.
- [ ] Hide the browser tab; the game should pause. Return and resume.
- [ ] Close/reopen the page; confirm the last state was saved.

## Vehicle and race
- [ ] Approach the gold sports car and press F to enter.
- [ ] Drive, reverse, steer, brake, and use Shift for nitro.
- [ ] Hit a building at speed; vehicle condition should decrease based on impact speed.
- [ ] Try to enter a disabled car; entry should be blocked until checkpoint recovery.
- [ ] Press R at the active checkpoint; vehicle condition and police search should reset.
- [ ] Exit with F; story interactions should require being on foot.
- [ ] Start a street sprint with T and pass each gold gate in order.
- [ ] Cancel a sprint by pressing T again or exiting the car.

## Collectibles and pursuit
- [ ] Approach a neon relic and press E; it should disappear and award cash.
- [ ] Reload; collected relics should remain collected.
- [ ] Cause a wanted level and verify police vehicles become active.
- [ ] Move away from the search area and verify the wanted level eventually clears.

## Display and input
- [ ] Test PERFORMANCE, HIGH, ULTRA, and EXTREME presets.
- [ ] Test Golden Hour and Neon Night.
- [ ] Test fullscreen enter/exit and camera reset/zoom.
- [ ] Test touch controls on a real touch device, including pointer cancellation.
- [ ] Check that HUD elements do not cover story dialogue or the mobile control pad.

## Test notes
Record browser/version, operating system, GPU, screen size, graphics preset, average FPS, and any console errors. This checklist is manual; checked boxes should only be marked after testing on the target device.
