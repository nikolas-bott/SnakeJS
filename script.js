const LEFT = "LEFT";
const RIGHT = "RIGHT";
const UP = "UP";
const DOWN = "DOWN";
const moveSpeedInMS = 500;

const playground = document.getElementById("playground");
const container = document.getElementById("container");
const snake = document.getElementById("snake");
const dimensionOfSquare = playground.clientWidth / 17;

let apple;
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
  spawnApple();
  checkIfAppleFound();
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

function inBound(a, b, bound) {
  return (a - bound < b && a + bound > b) || (b - bound < a && b + bound > a);
}

function checkIfAppleFound() {
  if (!apple) return;

  interval = setInterval(() => {
    console.log(
      Math.round(snake.getBoundingClientRect().left) - 1,
      Math.round(apple.getBoundingClientRect().left),
      Math.round(snake.getBoundingClientRect().top) + 1,
      Math.round(apple.getBoundingClientRect().top)
    );

    if (
      inBound(
        snake.getBoundingClientRect().left,
        apple.getBoundingClientRect().left,
        dimensionOfSquare / 5
      ) &&
      inBound(
        snake.getBoundingClientRect().top,
        apple.getBoundingClientRect().top,
        dimensionOfSquare / 5
      )
    ) {
      spawnApple();
    }
  }, moveSpeedInMS);
}

function clearIntervals() {
  intervals.forEach(clearInterval);
  intervals = [];
}

function renderTail() {
  for (let i = 1; i < prevPositions.length; i++) {
    renderSingleTail(i);
  }
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
  }, moveSpeedInMS);
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
  }, moveSpeedInMS);
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
  }, moveSpeedInMS);
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
  }, moveSpeedInMS);
  intervals.push(interval_id);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

function spawnApple() {
  if (apple) apple.remove();
  const leftBound = playground.getBoundingClientRect().left;
  const topBound = playground.getBoundingClientRect().top;

  apple = document.createElement("div");
  apple.style.height = dimensionOfSquare + "px";
  apple.style.width = dimensionOfSquare + "px";
  apple.classList.add("apple");
  container.append(apple);

  let index = 0;
  let left;
  let top;

  do {
    if (index > 1000) {
      console.log("Reached 1000 loops in do-while");
      break;
    }

    left = leftBound + getRandomInt(17) * dimensionOfSquare + "px";
    top = topBound + getRandomInt(17) * dimensionOfSquare + "px";

    console.log(left);
    index++;
  } while (
    prevPositions.some(
      (pos) =>
        Math.round(left) === Math.round(pos.left) ||
        Math.round(top) === Math.round(pos.top)
    )
  );

  apple.style.left = left;
  apple.style.top = top;
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
