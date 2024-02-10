// Purpose of var.js: To include all global variables (e.g., trialIterator)
let trialIterator = 1; //index value of current trial starts at 1
let stim; //defined as decks or avatars (refer to specific as stim[0])
let firstHalf; //probabilities for first half of trials
let secondHalf; //probabilites for second half

let streak = 0;
let strike = 0;

let maxStreak = 9;
let maxStrike = 2;

//selecting the stimuli based on version (deck or avatar)
if (version === "deck") {
    stim = stimArrayDeck;
}
if (version === "avatar") {
    stim = stimArrayAvatar;
}
const outcome = outcomeArray; //regardless of version, outcome win/lose is the same

let stimRandomize = shuffleArray(stim); //shuffling stimuli array

const positions = ["left", "middle", "right"]; //regardless of version, there will always be left, middle, right
// switch easy-easy, easy-hard, hard-easy, hard-hard
switch (difficulty) {
    case 'easy-easy':
      firstHalf = [
            {"high": 0.9, "medium": 0.5, "low": 0.1}, 
        ];
      secondHalf = [
            {"high": 0.9, "medium": 0.5, "low": 0.1}
        ]
        break;
    case 'easy-hard':
      firstHalf = [
            {"high": 0.9, "medium": 0.5, "low": 0.1}, 
        ];
      secondHalf = [
            {"high": 0.8, "medium": 0.4, "low": 0.2}
        ]
        break; 
    case 'hard-easy':
      firstHalf = [
            {"high": 0.8, "medium": 0.4, "low": 0.2}, 
        ];
      secondHalf = [
            {"high": 0.9, "medium": 0.5, "low": 0.1}
        ]
        break;
    case 'hard-hard': 
      firstHalf = [
            {"high": 0.8, "medium": 0.4, "low": 0.2}, 
        ];
      secondHalf = [
            {"high": 0.8, "medium": 0.4, "low": 0.2}
        ]
  break;
}

// Function to shuffle the keys of an object randomly while preserving corresponding values
//  order of keys in object must be randomized, but we need to keep values associated with each key are still linked/mapped
function shuffleKeys(obj) {
    
    // in javascript, an object is a collection of key-value paires; each key is unique identifier for corresponding value within the object
    //  keys are used to access the values assoc with them
    //  no two keys within an objeect can have the same name
    // in javascript objects, data are organized into properties, each of which consist of a key-value pair; objects can have multiple properties
    
    //Get keys and Shuffle:
    //  retrieves array containing keys of input object 'obj' and sorts array of keys using
    //    comparison function that will generate rand number between -0.5 and 0.5
    var shuffledKeys = Object.keys(obj).sort(() => Math.random() - 0.5);
    //Create New Object:
    //  initialize empty object that will store shuffled keys and corresponding values
    var shuffledObj = {};
    //Iterate Over Shuffled Keys:
    //  loops through each key in shuffled array
    shuffledKeys.forEach(function(key) {
      //for each key in shuffled array, assign corresponding value from original input obj to shuffledObj
      shuffledObj[key] = obj[key];
    });
    //Return Shuffled Object containing shuffled keys and corresponding values
    return shuffledObj;
  }
  
  // Initialize an empty array to store the formatted data for the first half of the trials
var rewardProbabilityFirstHalf = [];
  
// Iterate over each object representing probabilities for the first half of the trials
firstHalf.forEach(function(obj) {
    // Shuffle the keys of the current object (contingencies)
    var shuffledObj = shuffleKeys(obj);
    
    // Iterate over each shuffled key (contingency) in the current object
    Object.keys(shuffledObj).forEach(function(key) {
        // Construct an object representing a trial with shuffled contingency and its associated probability
        rewardProbabilityFirstHalf.push({
            contingency: key,                             // Assign the shuffled key as the contingency
            probability: shuffledObj[key],                // Retrieve the probability associated with the contingency
            deck: stimRandomize // Stimuli randomly chosen, based on version (deck or avatar)
        });
    });
});

// Output the formatted data for the first half of the trials to the console
console.log("Reward probabilities for the first half of trials:", rewardProbabilityFirstHalf);

// Initialize an empty array to store the formatted data for the second half of the trials
var rewardProbabilitySecondHalf = [];
  
// Iterate over each object representing probabilities for the second half of the trials
secondHalf.forEach(function(obj) {
    // Shuffle the keys of the current object (contingencies)
    var shuffledObj = shuffleKeys(obj);
    
    // Iterate over each shuffled key (contingency) in the current object
    Object.keys(shuffledObj).forEach(function(key) {
        // Construct an object representing a trial with shuffled contingency and its associated probability
        rewardProbabilitySecondHalf.push({
            contingency: key,                             // Assign the shuffled key as the contingency
            probability: shuffledObj[key],                // Retrieve the probability associated with the contingency
            deck: stimRandomize // Stimuli randomly chosen, based on version (deck or avatar)
        });
    });
});

// Output the formatted data for the second half of the trials to the console
console.log("Reward probabilities for the second half of trials:", rewardProbabilitySecondHalf);

// //look at switch (difficulty) which is based on vectors "probabilities"
// let rewardProbabilityFirstHalf = [
//     {
//         contingency: contingencies[0][0],
//         probability: probabilities[0][0],
//         deck: stimRandomize,
//     },

//     {
//         contingency: contingencies[0][1],
//         probability: probabilities[0][1],
//         deck: stimRandomize,
//     },

//     {
//         contingency: contingencies[0][2],
//         probability: probabilities[0][2],
//         deck: stimRandomize,
//     },
// ];

// let rewardProbabilityRandomizeFirstHalf = shuffleArray(
//     rewardProbabilityFirstHalf
// );


// let rewardProbabilitySecondHalf = [
//     {
//         contingency: contingencies[1][0],
//         probability: probabilities[1][0],
//         deck: stimRandomize,
//     },

//     {
//         contingency: contingency[1],
//         probability: probabilities[1][1],
//         deck: stimRandomize,
//     },

//     {
//         contingency: contingency[2],
//         probability: probabilities[1][2],
//         deck: stimRandomize,
//     },
// ];

// let rewardProbabilityRandomizeSecondHalf = shuffleArray(
//     rewardProbabilitySecondHalf
// );