// main order in which things are pushed to timeline

// The spread operator ... expands the elements of instructions inside the
// push method call, effectively adding each element to timeline.
// is the same as:
// for (let i = 0; i < instructions.length; i++) {
//     timeline.push(instructions[i]);
// }

// Instructions
timeline.push(welcome);
timeline.push(...instructionSet);

// Practice
timeline.push(practiceTrial);
timeline.push(endPracticeInstructions);

// Main experiment
timeline.push(procedureTrial);

// Data saving and salutations
timeline.push(dataSave);

// this is not needed as it is called in .wrap/fn/startExperiment()
// commenting in will bypass validation
// jsPsych.run(timeline);
