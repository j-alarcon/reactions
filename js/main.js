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

let submenusIcons = [
  document.getElementById("panel-element-left-player"),
  document.getElementById("panel-element-right-player"),
];

let checkBox = document.getElementsByClassName("checkbox");

let lives = [
  document.getElementById("computer-hp"),
  document.getElementById("player-hp"),
];

let percentageLife = document.getElementsByClassName("lost-life");

let elements = [
  { name: "fire", img: "🔥" },
  { name: "ice", img: "❄️" },
  { name: "wind", img: "🍃" },
  { name: "machine", img: "⚙️" },
];

let reactions = [
  new Reaction(
    "water",
    ["fire", "ice"],
    [
      { name: "snowbot", percentage: 18 },
      { name: "heatWave", percentage: 18 },
    ],
    [
      { name: "explosion", percentage: 15 },
      { name: "blizzard", percentage: 15 },
      { name: "heatWave", percentage: 15 },
    ]
  ),
  new Reaction(
    "heatWave",
    ["fire", "wind"],
    [
      { name: "snowbot", percentage: 15 },
      { name: "water", percentage: 15 },
    ],
    [
      { name: "blizzard", percentage: 15 },
      { name: "water", percentage: 18 },
    ]
  ),
  new Reaction(
    "explosion",
    ["fire", "machine"],
    [
      { name: "water", percentage: 15 },
      { name: "blizzard", percentage: 15 },
    ],
    [
      { name: "hurricane", percentage: 20 },
      { name: "snowbot", percentage: 16 },
    ]
  ),
  new Reaction(
    "blizzard",
    ["ice", "wind"],
    [
      { name: "water", percentage: 15 },
      { name: "heatWave", percentage: 15 },
    ],
    [
      { name: "snowbot", percentage: 16 },
      { name: "explosion", percentage: 15 },
    ]
  ),
  new Reaction(
    "snowbot",
    ["ice", "machine"],
    [
      { name: "blizzard", percentage: 16 },
      { name: "explosion", percentage: 16 },
    ],
    [
      { name: "water", percentage: 18 },
      { name: "heatWave", percentage: 15 },
    ]
  ),
  new Reaction(
    "hurricane",
    ["machine", "wind"],
    [
      { name: "explosion", percentage: 20 },
      { name: "hurricane", percentage: 15 },
    ],
    [{ name: "hurricane", percentage: 15 }]
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
        document.getElementById("cast-reaction")
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

function selectItem(item, submenusIcons, elements, submenus, checkbox) {
  item.addEventListener("click", () => {
    submenusIcons.innerText = elements.find(
      (u) => u.name === item.getAttribute("data-value")
    ).img;
    resetMenu(submenus, checkbox);
  });
}

function fillSubmenu(
  currentElement,
  elements,
  container,
  submenusIcons,
  checkbox
) {
  activateItems(checkBox[1], document.getElementById("cast-reaction"));
  container[1].innerHTML = "";
  elements.forEach((e) => {
    if (e.name != currentElement) {
      let span = document.createElement("span");
      span.innerText = e.img;
      span.setAttribute("data-value", e.name);
      selectItem(span, submenusIcons, elements, container, checkbox);
      container[1].appendChild(span);
    }
  });
}

function showHideMenu(checkbox, menu) {
  checkbox.checked
    ? menu.classList.remove("hidden")
    : menu.classList.add("hidden");
}

function resetMenu(submenu, checkbox) {
  for (let i = 0; i < submenu.length; i++) {
    submenu[i].classList.add("hidden");
    checkbox[i].checked = false;
  }
}

function resetCheckbox(...checkboxs) {
  for (let i = 0; i < checkboxs.length; i++) {
    checkboxs[i].checked = false;
  }
}

window.onload = () => {
  disableItems(checkBox[1], document.getElementById("cast-reaction"));
  resetCheckbox(...checkBox);
};

// Open and close menus
Array.from(checkBox).forEach((e, i) => {
  e.addEventListener("click", () => {
    showHideMenu(e, submenus[i]);
  });
});

// Fill right submenu according to first selection
Array.from(options[0]).forEach((e) => {
  e.addEventListener("click", () => {
    fillSubmenu(
      e.getAttribute("data-value"),
      elements,
      submenus,
      submenusIcons[1],
      checkBox
    );
  });
});

// Choose elements in the menus
options.forEach((e, i) => {
  Array.from(e).forEach((x, z) => {
    selectItem(x, submenusIcons[i], elements, submenus, checkBox);
  });
});
