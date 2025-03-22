const LEFT = "LEFT";
const RIGHT = "RIGHT";
const UP = "UP";
const DOWN = "DOWN";
const speedInMs = 250;

const playground = document.getElementById("playground");
const container = document.getElementById("container");
const snake = document.getElementById("snake");
const score = document.getElementById("score");
const highscore = document.getElementById("highscore");
const dimensionOfSquare = playground.clientWidth / 17;

let timeSinceLastMove;

let apple_interval;
let timeouts = [];
let apple;
let snakeTail;
let snakeTails = [];
let secondSnakeTail;

let movingDirection = RIGHT;
let prevPositions = [
  {
    left: snake.getBoundingClientRect().left,
    top: 10 * dimensionOfSquare,
  },
];

let highscoreNumber = 0;
let foundApples = 0;
let snakeSize = 3;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  score.innerText = "Apples found: " + foundApples;
  highscore.innerText = "Highscore: " + highscoreNumber;

  changeSnakeSize();
  createSquares();
  spawnApple();
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
  return Date.now() - timeSinceLastMove >= speedInMs;
}

function checkIfAppleFound() {
  if (!apple) return;

  if (isAppleFound()) {
    snakeSize++;
    foundApples++;
    if (foundApples > highscoreNumber) {
      highscoreNumber = foundApples;
      highscore.innerText = "Highscore: " + highscoreNumber;
    }
    score.innerText = "Apples found: " + foundApples;
    spawnApple();
  }
}

function isAppleFound() {
  return (
    inBound(
      snake.getBoundingClientRect().left,
      apple.getBoundingClientRect().left,
      dimensionOfSquare / 3
    ) &&
    inBound(
      snake.getBoundingClientRect().top,
      apple.getBoundingClientRect().top,
      dimensionOfSquare / 3
    )
  );
}

function clearTimeouts() {
  timeouts.forEach(clearTimeout);
  timeouts = [];
}

function renderTail() {
  for (let i = 1; i < prevPositions.length - 1; i++) {
    renderSingleTail(i);
  }
}

function removeSnakeTails() {
  for (let i = 1; i < prevPositions.length; i++) {
    if (snakeTails[i]) snakeTails[i].remove();
  }
  snakeTails = [];
  prevPositions = [];
}

function renderSingleTail(index) {
  if (snakeTails[index]) snakeTails[index].remove();

  snakeTails[index] = document.createElement("div");
  console.log((index % 2) * 0.1 + 0.452);

  snakeTails[index].style.backgroundColor =
    "hsla(260, 75%, 50%, " + ((index % 2) * 0.05 + 0.452) + ")";

  snakeTails[index].style.top = snake.getBoundingClientRect().top + "px";
  snakeTails[index].style.left = snake.getBoundingClientRect().left + "px";
  snakeTails[index].style.width = dimensionOfSquare - 0.4 + "px";
  snakeTails[index].style.height = dimensionOfSquare - 0.4 + "px";
  snakeTails[index].classList.add("tempSnake");

  container.appendChild(snakeTails[index]);

  snakeTails[index].style.left = prevPositions[index].left + "px";
  snakeTails[index].style.top = prevPositions[index].top + "px";
}

function snakeRight() {
  clearTimeouts();

  let interval = speedInMs - (Date.now() - timeSinceLastMove);

  if (isMoveDownSlowEnoguh()) {
    interval = 0;
  }

  const timeout_id = setTimeout(() => {
    onceRight();
    snakeRight();
    if (
      snake.getBoundingClientRect().right >=
      playground.getBoundingClientRect().right
    ) {
      fail();
      return;
    }
  }, interval);

  timeouts.push(timeout_id);
}
function onceRight() {
  const snakePos = snake.getBoundingClientRect().left;

  snake.style.left = snakePos + dimensionOfSquare + "px";
  newMove();
}

