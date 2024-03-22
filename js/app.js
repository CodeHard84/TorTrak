'use strict';

// TODO: If I have time to refactor I am going to make an update function that is a central place for updating all
// the charts and maps.

// Globals
let stormsArray;
var map = L.map('stormsMap', { attributionControl: false }).setView([35.481918, -97.508469], 7);
let tileLayer;
let polyline;
const rangeInput = document.getElementById('range');
const rangeUpperInput = document.getElementById('rangeUpper');
const stateFilter = document.getElementById('stateFilter');
const providerDrop = document.getElementById('mapProvider');
// I have to set this from keeping ALL the storms from rendering.
let selectedState = 'OK';
let yearMin = rangeInput.value;
let yearMax = rangeUpperInput.value;
providerDrop.value = 'openStreetMap';
let provider = providerDrop.value;


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
function toggleSorting(checkbox) {
  const sortCheckbox = document.getElementById('sortCheckbox');
  const alphaSortCheckbox = document.getElementById('alphaSortCheckbox');

  // Ensure only one checkbox is checked at a time
  if (checkbox === sortCheckbox && sortCheckbox.checked) {
    alphaSortCheckbox.checked = false;
  } else if (checkbox === alphaSortCheckbox && alphaSortCheckbox.checked) {
    sortCheckbox.checked = false;
  }

  // Re-render the bar chart based on the selected sorting option
  const sorted = sortCheckbox.checked;
  const alphaSorted = alphaSortCheckbox.checked;

  let stormCountsPerState;
  if (sorted) {
    stormCountsPerState = getTotalStormsPerState(stormsArray, true);
  } else if (alphaSorted) {
    stormCountsPerState = sortStatesAlphabetically(stormsArray);
  } else {
    stormCountsPerState = getTotalStormsPerState(stormsArray, false);
  }

  renderBarChart(stormCountsPerState, 'stormsChartCanvas', 'Number of Tornadoes');
}

// Function to sort states alphabetically
function sortStatesAlphabetically(stormsArray) {
  const sortedStates = {};
  const states = Object.keys(getTotalStormsPerState(stormsArray, false)).sort();

  states.forEach(state => {
    sortedStates[state] = stormsArray.filter(storm => storm.st === state).length;
  });

  return sortedStates;
}

// Function to calculate total storms per state
function getTotalStormsPerState(stormsArray, sorted = false) {
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
      label: dataLabel + ' from ' + yearMin + ' to ' + yearMax,
      data: Object.values(kvp),
      backgroundColor: '#FF6384',
      borderColor: '#FF6384',
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
      plugins: {
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            mode: 'x',
          }
        }
      },
      // GPT helped with this click listener
      onClick: (event, chartElement) => {
        const activeElements = myChart.getElementsAtEventForMode(event, 'nearest', myChart.options);
        if (activeElements.length > 0) {
          const clickedLabel = chartData.labels[activeElements[0].index];
          const stateAbbreviation = clickedLabel;
          window.location.href = `/charts.html?state=${stateAbbreviation}`;
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
  renderBarChart(stormCountsPerState, 'stormsChartCanvas', 'Number of Tornadoes');
  renderMap();
});


function renderMap(yearMin = 2022, yearMax = 2022) {
  const providerURL = mapProviders[provider];
  // Clear the existing tile layer if it exists
  if (tileLayer) {
    map.removeLayer(tileLayer);
  }
  // Map stuff
  const customTileLayer =
    // I made a custom layer to be able to change to a new tile provider in
    // the future.
    L.tileLayer(providerURL, {
      maxZoom: 19,
      tileSize: 256,
      zoomOffset: 0,
    });

  // Add the custom tile layer to the map
  customTileLayer.addTo(map);

  addStorms(yearMin, yearMax);

  // Update the quick stats
  let count = 0;
  for (const storm of stormsArray) {
    if (storm.yr >= yearMin && storm.yr <= yearMax && storm.st === selectedState) {
      count++;
    } else {
      if (storm.yr >= yearMin && storm.yr <= yearMax && 'ALL' === selectedState) {
        count++;
      }
    }
  }
  document.getElementById('stats').innerHTML = `You're Viewing: ${count.toLocaleString()}/${stormsArray.length.toLocaleString()} Tornadoes`;
  if (selectedState !== 'ALL') {
    const fullName = statesData[selectedState].fullName;
    const population = statesData[selectedState].population;
    const landmass = statesData[selectedState].landmass;
    const wikiUrl = statesData[selectedState].wikiLink;
    const capital = stateCapitals[selectedState].city;
    document.getElementById('stateStats').innerHTML = `${fullName}, with a population of ${population.toLocaleString()} people and a landmass spanning ${landmass.toLocaleString()} 
   square miles, is home to its capital, ${capital}. Learn more about ${fullName} <a href='charts.html?state=${selectedState}'>here</a>.`;
  } else {
    document.getElementById('stateStats').innerHTML = `The United States boasts a population of 333,271,411 and covers a vast landmass spanning 3,119,884 square miles. Its capital, 
    Washington, D.C., stands as a symbol of its political and cultural significance. Learn more about the United States <a href='https://en.wikipedia.org/wiki/United_States'>here</a>.`;
  }
}

