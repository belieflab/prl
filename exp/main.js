// main order in which things are pushed to timeline

// The spread operator ... expands the elements of instructions inside the
// push method call, effectively adding each element to timeline like a loop.
// is the same as:
// for (let i = 0; i < instructions.length; i++) {
//     timeline.push(instructions[i]);
// }

// Instructions
timeline.push(welcome, ...instructionSet);

// Practice
timeline.push(practiceTrial, endPracticeInstructions);

// Main experiment
timeline.push(procedureTrial);

// Rating questions
switch (version) {
    case "sabotage":
        timeline.push(screenRating1, screenRating2);
        break;
    default:
        break;
}
// Data saving and salutations
timeline.push(dataSave);

// New jsPsych 7.x syntax
jsPsych.run(timeline);
