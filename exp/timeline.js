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
    on_success: function (file) {
        console.log("File successfully preloaded:", file);
    },
    on_error: function (file) {
        console.error("Error preloading file:", file);
    },
    on_complete: function (data) {
        console.log("Preloading completed");
    },
};

/*define welcome message*/
const welcome = {
    type: jsPsychTouchResponse,
    stimulus: instructions[0],
    choices: ['0'],
    image_ids: [],
    allow_screen_touch: true
  };

/*define task instructions*/
const instruction1 = {
    type: jsPsychTouchResponse,
    stimulus: instructions[1],
    choices: ['0'],
    image_ids: [],
    allow_screen_touch: true
  };


/*define task instructions*/
const instruction2 = {
    type: jsPsychTouchResponse,
    stimulus: instructions[2],
    choices: ['0'],
    image_ids: [],
    allow_screen_touch: true
  };


/*define task instructions*/
const instruction3 = {
    type: jsPsychTouchResponse,
    stimulus: instructions[3],
    choices: ['1'],  // Allow keyboard responses 1,
    touch_elements: ['stimuli-left'],  // Enable touch on these specific elements
    allow_screen_touch: false,
  };

/*define task instructions*/
const instruction4 = {
    type: jsPsychTouchResponse,
    stimulus: instructions[4],
    choices: ['2'],  // Allow keyboard responses 1,
    touch_elements: ['stimuli-middle'],  // Enable touch on these specific elements
    allow_screen_touch: false,
  };

/*define task instructions*/
const instruction5 = {
    type: jsPsychTouchResponse,
    stimulus: instructions[5],
    choices: ['3'],  // Allow keyboard responses 1,
    touch_elements: ['stimuli-right'],  // Enable touch on these specific elements
    allow_screen_touch: false,
  };

/*define task instructions*/
const instruction6 = {
    type: jsPsychTouchResponse,
    stimulus: instructions[6],
    choices: ['0'],
    image_ids: [],
    allow_screen_touch: true
  };


