var fs = require('fs');


const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


var randomWord = words[Math.floor(Math.random() * words.length)];


function makeDashes(swArray) {
	var dashArray = [];
	for (i = 0; i < swArray.length; i++) {
		dashArray.push('_ ');
	}
	return dashArray;
};


// check to see if guess is repeat letter
function isNew(letter, string) {
	let repeatGuess = false;
	if (string === '') {
		repeatGuess = false;
	} else {
		for (let i = 0; i < string.length; i++) {
			if (letter === string.charAt(i)) {
				repeatGuess = true;
				break;
			}
		}
	}
	return repeatGuess;
}


function checkLetter(req, string, wordArray){
  let chosenLetter = string;
  let count = 0;
  if(chosenLetter.length === 1){
    let letterCheck = wordArray.stringArr.find(function(lett){
      if(lett.letter === chosenLetter){
        lett.letterGuess = chosenLetter;
        req.session.failed = false;
      }
      else{
        count = count + 1;
      }
    });
    /
    if(count === wordArray.stringArr.length){
      req.session.failed = true;
    }
  }
  let countCorrectLetters = 0;
  for(let i = 0; i < wordArray.stringArr.length;i++){

    if(wordArray.stringArr[i].letter === wordArray.stringArr[i].letterGuess){
      countCorrectLetters = countCorrectLetters + 1;
    }
  }
  if(countCorrectLetters === wordArray.stringArr.length){
    req.session.youWon = true;
  }

  return req.session
}
function checkGuess(req, string, wordArray) {

}

module.exports = {
	makeD: makeDashes,
	isNewLetter: isNew,
	randomWord: randomWord
}
