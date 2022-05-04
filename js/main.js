import { Reaction } from "./model.js";

var water = new Reaction(
  "Water",
  ["Fire", "Ice"],
  ["Snowbot", "heatWave"],
  ["Explosion", "Blizzard", "heatWave"]
);

var blizzard = new Reaction(
  "Blizzard",
  ["Ice", "Wind"],
  [water, "heatWave"],
  ["Snowbot", "Explosion"]
);

console.log(blizzard);

function generateReaction(element1, element2) {}
