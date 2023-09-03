import * as messaging from "messaging";

let googleSheetsAPI = 'https://script.google.com/macros/s/AKfycbwFc9h4cnhzPgvzPjq3MqPCT73QrO-_JVpsxJnvjq9OtGQh9BXGboRaBDwHeP82YLhxrA/exec';

// Message socket opens
messaging.peerSocket.onopen = () => {
    console.log("Companion Socket Open");
  };
  
  // Message socket closes
  messaging.peerSocket.onclose = () => {
    console.log("Companion Socket Closed");
  };

  // Message is received
messaging.peerSocket.onmessage = evt => {
    var values = evt.data;
    var currentdate = new Date(); 

    values.date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
    values.time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    console.log(`Phone received: ${JSON.stringify(values)}`);
    fetch(googleSheetsAPI, {method: "POST", body: JSON.stringify(values)}) 
    .then(function(response) {console.log(response.statusText)})
  };