"use strict";

function businessLogic() {
    let data = jsPsych.data.get().last(1).values(); // Assuming this is async
    let response = data[0].response;
    //console.log(response);
    let highestProbabilityIndex;

    // performance-independent reversal every 40 trials
    if (
        trialIterator === 1 * (totalTrials / blocks) ||
        trialIterator === 3 * (totalTrials / blocks)
    ) {
        //let highestProbabilityIndex;

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
        //let highestProbabilityIndex;
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
    if (currentProbability[response - 1] === Math.max(...currentProbability)) {
        streak++;
        if (streak >= maxStreaks) {
            //let highestProbabilityIndex;
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

    //console.log(currentProbability);

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
}

function feedbackLogic(data) {
    let rt = jsPsych.data.get().last(2).values()[0].rt;
    let response = jsPsych.data.get().last(2).values()[0].response;
    writeCandidateKeys(data);
    // removeOutputVariables(data, [ // not working
    //     "stimulus",
    //     "trial_type",
    //     "internal_node_id",
    // ]);
    data.difficulty = difficulty;
    data.stimuliSet = stimuliSet;
    data.max_strikes = maxStrikes;
    data.max_streaks = maxStreaks;
    data.index = trialIterator;
    data.first_half_probabilities = phaseProbabilities[0];
    data.second_half_probabilities = phaseProbabilities[1];
    data.deck_probabilities = `[${String(currentProbability)}]`;
    data.streak = streak;
    data.strike = strike;
    data.response = response;
    data.rt = rt;
    data.key_press =
        response == 1 ? 49 : response == 2 ? 50 : response == 3 ? 51 : null;
    //console.log(win);
    data.reward_type = win;
    // initialize constants to represent trials that we are comparing
    const previousTrial = jsPsych.data.get().last(4).values()[0]; // current trial (.last(1))
    const currentTrial = jsPsych.data.get().last(1).values()[0]; // previous trial (.last(4))

    // check if the deck probabilities on current and previous trials are the same
    if (previousTrial.index !== undefined) {
        // compare previous and current trials after the first trial
        data.reversal_type =
            previousTrial.deck_probabilities === currentTrial.deck_probabilities
                ? false
                : true; // if probabilities are different, reversal occurred (= true)
        console.log(data.reversal_type);
    } else {
        data.reversal_type = false; // first trial reversal always undefined
        console.log(data.reversal_type);
    }
    // How to compute performance-dependent reversals from `reversal_type` (previously known as `trial_type`)?: Substract trials indexed of 40,80, and 120.
    data.reward_tally = score;
}

// Add the final earnings to the data file for loss and gain versions
// jsPsych.data.get().addToAll({
//     earnings: earnings
// });

function writeCsvRedirect() {
    const updatedScore =
        typeof score !== "undefined"
            ? score
            : jsPsych.data.get().select("score").values.slice(-1)[0]; // Replace 'score' with actual data key if necessary

    // Now, generate the thank you message with the updated score
    const thankYou = instructions[11](updatedScore);

    saveDataPromise(`${experimentAlias}_${subjectId}`, jsPsych.data.get().csv())
        .then((response) => {
            // response will tell us if data has been saved on server
            console.log("Data saved successfully.", response);
            // Update the stimulus content directly via DOM manipulation
            document.querySelector("#jspsych-content").innerHTML = thankYou;
            if (redirectLink) {
                setTimeout(() => {
                    window.location.replace(redirectLink); // redirect to qualtrics survey link after a delay of 5s
                }, 5000);
            }
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
            document.querySelector("#jspsych-content").innerHTML = dataFailure;
        })
        .finally(() => {
            document.getElementById("unload").onbeforeunload = ""; // Removes popup
            $("body").addClass("showCursor"); // Returns cursor functionality
            closeFullscreen(); // Kill fullscreen
        });
}

/**
 * Updates the width of a progress bar to reflect the confidence level in a trial.
 * Increments the bar's width up to a maximum of 100%. Once the progress bar reaches 100%,
 * it resets the bar to 0%, marks the trial as complete, and ends the trial.
 *
 * @returns {number} The updated confidence level as a percentage of the progress bar's width.
 */
function moveConfidence() {
    let progressBar = document.getElementById("keyBar");
    let currentWidth = parseFloat(progressBar.style.width); // Get current width percentage

    if (currentWidth >= 100) {
        progressBar.style.width = "0%"; // Reset progress bar to 0%
        totalConfidence = 100; // Set total confidence level to 100%
        // trialComplete = 1;
        jsPsych.finishTrial(); // Finish the trial if width reaches 100%
    } else {
        const increment = 3.7;
        currentWidth = Math.min(currentWidth + increment, 100); // Cap increment at 100%
        progressBar.style.width = `${currentWidth}%`; // Update the progress bar's width
        totalConfidence = currentWidth; // Update total confidence level
        // trialComplete = 0;
    }
    // console.log("Confidence level: ", totalConfidence);
    return totalConfidence;
}

/**
 * Handles key press events to dynamically update the confidence bar based on user input.
 * This function sets up event listeners on a specified text box to detect and manage keydown and keyup events,
 * adjusting the confidence level accordingly. The function assumes the presence of a progress bar (`barFill`)
 * and a text input (`tapTapElement`) in the DOM.
 *
 * When keys '1' (keycode 49), '2' (keycode 50), or '3' (keycode 51) are pressed, it either increases or maintains a level of
 * 'totalConfidence' and updates the display through `moveConfidence()`. The function ensures the UI elements
 * are properly focused and handles the key events to prevent default behaviors and stop event propagation.
 */ function buttonPress() {
    const barFill = document.getElementById("fillUp");
    if (barFill) {
        barFill.innerHTML = responseOptions; // Assuming 'responseOptions' is defined
    }
    const tapTapElement = document.getElementById("tapTap");
    if (tapTapElement) {
        tapTapElement.focus(); // Focus on the text box to capture key events
        let keyHeld49 = false;
        let keyHeld50 = false;
        let keyHeld51 = false;

        const handleKeyPress = (keycode, isKeyDown) => {
            if (keycode === 49) {
                keyHeld49 = isKeyDown;
            } else if (keycode === 50) {
                keyHeld50 = isKeyDown;
            } else if (keycode === 51) {
                keyHeld51 = isKeyDown;
            }
            responseKey = keycode;
            if (keyHeld49 || keyHeld50 || keyHeld51) {
                totalConfidence = moveConfidence();
            }
        };

        $(tapTapElement).keydown(function (event) {
            const keycode = event.which;
            if (keycode === 49 || keycode === 50 || keycode === 51) {
                handleKeyPress(keycode, true);
                event.preventDefault(); // Prevent default action and stop propagation
            }
        });

        $(tapTapElement).keyup(function (event) {
            const keycode = event.which;
            if (keycode === 49 || keycode === 50 || keycode === 51) {
                handleKeyPress(keycode, false);
                event.preventDefault(); // Prevent default action and stop propagation
            }
        });
    }
}
