import { HeartRateSensor } from "heart-rate";
import { Accelerometer } from "accelerometer";
import { Gyroscope } from "gyroscope";
import sleep from "sleep";
import { me as appbit } from "appbit";
import * as messaging from "messaging";


function getSpreadsheetID() {
   var currentdate = new Date(); 
   return currentdate.getDate() + "-" + (currentdate.getDate()+1) + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
 }


var heartRateReading = '--';
var accelerometerReading = {};
var sleepStatus = '--';
var gyroscopeReading = {};
var spreadsheetID = getSpreadsheetID();


// Prevent the watch to close the app
appbit.appTimeoutEnabled = false;

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

 if (Gyroscope) {
   console.log("This device has a Gyroscope!");
   const gyroscope = new Gyroscope({ frequency: 1 });
   gyroscope.addEventListener("reading", () => {
      gyroscopeReading = {x: gyroscope.x.toFixed(3), y: gyroscope.y.toFixed(3), z: gyroscope.z.toFixed(3)};
   });
   gyroscope.start();
} else {
   console.log("This device does NOT have a Gyroscope!");
}

  // Message socket opens
messaging.peerSocket.onopen = () => {
   console.log("App Socket Open");
   let values = {hr: "App Socket Open", spreadSheetId: spreadsheetID};
   messaging.peerSocket.send(values);
 };
 
 // Message socket closes
 messaging.peerSocket.onclose = () => {
   console.log("App Socket Closed");
   let values = {hr: "App Socket Closed", spreadSheetId: spreadsheetID};
   messaging.peerSocket.send(values);
 };

function sendValuesToCompanion() {
   let values = {spreadSheetId: spreadsheetID, hr: heartRateReading, accelerometerData: accelerometerReading, sleepStatus: sleepStatus, gyroscopeData: gyroscopeReading};
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
   console.log('Watch sent: ', JSON.stringify(values))
    messaging.peerSocket.send(values);
  }  else {
    console.log('Socket with phone is closed');
  }
}

setInterval(sendValuesToCompanion, 5000);