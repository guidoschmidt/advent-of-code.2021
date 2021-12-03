const common = require("../common.js");

const input = common
  .readInput(__dirname)
  .map((el) => el.split(" "))
  .map((arr) => ({ dir: arr[0], units: parseFloat(arr[1]) }));

const result = input.reduce(
  (pos, cmd) => {
    switch (cmd.dir) {
      case "down":
        pos.aim += cmd.units;
        return pos;
      case "up":
        pos.aim -= cmd.units;
        return pos;
      case "forward":
        pos.horizontal += cmd.units;
        pos.depth += pos.aim * cmd.units;
        return pos;
      default:
        return pos;
    }
  },
  { depth: 0, horizontal: 0, aim: 0 }
);
console.log(result.depth * result.horizontal);
