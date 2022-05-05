import { Reaction } from "./model.js";

function getReaction(element1, element2, reactions) {
  for (let i = 0; i < reactions.length; i++) {
    for (let j = 0; j < 2; j++) {
      if (
        reactions[i].origin.includes(element1) &&
        reactions[i].origin.includes(element2)
      ) {
        return reactions[i];
      }
    }
  }
}

function computerPlay(elements) {
  let firstValue, secondValue;
  do {
    firstValue = elements[Math.floor(Math.random() * 4)];
    secondValue = elements[Math.floor(Math.random() * 4)];
  } while (firstValue === secondValue);
  return [firstValue, secondValue];
}

function playRound(yourReaction, computerReaction) {
  document.getElementById("playerHP").innerText = document.getElementById(
    "playerHP"
  ).innerText -= calculatePercentage(yourReaction, computerReaction);
  document.getElementById("computerHP").innerText = document.getElementById(
    "computerHP"
  ).innerText -= calculatePercentage(computerReaction, yourReaction);
}

// You will receive percentage to apply to first element and default ones
function calculatePercentage(primaryReaction, secondaryReaction) {
  for (let i in primaryReaction.weaknesses) {
    if (primaryReaction.weaknesses[i].name === secondaryReaction.name) {
      return primaryReaction.weaknesses[i].percentage;
    }
  }

  if (primaryReaction.name === secondaryReaction.name) {
    return 3;
  } else {
    return 6;
  }
}

window.onload = () => {
  selections[1].setAttribute("disabled", "disabled");
  document.getElementById("castReaction").setAttribute("disabled", "disabled");
};

let selections = [
  document.getElementById("firstReaction"),
  document.getElementById("secondReaction"),
];

let elements = ["Fire", "Ice", "Wind", "Machine"];

let reactions = [
  new Reaction(
    "Water",
    ["Fire", "Ice"],
    [
      { name: "Snowbot", percentage: 18 },
      { name: "heatWave", percentage: 18 },
    ],
    [
      { name: "Explosion", percentage: 15 },
      { name: "Blizzard", percentage: 15 },
      { name: "heatWave", percentage: 15 },
    ]
  ),
  new Reaction(
    "HeatWave",
    ["Fire", "Wind"],
    [
      { name: "Snowbot", percentage: 15 },
      { name: "Water", percentage: 15 },
    ],
    [
      { name: "Blizzard", percentage: 15 },
      { name: "Water", percentage: 18 },
    ]
  ),
  new Reaction(
    "Explosion",
    ["Fire", "Machine"],
    [
      { name: "Water", percentage: 15 },
      { name: "Blizzard", percentage: 15 },
    ],
    [
      { name: "Hurricane", percentage: 20 },
      { name: "Snowbot", percentage: 16 },
    ]
  ),
  new Reaction(
    "Blizzard",
    ["Ice", "Wind"],
    [
      { name: "water", percentage: 15 },
      { name: "heatWave", percentage: 15 },
    ],
    [
      { name: "Snowbot", percentage: 16 },
      { name: "Explosion", percentage: 15 },
    ]
  ),
  new Reaction(
    "Snowbot",
    ["Ice", "Machine"],
    [
      { name: "Blizzard", percentage: 16 },
      { name: "Explosion", percentage: 16 },
    ],
    [
      { name: "Water", percentage: 18 },
      { name: "heatWave", percentage: 15 },
    ]
  ),
  new Reaction(
    "Hurricane",
    ["Machine", "Wind"],
    [
      { name: "Explosion", percentage: 20 },
      { name: "Hurricane", percentage: 15 },
    ],
    [{ name: "Hurricane", percentage: 15 }]
  ),
];

//
selections[0].addEventListener("change", () => {
  document.getElementById("castReaction").removeAttribute("disabled");
  selections[1].removeAttribute("disabled");
  selections[1].innerHTML = "";
  elements.forEach((e) => {
    if (selections[0].options[selections[0].selectedIndex].value != e) {
      let option = document.createElement("option");
      option.innerText = e;
      option.value = e;
      document.getElementById(selections[1].appendChild(option));
    }
  });
});

// Obtain current reaction
selections.forEach((e) =>
  e.addEventListener("change", () => {
    document.getElementById("resultReaction").innerText = getReaction(
      selections[0].value,
      selections[1].value,
      reactions
    ).getName;
  })
);

// Send your reaction and computer ones
document.getElementById("castReaction").addEventListener("click", () => {
  playRound(
    getReaction(selections[0].value, selections[1].value, reactions),
    getReaction(...computerPlay(elements), reactions)
  );
});
