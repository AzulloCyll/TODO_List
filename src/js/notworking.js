//?????

let response = 0;

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

	clickCheck();
}

function clickCheck() {
	const questionEl = document.getElementsByClassName("opacity")[0];
	const questionXbutton = document.getElementsByClassName("buttonX-annonce")[0];
	const questionNO = document.getElementsByClassName("buttonno")[0];
	const questionYES = document.getElementsByClassName("buttonyes")[0];

	questionXbutton.onclick = function () {
		questionEl.remove();
		response = -1;
	};

	questionNO.onclick = function () {
		questionEl.remove();
		response = -1;
	};

	questionYES.onclick = function () {
		questionEl.remove();
		response = 1;
	};
}

export { myAlert };
