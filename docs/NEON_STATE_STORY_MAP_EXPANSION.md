# Neon State — New Stories & District Maps

This content update expands the Kolkata campaign without replacing the existing three-protagonist story or resetting saves.

## New playable districts

- **Kumartuli & North Kolkata** — narrow lanes, artisan courtyards, old-town façades and a community workshop.
- **Salt Lake Sector V** — contemporary office blocks, glass-fronted towers, landscaped plazas and a late-shift courier route.
- **South Kolkata Lakes** — a quieter lakeside promenade, footbridges, gardens and a photography route.
- **New Town Eco Park** — open parkland, water edges, sculptural landmarks and a long scenic drive.

The original Howrah, BBD Bagh, College Street, Esplanade, Maidan, Victoria Memorial, Park Street and New Market districts remain available.

## New side stories

Three optional side-story arcs add nine short missions:
- **Lanterns of Kumartuli** — help an artisan family recover a missing festival commission.
- **After Hours, Sector V** — deliver a sealed archive and reconnect two former colleagues.
- **The Lake Keeps Time** — help a photographer return a lost camera and document the lakeside.

These are separate from the three existing protagonist campaigns. They do not overwrite the original mission decisions or rewards.

## Compatibility and design rules

- Keep the existing neon-state-kolkata-v1 local-save key.
- Read old saves with missing map/side-story fields as valid defaults.
- Never clear player progress when switching districts.
- Keep the existing vehicle, collision, interaction, camera and checkpoint systems.
- Build district dressing locally with Three.js; do not require map tiles or paid APIs.
- New mission rewards are paid once and saved.
- Map selection is a travel convenience, not a fast-travel requirement for story completion.

## Validation targets

- Each map has a valid spawn point inside the current playable bounds.
- Map selection is keyboard- and pointer-accessible.
- Switching districts closes transient panels and exits pointer lock.
- The active district label and minimap remain synchronized.
- The original three stories remain selectable and playable.
