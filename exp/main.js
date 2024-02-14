// main order in which things are pushed to timeline
timeline.push(welcome);
const instructions = [
    instruction1,
    instruction2,
    instruction3,
    instruction4,
    instruction5,
    instruction6,
];
for (let i = 0; i < instructions.length; i++) {
    timeline.push(instructions[i]);
}

// Practice
timeline.push(practiceTrial);
timeline.push(endPracticeInstructions);

// Main experiment
timeline.push(procedureTrial);
// timeline.push(procedure);
// timeline.push(dataSave);
// timeline.push(end);

// run the experiment
// this is not needed as it is called in startExperiment
// commenting in will bypass validation
// jsPsych.run(timeline);
