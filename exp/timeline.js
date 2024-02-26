const jsPsych = initJsPsych({
    show_progress_bar: true,
    message_progress_bar: "Completion Progress",
    auto_update_progress_bar: false,
    preload_video: [],
    preload_audio: [],
    preload_images: [],
});

const timeline = [];

/*define welcome message*/
const welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[0],
    choice: "NO_KEYS",
    on_load: () => {
        switch (debug) {
            case true:
                $(document).ready(() => {
                    $("body").addClass("showCursor");
                });
                break;
            case false:
                $(document).ready(() => {
                    $("body").addClass("hideCursor");
                });
                break;
        }
        // Hide progress bar from screen
        document.getElementById(
            "jspsych-progressbar-container"
        ).style.visibility = "hidden";
    },
};

/*define task instructions*/
const instruction1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[1],
    choices: ["0"],
};

/*define task instructions*/
const instruction2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[2],
    choices: ["1"],
};

/*define task instructions*/
const instruction3 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[3],
    choices: ["2"],
};

/*define task instructions*/
const instruction4 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[4],
    choices: ["3"],
};

/*define task instructions*/
const instruction5 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[5],
    choices: ["0"],
};

/*define task instructions*/
const instruction6 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[6],
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
    stimulus: instructions[7],
    choices: ["0"],
    on_load: () => {
        // Make visible progress bar to screen
        document.getElementById(
            "jspsych-progressbar-container"
        ).style.visibility = "visible";
    },
};

/*add fixation*/
const fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<div style='font-size:40px'>+</div>",
    trial_duration: 500,
    response_ends_trial: false,
};

/*initialize the trails array with the instructions trial and loop through each stroop variable defined in stroop variable, also add the fixation trial to the trials array for each stroop variable*/
const cues = {
    type: jsPsychHtmlKeyboardResponse,
    response_ends_trial: true,
    choices: ["1", "2", "3"], // Initially, there may be no keys allowed if you want to start in a "disabled" state
    stimulus: () => {
        return `
            <div class='image-container'>
                <img class='stimuli-left' src='${stim[0]}'>
                <img class='stimuli-middle' src='${stim[1]}'>
                <img class='stimuli-right' src='${stim[2]}'>
            </div>`;
    },    
};

// practice trials
const practiceFeedback = {
    type: jsPsychHtmlKeyboardResponse,
    response_ends_trial: false,
    trial_duration: 1000,
    choices: ["1", "2", "3"],
    stimulus: () => {
        let data = jsPsych.data.get().last(1).values(); // Assuming this is async
        let response = data[0].response;
        // console.log(response);

        let html;
        if (response === "1") {
            html = `
                <div class='image-container'>
                    <img class='stimuli-left' src='${shuffleArray(outcome)[0]}'>
                    <img class='stimuli-middle' src='${stim[1]}'>
                    <img class='stimuli-right' src='${stim[2]}'>
                </div>`;
        } else if (response === "2") {
            html = `
                <div class='image-container'>
                    <img class='stimuli-left' src='${stim[0]}'>
                    <img class='stimuli-middle' src='${
                        shuffleArray(outcome)[0]
                    }'>
                    <img class='stimuli-right' src='${stim[2]}'>
                </div>`;
        } else if (response === "3") {
            html = `
                <div class='image-container'>
                    <img class='stimuli-left' src='${stim[0]}'>
                    <img class='stimuli-middle' src='${stim[1]}'>
                    <img class='stimuli-right' src='${
                        shuffleArray(outcome)[1]
                    }'>
                </div>`;
        }
        return html;
    },
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

        // performance-independent reversal every 40 trials
        if (
            trialIterator === 1 * (totalTrials / blocks) ||
            trialIterator === 3 * (totalTrials / blocks)
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
        if (trialIterator === 2 * (totalTrials / blocks)) {
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
        let observedOutcome;
        //let win; // boolean to track win/lose outcome; initialize

        // logic to sample deck with respective reward probability
        // 'response - 1' will give position of probability value within currentProbability vector (index)
        // note: users can input 1,2,3 but we index by 0,1,2 so 1->0, 2->1, 3->2
        if (Math.random() <= currentProbability[response - 1]) {
            // observedOutcome = outcome[0]; // output win (100) card
            observedOutcome = `stim/${version}/outcome/scaled_win.png`;
            win = true;
        } else {
            // observedOutcome = outcome[1]; // output lose (-50) card
            observedOutcome = `stim/${version}/outcome/scaled_lose.png`;
            win = false;
        }

        // calculates total points earned
        let points = win ? winPoints : losePoints;
        score += points;

        // Maps reward probability for each response
        let html;

        if (response == "1") {
            html = `
                <div class='image-container'>
                    <img class='stimuli-left' src='${observedOutcome}'>
                    <img class='stimuli-middle' src='${stim[1]}'>
                    <img class='stimuli-right' src='${stim[2]}'>
                </div>`;
        } else if (response == "2") {
            html = `
                <div class='image-container'>
                    <img class='stimuli-left' src='${stim[0]}'>
                    <img class='stimuli-middle' src='${observedOutcome}'>
                    <img class='stimuli-right' src='${stim[2]}'>
                </div>`;
        } else if (response == "3") {
            html = `
                <div class='image-container'>
                    <img class='stimuli-left' src='${stim[0]}'>
                    <img class='stimuli-middle' src='${stim[1]}'>
                    <img class='stimuli-right' src='${observedOutcome}'>
                </div>`;
        }

        trialIterator++; // accumulating trials

        // store relevant variables in the object to print a nice output
        // jsPsych.getCurrentTrial().data.win = win;
        // response = jsPsych.data.get().last(1).values()[0].response;

        return html;
    },
    response_ends_trial: false,
    trial_duration: 1000,
    on_finish: (data) => {
        let rt = jsPsych.data.get().last(2).values()[0].rt;
        let response = jsPsych.data.get().last(2).values()[0].response;
        writeCandidateKeys(data);
        // removeOutputVariables(data, [ // not working
        //     "stimulus",
        //     "trial_type",
        //     "internal_node_id",
        // ]);
        data.difficulty = difficulty;
        data.max_strikes = maxStrikes;
        data.max_streaks = maxStreaks;
        data.index = trialIterator;
        data.first_half_probabilities = phaseProbabilities[0];
        data.second_half_probabilities = phaseProbabilities[1];
        data.deck_probabilities = currentProbability;
        data.streak = streak;
        data.strike = strike;
        data.response = response;
        data.rt = rt;
        data.key_press =
            response == 1 ? 49 : response == 2 ? 50 : response == 3 ? 51 : null;
        console.log(win);
        data.reward_type = win;
        if (jsPsych.data.get().last(2).values()[0].index == 1) {
            data.reversal_type = false; // Not enough data to compare
        } else {
            // Compare the current trial (.last(2)) and the previous trial (.last(5)) deck contingencies, and if different, then reversal occurred
            data.reversal_type =
                jsPsych.data.get().last(2).values()[0].deck_contingencies !=
                jsPsych.data.get().last(5).values()[0].deck_contingencies
                    ? true
                    : false;
        } // How to compute performance-dependent reversals from `reversal_type` (previously known as `trial_type`)?: Substract trials indexed of 40,80, and 120.
        data.reward_tally = score;
    },
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
            stimulus: () => {
                let percentComplete = calculatePercentComplete();
                // Create a progress message trial
                return `You are ${percentComplete}% done with the experiment. Please press the (0) key to proceed.`;
            },
            on_finish: () => {
                let percentComplete = calculatePercentComplete();
                jsPsych.setProgressBar(percentComplete / 100); // set progress bar to percentComplete full.
            },
            choices: ["0"],
        },
    ],
    conditional_function: shouldShowProgressMessage,
};

