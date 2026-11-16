// Optional district stories. Kept separate from the original three protagonist campaigns.
export const SIDE_STORIES = Object.freeze([
  {
    id: 'lanterns', title: 'LANTERNS OF KUMARTULI', region: 'kumartuli', color: '#e7b46d',
    missions: [
      { title: 'THE EMPTY COURTYARD', text: 'Visit the artisan courtyard and ask Malini about the missing commission.', x: -158, z: -154, reward: 180, speaker: 'MALINI · ARTISAN', lines: ['The clay figures were ready, but the delivery never arrived.', 'I do not need a hero. I need someone who knows these lanes.'], choices: ['Check the workshop ledger', 'Ask the courier first'] },
      { title: 'A NOTE IN THE LANE', text: 'Meet the courier near the north-lane tea stall.', x: -174, z: -132, reward: 240, speaker: 'RITAM · COURIER', lines: ['I left the parcel with a neighbour when the rain started.', 'The address was smudged, but the red lantern was easy to spot.'], choices: ['Return to Malini', 'Search the courtyard'] },
      { title: 'LIGHTS FOR THE PARADE', text: 'Bring the recovered commission back to the workshop.', x: -142, z: -168, reward: 360, speaker: 'MALINI · ARTISAN', lines: ['You brought it back. The whole para can help finish the lanterns.', 'Tonight, the lane will be bright again.'], choices: ['Help hang the lanterns', 'Let the young artists lead'] }
      {"title":"THE CLAY THAT REMEMBERS","text":"Visit the small kiln yard and help Malini identify the finished pieces.","x":-139,"z":-150,"reward":190,"speaker":"MALINI · ARTISAN","lines":["Every mark on the clay tells us which hands shaped it.","The oldest pieces carry the names of the families who made them."],"choices":["Record each maker's name","Ask the apprentices to lead"]},
      {"title":"A ROOF ABOVE THE WORKSHOP","text":"Meet the carpenter beside the western courtyard.","x":-178,"z":-160,"reward":210,"speaker":"ARUP · CARPENTER","lines":["The rain found a gap above the drying shelves.","I can mend it, but the workshop should choose what to save first."],"choices":["Protect the unfinished work","Repair the oldest shelf"]},
      {"title":"THE LANTERN MAKERS","text":"Find the apprentice group near the lane entrance.","x":-165,"z":-180,"reward":220,"speaker":"MILI · APPRENTICE","lines":["We have enough paper, but not enough hands to finish the frames.","The younger students want to help if someone shows them how."],"choices":["Teach the first group","Invite the whole lane"]},
      {"title":"COLOURS FROM THE PARA","text":"Speak with the colour seller at the southern corner.","x":-140,"z":-176,"reward":230,"speaker":"JAVED · COLOUR SELLER","lines":["These pigments came from a shop that has served this lane for years.","I saved the last warm shades for the festival."],"choices":["Use the traditional palette","Let the children choose"]},
      {"title":"THE OLD PHOTOGRAPH","text":"Meet the retired photographer outside the courtyard.","x":-181,"z":-140,"reward":240,"speaker":"SOMA · PHOTOGRAPHER","lines":["This photograph shows the first lantern walk on this street.","Look closely: the same families are still here, making new memories."],"choices":["Display the photograph","Return it to the family album"]},
      {"title":"A MESSAGE IN TWO SCRIPTS","text":"Visit the sign painter and help prepare the festival notice.","x":-151,"z":-130,"reward":250,"speaker":"DEB · SIGN PAINTER","lines":["A notice should welcome everyone who passes this lane.","I can letter it in Bengali and English before evening."],"choices":["Put Bengali first","Give both scripts equal space"]},
      {"title":"THE COURTYARD REHEARSAL","text":"Find the music group beside the workshop steps.","x":-132,"z":-164,"reward":260,"speaker":"RUPA · MUSIC TEACHER","lines":["The parade needs a rhythm that the whole neighbourhood can follow.","The children have made a tune from the sounds of this street."],"choices":["Keep the children's tune","Blend it with the old procession song"]},
      {"title":"A PLACE FOR EVERYONE","text":"Meet the organisers at the northern lane junction.","x":-185,"z":-174,"reward":270,"speaker":"MALINI · ARTISAN","lines":["The narrow lane can become crowded when the parade begins.","Let's leave room for neighbours who need a quieter route."],"choices":["Make a clear side passage","Shorten the parade route"]},
      {"title":"THE FIRST LIGHT","text":"Return to the courtyard as the lanterns are tested.","x":-155,"z":-188,"reward":290,"speaker":"MILI · APPRENTICE","lines":["The first lantern is glowing. Everyone is waiting for the signal.","This is not one person's work anymore; the whole para made it."],"choices":["Let the apprentices light it","Invite the oldest maker"]},
      {"title":"A LANE FULL OF STORIES","text":"Meet Malini at the courtyard and help close the festival.","x":-145,"z":-140,"reward":420,"speaker":"MALINI · ARTISAN","lines":["The lanterns brought old neighbours and new friends together.","Keep this story alive by making space for the next generation."],"choices":["Start a yearly workshop","Create a shared neighbourhood archive"]},
    ]
  },
  {
    id: 'after-hours', title: 'AFTER HOURS, SECTOR V', region: 'sector-v', color: '#74d7dc',
    missions: [
      { title: 'THE SEALED ARCHIVE', text: 'Meet Ishan outside the Sector V office plaza.', x: 158, z: -154, reward: 200, speaker: 'ISHAN · ARCHIVIST', lines: ['This archive belongs to the people who built the first office here.', 'The night shift can get it to the right desk.'], choices: ['Take the direct route', 'Verify the recipient'] },
      { title: 'LAST LIFT DOWN', text: 'Find the night-shift supervisor by the transit entrance.', x: 174, z: -132, reward: 260, speaker: 'NANDITA · SUPERVISOR', lines: ['The lifts are closing, but the service lobby is still open.', 'Someone has been waiting for this record for years.'], choices: ['Leave a signed copy', 'Deliver the original'] },
      { title: 'THE OFFICE LIGHTS', text: 'Return to Ishan at the plaza and close the story.', x: 142, z: -168, reward: 380, speaker: 'ISHAN · ARCHIVIST', lines: ['The archive is safe. The people in it finally have their names back.', 'Some of the city lives in records. Some of it lives in people.'], choices: ['Share the story publicly', 'Keep the family details private'] }
      {"title":"THE NIGHT SHIFT ROSTER","text":"Meet the facilities coordinator at the plaza's east entrance.","x":139,"z":-150,"reward":210,"speaker":"KABERI · COORDINATOR","lines":["The archive team worked different hours, so their names were missed.","A careful roster can put every contribution back on record."],"choices":["Rebuild the full roster","Start with the night crew"]},
      {"title":"THE QUIET SERVER ROOM","text":"Find the technician beside the service corridor.","x":180,"z":-162,"reward":220,"speaker":"RITWIK · TECHNICIAN","lines":["The old records are safe, but the labels are inconsistent.","We should make a readable index before anyone moves the boxes."],"choices":["Create a paper index","Prepare a digital catalogue"]},
      {"title":"A DESK LEFT OPEN","text":"Visit the reception desk near the transit entrance.","x":165,"z":-180,"reward":230,"speaker":"NANDITA · SUPERVISOR","lines":["Someone left a note asking for a copy of the first project plan.","We can share the public record without exposing private details."],"choices":["Prepare a public extract","Ask the requester to verify their link"]},
      {"title":"THE ARCHIVE MAP","text":"Meet Ishan at the pedestrian plaza and mark the record's route.","x":137,"z":-177,"reward":240,"speaker":"ISHAN · ARCHIVIST","lines":["The archive passed through three departments before it reached us.","A simple map will help the next person find it without guesswork."],"choices":["Publish the route map","Keep a copy with the archive"]},
      {"title":"COFFEE BEFORE CLOSING","text":"Speak with the late-shift café owner on the south walk.","x":178,"z":-137,"reward":250,"speaker":"ANJALI · CAFÉ OWNER","lines":["The night crew kept this place going when the offices were quiet.","They deserve to see their names in the anniversary display."],"choices":["Add a staff appreciation wall","Record their oral histories"]},
    ]
  },
  {
    id: 'lake-time', title: 'THE LAKE KEEPS TIME', region: 'south-lakes', color: '#a9e2c2',
    missions: [
      { title: 'THE LOST CAMERA', text: 'Meet Tara at the South Kolkata lakeside path.', x: -158, z: 154, reward: 190, speaker: 'TARA · PHOTOGRAPHER', lines: ['I left my camera beside the old footbridge.', 'The memory card has photographs from the whole neighbourhood.'], choices: ['Ask the gardeners', 'Retrace the walking path'] },
      { title: 'FRAMES BY THE WATER', text: 'Speak with the gardener near the lake pavilion.', x: -174, z: 132, reward: 250, speaker: 'BIMAL · GARDENER', lines: ['I found it before the afternoon rain and kept it dry.', 'There is one photograph you should see before returning it.'], choices: ['Look through the photos', 'Return the camera unopened'] },
      { title: 'A CITY IN REFLECTION', text: 'Return the camera to Tara by the promenade.', x: -142, z: 168, reward: 370, speaker: 'TARA · PHOTOGRAPHER', lines: ['These photographs belong to the people in them.', 'I will print a set for the community hall. Thank you.'], choices: ['Organise a public display', 'Make a private album'] }
    ]
  }
]);

export function createSideStoryProgress() {
  return Object.fromEntries(SIDE_STORIES.map(story => [story.id, { step: 0, completed: false, choices: [] }]));
}

export function normalizeSideStoryProgress(saved) {
  const defaults = createSideStoryProgress();
  if (!saved || typeof saved !== 'object') return defaults;
  for (const story of SIDE_STORIES) {
    const value = saved[story.id];
    if (!value || typeof value !== 'object') continue;
    defaults[story.id] = {
      step: Math.max(0, Math.min(story.missions.length, Math.floor(Number(value.step) || 0))),
      completed: value.completed === true || Number(value.step) >= story.missions.length,
      choices: Array.isArray(value.choices) ? value.choices.slice(0, story.missions.length).map(choice => choice === 0 || choice === 1 ? choice : null) : []
    };
  }
  return defaults;
}

export function getCurrentSideMission(story, progress) {
  const state = progress?.[story?.id];
  return story && state && !state.completed ? story.missions[state.step] || null : null;
}
