//***********************************//
//   EXPERIMENT CONFIGURATION FILE   //
//***********************************//

"use strict";

// Debug Mode
// Options: true, false
let debug = false;

// Experiment Name
const experimentName = "Probabilistic Reversal Learning Task"; // Displayed in the title bar of the browser
const experimentAlias = "prl"; // Used in the data file name, affects data saving

// Experiment Language - only works for English now
const language = "english"; // Language used for the experiment

// UI Theme
// Options: "light", "dark"
const theme = "light"; // UI theme setting

// Experiment Version
// Options: "deck", "avatar", "sabotage"
const version = "loss"; // Current version of the experiment

// Version: Loss
// Loss amounts should be set to -100 or 0 pts
// Version: Gain
// Win amounts should be set to 100 or 0 pts
// values for win and lose
let winPoints = 100; // Default winning points
let losePoints = -50; // Default losing points

switch (version) {
    case "loss":
        winPoints = 0;
        losePoints = -100;
        break;
    case "gain":
        winPoints = 100;
        losePoints = 0;
        break;
    // 'deck', 'avatar', 'sabotage' cases use the default values
}

// Contingency Switch Setting
// Options: "easy-easy", "easy-hard" (default), "hard-easy", "hard-hard"
const difficulty = "easy-hard"; // Default difficulty setting

const trials = debug ? 1 : 40; // 1 trial per block if debugging, otherwise 40
const blocks = 4; // The number of blocks remains constant

const totalTrials = trials * blocks; // total number of trials in the experiment

// Number of repetitions for each phase, user-defined object
// reference in main procedures object repetitions property:
// e.g.
// repetitions: getRepetitions().learning
const repetitions = {
    production: totalTrials,
    debug: 1,
};

// Reward Settings
const bonus = 2; // Bonus amount in dollars
const percentile = 25; // Cut-off performance percentile for receiving a bonus
const reward = "$"; // Options: "points", "$"

// Note: Uncomment the desired option for each setting, and ensure only one option per setting is active.
const adminEmail = "joshua.kenney@yale.edu";

// Set feedback link based on workerId, PROLIFIC_PID, or participantId
const identifier = workerId || PROLIFIC_PID || participantId;
const feedbackLink = identifier
    ? `https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bErtyAFIwnwDhWu?${identifier}`
    : undefined;
