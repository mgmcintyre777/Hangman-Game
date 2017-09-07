var game = startNewGame(); // This function down below just creates new hangman object and some console.log stuff 

document.onkeypress = function(event) {
  if(game.getGameState() == 0){
    var theKey = event.key.toLowerCase();
    if(game.isValidGuess(theKey)){
      game.guess(theKey);
      game.logToConsole();
    }
  } else {
    game = startNewGame();
  }
}     

function Hangman(word, guesses){ // Hangman Object
  this.word = word;
  this.guesses = guesses;
  this.guessed = new Array();
  this.stateMsg = ["enter a letter to guess >>", 
  "you win! (press any key to play again)", 
  "It was: " + this.word + ", you're dead, the crowd cheers. (press any key to play again)"];
  
  this.isValidGuess = function(letter){ // True if letter is a-z AND not already guessed
    return /[a-z]/.test(letter) && (this.guessed.indexOf(letter) > -1 ? false:true);          
  }

  this.guess = function(letter){ // Push the guess into guessed[] Array and reduce guesses if not in the word          
    this.guessed.push(letter);
    if(this.word.indexOf(letter) == -1) this.guesses--;
  }

  this.displayWord = function(){ //word as it has been revealed: Dog => D**, if 'D' in guessed[]
    var w = new String();
    for(var i = 0; i < this.word.length; i++) {
      this.guessed.indexOf(this.word.charAt(i).toLowerCase()) > -1 ? w += this.word.charAt(i):w += "*"; 
    }
    return w;
  }       

  this.getGameState = function(){ // 0 - player guessing, 1 - win, 2 - lose
    return this.guesses > 0 ? (this.displayWord() != this.word ? 0:1):2; 
  }

  this.logToConsole = function(){
    console.log("Word:", this.displayWord(), "| Trys:", this.guesses, "Guessed:", this.guessed);
    console.log(this.stateMsg[this.getGameState()]);
  }
}

function startNewGame(){
  console.log("=========");
  console.log(" HANGMAN ");
  console.log("=========");
  var theGame = new Hangman(selectRandomWord(), 5);
  theGame.logToConsole();
  return theGame;
}

function selectRandomWord(){
  var words = ["Chicken", "Mongoose", "Jellyfish", "Squirrel", "Porcupine", "Alligator", "Pelican", "Beaver"];
  return words[Math.floor(words.length * Math.random())];
}