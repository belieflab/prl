# Description: A function that simulates choices and rewards based on PRL logic
# PRL logic requirements:
# - Number of trials: 160
# - Number of choices: 3
# - Rewards: +100 or -50
# - Accumulation of rewards (reward tally): display trial-by-trial reward as accumulated ones
# - phase probability set: first 80 trials - [0.9 0.5 0.1]; last 80 trials - [0.8 0.4 0.2]
# - performance-independent reversal: fixed reversal at every 40 trials
# - performance-dependent reversal: variable reversals once nine consecutive choices of highest reward selection
# - streak & strikes: streak-strike logic with two allowed mistakes before resetting the streak
# - contingency shift: fixed shift at trial 80
# - reset streak at fixed reversal/shift: fixed reversal and shift resets streak
# - double shuffle if index of highest reward is same: ensuring that after every shuffle, the index of the highest reward probability changes

simulate_prl <- function() {
  
  # Initialize variables
  trials <- 160
  choices <- numeric(trials)
  rewards <- numeric(trials)
  cumulative_rewards <- numeric(trials)  # Initialize with zeroes
  max_streak <- 9
  max_strikes <- 2
  streak <- 0 # count of selection of the "high" reward probability
  strikes <- 0 # count of non-selection of the "high" reward probability
  streak_counter <- 0 # Tracks the number of times the streak condition is met
  
  # Define the reward probabilities for each phase in a list
  phase_prob <- list(
    c(0.9, 0.5, 0.1), # Phase 1 probabilities
    c(0.8, 0.4, 0.2)  # Phase 2 probabilities
  )
  
  # Shuffle the probabilities for the individual
  #set.seed(123) # Ensure reproducibility
  current_prob <- sample(phase_prob[[1]]) # ensure every individual experiences different initial probabilities
  prob_sets <- matrix(nrow = trials, ncol = 3)
  

  for (trial in 1:trials) {
    prob_sets[trial,] <- current_prob # Track probability set for each trial
    
    # Performance-independent reversal every 40 trials
    if (trial == 41 | trial == 121) {

      # Store the index of the highest reward probability before the shuffle
      highest_prob_index <- which.max(current_prob)
      
      # Perform the shuffle until the highest probability index changes
      repeat {
        # Shuffle the probabilities
        shuffled_prob <- sample(current_prob)
        
        # Check if the index of the highest reward probability has changed
        if (which.max(shuffled_prob) != highest_prob_index) {
          # If the index has changed, update current_prob
          current_prob <- shuffled_prob
          break # Exit the repeat loop
        }
        # If the index hasn't changed, the loop repeats and shuffles again
      }
      
      streak <- 0 # Reset streak due to performance-independent reversal
      strikes <- 0 # Reset strikes
    }
    
    # Contingency shift after 80 trials
    if (trial == 81) {

      # Perform the shuffle until the highest probability index changes
      repeat {
        # Shuffle the probabilities
        shuffled_prob <- sample(phase_prob[[2]])
        
        # Check if the index of the highest reward probability has changed
        if (which.max(shuffled_prob) != highest_prob_index) {
          # If the index has changed, update current_prob
          current_prob <- shuffled_prob
          break # Exit the repeat loop
        }
        # If the index hasn't changed, the loop repeats and shuffles again
      }
      
      streak <- 0 # Reset streak due to performance-independent reversal
      strikes <- 0 # Reset strikes
    }
    
    # Simulate choice (randomly for this example)
    choice <- sample(1:3, 1, prob=current_prob)
    choices[trial] <- choice
    
    # Determine if reward is obtained
    outcome <- ifelse(runif(1) < current_prob[choice], 100, -50) # Math.random()
    rewards[trial] <- outcome
    
    # Accumulate rewards
    if (trial == 1) {
      cumulative_rewards[trial] <- outcome
    } else {
      cumulative_rewards[trial] <- cumulative_rewards[trial - 1] + outcome
    }
    
    # Check for performance-dependent reversal
    if (current_prob[choice] == max(current_prob)) {
      streak <- streak + 1
      if (streak >= max_streak) {
        streak_counter <- streak_counter + 1
        current_prob <- sample(current_prob)
        
        # Perform the shuffle until the highest probability index changes
        repeat {
          # Shuffle the probabilities
          shuffled_prob <- sample(current_prob)
          
          # Check if the index of the highest reward probability has changed
          if (which.max(shuffled_prob) != highest_prob_index) {
            # If the index has changed, update current_prob
            current_prob <- shuffled_prob
            break # Exit the repeat loop
          }
          # If the index hasn't changed, the loop repeats and shuffles again
        }
        
        streak <- 0 # Reset streak after reversal
        strikes <- 0 # Reset strikes
      }
    } else {
      if (strikes < max_strikes) {
        strikes <- strikes + 1
      } else {
        streak <- 0 # Reset streak if strikes exceed max_strikes
        strikes <- 0 # Reset strikes
      }
    }
  }
  
  return(list(
    choices = choices,
    rewards = rewards,
    cumulative_rewards = cumulative_rewards,
    prob_sets = prob_sets,
    number_of_streaks = streak_counter,
    number_of_strikes = strikes # number of strikes on the last trial, not the total
  ))
}

# Run the simulation
simulationResult <- simulate_prl()

