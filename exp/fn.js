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
