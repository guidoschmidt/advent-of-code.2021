const common = require("../common.js");

const input = common.readInput(__dirname, /\n\n/);
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

let found;

const reduced = drawSequence.reduce(
  (data, drawn) => {
    const markedBoards = boards.map((board) => {
      return board.map((e) =>
        data.drawSeq.includes(e.n) ? { x: true, n: e.n } : { x: false, n: e.n }
      );
    });
    markedBoards.forEach((board) => {
      const won = checkBoardForWin(board);
      if (won && !found) {
        found = {
          won: won,
          drawSeq: [...data.drawSeq, drawn],
        };
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

console.log(found.won.map((el) => (el.x ? `x` : `${el.n}`)));
const score = found.won.filter((e) => !e.x).reduce((sum, e) => sum + e.n, 0);
console.log(score);
console.log(found.drawSeq);
const lastDrawn = found.drawSeq[found.drawSeq.length - 2];
console.log(score, lastDrawn, score * lastDrawn);
