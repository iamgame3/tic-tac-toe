const gameBoard = (() => {
    const currentBoard = ['X', 'O', '', '', '', '', 'X', '', 'O']
    const gameBoxes = document.querySelectorAll('.game-square')
    for (let i = 0; i < currentBoard.length; i += 1) {
        gameBoxes[i].textContent = currentBoard[i]
    }
    return {}
})()

const displayController = (() => {

    return {}
})()

const Player = () => {

    return {}
}