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
} from "./modules.js";

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
		createTask(title, capt, status);
	}
	// console.log("status: ", status);
	// console.log("valCapt: ", valCapt);
	// console.log("valTitle:", valTitle);
	showColumnsCounters(divColHeadersArray);
}

selectStatus(); // obsługa wyboru statusu w formularzu. Po wykonaniu ustala zmienną sttus na wartości 1 - todo, 2 - in-progress, 3 - done

// testy na sztywno
createTask("wyświetl-ukryj", "Ukrywanie/Wyświetlanie opisów zadań", "3");
createTask("usuwanie", "Obsługa usuwania zadania", "3");
createTask("dodawanie", "Obsługa usuwania zadania", "3");
createTask(
	"Komunikaty",
	"Przed wykonaniem usuwania, dodawania, zmiany statusu zapytaj użytkownika (dowolny komunikat) czy na pewno chce wykonać daną operację.",
	"2"
);
createTask(
	"Zmiana statusu",
	"Zmiana statusu zadania ma spowodować:<br /> - przenieść zadanie do odpowiedniej kolumny, <br />- zmienić kolor 'elementu wyróżniającego' przypisany do danego statusu.",
	"1"
);
createTask(
	"logowanie",
	"Każda operacja powinna zapisywać/logować się w konsoli przeglądarki.",
	"2"
);
createTask(
	"zmiana liter",
	"Dodaj 3 przycisku powiększania fontu w całej aplikacji: mały (75%), domyślny (100%), duży (150%)",
	"3"
);
createTask(
	"status w form",
	"Dodaj ukryte pole w formularzu, gdzie będzie trzymana informacja o statusie zadania",
	"2"
);
createTask("Formularz", "Pole tytuł ma być wymagane, opis nie.", "2");
createTask(
	"priorytety",
	"- lista priorytetów: niski, średni, wysoki,<br />- domyślny priorytet to: średni<br />- każdy z priorytetów przedstaw za pomocą jakiejś ikonki - obrazka<br/>- dodaj możliwość zmiany priorytetu pojedynczego zadania <br /><br />Priorytety determinują kolejność zdań w kolumnach – kolejność to: wysoki, średni, niski",
	"1"
);
createTask(
	"Blokada usuwania",
	"Dodaj możliwość usuwania zadania, ale zablokuj taką możliwość gdy zadania ma status 'DONE'",
	"3"
);

showColumnsCounters(divColHeadersArray); // inicjowanie

taskRemove(); //obsługa przycisku X
taskTitleShowHide(); //obsluga kliknięcia tytułu zadania jako zwijanie i rozwijanie opisu
titlesShowHide(); //obsługa przycisku w menu odsłaniającego wsyzstkie opisy
hideXButtons(); // ukrywa przyciski z kolumny ze statusem DONE
changeFonts(); // obsluga przycisków zmiany fontów
taskChangeShowhide(); //obsługa wysuwania menu z przyciskami do zmainy statusu

/*
//????nie działa
//pokazuje potwierdzenie // gdzie to i jak wywołać
function announce() {
	const body = document.getElementsByTagName("body")[0];
	const questionEl = document.createElement("div");
	const questionDiv = document.createElement("div");
	const questionDivHead = document.createElement("div");
	const questionTitle = document.createElement("span");
	const questionXbutton = document.createElement("button");
	const questionContent = document.createElement("div");
	const questionYES = document.createElement("button");
	const questionNO = document.createElement("button");

	questionEl.classList.add("opacity");
	questionDiv.classList.add("announce");
	questionDivHead.classList.add("announcehead");
	questionTitle.classList.add("announcetitle");
	questionTitle.innerHTML = "Pytanie";
	questionXbutton.innerHTML = "<i class='fas fa-times'></i>";
	questionXbutton.classList.add("buttonX-annonce");
	questionContent.classList.add("questioncontent");
	questionContent.innerHTML =
		"<p>Czy na pewno chcesz<br /> wykonać operację?</p>";
	questionYES.innerHTML = "Tak";
	questionNO.innerHTML = "Nie";
	questionYES.classList.add("buttonyes");
	questionNO.classList.add("buttonno");

	body.prepend(questionEl);
	questionEl.append(questionDiv);
	questionDiv.append(questionDivHead);
	questionDivHead.append(questionTitle);
	questionDivHead.append(questionXbutton);
	questionDiv.append(questionContent);
	questionDiv.append(questionYES);
	questionDiv.append(questionNO);
	let val = 0;
	questionXbutton.onclick = function (event) {
		questionEl.remove();
	};
}
*/
