// Translation
// This file contains the instructions for the experiment,
// which will be translated to the language specified in exp/conf.js

let instructions = [];

// Define the instructions for each language
// Function to shuffle the keys of an object randomly while preserving corresponding values
// order of keys in object must be randomized, but we need to keep values associated with each key are still linked/mapped
/**
 * Translates the text of consent-related buttons based on the selected language.
 * Defaults to English if the selected language is unsupported.
 *
 * @param {string} language - The selected language for translation. Supported languages
 *                            include English, French, and German. Defaults to English
 *                            for any other inputs or unsupported languages.
 * @param {array} instructions - An array of instructions specified to be translated.
 */
switch (version) {
    case "deck":
        var english0 = `
        <p> Welcome to the experiment!</p>
        <p> Press any key to begin. </p>`;

        var english1 = `
        <p>In this study, you will play a card game, and your goal is to win as many points as you can.</p>
        <p>If your score lands you in the top ${percentile}% of participants, you will get an extra ${
            reward === "$" ? "$" + bonus : bonus + " points"
        } bonus, so please do your best!</p>
        <p>Please press the zero (0) key to continue.</p>`;

        var english2 = `
        <p>The card game is very simple: on each turn you will choose one of the three decks below, so you can draw a card from it.</p>
        <p>You can choose a deck using the <i>1</i>, <i>2</i>, or <i>3</i> keys on your keyboard to choose the <i>left</i>, <i>middle</i>, or <i>right</i> deck respectively.</p>
        <p>Let's practice choosing decks.</p>
        <p>Please choose the <strong>left</strong> deck by pressing the <strong>1</strong> key.
        <div class='image-container'>
            <img class='stimuli-left' src='${stim[0]}'>
            <img class='stimuli-middle' src='${stim[1]}'>
            <img class='stimuli-right' src='${stim[2]}'>
        </div>`;

        var english3 = `
        <p>Great! Now choose the <strong>middle</strong> deck by pressing the <strong>2</strong> key.</p>
        <div class='image-container'>
            <img class='stimuli-left' src='${stim[0]}'>
            <img class='stimuli-middle' src='${stim[1]}'>
            <img class='stimuli-right' src='${stim[2]}'>
        </div>`;

        var english4 = `
        <p>Excellent! Now choose the <strong>right</strong> deck by pressing the <strong>3</strong> key.</p>
        <div class='image-container'>
            <img class='stimuli-left' src='${stim[0]}'>
            <img class='stimuli-middle' src='${stim[1]}'>
            <img class='stimuli-right' src='${stim[2]}'>
        </div>`;

        var english5 = `
        <p>Good job! You have successfully practiced selecting decks.</p>
        <p>After you select a deck, the top card will turn over.</p>
        <p>This card can either win you an additional 100 points ('winning' cards) or take away 50 points ('losing' cards).</p>
        <p>Below you can see what those cards look like:</p>
        <div class='outcome-container'>
            <img class='outcome-left' src='stim/outcome/scaled_win.jpg'>
            <img class='outcome-right' src='stim/outcome/scaled_lose.jpg'>
        </div>
        <p><strong>Note that each deck contains both winning and losing cards, but in different amounts.</strong></p>
        <p>Your job is to figure out which deck is the best deck, so that you can get as many points as possible.</p>
        Please press the zero (0) key to continue.`;

        var english6 = `
        <p>However, there is one final catch:</p>
        <p><b>There may be times when the best deck will change!</b></p>
        <p>If you think the best deck has changed from what it was before, then try to find out the new best deck.</p>
        <br />
        <p>The following is a practice round of just 3 turns.<p>
        <p>The points you get here won’t change your final score, and the best deck will change between the practice round and when the real game starts.</p>
        <br /><br />
        Please press the zero (0) key to start the practice round.`;

        var english7 = `
        <p>You have now completed the practice round.</p>
        <p>The main task will take approximately another 10 minutes, with longer individual rounds than the practice.</p>
        <p>Please press the zero (0) key whenever you are ready to start the main task.</p>`;

        var english8 = `Did you consider the patient-doctor relationship when making choices?`;

        var english9 = `Did it feel as though the foods were trying to trick you?`;

        var english10 = (score) => {
            return `
        <div class="body-white-theme">
            <p>Thank you!</p>
            <p>You have successfully completed the experiment and your data has been saved.</p>
            <p>Your final score is ${score}.</p>
            <!-- <p>To leave feedback on this task, please click the following link:</p> -->
            <!-- <p><a href="${feedbackLink}">Leave Task Feedback!</a></p> -->
            <!-- <p>Please wait for the experimenter to continue.</p> -->
            <p><i>You may now close the experiment window at any time.</i></p>
        </div>`;
        };

        // TASK 2: Please add remaining french and german language for the deck version
        var french1 = `
        <p>Bienvenue! Avant de commencer, veuillez agrandir votre fenêtre au maximum.</p>
        Veuillez ne pas quitter la page des tâches, ne pas utiliser le bouton de retour et ne pas actualiser la page, car vous</p>
        pourriez être empêché de terminer la tâche.</p>
        <br /><br />" +
        Veuillez appuyer sur la touche zéro (0) pour continuer.</p>`;
        break;

    case "avatar": // TASK 1: Please translate each var to the avatar language
        var english0 = `
        <p> Welcome to the experiment!</p>
        <p> Press any key to begin. </p>`;

        var english1 = `
        <p>In this study, you will play a game about working with people, and your goal is to win as many points as you can.</p>
        <p>If your score lands you in the top ${percentile}% of participants, you will get an extra $${bonus} bonus, so please do your best!</p>
        <p>Please press the zero (0) key to continue.</p>`;

        var english2 = `
        <p>Imagine you are a student at a university. Working with classmates can help you learn and complete group prpojects. However, sometimes classmates can be unreliable.</p>
        <p>They can show up late, fail to complete their work, or be distracted for personal reasons. Some classmates may even deliberately sabotage your work.</p>
        <p>Three classmates are shown below. On each turn, you will select one partner to work with on a school project.</p>
        <p>You can choose a partner using the <i>1</i>, <i>2</i>, or <i>3</i> keys on your keyboard to choose the <i>left</i>, <i>middle</i>, or <i>right</i> deck respectively.</p>
        <p>Let's practice choosing partners.</p>
        <p>Please choose the <strong>left</strong> partner by pressing the <strong>1</strong> key.
        <div class='image-container'>
            <img class='stimuli-left' src='${stim[0]}'>
            <img class='stimuli-middle' src='${stim[1]}'>
            <img class='stimuli-right' src='${stim[2]}'>
        </div>`;

        var english3 = `
        <p>Great! Now choose the <strong>middle</strong> partner by pressing the <strong>2</strong> key.</p>
        <div class='image-container'>
            <img class='stimuli-left' src='${stim[0]}'>
            <img class='stimuli-middle' src='${stim[1]}'>
            <img class='stimuli-right' src='${stim[2]}'>
        </div>`;

        var english4 = `
        <p>Excellent! Now choose the <strong>right</strong> partner by pressing the <strong>3</strong> key.</p>
        <div class='image-container'>
            <img class='stimuli-left' src='${stim[0]}'>
            <img class='stimuli-middle' src='${stim[1]}'>
            <img class='stimuli-right' src='${stim[2]}'>
        </div>`;

        var english5 = `
        <p>Good job! You have successfully practiced selecting partners.</p>
        <p>After you select a partner, you will see if your project succeeds (+100 points) or fails (-50 points).</p>
        <p>Below you can see what those outcomes look like:</p>
        <div class='outcome-container'>
            <img class='outcome-left' src='stim/outcome/scaled_win.jpg'>
            <img class='outcome-right' src='stim/outcome/scaled_lose.jpg'>
        </div>
        <p><strong>Note that each partner is different. Your job is to find the best partner, and to get as many points as possible.</p>
        <p>However, no partner is perfect. Anyone can have a bad day.</strong></p>
        <p>Please press the zero (0) key to continue.`;
    

        var english6 = `
        <p>However, there is one final catch:</p>
        <p><b>Sometimes, the partners may change! The partner that previously performed the best may start to struggle or sabotage you while the other partners may improve.</b></p>
        <p>If you think the best partner has changed from what it was before, then try to find out the new best partner.</p>
        <br />
        <p>The following is a practice round of just 3 turns.<p>
        <p>The points you get here won’t change your final score, and the best deck will change between the practice round and when the real game starts.</p>
        <br /><br />
        Please press the zero (0) key to start the practice round.`;

        var english7 = `
        <p>You have now completed the practice round.</p>
        <p>The main task will take approximately another 10 minutes, with longer individual rounds than the practice.</p>
        <p>Please press the zero (0) key whenever you are ready to start the main task.</p>`;

        var english8 = `Did you consider the patient-doctor relationship when making choices?`;

        var english9 = `Did it feel as though the foods were trying to trick you?`;

        var english10 = (score) => {
            return `
        <div class="body-white-theme">
            <p>Thank you!</p>
            <p>You have successfully completed the experiment and your data has been saved.</p>
            <p>Your final score is ${score}.</p>
            <!-- <p>To leave feedback on this task, please click the following link:</p> -->
            <!-- <p><a href="${feedbackLink}">Leave Task Feedback!</a></p> -->
            <!-- <p>Please wait for the experimenter to continue.</p> -->
            <p><i>You may now close the experiment window at any time.</i></p>
        </div>`;
        };

        // Task 3: Please add french and german language for the avatar version
        var french1 = `
        <p>Bienvenue! Avant de commencer, veuillez agrandir votre fenêtre au maximum.</p>
        <p>Veuillez ne pas quitter la page des tâches, ne pas utiliser le bouton de retour et ne pas actualiser la page, car vous</p>
        <p>pourriez être empêché de terminer la tâche.</p>
        <p>Veuillez appuyer sur la touche zéro (0) pour continuer.</p>`;
        break;
    case "sabotage":
        var english0 = `
        <p> Welcome to the experiment!</p>
        <p> Press any key to begin. </p>`;

        var english1 = `
        <p>In this study, you will play a game about working with people, and your goal is to win as many points as you can.</p>
        <p>If your score lands you in the top ${percentile}% of participants, you will get an extra $${bonus} bonus, so please do your best!</p>
        <p>Please press the zero (0) key to continue.</p>`;

        var english2 = `
        <p>Imagine you are beginning a new job and your boss regularly evaluates you.</p>
        <p>When you perform well, you earn points with your boss (+100); however poor performance will lead you to lose points (-50).</p>
        <p>To complete tasks successfully, you must rely on co-workers for advice and help. Some of your co-workers are helpful, whereas others are not.</p>
        <p>Furthermore, sometimes they will want to see you fail and switch from helping you to actively hurting your performance.</p>
        <p>Your goal is to earn as many points as possible.</p>
        <p>Three co-workers are shown below. On each turn, you will select one to ask for help. You can choose a co-worker using the <i>1</i>, <i>2</i>, or <i>3</i> keys on your keyboard to choose the <i>left</i>, <i>middle</i>, or <i>right</i> deck respectively.</p>
        <p>Let's practice choosing co-workers.</p>
        <p>Please choose the <strong>left</strong> co-worker by pressing the <strong>1</strong> key.
        <div class='image-container'>
            <img class='stimuli-left' src='${stim[0]}'>
            <img class='stimuli-middle' src='${stim[1]}'>
            <img class='stimuli-right' src='${stim[2]}'>
        </div>`;

        var english3 = `
        <p>Great! Now choose the <strong>middle</strong> co-worker by pressing the <strong>2</strong> key.</p>
        <div class='image-container'>
            <img class='stimuli-left' src='${stim[0]}'>
            <img class='stimuli-middle' src='${stim[1]}'>
            <img class='stimuli-right' src='${stim[2]}'>
        </div>`;

        var english4 = `
        <p>Excellent! Now choose the <strong>right</strong> co-worker by pressing the <strong>3</strong> key.</p>
        <div class='image-container'>
            <img class='stimuli-left' src='${stim[0]}'>
            <img class='stimuli-middle' src='${stim[1]}'>
            <img class='stimuli-right' src='${stim[2]}'>
        </div>`;

        var english5 = `
        <p>Good job! You have successfully practiced selecting co-workers for help.</p>
        <p>After you select a co-worker, you will see if they helped you earn points with the boss (+100 points) or lose points with the boss (-50 points).</p>
        <p>Below you can see what those outcomes look like:</p>
        <div class='outcome-container'>
            <img class='outcome-left' src='stim/outcome/scaled_win.jpg'>
            <img class='outcome-right' src='stim/outcome/scaled_lose.jpg'>
        </div>
        <p><strong>Note that each co-worker is different. Your job is to find the best co-worker, and to get as many points as possible.</p>
        <p>However, no co-worker is perfect. Anyone can have a bad day.</strong></p>
        <p>Please press the zero (0) key to continue.`;
    

        var english6 = `
        <p>However, there is one final catch:</p>
        <p><b>Sometimes, the co-workers may change! The co-worker that previously helped may start to sabotage you while the other co-workers become helpful.</b></p>
        <p>If you think the best co-worker has changed, then try to find out the new best co-worker.</p>
        <br />
        <p>The following is a practice round of just 3 turns.<p>
        <p>The points you get here won’t change your final score, and the best co-worker will change between the practice round and when the real game starts.</p>
        <br /><br />
        Please press the zero (0) key to start the practice round.`;

        var english7 = `
        <p>You have now completed the practice round.</p>
        <p>The main task will take approximately another 10 minutes, with longer individual rounds than the practice.</p>
        <p>Please press the zero (0) key whenever you are ready to start the main task.</p>`;

        var english8 = `Did you consider the patient-doctor relationship when making choices?`;

        var english9 = `Did it feel as though the foods were trying to trick you?`;

        var english10 = (score) => {
            return `
        <div class="body-white-theme">
            <p>Thank you!</p>
            <p>You have successfully completed the experiment and your data has been saved.</p>
            <p>Your final score is ${score}.</p>
            <!-- <p>To leave feedback on this task, please click the following link:</p> -->
            <!-- <p><a href="${feedbackLink}">Leave Task Feedback!</a></p> -->
            <!-- <p>Please wait for the experimenter to continue.</p> -->
            <p><i>You may now close the experiment window at any time.</i></p>
        </div>`;
        };

        // Task 3: Please add french and german language for the avatar version
        var french1 = `
        <p>Bienvenue! Avant de commencer, veuillez agrandir votre fenêtre au maximum.</p>
        <p>Veuillez ne pas quitter la page des tâches, ne pas utiliser le bouton de retour et ne pas actualiser la page, car vous</p>
        <p>pourriez être empêché de terminer la tâche.</p>
        <p>Veuillez appuyer sur la touche zéro (0) pour continuer.</p>`;
        break;
}

// Aggregate the instructions of your language choice
switch (language) {
    default:
        instructions = [
            english0,
            english1,
            english2,
            english3,
            english4,
            english5,
            english6,
            english7,
            english8,
            english9,
            (score) => english10(score), // Store it as a function that accepts score
        ];
        break;
    // Task 4: Please add the case for both french and german
    case "french":
        instructions = [french1];
        break;
}

// Translate the instructions to the specified language
translate(language, ...instructions);
