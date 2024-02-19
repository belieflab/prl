// Purpose of var.js: To include all global variables (e.g., trialIterator)
let trialIterator = 0; //index value of current trial starts at 1

let score = 0;

let stim; //defined as decks or avatars (refer to specific as stim[0])
let firstHalf; //probabilities for first half of trials
let secondHalf; //probabilites for second half

const winPoints = 100;
const losePoints = -50;

const phaseProbabilities = [
    [0.9, 0.5, 0.1], // Phase 1 probabilities
    [0.8, 0.4, 0.2], // Phase 2 probabilities
];
let currentProbability = shuffleArray([...phaseProbabilities[0]]); // randomize initial reward probability set for each individual

let streak = 0;
let strike = 0;

// how many continuous correct choices to the best deck until changing best deck location
const maxStreaks = 9;
const maxStrikes = 2;

//selecting the stimuli based on version (deck or avatar)

switch (version) {
    case "deck":
        stim = stimArrayDeck;
        break;
    case "avatar":
        stim = stimArrayAvatar;
        break;
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

// Format into desired structure
let rewardProbabilityFirstHalf = [];

firstHalf.forEach((obj) => {
    let shuffledObj = shuffleKeys(obj);
    Object.keys(shuffledObj).forEach((key) => {
        rewardProbabilityFirstHalf.push({
            contingency: key,
            probability: shuffledObj[key],
            deck: stimRandomize, // Assuming stimRandomize is defined somewhere
        });
    });
});

// Format into desired structure
let rewardProbabilitySecondHalf = [];

secondHalf.forEach((obj) => {
    let shuffledObj = shuffleKeys(obj);
    Object.keys(shuffledObj).forEach((key) => {
        rewardProbabilitySecondHalf.push({
            contingency: key,
            probability: shuffledObj[key],
            deck: stimRandomize, // Assuming stimRandomize is defined somewhere
        });
    });
});
