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

/*add fixation*/
const fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "+",
    trial_duration: 1000,
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
            while ( //shuffle until "high" is not in the same position as it was
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
    stimulus: () => {// Define a function to generate HTML stimulus dynamically?
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
    choice: ["1", "2", "3"],

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

/*initialize the trails array with the instructions trial and loop through each stroop variable defined in stroop variable, also add the fixation trial to the trials array for each stroop variable*/
const practiceFeedback = {
    type: jsPsychHtmlKeyboardResponse,
    choice: "NO_KEYS",

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

const trialFeedback = {
    type: jsPsychHtmlKeyboardResponse,
    choice: "NO_KEYS",

    stimulus: () => {
        let data = jsPsych.data.get().last(1).values(); // Assuming this is async
        let response = data[0].response;
        console.log(response);

        let targetProbabilityIndex = rewardProbabilityFirstHalf.findIndex(obj => obj.contingency === "high");

        console.log(
            "Index of object with probability high is:" +
            targetProbabilityIndex
        );

        let html;

        // users can input 1,2,3 but we index by 0,1,2 so 1->0, 2->1, 3->2
        if (response == "1" && targetProbabilityIndex == 0) {
            html =
                "<div class='image-container'>" +
                "<img class='stimuli-left' src='" +
                "stim/outcome/win.jpg" +
                "'>" +
                "<img class='stimuli-middle' src='" +
                stim[1] +
                "'>" +
                "<img class='stimuli-right' src='" +
                stim[2] +
                "'>" +
                "</div>";
            streak += 1;
            if (streak == maxStreak) {
                streak = 0;
                strike = 0;
                let tempProbabilityOrder;
                // Continue shuffling until "high" is not in the same position as it was
                do {
                    tempProbabilityOrder = shuffle(deepCopy(probabilityNames));
                } while (tempProbabilityOrder.indexOf("high") == targetProbabilityIndex);
                // Update rewardProbabilityFirstHalf with the shuffled probabilities
                rewardProbabilityFirstHalf = tempProbabilityOrder.map(contingency => ({
                    contingency,
                    probability: tempProbabilityOrder[contingency],
                    // deck: stimRandomize //we don't need this here since its not shift from block to next block..?
                }));
            }
        } else if (response == "2" && targetProbabilityIndex == 1) {
            html =
                "<div class='image-container'>" +
                "<img class='stimuli-left' src='" +
                stim[0] +
                "'>" +
                "<img class='stimuli-middle' src='" +
                "stim/outcome/win.jpg" +
                "'>" +
                "<img class='stimuli-right' src='" +
                stim[2] +
                "'>" +
                "</div>";
            streak += 1;
            if (streak == maxStreak) {
                streak = 0;
                strike = 0;
                let tempProbabilityOrder;
                // Continue shuffling until "high" is not in the same position as it was
                do {
                    tempProbabilityOrder = shuffle(deepCopy(probabilityNames));
                } while (tempProbabilityOrder.indexOf("high") == targetProbabilityIndex);
                // Update rewardProbabilityFirstHalf with the shuffled probabilities
                rewardProbabilityFirstHalf = tempProbabilityOrder.map(contingency => ({
                    contingency,
                    probability: tempProbabilityOrder[contingency],
                    // deck: stimRandomize
                }));
            }
        } else if (response == "3" && targetProbabilityIndex == 2) {
            html =
                "<div class='image-container'>" +
                "<img class='stimuli-left' src='" +
                stim[0] +
                "'>" +
                "<img class='stimuli-middle' src='" +
                stim[1] +
                "'>" +
                "<img class='stimuli-right' src='" +
                "stim/outcome/win.jpg" +
                "'>" +
                "</div>";
            streak += 1;
            if (streak == maxStreak) {
                streak = 0;
                strike = 0;
                let tempProbabilityOrder;
                // Continue shuffling until "high" is not in the same position as it was
                do {
                    tempProbabilityOrder = shuffle(deepCopy(probabilityNames));
                } while (tempProbabilityOrder.indexOf("high") == targetProbabilityIndex);
                // Update rewardProbabilityFirstHalf with the shuffled probabilities
                rewardProbabilityFirstHalf = tempProbabilityOrder.map(contingency => ({
                    contingency,
                    probability: tempProbabilityOrder[contingency],
                    // deck: stimRandomize
                }));
            }
        } else {
            html =
                "<div class='image-container'>" +
                "<img class='stimuli-left' src='" +
                "stim/outcome/lose.jpg" +
                "'>" +
                "<img class='stimuli-middle' src='" +
                "stim/outcome/lose.jpg" +
                "'>" +
                "<img class='stimuli-right' src='" +
                "stim/outcome/lose.jpg" +
                "'>" +
                "</div>";
            strike += 1;
            // If streak equals maxStreak, reset streak and shuffle probabilities
            if (strike == maxStrike) {
                strike = 0;
                streak = 0;
                let tempProbabilityOrder;
                // Continue shuffling until "high" is not in the same position as it was
                do {
                    tempProbabilityOrder = shuffle(deepCopy(probabilityNames));
                } while (tempProbabilityOrder.indexOf("high") == targetProbabilityIndex);
                // Update rewardProbabilityFirstHalf with the shuffled probabilities
                rewardProbabilityFirstHalf = tempProbabilityOrder.map(contingency => ({
                    contingency,
                    probability: tempProbabilityOrder[contingency],
                    deck: stimRandomize
                }));
            }
        }

        return html;
    },
    response_ends_trial: false,
    trial_duration: 1000,
};


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
