# Probabalistic Reversal Learning Task

## Task description
This task is designed to track decision-making performance under uncertainty. Here, participants engage in a task with the goal of maximizing points by selecting the most rewarding option from a set. There are two main versions of the task: a **nonsocial** version - one involving decks of cards with varying reward probabilities - and a **social** version - one involving the selection of avatars (partners) for a class project, each with different levels of reliability.

### Deck scenario
Participants choose from three decks with varying reward probabilities. These probabilities change, making it necessary to adapt strategies. Initially, probabilities may be easily distinguishable (e.g., 90%-50%-10%; so the right deck will give your 90% winning cards, middle deck 50%, and left deck 10%), but as the task progresses, the reward probabilities get closer and harder to distinguish (e.g., 80%-40%-20%). This shift in probabilities (or *contingency shift*) happens half-way through the experiment which requires participants to continuously reassess and choose the deck that maximizes rewards. These reward probabilities also change at every fixed trials (e.g., at every 40 trials). For example, if an individual experiences a reward probability set of 50%-10%-90%, then they may experience a fixed reversal of 10%-90%-50%. These fixed reversals are defined as *performance-independent* reversals. In addition to these reversals, participants may also experience a change in the reward probabilities when they consecutively select the most rewarding deck nine out of 10 times (with at most two mistakes of not choosing the most rewarding deck before the consecutive streak resets to zero). These variable reversals (varying based on performance) are defined as *performance-dependent* reversals. 

### Avatar scenario
Mirroring the decks version but contextualized with avatars representing partners in a class project. Participants select partners based on reliability and contribution to project success. Similar to the decks, avatar reliability changes over time, reflecting real-life dynamics where team members' contributions can vary. Through this, this version emphasizes a social component.

### Sabotage scenario (slight variation)
This version is akin to the avatars version but in a workplace scenario, focusing on selecting among co-workers to earn brownie points with the boss. Instead of partnering for a class project, participants navigate office dynamics, choosing colleagues who will positively influence their standing with the boss.

## Types of uncertainty
### Expected uncertainty
Expected uncertainty arises from known variability within the task. Participants are informed that each deck or avatar has different reward payoffs or reliabiliy, meaning they expect some level of variability in outcomes. This knowledge allows them to aniticipate changes in reward probabiilities to some extent.

### Unexpected uncertainty
Unexpected uncertainty refers to changes in the task that participants are not forewarned about. This includes *shifts* and *reversals* in reward probabilities that occur without prior notice.

* Shifts: A complete change in the set of reward probabilities, occuring mid-way through the experiment. For example, changing from a 10%, 50%, 90% configuration to 20%, 40%, 80%, representing increased difficulty in identifying the higher rewarding deck since the probabilities are more closer.
* Reversals: Changes within the current set of probabilities
* - Performance-independent reversals: Fixed changes after a set number of trials (e.g., after every 40 trials), altering the reward structure regardless of participant performance.
* - Performance-dependent reversals: Variable changes, triggered by consecutively selecting the highest rewarding option (e.g.,nine out of ten consecutive times)

NOTE: Additionally, the task incorporates control units to manage the occurrence of reversals.

* Streaks: Counters that track how many consecutive times a participant selects the best deck. This mechanism is crucial for triggering performance-dependent reversals.
* Strikes: Counters that allow participants a certain number of selections of non-highest rewarding options before the streak counter resets to zero. 

## Configuration
The task is configurable for different experimental setttings, including difficulty levels and reward structures. The configuration file (`conf.js`) includes settings such as:

* Experiment version (= {'deck', 'avatar', 'sabotage'})
* Difficulty setting (= {'easy-easy', 'easy-hard', 'hard-easy', 'hard-hard'})
* Number of trials per block
* Number of blocks
* Reward setting (e.g., bonus, percentile)

### Modifying the Configuration
To customize the task, adjust the parameters in `conf.js`. Key parameters include:

* `version`: Choose between 'deck', 'avatar', or 'sabotage' for different tas scenarios.
* `difficulty`: Set the challenge level (e.g., "easy-easy"/"hard-hard" for uniform difficulty, or "easy-hard"/"hard-hard" for a shift in difficulty).
* `trials`, `blocks`: Define the length and structure of the experiment.
* `reward`: Specify the reward type (points or currency)

## Getting Started
To run the task:

1. Clone this repository to your local machine
2. Modify `conf.js` as needed to configure the experiment settings.
3. Launch the task as defined below 

## Dependencies
PHP version 7.x or PHP 8.x
jsPsych version 6.3 or 7.x

## Repository General Information and Cloning
* To clone this repository: `git clone -c core.symlinks=true git@github.com:belieflab/prl.git --recurse-submodules` (this will initialize the `wrap` submodule)
* When pulling changes, run `./sync.sh` to be sure to update the `wrap` submodule

## Development Guide

#### Install and configure XAMPP:
1. [Download XAMPP](https://www.apachefriends.org/download.html) with PHP version 7.3.19
2. Open XAMPP and click "Start" to boot the XAMPP application.
3. Navigate to "Services" and click "Start All" button.
4. Navigate to "Network", select localhost:8080, and click "Enable".
5. Navigate to "Volumes" and click "Mount".

#### Clone the git repository:
6. Open Terminal and navigate to the htdocs directory:

    Mac/Linux:

        cd ~/.bitnami/stackman/machines/xampp/volumes/root/htdocs
    Windows:

        cd C://xampp//htdocs

7. Clone into htdocs:

        git clone https://github.com/belieflab/jsPsychWrapper-v6.3.git

#### Modifty permissions:
8. Copy this text into your terminal from the htdocs folder (the folder you are already in).

        chmod -R 777 jsPsychWrapper-v6.3/
        
#### Start experiment:     
9. Click this URL: [http://localhost/jsPsychWrapper-v6.3](http://localhost/jsPsychWrapper-v6.3)
      
      
      
### BRAVO! You're a XAMPP master.
        

### To-do
* preloading images in version 7, instead of index.php code