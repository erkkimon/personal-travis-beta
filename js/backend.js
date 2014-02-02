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

function goalPlus()
{
  $("#benchpressReps").html("jee");
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
  $("#secondLevelView").fadeOut();
}

function printExercise(exerciseName)
{
	$("#secondLevelView").append
	(
		"<h1>"+exerciseName.name +"</h1>" +
		"<span onclick='goalPlus()'>plus</span> <span>minus</span><br />" +
		"<p id='" + exerciseName.name + "Reps'>reps: " + exerciseName.reps + "x3</p>" +
		"<p>weight: " + exerciseName.weight + "</p>"
	);
}

function printWorkout(workoutNumber)
{
	$("#secondLevelView").html("");
	$("#secondLevelView").html
	(
	  "<span onclick='initFirstLevelView()'>exit</span>"
	);
	switch(workoutNumber)
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
	$("#secondLevelView").fadeIn("fast");
}

$(document).ready(function()
{

  /* PROGRAM INIT */
    
  initFirstLevelView();
  
});
