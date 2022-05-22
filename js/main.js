import { Reaction } from "./model.js";
import {
  names,
  surnames,
  generateRandomName,
  generateRandomNumber,
  disableItems,
  reproduceSound,
  setClass,
  addClass,
} from "./utility.js";

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
};

// It is utilised to know when user does his first choice
let selectedFirst;

// Items contained in first submenu at the left
let options = [document.getElementsByClassName("item-submenu-left")];

// Boxes that contains computer's choices.
let containerSelectionsComputer = [
  document.getElementsByClassName("option")[0],
  document.getElementsByClassName("option")[1],
];

// Checkboxs that allow the user to choice elements.
let containerSelectionsPlayer = [
  document.getElementsByClassName("option")[2],
  document.getElementsByClassName("option")[3],
];

let checkBox = document.getElementsByClassName("checkbox");

// Images of choices done by computer
let submenusIconsComputer = [
  document.getElementById("panel-element-left-computer"),
  document.getElementById("panel-element-right-computer"),
];

// Images of choices done by player
let submenusIcons = [
  document.getElementById("panel-element-left-player"),
  document.getElementById("panel-element-right-player"),
];

let submenus = [
  document.getElementById("left-submenu"),
  document.getElementById("right-submenu"),
];

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
  // Returns original color to previous selected difficulty
  setClass(
    document.getElementById(localStorage.getItem("difficulty")),
    localStorage.getItem("difficulty")
  );

  // Change current difficulty and reload
  localStorage.setItem("difficulty", currentElement.id);
  setClass(currentElement, "selected");
  window.location.reload();
}

// Fill positions of array until both elements are differents between them.
function computerGenerateReaction(values, elements) {
  do {
    values[0] = elements[Math.floor(Math.random() * 4)];
    values[1] = elements[Math.floor(Math.random() * 4)];
  } while (values[0] === values[1]);
  return values;
}

function computerPlay(elements, difficulty, playerReaction) {
  let values = [];
  // Computer let you win
  switch (difficulty) {
    case "easy":
      for (let i = 0; i < 2; i++) {
        // Obtain advantages objects of current player's reaction
        values.push(
          elements.find(
            (z) =>
              z.name ===
              reactions.find(
                (u) => u.name === playerReaction.advantages[0].name
              ).getOrigin[i]
          )
        );
      }
      break;

    // The match will be fair for both sides
    case "normal":
      values = computerGenerateReaction(values, elements);
      break;

    // There is a 40% that computer will know player's reaction and send a weaknesses
    case "hard":
      if (Math.round(Math.random() * 10 > 4)) {
        values = computerGenerateReaction(values, elements);
      } else {
        for (let i = 0; i < 2; i++) {
          values.push(
            elements.find(
              (z) =>
                z.name ===
                reactions.find(
                  (u) => u.name === playerReaction.weaknesses[0].name
                ).getOrigin[i]
            )
          );
        }
      }
      break;
  }
  return values;
}

// According to receive reactions change life % and end the game
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

// Disable buttons and show reset
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
    // Percentage according to data storaged in objects
    if (primaryReaction.weaknesses[i].name === secondaryReaction.getName) {
      return primaryReaction.weaknesses[i].percentage;
    }
  }
  // Percentage if both reactions are the same
  if (primaryReaction.getName === secondaryReaction.getName) {
    return 3;
    // Default percentage
  } else {
    return 6;
  }
}

function activateItems(...items) {
  for (let i = 0; i < items.length; i++) {
    items[i].removeAttribute("disabled");
  }
}

