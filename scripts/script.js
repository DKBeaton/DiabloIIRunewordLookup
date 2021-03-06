// Global variables
const runewordData = [];
const runewordSearch = document.querySelector('.runeword-search');
const container = document.querySelector('.runewords-container');
let refreshTimeout;

// Get runeword data
fetch('./runewords.json')
.then(response => response.json())
.then(data => runewordData.push(...data));

// Event listeners
runewordSearch.addEventListener('keyup', function(e) {
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(function() {
    displayMatches(e);
  }, 500);
});

// Filter json data to find match
function findMatches(word, runewordData) {
  return runewordData.filter(runeword => runeword.name.toUpperCase().includes(word.toUpperCase()));
}

// Display match data
function displayMatches(e) {
  const value = e.target.value;
  
  // Make sure input is not empty
  if (isEmpty(value)) {
    removeDOM('.runeword-container', 'fade-in', 200);
    return;
  }

  const matchArray = findMatches(value, runewordData);

  // Check for exisiting DOM elements and remove them
  removeDOM('.runeword-container', 'fade-in', 200);

  // Add new DOM elements
  addDOM(matchArray, value);
}

// Parse an items 'varies' description stat
function parseItemDescription(item) {
  const itemArray = item.split('<br/>');
  return itemArray.map(i => {
    if (!i.includes('varies')) return i;
    const regex = new RegExp(/[+\d-%]+/, 'g');
    return i.replace(regex, match => `<span class="stat">${match}</span>`);
  }).join('<br/>');
}

// Check if string is empty
function isEmpty(str) {
  return (!str || 0 === str.length);
}

// Remove DOM element
function removeDOM(element, className, timeOut) {
  container.querySelectorAll(element).forEach(item => {
    item.classList.remove(className);
    setTimeout(function() {
      this.remove();
    }.bind(item), timeOut)
  });
}

// Add DOM element
function addDOM(itemArray, matchWord) {
  itemArray.forEach(item => {
    // Create element
    var newElement = document.createElement('div');
    newElement.classList.add('runeword-container');

    // REGEX item name for searched word highlight
    const regex = new RegExp(matchWord, 'gi');
    const itemName = item.name.replace(regex, match => `<span class="hl">${match}</span>`);

    // Add inner HTML data
    newElement.innerHTML = `
    <div class="runeword-name">${itemName}</div>
    <div class="runeword-type">${item.socket} Socket ${item.type.join(', ')}</div>
    <div class="runeword-runes">${item.runes.join(' + ')}</div>
    <div class="runeword-description">${parseItemDescription(item.effects)}</div>
    `;
    document.querySelector(".runewords-container").appendChild(newElement);

    // Add fade in effect
    setTimeout(function() {
      this.classList.add('fade-in');
    }.bind(newElement), 100)
  })
}
