/* DECLARE DATA FETCHING FUNCTIONS */
  
function exerciseObject(exerciseName)
{
	this.name = exerciseName;
	this.reps = 12;
	this.weight = 10;
	this.reached = false;
	this.interval = 5;
	
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

/* CREATE INSTANCES */

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
  
/* PRINT VIEWS */

function initFirstLevelView()
{
  $("#second-level-view").fadeOut();
  suggestNextWorkout();
}

function printExercise(exerciseName)
{
	$("#second-level-view").append
	(
		"<div style=''>" +
		"  <div style='width: 50%; display: inline-block; font-size: 25px; margin: 5px 0px 5px 0px; '>" + exerciseName.name + "</div>" +
		"  <div style='width: 45%; display: inline-block; text-align: right; padding-right: 3%;'>" +
		"    <img class='goal-adjuster' src='img/navi-icons/plus.png' onclick='goalPlus(" + exerciseName.name + ")'>" +
		"    <img class='goal-adjuster' src='img/navi-icons/minus.png' onclick='goalMinus(" + exerciseName.name + ")'>" +
		"  </div>" +
		"</div>" +
		"<div style='margin-bottom: 20px; border: 1px solid #FFF; border-bottom: 0px; border-right: 0px; padding-left: 15px;'>" +
		"  <div style='display: inline-block; width: 40%; margin: 0px; padding: 0px;'>" +
		"    <p>weight:</p>" +
		"    <p>reps:</p>" +
		"    <p>reached:</p>" +
		"  </div>" +
		"  <div style='display: inline-block; width: 30%; margin: 0px;'>" +
		"    <p><span id='" + exerciseName.name + "-weight'>" + exerciseName.weight + "</span> kg</p>" +
		"    <p><span id='" + exerciseName.name + "-reps'>" + exerciseName.reps + "</span> x 3</p>" +
		"    <p><input type='checkbox'></p>" +
		"  </div>" +
		"</div>"
	);
}

/****************/
/* YOU ARE HERE */
/****************/

function goalPlus(exerciseName)
{
  alert(exerciseName.name);
  alert(exerciseName.reps);
}

function printWorkout(workoutNo)
{
	$("#second-level-view").html
	(
	  "<div class='tools'>" +
	  "  <img class='navi-icon suggested' id='remember' src='img/navi-icons/remember.png' onclick='rememberWorkout(" + workoutNo + ")' />" +
	  "  <img class='navi-icon' id='forget' src='img/navi-icons/forget.png' onclick='initFirstLevelView()' />" +
	  "  <img class='navi-icon' id='edit' src='img/navi-icons/edit.png' onclick='editWorkoutGoals()' />" +
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

$(document).ready(function()
{   
  initFirstLevelView(); 
});
