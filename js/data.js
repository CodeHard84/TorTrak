// The valid states will protect us from loading values from outside the 50 states.
// We will also use this to make a drop down list of filterable states for our charts
// and maps.
// const validStates = [
//   'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
//   'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
//   'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
//   'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
//   'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
// ];

// Also want the landmass sizes in sq miles.
// This can be consolidated with the validStates.
const statesData = {
  AL: { landmass: 50744, fullName: 'Alabama', population: 5108468, wikiLink: 'https://en.wikipedia.org/wiki/Alabama' },
  AK: { landmass: 571951, fullName: 'Alaska', population: 740339, wikiLink: 'https://en.wikipedia.org/wiki/Alaska' },
  AZ: { landmass: 113594, fullName: 'Arizona', population: 7431344, wikiLink: 'https://en.wikipedia.org/wiki/Arizona' },
  AR: { landmass: 52035, fullName: 'Arkansas', population: 3020247, wikiLink: 'https://en.wikipedia.org/wiki/Arkansas' },
  CA: { landmass: 155779, fullName: 'California', population: 39651943, wikiLink: 'https://en.wikipedia.org/wiki/California' },
  CO: { landmass: 103642, fullName: 'Colorado', population: 5897610, wikiLink: 'https://en.wikipedia.org/wiki/Colorado' },
  CT: { landmass: 4842, fullName: 'Connecticut', population: 3605944, wikiLink: 'https://en.wikipedia.org/wiki/Connecticut' },
  DE: { landmass: 1949, fullName: 'Delaware', population: 1017551, wikiLink: 'https://en.wikipedia.org/wiki/Delaware' },
  FL: { landmass: 53927, fullName: 'Florida', population: 21944577, wikiLink: 'https://en.wikipedia.org/wiki/Florida' },
  GA: { landmass: 57906, fullName: 'Georgia', population: 11029227, wikiLink: 'https://en.wikipedia.org/wiki/Georgia_(U.S._state)' },
  HI: { landmass: 6423, fullName: 'Hawaii', population: 1483762, wikiLink: 'https://en.wikipedia.org/wiki/Hawaii' },
  ID: { landmass: 82747, fullName: 'Idaho', population: 1920562, wikiLink: 'https://en.wikipedia.org/wiki/Idaho' },
  IL: { landmass: 55519, fullName: 'Illinois', population: 12549689, wikiLink: 'https://en.wikipedia.org/wiki/Illinois' },
  IN: { landmass: 35826, fullName: 'Indiana', population: 6876047, wikiLink: 'https://en.wikipedia.org/wiki/Indiana' },
  IA: { landmass: 55857, fullName: 'Iowa', population: 3190369, wikiLink: 'https://en.wikipedia.org/wiki/Iowa' },
  KS: { landmass: 81815, fullName: 'Kansas', population: 2917224, wikiLink: 'https://en.wikipedia.org/wiki/Kansas' },
  KY: { landmass: 39732, fullName: 'Kentucky', population: 4480713, wikiLink: 'https://en.wikipedia.org/wiki/Kentucky' },
  LA: { landmass: 43562, fullName: 'Louisiana', population: 4695071, wikiLink: 'https://en.wikipedia.org/wiki/Louisiana' },
  ME: { landmass: 30843, fullName: 'Maine', population: 1372559, wikiLink: 'https://en.wikipedia.org/wiki/Maine' },
  MD: { landmass: 9707, fullName: 'Maryland', population: 6180253, wikiLink: 'https://en.wikipedia.org/wiki/Maryland' },
  MA: { landmass: 7800, fullName: 'Massachusetts', population: 7174604, wikiLink: 'https://en.wikipedia.org/wiki/Massachusetts' },
  MI: { landmass: 56539, fullName: 'Michigan', population: 10037261, wikiLink: 'https://en.wikipedia.org/wiki/Michigan' },
  MN: { landmass: 79627, fullName: 'Minnesota', population: 5827265, wikiLink: 'https://en.wikipedia.org/wiki/Minnesota' },
  MS: { landmass: 46923, fullName: 'Mississippi', population: 2961279, wikiLink: 'https://en.wikipedia.org/wiki/Mississippi' },
  MO: { landmass: 68742, fullName: 'Missouri', population: 6204710, wikiLink: 'https://en.wikipedia.org/wiki/Missouri' },
  MT: { landmass: 145546, fullName: 'Montana', population: 1112668, wikiLink: 'https://en.wikipedia.org/wiki/Montana' },
  NE: { landmass: 76824, fullName: 'Nebraska', population: 2002052, wikiLink: 'https://en.wikipedia.org/wiki/Nebraska' },
  NV: { landmass: 109781, fullName: 'Nevada', population: 3238601, wikiLink: 'https://en.wikipedia.org/wiki/Nevada' },
  NH: { landmass: 8968, fullName: 'New Hampshire', population: 1395847, wikiLink: 'https://en.wikipedia.org/wiki/New_Hampshire' },
  NJ: { landmass: 7417, fullName: 'New Jersey', population: 9438124, wikiLink: 'https://en.wikipedia.org/wiki/New_Jersey' },
  NM: { landmass: 121298, fullName: 'New Mexico', population: 2135024, wikiLink: 'https://en.wikipedia.org/wiki/New_Mexico' },
  NY: { landmass: 47214, fullName: 'New York', population: 19571216, wikiLink: 'https://en.wikipedia.org/wiki/New_York_(state)' },
  NC: { landmass: 48618, fullName: 'North Carolina', population: 10835491, wikiLink: 'https://en.wikipedia.org/wiki/North_Carolina' },
  ND: { landmass: 69001, fullName: 'North Dakota', population: 811044, wikiLink: 'https://en.wikipedia.org/wiki/North_Dakota' },
  OH: { landmass: 40948, fullName: 'Ohio', population: 11785935, wikiLink: 'https://en.wikipedia.org/wiki/Ohio' },
  OK: { landmass: 68667, fullName: 'Oklahoma', population: 4007179, wikiLink: 'https://en.wikipedia.org/wiki/Oklahoma' },
  OR: { landmass: 95988, fullName: 'Oregon', population: 4325290, wikiLink: 'https://en.wikipedia.org/wiki/Oregon' },
  PA: { landmass: 44817, fullName: 'Pennsylvania', population: 13092796, wikiLink: 'https://en.wikipedia.org/wiki/Pennsylvania' },
  RI: { landmass: 1034, fullName: 'Rhode Island', population: 1110822, wikiLink: 'https://en.wikipedia.org/wiki/Rhode_Island' },
  SC: { landmass: 30109, fullName: 'South Carolina', population: 5276343, wikiLink: 'https://en.wikipedia.org/wiki/South_Carolina' },
  SD: { landmass: 75811, fullName: 'South Dakota', population: 908414, wikiLink: 'https://en.wikipedia.org/wiki/South_Dakota' },
  TN: { landmass: 41235, fullName: 'Tennessee', population: 7080262, wikiLink: 'https://en.wikipedia.org/wiki/Tennessee' },
  TX: { landmass: 261232, fullName: 'Texas', population: 29730311, wikiLink: 'https://en.wikipedia.org/wiki/Texas' },
  UT: { landmass: 82170, fullName: 'Utah', population: 3310774, wikiLink: 'https://en.wikipedia.org/wiki/Utah' },
  VT: { landmass: 9217, fullName: 'Vermont', population: 647156, wikiLink: 'https://en.wikipedia.org/wiki/Vermont' },
  VA: { landmass: 39490, fullName: 'Virginia', population: 8820504, wikiLink: 'https://en.wikipedia.org/wiki/Virginia' },
  WA: { landmass: 66456, fullName: 'Washington', population: 7799803, wikiLink: 'https://en.wikipedia.org/wiki/Washington_(state)' },
  WV: { landmass: 24038, fullName: 'West Virginia', population: 1775932, wikiLink: 'https://en.wikipedia.org/wiki/West_Virginia' },
  WI: { landmass: 54158, fullName: 'Wisconsin', population: 5955737, wikiLink: 'https://en.wikipedia.org/wiki/Wisconsin' },
  WY: { landmass: 97093, fullName: 'Wyoming', population: 583279, wikiLink: 'https://en.wikipedia.org/wiki/Wyoming' }
};

