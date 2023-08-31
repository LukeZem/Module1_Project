const inputElement = document.querySelector("#userInput");

let userName = "User";
const userInputs = [];
const botResponses = [];

inputElement.addEventListener("keydown", (e) => {
	// console.log(e);
	if (e.code === "Enter") {
		// console.log("Enter pressed");
		let input = inputElement.value;
		inputElement.value = "";
		output(input);
		console.log(output(input));
	}
});

const output = (input) => {
	let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

	text = text
		.replace(/ a /g, " ")
		.replace(/whats/g, "What is")
		.replace(/please /g, "")
		.replace(/ please/g, "");

	// implementation of chatbot response...

	//testing regex output
	console.log(text);
};

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
