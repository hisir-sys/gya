# Neon State — 3D Playtest Checklist

Use this checklist with `python -m http.server 8000` and open `http://localhost:8000/freeze.html` in a modern desktop browser. This is a manual QA plan; items are **not marked passed** until someone tests them in a browser.

## Core startup
- [ ] **01 — Startup:** the page loads and the city appears without a JavaScript console error.

## World and controls
- [ ] **02 — WebGL support:** Confirm the browser supports WebGL and the renderer canvas is visible.
- [ ] **03 — Loading overlay:** Confirm the loading overlay disappears after the city finishes initializing.
- [ ] **04 — Initial HUD:** Check the protagonist name, role, mission title, cash, and relic counter are readable.
- [ ] **05 — Keyboard movement:** Use W, A, S, and D to move; confirm movement responds in each direction.
