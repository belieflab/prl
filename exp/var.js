// Purpose of var.js: To include all global variables (e.g., trialIterator)
let trialIterator = 1;
let stim;
let outcome;
let contingency;
let probability;

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
outcome = outcomeArray; //regardless of version, outcome win/lose is the same

stimRandomize = shuffleArray(stim);

contingency = ["high", "medium", "low"];
positions = ["left", "middle", "right"];
// switch easy-easy, easy-hard, hard-easy, hard-hard
switch (difficulty) {
    case 'easy-easy':
        probabilities = [[0.9, 0.5, 0.1], [0.9, 0.5, 0.1]];
        break;
    case 'easy-hard':
        probabilities = [[0.9, 0.5, 0.1], [0.8, 0.4, 0.2]];
        break; 
    case 'hard-easy':
        probabilities = [[0.8, 0.4, 0.2], [0.9, 0.5, 0.1]];
        break;
    case 'hard-hard':
        probabilities = [[0.8, 0.4, 0.2], [0.8, 0.4, 0.2]];
        break;

}

//look at switch (difficulty) which is based on vectors "probabilities"
let rewardProbabilityFirstHalf = [
    {
        contingency: contingency[0],
        probability: probabilities[0][0],
        deck: stimRandomize,
    },

    {
        contingency: contingency[1],
        probability: probabilities[0][1],
        deck: stimRandomize,
    },

    {
        contingency: contingency[2],
        probability: probabilities[0][2],
        deck: stimRandomize,
    },
];

let rewardProbabilityRandomizeFirstHalf = shuffleArray(
    rewardProbabilityFirstHalf
);


let rewardProbabilitySecondHalf = [
    {
        contingency: contingency[0],
        probability: probabilities[1][0],
        deck: stimRandomize,
    },

    {
        contingency: contingency[1],
        probability: probabilities[1][1],
        deck: stimRandomize,
    },

    {
        contingency: contingency[2],
        probability: probabilities[1][2],
        deck: stimRandomize,
    },
];

let rewardProbabilityRandomizeSecondHalf = shuffleArray(
    rewardProbabilitySecondHalf
);