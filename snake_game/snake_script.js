const gameBoard = document.querySelector(".game-board");
const controls = document.querySelectorAll(".key-controls div");
const scoreEl = document.querySelector(".score");
const highScoreEl = document.querySelector(".high-score");

let foodX = 13,
	foodY = 10;
let snakeX = 15,
	snakeY = 15;
let speedX = 0,
	speedY = 0;
let gameOver = false;
let setIntervalId;
let snakeBody = [];
let score = 0;
let highscore = 0;
let GameStarted = false;

//changes the position of the food square
const changeFoodPosition = () => {
	foodX = Math.floor(Math.random() * 30 + 1);
	foodY = Math.floor(Math.random() * 30 + 1);

	// Recursively change food position if it starts the same as the snake head
	if (foodX === snakeX && foodY === snakeY) {
		changeFoodPosition();
	}
};

//create local storage for highscore and display
highscore = localStorage.getItem("high-score") || 0;
highScoreEl.innerHTML = `High Score: ${highscore}`;

//movement han
const changeDirection = (e) => {
	if (e.key === "ArrowUp" && speedY != 1) {
		speedX = 0;
		speedY = -1;
	} else if (e.key === "ArrowDown" && speedY != -1) {
		speedX = 0;
		speedY = 1;
	} else if (e.key === "ArrowRight" && speedX != -1) {
		speedX = 1;
		speedY = 0;
	} else if (e.key === "ArrowLeft" && speedX != 1) {
		speedX = -1;
		speedY = 0;
	}
};

//enabling directional key controls for snake
controls.forEach((key) => {
	key.addEventListener("click", () => {
		const keyCode = key.getAttribute("data-key");
		changeDirection({ key: keyCode }); // Simulate the event object for changeDirection
	});
});

//GAME OVER HANDLER
const gameOverHandler = () => {
	clearInterval(setIntervalId);
	alert("GAME OVER! press OK to try again");
	location.reload();
};

const initGame = () => {
	//console.log(snakeX, snakeY);
	if (gameOver) {
		return gameOverHandler();
	}
	//create HTML marup for the food
	let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

	// Move the snake head based on user input
	snakeX += speedX;
	snakeY += speedY;

	//check if snake got the food here.....
	if (foodX === snakeX && foodY === snakeY) {
		changeFoodPosition();
		score++;
		scoreEl.innerHTML = `Score: ${score}`;
		highscore = score >= highscore ? score : highscore;
		highScoreEl.innerHTML = `High Score: ${highscore}`;
		localStorage.setItem("high-score", highscore);
	} else {
		snakeBody.shift();
	}

	// Check for collisions or edge cases here...
	if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
		return (gameOver = true);
	}
	snakeBody.forEach((subArray) => {
		if (snakeY === subArray[0] && snakeX === subArray[1]) {
			gameOver = true;
		}
	});

	//setting snake body to current position
	console.log(snakeBody);
	snakeBody.push([snakeY, snakeX]);

	// Create the HTML markup for the snake head
	htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;

	snakeBody.forEach((subArray, index) => {
		htmlMarkup += `<div class="snake-body" style="grid-area: ${subArray[0]} / ${subArray[1]}"></div>`;
	});

	// Update the game board with the new markup
	gameBoard.innerHTML = htmlMarkup;
};
// Randomize food position
changeFoodPosition();

// Repeat the game loop using setInterval and control snake speed
setIntervalId = setInterval(initGame, 200); // delay in milliseconds

// Listen for keyboard input
document.addEventListener("keydown", changeDirection);
