# Probabalistic Reversal Learning Task

## Task description
This task is designed to track decision-making performance under uncertainty. Here, participants engage in a task with the goal of maximizing points by selecting the most rewarding option from a set. There are two main versions of the task: a **nonsocial** version - one involving decks of cards with varying reward probabilities - and a **social** version - one involving the selection of avatars (partners) for a class project, each with different levels of reliability.

### Deck scenario
Participants choose from three decks with varying reward probabilities. These probabilities change, making it necessary to adapt strategies. Initially, probabilities may be easily distinguishable (e.g., 90%-50%-10%; so the right deck will give your 90% winning cards, middle deck 50%, and left deck 10%), but as the task progresses, the reward probabilities get closer and harder to distinguish (e.g., 80%-40%-20%). This shift in probabilities (or *contingency shift*) happens half-way through the experiment which requires participants to continuously reassess and choose the deck that maximizes rewards. These reward probabilities also change at every fixed trials (e.g., at every 40 trials). For example, if an individual experiences a reward probability set of 50%-10%-90%, then they may experience a fixed reversal of 10%-90%-50%. These fixed reversals are defined as *performance-independent* reversals. In addition to these reversals, participants may also experience a change in the reward probabilities when they consecutively select the most rewarding deck nine out of 10 times (with at most two mistakes of not choosing the most rewarding deck before the consecutive streak resets to zero). These variable reversals (varying based on performance) are defined as *performance-dependent* reversals. 

### Avatar scenario

### Sabotage scenario (slight variation)

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
* To clone this repository: `git clone git@github.com:belieflab/prl.git --recurse-submodules` (this will initialize the `wrap` submodule)
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
        

