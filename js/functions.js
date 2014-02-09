var editMode = false;
var db = new ydn.db.Storage('personal-travis-db');

var interval = 
{
  benchpress: 5, // penkkipunnerrus
  inclinepress: 10, // vinopenkkipunnerrus
  lyingtricepsextension: 2.5, // ranskalainen punnerrus
  cablepulldown: 5, // ylätalja
  cableseatedrow: 5, // alatalja
  bicepscurl: 1, // hauiskääntö
  deadlift: 5, // maastaveto
  legextension: 5, // jalanojennus
  legcurl: 5, // jalankoukistus
  uprightrow: 5, // pystysoutu
  shoulderpress: 5, // pystypunnerrus
  shrugs: 2.5, // olankohautus
  bentoverrow: 2.5, // kulmasoutu
  pecdeck: 5, // rintarutistus
  hammerbicepscurl: 1, // vasarakääntö
  legpress: 10, // jalkaprässi
  lunge: 10, // askelkyykky
  powerclean: 5 // rinnalleveto
}

function exerciseObject(exerciseName)
{
	this.name = exerciseName;
	this.reps = 0;
	this.weight = 0;
	this.reached = false;
	this.interval = interval[exerciseName];
	
	this.updateReps = updateReps;
	function updateReps(reps)
	{
		this.reps = reps;
	}
	
	this.updateWeight = updateWeight;
	function updateWeight(weight)
	{
		this.weight = weight;
	}
	
	this.updateReached = updateReached;
	function updateReached(boolean)
	{
		this.reached = reached;
	}
}

var benchpress            = new exerciseObject("benchpress");
var inclinepress          = new exerciseObject("inclinepress");
var lyingtricepsextension = new exerciseObject("lyingtricepsextension");
var cablepulldown         = new exerciseObject("cablepulldown");
var cableseatedrow        = new exerciseObject("cableseatedrow");
var bicepscurl            = new exerciseObject("bicepscurl");
var deadlift              = new exerciseObject("deadlift");
var legextension          = new exerciseObject("legextension");
var legcurl               = new exerciseObject("legcurl");
var uprightrow            = new exerciseObject("uprightrow");
var shoulderpress         = new exerciseObject("shoulderpress");
var shrugs                = new exerciseObject("shrugs");
var bentoverrow           = new exerciseObject("bentoverrow");
var pecdeck               = new exerciseObject("pecdeck");
var hammerbicepscurl      = new exerciseObject("hammerbicepscurl");
var legpress              = new exerciseObject("legpress");
var lunge                 = new exerciseObject("lunge");
var powerclean            = new exerciseObject("powerclean");

function readExerciseFromDB(exerciseName)
{
  var currentReps = 200;
  var currentWeight = 200;
	db.from(exerciseName.name).list().done(function(records) 
	{
		exerciseName.updateReps(records[(records.length - 1)].reps);
	});
	db.from(exerciseName.name).list().done(function(records) 
	{
		exerciseName.updateWeight(records[(records.length - 1)].weight);
	});
}

function checkLaunchCounter()
{
	launchCounter = parseInt(localStorage.getItem("launchCounter"));
	if (launchCounter === null) 
	{
		localStorage.setItem("launchCounter", 1);
		console.log("The first launch");
	}
	else
	{
		localStorage.setItem("launchCounter", launchCounter + 1);
		console.log("The launch number " + launchCounter);
	}
}

function writeRecord(exerciseName, weight, reps, exclude)
{
  var d = new Date();
  var currDay = ('0'+(d.getDate())).slice(-2);
  var currMonth = ('0'+(d.getMonth()+1)).slice(-2);
  var currYear = d.getFullYear();
  var now = currYear +"-"+ currMonth +"-"+ currDay;
	db.put(exerciseName, {weight: weight, reps: reps, exclude: exclude}, now);
}

function writeDefaultData()
{
	/* benchpress = pena, inclinepress = vinopena, lyingtricepsextension = ranskis */
	writeRecord("benchpress", 30, 10, true);
	writeRecord("inclinepress", 20, 10, true);
	writeRecord("lyingtricepsextension", 15, 10, true);
	
	/* cablepulldown = ylätalja, cableseatedrow = alatalja, bicepscurl = hauiskääntö */
	writeRecord("cablepulldown", 20, 10, true);
	writeRecord("cableseatedrow", 20, 10, true);
	writeRecord("bicepscurl", 4, 10, true);
	
	/* deadlift = maastoveto, legextension = jalanojennus, legcurl = jalankoukistus */
	writeRecord("deadlift", 30, 10, true);
	writeRecord("legextension", 10, 10, true);
	writeRecord("legcurl", 10, 10, true);
	
	/* uprightrow = pystysoutu, shoulderpress = pystypunnerrus, shrugs = olankohautus */
	writeRecord("uprightrow", 20, 10, true);
	writeRecord("shoulderpress", 20, 10, true);
	writeRecord("shrugs", 10, 10, true);
	
	/* bentoverrow = kulmasoutu, pecdeck = rintarutistus, hammerbicepscurl = vasarakääntö */
	writeRecord("bentoverrow", 25, 10, true);
	writeRecord("pecdeck", 20, 10, true);
	writeRecord("hammerbicepscurl", 4, 10, true);
	
	/* legpress = jalkaprässi, lunge = askelkyykky, powerclean = rive */
	writeRecord("legpress", 50, 10, true);
	writeRecord("lunge", 20, 10, true);
	writeRecord("powerclean", 25, 10, true);
}

function getWeight(exercise)
{
	db.from(exercise).list().done(function(records) 
	{
		console.log(records[(records.length - 1)].weight);
	});
}

