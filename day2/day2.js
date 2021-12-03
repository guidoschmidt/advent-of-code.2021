const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "input");
const input = fs
  .readFileSync(inputPath, "utf8")
  .split("\n")
  .map((el) => el.split(" "))
  .map((arr) => ({ dir: arr[0], units: parseFloat(arr[1]) }));

const result = input.reduce(
  (pos, cmd) => {
    console.log(cmd)
    switch (cmd.dir) {
      case "up":
        pos.depth -= cmd.units;
        return pos;
      case "down":
        pos.depth += cmd.units;
        return pos;
      case "forward":
        pos.horizontal += cmd.units;
        return pos;
    }
  },
  { depth: 0, horizontal: 0 }
);
console.log(result.depth * result.horizontal);
