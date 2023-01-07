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
    // Make empty variables that will be used later so errors do not occur
    let uNameOneWin = ''
    let uNameTwoWin = ''
    let tie = ''
    let botStatus = ''
    let botDiff = ''
    const bestMove = ''
    let bestMoveFinal = ''
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
    // Display win message
    const winMessage = (uNameOneW, uNameTwoW, tied, uNameOne, uNameTwo) => {
        // Create win display div
        const winDisplay = document.createElement('div')
        winDisplay.classList.add('win-display')
        // Displays different message based on who won, or if it was a tie
        if (uNameOneW) {
            winDisplay.textContent = `${uNameOne} is the winner!`
        } else if (uNameTwoW) {
            winDisplay.textContent = `${uNameTwo} is the winner!`
        } else if (tied) {
            winDisplay.textContent = "Cat's game!"
        }
        // Add finished display message to the page
        bodyContainer.appendChild(winDisplay)
    }
    // Check if a player has won or if it was a tie
    const winCheck = () => {
        if (currentBoard[0] === 'X' && currentBoard[1] === 'X' && currentBoard[2] === 'X') {
            uNameOneWin = true
        } else if (currentBoard[3] === 'X' && currentBoard[4] === 'X' && currentBoard[5] === 'X') {
            uNameOneWin = true
        } else if (currentBoard[6] === 'X' && currentBoard[7] === 'X' && currentBoard[8] === 'X') {
            uNameOneWin = true
        } else if (currentBoard[0] === 'X' && currentBoard[3] === 'X' && currentBoard[6] === 'X') {
            uNameOneWin = true
        } else if (currentBoard[1] === 'X' && currentBoard[4] === 'X' && currentBoard[7] === 'X') {
            uNameOneWin = true
        } else if (currentBoard[2] === 'X' && currentBoard[5] === 'X' && currentBoard[8] === 'X') {
            uNameOneWin = true
        } else if (currentBoard[0] === 'X' && currentBoard[4] === 'X' && currentBoard[8] === 'X') {
            uNameOneWin = true
        } else if (currentBoard[2] === 'X' && currentBoard[4] === 'X' && currentBoard[6] === 'X') {
            uNameOneWin = true
        } else if (currentBoard[0] === 'O' && currentBoard[1] === 'O' && currentBoard[2] === 'O') {
            uNameTwoWin = true
        } else if (currentBoard[3] === 'O' && currentBoard[4] === 'O' && currentBoard[5] === 'O') {
            uNameTwoWin = true
        } else if (currentBoard[6] === 'O' && currentBoard[7] === 'O' && currentBoard[8] === 'O') {
            uNameTwoWin = true
        } else if (currentBoard[0] === 'O' && currentBoard[3] === 'O' && currentBoard[6] === 'O') {
            uNameTwoWin = true
        } else if (currentBoard[1] === 'O' && currentBoard[4] === 'O' && currentBoard[7] === 'O') {
            uNameTwoWin = true
        } else if (currentBoard[2] === 'O' && currentBoard[5] === 'O' && currentBoard[8] === 'O') {
            uNameTwoWin = true
        } else if (currentBoard[0] === 'O' && currentBoard[4] === 'O' && currentBoard[8] === 'O') {
            uNameTwoWin = true
        } else if (currentBoard[2] === 'O' && currentBoard[4] === 'O' && currentBoard[6] === 'O') {
            uNameTwoWin = true
        } else if (currentBoard.every(squareCheck)) {
            // ^^^ Check if all squares are filled in
            tie = true
        }
    }
    // Make normal bot function
    const botNormal = () => {
        // Get a random number between 0-8
        let i = Math.round(Math.random()*8)
        // Continue getting random numbers until number generated corresponds to an empty currentBoard index
        while (currentBoard[i] !== '') {
            i = Math.round(Math.random()*8)
        }
        // When a vaild spot is detected, bot goes and it's the user's turn
        gameSquares[i].textContent = 'O'
        currentBoard[i] = 'O'
        currentPlayers.uNameOneTurn = true
        currentPlayers.uNameTwoTurn = false
        // Check if the bot won or if it was a tie
        winCheck()
        if (uNameTwoWin) {
            winMessage(false, true, false, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        }
        if (tie) {
            winMessage(false, false, true, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        }
    }
    // Make minimax algorithm function
    const minimax = (board, depth, maximizingPlayer) => {
        // Check if anybody won or if it was a tie, and if it anything comes up as true give that path a score
        winCheck()
        const scores = {
            X: 1,
            O: -1,
            Tie: 0
        }
        if (uNameOneWin || uNameTwoWin || tie) {
            if (uNameOneWin) {
                score = scores.X
            } else if (uNameTwoWin) {
                score = scores.O
            } else score = scores.Tie
            // Reset end game values and return score
            uNameOneWin = false
            uNameTwoWin = false
            tie = false
            return score
        }
        // If it's the user's turn, execute
        if (maximizingPlayer) {
            // Make the best move negative infinity so any other number is better
            let bestMove = -Infinity
            // For each spot, make a move and recursively run minimax until bestMove is decided based on what score's are returned
            for (let i = 0; i < 9; i += 1) {
                // Check if spot is taken
                if (currentBoard[i] === '') {
                    currentBoard[i] = 'X'
                    // Run minimax again with move made and make it the other player's turn
                    const move = minimax(currentBoard, depth + 1, false)
                    currentBoard[i] = ''
                    // Find the best move, which is the highest number since this is the maximizing player's turn
                    bestMove = Math.max(bestMove, move)
                }
            }
            return bestMove
        }
        // If it's the bot's turn, execute
        if (!maximizingPlayer) {
            // Make the best move infinity so any other number is better
            let bestMove = Infinity
            // For each spot, make a move and recursively run minimax until bestMove is decided based on what score's are returned
            for (let i = 0; i < 9; i += 1) {
                if (currentBoard[i] === '') {
                    currentBoard[i] = 'O'
                    // Run minimax again with move made and make it the other player's turn
                    const move = minimax(currentBoard, depth + 1, true)
                    currentBoard[i] = ''
                    // Find the best move, which is the lowest number since this is the minimizing player's turn
                    bestMove = Math.min(bestMove, move)
                }
            }
            return bestMove
        }
    }
    // Make impossible bot function
    const botImpossible = () => {
        // Make the best move negative infinity so any other number is better
        let bestMove = Infinity
        // For each spot, make a move and recursively run minimax until bestMove is decided based on what score's are returned
        for (let i = 0; i < 9; i += 1) {
            // Check if spot is taken
            if (currentBoard[i] === '') {
                currentBoard[i] = 'O'
                // Run minimax again with move made and make it the other player's turn
                const move = minimax(currentBoard, 0, true)
                currentBoard[i] = ''
                // Find the best move, which is the lowest number since this is the minimizing player's turn
                if (move < bestMove) {
                    bestMove = move
                    // Assign this spot as the best move for the bot
                    bestMoveFinal = i
                }
            }
        }
        // Reset end game values
        uNameOneWin = false
        uNameTwoWin = false
        tie = false
        // Bot makes turn with best possible move
        currentBoard[bestMoveFinal] = 'O'
        gameSquares[bestMoveFinal].textContent = 'O'
        // Make it the user's turn
        currentPlayers.uNameOneTurn = true
        currentPlayers.uNameTwoTurn = false
        // Check if the bot won or if it was a tie
        winCheck()
        if (uNameTwoWin) {
            winMessage(false, true, false, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        }
        if (tie) {
            winMessage(false, false, true, currentPlayers.uNameOne, currentPlayers.uNameTwo)
        }
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
        // Reset end game values
        uNameOneWin = false
        uNameTwoWin = false
        tie = false
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
        // If the bot is active and it's the bot's turn, make the bot play the starting move
        if (botStatus === 'On' && currentPlayers.uNameTwoTurn) {setTimeout(() => {
            // Check bot difficulty and run respective functions after a short delay
            if (botDiff === 'Normal') {
                botNormal()
            } else botImpossible()
            }, 250)
        }
    }
    // Turn bot on
    const botOn = (bot) => {
        gameReset()
        // Make the second player the bot
        document.getElementById('uNameTwo').value = `Bot (${bot})`
        currentPlayers = players()
        botStatus = 'On'
        botDiff = bot
    }
    // Add X or O if the user clicks on a square
    gameSquares.forEach(square => square.addEventListener('click', () => {
        // If the game has finished, reset the board
        if (uNameOneWin || uNameTwoWin || tie) {
            gameReset()
        } else if (!square.textContent && currentPlayers.uNameOneTurn) {
            // ^^^ If the square is empty and it's the first player's turn, execute
            square.textContent = 'X'
            // Add turn to currentBoard array
            currentBoard[square.getAttribute('data-square-number')] = 'X'
            currentPlayers.uNameOneTurn = false
            currentPlayers.uNameTwoTurn = true
            // Check if the player won or if it was a tie
            winCheck()
            if (uNameOneWin) {
                winMessage(true, false, false, currentPlayers.uNameOne, currentPlayers.uNameTwo)
            }
            if (tie) {
                winMessage(false, false, true, currentPlayers.uNameOne, currentPlayers.uNameTwo)
            }
            // If the bot is active and the game hasn't finished, execute
            if (botStatus === 'On' && !(uNameOneWin || uNameTwoWin || tie)) {
                // Check bot difficulty and run respective functions after a short delay
                if (botDiff === 'Normal') {setTimeout(() => {
                    botNormal()
                    }, 250)
                } else {setTimeout(() => {
                    botImpossible()
                    }, 250)
                }
            }
        }   else if (!square.textContent && currentPlayers.uNameTwoTurn) {
            // ^^^ Run if square is empty and it's the second player's turn
            square.textContent = 'O'
            // Add turn to currentBoard array
            currentBoard[square.getAttribute('data-square-number')] = 'O'
            currentPlayers.uNameOneTurn = true
            currentPlayers.uNameTwoTurn = false
            // Check if the player won or if it was a tie
            winCheck()
            if (uNameTwoWin) {
                winMessage(false, true, false, currentPlayers.uNameOne, currentPlayers.uNameTwo)
            }
            if (tie) {
                winMessage(false, false, true, currentPlayers.uNameOne, currentPlayers.uNameTwo)
            }
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