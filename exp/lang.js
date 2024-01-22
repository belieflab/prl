translate();

// declare all variables
let instruction1_stim;

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