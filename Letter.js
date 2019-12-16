class Letter {
    constructor(letter) {
        this.letter = letter;
        this.guessed = false;
    }
}

Letter.prototype.letterOrDash = function() {
    if (this.guessed) {
        return this.letter;
    } else if (!this.guessed) {
        return("_");
    }
}

Letter.prototype.guess = function(char) {
    if (char === this.letter) {
        return this.guessed = true;
    } else return false;
}

module.exports = Letter;

// var newLetter = new Letter("n");
// console.log(newLetter);
// console.log(newLetter.letterOrDash());
// // newLetter.guessed = true;
// // console.log(newLetter.letterOrDash());
// newLetter.guess("n");
// console.log(newLetter.letterOrDash());