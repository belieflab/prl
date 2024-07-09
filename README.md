Certainly! I'll modify the README to replace the die emoji with a card emoji. Here's the updated version with a card emoji:

# 🃏 Probabilistic Reversal Learning Task

## 🚀 Getting Started

### Clone the Repository

```bash
git clone git@github.com:belieflab/prl.git --recurse-submodules
```

> 💡 This will initialize the `wrap` submodule

### Stay Updated

When pulling changes, run:

```bash
./sync.sh
```

> 🔄 This ensures the `wrap` submodule is up-to-date

### ⚙️ Configuration

Modify `conf.js` to customize your experiment. Key options include:

```javascript
// Debug Mode
const debug = true;

// Experiment Version
const version = "deck"; // Options: "deck", "avatar", "sabotage", "gain", "loss"

// URL Configuration
const urlConfig = {
    default: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_bErtyAFIwnwDhWu",
    loss: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_8qsU4yfds5mH6Pc",
    gain: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_8qsU4yfds5mH6Pc",
};

// Intake Variables (for in-person experiments)
const intake = {
    subject: {
        minLength: 5,
        maxLength: 5,
    },
    sites: ["Vanderbilt"],
    phenotypes: ["hc"],
};
```

### 🌐 Online Administration

For platforms like PROLIFIC, CloudResearch, MTurk, or Connect, use:

```
https://web-url-of-your-website.com/study-name/prl/redirect.php
```

## 🧠 Task Description

### 🃏 Deck Scenario
Participants choose from three decks with varying reward probabilities. These probabilities change over time, requiring adaptive strategies.

### 👥 Avatar Scenario
A social version where participants select project partners based on reliability.

### 🏢 Sabotage Scenario
Navigate office dynamics by choosing colleagues to impress the boss.

## 🎭 Types of Uncertainty

### Expected Uncertainty
Known variability within the task.

### Unexpected Uncertainty
Unforeseen changes in reward probabilities:
- 🔄 Shifts: Mid-experiment probability changes
- 🔀 Reversals: 
  - Performance-independent: Fixed changes
  - Performance-dependent: Variable changes based on participant choices

## 🛠 Development Guide

### Dependencies
- PHP version 8.x
- jsPsych version 7.x

### XAMPP Setup
1. [Download XAMPP](https://www.apachefriends.org/download.html)
2. Start XAMPP and services
3. Clone the repository into htdocs
4. Modify permissions
5. Launch the experiment

## 📊 Output Variables

We're working on including:
- start_time, end_time
- browser details
- deck information (color, position, probabilities, contingencies)
- response details
- reward_type
- trial_type (now called reversal_type)

## 🚧 To-Do
- Implement image preloading in version 7

---

🃏 Ready to dive in? Let's explore decision-making under uncertainty! 🧠🔍
