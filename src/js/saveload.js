import FileSaver from "file-saver";
import * as data from "./savefile.json";
import {
	createTask,
	titlesShowHide,
	taskChangeShowhide,
	taskTitleShowHide,
	changeColumn,
	showColumnsCounters,
	divColHeadersArray,
} from "./modules.js";

function loadData() {
	const readData = data;

	const objNum = Object.keys(readData).length - 1;

	for (let i = 0; i < objNum; i++) {
		createTask(readData[i].title, readData[i].caption, readData[i].status);
	}
	//aktualizacja DOM
	titlesShowHide();
	taskTitleShowHide();
	taskChangeShowhide();
	changeColumn();
	showColumnsCounters(divColHeadersArray);
}

function saveData() {
	const saveObjects = {};
	const titles = document.getElementsByClassName("tasktitle");
	const captions = document.getElementsByClassName("taskcaption");
	const tasks = document.getElementsByClassName("task");

	for (let i = 0; i < tasks.length; i++) {
		const objects = {};
		objects["title"] = titles[i].innerHTML;
		objects["caption"] = captions[i].innerHTML;
		objects["status"] = tasks[i].dataset.status;
		saveObjects[i] = objects;
	}

	const saveJSON = JSON.stringify(saveObjects);

	var blob = new Blob([saveJSON], {
		type: "text/plain;charset=utf-8",
	});

	FileSaver.saveAs(blob, "savefile.json");
}

export { saveData, loadData };
