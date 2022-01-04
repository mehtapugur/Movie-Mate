// Gusto & RemoteTeam Node.js Bootcamp
// Assignment #1 for Week #2
// Mehtap Ugur

// DOM Elements
const draggableItems = document.querySelectorAll(".draggable");
const droppableItems = document.querySelectorAll(".droppable");

// Sound Effects
const winEffect = new Audio("../assets/audio/win.wav");
const errorEffect = new Audio("../assets/audio/error.wav");

const totalPieces = 9;
const piecesArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Functions
initiateGame();

function initiateGame() {
  const randomImgPieces = generateRandomItemsArray(totalPieces, piecesArray);
  for (let i = 0; i < totalPieces; i++) {
    let mockID = "piece-" + randomImgPieces[i];
    draggableItems[i].setAttribute("id", mockID);
  }
}

function generateRandomItemsArray(n, originalArray) {
  let sortedArray = [];
  let mockArray = [...originalArray];
  for (let i = 1; i <= n; i++) {
    const randomIndex = Math.floor(Math.random() * mockArray.length);
    sortedArray.push(mockArray[randomIndex]);
    mockArray.splice(randomIndex, 1);
  }
  return sortedArray;
}

// Drag and Drop Events Assignments
// dragstart: The event occurs when the user starts to drag an element
// dragenter: The event occurs when the dragged element enters the drop target
// dragover: The event occurs when the dragged element is over the drop target
// dragleave: The event occurs when the dragged element leaves the drop target
// drop: The event occurs when the dragged element is dropped on the drop target

draggableItems.forEach((elem) => {
  elem.addEventListener("dragstart", dragStart);
});

droppableItems.forEach((elem) => {
  elem.addEventListener("dragenter", dragEnter);
  elem.addEventListener("dragover", dragOver);
  elem.addEventListener("dragleave", dragLeave);
  elem.addEventListener("drop", drop);
});

// Drag and Drop Functions
function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function dragOver(event) {
  if (!event.target.classList.contains("dropped")) {
    event.preventDefault();
  }
}

function dragEnter(event) {
  if (!event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragLeave(event) {
  if (!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function drop(event) {
  event.preventDefault();
  event.target.classList.remove("droppable-hover");
  const draggableItemData = event.dataTransfer.getData("text");
  const droppableItemData = event.target.getAttribute("data-id");

  // when correct matching
  if (draggableItemData === droppableItemData) {
    winEffect.play();
    event.target.classList.add("dropped");
    const draggableItem = document.getElementById(draggableItemData);
    draggableItem.classList.add("dragged");
    draggableItem.setAttribute("draggable", "false");
    event.target.insertAdjacentHTML(
      "afterbegin",
      `<div id="${draggableItemData}"></div>`
    );
  } else {
    // when incorrect matching
    errorEffect.play();
  }
}