// Event listener for the map provider dropdown change
const mapProviderDropdown = document.getElementById('mapProvider');
mapProviderDropdown.addEventListener('change', function () {
  provider = this.value;

  // Have to clear the old tiles
  // map.eachLayer(function (layer) {
  //   map.removeLayer(layer);
  // });

  // console.log('Selected Provider: ' + selectedProvider);

  renderMap(yearMin, yearMax);
});

function togglePolyline() {
  const polySortCheckbox = document.getElementById('disablePolylineCheckbox');
  const yearMin = rangeInput.value;
  const yearMax = rangeUpperInput.value;
  if (document.getElementById('disablePolylineCheckbox').checked) {
    // Had help here: 
    // https://stackoverflow.com/questions/45185205/leaflet-remove-all-map-layers-before-adding-a-new-one
    map.eachLayer(function (layer) {
      map.removeLayer(layer);
    });
    renderMap(yearMin, yearMax);
  } else {
    renderMap(yearMin, yearMax);
  }
}

function addStorms(yearMin = 2022, yearMax = 2022) {
  const selectedState = document.getElementById('stateFilter').value; // Get the selected state from the dropdown
  stormsArray.forEach(storm => {
    if (
      (storm.yr >= yearMin && storm.yr <= yearMax) && // Check year range
      (selectedState === 'ALL' || storm.st === selectedState) // Check selected state
    ) {
      // line between the starting and ending points
      // Most of this is straight from the leaflet documentation:
      // https://leafletjs.com/reference.html#polyline
      const lineCoordinates = [
        [storm.slat, storm.slon], // Starting point
        [storm.elat, storm.elon]  // Ending point
      ];

      const polySortCheckbox = document.getElementById('disablePolylineCheckbox');
      // What this check is doing is to make sure we have an ending elat, elon, and that our polyline is not disabled. Because:
      // 1. We don't want to draw a polyline if the user doesn't want it.
      // 2. A lot of this data does not have ending coordinates which bugs out the polyline. In this case we only mark the start of the storm.
      if (!document.getElementById('disablePolylineCheckbox').checked
        && (storm.elat !== '0.0' && storm.elat !== '') && (storm.elon !== '0.0' && storm.elon !== '')) {

        // Create the polyline and add it to the map
        const polyline = L.polyline(lineCoordinates, { color: 'red', weight: 2 }).addTo(map);

        const startCircle = L.circleMarker([storm.slat, storm.slon], { color: 'red', weight: 2, radius: 1 }).addTo(map);
        const endCircle = L.circleMarker([storm.elat, storm.elon], { color: 'blue', weight: 2, radius: 1 }).addTo(map);

        // Popup Info
        // This is where I will add all of the info from our JSON file that
        // we have not used yet.
        startCircle.bindPopup(`Start of Storm ${storm.om}`);
        endCircle.bindPopup(`End of Storm ${storm.om}`);
        polyline.bindPopup(`Storm ${storm.om} Year ${storm.yr}`);

        // Thicken the polyline on zoom. GPT and Stackoverflow helped here.
        map.on('zoomend', function () {
          const zoomLevel = map.getZoom();
          // Adjust polyline weight based on zoom level
          polyline.setStyle({ weight: zoomLevel <= 10 ? 1 : zoomLevel });
          startCircle.setStyle({ weight: zoomLevel <= 10 ? 1 : zoomLevel });
          endCircle.setStyle({ weight: zoomLevel <= 10 ? 1 : zoomLevel });
        });
      } else {
        // Draw the storms w/o the polyline
        const startCircle = L.circleMarker([storm.slat, storm.slon], { color: 'red', weight: 2, radius: 1 }).addTo(map);
        // console.log('Drawing without poly');
      }
    }
  });
}

