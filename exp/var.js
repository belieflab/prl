let trialIterator = 1;

/*define stroop_variables(stroop stimuli)*/
const first40 = [
    {
        left: deckPositions[0],
        middle: deckPositions[1],
        right: deckPositions[2],
        fixedProbabilities: [0.9, 0.5, 0.1],
        probabilityNames: ["high", "medium", "low"],
    },
];

const second40 = [
    {
        left: leftStim,
        middle: middleStim,
        right: rightStim,
        probabilities: [0.5, 0.1, 0.9],
        probabilityNames: ["medium", "low", "high"],
    },
];

// probabilities change at second half

const third40 = [
    {
        left: leftStim,
        middle: middleStim,
        right: rightStim,
        probabilities: [0.8, 0.4, 0.2],
        probabilityNames: ["high", "medium", "low"],
    },
];

const fourth40 = [
    {
        left: leftStim,
        middle: middleStim,
        right: rightStim,
        probabilities: [0.2, 0.4, 0.8],
        probabilityNames: ["low", "medium", "high"],
    },
];
