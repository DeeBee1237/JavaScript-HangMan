var chances = 5;
var NumberOfCorrectGuesses = 0;
var hasEnteredWord = 0;
var wordToGuess = "";
var indexesOfCorrectlyGuessedLetters = [];

var boxes = []; 


var wordInputField = document.getElementById("wordInput");
var finalizeWordButton =  document.getElementById("submitWord");

finalizeWordButton.addEventListener("click",generateGuessDisplay);


function generateGuessDisplay () {

	if (wordInputField.value.trim().length == 0)
		return;
	// if the player has already entered the word that they want the other player to guess, then
	// do not reset the word to be guessed:
	if (hasEnteredWord == 1)
		return;

	var wordGuessingParagraph = document.getElementById("guessWord");
	for (var i = 0; i < wordInputField.value.length; i++) {
		var inputBox = document.createElement("input");
		inputBox.size = 4;
		addKeyListenerForSingleLetterGuess(inputBox,i);
		wordGuessingParagraph.appendChild(inputBox);
		boxes.push(inputBox);
	}

	wordToGuess = wordInputField.value;
	wordInputField.value = "";
	hasEnteredWord = 1;

	var guessLetterParagraph = document.getElementById("guessLetter");
	var guessLetterInput = document.createElement("input");
	guessLetterInput.placeholder = "guess letter";
	addKeyListenerForMultiLetterGuess(guessLetterInput);
	guessLetterParagraph.appendChild(guessLetterInput);
}

function addKeyListenerForSingleLetterGuess (inputBox,position) {
	inputBox.addEventListener('keypress',function (e) {
		if (e.which == 13) {
			checkGuess(inputBox,position);
			updateGuessInformationDisplay();
		} 
	}); 
}

function addKeyListenerForMultiLetterGuess (inputBox) {
	inputBox.addEventListener("click", function () {inputBox.value = "";});
	inputBox.addEventListener ('keypress',function (e) {
		if (e.which == 13) {
			checkLetter(inputBox.value);
		} 
	});
}

function checkLetter (letter) {
	if (wordToGuess.indexOf(letter) == -1) {
		chances--;
		updateGuessInformationDisplay();
		return;
	}
	for (var i = 0; i < boxes.length; i++) {
		if (wordToGuess[i] == letter) {
			if (indexesOfCorrectlyGuessedLetters.indexOf(i) != -1)
				continue;
			NumberOfCorrectGuesses++;
			indexesOfCorrectlyGuessedLetters.push(i);
			var box = boxes[i];
			box.value = letter;
			box.readOnly = true;
		}
	}

	updateGuessInformationDisplay();
}


function checkGuess (inputBox, position) {
	var text = inputBox.value;

	// is the guess wrong ?
	if (wordToGuess.charAt(position) != text) {
		inputBox.value = ""
		chances--;
		return;
	}

	// if not, then the guess was right:
	else {
		inputBox.readOnly = true;
		NumberOfCorrectGuesses++;
		indexesOfCorrectlyGuessedLetters.push(position);
	}
}

function updateGuessInformationDisplay () {

	var correctGuessesVariable = document.getElementById("numberOfCorrectGuesses");
	var chancesLeftVariable = document.getElementById("numberOfChances");


	correctGuessesVariable.innerHTML = NumberOfCorrectGuesses;
	chancesLeftVariable.innerHTML = chances;

	if (chances == 0) 
		alert("You Lost. GAME OVER!!");
	if (NumberOfCorrectGuesses == wordToGuess.length)
		alert("Well done! You have won the game");

}






