import * as messaging from "messaging";
import { settingsStorage } from "settings";

// Program values
let googleSheetsAPI =
	"https://script.google.com/macros/s/AKfycbxF7HUZAghL7EGkniLdqg2zuZw-KP9TsB_Pxmi7bFkGupENlmjGwvXDHyO5M0x70NEE8w/exec";
let parametersArray = [];


function sendVitalsToGoogleSheets(value) {
	let values = value;
	var currentdate = new Date();

	values.date =
		currentdate.getDate() +
		"/" +
		(currentdate.getMonth() + 1) +
		"/" +
		currentdate.getFullYear();
	values.time =
		currentdate.getHours() +
		":" +
		currentdate.getMinutes() +
		":" +
		currentdate.getSeconds();

	parametersArray.push(values);

	if (parametersArray.length >= 5) {
		let payload = JSON.stringify({ parametersArray: parametersArray });
		fetch(googleSheetsAPI, {
			method: "POST",
			body: payload,
			headers: {
				"Content-Type": "application/json",
			},
		}).finally(() => (parametersArray = []));
	}
}

function sendCommandToController(value) {
	// console.log(value.controllerIP);
	// console.log(value.sleepStatus);
	let url = `http://${value.controllerIP}/cmd`
	console.log('url:', url);
	fetch(url, {
		method: "POST",
		body: JSON.stringify({sleepStatus: value.sleepStatus}),
		headers: {
			"Content-Type": "application/json",
		},
	}).catch((err) => {console.log('oopsss', err);});
}

// Event fires when a setting is changed
settingsStorage.addEventListener("change", (evt) => {
    console.log('settings changed');
	if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
		messaging.peerSocket.send({
			key: evt.key,
			value: JSON.parse(evt.newValue),
		});
	} else {
		console.log("No peerSocket connection");
	}
});

// Message socket opens
messaging.peerSocket.onopen = () => {
	console.log("Companion Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
	console.log("Companion Socket Closed");
};

// Message is received
messaging.peerSocket.onmessage = (evt) => {
	console.log(JSON.stringify(evt.data));
	let messageType = evt.data.type;
	let value = evt.data.value;

	switch (messageType) {
		case "vitals":
			sendVitalsToGoogleSheets(value);
			break;
		case "command":
			sendCommandToController(value);
			break;
		default:
			break;
	}
};