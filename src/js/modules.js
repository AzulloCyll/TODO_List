//funckcja doająca elementy z tablicy do menu
function addmenu(arr) {
	for (let i in arr) {
		let navLi = [];
		navLi[i] = document.createElement("li");
		navLi[i].className = "menuitem";
		navLi[i].id = "menuitem" + i;
		navLi[i].innerHTML = arr[i];
		navUl.append(navLi[i]);
	}
}

//obsluga wysuwania menu
function showhide(button) {
	let toggleDisplay = true;

	button.onclick = function (event) {
		toggleDisplay = !toggleDisplay;

		const icon = document.getElementsByClassName("main")[0];
		const openTab = document.getElementById("opentab");

		const show = (event.target.textContent = "Dodaj zadanie");
		const hide = (event.target.textContent = "Zwiń");

		icon.classList.toggle("fa-angle-down");
		icon.classList.toggle("fa-angle-up");
		event.target.classList.toggle("fix");

		event.target.textContent = toggleDisplay ? show : hide;

		openTab.hidden = toggleDisplay;
	};
}

//liczenie elementow w poszczególnych kolumnach
function count(column) {
	const col1counter = document.getElementsByClassName("col" + column)[0];
	const col1value = col1counter.getElementsByClassName("task");
	return col1value.length;
}

function showColumnsCounters(headerTexts) {
	const divColHeaders = document.getElementsByClassName("colheader");
	for (let i = 0; i < divColHeaders.length; i++) {
		divColHeaders[i].innerHTML = headerTexts[i] + " (" + count(i + 1) + ")";
	}
}

//funkcja tworzy blok zadania
function createTask(title, caption, status) {
	const position = document.getElementsByClassName("col" + status)[0];
	const taskBody = document.createElement("div");
	const taskHeader = document.createElement("div");
	const taskTitle = document.createElement("h3");
	const taskTitleIcon = document.createElement("i");
	const taskX = document.createElement("button");
	const taskP = document.createElement("p");
	const taskFooter = document.createElement("div");
	const taskStatus = document.createElement("span");
	const taskChangeButton = document.createElement("button");
	const taskOpenDiv = document.createElement("div");
	const changeToTodo = document.createElement("button");
	const changeToInProg = document.createElement("button");
	const changeToDone = document.createElement("button");

	position.append(taskBody);
	taskBody.classList.add("task");
	taskBody.dataset.status = status;
	taskHeader.classList.add("taskheader");
	taskTitle.classList.add("tasktitle");
	taskTitle.innerHTML = title;
	taskTitleIcon.classList.add("fas");
	taskTitleIcon.classList.add("fa-angle-down");
	taskTitleIcon.classList.add("icon");
	taskX.classList.add("buttonX");
	taskX.type = "button";
	taskX.innerHTML = "<i class='fas fa-times'></i>";
	taskP.classList.add("taskcaption");
	taskP.innerHTML = caption;
	taskFooter.classList.add("taskfooter");
	taskFooter.classList.add("color" + status);
	taskStatus.classList.add("taskstatus");
	taskChangeButton.classList.add("taskchangebutton");
	taskChangeButton.classList.add("color" + status);
	taskChangeButton.type = "button";
	taskChangeButton.innerHTML = "Zmień <i class='fas fa-angle-down'></i>";
	taskOpenDiv.classList.add("taskfootershowhide");
	changeToTodo.innerHTML = "na TODO";
	changeToInProg.innerHTML = "na IN-PROGRESSS";
	changeToDone.innerHTML = "na DONE";
	changeToTodo.type = "button";
	changeToInProg.type = "button";
	changeToDone.type = "button";
	changeToTodo.classList.add("changebutton");
	changeToTodo.classList.add("todo");
	changeToInProg.classList.add("changebutton");
	changeToInProg.classList.add("inprog");
	changeToDone.classList.add("changebutton");
	changeToDone.classList.add("done");

	position.append(taskBody);
	taskBody.append(taskHeader);
	taskHeader.append(taskTitleIcon);
	taskHeader.append(taskTitle);
	taskHeader.append(taskX);
	taskBody.append(taskP);
	taskBody.append(taskFooter);
	taskFooter.append(taskStatus);
	taskFooter.append(taskChangeButton);
	taskFooter.append(taskOpenDiv);

	//przyciski zmiany statusu
	changeToDone.dataset.changeto = 3;
	changeToInProg.dataset.changeto = 2;
	changeToTodo.dataset.changeto = 1;
	taskOpenDiv.append(changeToDone);
	taskOpenDiv.append(changeToInProg);
	taskOpenDiv.append(changeToTodo);

	// dodawnie statusu do bloku zadania
	switch (status) {
		case "1":
			taskStatus.innerHTML = "status: <strong>todo</strong>";
			changeToTodo.style.display = "none";
			break;

		case "2":
			taskStatus.innerHTML = "status: <strong>in-progress</strong>";
			changeToInProg.style.display = "none";
			break;

		case "3":
			taskStatus.innerHTML = "status: <strong>done</strong>";
			changeToDone.style.display = "none";
			break;

		default:
			break;
	}

	console.log("Dodano zadanie.");
	//aktualizacja
	taskTitleShowHide(); //obsluga kliknięcia tytułu zadania jako zwijanie i rozwijanie opisu
	taskRemove(); //obsługa przycisku X
	taskChangeShowhide();
	hideXButtons();
}

