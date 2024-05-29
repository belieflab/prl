<!-- Purpose of var.js: To include all global variables (e.g., trialIterator) -->
<!-- And any php server side logic -->

<?php

// which set do you want to use? (from 0 to 7)
$stimuliSet = 0;

$directoryDeck = 'stim/deck/' . $stimuliSet . '/'; //'stim/deck/0/';
$directoryAvatar = 'stim/avatar/' . $stimuliSet . '/'; // 'stim/avatar/0/';
$directoryLoss = 'stim/loss/' . $stimuliSet . '/'; // 'stim/loss/0/';
$directoryGain = 'stim/gain/' . $stimuliSet . '/'; // 'stim/gain/0/';
$decks = scandir($directoryDeck);
$avatars = scandir($directoryAvatar);
$losses = scandir($directoryLoss);
$gains = scandir($directoryGain);
$fileArrayDeck = [];
$fileArrayAvatar = [];
$fileArrayLoss = [];
$fileArrayGain = [];

// deck is black, blue, red
foreach ($decks as $deck) {
  // removes . and .. from element vector
  if ($deck !== '.' && $deck !== '..') {
        $fileArrayDeck[] = $directoryDeck.$deck;
  }
}

foreach ($avatars as $avatar) {
  if ($avatar !== '.' && $avatar !== '..') {
    $fileArrayAvatar[] = $directoryAvatar.$avatar;
  }
}

foreach ($losses as $loss) {
    if ($loss !== '.' && $loss !== '..') {
      $fileArrayLoss[] = $directoryLoss.$loss;
    }
  }

  foreach ($gains as $gain) {
    if ($gain !== '.' && $gain !== '..') {
      $fileArrayGain[] = $directoryGain.$gain;
    }
  } 

$fileArrayDeckJSON = json_encode($fileArrayDeck);
$fileArrayAvatarJSON = json_encode($fileArrayAvatar);
$fileArrayLossJSON = json_encode($fileArrayLoss);
$fileArrayGainJSON = json_encode($fileArrayGain);
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
