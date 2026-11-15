import { install as installTramOverheadLines } from './neon-city-props/tram-overhead-lines.js';
import { install as installTramStopShelter } from './neon-city-props/tram-stop-shelter.js';
import { install as installBusShelter } from './neon-city-props/bus-shelter.js';
import { install as installTeaStall } from './neon-city-props/tea-stall.js';
import { install as installBookCart } from './neon-city-props/book-cart.js';
import { install as installFlowerStall } from './neon-city-props/flower-stall.js';
import { install as installMarketAwning } from './neon-city-props/market-awning.js';
import { install as installMarketCrates } from './neon-city-props/market-crates.js';
import { install as installStreetBenches } from './neon-city-props/street-benches.js';
import { install as installStreetBins } from './neon-city-props/street-bins.js';
import { install as installPlanterBoxes } from './neon-city-props/planter-boxes.js';
import { install as installBollards } from './neon-city-props/bollards.js';
import { install as installManholeCovers } from './neon-city-props/manhole-covers.js';
import { install as installCrosswalkMarkings } from './neon-city-props/crosswalk-markings.js';
import { install as installTrafficSignals } from './neon-city-props/traffic-signals.js';
import { install as installStreetNameSigns } from './neon-city-props/street-name-signs.js';
import { install as installUtilityPoles } from './neon-city-props/utility-poles.js';
import { install as installOverheadCables } from './neon-city-props/overhead-cables.js';
import { install as installRooftopWaterTanks } from './neon-city-props/rooftop-water-tanks.js';
import { install as installSatelliteDishes } from './neon-city-props/satellite-dishes.js';
import { install as installSolarPanels } from './neon-city-props/solar-panels.js';
import { install as installBalconyLaundry } from './neon-city-props/balcony-laundry.js';
import { install as installBalconyPlanters } from './neon-city-props/balcony-planters.js';
import { install as installWindowAcUnits } from './neon-city-props/window-ac-units.js';
import { install as installPublicNoticeboards } from './neon-city-props/public-noticeboards.js';
import { install as installCycleStands } from './neon-city-props/cycle-stands.js';
import { install as installTaxiStand } from './neon-city-props/taxi-stand.js';
import { install as installAutoStand } from './neon-city-props/auto-stand.js';
import { install as installFerryJetty } from './neon-city-props/ferry-jetty.js';
import { install as installRiverboats } from './neon-city-props/riverboats.js';
import { install as installGhatSteps } from './neon-city-props/ghat-steps.js';
import { install as installRiverRailings } from './neon-city-props/river-railings.js';
import { install as installParkPergola } from './neon-city-props/park-pergola.js';
import { install as installParkFountain } from './neon-city-props/park-fountain.js';
import { install as installSculpturePlinth } from './neon-city-props/sculpture-plinth.js';
import { install as installStreetKiosks } from './neon-city-props/street-kiosks.js';
import { install as installPavementDrains } from './neon-city-props/pavement-drains.js';
import { install as installPedestrianCrossingSignals } from './neon-city-props/pedestrian-crossing-signals.js';

const CITY_PROP_INSTALLERS = [
 installTramOverheadLines,
 installTramStopShelter,
 installBusShelter,
 installTeaStall,
 installBookCart,
 installFlowerStall,
 installMarketAwning,
 installMarketCrates,
 installStreetBenches,
 installStreetBins,
 installPlanterBoxes,
 installBollards,
 installManholeCovers,
 installCrosswalkMarkings,
 installTrafficSignals,
 installStreetNameSigns,
 installUtilityPoles,
 installOverheadCables,
 installRooftopWaterTanks,
 installSatelliteDishes,
 installSolarPanels,
 installBalconyLaundry,
 installBalconyPlanters,
 installWindowAcUnits,
 installPublicNoticeboards,
 installCycleStands,
 installTaxiStand,
 installAutoStand,
 installFerryJetty,
 installRiverboats,
 installGhatSteps,
 installRiverRailings,
 installParkPergola,
 installParkFountain,
 installSculpturePlinth,
 installStreetKiosks,
 installPavementDrains,
 installPedestrianCrossingSignals
];

export function installKolkataCityDetails(THREE, city) {
 if (!THREE || !city) return { installed: 0, failed: 0 };
 let installed = 0;
 const failures = [];
 for (const install of CITY_PROP_INSTALLERS) {
  try {
   const group = install(THREE, city);
   if (group) installed += 1;
  } catch (error) {
   failures.push({ name: install.name || 'city detail', message: String(error?.message || error) });
   console.warn('Optional Kolkata city detail skipped:', error);
  }
 }
 return { installed, failed: failures.length, failures };
}