// Test the flag builder
// console.log(statesData.buildFlagUrl('OK', 'w40'));

// Filters
// GPT wrote all of this slider logic using my ideas.
document.addEventListener('DOMContentLoaded', function () {
  const lowerBoundInput = document.getElementById('lowerBound');
  const upperBoundInput = document.getElementById('upperBound');
  const rangeInput = document.getElementById('range');
  const rangeUpperInput = document.getElementById('rangeUpper');

  rangeInput.addEventListener('input', function () {
    lowerBoundInput.value = this.value;
    // Ensure lower bound does not exceed upper bound
    if (parseInt(lowerBoundInput.value) > parseInt(upperBoundInput.value)) {
      upperBoundInput.value = lowerBoundInput.value;
      rangeUpperInput.value = lowerBoundInput.value;
    }

    yearMin = rangeInput.value;
    yearMax = rangeUpperInput.value;

    // Redraw map with updated years
    // Clear the old map
    map.eachLayer(function (layer) {
      map.removeLayer(layer);
    });
    toggleSorting();
    renderMap(parseInt(lowerBoundInput.value), parseInt(upperBoundInput.value));
  });

  rangeUpperInput.addEventListener('input', function () {
    upperBoundInput.value = this.value;
    // Ensure upper bound does not go below lower bound
    if (parseInt(upperBoundInput.value) < parseInt(lowerBoundInput.value)) {
      lowerBoundInput.value = upperBoundInput.value;
      rangeInput.value = upperBoundInput.value;
    }

    yearMin = rangeInput.value;
    yearMax = rangeUpperInput.value;

    // Redraw map with updated years// Clear the old map
    map.eachLayer(function (layer) {
      map.removeLayer(layer);
    });
    toggleSorting();
    renderMap(parseInt(lowerBoundInput.value), parseInt(upperBoundInput.value));
  });

  // Initialize values
  lowerBoundInput.value = rangeInput.value;
  upperBoundInput.value = rangeUpperInput.value;
});

// reset button
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', function () {
  // Reset year inputs
  rangeInput.value = 2022;
  rangeUpperInput.value = 2022;
  yearMax = 2022;
  yearMin = 2022;

  // Reset text boxes
  const lowerBoundInput = document.getElementById('lowerBound');
  const upperBoundInput = document.getElementById('upperBound');
  lowerBoundInput.value = '2022';
  upperBoundInput.value = '2022';

  // Reset checkbox states
  const sortCheckbox = document.getElementById('sortCheckbox');
  const alphaSortCheckbox = document.getElementById('alphaSortCheckbox');
  const polySortCheckbox = document.getElementById('disablePolylineCheckbox');
  sortCheckbox.checked = false;
  alphaSortCheckbox.checked = false;
  polySortCheckbox.checked = false;

  // Fix the dropdowns
  selectedState = 'OK';
  stateFilter.value = 'OK';
  providerDrop.value = 'openStreetMap';



  // Re-render the default chart and the map
  toggleSorting(sortCheckbox);

  // Reset map and then recenter it
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });

  renderMap(rangeInput.value, rangeUpperInput.value);
  map.setView([35.481918, -97.508469], 7);
});

function populateStateDropdown() {
  // option for ALL states with ALL as default.
  const allOption = document.createElement('option');
  allOption.value = 'ALL';
  allOption.text = 'ALL';
  stateFilter.appendChild(allOption);

  // GPT helped with this.
  Object.keys(statesData).forEach(abbreviation => {
    const fullName = statesData[abbreviation].fullName;
    const option = document.createElement('option');
    option.text = fullName;
    option.value = abbreviation;
    stateFilter.appendChild(option);

    // GPT helped also with this if...
    if (abbreviation === 'OK') {
      option.selected = true;
    }
  });
}

stateFilter.addEventListener('change', function () {
  selectedState = stateFilter.value;

  // Clear the old map
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });

  renderMap(rangeInput.value, rangeUpperInput.value);

  // Change the map view to the respective state capital.
  // based on user state selection.
  if (selectedState !== 'ALL') {
    var capitalInfo = stateCapitals[selectedState];
    var capitalCoordinates = [capitalInfo.lat, capitalInfo.lon];
    map.setView(capitalCoordinates, 7);
  } else {
    map.setView([37.0902, -95.7129], 4); // Center of US
  }
});

// Call the function to populate the state dropdown
populateStateDropdown();