function snakeLeft() {
  clearTimeouts();

  let interval = speedInMs - (Date.now() - timeSinceLastMove);

  if (isMoveDownSlowEnoguh()) {
    interval = 0;
  }

  const timeout_id = setTimeout(() => {
    onceLeft();
    snakeLeft();
    if (
      snake.getBoundingClientRect().left + dimensionOfSquare <=
      playground.getBoundingClientRect().left
    ) {
      fail();
      return;
    }
  }, interval);

  timeouts.push(timeout_id);
}

function onceLeft() {
  const snakePos = snake.getBoundingClientRect().left;

  snake.style.left = snakePos - dimensionOfSquare + "px";
  newMove();
}

function snakeUp() {
  clearTimeouts();

  let interval = speedInMs - (Date.now() - timeSinceLastMove);

  if (isMoveDownSlowEnoguh()) {
    interval = 0;
  }

  const timeout_id = setTimeout(() => {
    onceUp();
    snakeUp();
    if (
      snake.getBoundingClientRect().top + dimensionOfSquare <=
      playground.getBoundingClientRect().top
    ) {
      fail();
      return;
    }
  }, interval);

  timeouts.push(timeout_id);
}

function onceUp() {
  const snakePos = snake.getBoundingClientRect().top;

  snake.style.top = snakePos - dimensionOfSquare + "px";
  newMove();
}

function newMove() {
  timeSinceLastMove = Date.now();
  checkIfAppleFound();

  isSnakeColidingWithBody();
  addSnakePrev();
}

function snakeDown() {
  clearTimeouts();

  let interval = speedInMs - (Date.now() - timeSinceLastMove);

  if (isMoveDownSlowEnoguh()) {
    interval = 0;
  }

  const timeout_id = setTimeout(() => {
    onceDown();
    snakeDown();
    if (
      snake.getBoundingClientRect().bottom >=
      playground.getBoundingClientRect().bottom
    ) {
      fail();
      return;
    }
  }, interval);

  timeouts.push(timeout_id);
}

function onceDown() {
  const snakePos = snake.getBoundingClientRect().top;

  snake.style.top = snakePos + dimensionOfSquare + "px";
  newMove();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

function spawnApple() {
  if (apple) apple.remove();

  if (apple_interval) clearInterval(apple_interval);
  const leftBound = playground.getBoundingClientRect().left;
  const topBound = playground.getBoundingClientRect().top;

  //
  apple = document.createElement("img");
  // apple = document.createElement("div");

  apple.src = "./apple.png";
  apple.style.height = dimensionOfSquare + 5 + "px";
  apple.style.width = dimensionOfSquare + 5 + "px";
  apple.classList.add("apple");
  container.append(apple);

  apple_interval = setInterval(() => {
    apple.style.transform = "scale(1.5)"; // Enlarge for 500ms

    setTimeout(() => {
      apple.style.transform = "scale(1)"; // Reset after 500ms
    }, 500);
  }, 2000); // Repeat every 2 seconds

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
function isSnakeColidingWithBody() {
  const snakeLeft = snake.getBoundingClientRect().left;
  const snakeTop = snake.getBoundingClientRect().top;

  for (let i = 1; i < prevPositions.length; i++) {
    if (
      inBound(prevPositions[i].left, snakeLeft, dimensionOfSquare / 5) &&
      inBound(prevPositions[i].top, snakeTop, dimensionOfSquare / 5)
    ) {
      fail();
      console.log("Touching");
    }
  }
}

function fail() {
  snakeSize = 3;
  foundApples = 0;

  removeSnakeTails();

  score.innerText = "Apples found: " + foundApples;

  clearTimeouts();
  snake.style.top =
    playground.getBoundingClientRect().top + 7 * dimensionOfSquare + "px";
  snake.style.left = playground.getBoundingClientRect().left + "px";
  snakeRight();
  if (apple) apple.remove();
  spawnApple();
}

function changeSnakeSize() {
  snake.style.width = dimensionOfSquare + "px";
  snake.style.height = dimensionOfSquare + "px";
  snake.style.top =
    playground.getBoundingClientRect().top + 7 * dimensionOfSquare + "px";
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
