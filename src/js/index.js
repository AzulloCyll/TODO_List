import "@babel/polyfill";

import { validateCaption, validateTitle } from "./validate.js";
import { changeFonts } from "./setfont.js";
import {
	addmenu,
	showhide,
	showColumnsCounters,
	createTask,
	selectStatus,
	taskTitleShowHide,
	titlesShowHide,
	taskRemove,
	hideXButtons,
	taskChangeShowhide,
	changeColumn,
} from "./modules.js";

import { saveData, loadData } from "./saveload.js";
import { myAlert } from "./notworking.js";

const body = document.getElementsByTagName("body")[0];

const main = document.createElement("main");
main.id = "main";
body.append(main);

const rootSelector = document.getElementById("main");

const logo = document.createElement("div");
logo.innerHTML = "MY TODO LIST";
logo.id = "logo";
rootSelector.append(logo);

const nav = document.createElement("nav");
nav.id = "nav";
rootSelector.append(nav);

const navUl = document.createElement("ul");
navUl.id = "navUl";
nav.append(navUl);

//elementy w menu
const menu = [
	"<i class='fas fa-angle-down  main'></i>",
	"Dodaj zadanie",
	"Pokaż opisy",
	"Litery:",
	"małe",
	"|",
	"średnie",
	"|",
	"duże",
];

//warningi
const warnings = [
	"Pole tytuł jest wymagane",
	"Piersza litera tytułu powinna być wielka",
	"Tytuł musi mieć conajmniej 5 znaków",
	"Pierwsza litera opisu powinna być wielka",
	"Musisz wpisać conajmniej 10 znaków",
	"Tekst opisu jest za długi",
];

addmenu(menu); //funckcja doająca elementy z tablicy do menu

const menuitem1 = document.getElementById("menuitem1"); //to buttony
const menuitem6 = document.getElementById("menuitem6");
menuitem6.classList.add("active");

const openTab = document.createElement("div");

// tutaj umiescic formularz i resztę
openTab.id = "opentab";
openTab.hidden = true;
// openTab.hidden = false; // potem to usunac
const form = document.createElement("form");
form.id = "form";

openTab.prepend(form);

const inputTitle = document.createElement("input");
const labelTitle = document.createElement("label");
const inputCaption = document.createElement("textarea");
const labelCaption = document.createElement("label");
const labelButtons = document.createElement("label");

const buttonTodo = document.createElement("button");
const buttonInProg = document.createElement("button");
const buttonDone = document.createElement("button");
const buttonAdd = document.createElement("button");

const warnsContaninerAll = document.createElement("div");
const warnsContainer = document.createElement("div");

labelTitle.htmlFor = "title";
labelTitle.innerHTML = "Tytuł:";

inputTitle.id = "title";
inputTitle.type = "text";
inputTitle.name = "title";

labelCaption.htmlFor = "caption";
labelCaption.innerHTML = "Krótki opis:";

inputCaption.name = "caption";
inputCaption.id = "caption";

labelButtons.htmlFor = "buttons";
labelButtons.innerHTML = "Status:";

buttonTodo.id = "button-todo";
buttonTodo.innerHTML = "TODO";
buttonTodo.type = "button";
buttonTodo.classList.add("statusbutton");

buttonInProg.id = "button-inprog";
buttonInProg.innerHTML = "IN-PROGRESS";
buttonInProg.type = "button";
buttonInProg.classList.add("statusbutton");

buttonDone.id = "button-done";
buttonDone.innerHTML = "DONE";
buttonDone.type = "button";
buttonDone.classList.add("statusbutton");

warnsContainer.id = "warnings";
warnsContaninerAll.id = "validate";

buttonAdd.id = "button-add";
buttonAdd.innerHTML = "Dodaj zadanie";
buttonAdd.type = "button";

form.append(labelTitle);
form.append(inputTitle);
form.append(labelCaption);
form.append(inputCaption);
form.append(labelButtons);

form.append(buttonTodo);
form.append(buttonInProg);
form.append(buttonDone);

form.append(warnsContaninerAll);
warnsContaninerAll.append(warnsContainer);

form.append(buttonAdd);

buttonDone.outerHTML += "<hr />";

nav.prepend(openTab);

// // dodaje br-ki po inpucie i po textarea
inputTitle.outerHTML += "<br />";
inputCaption.outerHTML += "<br />";

showhide(menuitem1); //obsluga wysuwania menu

//inicjalizacja tabeli warningów
for (let i = 0; i < warnings.length; i++) {
	const newP = document.createElement("p");
	newP.classList.add("warn");
	newP.textContent = warnings[i];
	warnsContainer.append(newP);
	newP.classList.add("hide");
}

form.title.oninput = function (event) {
	validateTitle(event.target.value, valTitle);
};

form.caption.oninput = function (event) {
	validateCaption(event.target.value, valCapt);
};

//generacja reszty strony

const h1El = document.createElement("div");

h1El.classList.add("h1container");
h1El.innerHTML = "<hr class='hrhr' /><h1>Moje zadania</h1><hr class='hrhr' />";

rootSelector.append(h1El);

//kreacja kolumn + elementów opisów
for (let i = 1; i <= 3; i++) {
	const divCol = document.createElement("div");
	const divColHeader = document.createElement("h2");
	divColHeader.classList.add("colheader");
	divColHeader.classList.add("colheader" + i);
	divCol.classList.add("col");
	divCol.classList.add("col" + i);
	rootSelector.append(divCol);
	divCol.append(divColHeader);
}

//podpisy kolumn
const divColHeadersArray = ["todo", "in-progress", "done"];
for (let i = 0; i < divColHeadersArray.length; i++) {
	const column = document.getElementsByClassName("colheader");
	column[i].innerHTML = divColHeadersArray[i];
}

// obsluga dodawania elementu
let valCapt = 0;
let valTitle = 0;

buttonAdd.onclick = function (event) {
	valCapt = validateCaption(form.caption.value);
	valTitle = validateTitle(form.title.value);
	addTask(status, valCapt, valTitle);
};

function addTask(status, valCapt, valTitle) {
	if (valCapt == 1 && valTitle == 1) {
		const title = form.title.value;
		const capt = form.caption.value;

		if (status == "") {
			console.log("Nie wybrany status");
			return 0;
		}

		// tworzy zadanie
		var r = confirm("Na pewno?");
		if (r == true) {
			createTask(title, capt, status);
		} else console.log("Nie dodano zadania.");
	}
	// console.log("status: ", status);
	// console.log("valCapt: ", valCapt);
	// console.log("valTitle:", valTitle);
	showColumnsCounters(divColHeadersArray);
}

selectStatus(); // obsługa wyboru statusu w formularzu. Po wykonaniu ustala zmienną sttus na wartości 1 - todo, 2 - in-progress, 3 - done
showColumnsCounters(divColHeadersArray); // inicjowanie

taskRemove(); //obsługa przycisku X
taskTitleShowHide(); //obsluga kliknięcia tytułu zadania jako zwijanie i rozwijanie opisu
titlesShowHide(); //obsługa przycisku w menu odsłaniającego wsyzstkie opisy
hideXButtons(); // ukrywa przyciski z kolumny ze statusem DONE
changeFonts(); // obsluga przycisków zmiany fontów
taskChangeShowhide(); //obsługa wysuwania menu z przyciskami do zmainy statusu
changeColumn(); // przesuwanie do innych statusów

loadData();

//

//save po zamknieciu okna
//-----------------------

// window.onbeforeunload = function (event) {
// 	if (true) saveData();
// };

myAlert();
