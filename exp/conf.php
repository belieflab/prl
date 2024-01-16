<?php

  //***********************************//
 //   EXPERIMENT CONFIGURATION FILE   //
//***********************************//

// SET EXPERIMENT NAME
$experimentName = 'PRL Task';
$experimentAlias = 'prl';

// SELECT LANGUAGE
$language = 'english';
// $language = 'french';
// $language = 'german';

// SET SUBJECT IDENTIFICATION
if (isset($_GET["workerId"])) {
  $workerId = $_GET["workerId"];
  $subjectId = $_GET["workerId"];
}

if (isset($_GET["PROLIFIC_PID"])) {
  $PROLIFIC_PID = $_GET["PROLIFIC_PID"];
  $subjectId = $_GET["PROLIFIC_PID"];
}

if ($_GET["participantId"]) {
    $participantId = $_GET["participantId"];
    $subjectId = $_GET["participantId"];
  }

  if ($_GET["src_subject_id"]) {
    $src_subject_id = $_GET["src_subject_id"];
    $subjectId = $_GET["src_subject_id"];
    
    // these are omnibus data base variables which will get passed from participant portal
    $studyId = $_GET["studyId"];
    $candidateId = $_GET["candidateId"];
    // these are NDA required variables which will get passed from participant portal
    $subjectKey = $_GET["subjectkey"];
    $consortId = $_GET["src_subject_id"];
    $sexAtBirth = $_GET["sex"];
    $institutionAlias = $_GET["site"];
    $ageInMonths = $_GET["interview_age"];
    $groupStatus = $_GET["phenotype"];
    $visit = $_GET["visit"];
  }

/**
 * Get the hash of the current git HEAD
 * @param str $branch The git branch to check
 * @return mixed Either the hash or a boolean false
 */

 function gitCommitHash( $branch='master' ) {
    if ( $hash = file_get_contents( sprintf( '.git/refs/heads/%s', $branch ) ) ) {
      return "version: ".strval(substr(trim($hash),-7));
    } else {
      return false;
    }
  }
  ?>

<script type="text/javascript">
    const experimentName = "<?php echo $experimentName; ?>";
    const experimentAlias = "<?php echo $experimentAlias; ?>";
    const workerId = "<?php echo $workerId; ?>";
    const PROLIFIC_PID = "<?php echo $PROLIFIC_PID; ?>";
    const participantId = "<?php echo $participantId; ?>";
    let src_subject_id = "<?php echo $src_subject_id; ?>";
    let subjectId = "<?php echo $subjectId; ?>";
    const language = "<?php echo $language; ?>";
    const adminEmail = "joshua.kenney@yale.edu";
    const feedbackLink = "https://belieflab.yale.edu/omnibus/eCRFs/feedback/tasks/kamin.php?candidateId=<?php echo $candidateId?>&studyId=<?php echo $studyId?>";
    // these are NDA required variables which will get passed from participant portal 
    const GUID = "<?php echo $subjectKey?>";
    const subjectID = "<?php echo $consortId?>";
    const sexAtBirth = "<?php echo $sexAtBirth?>";
    const siteNumber = "<?php echo $institutionAlias?>";
    const ageAtAssessment = "<?php echo $ageInMonths?>";
    const groupStatus = "<?php echo $groupStatus?>";
    const visit = "<?php echo $visit?>";
</script>


<script type="text/javascript" src="lib/lodash.js"></script>

<script>

const stimuliSet = 0;
const version = "deck";







switch (version) {
    case "deck":
        // Choose deck placement
        // Select 0-4 to choose deck set stimulus
        var stimuliColor = [
            ["black", "blue", "red"], // stimulus set = 0
            ["black", "blue", "red"], // stimulus set = 1
            ["black", "blue", "red"], // stimulus set = 2
            ["black", "blue", "red"], // stimulus set = 3
            ["black", "blue", "red"], // stimulus set = 4
            ["black", "blue", "red"], // stimulus set = 5
            ["black", "blue", "red"], // stimulus set = 6
            ["black", "blue", "red"], // stimulus set = 7
        ];
        var fileExtension = ".jpg";
        var left = "stim/"+version+"/"+stimuliSet+"/"+stimuliColor[stimuliSet][0]+fileExtension;
        var middle = "stim/"+version+"/"+stimuliSet+"/"+stimuliColor[stimuliSet][1]+fileExtension;
        var right = "stim/"+version+"/"+stimuliSet+"/"+stimuliColor[stimuliSet][2]+fileExtension;
        //const deckPositions = [left, middle, right];


// Shuffles an array.
const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex  = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue      = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex]  = temporaryValue;
    }
  
    return array;
  };

  // Makes a deep copy of an object or array
