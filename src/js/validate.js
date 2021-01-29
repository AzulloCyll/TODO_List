function validateTitle(elem) {
	let valTitle = 0;
	const warnsContainer = document.getElementById("warnings");
	const warningsShowhide = warnsContainer.getElementsByTagName("p");

	warningsShowhide[1].classList.add("hide");
	warningsShowhide[2].classList.add("hide");

	if (elem.length > 0) {
		if (elem.length < 5) {
			warningsShowhide[2].classList.remove("hide");
		}
		if (elem[0] == elem[0].toLowerCase()) {
			warningsShowhide[1].classList.remove("hide");
		}
	}
	elem.length < 5 || elem[0] == elem[0].toLowerCase()
		? (valTitle = -1)
		: (valTitle = 1); // walidacja prawidłowa

	// console.log(valTitle);
	return valTitle;
}

function validateCaption(elem) {
	let valCapt = 0;
	const warnsContainer = document.getElementById("warnings");
	const warningsShowhide = warnsContainer.getElementsByTagName("p");

	warningsShowhide[3].classList.add("hide");
	warningsShowhide[4].classList.add("hide");
	warningsShowhide[5].classList.add("hide");

	if (elem.length > 0) {
		if (elem.length < 10) {
			warningsShowhide[4].classList.remove("hide");
		}
		if (elem[0] == elem[0].toLowerCase()) {
			warningsShowhide[3].classList.remove("hide");
		}
		if (elem.length > 255) {
			warningsShowhide[5].classList.remove("hide");
		}
	}

	elem.length < 10 || elem[0] == elem[0].toLowerCase() || elem.length > 255
		? (valCapt = -1)
		: (valCapt = 1); // walidacja prawidłowa

	// console.log(valCapt);
	return valCapt;
}

export { validateCaption, validateTitle };
