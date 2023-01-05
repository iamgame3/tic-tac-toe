// Make players and decide who goes first
const players = () => {
    // Select form inputs
    let uNameOne = document.getElementById('uNameOne').value
    let uNameTwo = document.getElementById('uNameTwo').value
    // If blank names are submitted, give them place holder names
    if (uNameOne === '') {
        uNameOne = 'Player 1'
    }
    if (uNameTwo === '') {
        uNameTwo = 'Player 2'
    }
    // Make player one go first
    uNameOneTurn = true
    uNameTwoTurn = false
    // Make the player turns global
    return {uNameOne, uNameTwo, uNameOneTurn, uNameTwoTurn}
}

// Create dummy players
let currentPlayers = players()

// Create game board logic
const gameBoard = (() => {
    // Make empty variables that will be used later
    let uNameOneWin = ''
    let uNameTwoWin = ''
    let botStatus = ''
    // Make an array that represents the game board
    let currentBoard = ['', '', '', '', '', '', '', '', '']
    // Select body container
    const bodyContainer = document.querySelector('.body-container')
    // Select reset button
    const resetButton = document.querySelector('.reset-button')
    // Select bot buttons
    const botNormalButton = document.querySelector('.bot-normal-button')
    const botImpossibleButton = document.querySelector('.bot-impossible-button')
    // Select form confirm button
    const formConfirm = document.querySelector('.confirm-button')
    // Select all game squares and make it a variable
    const gameSquares = document.querySelectorAll('.game-square')
    // Check if a square is filled in
    const squareCheck = (square) => square === 'X' || square === 'O'
    // Make normal bot function
    const botNormal = () => {
        // Get a random number between 0-8
        let i = Math.round(Math.random()*8)
        // Continue getting random numbers until number of currentBoard index is empty
        while (currentBoard[i] !== '') {
            i = Math.round(Math.random()*8)
        }
        gameSquares[i].textContent = 'O'
        currentPlayers.uNameOneTurn = true
        currentPlayers.uNameTwoTurn = false
        currentBoard[i] = 'O'
        // Check if bot won
        winCheck()
    }
    // Display win message
    const winMessage = (uNameOneW, uNameTwoW, uNameOne, uNameTwo) => {
        // Create win display div
        const winDisplay = document.createElement('div')
        winDisplay.classList.add('win-display')
        // Displays different message based on who won, or if it was a tie
        if (uNameOneW) {
            winDisplay.textContent = `${uNameOne} is the winner!`
        } else if (uNameTwoW) {
            winDisplay.textContent = `${uNameTwo} is the winner!`
        } else {
            winDisplay.textContent = "Cat's game!"
        }
        // Add finished display message to the page
        bodyContainer.appendChild(winDisplay)
    }
    // Reset the game board and game information
    const gameReset = () => {
        // Make loser go first
        if (uNameOneWin === true) {
            currentPlayers.uNameOneTurn = false
            currentPlayers.uNameTwoTurn = true
        } else if (uNameTwoWin === true) {
            currentPlayers.uNameOneTurn = true
            currentPlayers.uNameTwoTurn = false
        }
        // Set win status to false for both players
        uNameOneWin = false
        uNameTwoWin = false
        // Reset board array
        currentBoard = ['', '', '', '', '', '', '', '', '']
        // Clear all squares
        gameSquares.forEach(square => {
            square.textContent = ''
        })
        // Remove win display
        const winDisplay = document.querySelector('.win-display')
        if (winDisplay) {
            bodyContainer.removeChild(winDisplay)
        }
        if (botStatus === 'On' && currentPlayers.uNameTwoTurn) {setTimeout(() => {
            botNormal()
            }, 250)
        }
    }
    // Check if a player has won
    const winCheck = () => {
        if (currentBoard[0] === 'X' && currentBoard[1] === 'X' && currentBoard[2] === 'X') {
            uNameOneWin = true
            winMessage(true, false, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        } else if (currentBoard[3] === 'X' && currentBoard[4] === 'X' && currentBoard[5] === 'X') {
            uNameOneWin = true
            winMessage(true, false, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        } else if (currentBoard[6] === 'X' && currentBoard[7] === 'X' && currentBoard[8] === 'X') {
            uNameOneWin = true
            winMessage(true, false, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        } else if (currentBoard[0] === 'X' && currentBoard[3] === 'X' && currentBoard[6] === 'X') {
            uNameOneWin = true
            winMessage(true, false, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        } else if (currentBoard[1] === 'X' && currentBoard[4] === 'X' && currentBoard[7] === 'X') {
            uNameOneWin = true
            winMessage(true, false, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        } else if (currentBoard[2] === 'X' && currentBoard[5] === 'X' && currentBoard[8] === 'X') {
            uNameOneWin = true
            winMessage(true, false, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        } else if (currentBoard[0] === 'X' && currentBoard[4] === 'X' && currentBoard[8] === 'X') {
            uNameOneWin = true
            winMessage(true, false, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        } else if (currentBoard[2] === 'X' && currentBoard[4] === 'X' && currentBoard[6] === 'X') {
            uNameOneWin = true
            winMessage(true, false, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        } else if (currentBoard[0] === 'O' && currentBoard[1] === 'O' && currentBoard[2] === 'O') {
            uNameTwoWin = true
            winMessage(false, true, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        } else if (currentBoard[3] === 'O' && currentBoard[4] === 'O' && currentBoard[5] === 'O') {
            uNameTwoWin = true
            winMessage(false, true, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        } else if (currentBoard[6] === 'O' && currentBoard[7] === 'O' && currentBoard[8] === 'O') {
            uNameTwoWin = true
            winMessage(false, true, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        } else if (currentBoard[0] === 'O' && currentBoard[3] === 'O' && currentBoard[6] === 'O') {
            uNameTwoWin = true
            winMessage(false, true, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        } else if (currentBoard[1] === 'O' && currentBoard[4] === 'O' && currentBoard[7] === 'O') {
            uNameTwoWin = true
            winMessage(false, true, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        } else if (currentBoard[2] === 'O' && currentBoard[5] === 'O' && currentBoard[8] === 'O') {
            uNameTwoWin = true
            winMessage(false, true, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        } else if (currentBoard[0] === 'O' && currentBoard[4] === 'O' && currentBoard[8] === 'O') {
            uNameTwoWin = true
            winMessage(false, true, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        } else if (currentBoard[2] === 'O' && currentBoard[4] === 'O' && currentBoard[6] === 'O') {
            uNameTwoWin = true
            winMessage(false, true, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        } else if (currentBoard.every(squareCheck)) {
            // ^^^ Check if all squares are filled in
            winMessage(false, false, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        }
    }
    // Turn bot on
    const botOn = (bot) => {
        gameReset()
        document.getElementById('uNameTwo').value = `Bot (${bot})`
        currentPlayers = players()
        botStatus = 'On'
        botDiff = bot
    }
    // Add X or O if the user clicks on a square
    gameSquares.forEach(square => square.addEventListener('click', () => {
        // Run if square is empty and it's the first player's turn
        if (uNameOneWin || uNameTwoWin) {
            gameReset()
        } else if (!square.textContent && currentPlayers.uNameOneTurn) {
            square.textContent = 'X'
            currentPlayers.uNameOneTurn = false
            currentPlayers.uNameTwoTurn = true
            // Add turn to currentBoard array
            currentBoard[square.getAttribute('data-square-number')] = 'X'
            // Check if the player won
            winCheck()
            // Check if bot is on
            if (botStatus === 'On' && !currentBoard.every(squareCheck) && !(uNameOneWin || uNameTwoWin)) {
                // Check bot difficulty and run respective functions after a short delay
                if (botDiff === 'Normal') {setTimeout(() => {
                    botNormal()
                    }, 250)
                }
            }
        }   else if (!square.textContent && currentPlayers.uNameTwoTurn) {
            // ^^^ Run if square is empty and it's the second player's turn
            square.textContent = 'O'
            currentPlayers.uNameOneTurn = true
            currentPlayers.uNameTwoTurn = false
            // Add turn to currentBoard array
            currentBoard[square.getAttribute('data-square-number')] = 'O'
            // Check if the player won
            winCheck()
        }
    }))
    // Turn on bot when bot buttons are clicked
    botNormalButton.addEventListener('click', () => {
        botOn("Normal")
    })
    botImpossibleButton.addEventListener('click', () => {
        botOn("Impossible")
    })
    // Clear winner and game board if reset button is clicked
    resetButton.addEventListener('click', gameReset)
    // Change player names when form confirm button is clicked
    formConfirm.addEventListener('click', () => {
        currentPlayers = players()
    })
})()