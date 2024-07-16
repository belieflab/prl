<!-- Purpose of var.js: To include all global variables (e.g., trialIterator) -->
<!-- And any php server side logic -->

<?php

// which set do you want to use? (from 0 to 7)
$stimuliSet = 0;

// Function to build a directory path and list files
function getStimPaths($baseDir, $stimuliSet) {
    $directory = $baseDir . $stimuliSet . '/';
    $files = scandir($directory);
    $fileArray = [];

    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            $fileArray[] = $directory . $file;
        }
    }
    
    return $fileArray;
}

// Define base directories
$versions = [
    'deck' => 'stim/deck/',
    'avatar' => 'stim/avatar/',
    'loss' => 'stim/loss/',
    'gain' => 'stim/gain/',
    'sabotage' => 'stim/sabotage'
];

// Array to hold all file paths
$stimPaths = [];

foreach ($versions as $key => $version) {
    $stimPaths[$key] = getStimPaths($version, $stimuliSet);
}

// Convert file arrays to JSON for use in JavaScript
$fileArrayDeckJSON = json_encode($stimPaths['deck']);
$fileArrayAvatarJSON = json_encode($stimPaths['avatar']);
$fileArrayLossJSON = json_encode($stimPaths['loss']);
$fileArrayGainJSON = json_encode($stimPaths['gain']);
?>

<!-- now include all javascript global variables -->

<script>

"use strict";

let trialIterator = 0; // first trial will increment from 0 to 1

const stimArrayDeck = <?php echo $fileArrayDeckJSON; ?>;
const stimArrayAvatar = <?php echo $fileArrayAvatarJSON; ?>;
const stimArrayLoss = <?php echo $fileArrayLossJSON; ?>;
const stimArrayGain = <?php echo $fileArrayGainJSON; ?>;

// create win as global variable so we use it in feedback and printing csv
let win;

// add php set to js set so we add it into the timeline feedback csv output
let stimuliSet  = <?php echo $stimuliSet; ?>;

let score = 0; // score accumulated throughout the experiment

let stim; //defined as decks or avatars (refer to specific as stim[0])

let phaseProbabilities = [];
let currentProbability;

// create variables with  initial values for streak and strike
let streak = 0;
let strike = 0;

// how many continuous correct choices to the best deck until changing best deck location
const maxStreaks = 9;
const maxStrikes = 2;



// selecting the stimuli based on version (deck or avatar)
// and shuffle the stimuli
switch (version) {
    case "deck":
        stim = shuffleArray(stimArrayDeck);
        break;
    case "avatar":
    case "sabotage":
        stim = shuffleArray(stimArrayAvatar);
        break;
    case "loss":
        stim = shuffleArray(stimArrayLoss);
        break;
    case "gain":
        stim = shuffleArray(stimArrayGain);
        break;
}

// outcome vector order not generalize to many CPs
const outcome = [`stim/${version}/outcome/scaled_win.png`, `stim/${version}/outcome/scaled_lose.png`];

// switch easy-easy, easy-hard, hard-easy, hard-hard
switch (difficulty) {
    case "easy-easy":
        phaseProbabilities.push([0.9, 0.5, 0.1], [0.9, 0.5, 0.1]);
        break;
    case "easy-hard":
        phaseProbabilities.push([0.9, 0.5, 0.1], [0.8, 0.4, 0.2]);
        break;
    case "hard-easy":
        phaseProbabilities.push([0.8, 0.4, 0.2], [0.9, 0.5, 0.1]);
        break;
    case "hard-hard":
        phaseProbabilities.push([0.8, 0.4, 0.2], [0.8, 0.4, 0.2]);
        break;    
}
currentProbability = shuffleArray([...phaseProbabilities[0]]); // randomize initial reward probability set at start of experiment


</script>
