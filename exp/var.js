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
    outcome = outcomeArray;
}
if (version === "avatar") {
    stim = stimArrayAvatar;
    outcome = outcomeArray;
}

stimRandomize = shuffleArray(stim);

contingency = ["high", "medium", "low"];
probability = [0.9, 0.5, 0.1];
positions = ["left", "middle", "right"];
let rewardProbabilityFirstHalf = [
    {
        contingency: contingency[0],
        probability: probability[0],
        deck: stimRandomize,
    },

    {
        contingency: contingency[1],
        probability: probability[1],
        deck: stimRandomize,
    },

    {
        contingency: contingency[2],
        probability: probability[2],
        deck: stimRandomize,
    },
];

let rewardProbabilityRandomizeFirstHalf = shuffleArray(
    rewardProbabilityFirstHalf
);

contingency = ["high", "medium", "low"];
probability = [0.8, 0.4, 0.2];
positions = ["left", "middle", "right"];
let rewardProbabilitySecondHalf = [
    {
        contingency: contingency[0],
        probability: probability[0],
        deck: stimRandomize,
    },

    {
        contingency: contingency[1],
        probability: probability[1],
        deck: stimRandomize,
    },

    {
        contingency: contingency[2],
        probability: probability[2],
        deck: stimRandomize,
    },
];

let rewardProbabilityRandomizeSecondHalf = shuffleArray(
    rewardProbabilitySecondHalf
);