// const deepCopy = (obj)=>  {
//     if (Object.prototype.toString.call(obj) === '[object Array]') {
//         var out = [], i = 0, len = obj.length;
//         for ( ; i < len; i++ ) {
//             out[i] = arguments.callee(obj[i]);
//         }
//         return out;
//     }
//     if (typeof obj === 'object') {
//         var out = {}, i;
//         for ( i in obj ) {
//             out[i] = arguments.callee(obj[i]);
//         }
//         return out;
//     }
//     return obj;
// }

        // let probabilityNames = ["high", "medium", "low"];
        // let probabilityOrder = shuffle(deepCopy(probabilityNames));

        // let deckColorOrder = shuffle(stimuliColor[[stimuliSet]]);


        // var probabilityToColor = _.zipObject(probabilityOrder, deckColorOrder);
        // var positionToProbability = _.zipObject(deckPositions, probabilityOrder);
        // var probabilityToPosition = _.zipObject(probabilityOrder, deckPositions);
        // var positionToColor = _.zipObject(deckPositions, deckColorOrder);
        // var keyToPosition = _.zipObject(responseKeyList, deckPositions);
        // var keyToProbability = _.zipObject(responseKeyList, probabilityOrder);
        // var theseProbabilities = _.zipObject(probabilityNames, firstHalfProbabilities);


        break;

    case "avatar":
        // Choose avatar placement
        // Select 0-6 to choose avatar set stimulus
        var stimuliColor = [
            ["black", "blue", "red"], // stimulus set = 0
            ["green", "orange", "purple"], // stimulus set = 1
            ["darkred", "darkteal", "orange"], // stimulus set = 2
            ["brown", "lavender", "lightblue"], // stimulus set = 3
            ["lightyellow", "mudbrown", "turquoise"], // stimulus set = 4
            ["darkblue", "lightturquoise", "rose"], // stimulus set = 5
            ["lavender", "red", "turquoise"], // stimulus set = 6
            ["gray", "maroon", "pinkorange"], // stimulus set = 7
        ];
        var fileExtension = ".png";
        var csvPrefix = "social_prl_";
        break;
}

const randomIntFromInterval = (min, max) =>{
    return Math.floor(Math.random() * (max - min + 1) + min);
}






// let firstHalfProbabilities = probabilities[randomIntFromInterval(0, 0)];
// let secondHalfProbabilities = probabilities[randomIntFromInterval(1, 1)];
let numBlocks = 4;
let trialsPerBlock = 40;
let totalTrials = numBlocks * trialsPerBlock;
let breakTrials = [];


let streak = 0;
const maxStreak = 9; // measure of volatility mu3 hgf
let strikes = 0;
const maxStrikes = 2;
let randomizeDecksOn = false;
let interactiveInstructionsOn = false;

let percentile = 25; // cut-off performance percentile for bonus
let bonus = 2; // in dollars
let possiblePoints = [100, -50];
let feedbackDuration = 1;
let feedbackDuration_ms = feedbackDuration * 1000;
const ITI = 0.5;
const ITI_ms = ITI * 1000;
let red = "#C23818";
let green = "#22C228";
let win = randomIntFromInterval(0, 1) > 0.5; // convert to boolean
let feedbackColor = win ? green : red; // green if win, red if loss
let winPoints = 100;
let losePoints = -50;
let points = win ? winPoints : losePoints;
let score = 0;




// Map probabilities to colors
// uses lodash library for zipObject function
// let probabilityToColor = _.zipObject(probabilityOrder, deckColorOrder);
// let positionToProbability = _.zipObject(deckPositions, probabilityOrder);
// let probabilityToPosition = _.zipObject(probabilityOrder, deckPositions);
// let positionToColor = _.zipObject(deckPositions, deckColorOrder);
// let keyToPosition = _.zipObject(responseKeyList, deckPositions);
// let keyToProbability = _.zipObject(responseKeyList, probabilityOrder);
// let theseProbabilities = _.zipObject(probabilityNames, firstHalfProbabilities);

let trialProbabilityArray = [];

// Randomize deck position
// for (let position in positionToColor) {
//   let thisID = "#" + position + "DeckImage";
//   let color = positionToColor[position];
//     $(thisID).attr("src", stimuliPrefix + color + deckImageExtension);
// }


// Data output structure
let trialInfo = {
    deckColors: [],
    deckPositions: [],
    deckProbabilities: [],
    deckProbabilityOrder: [],
    colors: [],
    keys: [],
    positions: [],
    probabilities: [],
    results: [],
    reversals: [],
    trialNums: [],
    RT: [],
    score: [],
};
</script>


