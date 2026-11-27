# Kolkata offline atlas data

The district selector now includes a lightweight, offline geographic locator. It uses static WGS84 latitude/longitude place coordinates and a local canvas renderer; it does not fetch map tiles, call a map API, or require a network connection at runtime.

## Coordinate references

| Place | Latitude | Longitude | Reference |
|---|---:|---:|---|
| Howrah Bridge | 22.58509 | 88.34680 | [Mapcarta / OSM feature](https://mapcarta.com/W325369042) |
| Victoria Memorial | 22.54489 | 88.34257 | [Mapcarta / OSM feature](https://mapcarta.com/W36165294) |
| Esplanade | 22.56329 | 88.35036 | [Mapcarta / OSM feature](https://mapcarta.com/Kolkata/Esplanade) |
| College Street campus | 22.57495 | 88.36263 | [University of Calcutta / OSM feature](https://mapcarta.com/W440244177) |
| Eden Gardens | 22.56434 | 88.34076 | [Mapcarta / OSM feature](https://mapcarta.com/W52097785) |
| Park Street Metro | 22.55516 | 88.35012 | [Mapcarta / OSM feature](https://mapcarta.com/N5421528503) |
| Prinsep Ghat | 22.55000 | 88.33333 | [Mapcarta / GeoNames feature](https://mapcarta.com/14864310) |
| Salt Lake Sector V | 22.57545 | 88.43226 | [Mapcarta / OSM feature](https://mapcarta.com/N10792425145) |
| Tagore's House | 22.58487 | 88.35824 | [Mapcarta / OSM feature](https://mapcarta.com/N4974850621) |
| Geological Survey of India | 22.55559 | 88.35072 | [Mapcarta / OSM feature](https://mapcarta.com/N2934412981) |
| College Square | 22.57468 | 88.36377 | [Open data map reference](https://www.mycoolkata.com/map) |

## Accuracy and scope

- Coordinates are point locators, not surveyed building footprints.
- The Hooghly and Maidan shapes in the canvas are deliberately schematic context shapes, not authoritative shorelines or park boundaries.
- The atlas is a geographic overview, not turn-by-turn routing or a replacement for current navigation data.
- OpenStreetMap-derived coordinate data is attributed to its referenced pages. A future street-network import must preserve OpenStreetMap attribution and ODbL obligations.
- The existing playable 3D world remains a procedural approximation. This atlas does not claim that the current road/building geometry is a one-to-one reconstruction of Kolkata.
