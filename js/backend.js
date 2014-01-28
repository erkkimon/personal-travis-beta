$(document).ready(function()
{
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
  
  function printExercise(exerciseName)
  {
    $("#workoutContainer").append
    (
    	"<h1>"+exerciseName.name +"</h1>" +
    	"<p>reps: " + exerciseName.reps + "x3</p>" +
    	"<p>weight: " + exerciseName.weight + "</p>"
    );
  }
  
  function printWorkout(workoutNumber)
  {
    $("#workoutContainer").html("");
    if(workoutNumber == 1)
    {
    	printExercise(benchpress);
    	printExercise(inclinepress);
    	printExercise(lyingtricepsextension);
    }
  }
  
  $("#click").click(function()
  {
    printWorkout(1);
  });
});
