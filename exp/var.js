// Purpose of var.js: To include all global variables (e.g., trialIterator) 
let trialIterator = 1;
let stim;
let contingency;
let probability;

//selecting the stimuli based on version (deck or avatar)
if (version === "deck") {
    stim = stimArrayDeck;
}
if (version === "avatar") {
    stim = stimArrayAvatar;
}

stimRandomize = jsPsych.randomization.repeat(stim,1);

contingency = ["high","medium","low"];
probability = [0.9,0.5,0.1];
let rewardProbabilityFirstHalf = [
    {
        contingency: contingency[0],
        probability: probability[0],
        deck: stimRandomize
    },

    {
        contingency: contingency[1],
        probability: probability[1],
        deck: stimRandomize
    },

    {
        contingency: contingency[2],
        probability: probability[2],
        deck: stimRandomize
    },
];

let rewardProbabilityRandomizeFirstHalf = jsPsych.randomization.repeat(rewardProbabilityFirstHalf,1);

contingency = ["high","medium","low"];
probability = [0.8,0.4,0.2];
let rewardProbabilitySecondHalf = [
    {
        contingency: contingency[0],
        probability: probability[0],
        deck: stimRandomize
    },

    {
        contingency: contingency[1],
        probability: probability[1],
        deck: stimRandomize
    },

    {
        contingency: contingency[2],
        probability: probability[2],
        deck: stimRandomize
    },
];

let rewardProbabilityRandomizeSecondHalf = jsPsych.randomization.repeat(rewardProbabilitySecondHalf,1);
