import * as messaging from "messaging";

let googleSheetsAPI = 'https://script.google.com/macros/s/AKfycbyCyU1uAd1hNo93SQci6QvVoRjZvgwpPYTIJ1iNJrKN9C3oUSate4ob3Eh7gucLAV5QOw/exec';

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




  //https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23RDWH&redirect_uri=http://localhost&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight
  // code: 13d43380c41045941ea49cd5f32ff4ce31fae7fa

  /**
   * {
    "sleep": [
        {
            "dateOfSleep": "2023-09-09",
            "duration": 31680000,
            "efficiency": 98,
            "endTime": "2023-09-09T08:12:00.000",
            "infoCode": 0,
            "isMainSleep": true,
            "levels": {
                "data": [
                    {
                        "dateTime": "2023-09-08T23:24:00.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2023-09-08T23:24:30.000",
                        "level": "light",
                        "seconds": 1590
                    },
                    {
                        "dateTime": "2023-09-08T23:51:00.000",
                        "level": "deep",
                        "seconds": 3210
                    },
                    {
                        "dateTime": "2023-09-09T00:44:30.000",
                        "level": "light",
                        "seconds": 810
                    },
                    {
                        "dateTime": "2023-09-09T00:58:00.000",
                        "level": "deep",
                        "seconds": 300
                    },
                    {
                        "dateTime": "2023-09-09T01:03:00.000",
                        "level": "light",
                        "seconds": 4380
                    },
                    {
                        "dateTime": "2023-09-09T02:16:00.000",
                        "level": "deep",
                        "seconds": 1860
                    },
                    {
                        "dateTime": "2023-09-09T02:47:00.000",
                        "level": "light",
                        "seconds": 300
                    },
                    {
                        "dateTime": "2023-09-09T02:52:00.000",
                        "level": "rem",
                        "seconds": 1050
                    },
                    {
                        "dateTime": "2023-09-09T03:09:30.000",
                        "level": "light",
                        "seconds": 1020
                    },
                    {
                        "dateTime": "2023-09-09T03:26:30.000",
                        "level": "rem",
                        "seconds": 270
                    },
                    {
                        "dateTime": "2023-09-09T03:31:00.000",
                        "level": "light",
                        "seconds": 1260
                    },
                    {
                        "dateTime": "2023-09-09T03:52:00.000",
                        "level": "deep",
                        "seconds": 1920
                    },
                    {
                        "dateTime": "2023-09-09T04:24:00.000",
                        "level": "light",
                        "seconds": 180
                    },
                    {
                        "dateTime": "2023-09-09T04:27:00.000",
                        "level": "rem",
                        "seconds": 2130
                    },
                    {
                        "dateTime": "2023-09-09T05:02:30.000",
                        "level": "light",
                        "seconds": 3630
                    },
                    {
                        "dateTime": "2023-09-09T06:03:00.000",
                        "level": "rem",
                        "seconds": 270
                    },
                    {
                        "dateTime": "2023-09-09T06:07:30.000",
                        "level": "light",
                        "seconds": 1020
                    },
                    {
                        "dateTime": "2023-09-09T06:24:30.000",
                        "level": "rem",
                        "seconds": 1380
                    },
                    {
                        "dateTime": "2023-09-09T06:47:30.000",
                        "level": "light",
                        "seconds": 210
                    },
                    {
                        "dateTime": "2023-09-09T06:51:00.000",
                        "level": "wake",
                        "seconds": 540
                    },
                    {
                        "dateTime": "2023-09-09T07:00:00.000",
                        "level": "light",
                        "seconds": 240
                    },
                    {
                        "dateTime": "2023-09-09T07:04:00.000",
                        "level": "wake",
                        "seconds": 240
                    },
                    {
                        "dateTime": "2023-09-09T07:08:00.000",
                        "level": "light",
                        "seconds": 1170
                    },
                    {
                        "dateTime": "2023-09-09T07:27:30.000",
                        "level": "rem",
                        "seconds": 360
                    },
                    {
                        "dateTime": "2023-09-09T07:33:30.000",
                        "level": "light",
                        "seconds": 690
                    },
                    {
                        "dateTime": "2023-09-09T07:45:00.000",
                        "level": "rem",
                        "seconds": 330
                    },
                    {
                        "dateTime": "2023-09-09T07:50:30.000",
                        "level": "light",
                        "seconds": 420
                    },
                    {
                        "dateTime": "2023-09-09T07:57:30.000",
                        "level": "wake",
                        "seconds": 870
                    }
                ],
                "shortData": [
                    {
                        "dateTime": "2023-09-08T23:24:00.000",
                        "level": "wake",
                        "seconds": 180
                    },
                    {
                        "dateTime": "2023-09-08T23:36:30.000",
                        "level": "wake",
                        "seconds": 60
                    },
                    {
                        "dateTime": "2023-09-08T23:44:00.000",
                        "level": "wake",
                        "seconds": 60
                    },
                    {
                        "dateTime": "2023-09-08T23:47:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2023-09-09T00:44:00.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2023-09-09T01:09:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2023-09-09T01:21:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2023-09-09T01:42:00.000",
                        "level": "wake",
                        "seconds": 60
                    },
                    {
                        "dateTime": "2023-09-09T02:02:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2023-09-09T02:07:00.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2023-09-09T02:46:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2023-09-09T03:08:30.000",
                        "level": "wake",
                        "seconds": 60
                    },
                    {
                        "dateTime": "2023-09-09T03:12:00.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2023-09-09T04:41:00.000",
                        "level": "wake",
                        "seconds": 60
                    },
                    {
                        "dateTime": "2023-09-09T04:56:00.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2023-09-09T05:00:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2023-09-09T05:04:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2023-09-09T05:34:30.000",
                        "level": "wake",
                        "seconds": 90
                    },
                    {
                        "dateTime": "2023-09-09T06:02:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2023-09-09T06:07:30.000",
                        "level": "wake",
                        "seconds": 120
                    },
                    {
                        "dateTime": "2023-09-09T06:16:30.000",
                        "level": "wake",
                        "seconds": 90
                    },
                    {
                        "dateTime": "2023-09-09T06:28:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2023-09-09T06:43:00.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2023-09-09T06:45:30.000",
                        "level": "wake",
                        "seconds": 120
                    },
                    {
                        "dateTime": "2023-09-09T07:21:00.000",
                        "level": "wake",
                        "seconds": 180
                    },
                    {
                        "dateTime": "2023-09-09T07:33:30.000",
                        "level": "wake",
                        "seconds": 90
                    }
                ],
                "summary": {
                    "deep": {
                        "count": 4,
                        "minutes": 120,
                        "thirtyDayAvgMinutes": 103
                    },
                    "light": {
                        "count": 27,
                        "minutes": 263,
                        "thirtyDayAvgMinutes": 246
                    },
                    "rem": {
                        "count": 12,
                        "minutes": 91,
                        "thirtyDayAvgMinutes": 84
                    },
                    "wake": {
                        "count": 29,
                        "minutes": 54,
                        "thirtyDayAvgMinutes": 55
                    }
                }
            },
            "logId": 42710451535,
            "logType": "auto_detected",
            "minutesAfterWakeup": 0,
            "minutesAsleep": 474,
            "minutesAwake": 54,
            "minutesToFallAsleep": 0,
            "startTime": "2023-09-08T23:24:00.000",
            "timeInBed": 528,
            "type": "stages"
        }
    ],
    "summary": {
        "stages": {
            "deep": 120,
            "light": 263,
            "rem": 91,
            "wake": 54
        },
        "totalMinutesAsleep": 474,
        "totalSleepRecords": 1,
        "totalTimeInBed": 528
    }
}
   */