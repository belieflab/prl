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

const randomization = true;

// hard coding a phase will override the randomization
let phase = 1;

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
const bonus = 2; // Bonus amount in dollars
const percentile = 25; // Cut-off performance percentile for receiving a bonus
const reward = "points"; // Options: "points", "$"
const lossStartingPoints = 8000;
const gainStartingPoints = 0;
const pointsPerDollar = 1000;

// Repetitions
const repetitions = {
    production: totalTrials,
    debug: 1,
};

// Contact Information
const adminEmail = "joshua.kenney@yale.edu";

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
    default: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bErtyAFIwnwDhWu",
    gain: {
        0: "prl_loss",
        1: "qualtrics_surveys",
        2: "qualtrics_debrief",
        3: "prl_loss",
    },
    loss: {
        0: "qualtrics_surveys",
        1: "prl_gain",
        2: "prl_gain",
        3: "qualtrics_debrief",
    },
};
