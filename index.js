const Word = require("./Word.js")

const inquirer = require("inquirer");

const possibleWordsArr = ["baboon", "elephant", "skating"];


var gameLogic = function() {
    var possibleLettersHash = {a:true,b:true,c:true,d:true,e:true,f:true,g:true,h:true,i:true,j:true,k:true,l:true,m:true,n:true,o:true,p:true,q:true,r:true,s:true,t:true,u:true,v:true,w:true,x:true,y:true,z:true};
    var guessedLettersHash = {a:false,b:false,c:false,d:false,e:false,f:false,g:false,h:false,i:false,j:false,k:false,l:false,m:false,n:false,o:false,p:false,q:false,r:false,s:false,t:false,u:false,v:false,w:false,x:false,y:false,z:false};
    
    remainingGuesses = 7;
    gameWord = new Word(possibleWordsArr[0]);
    console.log(gameWord);

    // const promptLoop = function() {

        const inquirerLogic = inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'userGuess',
                    message: "Please choose a letter:",
                    validate: function validateUserGuess(userGuess) {
                        userGuess = userGuess.toLowerCase();
                        
                        if (possibleLettersHash[userGuess] && !guessedLettersHash[userGuess]) {
                            gameWord.wordGuess(userGuess);
                            console.log(gameWord.displayWordStatus());
                            guessedLettersHash[userGuess] = true;

                            
                            console.log("\nCORRECT! Guess again\n");
                            // promptLoop();

                        } else if (possibleLettersHash[userGuess] && guessedLettersHash[userGuess]) {
                            console.log("\nREPEATED GUESS - That letter has already been guessed.\n")
                        } else {
                            console.log("\nINVALID GUESS - guesses can only be a single letter A - Z.\n")
                        }
                    }
                }


            ]).then(answers => {
                if (answers.confirm) {
                    console.log("WOW!")
                }
            })
    // }
    // promptLoop();
}

gameLogic();






// newWord = new Word("maybea");

// newWord.wordGuess("a");
// newWord.wordGuess("m");

// console.log(newWord.displayWordStatus());

