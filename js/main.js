import { Reaction } from "./model.js";
import {
  names,
  surnames,
  generateRandomName,
  disableItems,
} from "./utility.js";

document.getElementById("cpu-name").innerText = generateRandomName(
  names,
  surnames
);

let selections = [
  document.getElementById("firstReaction"),
  document.getElementById("secondReaction"),
];

let options = document.getElementsByClassName("item-submenu");

let elements = ["Fire", "Ice", "Wind", "Machine"];

let lives = [
  document.getElementById("computer-hp"),
  document.getElementById("player-hp"),
];

let percentageLife = document.getElementsByClassName("lost-life");

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

function playRound(selections, lives, yourReaction, computerReaction) {
  lives[0].innerText -= calculatePercentage(computerReaction, yourReaction);
  lives[1].innerText -= calculatePercentage(yourReaction, computerReaction);
  for (let i = 0; i < lives.length; i++) {
    percentageLife[i].style.height = 100 - lives[i].innerText + "%";
  }
  endGame(lives, selections);
}

function endGame(lives, selections) {
  for (let i = 0; i < lives.length; i++) {
    if (lives[i].innerText < 1) {
      disableItems(
        selections[0],
        selections[1],
        document.getElementById("castReaction")
      );
    }
  }
}

// You will receive a percentage to apply to the first element and also default ones
function calculatePercentage(primaryReaction, secondaryReaction) {
  for (let i in primaryReaction.weaknesses) {
    if (primaryReaction.weaknesses[i].name === secondaryReaction.getName) {
      return primaryReaction.weaknesses[i].percentage;
    }
  }
  primaryReaction.getName === secondaryReaction.getName ? 3 : 6;
}

function activateItems(...items) {
  for (let i = 0; i < items.length; i++) {
    items[i].removeAttribute("disabled");
  }
}

function fillSelect(selections, elements) {
  activateItems(selections[1], document.getElementById("castReaction"));
  selections[1].innerHTML = "";
  elements.forEach((e) => {
    if (selections[0].options[selections[0].selectedIndex].value != e) {
      let option = document.createElement("option");
      option.innerText = e;
      option.value = e;
      document.getElementById(selections[1].appendChild(option));
    }
  });
}

window.onload = () => {
  disableItems(selections[1], document.getElementById("castReaction"));
};

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
    selections,
    lives,
    getReaction(selections[0].value, selections[1].value, reactions),
    getReaction(...computerPlay(elements), reactions)
  );
});

for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", () => {
    selections[0].selectedIndex = options[i].getAttribute("data-value");
    fillSelect(selections, elements);
    document.getElementById("submenu").classList.add("hidden");
    document.getElementById("checkbox").checked = false;
  });
}

document.getElementById("checkbox").addEventListener("click", function () {
  document.getElementById("checkbox").checked
    ? document.getElementById("submenu").classList.remove("hidden")
    : document.getElementById("submenu").classList.add("hidden");
});
