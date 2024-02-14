var jsPsychHtmlKeyboardResponse = (function (jspsych) {
    "use strict";

    const info = {
        name: "html-keyboard-response",
        parameters: {
            /**
             * The HTML string to be displayed.
             */
            stimulus: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Stimulus",
                default: undefined,
            },
            /**
             * Array containing the key(s) the subject is allowed to press to respond to the stimulus.
             */
            choices: {
                type: jspsych.ParameterType.KEYS,
                pretty_name: "Choices",
                default: "ALL_KEYS",
            },
            /**
             * Any content here will be displayed below the stimulus.
             */
            prompt: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Prompt",
                default: null,
            },
            /**
             * How long to show the stimulus.
             */
            stimulus_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Stimulus duration",
                default: null,
            },
            /**
             * How long to show trial before it ends.
             */
            trial_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Trial duration",
                default: null,
            },
            /**
             * If true, trial will end when subject makes a response.
             */
            response_ends_trial: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Response ends trial",
                default: true,
            },
        },
    };
    /**
     * **html-keyboard-response**
     *
     * jsPsych plugin for displaying a stimulus and getting a keyboard response
     *
     * @author Josh de Leeuw
     * @see {@link https://www.jspsych.org/plugins/jspsych-html-keyboard-response/ html-keyboard-response plugin documentation on jspsych.org}
     */
    class HtmlKeyboardResponsePlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }

        // NEW!
        // Method to start or restart the keyboard listener
        startKeyboardListener(callback_function, valid_responses) {
            return this.jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: callback_function,
                valid_responses: valid_responses,
                rt_method: "performance",
                persist: false,
                allow_held_key: false,
            });
        }

        trial(display_element, trial) {
            var new_html =
                '<div id="jspsych-html-keyboard-response-stimulus">' +
                trial.stimulus +
                "</div>";
            // add prompt
            if (trial.prompt !== null) {
                new_html += trial.prompt;
            }
            // draw
            display_element.innerHTML = new_html;

            // store response
            var response = {
                rt: null,
                key: null,
            };

            // function to end trial when it is time
            const end_trial = () => {
                // kill any remaining setTimeout handlers
                this.jsPsych.pluginAPI.clearAllTimeouts();

                // gather the data to store for the trial
                var trial_data = {
                    rt: response.rt,
                    stimulus: trial.stimulus,
                    response: response.key,
                };
                // clear the display
                display_element.innerHTML = "";
                // move on to the next trial
                this.jsPsych.finishTrial(trial_data);
            };

            // NEW!
            // Initialize lastResponseTime with the current timestamp when the trial starts
            var lastResponseTime = Date.now(); // Capture the start time of the trial
            var acceptResponse = true; // Flag to control whether responses should be accepted

            var after_response = (info) => {
                console.log(
                    "Key press detected. Current acceptResponse flag:",
                    acceptResponse
                );

                if (!acceptResponse) {
                    console.log(
                        "Response currently disabled, ignoring key press."
                    );
                    return; // Exit if we're not accepting responses
                }

                var currentTime = Date.now();
                var timeSinceLastResponse = currentTime - lastResponseTime;
                console.log(
                    "Time since last response: ",
                    timeSinceLastResponse
                );

                if (timeSinceLastResponse < 300) {
                    console.log("Button mashing detected, response ignored.");
                    // Temporarily disable further responses by cancelling the current listener
                    if (typeof keyboardListener !== "undefined") {
                        this.jsPsych.pluginAPI.cancelKeyboardResponse(
                            keyboardListener
                        );
                    }

                    setTimeout(() => {
                        // Re-enable responses after a delay by restarting the keyboard listener
                        console.log("Responses re-enabled.");
                        this.startKeyboardListener(
                            after_response.bind(this),
                            trial.choices
                        );
                    }, 300); // Adjust this delay as needed

                    return; // Ignore the current response
                }

                lastResponseTime = currentTime; // Update lastResponseTime for valid responses
                // end NEW

                // after a valid response, the stimulus will have the CSS class 'responded'
                // which can be used to provide visual feedback that a response was recorded
                display_element.querySelector(
                    "#jspsych-html-keyboard-response-stimulus"
                ).className += " responded";

                // only record the first response
                if (response.key == null) {
                    response = info;
                }
                if (trial.response_ends_trial) {
                    end_trial();
                }
            };
            // start the response listener
            if (trial.choices != "NO_KEYS") {
                var keyboardListener =
                    this.jsPsych.pluginAPI.getKeyboardResponse({
                        callback_function: after_response,
                        valid_responses: trial.choices,
                        rt_method: "performance",
                        persist: false,
                        allow_held_key: false,
                    });
            }
            // hide stimulus if stimulus_duration is set
            if (trial.stimulus_duration !== null) {
                this.jsPsych.pluginAPI.setTimeout(() => {
                    display_element.querySelector(
                        "#jspsych-html-keyboard-response-stimulus"
                    ).style.visibility = "hidden";
                }, trial.stimulus_duration);
            }
            // end trial if trial_duration is set
            if (trial.trial_duration !== null) {
                this.jsPsych.pluginAPI.setTimeout(
                    end_trial,
                    trial.trial_duration
                );
            }
        }
        simulate(trial, simulation_mode, simulation_options, load_callback) {
            if (simulation_mode == "data-only") {
                load_callback();
                this.simulate_data_only(trial, simulation_options);
            }
            if (simulation_mode == "visual") {
                this.simulate_visual(trial, simulation_options, load_callback);
            }
        }
        create_simulation_data(trial, simulation_options) {
            const default_data = {
                stimulus: trial.stimulus,
                rt: this.jsPsych.randomization.sampleExGaussian(
                    500,
                    50,
                    1 / 150,
                    true
                ),
                response: this.jsPsych.pluginAPI.getValidKey(trial.choices),
            };
            const data = this.jsPsych.pluginAPI.mergeSimulationData(
                default_data,
                simulation_options
            );
            this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
            return data;
        }
        simulate_data_only(trial, simulation_options) {
            const data = this.create_simulation_data(trial, simulation_options);
            this.jsPsych.finishTrial(data);
        }
        simulate_visual(trial, simulation_options, load_callback) {
            const data = this.create_simulation_data(trial, simulation_options);
            const display_element = this.jsPsych.getDisplayElement();
            this.trial(display_element, trial);
            load_callback();
            if (data.rt !== null) {
                this.jsPsych.pluginAPI.pressKey(data.response, data.rt);
            }
        }
    }
    HtmlKeyboardResponsePlugin.info = info;

    return HtmlKeyboardResponsePlugin;
})(jsPsychModule);
