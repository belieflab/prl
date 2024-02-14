// Function to shuffle the keys of an object randomly while preserving corresponding values
// order of keys in object must be randomized, but we need to keep values associated with each key are still linked/mapped
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
