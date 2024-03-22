import { faker } from "https://esm.sh/@faker-js/faker";

const w = faker.word;

const storedTitles = getCookie("storedTitles").split(",");

function Capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function generateTitle() {
  let adv = Capitalize(w.adverb());
  let adj = Capitalize(w.adjective());
  let noun = Capitalize(w.noun());

  renderTitle(adv, adj, noun);
}

function renderTitle(adv, adj, noun) {
  let advCheck = document.querySelector("#advCheck");
  let adjCheck = document.querySelector("#adjCheck");
  let nounCheck = document.querySelector("#nounCheck");

  let advBox = document.querySelector("#advText");
  let adjBox = document.querySelector("#adjText");
  let nounBox = document.querySelector("#nounText");

  if (advCheck.checked == false) {
    advBox.value = adv;
  }
  if (adjCheck.checked == false) {
    adjBox.value = adj;
  }
  if (nounCheck.checked == false) {
    nounBox.value = noun;
  }

  let title = document.querySelector("#generatedTitle");
  title.innerHTML = `${advBox.value} ${adjBox.value} ${nounBox.value}`;
}

function renderStoredTitles() {
  let storedTitlesBox = document.querySelector("#storedTitles");
  if (getCookie("storedTitles") != "") {
    storedTitlesBox.innerHTML = "";
    storedTitles.forEach(function (title) {
      let addedTitle = document.createElement("p");
      addedTitle.innerText = title;
      storedTitlesBox.appendChild(addedTitle);
    });
  } else {
    storedTitlesBox.innerHTML = "<p>No Stored Titles Yet</p>";
  }
}

function storeTitle() {
  let advBox = document.querySelector("#advText");
  let adjBox = document.querySelector("#adjText");
  let nounBox = document.querySelector("#nounText");

  let title = `${advBox.value} ${adjBox.value} ${nounBox.value}`;
  storedTitles.push(title);
  setCookie("storedTitles", storedTitles.join(), 30);

  renderStoredTitles();
}

function clearStoredTitles() {
  storedTitles.length = 0;
  setCookie("storedTitles", "", 30);
  document.querySelector("#storedTitles").innerHTML =
    "<p>No Stored Titles Yet</p>";
}

renderStoredTitles();

document.querySelector("#generateBtn").addEventListener("click", generateTitle, false);
document.querySelector("#storeBtn").addEventListener("click", storeTitle, false);
document.querySelector("#clearBtn").addEventListener("click", clearStoredTitles, false);



// Cookie Handlers

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