function suggestNextWorkout()
{
  var lastWorkout = parseInt(localStorage.getItem("lastWorkout"));
  if (lastWorkout === null)
  {
    localStorage.setItem("lastWorkout", 6);
  }
  var thisWorkout;
  console.log("Last workout is " + lastWorkout);
  if (lastWorkout > 5)
  {
    thisWorkout = 1;  
  }
  else
  {
    thisWorkout = lastWorkout + 1;
  }
  $(".live-tile > div").removeClass("suggested");
  $("#tile-" + thisWorkout + " > div").addClass("suggested");
}

function initFirstLevelView()
{
  $("#second-level-view").fadeOut();
}

function printExercise(exerciseName)
{
	$("#second-level-view").append
	(
		"<div style=''>" +
		"  <div style='width: 50%; display: inline-block; font-size: 25px; margin: 5px 0px 5px 0px; '>" + string[exerciseName.name] + "</div>" +
		"  <div style='width: 45%; display: inline-block; text-align: right; padding-right: 3%;'>" +
		"    <img class='goal-adjuster' src='img/navi-icons/plus.png' onclick='goalPlus(" + exerciseName.name + ", true)'>" +
		"    <img class='goal-adjuster' src='img/navi-icons/minus.png' onclick='goalMinus(" + exerciseName.name + ", true)'>" +
		"  </div>" +
		"</div>" +
		"<div style='margin-bottom: 20px; border: 1px solid #FFF; border-bottom: 0px; border-right: 0px; padding-left: 15px;'>" +
		"  <div style='display: inline-block; width: 40%; margin: 0px; padding: 0px;'>" +
		"    <p>" + string.weight + ":</p>" +
		"    <p>" + string.reps + ":</p>" +
		"    <p>" + string.reached + ":</p>" +
		"  </div>" +
		"  <div style='display: inline-block; width: 30%; margin: 0px;'>" +
		"    <p><span id='" + exerciseName.name + "-weight'>" + exerciseName.weight + "</span> kg</p>" +
		"    <p><span id='" + exerciseName.name + "-reps'>" + exerciseName.reps + "</span> x 3</p>" +
		"    <p><input type='checkbox'></p>" +
		"  </div>" +
		"</div>"
	);
}

function goalPlus(exerciseName, updateInterface)
{
  var newReps;
  var newWeight;
  var currentReps = parseInt(exerciseName.reps);
  var currentWeight = parseInt(exerciseName.weight);
  if (exerciseName.reps == 12)
  {
    newReps = 6;
    newWeight = parseInt(exerciseName.weight) + parseFloat(exerciseName.interval);
    exerciseName.updateWeight(newWeight);
    exerciseName.updateReps(newReps);
  }
  else
  {
		newReps = exerciseName.reps + 2;
    exerciseName.updateReps(newReps);
  }
  if (updateInterface)
  {
    $("#"+exerciseName.name+"-weight").html(newWeight);
    $("#"+exerciseName.name+"-reps").html(newReps);
  }
}

function goalMinus(exerciseName, updateInterface)
{
  //alert(exerciseName.name);
  //alert(exerciseName.reps);
  var newReps;
  var newWeight;
  if (exerciseName.reps == 6)
  {
    newReps = 12;
    newWeight = parseInt(exerciseName.weight) - parseFloat(exerciseName.interval);
    exerciseName.updateWeight(newWeight);
    exerciseName.updateReps(newReps);
  }
  else if (exerciseName.weight <= 0)
  {
    newWeight = 0;
  }
  else
  {
		 newReps = exerciseName.reps - 2;
    exerciseName.updateReps(newReps);
  }
  if (updateInterface)
  {
    $("#"+exerciseName.name+"-weight").html(newWeight);
    $("#"+exerciseName.name+"-reps").html(newReps);
  }
}

function printWorkout(workoutNo)
{
	$("#second-level-view").html
	(
	  "<div class='tools'>" +
	  "  <img class='navi-icon suggested' id='remember' src='img/navi-icons/remember.png' onclick='rememberWorkout(" + workoutNo + ")' />" +
	  "  <img class='navi-icon' id='forget' src='img/navi-icons/forget.png' onclick='initFirstLevelView()' />" +
	  "  <img class='navi-icon' id='edit' src='img/navi-icons/edit.png' onclick='editWorkoutGoals()' />" +
	  "  <span class='sub-title'>" + string.goals + "</span>" +
	  "</div>"
	);
	switch(workoutNo)
	{
		case 1:
			printExercise(benchpress);
			printExercise(inclinepress);
			printExercise(lyingtricepsextension);
			break;
		case 2:
			printExercise(cablepulldown);
			printExercise(cableseatedrow);
			printExercise(bicepscurl);
			break;
		case 3:
			printExercise(deadlift);
			printExercise(legextension);
			printExercise(legcurl);
			break;
		case 4:
			printExercise(uprightrow);
			printExercise(shoulderpress);
			printExercise(shrugs);
			break;
		case 5:
			printExercise(bentoverrow);
			printExercise(pecdeck);
			printExercise(hammerbicepscurl);
			break;
		case 6:
			printExercise(legpress);
			printExercise(lunge);
			printExercise(powerclean);
			break;
	}
	$("#second-level-view").fadeIn("slow");
}

function rememberWorkout(workoutNo)
{
  saveWorkoutNo(workoutNo);
  initFirstLevelView();
}

function editWorkoutGoals()
{
  if (editMode == false)
  {
    editMode = true;
    $("#edit, .goal-adjuster").addClass("suggested");
    $("#remember").removeClass("suggested");
  }
  else if (editMode == true)
  {
    editMode = false;
    $("#edit, .goal-adjuster").removeClass("suggested");
    $("#remember").addClass("suggested");
  }
}
