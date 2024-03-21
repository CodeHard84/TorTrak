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
  WY: { landmass: 97093, fullName: 'Wyoming', population: 583279, wikiLink: 'https://en.wikipedia.org/wiki/Wyoming' },
  // While doing my research on Wikipedia for the above object I found that all the flags had a similar naming covention...
  // This function is going to use that! Wikipedia however doesn't allow embedding so I found flagpedia.net which actually has
  // an API. =)
  // Function specific to this object

  // Available flag sizes w20, w40, w80, w160, w320, w640, w1280, w2560
  buildFlagUrl: function (stateAbbr, size='w320') {
    const lowerAbbr = stateAbbr.toLowerCase(); // Flagpedia requires lowercase abbreviation.
    const flagUrl = `https://flagcdn.com/${size}/us-${lowerAbbr}.png`;
    return flagUrl;
  }
};

