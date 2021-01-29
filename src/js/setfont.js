function setFont(bodyAmount, h3Amount, taskstatusAmount) {
	//elementu w ktorzych zmieniam font
	const bodyEl = document.getElementsByTagName("body")[0];
	const h3Elements = document.getElementsByTagName("h3");
	const taskstatusElements = document.getElementsByClassName("taskstatus");
	const taskChangebutElements = document.getElementsByClassName(
		"taskchangebutton"
	);

	bodyEl.style.fontSize = bodyAmount + "px";

	for (let i = 0; i < h3Elements.length; i++) {
		h3Elements[i].style.fontSize = h3Amount + "px";
		taskstatusElements[i].style.fontSize = taskstatusAmount + "px";
		taskChangebutElements[i].style.fontSize = taskstatusAmount + "px";
	}
}

function changeFonts() {
	const smallFont = document.getElementById("menuitem4");
	const averageFont = document.getElementById("menuitem6");
	const bigFont = document.getElementById("menuitem8");

	smallFont.onclick = function (event) {
		if (!event.target.classList.contains("active")) {
			setFont(12, 19, 15);
			event.target.classList.add("active");
			averageFont.classList.remove("active");
			bigFont.classList.remove("active");
		}
	};

	averageFont.onclick = function (event) {
		if (!event.target.classList.contains("active")) {
			setFont(16, 26, 20);
			event.target.classList.add("active");
			smallFont.classList.remove("active");
			bigFont.classList.remove("active");
		}
	};

	bigFont.onclick = function (event) {
		if (!event.target.classList.contains("active")) {
			setFont(24, 39, 30);
			event.target.classList.add("active");
			smallFont.classList.remove("active");
			averageFont.classList.remove("active");
		}
	};
}

export { changeFonts };
