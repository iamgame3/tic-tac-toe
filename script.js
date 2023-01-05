// Make players and decide who goes first
const players = (uNameOne, uNameTwo) => {
    // Make player one go first
    uNameOneTurn = true
    uNameTwoTurn = false
    // Make the player turns global
    return {uNameOneTurn, uNameTwoTurn}
}

// Create dummy players
const currentPlayers = players('John', 'Mary')


// Create game board logic
const gameBoard = (() => {
    // Make an array that represents the game board
    let currentBoard = ['', '', '', '', '', '', '', '', '']
    // Select reset button
    const resetButton = document.querySelector('.reset-button')
    // Select all game squares and make it a variable
    const gameSquares = document.querySelectorAll('.game-square')
    // Check if a square is filled in
    const squareCheck = (square) => square === 'X' || square === 'O'
    // Check if a player has won
    const winCheck = () => {
        if (currentBoard[0] === 'X' && currentBoard[1] === 'X' && currentBoard[2] === 'X') {
            uNameOneWin = true
            console.log('Win!')
        } else if (currentBoard[3] === 'X' && currentBoard[4] === 'X' && currentBoard[5] === 'X') {
            uNameOneWin = true
            console.log('Win!')
        } else if (currentBoard[6] === 'X' && currentBoard[7] === 'X' && currentBoard[8] === 'X') {
            uNameOneWin = true
            console.log('Win!')
        } else if (currentBoard[0] === 'X' && currentBoard[3] === 'X' && currentBoard[6] === 'X') {
            uNameOneWin = true
            console.log('Win!')
        } else if (currentBoard[1] === 'X' && currentBoard[4] === 'X' && currentBoard[7] === 'X') {
            uNameOneWin = true
            console.log('Win!')
        } else if (currentBoard[2] === 'X' && currentBoard[5] === 'X' && currentBoard[8] === 'X') {
            uNameOneWin = true
            console.log('Win!')
        } else if (currentBoard[0] === 'X' && currentBoard[4] === 'X' && currentBoard[8] === 'X') {
            uNameOneWin = true
            console.log('Win!')
        } else if (currentBoard[2] === 'X' && currentBoard[4] === 'X' && currentBoard[6] === 'X') {
            uNameOneWin = true
            console.log('Win!')
        } else if (currentBoard[0] === 'O' && currentBoard[1] === 'O' && currentBoard[2] === 'O') {
            uNameTwoWin = true
            console.log('Win!')
        } else if (currentBoard[3] === 'O' && currentBoard[4] === 'O' && currentBoard[5] === 'O') {
            uNameTwoWin = true
            console.log('Win!')
        } else if (currentBoard[6] === 'O' && currentBoard[7] === 'O' && currentBoard[8] === 'O') {
            uNameTwoWin = true
            console.log('Win!')
        } else if (currentBoard[0] === 'O' && currentBoard[3] === 'O' && currentBoard[6] === 'O') {
            uNameTwoWin = true
            console.log('Win!')
        } else if (currentBoard[1] === 'O' && currentBoard[4] === 'O' && currentBoard[7] === 'O') {
            uNameTwoWin = true
            console.log('Win!')
        } else if (currentBoard[2] === 'O' && currentBoard[5] === 'O' && currentBoard[8] === 'O') {
            uNameTwoWin = true
            console.log('Win!')
        } else if (currentBoard[0] === 'O' && currentBoard[4] === 'O' && currentBoard[8] === 'O') {
            uNameTwoWin = true
            console.log('Win!')
        } else if (currentBoard[2] === 'O' && currentBoard[4] === 'O' && currentBoard[6] === 'O') {
            uNameTwoWin = true
            console.log('Win!')
        } else if (currentBoard.every(squareCheck)) {
            // Check if all squares are filled in ^^^
            console.log('Tie!')
        }
    }
    // Add X or O if the user clicks on a square
    gameSquares.forEach(square => square.addEventListener('click', () => {
        // Run if square is empty and it's the first player's turn
        if (!square.textContent && uNameOneTurn) {
            square.textContent = 'X'
            uNameOneTurn = false
            uNameTwoTurn = true
            // Add turn to currentBoard array
            currentBoard[square.getAttribute('data-square-number')] = 'X'
            // Check if the player won
            winCheck()
        }   else if (!square.textContent && uNameTwoTurn) {
            // Run if square is empty and it's the second player's turn ^^^
            square.textContent = 'O'
            uNameOneTurn = true
            uNameTwoTurn = false
            // Add turn to currentBoard array
            currentBoard[square.getAttribute('data-square-number')] = 'O'
            // Check if the player won
            winCheck()
        }
    }))
    // Clear winner and game board if reset button is clicked
    resetButton.addEventListener('click', () => {
        if (uNameOneWin === true) {
            uNameOneTurn = false
            uNameTwoTurn = true
        } else if (uNameTwoWin === true) {
            uNameOneTurn = true
            uNameTwoTurn = false
        }
        uNameOneWin = false
        uNameTwoWin = false
        currentBoard = ['', '', '', '', '', '', '', '', '']
        gameSquares.forEach(square => {
            square.textContent = ''
        })
    })
    // Make updated player turns global
    return {uNameOneTurn, uNameTwoTurn}
})()