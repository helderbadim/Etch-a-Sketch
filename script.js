"use strict";
// Sketch side of sketch area
const sketchSideSize = 600;

// Variables selecting the HTML elements
const sketchContainer = document.querySelector(".sketch-container");
const slider = document.querySelector(".slider");
const sliderValueDisplay = document.querySelector("#slider-value-display");
const borderButton = document.querySelector("#grid");
const clearButton = document.querySelector("#clear");
const randomColorButton = document.querySelector("#random");
const eraserButton = document.querySelector("#eraser");
const colorSelector = document.querySelector("#color-selector");

// Initial grid size = 16x16. using let so it can be updated
let gridSize = 16;
let currentMode = "black";
//initially randomColorMode is set to false
let randomColorMode = false;
//initially eraserMode is set to false
let eraserMode = false;

// Function to create a single div with the same height and width
function createDiv() {
  const newCellDiv = document.createElement("div");
  newCellDiv.className = "cell";
  newCellDiv.style.height = `${sketchSideSize / gridSize}px`;
  newCellDiv.style.width = `${sketchSideSize / gridSize}px`;
  sketchContainer.appendChild(newCellDiv);

  //implement the mouse funcitionality to each div.
  //we want the functionality of pressing the button and dragging coloring the sketch area divs
  //to do that we need to create a varible
  let mouseDown = false;

  //in tbody section, when mouse is pressed, mouseDown varible becomes true
  document.body.addEventListener("mousedown", () => {
    mouseDown = true;
  });

  //the opposite happens when mouse is up in the body
  document.body.addEventListener("mouseup", () => {
    mouseDown = false;
  });

  newCellDiv.addEventListener("mouseover", () => {
    //in this function, when mouseover and mouseDown variable is set to true, the subsquent code is executed
    if (mouseDown) {
      //each one of the functionalities will be executed according the boolean value of each variable
      if (randomColorMode) {
        newCellDiv.style.backgroundColor = getRandomColor();
      } else if (eraserMode) {
        newCellDiv.style.backgroundColor = "whitesmoke";
      } else {
        newCellDiv.style.backgroundColor = currentMode;
      }
    }
  });
}

// Function to create multiple divs: the number of divs we want are grid size x grid size
function createGrid() {
  // Clear the existing grid
  sketchContainer.innerHTML = "";
  for (let i = 0; i < gridSize * gridSize; i++) createDiv();
}

createGrid(); //call the function

// Function to update slider value in real time
function updateSliderValue() {
  //return the value of the slider
  const sliderValue = slider.value;
  //generate a string with the value of the slider, side by side
  sliderValueDisplay.textContent = `${sliderValue} X ${sliderValue} (Resolution)`;
  //reasign a new value of the gridSize variable declared above according the slider value
  gridSize = sliderValue;
  createGrid(); //call the creategrid function to create a new grid, according with the slider value
}

slider.addEventListener("input", updateSliderValue); //addeventlistner with the input to update the grid

updateSliderValue();

// Remove/add grid functionality - basicly delete border if it has and add if dont (use terniary operator)
function toggleBorders() {
  const cells = document.querySelectorAll(".cell"); //This line selects all elements with the class cell and stores them in a NodeList called cells (an array)
  cells.forEach((cell) => {
    //because it is an array we need to set the border of each element individually using a for each loop, to loop through all the elements in the node list
    cell.style.border === "none" || cell.style.border === ""
      ? (cell.style.border = "0.1px solid gainsboro")
      : (cell.style.border = "none");
  });
}

borderButton.addEventListener("click", toggleBorders); //add an event listener to the grid button

// Clear button functionality
function clearSketchArea() {
  const cells = document.querySelectorAll(".cell"); //same as above for toggle borders
  cells.forEach((cell) => {
    cell.style.backgroundColor = "whitesmoke";
  });
}

clearButton.addEventListener("click", clearSketchArea); //add an event listener and call the function

// Random color generator function
function getRandomColor() {
  const r = Math.trunc(Math.random() * 256);
  const g = Math.trunc(Math.random() * 256);
  const b = Math.trunc(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Random color mode

randomColorButton.addEventListener("click", randomColor);

function randomColor() {
  randomColorMode ? (randomColorMode = false) : (randomColorMode = true);
  eraserMode = false;
}

// Eraser mode
function eraser() {
  eraserMode ? (eraserMode = false) : (eraserMode = true);
  randomColorMode = false;
}
eraserButton.addEventListener("click", eraser);

// Color picker mode
function selectColor(event) {
  currentMode = event.target.value;
  randomColorMode = false;
  eraserMode = false;
}

colorSelector.addEventListener("input", selectColor);
