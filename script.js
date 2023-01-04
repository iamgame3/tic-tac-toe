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
    const currentBoard = ['', '', '', '', '', '', '', '', '']
    // Select all game squares and make it a variable
    const gameBoxes = document.querySelectorAll('.game-square')
    // Add X or O if the user clicks on a square
    gameBoxes.forEach(box => box.addEventListener('click', () => {
        // Run if square is empty and it's the first player's turn
        if (!box.textContent && uNameOneTurn) {
            box.textContent = 'X'
            uNameOneTurn = false
            uNameTwoTurn = true
            // Add turn to currentBoard array
            currentBoard[box.getAttribute('data-square-number')] = 'X'
        }   else if (!box.textContent && uNameTwoTurn) {
            // Run if square is empty and it's the second player's turn ^^^
            box.textContent = 'O'
            uNameOneTurn = true
            uNameTwoTurn = false
            // Add turn to currentBoard array
            currentBoard[box.getAttribute('data-square-number')] = 'O'
        }
    }))
    // Make updated player turns global
    return {uNameOneTurn, uNameTwoTurn}
})()