// Obsługa wyboru statusu w formularzu. Po wkonaniu ustala zmienną status na wartości 1 - todo, 2 - in-progress, 3 - done
function selectStatus() {
	const buttons = form.getElementsByClassName("statusbutton");

	for (let i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function (event) {
			for (let i = 0; i < buttons.length; i++) {
				buttons[i].dataset.status = "0";
				buttons[i].classList.remove(buttons[i].id + "-selected");
			}
			event.target.classList.add(event.target.id + "-selected");
			event.target.dataset.status = i + 1;
			status = i + 1;
		};
	}
	return status;
}

//obsluga kliknięcia tytułu zadania jako zwijanie i rozwijanie opisu
function taskTitleShowHide() {
	const icons = document.getElementsByClassName("icon");
	const captions = document.getElementsByClassName("taskcaption");
	const footers = document.getElementsByClassName("taskfooter");
	const titleShowhides = document.getElementsByClassName("tasktitle");
	for (let i = 0; i < titleShowhides.length; i++) {
		titleShowhides[i].onclick = function (event) {
			captions[i].classList.toggle("hide");
			icons[i].classList.toggle("fa-angle-down");
			icons[i].classList.toggle("fa-angle-up");
			footers[i].classList.toggle("top0"); // poprawka w css do wyswietlania ikony
		};
	}
}

//obsługa przycisku w menu odsłaniającego wszystkie opisy
function titlesShowHide() {
	const titlesShowhideElement = document.getElementById("menuitem2");
	const captions = document.getElementsByClassName("taskcaption");
	const footers = document.getElementsByClassName("taskfooter");
	titlesShowhideElement.onclick = function (event) {
		for (let i = 0; i < captions.length; i++) {
			captions[i].classList.toggle("hide");
			footers[i].classList.toggle("top0");
		}
	};
}

const divColHeadersArray = ["todo", "in-progress", "done"]; //nie umiem przesłać tu zmiennej
//obsługa przycisku X
function taskRemove() {
	const xButtons = document.getElementsByClassName("buttonX");

	for (let i = 0; i < xButtons.length; i++) {
		xButtons[i].onclick = function (event) {
			if (confirm("Na pewno?") == true) {
				event.target.parentElement.parentElement.parentElement.remove();
				//aktualizacja po kliknięciu
				titlesShowHide();
				taskTitleShowHide();
				showColumnsCounters(divColHeadersArray);
				taskChangeShowhide();
				console.log("Usunięto zadanie.");
			} else {
				console.log("Nic nie usunięto.");
			}
		};
	}
}

// ukrywa przyciski z kolumny ze statusem DONE
function hideXButtons() {
	const col3 = document.getElementsByClassName("col3")[0];
	const buttons = col3.getElementsByClassName("buttonX");
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].style.visibility = "hidden";
	}
}

//obsługa wusuwania menu z przyciskami do zmainy statusu
function taskChangeShowhide() {
	let taskChangeShowhide = document.getElementsByClassName("taskchangebutton");

	for (let i = 0; i < taskChangeShowhide.length; i++) {
		taskChangeShowhide[i].nextSibling.classList.add("hide"); //ukrywa wszystkie na początku

		let toggler = true;

		taskChangeShowhide[i].onclick = function (event) {
			toggler = !toggler;
			taskChangeShowhide[i].nextSibling.classList.toggle("hide");
			const icon = taskChangeShowhide[i].getElementsByClassName("fas");
			icon[0].classList.toggle("fa-angle-up");
			icon[0].classList.toggle("fa-angle-down");

			const show = "Zmień <i class='fas fa-angle-down'></i>";
			const hide = "Zwiń <i class='fas fa-angle-up'></i>";

			taskChangeShowhide[i].innerHTML = toggler ? show : hide;
			taskChangeShowhide[i].classList.toggle("fix2");
		};
	}
}

function changeColumn() {
	const buttons = document.getElementsByClassName("changebutton");
	let status = 0;

	for (let i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function (event) {
			if (window.confirm("Na pewno zmienić") == true) {
				const title =
					event.target.parentElement.parentElement.parentElement.getElementsByClassName(
						"tasktitle"
					)[0].innerHTML;

				const caption =
					event.target.parentElement.parentElement.parentElement.getElementsByClassName(
						"taskcaption"
					)[0].innerHTML;

				status = event.target.dataset.changeto;

				createTask(title, caption, status);
				event.target.parentElement.parentElement.parentElement.remove();

				//aktualizacja DOM
				titlesShowHide();
				taskTitleShowHide();
				taskChangeShowhide();
				changeColumn();
				showColumnsCounters(divColHeadersArray);
			}
		};
	}
}

export {
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
	divColHeadersArray,
};
