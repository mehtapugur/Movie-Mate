const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
const win = new Audio("../assets/audio/win.wav");
const error = new Audio("../assets/audio/error.wav");

const totalPieces = 9;
const piecesArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

initiateGame();

function initiateGame() {
  const randomImgPieces = generateRandomItemsArray(totalPieces, piecesArray);
  //console.log(randomImgPieces);

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

/* olmadı
for (let i = 1; i <= totalPieces; i++) {
  let pieceID = "piece-" + i;
  console.log("pieceID: ", pieceID);
  const piece = document.getElementById(pieceID);
  console.log("piece: ", piece);
  piece.style.backgroundImage = `url(../assets/img/${i}.png)`;
} */

draggableElements.forEach((elem) => {
  elem.addEventListener("dragstart", dragStart);
  // elem.addEventListener("drag", drag);
  // elem.addEventListener("dragend", dragEnd);
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
    event.preventDefault(); // Prevent default to allow drop
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
    //event.target.style.backgroundColor =
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
