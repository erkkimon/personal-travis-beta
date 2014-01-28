$(document).ready(function()
{
  function exercise(exerciseName)
  {
    this.reps = 12+100;
    this.weight = 10;
    
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
  }
  
  var benchpress = new exercise("benchpress");
  
  function printExercise(exerciseName)
  {
    $("#"+exerciseName+"Container").html("asdf");
  }
  
  var qwer="\
  <p>ekarivi"+benchpress.reps+"</p>\
  <p>	tokarivi</p>\
  ";
  
  function printWorkout(workoutNumber)
  {
    $("#workoutContainer"+workoutNumber).html(qwer);
  }
  
  $("#click").click(function()
  {
    printWorkout(1);
  });
});