// While doing my research on Wikipedia for the above object I found that all the flags had a similar naming covention...
// This function is going to use that! Wikipedia however doesn't allow embedding so I found flagpedia.net which actually has
// an API. =)
// Function specific to this object

// Available flag sizes w20, w40, w80, w160, w320, w640, w1280, w2560
function buildFlagUrl (stateAbbr, size = 'w320') {
  const lowerAbbr = stateAbbr.toLowerCase(); // Flagpedia requires lowercase abbreviation.
  const flagUrl = `https://flagcdn.com/${size}/us-${lowerAbbr}.png`;
  return flagUrl;
}

// Added an object with all the state capitals and their coordinates. I am going to use this in several places
// well worth the research.

const stateCapitals = {
  AL: { city: 'Montgomery', lat: 32.361538, lon: -86.279118 },
  AK: { city: 'Juneau', lat: 58.301935, lon: -134.419740 },
  AZ: { city: 'Phoenix', lat: 33.448457, lon: -112.073844 },
  AR: { city: 'Little Rock', lat: 34.736009, lon: -92.331122 },
  CA: { city: 'Sacramento', lat: 38.555605, lon: -121.468926 },
  CO: { city: 'Denver', lat: 39.739227, lon: -104.984856 },
  CT: { city: 'Hartford', lat: 41.767000, lon: -72.677000 },
  DE: { city: 'Dover', lat: 39.161921, lon: -75.526755 },
  FL: { city: 'Tallahassee', lat: 30.438118, lon: -84.281296 },
  GA: { city: 'Atlanta', lat: 33.749027, lon: -84.388229 },
  HI: { city: 'Honolulu', lat: 21.307442, lon: -157.857376 },
  ID: { city: 'Boise', lat: 43.617775, lon: -116.199722 },
  IL: { city: 'Springfield', lat: 39.798363, lon: -89.654961 },
  IN: { city: 'Indianapolis', lat: 39.768402, lon: -86.158066 },
  IA: { city: 'Des Moines', lat: 41.591087, lon: -93.603729 },
  KS: { city: 'Topeka', lat: 39.049515, lon: -95.671736 },
  KY: { city: 'Frankfort', lat: 38.186722, lon: -84.875374 },
  LA: { city: 'Baton Rouge', lat: 30.458283, lon: -91.140320 },
  ME: { city: 'Augusta', lat: 44.307167, lon: -69.781693 },
  MD: { city: 'Annapolis', lat: 38.978764, lon: -76.490936 },
  MA: { city: 'Boston', lat: 42.358162, lon: -71.063698 },
  MI: { city: 'Lansing', lat: 42.733635, lon: -84.555328 },
  MN: { city: 'St. Paul', lat: 44.955097, lon: -93.102211 },
  MS: { city: 'Jackson', lat: 32.303848, lon: -90.182106 },
  MO: { city: 'Jefferson City', lat: 38.572954, lon: -92.189283 },
  MT: { city: 'Helena', lat: 46.595805, lon: -112.027031 },
  NE: { city: 'Lincoln', lat: 40.813620, lon: -96.702595 },
  NV: { city: 'Carson City', lat: 39.163914, lon: -119.766121 },
  NH: { city: 'Concord', lat: 43.220093, lon: -71.549127 },
  NJ: { city: 'Trenton', lat: 40.220596, lon: -74.769913 },
  NM: { city: 'Santa Fe', lat: 35.682240, lon: -105.939728 },
  NY: { city: 'Albany', lat: 42.652580, lon: -73.756233 },
  NC: { city: 'Raleigh', lat: 35.780400, lon: -78.639100 },
  ND: { city: 'Bismarck', lat: 46.820850, lon: -100.783318 },
  OH: { city: 'Columbus', lat: 39.961346, lon: -82.999069 },
  OK: { city: 'Oklahoma City', lat: 35.467560, lon: -97.516428 },
  OR: { city: 'Salem', lat: 44.938461, lon: -123.030403 },
  PA: { city: 'Harrisburg', lat: 40.264378, lon: -76.883598 },
  RI: { city: 'Providence', lat: 41.823989, lon: -71.412834 },
  SC: { city: 'Columbia', lat: 34.000710, lon: -81.034814 },
  SD: { city: 'Pierre', lat: 44.367031, lon: -100.346405 },
  TN: { city: 'Nashville', lat: 36.165890, lon: -86.784443 },
  TX: { city: 'Austin', lat: 30.274670, lon: -97.740350 },
  UT: { city: 'Salt Lake City', lat: 40.777477, lon: -111.888237 },
  VT: { city: 'Montpelier', lat: 44.260399, lon: -72.575386 },
  VA: { city: 'Richmond', lat: 37.540700, lon: -77.436000 },
  WA: { city: 'Olympia', lat: 47.041700, lon: -122.895000 },
  WV: { city: 'Charleston', lat: 38.349497, lon: -81.633294 },
  WI: { city: 'Madison', lat: 43.074722, lon: -89.384444 },
  WY: { city: 'Cheyenne', lat: 41.145548, lon: -104.802042 }
};

