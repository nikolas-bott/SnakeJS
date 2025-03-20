const LEFT = "LEFT";
const RIGHT = "RIGHT";
const UP = "UP";
const DOWN = "DOWN";

const playground = document.getElementById("playground");
const snake = document.getElementById("snake");
const widthOfSquare = playground.clientWidth / 17;
let moveLeftInterval;

let snakeWidth = 3;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  moveSnakePos(LEFT);
  changeSnakeSize();
  createSquares();
});

document.addEventListener("keydown", (e) => {
  const key = e.key;

  switch (key) {
    case "d":
  }
});

function moveSnakePos(direction) {
  const interval = setInterval(() => {
    const snakePos = snake.getBoundingClientRect().left;

    switch (direction) {
      case LEFT:
        snake.style.left = snakePos - widthOfSquare + "px";
        break;
      case RIGHT:
        snake.style.left = snakePos + widthOfSquare + "px";
        break;
      case UP:
        snake.style.top = snakePos - widthOfSquare + "px";
        break;
      case DOWN:
        snake.style.top = snakePos + widthOfSquare + "px";
        break;
    }
  }, 1000);
}

function moveSnakeLeft() {
  moveLeftInterval = setInterval(() => {
    const snakePos = snake.getBoundingClientRect().left;

    snake.style.left = snakePos - widthOfSquare + "px";
  }, 1000);
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
