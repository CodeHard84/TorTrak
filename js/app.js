// TorTrak Source
// Filename: app.js

'use strict';

// Globals

// The valid states will protect us from loading values from outside the 50 states.
// We will also use this to make a drop down list of filterable states for our charts
// and maps.
const validStates = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const stormsArray = loadStorms();


function loadStorms() {
  const tmpStormsArray = [];
  // GPT Helped with fetching the JSON file.
  // Comment one out depending on local or GH hosted.
  // fetch('https://codehard84.github.io/TorTrak/data/output.json')
  fetch('/data/output.json', { async: false })
    .then(response => response.json()) // Extract JSON data from response
    .then(stormData => {
      stormData.forEach(storm => {
        if (validStates.includes(storm.st)) {
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
      console.log(tmpStormsArray);
      return tmpStormsArray;
    });
}

// Check if a key exist in localStorage
function isKeyInLocalStorage(key) {
  // Will return true if key exist in ls or false if !
  return localStorage.getItem(key) !== null;
}
