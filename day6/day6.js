const common = require("../common.js");

let input = common.readInput(__dirname, /,/).map(parseFloat);
console.log(`Initial State #`, input.length);
console.log(`Initial State`, input);

const dayCount = 80;
for (let d = 0; d < dayCount; d++) {
  input = input.reduce((acc, f, i) => {
    if (f === 0) {
      acc[i] = 6;
      acc.push(8);
    } else {
      acc[i]--;
    }
    return acc;
  }, input);
}

console.log(`After 80d: #`, input.length);