function selectItem(
  item,
  selectedSubmenuIcon,
  elements,
  submenus,
  checkbox,
  containerSelected
) {
  item.addEventListener("click", () => {
    reproduceSound("./sounds/pop2.mp3");

    // Change image and attribute according to selected element
    selectedSubmenuIcon.src = elements.find(
      (u) => u.name === item.getAttribute("data-value")
    ).img;
    containerSelected.setAttribute(
      "data-value",
      item.getAttribute("data-value")
    );

    // If both selections are the same, the second is changed to the first element in second submenu
    if (
      containerSelectionsPlayer[0].getAttribute("data-value") ===
      containerSelectionsPlayer[1].getAttribute("data-value")
    ) {
      submenusIcons[1].src = submenus[1].children[0].children[0].src;
      containerSelectionsPlayer[1].setAttribute(
        "data-value",
        submenus[1].children[0].getAttribute("data-value")
      );
      setClass(
        containerSelectionsPlayer[1],
        containerSelectionsPlayer[1].getAttribute("data-value")
      );
    }
    // If it is the first time that one element is selected, the default blink animation will be deleted
    selectedFirst
      ? setClass(containerSelectionsPlayer[1], "outline-white")
      : setClass(containerSelected, item.getAttribute("data-value"));
    resetMenu(submenus, checkbox);

    // If the first element is selected, the reaction icon will lose his sepia filter and locked items will be activated
    if (containerSelectionsPlayer[1].getAttribute("data-value")) {
      activateItems(checkBox[1], document.getElementById("cast-reaction"));
      document.getElementById("cast-reaction").classList.add("no-filter");

      // We generate a reaction and try to show it in his panel
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

// It is used to fill the second submenu each time we select a element in the first one
function fillSubmenu(
  currentElement,
  elements,
  container,
  submenusIcons,
  checkbox,
  containerSelected
) {
  // Reset second submenu
  activateItems(checkBox[1]);
  container[1].innerHTML = "";

  // Delete red border in second selector because now it's not empty.
  if (selectedFirst) {
    setClass(containerSelected, "outline-white");
    selectedFirst = false;
  }

  elements.forEach((e) => {
    if (e.name != currentElement) {
      // Create three differents options from current selected element
      let span = document.createElement("span");
      addClass(
        span,
        "flex",
        "justify-center",
        "align-center",
        "pointer",
        "max-width"
      );
      span.setAttribute("data-value", e.name);

      let image = document.createElement("img");
      image.src = e.img;
      image.alt = e.name;
      image.classList.add("icon-menu");
      span.appendChild(image);

      // Allow to add events to these new options
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

window.onload = () => {
  // If there is no localStorage data, we assign normal difficulty by default and also add selected class to CSS
  if (!localStorage.getItem("difficulty")) {
    localStorage.setItem("difficulty", "normal");
    setClass(difficulties[0], "selected");
  } else {
    // If there was one difficulty selected before, we just refresh his style
    setClass(
      document.getElementById(localStorage.getItem("difficulty")),
      "selected"
    );
  }

  // Generate a random name to your rival
  document.getElementById("cpu-name").innerText = generateRandomName(
    names,
    surnames
  );

  // Select a random image to your rival
  document.getElementById("computer-photo").style.backgroundImage =
    "url('./img/portraits/" + generateRandomNumber(50) + ".jpg')";

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
    reproduceSound("./sounds/pop1.mp3");
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
  reproduceSound("./sounds/whoosh.mp3");

  // Get player reaction
  let playerReaction = getReaction(
    containerSelectionsPlayer[0].getAttribute("data-value"),
    containerSelectionsPlayer[1].getAttribute("data-value"),
    reactions
  );

  // Get computer elements selected
  let computerElements = [];
  computerPlay(
    elements,
    localStorage.getItem("difficulty"),
    playerReaction
  ).forEach((e, i) => {
    // Define images and styles to elements according to generated reaction
    submenusIconsComputer[i].src = e.img;
    setClass(containerSelectionsComputer[i], e.name);
    // Save names of each element selected by computer to use this against player
    computerElements.push(e.name);
  });

  // Get computer reaction according to array generated before
  let computerReaction = getReaction(...computerElements, reactions);
  // Again define styles and images, but in this case to reaction, not to elements
  document.getElementById("result-reaction-computer").src =
    computerReaction.getImg;
  setClass(
    document.getElementById("result-reaction-computer").parentElement,
    computerReaction.getName
  );

  // When at least one round has started percentages container will be displayed
  Array.from(document.getElementsByClassName("minus-percentage")).forEach(
    (e) => {
      e.classList.remove("hidden");
    }
  );

  playRound(checkBox, lives, playerReaction, computerReaction);
});

document.getElementById("reset").addEventListener("click", () => {
  window.location.reload();
});
