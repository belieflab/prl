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
let winPoints; //default 100
let losePoints; //default -50

switch(version){
  case "deck":
  case "avatar":
  case "sabotage":
    winPoints = 100;
    losePoints = -50;
    break;
  case "loss":
    winPoints = 0;
    losePoints = -100;
    break;
  case "gain":
    winPoints = 100;
    losePoints = 0;
    break;
}

// Contingency Switch Setting
// Options: "easy-easy", "easy-hard" (default), "hard-easy", "hard-hard"
const difficulty = "easy-hard"; // Default difficulty setting


let trials;
let blocks;

trials = 40; // trials per block
blocks = 4; // blocks of trials per experiment

if (debug) {
  trials = 1;
  blocks = 4;
}


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
let feedbackLink;

// Set feedback link based on workerId, PROLIFIC_PID, or participantId
const identifier = workerId || PROLIFIC_PID || participantId;
if (identifier !== undefined) {
    feedbackLink = `https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bErtyAFIwnwDhWu?${identifier}`;
}
