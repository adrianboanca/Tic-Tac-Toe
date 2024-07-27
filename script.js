let cells = document.querySelectorAll('.cell');
let resetButton = document.getElementById('resetButton');
let turn = 'X';

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellClick);
}

resetButton.addEventListener('click', resetGame);

function cellClick() {
    if (this.textContent === '') {
        this.textContent = turn;
        if (checkWin(turn)) {
            alert(turn + ' is the winner!');
            endGame();
        } else if (Draw()) {
            alert('It is a Draw!');
            endGame();
        } else {
            turn = (turn === 'X') ? 'O' : 'X';
        }
    }
}

function checkWin(turn) {
    let winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (cells[a].textContent === turn &&
             cells[b].textContent === turn &&
             cells[c].textContent === turn) {
            return true;
        }
    }
    return false;
}

function Draw() {
    for (let cell of cells) {
        if (cell.textContent === '') {
            return false;
        }
    }
    return true;
}

function endGame() {
    for (let cell of cells) {
        cell.removeEventListener('click', cellClick);
    }
    resetButton.classList.remove('hidden');
}

function resetGame() {
    for (let cell of cells) {
        cell.textContent = '';
        cell.addEventListener('click', cellClick);
    }
    turn = 'X';
    resetButton.classList.add('hidden');
}
