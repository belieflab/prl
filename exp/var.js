// Purpose of var.js: To include all global variables (e.g., trialIterator)
let trialIterator = 1; //index value of current trial starts at 1
let totalTrials = 40; // total number of trials
let totalBlocks = 4; //total number of blocks
let stim; //defined as decks or avatars (refer to specific as stim[0])
let firstHalf; //probabilities for first half of trials
let secondHalf; //probabilites for second half

let percentComplete = 25;
let breakText;

const phaseProb = [
    [0.9, 0.5, 0.1], // Phase 1 probabilities
    [0.8, 0.4, 0.2], // Phase 2 probabilities
];
let currentProbability = shuffleArray([...phaseProb[0]]); // randomize initial reward probability set for each individual

let streak = 0;
let strike = 0;

// how many continious correct choices to the best deck until changing best deck location 
let maxStreaks = 9;
let maxStrikes = 2;

//selecting the stimuli based on version (deck or avatar)
if (version === "deck") {
    stim = stimArrayDeck;
}
if (version === "avatar") {
    stim = stimArrayAvatar;
}

// // MAYBE REMOVE, outcome vector order not generalize to many CPs
const outcome = outcomeArray; //regardless of version, outcome win/lose is the same

// // MAYBE REMOVE // //
//let stimRandomize = shuffleArray(stim); //shuffling stimuli array

// // MAYBE REMOVE // // 
//const positions = ["left", "middle", "right"]; //regardless of version, there will always be left, middle, right

// switch easy-easy, easy-hard, hard-easy, hard-hard
switch (difficulty) {
    case "easy-easy":
        firstHalf = [
            //{"high": 0.9, "medium": 0.5, "low": 0.1},
            0.9, 0.5, 0.1,
        ];

        secondHalf = [
            //{"high": 0.9, "medium": 0.5, "low": 0.1}
            0.9, 0.5, 0.1,
        ];
        break;
    case "easy-hard":
        firstHalf = [
            //{"high": 0.9, "medium": 0.5, "low": 0.1},
            0.9, 0.5, 0.1,
        ];
        secondHalf = [
            //{"high": 0.8, "medium": 0.4, "low": 0.2}
            0.8, 0.4, 0.2,
        ];
        break;
    case "hard-easy":
        firstHalf = [
            //{"high": 0.8, "medium": 0.4, "low": 0.2},
            0.8, 0.4, 0.2,
        ];
        secondHalf = [
            //{"high": 0.9, "medium": 0.5, "low": 0.1}
            0.9, 0.5, 0.1,
        ];
        break;
    case "hard-hard":
        firstHalf = [
            //{"high": 0.8, "medium": 0.4, "low": 0.2},
            0.8, 0.4, 0.2,
        ];
        secondHalf = [
            //{"high": 0.8, "medium": 0.4, "low": 0.2},
            0.8, 0.4, 0.2,
        ];
        break;
}

// Function to shuffle the keys of an object randomly while preserving corresponding values
// order of keys in object must be randomized, but we need to keep values associated with each key are still linked/mapped
function shuffleKeys(obj) {
    // get keys of input object; Object.keys() method returns an array containing keys of the object
    var shuffledKeys = Object.keys(obj).sort(() => Math.random() - 0.5);
    var shuffledObj = {};
    shuffledKeys.forEach(function (key) {
        shuffledObj[key] = obj[key];
    });
    return shuffledObj;
}

// Format into desired structure
var rewardProbabilityFirstHalf = [];

firstHalf.forEach(function (obj) {
    var shuffledObj = shuffleKeys(obj);
    Object.keys(shuffledObj).forEach(function (key) {
        rewardProbabilityFirstHalf.push({
            contingency: key,
            probability: shuffledObj[key],
            deck: stimRandomize, // Assuming stimRandomize is defined somewhere
        });
    });
});

// Format into desired structure
var rewardProbabilitySecondHalf = [];

secondHalf.forEach(function (obj) {
    var shuffledObj = shuffleKeys(obj);
    Object.keys(shuffledObj).forEach(function (key) {
        rewardProbabilitySecondHalf.push({
            contingency: key,
            probability: shuffledObj[key],
            deck: stimRandomize, // Assuming stimRandomize is defined somewhere
        });
    });
});