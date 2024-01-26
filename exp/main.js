// main order in which things are pushed to timeline
timeline.push(welcome);
const instructions = [instruction1, instruction2];
for (let i = 0; i < instructions.length; i++){
    timeline.push(instructions[i])
}
timeline.push(procedureTrial)
// timeline.push(procedure);
// timeline.push(dataSave);
// timeline.push(end);

// run the experiment
jsPsych.run(timeline);
