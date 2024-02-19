// Purpose of var.js: To include all global variables (e.g., trialIterator)
let trialIterator = 0; //index value of current trial starts at 1

let score = 0;

let stim; //defined as decks or avatars (refer to specific as stim[0])
let firstHalf; //probabilities for first half of trials
let secondHalf; //probabilites for second half

const winPoints = 100;
const losePoints = -50;

let phaseProbabilities = [];
let currentProbability;

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

// outcome vector order not generalize to many CPs
const outcome = outcomeArray; //regardless of version, outcome win/lose is the same

// switch easy-easy, easy-hard, hard-easy, hard-hard
switch (difficulty) {
    case "easy-easy":
        phaseProbabilities.push([0.9, 0.5, 0.1], [0.9, 0.5, 0.1]);
        currentProbability = shuffleArray([...phaseProbabilities[0]]); // randomize initial reward probability set at start of experiment
        break;
    case "easy-hard":
        phaseProbabilities.push([0.9, 0.5, 0.1], [0.8, 0.4, 0.2]);
        currentProbability = shuffleArray([...phaseProbabilities[0]]); // randomize initial reward probability set at start of experiment
        break;
    case "hard-easy":
        phaseProbabilities.push([0.8, 0.4, 0.2], [0.9, 0.5, 0.1]);
        currentProbability = shuffleArray([...phaseProbabilities[0]]); // randomize initial reward probability set at start of experiment
        break;
    case "hard-hard":
        phaseProbabilities.push([0.8, 0.4, 0.2], [0.8, 0.4, 0.2]);
        currentProbability = shuffleArray([...phaseProbabilities[0]]); // randomize initial reward probability set at start of experiment
        break;
}
