import { Reaction } from "./model.js";

let selections = [
  document.getElementById("firstReaction"),
  document.getElementById("secondReaction"),
];

let elements = ["Fire", "Ice", "Wind", "Machine"];

let reactions = [
  new Reaction(
    "Water",
    ["Fire", "Ice"],
    ["Snowbot", "heatWave"],
    ["Explosion", "Blizzard", "heatWave"]
  ),
  new Reaction(
    "HeatWave",
    ["Fire", "Wind"],
    ["Snowbot", "Water"],
    ["Blizzard", "Water"]
  ),
  new Reaction(
    "Explosion",
    ["Fire", "Machine"],
    ["Water", "Blizzard"],
    ["Hurricane", "Snowbot"]
  ),
  new Reaction(
    "Blizzard",
    ["Ice", "Wind"],
    ["water", "heatWave"],
    ["Snowbot", "Explosion"]
  ),
  new Reaction(
    "Snowbot",
    ["Ice", "Machine"],
    ["Blizzard", "Explosion"],
    ["Water", "heatWave"]
  ),
  new Reaction(
    "Hurricane",
    ["Machine", "Wind"],
    ["Explosion", "Hurricane"],
    ["Hurricane"]
  ),
];

function getNameReaction(element1, element2, reactions) {
  for (let i = 0; i < reactions.length; i++) {
    for (let j = 0; j < 2; j++) {
      if (
        reactions[i].origin.includes(element1) &&
        reactions[i].origin.includes(element2)
      ) {
        return reactions[i].getName;
      }
    }
  }
}

selections.forEach((e) =>
  e.addEventListener("change", () => {
    document.getElementById("resultReaction").innerText = getNameReaction(
      selections[0].value,
      selections[1].value,
      reactions
    );
  })
);

selections[0].addEventListener("change", () => {
    selections[1].removeAttribute("disabled");
    selections[1].innerHTML = "";
    elements.forEach((e) => {
        if(selections[0].options[selections[0].selectedIndex].value != e){
            let option = document.createElement("option");
            option.innerText = e;
            option.value = e;
            document.getElementById(selections[1].appendChild(option));
        }
    })
})
