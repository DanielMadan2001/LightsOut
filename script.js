
import Grid from "./grid.js"
import Node from "./node.js"

var theGrid = new Grid(5)
console.log(theGrid)

const createGrid = function() {
  const table = document.createElement('table');
  for (let i = 0; i < theGrid.size; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < theGrid.size; j++) {
      const cell = document.createElement('th');
      const button = gridButton();
      cell.appendChild(button);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  return table;
}

const gridButton = function() {
  const newButton = document.createElement("article");
  var newNode = new Node(theGrid.listOfNodes.length, newButton);

  newButton.innerHTML = `<img id="button${theGrid.listOfNodes.length}" src="images/buttonOff.png" class="gridButton">`;

  newButton.addEventListener("click", (event) => {
    event.preventDefault();
    theGrid.buttonPressed(newNode.id);
    updateProgressText(gridText);
  })

  newButton.addEventListener("mouseover", (event) => {
    event.preventDefault();
    if (theGrid.progress == (theGrid.size * theGrid.size)) {
      return;
    }
    console.log("in");
    newNode.buttonHover(true);
  })

  newButton.addEventListener("mouseout", (event) => {
    event.preventDefault();
    if (theGrid.progress == (theGrid.size * theGrid.size)) {
      return;
    }
    console.log("out");
    newNode.buttonHover(false);
  })

  theGrid.listOfButtons.push(newButton);
  theGrid.listOfNodes.push(newNode);

  return newButton;
}

const progressText = function() {
  const newText = document.createElement("article");
  return newText;
}

function updateProgressText(text) {
  if (theGrid.progress < (theGrid.size * theGrid.size)) {
    text.innerHTML = `<h3> Progress: `
      + theGrid.progress + `/` + theGrid.size * theGrid.size + `</h3>`;
  }
  else {
    text.innerHTML = `<h3> Good job! </h3>`;
    theGrid.gridComplete();
  }
  return text
}

const restartButton = function() {
  const newButton = document.createElement("article");

  newButton.innerHTML = `<button class="restartButton"> Restart </button>`

  newButton.addEventListener("click", (event) => {
    event.preventDefault();
    theGrid.resetGrid();
    updateProgressText(gridText);
  })

  return newButton;
}

const newGameButton = function() {
  const newButton = document.createElement("article");

  newButton.innerHTML = `<button class="newGameButton"> New Game </button>`

  newButton.addEventListener("click", (event) => {
    event.preventDefault();
    theGrid.setGrid();
    updateProgressText(gridText);
  })

  return newButton;
}

///////////////////////////////////////////////////////

const gridDiv = document.querySelector(".grid");
const gridText = new progressText();

gridDiv.append(gridText);
gridDiv.append(createGrid());
theGrid.setGrid();
updateProgressText(gridText);

///////////////////////////////////////////////////////

const menu = document.querySelector(".menu");

const restart = new restartButton();
const newGame = new newGameButton();
menu.append(restart);
menu.append(newGame);

