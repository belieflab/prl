"use strict";

const jsPsych = initJsPsych({
    show_progress_bar: true,
    message_progress_bar: "Completion Progress",
    auto_update_progress_bar: false,
});

const timeline = [];

const preload = {
    type: jsPsychPreload,
    images: [outcome, stim],
    show_detailed_errors: true,
};

/*define welcome message*/
const welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[0],
    choice: "NO_KEYS",
    on_load: () => toggleDebugMode(),
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
    choices: ["0"],
};

/*define task instructions*/
const instruction3 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[3],
    choices: ["1"],
};

/*define task instructions*/
const instruction4 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[4],
    choices: ["2"],
};

/*define task instructions*/
const instruction5 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[5],
    choices: ["3"],
};

/*define task instructions*/
const instruction6 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[6],
    choices: ["0"],
};

/*define task instructions*/
const instruction7 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[7],
    choices: ["0"],
};

const instructionSet = [
    instruction1,
    instruction2,
    instruction3,
    instruction4,
    instruction5,
    instruction6,
    instruction7,
];

const endPracticeInstructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[8],
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

// Function to update the confidence bar based on press duration
function updateConfidenceBar(pressDuration) {
    var confidenceBar = document.getElementById('confidence-bar');
    if (!confidenceBar) {
        console.error("Confidence bar element not found!");
        return;
    }
    var maxDuration = 2000; // Max duration in milliseconds for full confidence
    var confidence = Math.min(pressDuration / maxDuration, 1);
    confidenceBar.style.width = (confidence * 100) + '%';
    confidenceBar.style.backgroundColor = `rgba(0, 128, 0, ${confidence})`; // Green color with varying opacity
}

/*define cues with confidence rating*/
const cues_confidence = {
    type: jsPsychHtmlKeyboardResponse,
    response_ends_trial: true,
    choices: ["1", "2", "3"],
    stimulus: () => {
        return `
            <div class='image-container'>
                <img class='stimuli-left' src='${stim[0]}'>
                <img class='stimuli-middle' src='${stim[1]}'>
                <img class='stimuli-right' src='${stim[2]}'>
                <div id="confidence-bar" style="width: 0; height: 20px; background-color: green; margin-top: 20px; transition: width 0.5s;"></div>
            </div>`;
    },
    on_start: function(trial) {
        trial.start_time = Date.now();
    },
    on_finish: function(data) {
        var end_time = Date.now();
        data.press_duration = end_time - data.start_time;
        updateConfidenceBar(data.press_duration);
    }
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
    stimulus: businessLogic, // Display the cards face down
    response_ends_trial: false,
    trial_duration: 1000,
    on_finish: feedbackLogic, // Turn the picked card face up
};

// practice and main trials with confidence bar
const practiceTrial = {
    timeline: [fixation, cues_confidence, practiceFeedback],
    repetitions: 3,
};

// Present progress report messages at every quarter (%) trial
const conditionalProgressMessage = {
    timeline: [
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: () => {
                let percentComplete = calculatePercentComplete();
                return `You are ${percentComplete}% done with the experiment. Please press the (0) key to proceed.`;
            },
            on_finish: () => {
                let percentComplete = calculatePercentComplete();
                jsPsych.setProgressBar(percentComplete / 100);
            },
            choices: ["0"],
        },
    ],
    conditional_function: shouldShowProgressMessage,
};

const procedureTrial = {
    timeline: [fixation, cues_confidence, trialFeedback, conditionalProgressMessage],
    repetitions: getRepetitions(), // toggle between debug and production mode
};

const screenRating1 = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: instructions[9],
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
            $("body").addClass("showCursor");
        });
    },
    on_finish: (data) => {
        writeCandidateKeys(data); // Your custom function
        data.rating_random = jsPsych.data.get().last(1).values()[0].response.rating_random.toLowerCase();
        removeOutputVariables(data, "response", "question_order");
    },
};

const screenRating2 = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: instructions[10],
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
        writeCandidateKeys(data);
        data.rating_sabotage = jsPsych.data.get().last(1).values()[0].response.rating_sabotage.toLowerCase();
        removeOutputVariables(data, "response", "question_order");
    },
};

const dataSave = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: dataSaveAnimation(),
    choices: "NO_KEYS",
    trial_duration: 5000,
    on_finish: writeCsvRedirect,
};

// Load and execute "exp/main.js" using jQuery's $.getScript method.
$.getScript("exp/main.js");