// Let the user pick a tile provider =)
const mapProviders = {
  openStreetMap: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  stamen: 'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png',
  stamenToner: 'https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png',
  cartoDB: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
};

// Load up the storms here so we can share with charts.js
// Going to model this function after the function presented by MDN at:
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function loadStorms() {
  const tmpStormsArray = [];

  // GPT helped with fetching the JSON file.
  // Comment one out depending on local or GH hosted.
  // const response = await fetch('https://codehard84.github.io/TorTrak/data/output.json');
  const response = await fetch('data/output.json'); // <--- This is the ENTIRE request, which has more than just JSON.
  const stormData = await response.json(); // <--- We only want the JSON, not the ENTIRE request body.

  stormData.forEach(storm => {
    // Going to make sure we don't have invalid states or data older than 1990. When I can
    // use a database this will be an easy change to include all of the data.
    // if (validStates.includes(storm.st) && storm.yr >= 1990) {
    if (statesData[storm.st]) {
      // Schema here: /data/SPC_severe_database_description.pdf
      const stormObject = {
        om: storm.om,
        yr: storm.yr,
        mo: storm.mo,
        dy: storm.dy,
        date: storm.date,
        time: storm.time,
        tz: storm.tz,
        st: storm.st,
        stf: storm.stf,
        stn: storm.stn,
        mag: storm.mag,
        inj: storm.inj,
        fat: storm.fat,
        loss: storm.loss,
        closs: storm.closs,
        slat: storm.slat,
        slon: storm.slon,
        elat: storm.elat,
        elon: storm.elon,
        len: storm.len,
        wid: storm.wid,
        ns: storm.ns,
        sn: storm.sn,
        sg: storm.sg,
        f1: storm.f1,
        f2: storm.f2,
        f3: storm.f3,
        f4: storm.f4,
        fc: storm.fc
      };
      tmpStormsArray.push(stormObject);
    }
  });
  return tmpStormsArray;
}

// I have to build all the functions in here because stormsArray is a promise stormsArray is fully
// resolved in the code below. Not sure if this is the best way, it is however the only way I know.
// So essentially we are calling loadStorms then saying WAIT for the array to load up, hence no longer
// a promise but the reality.

let stormsArray = [];

