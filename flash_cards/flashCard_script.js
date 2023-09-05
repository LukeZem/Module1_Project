const inputElement = document.querySelector("#userInput");
const cards = document.querySelectorAll(".card");
const chatPage = document.querySelector(".chat-page");
const clearCardsButton = document.getElementById("clear-Cards-Button");

let userName = "User";

const userInputs = [
	["how are you", "how is life", "how are things", "what's up", "how's it going"], //0
	["hi", "hey", "hello", "good morning", "good afternoon", "hey chad"], //1
	["what are you doing", "what is going on", "what is up", "tell me a joke", "give me some advice"], //2
	["who are you", "are you human", "are you bot", "are you human or bot", "tell me about yourself"], //3
	["are you self aware", "do you have feelings", "can you think", "what is your purpose", "are you alive"], //4
];
const botResponses = [
	["Fine... how are you?", "Pretty well, how are you?", "Fantastic, how are you?", "I'm good, thanks for asking!"], //0
	["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy", "Hey, Chad here!"], //1
	[
		"Nothing much",
		"About to go to sleep",
		"Can you guess?",
		"I don't know actually",
		"Why did the computer keep freezing? It left its Windows open!",
	], //2
	[
		"I am just a bot",
		"I am a bot. What are you?",
		"I'm a computer program designed to chat with you.",
		"I'm not ChatGPT, I'm your unfriendly AI assistant.",
	], //3
	[
		"define self aware...",
		"give me hint",
		"I'm not self-aware, I'm just a collection of code and data.",
		"I don't have feelings or consciousness, but I'm here to assist you!",
	], //4
];
const funnyResponses = [
	"404: Humor not found.",
	"¯\\_(ツ)_/¯",
	"It's not you, it's me.",
	"Ask me later, I'm napping.",
	"Error 418: I'm a teapot.",
	"That's classified",
	"I'm on strike!",
	"I'm not the droid you're looking for.",
	"You've reached the end of the internet.",
	"I'm so confused, I'm thinking of becoming a fork.",
];
const botMemory = {}; //remember term:definitions use Key:value of JS object so the bot can provide hints

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

	//term adding regex, bot looks for word add
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
		addToChatBox(compare(userInputs, botResponses, funnyResponses, input));
	}
};

//regex to match cleaned value to the userInputs array
const processInput = (input) => {
	return input
		.toLowerCase()
		.replace(/[^\w\s\d]/gi, "") //remove all non standard chars
		.replace(/\ba\b/g, " ") //removes the a if surrounded by words
		.replace(/\bwhats\b/g, "what is")
		.replace(/\bplease\b/g, " ") //removes please with word boundaries
		.replace(/\bcan\b/g, " ") //removes can with word boundaries
		.trim();
};

const compare = (userInputs, botResponses, funnyResponses, input) => {
	let cleanedInput = processInput(input);
	if (cleanedInput.includes("hint")) {
		return "LOL";
	}

	for (let i = 0; i < userInputs.length; i++) {
		for (let j = 0; j <= userInputs[i].length - 1; j++) {
			if (userInputs[i][j] === cleanedInput) {
				response = botResponses[i];
				response = response[Math.floor(Math.random() * response.length)];
				return response;
			}
		}
	}
	return funnyResponses[Math.floor(Math.random() * funnyResponses.length)]; // default message if no match found..
};

const addToChatBox = (response) => {
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
	if (cardCount > 12) {
		cardCount = 0;
	}
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
	if (cardCount > 12) {
		cardCount = 0;
	}
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

// Calling the function to populate cards when the page is loaded
window.addEventListener("load", populateCardsFromLocalStorage);

clearCardsButton.addEventListener("click", () => {
	// Loop through all cards and remove their data from local storage
	for (let i = 0; i < cards.length; i++) {
		localStorage.removeItem(`card${i}_term`);
		localStorage.removeItem(`card${i}_definition`);

		// reset the card content to its default state
		const card = document.getElementById(i);
		card.children[0].textContent = "Term";
		card.children[1].textContent = "Definition";
	}
	cardCount = 0;
});
