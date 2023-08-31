const inputElement = document.querySelector("#userInput");
const cards = document.querySelectorAll(".card");

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
const botMemory = {};

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
	// console.log(e);
	if (e.code === "Enter") {
		// console.log("Enter pressed");
		let input = inputElement.value;
		inputElement.value = "";
		output(input);
		// console.log(output(input));
	}
});

const output = (input) => {
	let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

	text = text
		.replace(/ a /g, " ")
		.replace(/whats/g, "What is")
		.replace(/please /g, "")
		.replace(/ please/g, "");
	//need to add more delimiter regex...

	// implementation of chatbot response...

	console.log("return of compare function: ", compare(userInputs, botResponses, text));
	//testing regex output
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

/**function to change flash card front/back content based on selection
 * This function will likely have to be called inside the output function
 */
