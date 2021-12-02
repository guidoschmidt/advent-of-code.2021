const fs = require("fs");

const input = fs.readFileSync("./input", "utf-8").split("\n").map(parseFloat);
const reduced = input.reduce(
  (reduced, curr) => {
    if (reduced?.prev === null) {
      reduced.prev = curr;
      return reduced;
    }
    if (curr > reduced.prev) {
      reduced.sum++;
      reduced.prev = curr;
      return reduced;
    }
    reduced.prev = curr;
    return reduced;
  },
  { sum: 0, prev: null }
);
console.log(reduced);
