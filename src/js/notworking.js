//?????

function myAlert() {
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

	questionXbutton.onclick = function (event) {
		questionEl.remove();
		return false;
	};

	questionNO.onclick = function (event) {
		questionEl.remove();
		return false;
	};

	questionYES.onclick = function (event) {
		questionEl.remove();
		return true;
	};
}

export { myAlert };
