'use strict';

// Globals
let stormsArray;
var map = L.map('stormsMap', { attributionControl: false }).setView([35.481918, -97.508469], 7);
let tileLayer;


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

// Check if a key exists in localStorage
// TODO: Remove this function if we do not use LS.
function isKeyInLocalStorage(key) {
  // Will return true if key exists in LS or false if not
  return localStorage.getItem(key) !== null;
}

// Function to toggle sorting
function toggleSorting() {
  const sorted = document.getElementById('sortCheckbox').checked;
  // Re-render the bar chart with sorted or unsorted data based on user selection
  const stormCountsPerState = getTotalStormsPerState(stormsArray, sorted);
  renderBarChart(stormCountsPerState, 'stormsChart', 'Number of Storms');
}

// Function to calculate total storms per state
function getTotalStormsPerState(stormsArray, sorted = false, yearMin = 2022, yearMax = 2022) {
  // Going to use reduce to count the storms per state.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  const stormCounts = stormsArray.reduce((total, storm) => {
    if (storm.yr >= yearMin && storm.yr <= yearMax) {
      total[storm.st] = (total[storm.st] || 0) + 1;
    }
    return total;
  }, {});

  // Let's add some sort of filtering logic
  if (sorted) {
    // GPT wrote this sorting logic. I could not figure out how to
    // sort an object and that is because you can't it needs to be an array.
    // Convert object to array of [state, count] pairs
    const stormCountsArray = Object.entries(stormCounts);
    // Sort array by count in descending order
    stormCountsArray.sort((a, b) => b[1] - a[1]);
    // Convert back to object
    const sortedStormCounts = Object.fromEntries(stormCountsArray);
    return sortedStormCounts;
  } else {
    return stormCounts; // <--- this is an object created from the stormsArray
  }
}

// renderBarChart takes key value such as: state: numberofstorms
// in one object.
function renderBarChart(kvp, canvasID, dataLabel) {
  // kvp - Key Value Pair (Such as OK: 100)
  // canvasID - The ID of the canvas in HTML
  // dataLabel - The label explaining the contents in the bar chart

  // Check if chart exist and destroy it if it does.
  const existingChart = Chart.getChart(canvasID);
  if (existingChart) {
    existingChart.destroy();
  }

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
      },
      // Using a plugin to make these puppies zoomable.
      // https://www.chartjs.org/chartjs-plugin-zoom/latest/
      plugins: {
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            mode: 'x', // Lock the zoom axis to X only.
          }
        }
      },
      // GPT helped with this.. My idea GPTs code.
      onClick: (event, chartElement) => {
        const activeElements = myChart.getElementsAtEventForMode(event, 'nearest', myChart.options);
        if (activeElements.length > 0) {
          const clickedLabel = chartData.labels[activeElements[0].index];
          const stateAbbreviation = clickedLabel;
          window.location.href = `/charts.html?state=${stateAbbreviation}`; // <-- My code =)
        }
      }
    }
  });
}

// I have to build all the functions in here because stormsArray is a promise stormsArray is fully
// resolved in the code below. Not sure if this is the best way, it is however the only way I know.
// So essentially we are calling loadStorms then saying WAIT for the array to load up, hence no longer
// a promise but the reality.
loadStorms().then(array => {
  stormsArray = array;
  let stormCountsPerState = getTotalStormsPerState(stormsArray);

  // Call functions to render default and user requested data.
  renderBarChart(stormCountsPerState, 'stormsChart', 'Number of Storms');
  renderMap();
});


function renderMap(yearMin=2022, yearMax=2022) {
  // Clear the existing tile layer if it exists
  if (tileLayer) {
    map.removeLayer(tileLayer);
  }
  // Map stuff
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map);

  addStorms(yearMin, yearMax);
}

function addStorms(yearMin = 2022, yearMax = 2022) {
  stormsArray.forEach(storm => {
    if (storm.yr >= yearMin && storm.yr <= yearMax) {
      // line between the starting and ending points
      const lineCoordinates = [
        [storm.slat, storm.slon], // Starting point
        [storm.elat, storm.elon]  // Ending point
      ];

      // Create the polyline and add it to the map
      const polyline = L.polyline(lineCoordinates, { color: 'red', weight: 2 }).addTo(map);

      const startCircle = L.circleMarker([storm.slat, storm.slon], { color: 'red', weight: 2, radius: 1 }).addTo(map);
      const endCircle = L.circleMarker([storm.elat, storm.elon], { color: 'blue', weight: 2, radius: 1 }).addTo(map);

      startCircle.bindPopup(`Start of Storm ${storm.om}`);
      endCircle.bindPopup(`End of Storm ${storm.om}`);

      // Popup Info
      polyline.bindPopup(`Storm ${storm.om}`);

      // Thicken the polyline on zoom. GPT and Stackoverflow helped here.
      map.on('zoomend', function () {
        const zoomLevel = map.getZoom();
        // Adjust polyline weight based on zoom level
        polyline.setStyle({ weight: zoomLevel <= 10 ? 1 : zoomLevel });
        startCircle.setStyle({ weight: zoomLevel <= 10 ? 1 : zoomLevel });
        endCircle.setStyle({ weight: zoomLevel <= 10 ? 1 : zoomLevel });
      });
    }
  });
}

// Test the flag builder
// console.log(statesData.buildFlagUrl('OK', 'w40'));
