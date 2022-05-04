import { Reaction } from "./model.js";
var selections = [
  document.getElementById("firstReaction"),
  document.getElementById("secondReaction"),
];

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

selections.forEach(e => e.addEventListener("change", () => {
    document.getElementById("resultReaction").innerText = e.value;
}))
