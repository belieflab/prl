const shuffleKeys = (obj) => {
    // get keys of input object; Object.keys() method returns an array containing keys of the object
    let shuffledKeys = Object.keys(obj).sort(() => Math.random() - 0.5);
    let shuffledObj = {};
    shuffledKeys.forEach(function (key) {
        shuffledObj[key] = obj[key];
    });
    return shuffledObj;
};
// // MAYBE REMOVE // //
// // randomize deck contingencies
// function shuffle(array) {
//     var currentIndex = array.length,
//         temporaryValue,
//         randomIndex;

//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {
//         // Pick a remaining element...
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;

//         // And swap it with the current element.
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// }
// // randomize deck contingencies
// function reshuffle(array) {
//     let tempProbabilityOrder = shuffle(array);
//     while (tempProbabilityOrder.indexOf("high") == array.indexOf("high")) {
//         tempProbabilityOrder = shuffle(tempProbabilityOrder);
//     }
//     return tempProbabilityOrder;
// }

// Define a function to calculate the percentage done
function calculatePercentComplete() {
    // Get the current trial index and divide by total number of trials
    let percentComplete = (trialIterator / totalTrials) * 100;
    return Math.round(percentComplete); // Round to the nearest integer
}

// Create a conditional function to decide whether to show the progress message
function shouldShowProgressMessage() {
    // Show the message after every 25% completion
    let percentComplete = calculatePercentComplete();
    return [25, 50, 75].includes(percentComplete); // Show the message at 25%, 50%, and 75%
}
