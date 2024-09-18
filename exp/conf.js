//***********************************//
//   EXPERIMENT CONFIGURATION FILE   //
//***********************************//

"use strict";

// Debug Mode
// IMPORTANT: Set to false for production
const debug = true;

// Experiment Version
// Options: "deck", "avatar", "sabotage", "gain", "loss"
const version = "deck";

const counterbalance = false;

// hard coding a phase will override the randomization
let phase = undefined;

// General Settings
const experimentName = "Probabilistic Reversal Learning Task";
const experimentAlias = `prl_${version}`;
const language = "english";
const theme = "light";

// Trial Settings
const difficulty = "easy-hard"; // Options: "easy-easy", "easy-hard", "hard-easy", "hard-hard"
const trials = debug ? 1 : 40;
const blocks = 4;
const totalTrials = trials * blocks;

// Point Settings
let winPoints = 100;
let losePoints = -50;

switch (version) {
    case "loss":
        winPoints = 0;
        losePoints = -50;
        break;
    case "gain":
        winPoints = 50;
        losePoints = 0;
        break;
    // 'deck', 'avatar', 'sabotage' cases use default values
}

// Reward Settings
const bonus = 2.0; // Bonus amount in dollars
const percentile = 25; // Cut-off performance percentile for receiving a bonus
const reward = "points"; // Options: "points", "$"
const lossStartingPoints = 8000;
const gainStartingPoints = 0;
const pointsPerDollar = 2000;

// Repetitions
const repetitions = {
    production: totalTrials,
    debug: 1,
};

// Contact Information
const adminEmail = undefined;

// Intake Settings
const intake = {
    subject: {
        minLength: 5,
        maxLength: 5,
    },
    sites: ["Vanderbilt"],
    phenotypes: ["hc"],
};

// Qualtrics Survey Configuration

const consentLink =
    "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_9H0WmX4yKv4jz4a";

// Redirect Configuration (Daisy Chaining)
const urlConfig = {
    // redirect only
    default: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bErtyAFIwnwDhWu",
    // auto-counterbalance
    gain: {
        0: "https://belieflab.yale.edu/arclab/prlLoss/", // loss
        1: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_82Ll88zGoFlwIaq", // questionnaires
        2: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_8qsU4yfds5mH6Pc", // debrief
        3: "https://belieflab.yale.edu/arclab/prlLoss/",
    },
    loss: {
        0: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_82Ll88zGoFlwIaq", // questionnaires
        1: "https://belieflab.yale.edu/arclab/prlGain/",
        2: "https://belieflab.yale.edu/arclab/prlGain/",
        3: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_8qsU4yfds5mH6Pc", // debrief
    },
};
