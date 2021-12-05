const fs = require("fs");
const path = require("path");

function readInput(dir, split = "\n", inputName = "input") {
  const inputPath = path.join(dir, inputName);
  return fs.readFileSync(inputPath, "utf8").split(split);
}

module.exports = {
  readInput,
};
