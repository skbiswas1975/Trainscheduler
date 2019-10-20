var config = {
  apiKey: "AIzaSyBWZ-Kpxx5MjhNYv4f7uAuSMxmC3T9iU0U",
  authDomain: "train-scheduler-16f03.firebaseapp.com",
  databaseURL: "https://train-scheduler-16f03.firebaseio.com/",
  storageBucket: "gs://train-scheduler-16f03.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();

//setting up the clock
    setInterval(function () {
        $(".current-time").html("Time: "+moment().format('hh:mm:ss A'))
    }, 1000);


//button to add new trains
$(".submit").on("click", function(event){
	
	// Don't refresh the page!
        event.preventDefault();
		currentTime = moment().format("X");
		console.log(currentTime);


	var trainName = $('#trainName').val();
	var destination = $('#destination').val();
	var firstTrain = $('#firstTrainTime').val();
	var frequency = $('#frequency').val();

  // Creates local "temporary" object for holding train data
	var newTrain = {
		name: trainName,
		dest: destination,
		first: firstTrain,
		freq: frequency
	}

	if (trainName != "" && destination != "" && firstTrainTime != "" && frequency != "") 
	{
		database.ref().push(newTrain);

		console.log(newTrain.name);
		console.log(newTrain.dest);
		console.log(newTrain.first);
		console.log(newTrain.freq);
	  
	  
		$('#trainName').val("");
		$('#destination').val("");
		$('#firstTrainTime').val("");
		$('#frequency').val("");
		
		alert("Your Train has been added!");
	}

return false;
})



database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());
		
		// Store everything into a variable.
        var trnName = childSnapshot.val().name;
        var trnDestination = childSnapshot.val().dest;
        var fstTrnTime = childSnapshot.val().first;
        var trnFrequency = childSnapshot.val().freq;
		
		
		
		$(".table > tbody").append("<tr><td class='table-head'>" + trnName + "</td><td class='table-head'>" + trnDestination + "</td><td class='table-head'>" + trnFrequency + "</td></tr>");
})
