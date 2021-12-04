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
console.log("-------------------");

function lifeSupportCalculatorFn(indexCount, startArray, testFn) {
  return new Array(indexCount).fill(0).reduce(
    (obj, el) => {
      if (obj.bitArray.length === 1) {
        return obj;
      }
      const c0 = obj.bitArray.reduce(
        (sum, bitArray) => (bitArray[obj.index] === 0 ? sum + 1 : sum),
        0
      );
      const c1 = obj.bitArray.reduce(
        (sum, bitArray) => (bitArray[obj.index] === 1 ? sum + 1 : sum),
        0
      );
      return testFn({ c0, c1, obj });
    },
    { bitArray: startArray, index: 0 }
  );
}

const oxygenCo2Input = input.map((el) => el.split("").map((s) => parseInt(s)));

const oxygenGeneratorRatingResult = lifeSupportCalculatorFn(
  result.length,
  oxygenCo2Input,
  ({ c0, c1, obj }) => {
    if (c0 > c1) {
      return {
        bitArray: obj.bitArray.filter((el) => el[obj.index] === 0),
        index: obj.index + 1,
      };
    }
    if (c1 > c0) {
      return {
        bitArray: obj.bitArray.filter((el) => el[obj.index] === 1),
        index: obj.index + 1,
      };
    }
    if (c1 === c0) {
      return {
        bitArray: obj.bitArray.filter((el) => el[obj.index] === 1),
        index: obj.index + 1,
      };
    }
    return { bitArray: obj.bitArray, index: obj.index + 1 };
  }
);

const co2ScrubberRatingResult = lifeSupportCalculatorFn(
  result.length,
  oxygenCo2Input,
  ({ c0, c1, obj }) => {
    if (c0 < c1) {
      return {
        bitArray: obj.bitArray.filter((el) => el[obj.index] === 0),
        index: obj.index + 1,
      };
    }
    if (c1 < c0) {
      return {
        bitArray: obj.bitArray.filter((el) => el[obj.index] === 1),
        index: obj.index + 1,
      };
    }
    if (c1 === c0) {
      return {
        bitArray: obj.bitArray.filter((el) => el[obj.index] === 0),
        index: obj.index + 1,
      };
    }
    return { bitArray: obj.bitArray, index: obj.index + 1 };
  }
);
const oxygenGeneratorRating = parseInt(
  oxygenGeneratorRatingResult.bitArray.pop().join(""),
  2
);
const co2ScrubberRating = parseInt(
  co2ScrubberRatingResult.bitArray.pop().join(""),
  2
);
console.log("Oxygen Generator Rating: ", oxygenGeneratorRating);
console.log("CO² Scrubber Rating: ", co2ScrubberRating);
const lifeSupport = oxygenGeneratorRating * co2ScrubberRating;
console.log("Life Support", lifeSupport);
