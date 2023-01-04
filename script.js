const gameBoard = (() => {
    const currentBoard = []
    const gameBoxes = document.querySelectorAll('.game-square')
    return {gameBoxes}
})()

const players = (uNameOne, uNameTwo) => {
    uNameOneTurn = true
    uNameTwoTurn = false
    return {uNameOneTurn, uNameTwoTurn}
}

const currentPlayers = players('John', 'Mary')

const displayController = (() => {
    gameBoard.gameBoxes.forEach(box => box.addEventListener('click', () => {
        if (!box.textContent && uNameOneTurn) {
            box.textContent = 'X'
            uNameOneTurn = false
            uNameTwoTurn = true
        }   else if (!box.textContent && uNameTwoTurn) {
            box.textContent = 'O'
            uNameOneTurn = true
            uNameTwoTurn = false
        }
    }));
    return {uNameOneTurn, uNameTwoTurn}
})()