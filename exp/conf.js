//***********************************//
//   EXPERIMENT CONFIGURATION FILE   //
//***********************************//

"use strict";

// Debug Mode
// Options: true, false
const debug = false;

// Experiment Name
const experimentName = "Probabilistic Reversal Learning Task"; // Displayed in the title bar of the browser

// Experiment Language - only works for English now
const language = "english"; // Language used for the experiment

// UI Theme
// Options: "light", "dark"
const theme = "light"; // UI theme setting

// Experiment Version
// Options: "deck", "avatar", "sabotage", "gain", "loss"
const version = "deck"; // Current version of the experiment

const experimentAlias = `prl_${version}`; // Used in the data file name, affects data saving

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
        losePoints = -50;
        break;
    case "gain":
        winPoints = 50;
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
const reward = "points"; // Options: "points", "$"
const lossStartingPoints = 8000; //Starting point value for loss version of the task. Value must be > losePoints*trials*blocks.
const gainStartingPoints = 0; //Starting point value for gain version of the task
const pointsPerDollar = 1000; //Rate of conversion from final point value to bonus amount. Used for Gain and Loss versions.

// Note: Uncomment the desired option for each setting, and ensure only one option per setting is active.
const adminEmail = "joshua.kenney@yale.edu";

// Set feedback link based on workerId, PROLIFIC_PID, or participantId

// Determine the identifier and its type
let identifier = workerId || PROLIFIC_PID || participantId;
let identifierType = workerId
    ? "workerId"
    : PROLIFIC_PID
    ? "PROLIFIC_PID"
    : "participantId";

function getFeedbackLink(version, id, idType) {
    if (!id || !idType) return undefined;
    const baseUrl = urlConfig[version] || urlConfig.default;
    return `${baseUrl}?${idType}=${id}`;
}

// Configuration for base URLs mapped by version
const urlConfig = {
    default: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bErtyAFIwnwDhWu",
    loss: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_8qsU4yfds5mH6Pc",
    gain: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_8qsU4yfds5mH6Pc",
};

let feedbackLink = getFeedbackLink(version, identifier, identifierType);

// intake variables for sites and phenotypes
const intake = {
    subject: {
        minLength: 5,
        maxLength: 5,
    },
    sites: ["Vanderbilt"], // sites array included in config
    phenotypes: ["hc"], // phenotypes array included in config
};
