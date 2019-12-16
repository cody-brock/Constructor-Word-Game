var Letter = require("./letter.js")

class Word {
    constructor(word){
        this.wordArr = word.split("").map(letter => {return new Letter(letter)})
    }
}

Word.prototype.displayWordStatus = function() {

    let wordStr = [];
   
    for (let i = 0; i < this.wordArr.length; i++) {

        wordStr.push(this.wordArr[i].letterOrDash());

    }

    return(wordStr.join(" "));
}

Word.prototype.wordGuess = function(char) {
    let success = false;
    for (let i = 0; i < this.wordArr.length; i++) {

        if (this.wordArr[i].guess(char)) {
            this.wordArr[i].guessed = true;
            success = true;
        }
    }
    return success;
}


module.exports = Word;