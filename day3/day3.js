const common = require("../common.js");

const input = common.readInput(__dirname);
const result = input.reduce((summed, el) => {
  el.split("").forEach((bitStr, i) => {
    const bit = parseInt(bitStr);
    if (!summed[i]) {
      summed.push({ c0: bit === 0 ? 1 : 0, c1: bit === 1 ? 1 : 0 });
    } else {
      summed[i].c0 += bit === 0 ? 1 : 0;
      summed[i].c1 += bit === 1 ? 1 : 0;
    }
  });
  return summed;
}, []);

const gammaRate2 = result.map((el) => (el.c0 > el.c1 ? 0 : 1)).join("");
const gammaRate10 = parseInt(gammaRate2, 2);
const epsilonRate2 = result.map((el) => (el.c0 > el.c1 ? 1 : 0)).join("");
const epsilonRate10 = parseInt(epsilonRate2, 2);
console.log("Gamma Rate: ", gammaRate2, gammaRate10);
console.log("Epsilon Rate: ", epsilonRate2, gammaRate10);
console.log("Power consumption: ", gammaRate10 * epsilonRate10);
