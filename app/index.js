import { HeartRateSensor } from "heart-rate";
import { Accelerometer } from "accelerometer";
import { Gyroscope } from "gyroscope";
import sleep from "sleep";
import { me as appbit } from "appbit";
import * as messaging from "messaging";
import * as simpleSettings from "./device-settings";
import document from "document";

let ip = document.getElementById("ip");
let testBTN = document.getElementById("button-1");
let improveSleep = document.getElementById("button-2");
let improveMemory = document.getElementById("button-3");
let optionsScreen = document.getElementById("optionsScreen");
let mainScreen = document.getElementById("mainScreen");
let optionButton = document.getElementById("option-button");
let controllerIP = '';
var shouldSendInfo = false;

// Settings initialize
function settingsCallback(data) {
	if (!data) {
		return;
	}
	console.log(JSON.stringify(data));
	if (data.ipAddr) {
		let IPfromSetings = data.ipAddr;
		console.log("ip from settings: ", IPfromSetings);
		controllerIP = IPfromSetings;
		ip.text = IPfromSetings;
	}
}

simpleSettings.initialize(settingsCallback);

function getSpreadsheetID() {
	var currentdate = new Date();
	return (
		currentdate.getDate() +
		"-" +
		(currentdate.getDate() + 1) +
		"/" +
		(currentdate.getMonth() + 1) +
		"/" +
		currentdate.getFullYear()
	);
}

function sendMessageToCompanion(values) {
	if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
		messaging.peerSocket.send(values);
	} else {
		console.log("Socket with phone is closed");
	}
}

function sendCommandToController(sleepStatus) {
	let values = {controllerIP: controllerIP, sleepStatus: sleepStatus}
	let payload = {type: 'command', value: values};
	sendMessageToCompanion(payload);
}

function showMainScreen(buttonLabel) {
	optionButton.text = buttonLabel;
	optionsScreen.style.display = "none";
	mainScreen.style.display = "inline";
	shouldSendInfo = true;
  }

  function showOptionScreen() {
	optionsScreen.style.display = "inline";
	mainScreen.style.display = "none";
	shouldSendInfo = false;
  }

// For testingg!!!
testBTN.addEventListener("click", (evt) => {
	sendCommandToController('asleep');
});

improveSleep.addEventListener("click", (evt) => {
	showMainScreen("improve sleep");
});

improveMemory.addEventListener("click", (evt) => {
	showMainScreen("improve memory");
});

// handling back press
document.onkeypress = function(e) {
	console.log("Key pressed: " + e.key);
	  if (e.key==="back" && shouldSendInfo) {
		e.preventDefault();
		showOptionScreen();
	  }
}

var heartRateReading = "--";
var accelerometerReading = {};
var sleepStatus = "--";
var gyroscopeReading = {};
var spreadsheetID = getSpreadsheetID();

// Prevent the watch to close the app
appbit.appTimeoutEnabled = false;

if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
	console.log("This device has a HeartRateSensor!");
	const hrm = new HeartRateSensor({ frequency: 5 });
	hrm.addEventListener("reading", () => {
		heartRateReading = `${hrm.heartRate}`;
	});
	hrm.start();
} else {
	console.log("This device does NOT have a HeartRateSensor!");
}

if (Accelerometer) {
	console.log("This device has an Accelerometer!");
	const accelerometer = new Accelerometer({ frequency: 1 });
	accelerometer.addEventListener("reading", () => {
		accelerometerReading = {
			x: accelerometer.x.toFixed(3),
			y: accelerometer.y.toFixed(3),
			z: accelerometer.z.toFixed(3),
		};
	});
	accelerometer.start();
} else {
	console.log("This device does NOT have an Accelerometer!");
}

if (!appbit.permissions.granted("access_sleep")) {
	console.log("We're not allowed to read a users' sleep!");
}
if (sleep) {
	sleepStatus = sleep.state;
	sleep.addEventListener("change", () => {
		sleepStatus = sleep.state;
		sendCommandToController(sleepStatus);
	});
} else {
	console.warn("Sleep API not supported on this device, or no permission");
}

if (Gyroscope) {
	console.log("This device has a Gyroscope!");
	const gyroscope = new Gyroscope({ frequency: 1 });
	gyroscope.addEventListener("reading", () => {
		gyroscopeReading = {
			x: gyroscope.x.toFixed(3),
			y: gyroscope.y.toFixed(3),
			z: gyroscope.z.toFixed(3),
		};
	});
	gyroscope.start();
} else {
	console.log("This device does NOT have a Gyroscope!");
}

// Message socket opens
messaging.peerSocket.onopen = () => {
	console.log("App Socket Open");
	let values = { hr: "App Socket Open", spreadSheetId: spreadsheetID };
	messaging.peerSocket.send(values);
};

// Message socket closes
messaging.peerSocket.onclose = () => {
	console.log("App Socket Closed");
	let values = { hr: "App Socket Closed", spreadSheetId: spreadsheetID };
	messaging.peerSocket.send(values);
};

messaging.peerSocket.onError = (err) => {
	console.log(`Connection error: ${err.code} - ${err.message}`);
};

function sendValuesToCompanion() {
	console.log('here');
	if (shouldSendInfo) {
		console.log('sending');
		let values = {
			spreadSheetId: spreadsheetID,
			hr: heartRateReading,
			accx: accelerometerReading.x,
			accy: accelerometerReading.y,
			accz: accelerometerReading.z,
			sleepStatus: sleepStatus,
			gyrx: gyroscopeReading.x,
			gyry: gyroscopeReading.y,
			gyrz: gyroscopeReading.z,
		};
		let payload = { type: "vitals", value: values };
		sendMessageToCompanion(payload);
	}
}

setInterval(sendValuesToCompanion, 5000);
