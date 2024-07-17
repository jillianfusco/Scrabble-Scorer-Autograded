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
   // this function only returns letter points when called through scorerPrompt and scoringAlgorithms when I add the console.log. It does return letter points when I call it directly?
   console.log(letterPoints);
   return letterPoints;
}


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let promptWord = input.question("Let's play some scrabble! Enter a word: ");
   
   return promptWord;
};

let newPointStructure = transform(oldPointStructure);

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

let scrabbleScorer = function(word) {
word = word.toLowerCase();
let letterPoints = 0;
const newPointStructureObj = newPointStructure;

for (let i = 0; i < word.length; i++) {
   let letter = word[i];
   if (letter in newPointStructureObj) {
      letterPoints += newPointStructureObj[letter];
   }
}
console.log(`Score for ${word}: ${letterPoints}`);
return letterPoints;
}

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
      scorerFunction: scrabbleScorer
   }
];


function scorerPrompt(word) {
   let promptScorer = input.question(`Which scoring algorithm would you like to use?
   
      0 - Simple: One point per character
      1 - Vowel Bonus: Vowels are worth 3 points
      2 - Scrabble: Uses scrabble point system
      Enter 0, 1, or 2: `)

     promptScorer = Number(promptScorer);

   if (promptScorer === 0) {
      scoringAlgorithms[0].scorerFunction(word);
   } else if (promptScorer === 1) {
      scoringAlgorithms[1].scorerFunction(word);
   } else if (promptScorer === 2) {
      scoringAlgorithms[2].scorerFunction(word);
   } else {
      console.log(`Invalid scorer choice. Please run program again.`)
   }
   return promptScorer;
 }

function transform(obj) { 
   let newObject = {};
  for (let pointValue in obj) {
    let letters = obj[pointValue];
    for (let i = 0; i < letters.length; i++) {
      newObject[letters[i].toLowerCase()] = Number(pointValue);
    }
  }
  return newObject;
};

function runProgram() {
   let word = initialPrompt();
   scorerPrompt(word);
  
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
