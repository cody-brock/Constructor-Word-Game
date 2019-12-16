const Word = require("./Word.js")

const inquirer = require("inquirer");

const possibleWordsArr = ["baboon", "elephant", "skating"];


var gameLogic = function() {
    var possibleLettersHash = {a:true,b:true,c:true,d:true,e:true,f:true,g:true,h:true,i:true,j:true,k:true,l:true,m:true,n:true,o:true,p:true,q:true,r:true,s:true,t:true,u:true,v:true,w:true,x:true,y:true,z:true};
    var guessedLettersHash = {a:false,b:false,c:false,d:false,e:false,f:false,g:false,h:false,i:false,j:false,k:false,l:false,m:false,n:false,o:false,p:false,q:false,r:false,s:false,t:false,u:false,v:false,w:false,x:false,y:false,z:false};
    
    remainingGuesses = 7;
    gameWord = new Word(possibleWordsArr[0]);
    console.log(gameWord);

    const promptLoop = function() {

        const inquirerLogic = inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'userGuess',
                    message: "Please choose a letter:",
                    validate: function validateUserGuess(userGuess) {
                        userGuess = userGuess.toLowerCase();
                        if (!possibleLettersHash[userGuess]) {
                            console.log("\nINVALID GUESS - guesses can only be a single letter A - Z.\n");
                            return false;
                        } else {
                            return true;
                        }
                    }
                }


            ]).then(answers => {

                // gameWord.wordGuess(answers.userGuess);

                if (guessedLettersHash[answers.userGuess]) {
                    console.log("already guessed");
                } else if (gameWord.wordGuess(answers.userGuess)) {
                    console.log("Correct guess");
                } else if (!gameWord.wordGuess(answers.userGuess)) {
                    console.log("Incorrect guess");
                }

                console.log(gameWord.displayWordStatus());

                let remainingLetters = true;
                for (let i = 0; i < gameWord.wordArr.length; i++) {
                    if (!gameWord.wordArr[i].guessed) {
                        remainingLetters = false;
                    }
                }

                if (remainingLetters) {
                    console.log("WINNER!")
                } else {
                    promptLoop();
                }
            
            })
    }
    promptLoop();
}

gameLogic();
