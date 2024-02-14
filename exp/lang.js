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
    case "english":
        switch (version) {
            case "deck":
                instruction1_stim =
                    "In this study, you will play a card game, and your goal " +
                    "is to win as many points as you can." +
                    "<br /><br />" +
                    "If your score lands you in the top " +
                    percentile +
                    "% of participants, you will " +
                    "get an extra $" +
                    bonus +
                    " bonus, so please do your best!" +
                    "<br /><br />" +
                    "Please press the zero (0) key to continue.";
                instruction2_stim =
                    "<p>The card game is very simple: on each turn you will choose one of the three decks below, so you can draw a card from it.</p>" +
                    "<p>You can choose a deck using the <i>1</i>, <i>2</i>, or <i>3</i> keys on your keyboard to choose the <i>left</i>, <i>middle</i>, or <i>right</i> deck respectively.</p>" +
                    "<p>Let's practice choosing decks.</p>" +
                    "<p>Please choose the <strong>left</strong> deck by pressing the <strong>1</strong> key." +
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
                instruction3_stim =
                    "<p>Great! Now choose the <strong>middle</strong> deck by pressing the <strong>2</strong> key.</p>" +
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
                instruction4_stim =
                    "<p>Exellent! Now choose the <strong>right</strong> deck by pressing the <strong>3</strong> key.</p>" +
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
                instruction5_stim =
                    "<p>Good job! You have successfully practiced selecting decks.</p>" +
                    "<p>After you select a deck, the top card will turn over.</p>" +
                    "<p>This card can either win you an additional 100 points ('winning' cards) or take away 50 points ('losing' cards).</p>" +
                    "<p>Below you can see what those cards look like:</p>" +
                    "<div class='outcome-container'>" +
                    "<img class='outcome-left' src='" +
                    "stim/outcome/scaled_win.jpg" +
                    "'>" +
                    "<img class='outcome-right' src='" +
                    "stim/outcome/scaled_lose.jpg" +
                    "'>" +
                    "</div>" +
                    "<p><strong>Note that each deck contains both winning and losing cards, but in different amounts.</strong></p>" +
                    "<p>Your job is to figure out which deck is the best deck, so that you can get as many points as possible.</p>" +
                    "Please press the zero (0) key to continue.";

                instruction6_stim =
                    "<p>However, there is one final catch:</p>" +
                    "<p><b>There may be times when the best deck will change!</b></p>" +
                    "<p>If you think the best deck has changed from what it was before, then try to find out the new best deck.</p>" +
                    "<br />" +
                    "<p>The following is a practice round of just 3 turns.<p>" +
                    "<p>The points you get here won’t change your final score, " +
                    "and the best deck will change between the practice round and when the real game starts." +
                    "<br /><br />" +
                    "Please press the zero (0) key to start the practice round.";
                endPracticeInstructions_stim =
                    "You have now completed the practice round. " +
                    "The main task will take approximately another 10 minutes, with longer individual rounds than the practice. " +
                    "<br /><br />" +
                    "Please press the zero (0) key whenever you are ready to start the main task.";
            case "avatar":
            case "sabotage":
        }
        break;
    case "french":
        switch (version) {
            case "deck":
            case "avatar":
            case "sabotage":
        }
        break;
    case "german":
        switch (version) {
            case "deck":
            case "avatar":
            case "sabotage":
        }
        break;
}
