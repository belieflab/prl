translate();

// declare all variables
let instruction1_stim;
let instruction2_stim;

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
                instruction3_stim = "Great! Now choose the <b>middle</b> deck by pressing the '2' key.";
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