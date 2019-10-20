var config = {
  apiKey: "AIzaSyBWZ-Kpxx5MjhNYv4f7uAuSMxmC3T9iU0U",
  authDomain: "train-scheduler-16f03.firebaseapp.com",
  databaseURL: "https://train-scheduler-16f03.firebaseio.com/",
  storageBucket: "gs://train-scheduler-16f03.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();


    setInterval(function () {
        $(".current-time").html("Time: "+moment().format('hh:mm:ss A'))
    }, 1000);



$(".submit").on("click", function(event){
	
	event.preventDefault();
	//currentTime = moment().format("X");


	var trainName = $('#trainName').val();
	var destination = $('#destination').val();
	var firstTrain = $('#firstTrainTime').val();
	var frequency = $('#frequency').val();

  
	var TrainNewData = {
		TrainName: trainName,
		Destination: destination,
		FirstTrainTime: firstTrain,
		TrainFrequency: frequency
	}

	if (trainName != "" && destination != "" && firstTrainTime != "" && frequency != "") 
	{
		database.ref().push(TrainNewData);

		console.log(TrainNewData.TrainName);
		console.log(TrainNewData.Destination);
		console.log(TrainNewData.FirstTrainTime);
		console.log(TrainNewData.TrainFrequency);
	  
	  
		$('#trainName').val("");
		$('#destination').val("");
		$('#firstTrainTime').val("");
		$('#frequency').val("");
		
		alert("Your Train has been added!");
	}

return false;
})



database.ref().on("child_added", function (childSnapshot, prevChildKey) {
		
	var trainName = childSnapshot.val().TrainName;
    var trnDestination = childSnapshot.val().Destination;
    var firstTrainTime = childSnapshot.val().FirstTrainTime;
    var trainFrequency = childSnapshot.val().TrainFrequency;
	
	
	var firstTrainTimeCalculated = moment(firstTrainTime, "hh:mm").subtract(1, "years");
	console.log(firstTrainTimeCalculated);

	
	var currentTime = moment();
	
	var timeDifferenceWithNow = moment().diff(moment(firstTrainTimeCalculated), "minutes");
	
	var timeRemainder = timeDifferenceWithNow % trainFrequency;
	
	var waitingMinutesTillNextTrain = trainFrequency - timeRemainder;
	
	var nextTrainTime = moment().add(waitingMinutesTillNextTrain, "minutes").format("hh:mm A");
		
	$(".table > tbody").append("<tr><td class='table-head'>" + trainName + "</td><td class='table-head'>" + trnDestination + "</td><td class='table-head'>" + trainFrequency + "</td><td class='table-head'>" + nextTrainTime + "</td><td class='table-head'>" + waitingMinutesTillNextTrain + "</td></tr>");
})
