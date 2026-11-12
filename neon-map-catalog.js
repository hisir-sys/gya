// New explorable districts layered into the existing Kolkata world.
export const MAP_REGIONS = Object.freeze([
  { id: 'kumartuli', name: 'KUMARTULI & NORTH KOLKATA', shortName: 'KUMARTULI', subtitle: 'Artisan lanes · North Kolkata', x: -158, z: -154, spawn: { x: -158, z: -154 }, radius: 38, palette: ['#a66d52', '#d5b78a', '#5c7771'], accent: '#e7b46d', description: 'Old courtyards, clay workshops and lantern-lit lanes.' },
  { id: 'sector-v', name: 'SALT LAKE SECTOR V', shortName: 'SECTOR V', subtitle: 'Glass towers · East Kolkata', x: 158, z: -154, spawn: { x: 158, z: -154 }, radius: 38, palette: ['#647e91', '#a9b8bb', '#344c5d'], accent: '#74d7dc', description: 'A modern business district after the evening rush.' },
  { id: 'south-lakes', name: 'SOUTH KOLKATA LAKES', shortName: 'SOUTH LAKES', subtitle: 'Promenade · South Kolkata', x: -158, z: 154, spawn: { x: -158, z: 154 }, radius: 38, palette: ['#718c72', '#c7b88e', '#527b80'], accent: '#a9e2c2', description: 'Quiet waterside paths, gardens and footbridges.' },
  { id: 'eco-park', name: 'NEW TOWN ECO PARK', shortName: 'ECO PARK', subtitle: 'Parkland · New Town', x: 158, z: 154, spawn: { x: 158, z: 154 }, radius: 38, palette: ['#71916f', '#b4c5a1', '#5c8b91'], accent: '#b8e8a5', description: 'Open lawns, sculpture gardens and a scenic lake edge.' }
]);

export const STORY_ARCS = Object.freeze([
  { id: 'lanterns', title: 'LANTERNS OF KUMARTULI', region: 'kumartuli', character: 'MALINI · ARTISAN', summary: 'A missing festival commission puts a family workshop under pressure.' },
  { id: 'after-hours', title: 'AFTER HOURS, SECTOR V', region: 'sector-v', character: 'ISHAN · ARCHIVIST', summary: 'A sealed archive must reach the right hands before the office lights go out.' },
  { id: 'lake-time', title: 'THE LAKE KEEPS TIME', region: 'south-lakes', character: 'TARA · PHOTOGRAPHER', summary: 'A lost camera carries a story that deserves to be returned.' }
]);

export function getMapRegion(id) {
  return MAP_REGIONS.find(region => region.id === id) || null;
}

export function getMapRegionAt(x, z) {
  return MAP_REGIONS.find(region => Math.hypot(x - region.x, z - region.z) <= region.radius) || null;
}
