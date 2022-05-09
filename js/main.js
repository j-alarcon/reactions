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

let elements = ["Fire", "Ice", "Wind", "Machine"];

let options = [
  document.getElementsByClassName("item-submenu-left"),
  document.getElementsByClassName("item-submenu-right"),
];

let submenus = [
  document.getElementById("leftSubmenu"),
  document.getElementById("rightSubmenu"),
];

let checkBox = document.getElementsByClassName("checkbox");

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

function fillSelect(selections, elements) {
  activateItems(document.getElementById("castReaction"));
  selections[1].innerHTML = "";
  elements.forEach((e) => {
    if (selections[0].options[selections[0].selectedIndex].value != e) {
      let option = document.createElement("option");
      option.innerText = e;
      option.value = e;
      document.getElementById(selections[1].appendChild(option));
    }
  });
  fillMenu(selections);
}

function fillMenu(selections) {
  submenus[1].innerHTML = "";
  for (let i = 0; i < selections[1].options.length; i++) {
    let span = document.createElement("span");
    span.setAttribute("data-value", i);
    span.classList.add("item-submenu-right");
    span.innerText = selections[1].options[i].innerText;
    span.addEventListener("click", () => {
      selections[1].selectedIndex = span.getAttribute("data-value");
      resetMenu(submenus[1], checkBox[1]);
    });
    submenus[1].appendChild(span);
  }
}

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
  disableItems(document.getElementById("castReaction"));
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
  for (let j = 0; j < options[i].length; j++) {
    options[i][j].addEventListener("click", () => {
      selections[0].selectedIndex = options[i][j].getAttribute("data-value");
      fillSelect(selections, elements);
      resetMenu(options[i][j].parentNode, checkBox[i]);
    });
  }
}

for (let i = 0; i < checkBox.length; i++) {
  checkBox[i].addEventListener("click", () => {
    showHideMenu(checkBox[i], submenus[i]);
  });
}
