// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Score for '${word[i].toLowerCase()}': ${pointValue}\n`
         }

      }
   }
   console.log(letterPoints);
   return letterPoints;
}
// this function only returns letter points when called through scorerPrompt and scoringAlgorithms when I add the console.log

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let promptWord = input.question("Let's play some scrabble! Enter a word: ");
   let promptScorer = input.question(`Which scoring algorithm would you like to use?

   0 - Simple: One point per character
   1 - Vowel Bonus: Vowels are worth 3 points
   2 - Scrabble: Uses scrabble point system
   Enter 0, 1, or 2: `)
   return [promptWord, promptScorer];
};

let newPointStructure;

let simpleScorer = function (word) {
   word = word.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      letterPoints += 1
   }
   console.log(`Score for '${word.toLowerCase()}': ${letterPoints}`);
   return letterPoints;
}

let vowelBonusScorer = function (word) {
   word = word.toUpperCase();
   let letterPoints = 0;
   const vowels = ["A", "E", "I", "O", "U", "Y"]

   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         letterPoints += 3;
      } else {
         letterPoints += 1;
      }
   }
   console.log(`Score for ${word.toLowerCase()}: ${letterPoints}`)
   return letterPoints;
}

let scrabbleScorer;

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: oldScrabbleScorer
   }
];


function scorerPrompt(word, scorer) {
     scorer = Number(scorer);

   if (scorer === 0) {
      scoringAlgorithms[0].scorerFunction(word);
   } else if (scorer === 1) {
      scoringAlgorithms[1].scorerFunction(word);
   } else if (scorer === 2) {
      scoringAlgorithms[2].scorerFunction(word);
   } else {
      console.log(`Invalid scorer choice. Please run program again.`)
   }
 }

function transform() { };

function runProgram() {
   let [word, scorer] = initialPrompt();
   scorerPrompt(word,scorer);

}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
