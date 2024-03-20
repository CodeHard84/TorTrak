// TorTrak Source
// Filename: app.js

'use strict';

// Globals
const stormsArray = [];
let allStates = [];

const validStates = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];


function loadStorms() {
  // Load all storms from storms.json
  // if allStorms key does not exist in storage.
  // TODO: Save the data to local storage and then check for it on subsequent visits.
  // This will have to wait because our data is too large for localStorage. DB is out of scope.

  // GPT Helped with fetching the JSON file.
  // Comment one out depending on local or GH hosted.
  // fetch('https://codehard84.github.io/TorTrak/data/output.json')
  fetch('/data/output.json')
    .then(response => response.json())
    .then(stormData => {

      // Iterate over each storm data in the JSON array and create an object
      stormData.forEach(storm => {
        // Need to filter out all of the additional territories.
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

          // Push the created storm object to the array
          stormsArray.push(stormObject);
        }

        // HTML test
        // const stormElement = document.createElement('div');
        // stormElement.innerHTML = `
        //   <h2>${storm.st}</h2>
        //   <p>Date: ${storm.date}</p>
        //   <p>Time: ${storm.time}</p>
        //   <p>Magnitude: ${storm.mag}</p>
        // `;
        // document.body.appendChild(stormElement);
      });

      // TODO: Add some sort of DB support here.
      // localStorage can not hold this object due to quota size.
      // I did get IndexDB to work here but it is outside of the current
      // project scope.

      // Saving options:
      // 1.) Truncate the data to fit
      // 2.) Use a DB (Thinking IndexDB would be GREAT here because server side DB is not available with GH pages.)
      // 3.) Do nothing and let the server load 8MBs of JSON everytime.

      console.log(stormsArray);

      // Generate a list of all available states.
      // This has to be called here because fetch is an async function
      // this will ensure that the stormsArray is built before calling it.
      genStates();
    });
}

// Check if a key exist in localStorage
function isKeyInLocalStorage(key) {
  // Will return true if key exist in ls or false if !
  return localStorage.getItem(key) !== null;
}

// Create a function that returns a list of states.
function genStates() {
  // Get all the states out of the stormsArray and then create an array of states.

  if (isKeyInLocalStorage('statesList')) {
    // Key exist
    allStates = JSON.parse(localStorage.getItem('statesList'));
    console.log('States loaded from localStorage: ' + allStates);
  } else {
    // Key does not exist

    // Get all the states out of the stormsArray and then create an array of states
    let allStates = stormsArray.map(storm => storm.st);

    // Filter out invalid state abbreviations, this is redundant. May remove.
    allStates = allStates.filter(state => validStates.includes(state));

    // Remove duplicates from the array
    allStates = [...new Set(allStates)]; // GPT helped here.

    // Sort the states alphabetically
    allStates.sort();

    // Debug the result
    console.log(allStates);

    // Save this because we don't need to generate this every reload
    localStorage.setItem('statesList', JSON.stringify(allStates));
  }
}

loadStorms();

// At this point two arrays exist:
// 1.) allStates - this contains all the state abbreviations
// 2.) stormsArray - this contains all of the storm objects.
// We could have used a single array thus far, hwoever, it would lead to redundant array mapping on every refresh.
