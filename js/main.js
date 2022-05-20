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

let selectedFirst;

let options = [
  document.getElementsByClassName("item-submenu-left"),
  document.getElementsByClassName("item-submenu-right"),
];

let containerSelectionsComputer = [
  document.getElementsByClassName("option")[0],
  document.getElementsByClassName("option")[1],
];

let submenusIconsComputer = [
  document.getElementById("panel-element-left-computer"),
  document.getElementById("panel-element-right-computer"),
];

let containerSelectionsPlayer = [
  document.getElementsByClassName("option")[2],
  document.getElementsByClassName("option")[3],
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

let difficulties = Array.from(document.getElementsByClassName("difficulty"));

let lives = [
  document.getElementById("computer-hp"),
  document.getElementById("player-hp"),
];

let percentageLife = document.getElementsByClassName("lost-life");

let elements = [
  { name: "fire", img: "./img/icons/fire.svg" },
  { name: "ice", img: "./img/icons/ice.svg" },
  { name: "wind", img: "./img/icons/wind.svg" },
  { name: "machine", img: "./img/icons/machine.svg" },
];

let reactions = [
  new Reaction(
    "water",
    "./img/icons/water.svg",
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
    "./img/icons/heat-wave.svg",
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
    "./img/icons/explosion.svg",
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
    "./img/icons/blizzard.svg",
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
    "./img/icons/snowbot.svg",
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
    "./img/icons/hurricane.svg",
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

function changeDifficulty(currentElement) {
  setClass(
    document.getElementById(localStorage.getItem("difficulty")),
    localStorage.getItem("difficulty")
  );
  localStorage.setItem("difficulty", currentElement.id);
  setClass(currentElement, "selected");
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
  document.getElementById("minus-percentage-computer").innerText =
    "-" + calculatePercentage(computerReaction, yourReaction) + "%";
  document.getElementById("minus-percentage-player").innerText =
    "-" + calculatePercentage(yourReaction, computerReaction) + "%";
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
      document.getElementById("reset").removeAttribute("disabled");
      document.getElementById("reset").parentElement.classList.remove("hide");
      containerSelectionsPlayer.forEach((e) => {
        e.classList.add("hide");
      });
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

function setClass(containerSelected, className) {
  containerSelected.classList.remove(
    containerSelected.classList[containerSelected.classList.length - 1]
  );
  containerSelected.classList.add(className);
}

function selectItem(
  item,
  submenusIcons,
  elements,
  submenus,
  checkbox,
  containerSelected
) {
  item.addEventListener("click", () => {
    submenusIcons.src = elements.find(
      (u) => u.name === item.getAttribute("data-value")
    ).img;
    containerSelected.setAttribute(
      "data-value",
      item.getAttribute("data-value")
    );
    selectedFirst
      ? setClass(containerSelectionsPlayer[1], "outline-white")
      : setClass(containerSelected, item.getAttribute("data-value"));
    resetMenu(submenus, checkbox);
    if (containerSelectionsPlayer[1].getAttribute("data-value")) {
      activateItems(checkBox[1], document.getElementById("cast-reaction"));
      setClass(document.getElementById("cast-reaction"), "no-filter");
      let reaction = getReaction(
        containerSelectionsPlayer[0].getAttribute("data-value"),
        containerSelectionsPlayer[1].getAttribute("data-value"),
        reactions
      );
      document.getElementById("result-reaction-player").src = reaction.getImg;
      setClass(
        document.getElementById("result-reaction-player").parentElement,
        reaction.getName
      );
    }
  });
}

function fillSubmenu(
  currentElement,
  elements,
  container,
  submenusIcons,
  checkbox,
  containerSelected
) {
  activateItems(checkBox[1]);
  container[1].innerHTML = "";

  if (selectedFirst) {
    setClass(containerSelected, "outline-white");
    selectedFirst = false;
  }

  elements.forEach((e) => {
    if (e.name != currentElement) {
      let span = document.createElement("span");
      span.setAttribute("data-value", e.name);
      let image = document.createElement("img");
      image.src = e.img;
      image.alt = e.name;
      image.classList.add("icon-menu");
      span.appendChild(image);
      selectItem(
        span,
        submenusIcons,
        elements,
        container,
        checkbox,
        containerSelected
      );
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
console.log(localStorage.getItem("difficulty"));
window.onload = () => {
  if (!localStorage.getItem("difficulty")) {
    localStorage.setItem("difficulty", "easy");
    setClass(difficulties[0], "selected");
  } else {
    setClass(
      document.getElementById(localStorage.getItem("difficulty")),
      "selected"
    );
  }
  disableItems(
    checkBox[1],
    document.getElementById("cast-reaction"),
    document.getElementById("reset")
  );
  resetCheckbox(...checkBox);
  selectedFirst = true;
};

difficulties.forEach((e) => {
  e.addEventListener("click", () => {
    changeDifficulty(e);
  });
});

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
      checkBox,
      containerSelectionsPlayer[1]
    );
  });
});

// Choose elements in the menus
options.forEach((e, i) => {
  Array.from(e).forEach((x) => {
    selectItem(
      x,
      submenusIcons[i],
      elements,
      submenus,
      checkBox,
      containerSelectionsPlayer[0]
    );
  });
});

document.getElementById("cast-reaction").addEventListener("click", () => {
  // Get computer elements selected
  let computerElements = [];
  computerPlay(elements).forEach((e, i) => {
    submenusIconsComputer[i].src = e.img;
    setClass(containerSelectionsComputer[i], e.name);
    computerElements.push(e.name);
  });
  // Get computer reaction
  let computerReaction = getReaction(...computerElements, reactions);
  document.getElementById("result-reaction-computer").src =
    computerReaction.getImg;
  setClass(
    document.getElementById("result-reaction-computer").parentElement,
    computerReaction.getName
  );
  // Get player reaction
  let playerReaction = getReaction(
    containerSelectionsPlayer[0].getAttribute("data-value"),
    containerSelectionsPlayer[1].getAttribute("data-value"),
    reactions
  );

  Array.from(document.getElementsByClassName("minus-percentage")).forEach(
    (e) => {
      e.classList.remove("hidden");
    }
  );

  playRound(checkBox, lives, playerReaction, computerReaction);
});

document.getElementById("reset").addEventListener("click", (e) => {
  window.location.reload();
});
