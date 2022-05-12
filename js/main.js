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

let options = [
  document.getElementsByClassName("item-submenu-left"),
  document.getElementsByClassName("item-submenu-right"),
];

let submenus = [
  document.getElementById("left-submenu"),
  document.getElementById("right-submenu"),
];

let checkBox = document.getElementsByClassName("checkbox");

let lives = [
  document.getElementById("computer-hp"),
  document.getElementById("player-hp"),
];

let percentageLife = document.getElementsByClassName("lost-life");

let elements = [
  { name: "Fire", img: "🔥" },
  { name: "Ice", img: "❄️" },
  { name: "Wind", img: "🍃" },
  { name: "Machine", img: "⚙️" },
];

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
    firstValue = elements[Math.floor(Math.random() * 4)].name;
    secondValue = elements[Math.floor(Math.random() * 4)].name;
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
  if (primaryReaction.getName === secondaryReaction.getName) {
    return 3;
  } else {
    return 6;
  }
}

function activateItems(...items) {
  for (let i = 0; i < items.length; i++) {
    items[i].removeAttribute("disabled");
  }
}

function fillSubmenu(currentElement, elements) {}

function showHideMenu(checkbox, menu) {
  checkbox.checked
    ? menu.classList.remove("hidden")
    : menu.classList.add("hidden");
}

function resetMenu(submenu, checkbox) {
  submenu.classList.add("hidden");
  checkbox.checked = false;
}

window.onload = () => {
  disableItems(checkBox[1], document.getElementById("castReaction"));
};


// Add functionality to open and close menus
Array.from(checkBox).forEach((e, i) => {
  e.addEventListener("click", () => {
    showHideMenu(e, submenus[i]);
  })
})