/*define task instructions*/
const instruction7 = {
    type: jsPsychTouchResponse,
    stimulus: instructions[7],
    choices: ['0'],
    image_ids: [],
    allow_screen_touch: true
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

// const endPracticeInstructions = {
//     type: jsPsychHtmlKeyboardResponse,
//     stimulus: instructions[8],
//     choices: ["0"],
//     on_load: () => {
//         // Make visible progress bar to screen
//         document.getElementById(
//             "jspsych-progressbar-container"
//         ).style.visibility = "visible";
//     },
// };

const endPracticeInstructions = {
    type: jsPsychTouchResponse,
    stimulus: instructions[8],
    choices: ['0'],
    image_ids: [],
    allow_screen_touch: true,
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

/*initialize the trials array with the instructions trial and loop through each stroop variable defined in stroop variable, also add the fixation trial to the trials array for each stroop variable*/
// const cues = {
//     type: jsPsychHtmlKeyboardResponse,
//     response_ends_trial: true,
//     choices: ["1", "2", "3"], // Initially, there may be no keys allowed if you want to start in a "disabled" state
//     stimulus: () => {
//         return `
//             <div class='image-container'>
//                 <img class='stimuli-left' src='${stim[0]}'>
//                 <img class='stimuli-middle' src='${stim[1]}'>
//                 <img class='stimuli-right' src='${stim[2]}'>
//             </div>`;
//     },
// };

const cues = {
    type: jsPsychTouchResponse,
    response_ends_trial: true,
    choices: ["1", "2", "3"],  // Allow keyboard responses 1,
    touch_elements: ["stimuli-left", "stimuli-middle", "stimuli-right"],  // Enable touch on these specific elements
    allow_screen_touch: false,
    stimulus: () => {
        return `
            <div class='image-container'>
                <img class='stimuli-left' src='${stim[0]}'>
                <img class='stimuli-middle' src='${stim[1]}'>
                <img class='stimuli-right' src='${stim[2]}'>
            </div>`;
    },
  };

/*initialize the trials array with the instructions trial and loop through each stroop variable defined in stroop variable, also add the confidence rating to the trials array for each stroop variable*/
const cues_confidence = {
    type: jsPsychTouchResponse,
    response_ends_trial: true,
    choices: ["1", "2", "3"], 
    touch_elements: ["stimuli-left", "stimuli-middle", "stimuli-right"],
    allow_screen_touch: false,
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
// const practiceFeedback = {
//     type: jsPsychHtmlKeyboardResponse,
//     response_ends_trial: false,
//     trial_duration: 1000,
//     choices: ["1", "2", "3"],
//     stimulus: () => {
//         let data = jsPsych.data.get().last(1).values(); // Assuming this is async
//         let response = data[0].response;
//         // console.log(response);

//         let html;
//         if (response === "1") {
//             html = `
//                 <div class='image-container'>
//                     <img class='stimuli-left' src='${shuffleArray(outcome)[0]}'>
//                     <img class='stimuli-middle' src='${stim[1]}'>
//                     <img class='stimuli-right' src='${stim[2]}'>
//                 </div>`;
//         } else if (response === "2") {
//             html = `
//                 <div class='image-container'>
//                     <img class='stimuli-left' src='${stim[0]}'>
//                     <img class='stimuli-middle' src='${
//                         shuffleArray(outcome)[0]
//                     }'>
//                     <img class='stimuli-right' src='${stim[2]}'>
//                 </div>`;
//         } else if (response === "3") {
//             html = `
//                 <div class='image-container'>
//                     <img class='stimuli-left' src='${stim[0]}'>
//                     <img class='stimuli-middle' src='${stim[1]}'>
//                     <img class='stimuli-right' src='${
//                         shuffleArray(outcome)[1]
//                     }'>
//                 </div>`;
//         }
//         return html;
//     },
// };

const practiceFeedback = {
    type: jsPsychTouchResponse,
    response_ends_trial: false,
    trial_duration: 1000,
    choices: ["1", "2", "3"],  // Keep the keyboard choices
    touch_elements: [], // No touchable elements needed for feedback
    allow_screen_touch: false, // Don't allow screen touch for feedback
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
    type: jsPsychTouchResponse,
    choices: ["1", "2", "3"],  // Keep keyboard choices
    touch_elements: [], // No touchable elements needed for feedback
    allow_screen_touch: false, // Don't allow screen touch for feedback
    stimulus: businessLogic, // Display the cards face down
    response_ends_trial: false,
    trial_duration: 1000,
    on_finish: feedbackLogic, // Turn the picked card face up
};

// const practiceTrial = {
//     timeline: [fixation, cues, practiceFeedback],
//     repetitions: 3,
// };

const practiceTrial = {
    timeline: [fixation, cues_confidence, practiceFeedback],
    repetitions: 3,
};

// Present progress report messages at every quarter (%) trial
// Present progress report messages at every quarter (%) trial
const conditionalProgressMessage = {
    timeline: [
        {
            type: jsPsychTouchResponse,
            stimulus: () => {
                let percentComplete = calculatePercentComplete();
                // Get current language from conf.js settings
                // let currentLanguage = conf.language;
                
                // Return message in the current language using switch statement
                switch(language) {
                    default:
                        return `You are ${percentComplete}% done with the experiment. Please press the (0) key to proceed.`;
                    case 'english-touch':
                        return `You are ${percentComplete}% done with the experiment. Please tap anywhere on the screen to proceed.`;
                }
            },
            on_finish: () => {
                let percentComplete = calculatePercentComplete();
                jsPsych.setProgressBar(percentComplete / 100); // set progress bar to percentComplete full.
            },
            choices: ["0"],            // Keep keyboard "0" as an option
            touch_elements: [],        // No specific elements to touch
            allow_screen_touch: true,  // Allow tapping anywhere to continue
        },
    ],
    conditional_function: shouldShowProgressMessage,
};

// const procedureTrial = {
//     timeline: [fixation, cues, trialFeedback, conditionalProgressMessage],
//     repetitions: getRepetitions(), // toggle between debug and production mode
// };

const procedureTrial = {
    timeline: [
        fixation,
        cues_confidence,
        trialFeedback,
        conditionalProgressMessage,
    ],
    repetitions: getRepetitions(), // toggle between debug and production mode
};

const screenRating1 = {
    type: jsPsychSurveyMultiChoiceTouch,
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
    choices: "NO_KEYS", // This now works with the updated plugin
    on_start: () => {
        document.getElementById("unload").onbeforeunload = "";
        $(document).ready(() => {
            $("body").addClass("showCursor"); // returns cursor functionality
        });
    },
    on_finish: (data) => {
        writeCandidateKeys(data); // Your custom function
        
        // Updated to use the new response format
        // The data.response property now directly contains the answer objects
        // instead of being a JSON string that needs parsing
        data.rating_random = data.response.rating_random.toLowerCase();
        
        // Remove response and question_order properties as they're now handled
        removeOutputVariables(data, "response", "question_order");
    },
};

const screenRating2 = {
    type: jsPsychSurveyMultiChoiceTouch,
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
    choices: "NO_KEYS", // This now works with the updated plugin
    on_start: () => {
        document.getElementById("unload").onbeforeunload = "";
        $(document).ready(() => {
            $("body").addClass("showCursor"); // returns cursor functionality
        });
    },
    on_finish: (data) => {
        writeCandidateKeys(data); // Your custom function
        
        // Updated to use the new response format
        // The data.response property now directly contains the answer objects
        // instead of being a JSON string that needs parsing
        data.rating_sabatoge = data.response.rating_sabatoge.toLowerCase();
        
        // Remove response and question_order properties as they're now handled
        removeOutputVariables(data, "response", "question_order");
    },
};

const dataSave = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: dataSaveAnimation(),
    choices: "NO_KEYS",
    trial_duration: 5000,
    on_finish: async (data) => {
        // Calculate the final rounded bonus value
        switch (version) {
            case "gain":
                earnings = parseFloat(
                    (gainStartingPoints + score) / pointsPerDollar
                ).toFixed(2);
                console.log(earnings);
                break;
            case "loss":
                earnings = parseFloat(
                    (lossStartingPoints + score) / pointsPerDollar
                ).toFixed(2);
                console.log(earnings);
                break;
            default:
                earnings = 0;
        }

        // Store earnings with dollar sign and two decimal places
        data.total_earnings = `$${earnings}`;

        // Now call writeCsvRedirect with both score and earnings
        await writeCsvRedirect();
    },
};

// Load and execute "exp/main.js" using jQuery's $.getScript method.
$.getScript("exp/main.js");
