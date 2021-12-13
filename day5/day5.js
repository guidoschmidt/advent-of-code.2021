const fs = require("fs");
const path = require("path");
const common = require("../common.js");

const input = common
  .readInput(__dirname, /\n/)
  .filter((row) => row.length > 0)
  .map((row) =>
    row
      .split("->")
      .map((arr) => arr.split(","))
      .map((arr) => ({ x: parseInt(arr[0]), y: parseInt(arr[1]) }))
  );

function findMax(input, key) {
  return input
    .flat()
    .sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return +1;
      else return 0;
    })
    .pop()[key];
}

const maxX = findMax(input, "x");
const maxY = findMax(input, "y");

console.log("Image Dimensions: ", maxX, maxY);

const viz = new Array(maxX + 1).fill(0).map(() => {
  return new Array(maxY + 1).fill(0);
});

input.forEach((row) => {
  const startAt = row.shift();
  const endAt = row.pop();
  if (startAt.x === endAt.x && startAt.y < endAt.y) {
    for (let y = startAt.y; y <= endAt.y; y++) {
      viz[y][startAt.x]++;
    }
  }
  if (startAt.x === endAt.x && startAt.y > endAt.y) {
    for (let y = startAt.y; y >= endAt.y; y--) {
      viz[y][startAt.x]++;
    }
  }
  if (startAt.y === endAt.y && startAt.x < endAt.x) {
    for (let x = startAt.x; x <= endAt.x; x++) {
      viz[startAt.y][x]++;
    }
  }
  if (startAt.y === endAt.y && startAt.x > endAt.x) {
    for (let x = startAt.x; x >= endAt.x; x--) {
      viz[startAt.y][x]++;
    }
  }
});

const mappedViz = viz
  .map((row) => row.map((e) => (e === 0 ? "." : e)).join(""))
  .join("\n");

const imageData = viz
  .map((row) => row.map((e) => e * 100).join(" "))
  .join("\n");

fs.writeFile(
  path.join(__dirname, "viz.pgm"),
  `P2\n${maxX + 1} ${maxY + 1}\n255\n${imageData}`,
  (err) => {
    if (err) throw err;
    console.log("File is created successfully.");
  }
);

const sum = viz.flat().reduce((sum, el) => (el >= 2 ? sum + 1 : sum), 0);
console.log(sum);
