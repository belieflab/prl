const jsPsych = initJsPsych({
    show_progress_bar: true,
    preload_video: [],
    preload_audio: [],
    preload_images: [],
});

let timeline = [];

/*define welcome message*/
const welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <p> Welcome to the experiment!</p>
    <p> Press any key to begin. </p>
    `,
    choice: "NO_KEYS",
};

/*define task instructions*/
const instruction1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instruction1_stim,
    choices: ["0"],
};

/*define task instructions*/
const instruction2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instruction2_stim,
    choices: ["1"],
};

/*define task instructions*/
const instruction3 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instruction3_stim,
    choices: ["2"],
};

/*define task instructions*/
const instruction4 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instruction4_stim,
    choices: ["3"],
};

/*define task instructions*/
const instruction5 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instruction5_stim,
    choices: ["0"],
};

/*define task instructions*/
const instruction6 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instruction6_stim,
    choices: ["0"],
};

const endPracticeInstructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: endPracticeInstructions_stim,
    choices: ["0"],
};

/*display 3 cards/avatars*/
// const cues = {
//     type: jsPsychHtmlKeyboardResponse,
//     stimulus: function () {
//         var html;
//                 html =
//                     "<div class='image-container'>" +
//                     "<img src='" +
//                     stim[0]
//                     "'>" +
//                     "<img src='" +
//                     stim[1]
//                     "'>" +
//                     "<img src='" +
//                     stim[2]
//                     "'>" +
//                     "</div>";

//         return html;
//     },
//     trial_duration: 1000,
//     response_ends_trial: false,

// }

/*add fixation*/
const fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<div style='font-size:40px'>+</div>",
    trial_duration: 500,
    response_ends_trial: false,
};

const fixedReversal = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "reversal",
    trial_duration: 5000,
    response_ends_trial: false,
    on_start: () => {},
};

const randomizeDecks = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "reversal",
    trial_duration: 5000,
    response_ends_trial: false, //trial won't end automatically after response
    on_start: () => {
        let probabilityOrder = [];
        // creates a deep copy of the 'probabilityNames' array; a deep copy means that new array is created with new instances of objects found in original array
        //shuffle the deep copy of 'probabilityNames' array
        probabilityOrder.push(shuffle(deepCopy(probabilityNames))); //changed .append to .push (.append is from Python syntax? so not js syntax?)
        // randomize deck contingencies
        if (randomizeDecksOn) {
            var tempProbabilityOrder = shuffle(deepCopy(probabilityNames));
            while (
                //shuffle until "high" is not in the same position as it was
                tempProbabilityOrder.indexOf("high") ==
                probabilityOrder.indexOf("high")
            ) {
                tempProbabilityOrder = shuffle(tempProbabilityOrder);
            }
        }
    },
};

/*initialize the trails array with the instructions trial and loop through each stroop variable defined in stroop variable, also add the fixation trial to the trials array for each stroop variable*/
const cues = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: () => {
        let html =
            "<div class='image-container'>" +
            "<img class='stimuli-left' src='" +
            stim[0] +
            "'>" +
            "<img class='stimuli-middle' src='" +
            stim[1] +
            "'>" +
            "<img class='stimuli-right' src='" +
            stim[2] +
            "'>" +
            "</div>";
        return html;
    },
    choices: ["1", "2", "3"],

    // trial_duration: 1,
    response_ends_trial: true,
    // data: {
    //     colour: jsPsych.timelineVariable("colour"),
    //     text: jsPsych.timelineVariable("text"),
    //     condition: jsPsych.timelineVariable("condition"),
    //     workerId: workerId,
    //     interview_date: today,
    // },
};

// practice trials
const practiceFeedback = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ["1", "2", "3"],
    // debouncing key press
    // on_start: async function (trial) {
    //     return delayTrialStartIfNeeded().then(() => {
    //         console.log("Trial starting, inputs enabled.");
    //         // Now, inputs are enabled, and the trial is ready to start
    //         // Any setup that needs to happen right before the trial starts can go here
    //         // Since we are using jsPsychHtmlKeyboardResponse, jsPsych handles the response setup
    //     });
    // },
    stimulus: () => {
        let data = jsPsych.data.get().last(1).values(); // Assuming this is async
        let response = data[0].response;
        console.log(response);

        let html;
        if (response == "1") {
            html =
                "<div class='image-container'>" +
                "<img class='stimuli-left' src='" +
                shuffleArray(outcome)[0] +
                "'>" +
                "<img class='stimuli-middle' src='" +
                stim[1] +
                "'>" +
                "<img class='stimuli-right' src='" +
                stim[2] +
                "'>" +
                "</div>";
        } else if (response == "2") {
            html =
                "<div class='image-container'>" +
                "<img class='stimuli-left' src='" +
                stim[0] +
                "'>" +
                "<img class='stimuli-middle' src='" +
                shuffleArray(outcome)[0] +
                "'>" +
                "<img class='stimuli-right' src='" +
                stim[2] +
                "'>" +
                "</div>";
        } else if (response == "3") {
            html =
                "<div class='image-container'>" +
                "<img class='stimuli-left' src='" +
                stim[0] +
                "'>" +
                "<img class='stimuli-middle' src='" +
                stim[1] +
                "'>" +
                "<img class='stimuli-right' src='" +
                shuffleArray(outcome)[0] +
                "'>" +
                "</div>";
        }
        return html;
    },
    response_ends_trial: false,
    trial_duration: 1000,
};

// main trials, with embedded probabilistic reversal learning logic
const trialFeedback = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ["1", "2", "3"],

    // track choices on each trial
    stimulus: () => {
        let data = jsPsych.data.get().last(1).values(); // Assuming this is async
        let response = data[0].response;
        console.log(response);

        // let targetProbabilityIndex = rewardProbabilityFirstHalf.findIndex(obj => obj.contingency === "high");

        // console.log(
        //     "Index of object with probability high is:" +
        //     targetProbabilityIndex
        // );

        let html;

        // Initiate contingency shift based on current trial (i.e., shift starts at trial 81)
        //totalTrials = 10;

        // for easy-hard version
        // if (trialIterator <= (totalTrials/2)){
        //     currentProb = firstHalf; // phase 1 (trials 1-80) reward probability set
        //   } else {
        //     currentProb = secondHalf; // phase 2 (trials 81-160) reward probability set
        // }

        // performance-independent reversal every 40 trials
        if (
            trialIterator === 1 * (totalTrials / totalBlocks) ||
            trialIterator === 3 * (totalTrials / totalBlocks)
        ) {
            let highestProbIndex;
            do {
                highestProbIndex = currentProbability.indexOf(
                    Math.max(...currentProbability)
                );
                currentProbability = shuffleArray(currentProbability);
            } while (
                currentProbability.indexOf(Math.max(...currentProbability)) ===
                highestProbIndex
            );

            streak = 0;
            strike = 0;
        }

        // contingency shift
        if (trialIterator === 2 * (totalTrials / totalBlocks)) {
            let highestProbIndex;
            do {
                highestProbIndex = currentProbability.indexOf(
                    Math.max(...currentProbability)
                );
                currentProbability = shuffleArray([...phaseProb[1]]);
            } while (
                currentProbability.indexOf(Math.max(...currentProbability)) ===
                highestProbIndex
            );

            streak = 0;
            strike = 0;
        }

        // performance-dependent reversal every nine out of 10 consecutive selection of 'high' probability deck
        if (
            currentProbability[response - 1] === Math.max(...currentProbability)
        ) {
            streak++;
            if (streak >= maxStreaks) {
                let highestProbIndex;
                do {
                    highestProbIndex = currentProbability.indexOf(
                        Math.max(...currentProbability)
                    );
                    currentProbability = shuffleArray(currentProbability);
                } while (
                    currentProbability.indexOf(
                        Math.max(...currentProbability)
                    ) === highestProbIndex
                );

                streak = 0;
                strike = 0;
            }
        } else {
            if (strike < maxStrikes) {
                strike++;
            } else {
                streak = 0;
                strike = 0;
            }
        }

        // logic to sample deck with respective reward probability
        if (Math.random() <= currentProbability[response - 1]) {
            observedOutcome = outcome[1]; // output win (+100) card
        } else {
            observedOutcome = outcome[0]; // output lose (-50) card
        }

        // Maps reward probability for each response
        // note: users can input 1,2,3 but we index by 0,1,2 so 1->0, 2->1, 3->2
        if (response == "1") {
            html =
                "<div class='image-container'>" +
                "<img class='stimuli-left' src='" +
                // shuffleArray(outcome)[0]
                observedOutcome + // output win (+100) card based on first half reward probability set
                "'>" +
                "<img class='stimuli-middle' src='" +
                stim[1] +
                "'>" +
                "<img class='stimuli-right' src='" +
                stim[2] +
                "'>" +
                "</div>";
        } else if (response == "2") {
            html =
                "<div class='image-container'>" +
                "<img class='stimuli-left' src='" +
                stim[0] +
                "'>" +
                "<img class='stimuli-middle' src='" +
                observedOutcome +
                "'>" +
                "<img class='stimuli-right' src='" +
                stim[2] +
                "'>" +
                "</div>";
        } else if (response == "3") {
            html =
                "<div class='image-container'>" +
                "<img class='stimuli-left' src='" +
                stim[0] +
                "'>" +
                "<img class='stimuli-middle' src='" +
                stim[1] +
                "'>" +
                "<img class='stimuli-right' src='" +
                observedOutcome +
                "'>" +
                "</div>";
        }

        trialIterator = trialIterator++; // accumulating trials
        return html;
    },
    response_ends_trial: false,
    trial_duration: 1000,
};

// streak/strike logic that we need to revise
// streak += 1;
// if (streak == maxStreak) {
//     streak = 0;
//     strike = 0;
//     let tempProbabilityOrder;
//     // Continue shuffling until "high" is not in the same position as it was
//     do {
//         tempProbabilityOrder = shuffle(deepCopy(probabilityNames));
//     } while (tempProbabilityOrder.indexOf("high") == targetProbabilityIndex);
//     // Update rewardProbabilityFirstHalf with the shuffled probabilities
//     rewardProbabilityFirstHalf = tempProbabilityOrder.map(contingency => ({
//         contingency,
//         probability: tempProbabilityOrder[contingency],
//         // deck: stimRandomize //we don't need this here since its not shift from block to next block..?
//     }));
// }

// streak += 1;
// if (streak == maxStreak) {
//     streak = 0;
//     strike = 0;
//     let tempProbabilityOrder;
//     // Continue shuffling until "high" is not in the same position as it was
//     do {
//         tempProbabilityOrder = shuffle(deepCopy(probabilityNames));
//     } while (tempProbabilityOrder.indexOf("high") == targetProbabilityIndex);
//     // Update rewardProbabilityFirstHalf with the shuffled probabilities
//     rewardProbabilityFirstHalf = tempProbabilityOrder.map(contingency => ({
//         contingency,
//         probability: tempProbabilityOrder[contingency],
//         // deck: stimRandomize
//     }));
// }

// streak += 1;
// if (streak == maxStreak) {
//     streak = 0;
//     strike = 0;
//     let tempProbabilityOrder;
//     // Continue shuffling until "high" is not in the same position as it was
//     do {
//         tempProbabilityOrder = shuffle(deepCopy(probabilityNames));
//     } while (tempProbabilityOrder.indexOf("high") == targetProbabilityIndex);
//     // Update rewardProbabilityFirstHalf with the shuffled probabilities
//     rewardProbabilityFirstHalf = tempProbabilityOrder.map(contingency => ({
//         contingency,
//         probability: tempProbabilityOrder[contingency],
//         // deck: stimRandomize
//     }));
// }

let practiceTrial = {
    timeline: [fixation, cues, practiceFeedback],
    repetitions: 3,
};

let procedureTrialFirstHalf = {
    timeline: [fixation, cues, trialFeedback],
    repetitions: 80,
    timelineVariable: firstHalf,
};

// let procedureTrialSecondHalf = {
//     timeline: [fixation, cues, trialFeedback],
//     repetitions: 80,
//     timelineVariable: secondHalf,
// };

/*define procedure*/
// const firstHalf = {
//     timeline: [fixation, trial],
//     timeline_variables: firstHalfChoices,
// };

// const secondHalf = {
//     timeline: [fixation, trial],
//     timeline_variables: secondHalfChoices,
// };

const dataSave = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: dataSaveAnimation,
    choices: "NO_KEYS",
    trial_duration: 5000,
    on_finish: () => {
        saveData(experimentAlias + "_" + subjectId, jsPsych.data.get().csv()); //function with file name and which type of file as the 2 arguments
        document.getElementById("unload").onbeforeunload = ""; //removes popup (are you sure you want to exit) since data is saved now
        // returns cursor functionality
        $(document).ready(function () {
            $("body").addClass("showCursor"); // returns cursor functionality
            closeFullscreen(); // kill fullscreen
        });
    },
};

const end = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
        "<p style='color:white;'>Thank you!</p>" +
        "<p style='color:white;'>You have successfully completed the experiment and your data has been saved.</p>" +
        // "<p style='color:white;'>To leave feedback on this task, please click the following link:</p>"+
        // "<p style='color:white;'><a href="+feedbackLink+">Leave Task Feedback!</a></p>"+
        // "<p style='color:white;'>Please wait for the experimenter to continue.</p>"+
        "<p style='color:white;'><i>You may now close the expriment window at anytime.</i></p>",
    choices: "NO_KEYS",
    // on_load: function() {
    //   alert(reward);
    // }
};

$.getScript("exp/main.js");
