function isSafe(board, row, col, num) {
    for (let index = 0; index < board.length; index++) {
        let r = parseInt(row / 3) * 3,
            c = parseInt(col / 3) * 3;
        if (board[row][index] === num ||
            board[index][col] === num ||
            board[parseInt(index / 3) + r][index % 3 + c] === num) {
            return false;
        }
    }
    return true;
}

function solveSudoku(board, n) {
    let row = -1;
    let col = -1;
    let isDone = true;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] == 0) {
                row = i;
                col = j;
                isDone = false;
                break;
            }
        }
        if (!isDone) {
            break;
        }
    }

    if (isDone) {
        return true;
    }

    for (let num = 1; num <= n; num++) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board, n)) {
                return true;
            } else {
                board[row][col] = 0;
            }
        }
    }
    return false;
}

let board = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]
];
let N = board.length;
let canSolveSudoku = solveSudoku(board, N);

canSolveSudoku
if (canSolveSudoku) {
    let final = []
    for (let r = 0; r < N; r++) {
        let resArray = []
        for (let d = 0; d < N; d++) {
            resArray.push(board[r][d]);
        }
        final.push(resArray);
    }
    console.log(final)
    return final;
}