translate();

// declare all variables
let instruction1_stim;
let instruction2_stim;
let instruction3_stim;
let instruction4_stim;
let instruction5_stim;
let instruction6_stim;
let endPracticeInstructions_stim;

switch (language) {
    case 'english':
        switch (version){
            case 'deck':
                instruction1_stim = "In this study, you will play a card game, and your goal " +
                "is to win as many points as you can." +
                "<br /><br />" +
                "If your score lands you in the top " + percentile + "% of participants, you will " +
                "get an extra $" + bonus + " bonus, so please do your best!" +
                "<br /><br />" +
                "Please press the zero (0) key to continue.";
                instruction2_stim = "The card game is very simple: on each turn you will choose one of the " +
                "three decks below, so you can draw a card from it. You can choose a deck " +
                "using the ‘1’, ‘2’, or ‘3’ keys on your keyboard to choose the " +
                "left, middle, or right deck respectively." +
                "<br /><br />" +
                "Let's practice choosing decks. Please choose the <b>left</b> deck by pressing the '1' key." +
                "<div class='image-container'>" +
                "<img class='stimuli-left' src='" +
                stim[0] +
                "'>" +
                "<img class='stimuli-middle' src='" +
                stim[1] +
                "'>" +
                "<img class='stimuli-right' src='" +
                stim[2] +
                "'>" +
                "</div>";
                instruction3_stim = "Great! Now choose the <b>middle</b> deck by pressing the '2' key." +
                "<div class='image-container'>" +
                "<img class='stimuli-left' src='" +
                stim[0] +
                "'>" +
                "<img class='stimuli-middle' src='" +
                stim[1] +
                "'>" +
                "<img class='stimuli-right' src='" +
                stim[2] +
                "'>" +
                "</div>";
                instruction4_stim = "Excellent! Now choose the <b>right</b> deck by pressing the '3' key." +
                "<div class='image-container'>" +
                "<img class='stimuli-left' src='" +
                stim[0] +
                "'>" +
                "<img class='stimuli-middle' src='" +
                stim[1] +
                "'>" +
                "<img class='stimuli-right' src='" +
                stim[2] +
                "'>" +
                "</div>";
                instruction5_stim = "Good job! You have successfully practiced selecting decks." +
                "<br /><br />" +
                "After you select a deck, the top card will turn over. This card can either win you " +
                "an additional 100 points ('winning' cards) or take away 50 points ('losing' cards). " +
                "Below you can see what those cards look like." +
                "<br /><br />" +
                "<div class='image-container'>" +
                "<img class='stimuli-left' src='" +
                outcome[1] +
                "'>" +
                "<img class='stimuli-middle' src='" +
                outcome[2] +
                "'>" +
                "</div>" +
                "<br /><br />" +
                "<b>Note that each deck contains both winning and losing cards, but in different amounts. </b>" +
                "Your job is to figure out which deck is the best deck, so that you can get as many points " +
                "as possible." +
                "<br /><br />" +
                "Please press the zero (0) key to continue.";
                
                instruction6_stim = "However, there is one final catch: <b>there may be times when the best deck will change.</b>" +
                "<br /><br />" +
                "If you think the best deck has changed from what it was before, then try to find out the new best deck." +
                "<br /><br />" +
                "The following is a practice round of just 3 turns. The points you get here won’t change your final score, " +
                "and the best deck will change between the practice round and when the real game starts." +
                "<br /><br />" +
                "Please press the zero (0) key to start the practice round.";
                endPracticeInstructions_stim = "You have now completed the practice round. " +
                "The main task will take approximately another 10 minutes, with longer individual rounds than the practice. " +
                "<br /><br />" +
                "Please press the zero (0) key whenever you are ready to start the main task.";     
            case 'avatar':
            case 'sabotage':
        }
        break;
    case 'french':
        switch (version){
            case 'deck':
            case 'avatar':
            case 'sabotage':
        }
        break;
    case 'german':
        switch (version){
            case 'deck':
            case 'avatar':
            case 'sabotage':
        }
        break;
}