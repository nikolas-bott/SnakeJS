const LEFT = "LEFT";
const RIGHT = "RIGHT";
const UP = "UP";
const DOWN = "DOWN";

const playground = document.getElementById("playground");
const container = document.getElementById("container");
const snake = document.getElementById("snake");
const dimensionOfSquare = playground.clientWidth / 17;

let snakeTail;
let snakeTails = [];
let secondSnakeTail;

let movingDirection = RIGHT;
let intervals = [];
let prevPositions = [
  {
    left: snake.getBoundingClientRect().left,
    top: 10 * dimensionOfSquare,
  },
];

let snakeSize = 10;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  snakeRight();
  changeSnakeSize();
  createSquares();
});

document.addEventListener("keydown", (e) => {
  const key = e.key;

  switch (key) {
    case "d":
      snakeRight();
      break;
    case "a":
      snakeLeft();
      break;
    case "w":
      snakeUp();
      break;
    case "s":
      snakeDown();
      break;
  }
});

function clearIntervals() {
  intervals.forEach(clearInterval);
  intervals = [];
}

function renderTail() {
  for (let i = 1; i < prevPositions.length; i++) {
    renderSingleTail(i);
  }
  // if (snakeTail) snakeTail.remove();
  // console.log("Test");
  // snakeTail = document.createElement("div");

  // snakeTail.style.top = snake.getBoundingClientRect().top + "px";
  // snakeTail.style.left = snake.getBoundingClientRect().left + "px";
  // snakeTail.style.width = dimensionOfSquare + "px";
  // snakeTail.style.height = dimensionOfSquare + "px";
  // container.appendChild(snakeTail);

  // snakeTail.classList.add("tempSnake");

  // let i = 1;
  // const interval_id = setInterval(() => {
  //   snakeTail.style.left = prevPositions[i].left + "px";
  //   snakeTail.style.top = prevPositions[i].top + "px";
  // }, 1000);
  // intervals.push(interval_id);
}

function renderSingleTail(index) {
  if (snakeTails[index]) snakeTails[index].remove();

  snakeTails[index] = document.createElement("div");

  snakeTails[index].style.top = snake.getBoundingClientRect().top + "px";
  snakeTails[index].style.left = snake.getBoundingClientRect().left + "px";
  snakeTails[index].style.width = dimensionOfSquare + "px";
  snakeTails[index].style.height = dimensionOfSquare + "px";
  snakeTails[index].classList.add("tempSnake");

  container.appendChild(snakeTails[index]);

  snakeTails[index].style.left = prevPositions[index].left + "px";
  snakeTails[index].style.top = prevPositions[index].top + "px";

  // let i = index;
  // const interval_id = setInterval(() => {
  //   snakeTails[index].style.left = prevPositions[i].left + "px";
  //   snakeTails[index].style.top = prevPositions[i].top + "px";
  // }, 1000);
  //intervals.push(interval_id);
}

function snakeRight() {
  clearIntervals();
  //renderTail();
  movingDirection = RIGHT;

  const interval_id = setInterval(() => {
    const snakePos = snake.getBoundingClientRect().left;

    snake.style.left = snakePos + dimensionOfSquare + "px";
    addSnakePrev();

    if (
      snake.getBoundingClientRect().right + dimensionOfSquare >=
      playground.getBoundingClientRect().right
    ) {
      clearIntervals();
      return;
    }
  }, 1000);
  intervals.push(interval_id);
}

function snakeLeft() {
  clearIntervals();
  //renderTail();

  const interval_id = setInterval(() => {
    const snakePos = snake.getBoundingClientRect().left;

    snake.style.left = snakePos - dimensionOfSquare + "px";
    addSnakePrev();

    if (
      snake.getBoundingClientRect().left - dimensionOfSquare <=
      playground.getBoundingClientRect().left
    ) {
      clearIntervals();
      return;
    }
  }, 1000);
  intervals.push(interval_id);
}

function snakeUp() {
  clearIntervals();
  //renderTail();

  const interval_id = setInterval(() => {
    const snakePos = snake.getBoundingClientRect().top;

    snake.style.top = snakePos - dimensionOfSquare + "px";
    addSnakePrev();

    if (
      snake.getBoundingClientRect().top - dimensionOfSquare <=
      playground.getBoundingClientRect().top
    ) {
      clearIntervals();
      return;
    }
  }, 1000);
  intervals.push(interval_id);
}

function snakeDown() {
  clearIntervals();
  //renderTail();

  const interval_id = setInterval(() => {
    const snakePos = snake.getBoundingClientRect().top;

    snake.style.top = snakePos + dimensionOfSquare + "px";
    addSnakePrev();

    if (
      snake.getBoundingClientRect().top + dimensionOfSquare >=
      playground.getBoundingClientRect().bottom
    ) {
      clearIntervals();
      return;
    }
  }, 1000);
  intervals.push(interval_id);
}

function addSnakePrev() {
  if (prevPositions.length > snakeSize) {
    prevPositions.shift();
  }
  prevPositions.push({
    left: snake.getBoundingClientRect().left,
    top: snake.getBoundingClientRect().top,
  });
  renderTail();
}

function changeSnakeSize() {
  snake.style.width = dimensionOfSquare + "px";
  snake.style.height = dimensionOfSquare + "px";
  snake.style.top = 10 * dimensionOfSquare + "px";
}

function createSquares() {
  for (let i = 0; i < 17 * 17; i++) {
    const sqaure = document.createElement("div");
    sqaure.classList.add("square");
    sqaure.style.width = dimensionOfSquare + "px";
    sqaure.style.height = dimensionOfSquare + "px";
    if (i % 2 === 0) sqaure.style.backgroundColor = "#aad751";
    else sqaure.style.backgroundColor = "#a2d149";

    playground.appendChild(sqaure);
  }
}
