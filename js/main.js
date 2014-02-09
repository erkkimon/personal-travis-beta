$(document).ready(function() 
{
	$(".live-tile").liveTile();
	checkLaunchCounter();
	initFirstLevelView();
	createExerciseObjects();
	fromDatabaseToObjects();
});