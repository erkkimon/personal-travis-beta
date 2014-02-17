///////////////
// VARIABLES //
///////////////

var editMode = false;
var db = new ydn.db.Storage('personal-travis-db');

var interval = 
{
  benchpress: 5,
  inclinepress: 10,
  lyingtricepsextension: 2.5,
  cablepulldown: 5,
  cableseatedrow: 5,
  bicepscurl: 1,
  deadlift: 5,
  legextension: 5,
  legcurl: 5,
  uprightrow: 5,
  shoulderpress: 5,
  shrugs: 2.5,
  bentoverrow: 2.5,
  pecdeck: 5,
  hammerbicepscurl: 1,
  legpress: 10,
  lunge: 10,
  powerclean: 5
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

var exercises =
[
  benchpress,             // penkkipunnerrus
  inclinepress,           // vinopenkkipunnerrus
  lyingtricepsextension,  // ranskalainen punnerrus
  cablepulldown,          // ylätalja
  cableseatedrow,         // alatalja
  bicepscurl,             // hauiskääntö
  deadlift,               // maastaveto
  legextension,           // jalanojennus
  legcurl,                // jalankoukistus
  uprightrow,             // pystysoutu
  shoulderpress,          // pystypunnerrus
  shrugs,                 // olankohautus
  bentoverrow,            // kulmasoutu
  pecdeck,                // rintarutistus
  hammerbicepscurl,       // vasarakääntö
  legpress,               // jalkaprässi
  lunge,                  // askelkyykky
  powerclean              // rinnalleveto
]

/////////////
// OBJECTS //
/////////////

function exerciseObject(exerciseName)
{
	this.name = exerciseName;
	this.reps = 0;
	this.weight = 0;
	this.reached = false;
	this.adjusted = false;
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
	function updateReached(reached)
	{
		this.reached = reached;
	}
	
	this.updateAdjusted = updateAdjusted;
	function updateAdjusted(adjusted)
	{
	  this.adjusted = adjusted;
	}
}

///////////////
// FUNCTIONS //
///////////////

function checkLaunchCounter()
{
	launchCounter = localStorage.getItem("launchCounter");
	if (launchCounter === null) 
	{
		localStorage.setItem("launchCounter", 1);
		console.log("The first launch");
		writeDefaultData();
	}
	else
	{
		localStorage.setItem("launchCounter", parseInt(launchCounter) + 1);
		console.log("The launch number " + launchCounter);
	}
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

function fromDatabaseToObjects()
{
  db.onReady(function(e) 
  {
    if (e) 
    {
      if (e.target.error) 
      {
        console.log('Error due to: ' + e.target.error.name + ' ' + e.target.error.message);
      }
      throw e;
    }
    readExerciseFromDB(benchpress);
    readExerciseFromDB(inclinepress);
    readExerciseFromDB(lyingtricepsextension);
    readExerciseFromDB(cablepulldown);
    readExerciseFromDB(cableseatedrow);
    readExerciseFromDB(bicepscurl);
    readExerciseFromDB(deadlift);
    readExerciseFromDB(legextension);
    readExerciseFromDB(legcurl);
    readExerciseFromDB(uprightrow);
    readExerciseFromDB(shoulderpress);
    readExerciseFromDB(shrugs);
    readExerciseFromDB(bentoverrow);
    readExerciseFromDB(pecdeck);
    readExerciseFromDB(hammerbicepscurl);
    readExerciseFromDB(legpress);
    readExerciseFromDB(lunge);
    readExerciseFromDB(powerclean);
  });
}

function getWeight(exercise)
{
	db.from(exercise).list().done(function(records) 
	{
		console.log(records[(records.length - 1)].weight);
	});
}

function goalMinus(exerciseName)
{
  var newGoal =
  {
    reps: 100,
    weight: 100
  }
  if (parseInt(exerciseName.reps) == 6)
  {
    newGoal.reps = 12;
    newGoal.weight = exerciseName.weight - exerciseName.interval;
  }
  else if (exerciseName.weight <= 0)
  {
    newGoal.weight = 0;
    newGoal.reps = exerciseName.reps;
  }
  else
  {
    newGoal.reps = exerciseName.reps - 2;
    newGoal.weight = exerciseName.weight;
  }
  exerciseName.updateReps(newGoal.reps);
  exerciseName.updateWeight(newGoal.weight);
  return newGoal;
}

function goalPlus(exerciseName)
{
  var newGoal =
  {
    reps: 100,
    weight: 100
  }
  if (parseInt(exerciseName.reps) == 12)
  {
    newGoal.reps = 6;
    newGoal.weight = exerciseName.weight + exerciseName.interval;
  }
  else
  {
    newGoal.reps = exerciseName.reps + 2;
    newGoal.weight = exerciseName.weight;
  }
  exerciseName.updateReps(newGoal.reps);
  exerciseName.updateWeight(newGoal.weight);
  return newGoal;
}

function goalToUI(exerciseName, newGoal)
{
  $("#"+exerciseName+"-weight").html(parseFloat(newGoal.weight));
  $("#"+exerciseName+"-reps").html(parseInt(newGoal.reps));
}

function initFirstLevelView()
{
  $("#second-level-view").fadeOut("slow");
  for (var i in exercises) 
  {
    exercises[i].updateReached(false);
    exercises[i].updateAdjusted(false);
  }
  suggestNextWorkout();
  //setTimeout(function() { fromDatabaseToObjects(); console.log("Data read from database to objects"); }, 500);
  fromDatabaseToObjects(); 
  console.log("Data read from database to objects");
}

function printBulkEditMode()
{
  $("#bulk-edit-mode-container").append
  (
    "<div style='width: 100%; padding: 0px; margin: 0px;'>" +
    "  <div style='width: 30%; display: inline-block;'>" + exercises[i].name + "</div>" +
    "  <div style='width: 30%; display: inline-block;'>" +
    "    <select id='" + weightTarget + "' style='width: 10em;'></select>" +
    "    <select id='" + repsTarget + "' style='width: 10em;'>" +
    "      <option value='" + repsTarget + "-3x6'" + (tempReps > 6 ? "selected" : "") + ">3 x 6 reps</option>" +
    "      <option value='" + repsTarget + "-3x8'" + (tempReps > 8 ? "selected" : "") + ">3 x 8 reps</option>" +
    "      <option value='" + repsTarget + "-3x10'" + (tempReps > 10 ? "selected" : "") + ">3 x 10 reps</option>" +
    "      <option value='" + repsTarget + "-3x12'" + (tempReps > 12 ? "selected" : "") + ">3 x 12 reps</option>" +
    "    </select>" +
    "  </div>" +
    "</div>"
  );
// 	fromDatabaseToObjects();
// 	$("#second-level-view").html
// 	(
// 	  "<div class='tools'>" +
// 	  "  <img class='navi-icon suggested' id='remember' src='img/navi-icons/remember.png' onclick='saveRecords(); initFirstLevelView();' />" +
// 	  "  <img class='navi-icon' id='forget' src='img/navi-icons/forget.png' onclick='initFirstLevelView()' />" +
// 	  "  <span class='sub-title'>" + string.editMode + "</span>" +
// 	  "</div>" +
// 	  "<p class='app-title'>" + string.personalTravis + "</p>" +
// 	  "<div style='padding: 0.5em 0px 0.5em 0px; margin: 0.5em 2% 0% 2%; font-size: 22px;' id='bulk-edit-mode-container'></div>"
// 	);
// 	for (var i in exercises) 
//   {
//   	var weightTarget = exercises[i].name + "-select-weight";
//   	var repsTarget = exercises[i].name + "-select-reps";
//   	var interval = exercises[i].interval;
//   	var tempReps = exercises[i].reps;
//   	var tempWeight = exercises[i].weight;
//   	$("#bulk-edit-mode-container").append
// 	  (
//       "<div style='width: 100%; padding: 0px; margin: 0px;'>" +
//       "  <div style='width: 30%; display: inline-block;'>" + exercises[i].name + "</div>" +
//       "  <div style='width: 30%; display: inline-block;'>" +
//       "    <select id='" + weightTarget + "' style='width: 10em;'></select>" +
//       "    <select id='" + repsTarget + "' style='width: 10em;'>" +
//       "      <option value='" + repsTarget + "-3x6'" + (tempReps > 6 ? "selected" : "") + ">3 x 6 reps</option>" +
//       "      <option value='" + repsTarget + "-3x8'" + (tempReps > 8 ? "selected" : "") + ">3 x 8 reps</option>" +
//       "      <option value='" + repsTarget + "-3x10'" + (tempReps > 10 ? "selected" : "") + ">3 x 10 reps</option>" +
//       "      <option value='" + repsTarget + "-3x12'" + (tempReps > 12 ? "selected" : "") + ">3 x 12 reps</option>" +
//       "    </select>" +
//       "  </div>" +
//       "</div>"
// 	  );
// 	  console.log(tempReps);
// 	  for(var i=0; i<30; i++)
// 	  {
// 	    var tempInterval = (i + 1) * interval;
// 	    var inheritedTempReps = tempReps;
// 	    $("#" + weightTarget).append
// 	    (
// 	      "<option value='" + tempInterval + "'>" + tempInterval + " kg</option>"
// 	    );
// 	  }
// 	}
// 	$('select').uniform();
// 	$("#second-level-view").fadeIn("slow");
	
}

function printExercise(exerciseName)
{
	$("#second-level-view").append
	(
		"<div style='margin: 0% 2% 0% 2%'>" +
		"  <div style='width: 50%; display: inline-block; font-size: 25px; margin: 5px 0px 5px 0px; '>" + string[exerciseName.name] + "</div>" +
		"  <div style='width: 45%; display: inline-block; text-align: right; padding-right: 3%;'>" +
		"    <img class='goal-adjuster' src='img/navi-icons/plus.png' id='goal-plus-" + exerciseName.name + "'>" +
		"    <img class='goal-adjuster' src='img/navi-icons/minus.png' id='goal-minus-" + exerciseName.name + "'>" +
		"  </div>" +
		"</div>" +
		"<div style='margin-bottom: 20px; border: 1px solid #FFF; border-bottom: 0px; border-right: 0px; padding-left: 15px; margin: 0.5em 2% 0% 2%'>" +
		"  <div style='display: inline-block; width: 40%; margin: 0px; padding: 0px;'>" +
		"    <p>" + string.weight + ":</p>" +
		"    <p>" + string.reps + ":</p>" +
		"    <p>" + string.reached + ":</p>" +
		"  </div>" +
		"  <div style='display: inline-block; width: 30%; margin: 0px;'>" +
		"    <p><span id='" + exerciseName.name + "-weight'>" + exerciseName.weight + "</span> kg</p>" +
		"    <p><span id='" + exerciseName.name + "-reps'>" + exerciseName.reps + "</span> x 3</p>" +
		"    <p><input type='checkbox' onclick='toggleReached(" + exerciseName.name + ")'></p>" +
		"  </div>" +
		"</div>"
	);
	$("#goal-plus-" + exerciseName.name).attr("onclick", "goalToUI(\'" + exerciseName.name + "\', goalPlus(" + exerciseName.name + ")); " + exerciseName.name + ".updateAdjusted(true);");
	$("#goal-minus-" + exerciseName.name).attr("onclick", "goalToUI(\'" + exerciseName.name + "\', goalMinus(" + exerciseName.name + ")); " + exerciseName.name + ".updateAdjusted(true);");
}

function printWorkout(workoutNo)
{
	fromDatabaseToObjects();
	$("#second-level-view").html
	(
	  "<div class='tools'>" +
	  "  <img class='navi-icon suggested' id='remember' src='img/navi-icons/remember.png' onclick='rememberWorkout("+ workoutNo +")' />" +
	  "  <img class='navi-icon' id='forget' src='img/navi-icons/forget.png' onclick='initFirstLevelView()' />" +
	  "  <img class='navi-icon' id='edit' src='img/navi-icons/edit.png' onclick='editWorkoutGoals()' />" +
	  "  <span class='sub-title'>" + string.goals + "</span>" +
	  "</div>" +
	  "<p class='app-title'>" + string.personalTravis + "</p>"
	);
	switch(workoutNo)
	{
		case 1:
		  goalPlus(benchpress);
		  goalPlus(inclinepress);
		  goalPlus(lyingtricepsextension);
			printExercise(benchpress);
			printExercise(inclinepress);
			printExercise(lyingtricepsextension);
			break;
		case 2:
		  goalPlus(cablepulldown);
		  goalPlus(cableseatedrow);
		  goalPlus(bicepscurl);
			printExercise(cablepulldown);
			printExercise(cableseatedrow);
			printExercise(bicepscurl);
			break;
		case 3:
		  goalPlus(deadlift);
		  goalPlus(legextension);
		  goalPlus(legcurl);
			printExercise(deadlift);
			printExercise(legextension);
			printExercise(legcurl);
			break;
		case 4:
		  goalPlus(uprightrow);
		  goalPlus(shoulderpress);
		  goalPlus(shrugs);
			printExercise(uprightrow);
			printExercise(shoulderpress);
			printExercise(shrugs);
			break;
		case 5:
		  goalPlus(bentoverrow);
		  goalPlus(pecdeck);
		  goalPlus(hammerbicepscurl);
			printExercise(bentoverrow);
			printExercise(pecdeck);
			printExercise(hammerbicepscurl);
			break;
		case 6:
		  goalPlus(legpress);
		  goalPlus(lunge);
		  goalPlus(powerclean);
			printExercise(legpress);
			printExercise(lunge);
			printExercise(powerclean);
			break;
	}
	$("#second-level-view").fadeIn("slow");
	$('input').uniform();
}

function readExerciseFromDB(exerciseName)
{
	db.from(exerciseName.name).list().done(function(records) 
	{
		exerciseName.updateReps(records[(records.length - 1)].reps);
		exerciseName.updateWeight(records[(records.length - 1)].weight);
	});
}

function rememberWorkout(exerciseNo)
{
  localStorage.setItem("lastWorkout", parseFloat(exerciseNo));
  saveRecords();
  initFirstLevelView();
}

function saveRecords()
{
  for (var i in exercises) 
  {
    if (exercises[i].adjusted == true)
    {
      goalMinus(exercises[i]);
      console.log("turkanen");
    }
    if (exercises[i].reached == true)
    {
      goalPlus(exercises[i]);
      writeRecord(exercises[i].name, parseFloat(exercises[i].weight), parseFloat(exercises[i].reps), false);
    }
    else
    {
			writeRecord(exercises[i].name, parseFloat(exercises[i].weight), parseFloat(exercises[i].reps), true);
    }
  }
}

function suggestNextWorkout()
{
  var thisWorkout;
  var lastWorkout = localStorage.getItem("lastWorkout");
  if (lastWorkout === null)
  {
    localStorage.setItem("lastWorkout", 6);
    lastWorkout = 6;
  }
  thisWorkout = parseFloat(lastWorkout) + 1;
  if (thisWorkout == 7) { thisWorkout = 1; }
  $(".live-tile > div").removeClass("suggested");
  $("#tile-" + thisWorkout + " > div").addClass("suggested");
}

function toggleReached(exerciseName)
{
  if (exerciseName.reached == false)
  {
    exerciseName.updateReached(true);
    console.log(exerciseName.reached);
  }
  else
  {
    exerciseName.updateReached(false);
    console.log(exerciseName.reached);
  }
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

function writeRecord(exerciseName, weight, reps, exclude)
{
  var d = new Date();
  var currDay = ('0'+(d.getDate())).slice(-2);
  var currMonth = ('0'+(d.getMonth()+1)).slice(-2);
  var currYear = d.getFullYear();
  var now = currYear +"-"+ currMonth +"-"+ currDay;
	db.put(exerciseName, {weight: weight, reps: reps, exclude: exclude}, now);
}

///////////////////
// MAIN ACTIVITY //
///////////////////

$(document).ready(function() 
{
	fromDatabaseToObjects();
	printBulkEditMode();
});

