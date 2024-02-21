//***********************************//
//   EXPERIMENT CONFIGURATION FILE   //
//***********************************//

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
const version = "sabotage"; // Current version of the experiment

// Contingency Switch Setting
// Options: "easy-easy", "easy-hard" (default), "hard-easy", "hard-hard"
const difficulty = "easy-hard"; // Default difficulty setting

const trials = 40; // trials per block
const blocks = 4; // blocks of trials per experiment

// Reward Settings
const bonus = 2; // Bonus amount in dollars
const percentile = 25; // Cut-off performance percentile for receiving a bonus
const reward = "$"; // Options: "points", "$""

// Note: Uncomment the desired option for each setting, and ensure only one option per setting is active.
const adminEmail = "joshua.kenney@yale.edu";
const feedbackLink = undefined;
