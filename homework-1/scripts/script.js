// Gusto & RemoteTeam Node.js Bootcamp
// Homework #1 for week #2
// Mehtap Ugur


//functions
// when you drag and move on a valid drop target,
// and leave the valid drop target this event trigger
// Note: if you drop your drag element on valid drop target it will not trigger.

/*
----draggable----
dragstart
drag
dragend
----droppable----
dragenter
dragover
dragleave
drop
*/
const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
const win = new Audio("../assets/audio/win.wav");
const error = new Audio("../assets/audio/error.wav");

//dragstart: The event occurs when the user starts to drag an element
//dragend: The event occurs when the user has finished dragging an element
// dragover: The event occurs when the dragged element is over the drop target
// dragenter: The event occurs when the dragged element enters the drop target
// dragleave:The event occurs when the dragged element leaves the drop target
// drop: The event occurs when the dragged element is dropped on the drop target
const totalPieces = 9;
const piecesArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

initiateGame();

function initiateGame() {
  const randomImgPieces = generateRandomItemsArray(totalPieces, piecesArray);

  for (let i = 0; i < totalPieces; i++) {
    let mockID = "piece-" + randomImgPieces[i];
    draggableElements[i].setAttribute("id", mockID);
  }
}

function generateRandomItemsArray(n, originalArray) {
  let res = [];
  let clonedArray = [...originalArray];
  if (n > clonedArray.length) n = clonedArray.length;
  for (let i = 1; i <= n; i++) {
    const randomIndex = Math.floor(Math.random() * clonedArray.length);
    res.push(clonedArray[randomIndex]);
    clonedArray.splice(randomIndex, 1);
  }
  return res;
}

draggableElements.forEach((elem) => {
  elem.addEventListener("dragstart", dragStart);
});

droppableElements.forEach((elem) => {
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
  const draggableElementData = event.dataTransfer.getData("text");
  const droppableElementData = event.target.getAttribute("data-id");

  if (draggableElementData === droppableElementData) {
    win.play();
    event.target.classList.add("dropped");
    const draggableElement = document.getElementById(draggableElementData);
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    event.target.insertAdjacentHTML(
      "afterbegin",
      `<div id="${draggableElementData}"></div>`
    );
  } else {
    error.play();
  }
}
