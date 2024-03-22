function createStatesList() {
  const container = document.getElementById('statesContainer');
  const stateColumns = document.createElement('div');
  stateColumns.classList.add('state-columns');

  // left column
  const leftColumn = document.createElement('div');
  leftColumn.classList.add('state-column');
  const ulLeft = document.createElement('ul');
  leftColumn.appendChild(ulLeft);

  // right column
  const rightColumn = document.createElement('div');
  rightColumn.classList.add('state-column');
  const ulRight = document.createElement('ul');
  rightColumn.appendChild(ulRight);

  let count = 0;
  // Get total number of states, we may get more... Who knows? Keeping it DRY.
  const totalStates = Object.keys(statesData).length; // <--- GPT helped with this.
  // Calculate half of the total number of states
  const halfStates = Math.ceil(totalStates / 2);

  // Iterate over each state in statesData
  for (const stateAbbr in statesData) {
    if (statesData.hasOwnProperty(stateAbbr)) { // <--- this was the fix to not trying to render the function I had in the object. But I moved the function.
      const state = statesData[stateAbbr];
      const li = document.createElement('li');
      const img = document.createElement('img');
      const flagUrl = buildFlagUrl(stateAbbr.toLowerCase(), 'w20');

      img.src = flagUrl;
      img.alt = state.fullName + ' Flag';
      img.classList.add('state-flag');

      // Create link to charts.html?state=abbreviation
      const link = document.createElement('a');
      link.href = `charts.html?state=${stateAbbr}`;
      link.appendChild(img);
      link.appendChild(document.createTextNode(state.fullName));

      li.appendChild(link);

      if (count < halfStates) {
        ulLeft.appendChild(li);
      } else {
        ulRight.appendChild(li);
      }
      count++;
    }
  }

  // Append columns to the stateColumns container
  stateColumns.appendChild(leftColumn);
  stateColumns.appendChild(rightColumn);
  // Append the stateColumns container to the main container
  container.appendChild(stateColumns);
}


function createStatesChartPage() {
  const stateContainer = document.getElementById('stateContainer');
  const img = document.createElement('img');
  const flagUrl = buildFlagUrl(state.toLowerCase(), 'w320');
  img.src = flagUrl;
  img.alt = state.fullName + ' Flag';
  img.classList.add('state-flag-img');

  // Append flag image to stateContainer
  stateContainer.appendChild(img);

  // State fact blurb
  const stateStats = document.createElement('div'); // Create a new div for stateStats
  stateStats.id = 'stateStats'; // Set the id of the stateStats div

  const fullName = statesData[state].fullName;
  const population = statesData[state].population;
  const landmass = statesData[state].landmass;
  const capital = stateCapitals[state].city;

  // Populate stateStats with HTML content
  stateStats.innerHTML = `${fullName}, with a population of ${population.toLocaleString()} people and a landmass spanning ${landmass.toLocaleString()} square miles, 
  is home to its capital, ${capital}.`;

  // Append stateStats to stateContainer
  stateContainer.appendChild(stateStats); // Append stateStats to stateContainer
}
