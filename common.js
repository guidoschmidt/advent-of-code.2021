const fs = require("fs");
const path = require("path");

function readInput(dir) {
  const inputPath = path.join(dir, "input");
  return fs.readFileSync(inputPath, "utf8").split("\n");
}

module.exports = {
  readInput,
};
