const LEFT = "LEFT";
const RIGHT = "RIGHT";
const UP = "UP";
const DOWN = "DOWN";
const speedInMs = 500;

const playground = document.getElementById("playground");
const container = document.getElementById("container");
const snake = document.getElementById("snake");
const dimensionOfSquare = playground.clientWidth / 17;

let timeSinceLastMove;

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

let snakeSize = 3;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  changeSnakeSize();
  createSquares();
  spawnApple();
  checkIfAppleFound();
  snakeRight();
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

function isMoveDownSlowEnoguh() {
  console.log(Date.now() - timeSinceLastMove >= 500);
  return Date.now() - timeSinceLastMove >= 500;
}

function checkIfAppleFound() {
  if (!apple) return;

  interval = setInterval(() => {
    if (isAppleFound()) {
      snakeSize++;
      spawnApple();
    }
  }, speedInMs - 50);
}

function isAppleFound() {
  return (
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
  );
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

  const interval_id = setInterval(() => {
    onceRight();
    if (
      snake.getBoundingClientRect().right + dimensionOfSquare >=
      playground.getBoundingClientRect().right
    ) {
      clearIntervals();
      return;
    }
  }, speedInMs);
  intervals.push(interval_id);
}
function onceRight() {
  const snakePos = snake.getBoundingClientRect().left;
  timeSinceLastMove = Date.now();

  snake.style.left = snakePos + dimensionOfSquare + "px";
  addSnakePrev();
}

function snakeLeft() {
  clearIntervals();

  const interval_id = setInterval(() => {
    onceLeft();
    if (
      snake.getBoundingClientRect().left - dimensionOfSquare <=
      playground.getBoundingClientRect().left
    ) {
      clearIntervals();
      return;
    }
  }, speedInMs);
  intervals.push(interval_id);
}

function onceLeft() {
  const snakePos = snake.getBoundingClientRect().left;
  timeSinceLastMove = Date.now();

  snake.style.left = snakePos - dimensionOfSquare + "px";
  addSnakePrev();
}

function snakeUp() {
  clearIntervals();

  const interval_id = setInterval(() => {
    onceUp();
    if (
      snake.getBoundingClientRect().top - dimensionOfSquare <=
      playground.getBoundingClientRect().top
    ) {
      clearIntervals();
      return;
    }
  }, speedInMs);
  intervals.push(interval_id);
}

function onceUp() {
  const snakePos = snake.getBoundingClientRect().top;
  timeSinceLastMove = Date.now();

  snake.style.top = snakePos - dimensionOfSquare + "px";
  addSnakePrev();
}

function snakeDown() {
  clearIntervals();
  //renderTail();
  const interval_id = setInterval(() => {
    onceDown();

    if (
      snake.getBoundingClientRect().top + dimensionOfSquare >=
      playground.getBoundingClientRect().bottom
    ) {
      clearIntervals();
      return;
    }
  }, speedInMs);
  intervals.push(interval_id);
}

function onceDown() {
  const snakePos = snake.getBoundingClientRect().top;
  timeSinceLastMove = Date.now();

  snake.style.top = snakePos + dimensionOfSquare + "px";
  addSnakePrev();
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

    left = leftBound + getRandomInt(16) * dimensionOfSquare + "px";
    top = topBound + getRandomInt(16) * dimensionOfSquare + "px";

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
