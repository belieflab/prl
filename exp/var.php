<!-- Purpose of var.js: To include all global variables (e.g., trialIterator) -->
<!-- And any php server side logic -->

<?php
$directoryDeck = 'stim/deck/0/';
$directoryAvatar = 'stim/avatar/0/';
$directoryOutcome = 'stim/outcome/';
$decks = scandir($directoryDeck);
$avatars = scandir($directoryAvatar);
$outcomes = scandir($directoryOutcome);
$fileArrayDeck = [];
$fileArrayAvatar = [];
$fileArrayOutcome = [];

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
foreach ($outcomes as $outcome) {
  if ($outcome !== '.' && $outcome !== '..') {
    $fileArrayOutcome[] = $directoryOutcome.$outcome;
  }
}

$fileArrayDeckJSON = json_encode($fileArrayDeck);
$fileArrayAvatarJSON = json_encode($fileArrayAvatar);
$fileArrayOutcomeJSON = json_encode($fileArrayOutcome);
?>

<!-- now include all javascript global variables -->

<script>

let trialIterator = 0; //index value of current trial starts at 1

const stimArrayDeck = <?php echo $fileArrayDeckJSON; ?>;
const stimArrayAvatar = <?php echo $fileArrayAvatarJSON; ?>;
const outcomeArray = <?php echo $fileArrayOutcomeJSON; ?>;

let win;

let score = 0; // score accumulated throughout the experiment

let stim; //defined as decks or avatars (refer to specific as stim[0])

const winPoints = 100;
const losePoints = -50;

let phaseProbabilities = [];
let currentProbability;

let streak = 0;
let strike = 0;

// how many continuous correct choices to the best deck until changing best deck location
const maxStreaks = 9;
const maxStrikes = 2;

const totalTrials = trials * blocks; // total number of trials in the experiment

// selecting the stimuli based on version (deck or avatar)
// and shuffle the stimuli
switch (version) {
    case "deck":
        stim = shuffleArray(stimArrayDeck);
        break;
    case "avatar":
        stim = shuffleArray(stimArrayAvatar);
        break;
    case "sabotage":
        stim = shuffleArray(stimArrayAvatar);
        break;
}

// outcome vector order not generalize to many CPs
const outcome = outcomeArray; //regardless of version, outcome win/lose is the same

// switch easy-easy, easy-hard, hard-easy, hard-hard
switch (difficulty) {
    case "easy-easy":
        phaseProbabilities.push([0.9, 0.5, 0.1], [0.9, 0.5, 0.1]);
        currentProbability = shuffleArray([...phaseProbabilities[0]]); // randomize initial reward probability set at start of experiment
        break;
    case "easy-hard":
        phaseProbabilities.push([0.9, 0.5, 0.1], [0.8, 0.4, 0.2]);
        currentProbability = shuffleArray([...phaseProbabilities[0]]); // randomize initial reward probability set at start of experiment
        break;
    case "hard-easy":
        phaseProbabilities.push([0.8, 0.4, 0.2], [0.9, 0.5, 0.1]);
        currentProbability = shuffleArray([...phaseProbabilities[0]]); // randomize initial reward probability set at start of experiment
        break;
    case "hard-hard":
        phaseProbabilities.push([0.8, 0.4, 0.2], [0.8, 0.4, 0.2]);
        currentProbability = shuffleArray([...phaseProbabilities[0]]); // randomize initial reward probability set at start of experiment
        break;
}

</script>