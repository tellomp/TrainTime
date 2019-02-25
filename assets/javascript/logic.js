
var config = {
  apiKey: "AIzaSyB_1ReonBX5TGccQWBXubZeBfpQBjQZ8jA",
  authDomain: "traintime-1cc11.firebaseapp.com",
  databaseURL: "https://traintime-1cc11.firebaseio.com",
  projectId: "traintime-1cc11",
  storageBucket: "",
  messagingSenderId: "882906187045"
};


firebase.initializeApp(config);

var database = firebase.database();


$("#addTrain").on("click", function(){
  event.preventDefault();
  var trainName = $('#trainNameInput').val().trim();
  var destination = $('#destinationInput').val().trim();
  var startTrain = $('#startTrainInput').val().trim();
  var frequency = $('#frequencyInput').val().trim();
  
  
  var newTrain = {
      trainName: trainName,
      destination : destination,
      startTrain: startTrain,
      frequency: frequency,
  }

  database.ref().push(newTrain);

  $('#trainNameInput').val("");
  $('#destinationInput').val("");
  $('#startTrainInput').val("");
  $('#frequencyInput').val("");

}); 

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().startTrain;
  var frequency = childSnapshot.val().frequency;



var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

var differentTime = moment().diff(moment(firstTimeConverted), "minutes");

var timeRemainder = differentTime % childSnapshot.val().frequency;

var minutesTillTrain = childSnapshot.val().frequency; - timeRemainder;

var nextTrain = moment().add(minutesTillTrain, "minutes").format("HH:mm");

$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination  + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minutesTillTrain + "</td></tr>");


});