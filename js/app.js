// TorTrak Source
// Filename: app.js

'use strict';

// Globals
const stormsArray = [];


function loadStorms() {
  // Load all storms from storms.json
  // if allStorms key does not exist in storage.
  // TODO: Save the data to local storage and then check for it on subsequent visits.

  // GPT Helped with fetching the JSON file.
  fetch('https://codehard84.github.io/TorTrak/data/output.json') // TODO: This needs to not be hardcoded.
    .then(response => response.json())
    .then(stormData => {

      // Iterate over each storm data in the JSON array and create an object
      stormData.forEach(storm => {
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
      console.log(stormsArray);
    });
}

loadStorms();
