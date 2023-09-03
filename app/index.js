import { HeartRateSensor } from "heart-rate";
import { Accelerometer } from "accelerometer";
import sleep from "sleep";
import { me as appbit } from "appbit";
let document = require("document");
import * as messaging from "messaging";

const hrmLabel = document.getElementById("hrm");
var heartRateReading = '--';
var accelerometerReading = {};
var sleepStatus = '--';

if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
   console.log("This device has a HeartRateSensor!");
   const hrm = new HeartRateSensor({frequency: 5});
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
     accelerometerReading = {x: accelerometer.x.toFixed(3), y: accelerometer.y.toFixed(3), z: accelerometer.z.toFixed(3)};
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
    });
 } else {
    console.warn("Sleep API not supported on this device, or no permission")
 }

  // Message socket opens
messaging.peerSocket.onopen = () => {
   console.log("App Socket Open");
 };
 
 // Message socket closes
 messaging.peerSocket.onclose = () => {
   console.log("App Socket Closed");
 };

function updateUI() {
  hrmLabel.text = `${heartRateReading}`;
  console.log(`User sleep state is: ${sleep.state}`);
}

function sendValuesToCompanion() {
   let values = {hr: heartRateReading, accelerometerData: accelerometerReading, sleepStatus: sleepStatus};
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
   console.log('Watch sent: ', JSON.stringify(values))
    messaging.peerSocket.send(values);
  }  else {
    console.log('Socket with phone is closed');
  }
}

setInterval(sendValuesToCompanion, 5000);