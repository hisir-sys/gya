// Offline, WGS84-referenced Kolkata atlas. No map tiles, API calls, or runtime downloads.
// Coordinates are static OpenStreetMap-derived place coordinates; the canvas is a locator map,
// not a street-level navigation replacement.
export const KOLKATA_ATLAS_BOUNDS = Object.freeze({
  south: 22.535,
  north: 22.595,
  west: 88.325,
  east: 88.445
});

export const KOLKATA_ATLAS_PLACES = Object.freeze([
  { id: 'howrah-bridge', name: 'Howrah Bridge', category: 'heritage', lat: 22.58509, lon: 88.3468 },
  { id: 'tagore-house', name: "Tagore's House", category: 'heritage', lat: 22.58487, lon: 88.35824 },
  { id: 'college-street', name: 'College Street', category: 'neighbourhood', lat: 22.57495, lon: 88.36263 },
  { id: 'eden-gardens', name: 'Eden Gardens', category: 'park', lat: 22.56434, lon: 88.34076 },
  { id: 'esplanade', name: 'Esplanade', category: 'transit', lat: 22.56329, lon: 88.35036 },
  { id: 'park-street', name: 'Park Street Metro', category: 'transit', lat: 22.55516, lon: 88.35012 },
  { id: 'victoria-memorial', name: 'Victoria Memorial', category: 'heritage', lat: 22.54489, lon: 88.34257 },
  { id: 'prinsep-ghat', name: 'Prinsep Ghat', category: 'river', lat: 22.55, lon: 88.33333 },
  { id: 'sector-v', name: 'Salt Lake Sector V', category: 'neighbourhood', lat: 22.57545, lon: 88.43226 },
  { id: 'gsi', name: 'Geological Survey of India', category: 'civic', lat: 22.55559, lon: 88.35072 },
  { id: 'college-square', name: 'College Square', category: 'park', lat: 22.57468, lon: 88.36377 }
]);

const PALETTE = Object.freeze({
  heritage: '#c98e5c',
  neighbourhood: '#e8bd70',
  park: '#79a987',
  transit: '#75c8d0',
  river: '#64aeb7',
  civic: '#b8a6dc'
});

export function projectKolkataPoint(lat, lon, bounds = KOLKATA_ATLAS_BOUNDS, width = 600, height = 360, padding = 28) {
  if (![lat, lon, bounds.south, bounds.north, bounds.west, bounds.east, width, height, padding].every(Number.isFinite)) return null;
  if (bounds.north <= bounds.south || bounds.east <= bounds.west || width <= padding * 2 || height <= padding * 2) return null;
  const x = padding + ((lon - bounds.west) / (bounds.east - bounds.west)) * (width - padding * 2);
  const y = height - padding - ((lat - bounds.south) / (bounds.north - bounds.south)) * (height - padding * 2);
  return { x, y };
}

export function renderKolkataAtlas(canvas) {
  if (!canvas?.getContext) return false;
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;
  const width = canvas.width || 600, height = canvas.height || 360;
  const project = (lat, lon) => projectKolkataPoint(lat, lon, KOLKATA_ATLAS_BOUNDS, width, height);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#101a23';
  ctx.fillRect(0, 0, width, height);

  // Subtle geographic graticule.
  ctx.strokeStyle = 'rgba(176,199,207,.12)';
  ctx.lineWidth = 1;
  for (let lon = 88.33; lon <= 88.44; lon += .01) {
    const a = project(KOLKATA_ATLAS_BOUNDS.south, lon), b = project(KOLKATA_ATLAS_BOUNDS.north, lon);
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
  }
  for (let lat = 22.54; lat <= 22.59; lat += .01) {
    const a = project(lat, KOLKATA_ATLAS_BOUNDS.west), b = project(lat, KOLKATA_ATLAS_BOUNDS.east);
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
  }

  // The Hooghly is drawn as a broad geographic corridor, not a surveyed shoreline.
  const river = [[22.595,88.326],[22.582,88.329],[22.57,88.33],[22.558,88.331],[22.545,88.333],[22.535,88.334]];
  ctx.beginPath();
  river.forEach(([lat, lon], i) => { const p = project(lat, lon); if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
  ctx.strokeStyle = '#326c79'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.stroke();
  ctx.beginPath();
  river.forEach(([lat, lon], i) => { const p = project(lat, lon); if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
  ctx.strokeStyle = 'rgba(125,195,200,.28)'; ctx.lineWidth = 2; ctx.stroke();

  // Maidan / Victoria green belt shown as a soft locator area, not a property boundary.
  const green = [[22.563,88.337],[22.563,88.347],[22.543,88.349],[22.541,88.339],[22.55,88.336]];
  ctx.beginPath();
  green.forEach(([lat, lon], i) => { const p = project(lat, lon); if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
  ctx.closePath(); ctx.fillStyle = 'rgba(91,139,104,.22)'; ctx.fill();

  for (const place of KOLKATA_ATLAS_PLACES) {
    const p = project(place.lat, place.lon);
    if (!p || p.x < 0 || p.x > width || p.y < 0 || p.y > height) continue;
    ctx.beginPath(); ctx.arc(p.x, p.y, place.category === 'heritage' ? 5.5 : 4.2, 0, Math.PI * 2);
    ctx.fillStyle = PALETTE[place.category] || '#e8bd70'; ctx.fill();
    ctx.strokeStyle = '#0b1219'; ctx.lineWidth = 2; ctx.stroke();
    ctx.font = '11px system-ui, sans-serif'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#edf3f3'; ctx.shadowColor = '#0b1219'; ctx.shadowBlur = 3;
    ctx.fillText(place.name, p.x + 8, p.y - 7);
    ctx.shadowBlur = 0;
  }

  ctx.fillStyle = 'rgba(224,235,235,.72)';
  ctx.font = '10px system-ui, sans-serif';
  ctx.fillText('N ↑', width - 36, 18);
  ctx.fillText('KOLKATA · WGS84 LOCATORS', 14, height - 10);
  return true;
}
