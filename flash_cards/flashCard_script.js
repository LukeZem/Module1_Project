const inputElement = document.querySelector("#userInput");
const cards = document.querySelectorAll(".card");
const chatPage = document.querySelector(".chat-page");
const clearCardsButton = document.getElementById("clearCardsButton");

let userName = "User";
const topicChoice = ["psychology", "Cybersecurity", "Computer Science"];
const topicBotResponses = ["Psychology is it!", "Alright, just don't hack me!", "Computer what???"];
const userInputs = [
	["how are you", "how is life", "how are things"], //0
	["hi", "hey", "hello", "good morning", "good afternoon"], //1
	["what are you doing", "what is going on", "what is up"], //2
	["who are you", "are you human", "are you bot", "are you human or bot"], //3
	["are you self aware"], //4
];
const botResponses = [
	["Fine... how are you?", "Pretty well, how are you?", "Fantastic, how are you?"], //0
	["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"], //1
	["Nothing much", "About to go to sleep", "Can you guess?", "I don't know actually"], //2
	["I am just a bot", "I am a bot. What are you?"], //3
	["define self aware..."], //4
];
const botDefaults = [];
const botMemory = [[], []];

//flipping the flash card when clicked
let prevCardIndex; //keep track of previous card so it can be unflipped when next card is clicked
cards.forEach((card, index) => {
	card.addEventListener("click", () => {
		prevCardIndex = index;
		card.classList.toggle("flipped");
	});
});

//
inputElement.addEventListener("keydown", (e) => {
	if (e.code === "Enter") {
		let input = inputElement.value;
		inputElement.value = "";
		output(input);
	}
});

const output = (input) => {
	let term = "";
	let definition = "";
	//adding the term for the front of the card
	//Regex searchs for "add" then aggregates everything that follows

	//term adding
	const termRegex = /add\s+(.+)/gi;
	const termInput = input.replace(termRegex, (match, capturedText) => {
		console.log("Captured Text:", capturedText);
		term = capturedText;
		console.log("Captured Text:", term);
	});
	if (input.includes("term")) {
		addToFrontCard(term);
	}

	//definition adding
	const definitionRegex = /add\s+(.+)/gi;
	const definitionInput = input.replace(definitionRegex, (match, capturedText) => {
		console.log("Captured Text:", capturedText);
		definition = capturedText;
		console.log("Captured Text:", definition);
	});
	if (input.includes("definition")) {
		addToBackCard(definition);
	}

	//if user just wants to talk to the BOT
	if (!input.includes(":")) {
		let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
		text = text
			.replace(/ a /g, " ")
			.replace(/whats/g, "What is")
			.replace(/please /g, "")
			.replace(/ please/g, "");
		//need to add more delimiter regex...

		// implementation of chatbot response...
		addToChatBox(text, compare(userInputs, botResponses, text));

		//bot memory
	}
};

/**
 *
 * @param {Array} userInputs
 * @param {Array} botResponses
 * @param {user input} string
 * @returns response // default response if necessary
 */
const compare = (userInputs, botResponses, string) => {
	let response;
	for (let i = 0; i < userInputs.length; i++) {
		for (let j = 0; j <= userInputs[i].length - 1; j++) {
			if (userInputs[i][j] === string) {
				response = botResponses[i];
				response = response[Math.floor(Math.random() * response.length)];
			}
		}
	}
	return response || `Sorry I don't understand`; // default message if no match found..
};

const addToChatBox = (input, response) => {
	const messagesDiv = document.querySelector("#messages");
	messagesDiv.innerHTML = `<span class="response">${response}</span>`;
	// <span class="userText">${input}</span>
	// <span class="response">${response}</span>
	// `;
};

/**functions to change flash card front/back content based on selection
 * These functions will likely have to be called inside the output function
 */
let cardCount = 0;
let frontSet = false;
let backSet = false;
const addToFrontCard = (term) => {
	const card = document.getElementById(cardCount);
	card.children[0].textContent = term;
	localStorage.setItem(`card${cardCount}_term`, term);
	frontSet = true;
	if (backSet === true) {
		cardCount++;
		frontSet = false;
	}
};
const addToBackCard = (definition) => {
	const card = document.getElementById(cardCount);
	card.children[1].textContent = definition;
	localStorage.setItem(`card${cardCount}_definition`, definition);
	backSet = true;
	if (frontSet === true) {
		cardCount++;
		backSet = false;
	}
};

// Function to populate cards from local storage
const populateCardsFromLocalStorage = () => {
	for (let i = 0; i < cards.length; i++) {
		const term = localStorage.getItem(`card${i}_term`);
		const definition = localStorage.getItem(`card${i}_definition`);

		if (term && definition) {
			const card = document.getElementById(i);
			card.children[0].textContent = term;
			card.children[1].textContent = definition;
		}
	}
};

// Call the function to populate cards when the page is loaded
window.addEventListener("load", populateCardsFromLocalStorage);

clearCardsButton.addEventListener("click", () => {
	// Loop through all cards and remove their data from local storage
	for (let i = 0; i < cards.length; i++) {
		localStorage.removeItem(`card${i}_term`);
		localStorage.removeItem(`card${i}_definition`);

		// Optionally, you can reset the card content to its default state
		const card = document.getElementById(i);
		card.children[0].textContent = "Front Content";
		card.children[1].textContent = "Back Content";
	}
});
