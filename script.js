const LEFT = "LEFT";
const RIGHT = "RIGHT";
const UP = "UP";
const DOWN = "DOWN";

const playground = document.getElementById("playground");
const container = document.getElementById("container");
const snake = document.getElementById("snake");
const widthOfSquare = playground.clientWidth / 17;
let movesRight = true;
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
    case "w":
      moveSnakePos(UP);
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
    case UP:
      moveSnakeUp();
  }
}

function moveSnakeUp() {
  clearIntervals();

  snake.style.width = widthOfSquare + "px";
  snake.style.height = widthOfSquare + "px";

  let i = 1;

  renderTempSnake();

  if (movesRight) {
    snake.style.left =
      snake.getBoundingClientRect().left + 2 * widthOfSquare + "px";
  }

  const interval_id = setInterval(() => {
    if (snakeWidth > i - 1) {
      snake.style.height = i * widthOfSquare + "px";
    }

    const snakePos = snake.getBoundingClientRect().top;

    snake.style.top = snakePos - widthOfSquare + "px";

    i++;
  }, 1000);

  intervals.push(interval_id);
}

function renderTempSnake() {
  const tempSnake = document.createElement("div");
  container.appendChild(tempSnake);

  tempSnake.classList.add("tempSnake");

  tempSnake.style.top = snake.getBoundingClientRect().top + "px";
  tempSnake.style.left = snake.getBoundingClientRect().left + "px";
  tempSnake.style.width = snakeWidth * widthOfSquare + "px";
  tempSnake.style.height = widthOfSquare + "px";

  let i = 1;

  const interval_id = setInterval(() => {
    if (snakeWidth > i - 1) {
      tempSnake.style.width = (snakeWidth - i) * widthOfSquare + "px";

      if (movesRight) {
        tempSnake.style.left =
          tempSnake.getBoundingClientRect().left + widthOfSquare + "px";
      }
    } else {
      clearInterval(interval_id);
    }
    i++;
  }, 1000);
}

function moveSnakeLeft() {
  clearIntervals();
  movesRight = false;

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
  movesRight = true;

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
  snake.style.top = 10 * widthOfSquare + "px";
}

function createSquares() {
  for (let i = 0; i < 17 * 17; i++) {
    const sqaure = document.createElement("div");
    sqaure.classList.add("square");
    sqaure.style.width = widthOfSquare + "px";
    sqaure.style.height = widthOfSquare + "px";
    if (i % 2 === 0) sqaure.style.backgroundColor = "#aad751";
    else sqaure.style.backgroundColor = "#a2d149";

    playground.appendChild(sqaure);
  }
}
