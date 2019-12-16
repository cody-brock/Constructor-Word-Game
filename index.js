const Word = require("./Word.js");
const chalk = require("chalk");

const inquirer = require("inquirer");

const possibleWordsArr = ["baboon", "elephant", "skating", "baseball", "basketball", "crickets", "surprises", "hangman", "lollipop", "garden", "guerilla", "plant", "shovel", "redwood", "fencing", "sofa", "television", "orchid", "lava"];

const randomNumberGenerator = function() {
    return Math.floor(Math.random() * Math.floor(possibleWordsArr.length));
}

var gameLogic = function() {
    var possibleLettersHash = {a:true,b:true,c:true,d:true,e:true,f:true,g:true,h:true,i:true,j:true,k:true,l:true,m:true,n:true,o:true,p:true,q:true,r:true,s:true,t:true,u:true,v:true,w:true,x:true,y:true,z:true};
    var guessedLettersHash = {a:false,b:false,c:false,d:false,e:false,f:false,g:false,h:false,i:false,j:false,k:false,l:false,m:false,n:false,o:false,p:false,q:false,r:false,s:false,t:false,u:false,v:false,w:false,x:false,y:false,z:false};
    
    remainingGuesses = 7;
    randomNumber = randomNumberGenerator()
    gameWord = new Word(possibleWordsArr[randomNumber]);
    // console.log(gameWord);

    const promptLoop = function() {

        const inquirerLogic = inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'userGuess',
                    message: "Guess a letter!",
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

                gameWord.wordGuess(answers.userGuess);

                if (guessedLettersHash[answers.userGuess]) {
                    console.log(chalk.red("\nALREADY GUESSED!!!\n"));
                } else if (gameWord.wordGuess(answers.userGuess)) {
                    console.log(chalk.green("\nCORRECT!!!\n"));
                } else if (!gameWord.wordGuess(answers.userGuess)) {
                    remainingGuesses--;
                    console.log(chalk.red(`\nINCORRECT!!!\n\n`) + chalk.white(`${remainingGuesses} guesses remaining!!!\n`));
                }

                if (remainingGuesses <=0) {
                    console.log(chalk.red.inverse("YOU LOSE!"))
                    replay();
                }

                guessedLettersHash[answers.userGuess] = true;
                console.log(gameWord.displayWordStatus() + "\n");

                let remainingLetters = true;
                for (let i = 0; i < gameWord.wordArr.length; i++) {
                    if (!gameWord.wordArr[i].guessed) {
                        remainingLetters = false;
                    }
                }

                if (remainingLetters) {
                    console.log(chalk.green.inverse("WINNER!"))
                    replay();
                } else {
                    promptLoop();
                }
            
            })
    }
    promptLoop();
}

const replay = function() {
    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'playAgain',
                message: 'Would you like to play again?'
            }
        ]).then(answers => {
            if (answers.playAgain) {
                gameLogic();
            } else {
                console.log("Thanks for playing!")
                return;
            }
        })
}

gameLogic();
