const jsPsych = initJsPsych({
    show_progress_bar: true,
    message_progress_bar: "Completion Progress",
    auto_update_progress_bar: false,
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
    on_load: () => {
        $(document).ready(() => {
            $("body").addClass("hideCursor");
        });
        // Hide progress bar from screen
        document.getElementById(
            "jspsych-progressbar-container"
        ).style.visibility = "hidden";
    },
};

/*define task instructions*/
const instruction1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[0],
    choices: ["0"],
};

/*define task instructions*/
const instruction2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[1],
    choices: ["1"],
};

/*define task instructions*/
const instruction3 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[2],
    choices: ["2"],
};

/*define task instructions*/
const instruction4 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[3],
    choices: ["3"],
};

/*define task instructions*/
const instruction5 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[4],
    choices: ["0"],
};

/*define task instructions*/
const instruction6 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[5],
    choices: ["0"],
};

const instructionSet = [
    instruction1,
    instruction2,
    instruction3,
    instruction4,
    instruction5,
    instruction6,
];

const endPracticeInstructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[6],
    choices: ["0"],
    on_load: function () {
        // Make visible progress bar to screen
        document.getElementById(
            "jspsych-progressbar-container"
        ).style.visibility = "visible";
    },
};

// breakText = "You have completed the task. Your final score is " + score + ".\n" + '<br>' +
// "You have successfully completed the experiment and your data has been saved.\n" + '<br>' +
// "Please move on to the second part of the task at this link:\n" + '<br>' +
// "<a href="+qualtrics+">Qualtrics</a>\n" + '<br>' +
//     // "Please wait for the experimenter to continue.\n"+ '<br>' +
// "You may now close the expriment window at anytime.\n";

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

        // calculates total points earned
        win = Math.random() <= currentProbability[response - 1];
        points = win ? winPoints : losePoints;
        score += points;

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

const practiceTrial = {
    timeline: [fixation, cues, practiceFeedback],
    repetitions: 3,
};

// Present progress report messages at every quarter (%) trial
const conditionalProgressMessage = {
    timeline: [
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function () {
                let percentComplete = calculatePercentComplete();
                // Create a progress message trial
                return (
                    "You are " +
                    percentComplete +
                    "% done with the experiment. Please press the (0) key to proceed."
                );
            },
            on_finish: function () {
                let percentComplete = calculatePercentComplete();
                jsPsych.setProgressBar(percentComplete / 100); // set progress bar to percentComplete full.
            },
            choices: ["0"],
        },
    ],
    conditional_function: shouldShowProgressMessage,
};

// ADD FINAL COMPLETION MESSAGE AT THE END OF EXPERIMENT
// breakText = "You have completed the task. Your final score is " + score + ".\n" + '<br>' +
// "You have successfully completed the experiment and your data has been saved.\n" + '<br>' +
// "Please move on to the second part of the task at this link:\n" + '<br>' +
// "<a href="+qualtrics+">Qualtrics</a>\n" + '<br>' +
//     // "Please wait for the experimenter to continue.\n"+ '<br>' +
// "You may now close the expriment window at anytime.\n";

let procedureTrial = {
    timeline: [fixation, cues, trialFeedback, conditionalProgressMessage],
    repetitions: totalTrials,
};

const screenRating1 = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: instructions[7],
            name: "rating_random",
            options: [
                "Definitely Not",
                "Probably Not",
                "Unsure",
                "Probably Yes",
                "Definitely Yes",
            ],
            required: true,
            horizontal: true,
        },
    ],
    choices: "NO_KEYS",
    on_start: () => {
        document.getElementById("unload").onbeforeunload = "";
        $(document).ready(function () {
            $("body").addClass("showCursor"); // returns cursor functionality
        });
    },
    on_finish: (data) => {
        data.subjectkey = GUID;
        data.src_subject_id = workerId;
        data.site = siteNumber;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
        data.phenotype = groupStatus;
        data.visit = visit;
        data.handedness = handedness;
        data.version = version;

        var ratingRandom = jsPsych.data.get().select("responses").values[0];

        // var currentData = jsPsych.currentTrial().data;
        console.log(ratingRandom);
        data.rating_random = ratingRandom;
    },
};
const screenRating2 = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: instructions[8],
            name: "rating_sabotage",
            options: [
                "Definitely Not",
                "Probably Not",
                "Unsure",
                "Probably Yes",
                "Definitely Yes",
            ],
            required: true,
            horizontal: true,
        },
    ],
    choices: "NO_KEYS",
    on_finish: (data) => {
        data.subjectkey = GUID;
        data.src_subject_id = workerId;
        data.site = siteNumber;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
        data.phenotype = groupStatus;
        data.visit = visit;
        data.handedness = handedness;
        data.version = version;
        var ratingSabotage = jsPsych.data.get().select("responses").values[0];
        data.rating_sabotage = ratingSabotage;
        // var currentData = jsPsych.currentTrial().data;
        console.log(ratingSabotage);
    },

    // trial_duration: 60000,
};

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
                const score = score;
                console.log("Data saved successfully.", response);
                // Update the stimulus content directly via DOM manipulation
                const thankYou = `
                <div class="body-white-theme">
                    <p>Thank you!</p>
                    <p>You have successfully completed the experiment and your data has been saved.</p>
                    <p>Your final score is ${score}.</p>
                    <!-- <p>To leave feedback on this task, please click the following link:</p> -->
                    <!-- <p><a href="${feedbackLink}">Leave Task Feedback!</a></p> -->
                    <!-- <p>Please wait for the experimenter to continue.</p> -->
                    <p><i>You may now close the experiment window at any time.</i></p>
                </div>`;
                document.querySelector("#jspsych-content").innerHTML = thankYou;
            })
            .catch((error) => {
                console.log("Failed to save data.", error);
                // Check if the error object has 'error' property and use it, otherwise convert object to string
                let errorMessage = error.error || JSON.stringify(error);
                switch (errorMessage) {
                    case '{"success":false}':
                        errorMessage =
                            "The ./data directory does not exit on this server.";
                        break;
                    case "Not Found":
                        errorMessage =
                            "There was an error saving the file to disk.";
                        break;
                    default:
                        errorMessage = "Unknown error.";
                }
                // Update the stimulus content directly via DOM manipulation
                const dataFailure = `
                <div class="error-page">
                    <p>Oh no!</p>
                    <p>An error has occured and your data has not been saved:</p>
                    <p>${errorMessage}</p>
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
