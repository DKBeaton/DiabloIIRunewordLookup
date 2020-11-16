// Global variables

const runewordData = [];
const runewordSearch = document.querySelector('.runeword-search');
const container = document.querySelector('.runewords-container');

// Get runeword data
fetch('./runewords.json')
.then(response => response.json())
.then(data => runewordData.push(...data));

// Event listeners
runewordSearch.addEventListener('keyup', displayMatches);

// Filter json data to find match
function findMatches(word, runewordData) {
  return runewordData.filter(runeword => runeword.name.toUpperCase().includes(word.toUpperCase()));
}

// Display match data
function displayMatches(e) {
  // Make sure input is not empty
  if (isEmpty(e.target.value)) {
    // Don't contiune but remove all DOM elements
    removeDOM('.runeword-container', 'fade-in', 200);
    return;
  }

  const matchArray = findMatches(this.value, runewordData);

  // Check for exisiting DOM elements and remove them
  removeDOM('.runeword-container', 'fade-in', 200);

  // Add new DOM elements
  matchArray.forEach(item => {
    var newElement = document.createElement('div');
    newElement.classList.add('runeword-container');

    const regex = new RegExp(this.value, 'gi');
    const itemName = item.name.replace(regex, match => `<span class="hl">${match}</span>`);

    newElement.innerHTML = `
    <div class="runeword-name">${itemName}</div>
    <div class="runeword-type">${item.type.join(', ')}</div>
    <div class="runeword-runes">${item.runes.join(', ')}</div>
    <div class="runeword-description">${item.effects}</div>
    `;
    document.querySelector(".runewords-container").appendChild(newElement);
    setTimeout(function() {
      this.classList.add('fade-in');
    }.bind(newElement), 100)
  })
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

function addDOM() {

}

// ### Four different ways to filter data ###

// function findMatches(word, provinces) {
//   return provinces
//     .filter(province => province.cities.some(city => city.toUpperCase().includes(word.toUpperCase())))
//     .map(province => {
//       return Object.assign({}, province, {cities : province.cities.filter(city => city.toUpperCase().includes(word.toUpperCase()))})
//     });
// }

// function findMatches(word, provinces) {
//   return provinces
//     .filter(province => province.cities.some(city => city.toUpperCase().includes(word.toUpperCase())))
//     .map(province => {
//       let element = Object.assign({}, province);
//       return element.cities.filter(city => city.toUpperCase().includes(word.toUpperCase()));
//     });
// }

// function findMatches(word, provinces) {
//   return provinces.map(province => {
//     return {...province, cities: province.cities.filter(city => city.toUpperCase().includes(word.toUpperCase()))}
//   });
// }

// function findMatches(word, provinces) {
//   return provinces.filter(province => province.cities.some(city => city.toUpperCase().includes(word.toUpperCase())));
// }


