# Neon State — Phase 13–14 Playtest Checklist

## Phase 13: city services

- [ ] Walk to Marina Motor Works at the waterfront and press E.
- [ ] Damage the player vehicle first; confirm repair restores its health to 100% and the service cost is reflected in cash.
- [ ] Visit Palm Fuel & Market with reduced nitro; confirm nitro refills to 100%.
- [ ] Visit Neon Customs in a sedan or SUV; confirm the sports coupe is selected and remains drivable.
- [ ] Visit Arts Corner Cafe; confirm the one-time interaction grants the documented cash reward (repeat interactions are currently repeatable).
- [ ] Confirm service interactions do not steal priority from relic collection or story markers.
- [ ] Confirm each service is reachable on foot and does not spawn inside a building.

## Phase 14: vehicle fleet

- [ ] Open the garage with G while on foot.
- [ ] Select Sport Coupe, City Sedan, and Coastal SUV in turn.
- [ ] Confirm body proportions, paint, roof profile, and wheel size differ.
- [ ] Drive each vehicle and compare acceleration, top speed, and steering.
- [ ] Confirm existing engine and handling upgrades still affect all three variants.
- [ ] Confirm vehicle selection survives reload in the same browser profile.
- [ ] Confirm selecting a vehicle while driving is blocked.
- [ ] Confirm F entry/exit, collision recovery, police contact, contracts, and street sprint still work.

## Regression and device coverage

- [ ] Complete at least one story interaction and collect a relic.
- [ ] Complete a city contract and verify its saved completion.
- [ ] Test at PERFORMANCE and HIGH graphics presets.
- [ ] Test window resize, fullscreen, WebGL context recovery, and tab visibility pause.
- [ ] Test touch controls on a real phone/tablet.
- [ ] Check browser console for errors and verify no service geometry blocks roads.

Automated smoke checks validate source wiring and UI hooks; they do not simulate a real browser, physics, or controller session.
