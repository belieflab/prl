# Probabalistic Reversal Learning Task
The PRL Task is a computer-based task/game designed to understand decision-making behavior based on a series of trials with probabilistic rewards. In each trial, subjects are presented with three options from which to select, and their choice will either gain them points towards an overall score or lose them points. In addition to scoring as many points as possible throughout the task, subjects are asked with locating/selecting - on each trial - the option that has the highest likelihood of reward - which, in turn, will allow them to get a high score.
This task has 160 trials.
* Primary outcome variables (e.g., win-switching)
* Description of PRL rule strategy, etc
* Adopt task information from belieflab wiki

## Dependencies
PHP Version 7.x or PHP Version 8.x

## Repository General Information and Cloning
* To clone this repository: `git clone git@github.com:belieflab/prl.git --recurse-submodules` (this will initialize the `wrap` submodule)
* When pulling changes, run `./sync.sh` to be sure to update the `wrap` submodule

## PRL General Requirements: 
* Transpile code from socialPRL (github.com/belieflab/socialPRL) to prl (github.com/belieflab/prl)
* Add in Trevor's 'sabotage' version of PRL for a total of three PRL versions ('decks', 'avatars', 'sabotage') (done 02/19/2024, need to shuffle stim at the beginning still)
* Add in additional end-of-task questions
* Have different language versions of the PRL

## PRL Logic Requirements:
* Number of trials: 160
* Number of choices: 3
* Rewards: +100 or -50 
* Accumulation of rewards (reward tally): display trial-by-trial reward as accumulated ones
* Phase probability set: first 80 trials - [0.9 0.5 0.1]; last 80 trials - [0.8 0.4 0.2]
* Performance-independent reversal: fixed reversal at every 40 trials
* Performance-dependent reversal: variable reversals once nine consecutive choices of highest reward selection
* Streak & strike: streak-strike logic with two allowed mistakes before resetting of streak/strike count 
* Contingency shift: fixed shift at trial 80
* Reset streak at fixed reversal/shift: fixed reversal and shift resets streak
* Continue to shuffle if index of highest reward is same as previous trial: ensuring that after every shuffle, the index of the highest reward probability changes

## Responsibilities:
* (Praveen and Josh) Compile PRL instructions in jsPsych framework
* Add objects for displaying cards/avatars 
* Add image_preload
## 02/08/2024 deadlines/important stuff
* hard deadline for BLAM is 02/20/2024
## To-Dos 02/13/2024
* total points
* progress screen (25%, 50%, press 0 to continue)
* switch for difficulty and for version (include Trevor's "sabotage" instructions; https://github.com/belieflab/socialPRL/tree/trevor_experimenting)
* extra two questions at the end from Trevor? same as Praveen's paper?
* sticky-keys (JGK)
* output (dataSave)
* pilot / then give to Trevor for his own piloting



## Structure
# Trial structure
* fixation
* cues
* - stimulus
* - duration
* - 
* feedback
* confidence
# Task structure

4 blocks
40 trials per block
1-40, 41-80, 81-120, 121-160
note that: index starts at 0, so when index = 40, trail = 41, so switch on trial 41 (which is index = 40)

3 practice trials

## task conditions
easy/hard hard/easy easy/easy hard/hard

expected uncertainty (probability reversal)
that each deck contains both winning and losing cards, but in different amounts
"the encounter expected uncertainty as probability win or loss feedback (in different amojunts)
"your job is to select the best deck" with the highest reward probability
best check will change, find the best deck

porbability of reward: [0.9, 0.5, 0.1] (easy)

unexpected uncertainty (contigency shift)
"re-assignment of reward probability between options"
half way through the experiment, the best deck will change

porbability of reward: [0.8, 0.4, 0.2] (hard)

## randomization

  
    // randomize deck contingencies
    if (randomizeDecksOn) {
        var tempProbabilityOrder = shuffle(deepCopy(probabilityNames));
      while (tempProbabilityOrder.indexOf("high") == probabilityOrder.indexOf("high")) {
          tempProbabilityOrder = shuffle(tempProbabilityOrder);
      }

two types of reversals:

1. fixed-based reversals:
        task characteristic
        every 40 trials there is a reversal
        probabilities changes every 40 trails
        e.g. [0.9, 0.5, 0.1] -> [0.1, 0.9, 0.5] (reversal)
      
2. performance-based reversals:
        how the user performs
        based off users performance
        if user select the best deck 90% of the time, then the best deck will change (e.g.)
        if (streak >= maxStreak) {
                        randomizeDecksOn = true;
                    }
        you can get one strike and still maintain a streak
        the second strike will reset both strike and streak

          if (thisProbability == "high") {
                        streak += 1;
                    } else {
                        if (streak > 0) {
                            strikes += 1;
                        }

                        if (strikes >= maxStrikes) {
                            streak = 0;
                            strikes = 0;
                        }
                    }

                    streak increses up to 9; once it gets to 9, reset
                    you can keep streak if you get two strikes
                    if you get three strikes, then streak and strikes reset; once it gets to 3, reset


at 81st trial there is a shift to the hard condition (and also a randomization of the deck probabilities)

var probabilityNames = ["high", "medium", "low"];
var probabilityOrder = shuffle(deepCopy(probabilityNames));
var deckPositions = ["left", "middle", "right"];
var deckColorOrder = shuffle(stimuliColor[[stimuliSet]]);


// Randomize deck position
for (var position in positionToColor) {
    var thisID = "#" + position + "DeckImage";
    var color = positionToColor[position];
    $(thisID).attr("src", stimuliPrefix + color + deckImageExtension);
}


var trialInfo = {
  deckColors: [],
  deckPositions: [],
  deckProbabilities:[],
  deckProbabilityOrder: [],
  colors: [],
  keys: [],
  positions: [],
  probabilities: [],
  results: [],
  reversals: [],
  trialNums: [],
  RT: [],
  score: []
};

## Development Guide

#### Install and configure XAMPP:
1. [Download XAMPP](https://www.apachefriends.org/download.html) with PHP version 7.3.19
2. Open XAMPP and click "Start" to boot the XAMPP application.
3. Navigate to "Services" and click "Start All" button.
4. Navigate to "Network", select localhost:8080, and click "Enable".
5. Navigate to "Volumes" and click "Mount".

#### Clone the git repository:
6. Open Terminal and navigate to the htdocs directory:

    Mac/Linux:

        cd ~/.bitnami/stackman/machines/xampp/volumes/root/htdocs
    Windows:

        cd C://xampp//htdocs

7. Clone into htdocs:

        git clone https://github.com/belieflab/jsPsychWrapper-v6.3.git

#### Modifty permissions:
8. Copy this text into your terminal from the htdocs folder (the folder you are already in).

        chmod -R 777 jsPsychWrapper-v6.3/
        
#### Start experiment:     
9. Click this URL: [http://localhost/jsPsychWrapper-v6.3](http://localhost/jsPsychWrapper-v6.3)
      
      
      
### BRAVO! You're a XAMPP master.
        

