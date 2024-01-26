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
    choice: "NO_KEYS",
};

/*define task instructions*/
const instruction2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instruction2_stim,
    choice: "NO_KEYS",
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
    response_ends_trial: false,
    on_start: () => {
        let probabilityOrder = [];
        probabilityOrder.append(shuffle(deepCopy(probabilityNames)));
        // randomize deck contingencies
        if (randomizeDecksOn) {
            var tempProbabilityOrder = shuffle(deepCopy(probabilityNames));
            while (
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
    trial_duration: 3000,
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
const feedback = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ["1", "2", "3"],
    on_load: function () {
        // need to find v7 equivalent of jsPsych.data.get().last(1).values()[0].key_press; which is from bayesianGhost v6.3
        // this doesn't work for v7 but is here temporarily for logic
        let response = jsPsych.data.get().last(1).values()[0].key_press;
        // jsPsych is not a thing in v7 "the global 'jsPsych' variable is no longer available in jsPsych v7"
        // maybe we can just use screenshot of +100 or -50
    },
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
    trial_duration: 3000,
    response_ends_trial: false,
    // data: {
    //     colour: jsPsych.timelineVariable("colour"),
    //     text: jsPsych.timelineVariable("text"),
    //     condition: jsPsych.timelineVariable("condition"),
    //     workerId: workerId,
    //     interview_date: today,
    // },
};

let procedureTrial = {
    timeline: [fixation, cues, feedback],    
}

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
