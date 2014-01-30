/* DECLARE DATA FETCHING FUNCTIONS */
  
function exercise(exerciseName)
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

var benchpress            = new exercise("benchpress");
var inclinepress          = new exercise("inclinepress");
var lyingtricepsextension = new exercise("lyingtricepsextension");
var cablepulldown         = new exercise("cablepulldown");
var cableseatedrow        = new exercise("cableseatedrow");
var bicepscurl            = new exercise("bicepscurl");
var deadlift              = new exercise("deadlift");
var legextension          = new exercise("legextension");
var legcurl               = new exercise("legcurl");
var uprightrow            = new exercise("uprightrow");
var shoulderpress         = new exercise("shoulderpress");
var shrugs                = new exercise("shrugs");
var bentoverrow           = new exercise("bentoverrow");
var pecdeck               = new exercise("pecdeck");
var hammerbicepscurl      = new exercise("hammerbicepscurl");
var legpress              = new exercise("legpress");
var lunge                 = new exercise("lunge");
var powerclean            = new exercise("powerclean");
  
/* PRINT VIEWS */

function printMainView()
{
	$("#header").html
	(
		"<span id='placeholder'>placeholder</span> "
	);
	$("#content").html("");
	$("#content").append
	(
		"<h1>Personal Travis</h1>" +
		"<div class='workoutTile' onclick='printWorkout(1)'>d</div>" +
		"<div class='workoutTile' onclick='printWorkout(2)'>d</div>" +
		"<div class='workoutTile' onclick='printWorkout(3)'>d</div>" +
		"<div class='workoutTile' onclick='printWorkout(4)'>d</div>" +
		"<div class='workoutTile' onclick='printWorkout(5)'>d</div>" +
		"<div class='workoutTile' onclick='printWorkout(6)'>d</div>"
	);
}

function printExercise(exerciseName)
{
	$("#content").append
	(
		"<h1>"+exerciseName.name +"</h1>" +
		"<p>reps: " + exerciseName.reps + "x3</p>" +
		"<p>weight: " + exerciseName.weight + "</p>"
	);
}

function printWorkout(workoutNumber)
{
	$("#header").html
	(
		"<span id='exit' onclick='printMainView()'>exit</span> " +
		"<span id='forget'>forget</span> " +
		"<span id='edit'>edit</span> "
	);
	$("#content").html("");
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
}

$(document).ready(function()
{

  /* PROGRAM INIT */
    
  printMainView();
  
});
