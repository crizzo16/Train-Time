/* global moment firebase */
// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
    apiKey: "AIzaSyAJS4YQWU5DmESeYueG1qH1NGkjv3DncEY",
    authDomain: "train-time-febad.firebaseio.com/",
    databaseURL: "https://train-time-febad.firebaseio.com/",
    storageBucket: "train-time-febad.appspot.com"
};

firebase.initializeApp(config);
var database = firebase.database();

$(document).on("click", "#submit", function () {
    event.preventDefault();

    database.ref().push({
        trainName: $("#trainName").val().trim(),
        destination: $("#destination").val().trim(),
        firstTime: $("#firstTime").val(),
        frequency: $("#frequency").val()
    });

    //clear fields
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTime").val("");
    $("#frequency").val("");
    console.log
});

database.ref().on("child_added", function (snapshot) {

    let newRow = $("<tr>");

    let name = $("<td>").text(snapshot.val().trainName);
    let dest = $("<td>").text(snapshot.val().destination);
    
    let freqNum = snapshot.val().frequency;
    let freq = $("<td>").text(freqNum);
    let now = moment();
    console.log(snapshot.val().firstTime);
    let startTime = moment(snapshot.val().firstTime, "hh:mm");
    while (moment(startTime).isBefore(now)) {
        startTime = moment(startTime).add(freqNum, "m");
    }
    console.log("After time: " + moment(startTime).format("hh:mm") + ", freqNum: " + freqNum);
    //let minsNum = moment().diff(, "minutes");
    let arrive = $("<td>").text(moment(startTime).format("hh:mm"));
    let until = now.to(startTime);
    let mins = $("<td>").text(until);
   
    newRow.append(name, dest, freq, arrive, mins);
    $("#putStuffHere").append(newRow);
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});




