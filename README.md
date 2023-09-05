# Module1_Project
This project is in two parts. There is a game _Classic Snake_, then there is a webapp, _Flashy Flash Cards_ thats allows you to create flash cards for studying via interaction with a chatbot.

## Motivation
The motivation of this project was to learn how to manipulate the DOM using Javacript to create functional and interactive web applications. 
The flash cards web app was inspired by a lack of similar applicaitons being available out there on the market. It also allowed me to get practice creating a bot
that utilizes very basic Natural Language Processing (NLP).

Build Status - Improvements to come...
--------------------------------------
Currently both the game and the webapp are functional. Though there are features I will be adding in later. <br /> <br />
**Classic Snake**: <br />
[ ] Add difficulty settings that can be choosen with different high scores being saved for the different levels<br />
**Flashy Flash Cards:** <br />
[ ]Improve the chat bot's NLP ability. <br />
[ ]Improve the functionality of the chatbot, allowing users to ask for specific cards to be changed. 

Code Style
-------------
The HTML, CSS, and JavaScript are all standard modern notation and syntax. The VS Code extention [_Prettier Code_](https://prettier.io/) was used for formating.

Approach
--------
1. Wireframe on paper of game board and flash card webapp
2. Research on how to implement different algorithms needed for projects
3. built HTML skeleton based on wireframe
4. Used CSS Grid and flexbox
5. Added styling iteratively as project went along

Tech/Framework used
-------------------
1. HTML
2. CSS
3. JavaScript       
5. bootstrap 5 (on the homepage navbar and modal only)

Code Example
-----------
**Here is an example of usign RegEx for the chat bot's very limited but functional NLP**
![image](https://github.com/LukeZem/Module1_Project/assets/102622914/a7a8a02b-862a-40c0-899a-cc7e9da2f3da) <br />

**Here is an example of how the code works for checking if the snake has collided with the food**
![image](https://github.com/LukeZem/Module1_Project/assets/102622914/56760236-1937-4c11-9a1b-cab2e1dda9b6) <br />

**Here is an example of how the game checks for game over collision conditions** <br />
Such as
1. Htting the game board wall
2. The snake hitting its own tail <br />
![image](https://github.com/LukeZem/Module1_Project/assets/102622914/e75fb94c-df8f-4910-9a9f-86067b3980cc)

Installation
-----------
**Browser dependent**
Go to this webpage [Module 1 Project](https://lukespage.com/MOD1_page.html)
1. In the top right cornor of the page click the blue open button and select the game you'd like to play.
2. Use the browser "back" arrow fucntionality to return to the homepage or click the link above again!

How To Use
---------
To start playing _Classic Snake_ simply press a direction on using your arrow keys

For _Flashy Flash Cards_ start by reading the instructions on the page itself. 
You interact with the chatbot to add terms and definitions to the cards which it will add iteratively, moving onto the next card when you've completed the previous one.
You also talk to the chatbot, but at this point this feature is very limited and will most likely end up getting the default responses, which come in the form of jokes ツ
