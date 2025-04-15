document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const resultMessage = document.getElementById('result-message');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const userScoreDisplay = document.getElementById('user-score');
    const computerScoreDisplay = document.getElementById('computer-score');
    const resetButton = document.getElementById('reset-button');

    let userScore = 0;
    let computerScore = 0;
    let isGameActive = true;

    const getComputerChoice = () => {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    };

    const getWinner = (userChoice, computerChoice) => {
        if (userChoice === computerChoice) return 'draw';
        
        if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'user';
        }
        
        return 'computer';
    };

    const updateScore = (winner) => {
        if (winner === 'user') {
            userScore++;
            userScoreDisplay.textContent = userScore;
        } else if (winner === 'computer') {
            computerScore++;
            computerScoreDisplay.textContent = computerScore;
        }
    };

    const getResultMessage = (winner, userChoice, computerChoice) => {
        if (winner === 'draw') {
            return `It's a draw! Both chose ${userChoice}`;
        }
        
        const winnerChoice = winner === 'user' ? userChoice : computerChoice;
        const loserChoice = winner === 'user' ? computerChoice : userChoice;
        
        return `${winner === 'user' ? 'You' : 'Computer'} won! ${winnerChoice} beats ${loserChoice}`;
    };

    const showThinkingAnimation = () => {
        computerChoiceDisplay.innerHTML = `
            <div class="computer-thinking">
                <div class="thinking-dot"></div>
                <div class="thinking-dot"></div>
                <div class="thinking-dot"></div>
            </div>
        `;
    };

    const displayComputerChoice = (choice) => {
        const iconClass = {
            'rock': 'fa-hand-rock',
            'paper': 'fa-hand-paper',
            'scissors': 'fa-hand-scissors'
        };
        
        computerChoiceDisplay.innerHTML = `<i class="fas ${iconClass[choice]} computer-move"></i>`;
    };

    const handleChoice = async (e) => {
        if (!isGameActive) return;
        
        const userChoice = e.currentTarget.dataset.choice;
        resultMessage.textContent = "Computer is thinking...";
        
        // Disable choices while computer is "thinking"
        isGameActive = false;
        choices.forEach(choice => choice.style.opacity = '0.5');
        
        // Show thinking animation
        showThinkingAnimation();
        
        // Simulate computer thinking time (1.5 seconds)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const computerChoice = getComputerChoice();
        const winner = getWinner(userChoice, computerChoice);
        
        // Update the game state
        updateScore(winner);
        resultMessage.textContent = getResultMessage(winner, userChoice, computerChoice);
        displayComputerChoice(computerChoice);
        
        // Re-enable choices
        isGameActive = true;
        choices.forEach(choice => choice.style.opacity = '1');
        
        // Add animation class and user-selected class
        choices.forEach(choice => {
            choice.classList.remove('selected', 'user-selected');
        });
        e.currentTarget.classList.add('selected', 'user-selected');
    };

    const resetGame = () => {
        userScore = 0;
        computerScore = 0;
        userScoreDisplay.textContent = '0';
        computerScoreDisplay.textContent = '0';
        resultMessage.textContent = 'Choose your move!';
        computerChoiceDisplay.innerHTML = '';
        choices.forEach(choice => {
            choice.classList.remove('selected', 'user-selected');
            choice.style.opacity = '1';
        });
        isGameActive = true;
    };

    choices.forEach(choice => choice.addEventListener('click', handleChoice));
    resetButton.addEventListener('click', resetGame);
}); 