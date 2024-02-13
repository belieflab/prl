// Purpose of var.js: To include all global variables (e.g., trialIterator)
let trialIterator = 1; //index value of current trial starts at 1
let totalTrials = 160; // total number of trials
let totalBlocks = 4; //total number of blocks
let stim; //defined as decks or avatars (refer to specific as stim[0])
let firstHalf; //probabilities for first half of trials
let secondHalf; //probabilites for second half

const phaseProb = [
    [0.9, 0.5, 0.1], // Phase 1 probabilities
    [0.8, 0.4, 0.2], // Phase 2 probabilities
];
let currentProbability = shuffleArray([...phaseProb[0]]); // randomize initial reward probability set for each individual

let streak = 0;
let strike = 0;

let maxStreaks = 9;
let maxStrikes = 2;

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
//  order of keys in object must be randomized, but we need to keep values associated with each key are still linked/mapped
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

console.log(rewardProbabilityFirstHalf);

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

console.log(rewardProbabilitySecondHalf);

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
