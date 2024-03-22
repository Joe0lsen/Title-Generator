import { faker } from "https://esm.sh/@faker-js/faker";

const word = faker.word;

const storedTitles = getCookie("storedTitles").split(",");

function Capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function generateTitle() {
  let adv = Capitalize(word.adverb());
  let adj = Capitalize(word.adjective());
  let noun = Capitalize(word.noun());

  renderTitle(adv, adj, noun);
}

function renderTitle(adv, adj, noun) {
  let advCheckbox = document.querySelector("#advCheckbox");
  let adjCheckbox = document.querySelector("#adjCheckbox");
  let nounCheckbox = document.querySelector("#nounCheckbox");

  let advTextbox = document.querySelector("#advTextbox");
  let adjTextbox = document.querySelector("#adjTextbox");
  let nounTextbox = document.querySelector("#nounTextbox");

  if (!advCheckbox.checked) advTextbox.value = adv;
  if (!adjCheckbox.checked) adjTextbox.value = adj;
  if (!nounCheckbox.checked) nounTextbox.value = noun;

  let title = document.querySelector("#generatedTitle");
  title.innerHTML = `${advTextbox.value} ${adjTextbox.value} ${nounTextbox.value}`;
}

function renderStoredTitles() {
  let storedTitlesBox = document.querySelector("#storedTitles");
  if (!!getCookie("storedTitles")) {
    storedTitlesBox.innerHTML = "";
    storedTitles.forEach((title) => {
      let addedTitle = document.createElement("p");
      addedTitle.innerText = title;
      storedTitlesBox.appendChild(addedTitle);
    });
  } else {
    storedTitlesBox.innerHTML = "<p>No Stored Titles Yet</p>";
  }
}

function storeTitle() {
  let advTextbox = document.querySelector("#advTextbox");
  let adjTextbox = document.querySelector("#adjTextbox");
  let nounTextbox = document.querySelector("#nounTextbox");

  let title = `${advTextbox.value} ${adjTextbox.value} ${nounTextbox.value}`;
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

document
  .querySelector("#generateBtn")
  .addEventListener("click", generateTitle);
document
  .querySelector("#storeBtn")
  .addEventListener("click", storeTitle);
document
  .querySelector("#clearBtn")
  .addEventListener("click", clearStoredTitles);

// Cookie Handlers

function setCookie(cookieName, cookieValue, expireInDays) {
  const date = new Date();
  date.setTime(date.getTime() + expireInDays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie =
    cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
  let name = cookieName + "=";
  let cookieArray = document.cookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}
