const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "./input");
const input = fs.readFileSync(inputPath, "utf-8").split("\n").map(parseFloat);
const reduced = input
.map((_, i, arr) => {
  return arr.slice(i, i + 3).reduce((sum, e) => sum + e, 0);
})
.reduce(
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
