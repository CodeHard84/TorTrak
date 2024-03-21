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


// Going to model this function after the function presented by MDN at:
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

async function loadStorms() {
  const tmpStormsArray = [];

  // GPT helped with fetching the JSON file.
  // Comment one out depending on local or GH hosted.
  const response = await fetch('https://codehard84.github.io/TorTrak/data/output.json');
  // const response = await fetch('data/output.json');
  const stormData = await response.json();

  stormData.forEach(storm => {
    // Going to make sure we don't have invalid states or data older than 1990. When I can
    // use a database this will be an easy change to include all of the data.
    // if (validStates.includes(storm.st) && storm.yr >= 1990) {
    if (validStates.includes(storm.st)) {
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
  // console.log(tmpStormsArray);
  return tmpStormsArray;
}

// Check if a key exist in localStorage
function isKeyInLocalStorage(key) {
  // Will return true if key exist in ls or false if !
  return localStorage.getItem(key) !== null;
}

// I have to build all the functions in here because stormsArray is a promise stormsArray is fully
// resolved in the code below. Not sure if this is the best way, it is however the only way I know.
loadStorms().then(stormsArray => {
  function getTotalStormsPerState() {
    // Going to use reduce to count the storms per state.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    const stormCounts = stormsArray.reduce((total, storm) => {
      total[storm.st] = (total[storm.st] || 0) + 1;
      return total;
    }, {});
    console.log(stormCounts);
    return stormCounts;
  }

  // Data variables
  let stormCountsPerState = getTotalStormsPerState();

  // renderBarChart takes key value such as: state: numberofstorms
  // in one object.
  function renderBarChart(kvp, canvasID, dataLabel) {
    // kvp - Key Value Pair (Such as OK: 100)
    // canvasID - The ID of the canvas in HTML
    // dataLabel - The label explaining the contents in the bar chart
    const chartData = {
      labels: Object.keys(kvp),
      datasets: [{
        label: dataLabel,
        data: Object.values(kvp),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };

    const ctx = document.getElementById(canvasID).getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Call functions to render default and user requested data.
  renderBarChart(stormCountsPerState, 'stormsChart', 'Number of Storms Per State');
});