const procedureTrial = {
    timeline: [fixation, cues, trialFeedback, conditionalProgressMessage],
    repetitions: getRepetitions(), // toggle between debug and production mode
};

const screenRating1 = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: instructions[8],
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
        $(document).ready(() => {
            $("body").addClass("showCursor"); // returns cursor functionality
        });
    },
    on_finish: (data) => {
        writeCandidateKeys(data); // Your custom function
        // Get the last trial's data and parse the 'responses' field
        data.rating_random = jsPsych.data
            .get()
            .last(1)
            .values()[0]
            .response.rating_random.toLowerCase();
        removeOutputVariables(data, "response", "question_order");
    },
};

const screenRating2 = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: instructions[9],
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
        writeCandidateKeys(data); // Your custom function
        // Get the last trial's data and parse the 'responses' field
        data.rating_sabotage = jsPsych.data
            .get()
            .last(1)
            .values()[0]
            .response.rating_sabotage.toLowerCase();
        removeOutputVariables(data, "response", "question_order");
    },
};

const dataSave = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: dataSaveAnimation(),
    choices: "NO_KEYS",
    trial_duration: 5000,
    on_finish: () => {
        const updatedScore =
            typeof score !== "undefined"
                ? score
                : jsPsych.data.get().select("score").values.slice(-1)[0]; // Replace 'score' with actual data key if necessary

        // Now, generate the thank you message with the updated score
        const thankYou = instructions[10](updatedScore);

        saveDataPromise(
            `${experimentAlias}_${subjectId}`,
            jsPsych.data.get().csv()
        )
            .then((response) => {
                console.log("Data saved successfully.", response);
                // Update the stimulus content directly via DOM manipulation
                document.querySelector("#jspsych-content").innerHTML = thankYou;
            })
            .catch((error) => {
                console.error("Failed to save data.", error);
                // Check if the error object has 'error' property and use it, otherwise convert object to string
                let errorMessage = error.error || JSON.stringify(error);
                switch (errorMessage) {
                    case '{"success":false}':
                        errorMessage = `The ./data directory does not exit on this server.`;
                        break;
                    case "Not Found":
                        errorMessage = `There was an error saving the file to disk.`;
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

// Load and execute "exp/main.js" using jQuery's $.getScript method.
$.getScript("exp/main.js");
