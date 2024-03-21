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

// Call the function to create the list of states with flags

// If we have a state variable we don't need the columns
// Retrieve state variable from URL
const urlParams = new URLSearchParams(window.location.search);
const state = urlParams.get('state');

if (state) {
  // We have a state variable generate stuff for the state.
  const container = document.getElementById('statesContainer');
  container.innerHTML = '';
} else {
  // No state variable passed in URL so make a list.
  createStatesList();
}
