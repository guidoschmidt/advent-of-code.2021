const common = require("../common.js");

const input = common.readInput(__dirname, /\n\n/, "example");
const drawSequence = input
  .shift()
  .split(",")
  .map((n) => parseInt(n));
const boards = input
  .map((boardString) => boardString.split("\n"))
  .map((row) =>
    row
      .map((row) =>
        row
          .split(" ")
          .filter((e) => e.length > 0)
          .map((n) => ({ x: false, n: parseInt(n) }))
      )
      .flat()
  );

function checkBoardForWin(board) {
  for (let r = 0; r < board.length; r += 5) {
    const row = board.slice(r, r + 5);
    const won = row.reduce((won, el) => won && el.x, true);
    if (won) {
      return board;
    }
  }
  for (let c = 0; c < board.length / 5; c++) {
    const col = new Array(5).fill(0).map((_, i) => {
      return board[c + i * 5];
    });
    const won = col.reduce((won, el) => won && el.x, true);
    if (won) {
      return board;
    }
  }
}

let winningBoards = [];

const reduced = drawSequence.reduce(
  (data, drawn) => {
    const markedBoards = boards.map((board) => {
      return board.map((e) =>
        data.drawSeq.includes(e.n) ? { x: true, n: e.n } : { x: false, n: e.n }
      );
    });
    markedBoards.forEach((board, boardIdx) => {
      const won = checkBoardForWin(board);
      if (won && winningBoards.length < boards.length) {
        winningBoards.push({
          boardIdx,
          won,
          drawSeq: [...data.drawSeq, drawn],
        });
      }
    });
    return {
      won: [],
      boards: markedBoards,
      drawSeq: [...data.drawSeq, drawn],
    };
  },
  { boards, drawSeq: [], won: [] }
);

console.log("First board to win: ");

const firstWinning = winningBoards.shift();
const firstWinningBoard = firstWinning.won;
const firstWinningBoardViz = firstWinningBoard.map((el) =>
  el.x ? `x` : `${el.n}`
);
console.log(firstWinningBoardViz);

const firstWinningScore = firstWinningBoard
  .filter((e) => !e.x)
  .reduce((sum, e) => sum + e.n, 0);
const lastDrawnWhenFirstWon =
  firstWinning.drawSeq[firstWinning.drawSeq.length - 2];

console.log("Last drawn: ", lastDrawnWhenFirstWon);
console.log("Score: ", firstWinningScore * lastDrawnWhenFirstWon);

console.log("\n\n--------------------\n\n");

console.log("Last board to win: ");

const lastWinning = winningBoards[1];
const lastWinningBoard = lastWinning.won;
const lastWinningBoardViz = lastWinningBoard.map((el) =>
  el.x ? `x` : `${el.n}`
);
console.log(lastWinningBoardViz);

const lastWinningScore = lastWinningBoard
  .filter((e) => !e.x)
  .reduce((sum, e) => sum + e.n, 0);
const lastDrawnWhenLastWon =
  lastWinning.drawSeq[lastWinning.drawSeq.length - 1];

console.log("Last drawn: ", lastDrawnWhenLastWon, "\n", lastWinning.drawSeq);
console.log(
  "Score: ",
  lastWinningScore,
  lastWinningScore * lastDrawnWhenLastWon
);

console.log("--------------------");
