const LEFT = "LEFT";
const RIGHT = "RIGHT";
const UP = "UP";
const DOWN = "DOWN";

const playground = document.getElementById("playground");
const snake = document.getElementById("snake");
const widthOfSquare = playground.clientWidth / 17;
let intervals = [];

let snakeWidth = 3;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  moveSnakePos(RIGHT);
  changeSnakeSize();
  createSquares();
});

document.addEventListener("keydown", (e) => {
  const key = e.key;

  switch (key) {
    case "d":
      moveSnakePos(RIGHT);
      break;
    case "a":
      moveSnakePos(LEFT);
      break;
  }
});

function clearIntervals() {
  intervals.forEach(clearInterval);
  intervals = [];
}

function moveSnakePos(direction) {
  switch (direction) {
    case LEFT:
      moveSnakeLeft();
      break;
    case RIGHT:
      moveSnakeRight();
      break;
  }
}

function moveSnakeLeft() {
  clearIntervals();

  const interval_id = setInterval(() => {
    console.log(interval_id);
    const snakePos = snake.getBoundingClientRect().left;

    snake.style.left = snakePos - widthOfSquare + "px";

    if (
      snake.getBoundingClientRect().left - widthOfSquare <=
      playground.getBoundingClientRect().left
    ) {
      clearIntervals();
      return;
    }
  }, 1000);

  intervals.push(interval_id);
}

function moveSnakeRight() {
  clearIntervals();

  const interval_id = setInterval(() => {
    const snakePos = snake.getBoundingClientRect().left;

    snake.style.left = snakePos + widthOfSquare + "px";
    if (
      snake.getBoundingClientRect().right + widthOfSquare >=
      playground.getBoundingClientRect().right
    ) {
      clearIntervals();
      return;
    }
  }, 1000);
  intervals.push(interval_id);
}

function changeSnakeSize() {
  snake.style.width = snakeWidth * widthOfSquare + "px";
  snake.style.height = widthOfSquare + "px";
}

function createSquares() {
  for (let i = 0; i < 17 * 17; i++) {
    const sqaure = document.createElement("div");
    sqaure.classList.add("square");
    sqaure.style.width = widthOfSquare + "px";
    if (i % 2 === 0) sqaure.style.backgroundColor = "#aad751";
    else sqaure.style.backgroundColor = "#a2d149";

    playground.appendChild(sqaure);
  }
}
