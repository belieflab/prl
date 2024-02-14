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
        <p> Press any key to begin. </p>`,
    choice: "NO_KEYS",
    on_load: function () {
        $(document).ready(function () {
            $("body").addClass("hideCursor");
        });
    },
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

const instructions = [
    instruction1,
    instruction2,
    instruction3,
    instruction4,
    instruction5,
    instruction6,
];

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

// // MAYBE WILL BE REMOVED // //
// const randomizeDecks = {
//     type: jsPsychHtmlKeyboardResponse,
//     stimulus: "reversal",
//     trial_duration: 5000,
//     response_ends_trial: false, //trial won't end automatically after response
//     on_start: () => {
//         let probabilityOrder = [];
//         // creates a deep copy of the 'probabilityNames' array; a deep copy means that new array is created with new instances of objects found in original array
//         //shuffle the deep copy of 'probabilityNames' array
//         probabilityOrder.push(shuffle(deepCopy(probabilityNames))); //changed .append to .push (.append is from Python syntax? so not js syntax?)
//         // randomize deck contingencies
//         if (randomizeDecksOn) {
//             var tempProbabilityOrder = shuffle(deepCopy(probabilityNames));
//             while (
//                 //shuffle until "high" is not in the same position as it was
//                 tempProbabilityOrder.indexOf("high") ==
//                 probabilityOrder.indexOf("high")
//             ) {
//                 tempProbabilityOrder = shuffle(tempProbabilityOrder);
//             }
//         }
//     },
// };

/*initialize the trails array with the instructions trial and loop through each stroop variable defined in stroop variable, also add the fixation trial to the trials array for each stroop variable*/
const cues = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ["1", "2", "3"], // Initially, there may be no keys allowed if you want to start in a "disabled" state

    // on_start: function (trial) {
    //     if (ignoreKeyPresses) {
    //         // Temporarily clear choices to prevent responses
    //         trial.choices = [];
    //     }
    //     if (!ignoreKeyPresses) {
    //         trial.choices = ["1", "2", "3"];
    //     }
    // },

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
    response_ends_trial: true,

    // trial_duration: 1,
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
                shuffleArray(outcome)[1] +
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
            let highestProbabilityIndex;

            do {
                highestProbabilityIndex = currentProbability.indexOf(
                    Math.max(...currentProbability)
                );
                currentProbability = shuffleArray(currentProbability);
            } while (
                currentProbability.indexOf(Math.max(...currentProbability)) ===
                highestProbabilityIndex
            );

            streak = 0;
            strike = 0;
        }

        // contingency shift
        if (trialIterator === 2 * (totalTrials / totalBlocks)) {
            let highestProbabilityIndex;
            do {
                highestProbabilityIndex = currentProbability.indexOf(
                    Math.max(...currentProbability)
                );
                currentProbability = shuffleArray([...phaseProbabilities[1]]);
            } while (
                currentProbability.indexOf(Math.max(...currentProbability)) ===
                highestProbabilityIndex
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
                let highestProbabilityIndex;
                do {
                    highestProbabilityIndex = currentProbability.indexOf(
                        Math.max(...currentProbability)
                    );
                    currentProbability = shuffleArray(currentProbability);
                } while (
                    currentProbability.indexOf(
                        Math.max(...currentProbability)
                    ) === highestProbabilityIndex
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
        // win = Math.random() <= currentProbability[response - 1];
        // observedOutcome   = win ? outcome[1] : outcome[0];

        // logic to sample deck with respective reward probability
        // 'response - 1' will give position of probability value within currentProbability vector (index)
        // note: users can input 1,2,3 but we index by 0,1,2 so 1->0, 2->1, 3->2
        if (Math.random() <= currentProbability[response - 1]) {
            // observedOutcome = outcome[0]; // output win (100) card
            observedOutcome = "stim/outcome/scaled_win.jpg";
        } else {
            // observedOutcome = outcome[1]; // output lose (-50) card
            observedOutcome = "stim/outcome/scaled_lose.jpg";
        }

        // Maps reward probability for each response

        if (response == "1") {
            html =
                "<div class='image-container'>" +
                "<img class='stimuli-left' src='" +
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

        trialIterator++; // accumulating trials
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

const practiceTrial = {
    timeline: [fixation, cues, practiceFeedback],
    repetitions: 3,
};

const procedureTrial = {
    timeline: [fixation, cues, trialFeedback],
    repetitions: totalTrials,
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
    on_finish: function () {
        saveDataPromise(
            experimentAlias + "_" + subjectId,
            jsPsych.data.get().csv()
        )
            .then((response) => {
                console.log("Data saved successfully.", response);
                // Update the stimulus content directly via DOM manipulation
                const thankYou = `
                <div class="body-white-theme">
                    <p>Thank you!</p>
                    <p>You have successfully completed the experiment and your data has been saved.</p>
                    <!-- <p>To leave feedback on this task, please click the following link:</p> -->
                    <!-- <p><a href="${feedbackLink}">Leave Task Feedback!</a></p> -->
                    <!-- <p>Please wait for the experimenter to continue.</p> -->
                    <p><i>You may now close the experiment window at any time.</i></p>
                </div>`;
                document.querySelector("#jspsych-content").innerHTML = thankYou;
            })
            .catch((error) => {
                console.log("Failed to save data.", error);
                // Update the stimulus content directly via DOM manipulation
                const dataFailure = `
                <div class="error-page">
                    <p>Oh no!</p>
                    <p>An error has occured and your data has not been saved.</p>
                    <p>Please wait for the experimenter to continue.</p>
                </div>`;
                document.querySelector("#jspsych-content").innerHTML =
                    dataFailure;
            })
            .finally(() => {
                document.getElementById("unload").onbeforeunload = ""; // Removes popup
                $("body").addClass("showCursor"); // Returns cursor functionality
                closeFullscreen(); // Kill fullscreen
            });
    },
};

$.getScript("exp/main.js");
