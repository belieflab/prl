const shuffleKeys = (obj) => {
    // get keys of input object; Object.keys() method returns an array containing keys of the object
    let shuffledKeys = Object.keys(obj).sort(() => Math.random() - 0.5);
    let shuffledObj = {};
    shuffledKeys.forEach(function (key) {
        shuffledObj[key] = obj[key];
    });
    return shuffledObj;
};

// Define a function to calculate the percentage done
const calculatePercentComplete = () => {
    // const updatedTrials =
    //     typeof trials !== "undefined"
    //         ? trials
    //         : jsPsych.data.get().select("trials").values.slice(-1)[0]; // Replace 'score' with actual data key if necessary

    // Get the current trial index and divide by total number of trials
    let percentComplete = (trialIterator / totalTrials) * 100;
    // console.log("Percent Complete: ", percentComplete);
    return Math.round(percentComplete); // Round to the nearest integer
};

// Create a conditional function to decide whether to show the progress message
const shouldShowProgressMessage = () => {
    // Show the message after every 25% completion
    let percentComplete = calculatePercentComplete();
    // console.log("Percent Complete: ", percentComplete);
    return [25, 50, 75].includes(percentComplete); // Show the message at 25%, 50%, and 75%
};
