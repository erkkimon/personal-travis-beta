/* VARIABLES */

var editMode = false;

function openTheDatabase()
{
  html5sql.openDatabase("personalraineri", "Personal Raineri data", 3*1024*1024);
}

function createTables()
{
  html5sql.process
  (
    [
      /* latest training table */
      "CREATE TABLE IF NOT EXISTS app_data (id INTEGER PRIMARY KEY AUTOINCREMENT, latest_training INTEGER, first_launch BOOLEAN DEFAULT 1);",
      /* pena + vinopena + ranskis */
      "CREATE TABLE IF NOT EXISTS benchpress (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      "CREATE TABLE IF NOT EXISTS inclinepress (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      "CREATE TABLE IF NOT EXISTS lyingtricepsextension (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      /* ylätalja + alatalja + hauiskääntö */
      "CREATE TABLE IF NOT EXISTS cablepulldown (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      "CREATE TABLE IF NOT EXISTS cableseatedrow (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      "CREATE TABLE IF NOT EXISTS bicepscurl (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      /* maastoveto + jalanojennus + jalankoukistus */
      "CREATE TABLE IF NOT EXISTS deadlift (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      "CREATE TABLE IF NOT EXISTS legextension (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      "CREATE TABLE IF NOT EXISTS legcurl (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      /* pystysoutu + pystypunnerrus + olankohautus */
      "CREATE TABLE IF NOT EXISTS uprightrow (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      "CREATE TABLE IF NOT EXISTS shoulderpress (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      "CREATE TABLE IF NOT EXISTS shrugs (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      /* kulmasoutu + rintarutistus + vasarakääntö */
      "CREATE TABLE IF NOT EXISTS bentoverrow (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      "CREATE TABLE IF NOT EXISTS pecdeck (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      "CREATE TABLE IF NOT EXISTS hammerbicepscurl (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      /* jalkaprässi + askelkyykky + rive */
      "CREATE TABLE IF NOT EXISTS legpress (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      "CREATE TABLE IF NOT EXISTS lunge (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
      "CREATE TABLE IF NOT EXISTS powerclean (date DATETIME PRIMARY KEY, reps INTEGER, weight INTEGER, exclude BOOLEAN DEFAULT 0);",
    ],
    function()
    {
      console.log("Created the tables of personalraineri DB.");
    },
    function(error, statement)
    {
      console.log(error.message+" Occured while processing: "+statement);
    }
  );
}

function writeDefaultsToTables()
{
  var d = new Date();
  var currDay = ('0'+(d.getDate())).slice(-2);
  var currMonth = ('0'+(d.getMonth()+1)).slice(-2);
  var currYear = d.getFullYear();
  var now = currYear +"-"+ currMonth +"-"+ currDay;
  html5sql.process
  (
    [
      "INSERT INTO app_data (latest_training, first_launch) VALUES (6, 0);",
      "INSERT INTO benchpress (date, reps, weight) VALUES ('"+now+"', 6, 25);",
      "INSERT INTO inclinepress (date, reps, weight) VALUES ('"+now+"', 6, 20);",
      "INSERT INTO lyingtricepsextension (date, reps, weight) VALUES ('"+now+"', 6, 10);",
      "INSERT INTO cablepulldown (date, reps, weight) VALUES ('"+now+"', 6, 10);",
      "INSERT INTO cableseatedrow (date, reps, weight) VALUES ('"+now+"', 6, 20);",
      "INSERT INTO bicepscurl (date, reps, weight) VALUES ('"+now+"', 6, 4);",
      "INSERT INTO deadlift (date, reps, weight) VALUES ('"+now+"', 6, 20);",
      "INSERT INTO legextension (date, reps, weight) VALUES ('"+now+"', 6, 15);",
      "INSERT INTO legcurl (date, reps, weight) VALUES ('"+now+"', 6, 10);",
      "INSERT INTO uprightrow (date, reps, weight) VALUES ('"+now+"', 6, 15);",
      "INSERT INTO shoulderpress (date, reps, weight) VALUES ('"+now+"', 6, 20);",
      "INSERT INTO shrugs (date, reps, weight) VALUES ('"+now+"', 6, 5);",
      "INSERT INTO bentoverrow (date, reps, weight) VALUES ('"+now+"', 6, 5);",
      "INSERT INTO pecdeck (date, reps, weight) VALUES ('"+now+"', 6, 10);",
      "INSERT INTO hammerbicepscurl (date, reps, weight) VALUES ('"+now+"', 6, 4);",
      "INSERT INTO legpress (date, reps, weight) VALUES ('"+now+"', 6, 30);",
      "INSERT INTO lunge (date, reps, weight) VALUES ('"+now+"', 6, 20);",
      "INSERT INTO powerclean (date, reps, weight) VALUES ('"+now+"', 6, 20);",
    ],
    function()
    {
      console.log("Wrote the default data to the tables");
    },
    function(error, statement)
    {
      console.log(error.message+" Occured while processing: "+statement);
    }
  );
}

function readTableToConsole(exercise)
{
  html5sql.process
  (
    [
      "SELECT * FROM "+exercise+";",
    ],
    function(transaction, results, rowsArray)
    {
      for(var i = 0; i < rowsArray.length; i++)
      {
        console.log(rowsArray[i].date+" "+rowsArray[i].reps+"x"+rowsArray[i].weight);
      }
      console.log("Done selecting data");
    },
    function(error, statement)
    {
      console.log(error.message+" Occured while processing: "+statement);
    }
  );
}

function suggestNextWorkout()
{
  html5sql.process
  (
    [
      "SELECT * FROM app_data;",
    ],
    function(transaction, results, rowsArray)
    {
      var result = rowsArray[0].latest_training;
      console.log("Latest training no: "+result);
      var nextTrainingNo;
      if (result < 6) { nextTrainingNo = result + 1 } else { nextTrainingNo = 1 }
      $(".live-tile > div").removeClass("suggested");
      $("#tile-"+nextTrainingNo+" > div").addClass("suggested");
    },
    function(error, statement)
    {
      console.log(error.message+" Occured while processing: "+statement);
    }
  );
}

function dropTables()
{
  html5sql.process
  (
    [
      "DROP TABLE IF EXISTS app_data;",
      "DROP TABLE IF EXISTS benchpress;",
      "DROP TABLE IF EXISTS inclinepress;",
      "DROP TABLE IF EXISTS lyingtricepsextension;",
      "DROP TABLE IF EXISTS cablepulldown;",
      "DROP TABLE IF EXISTS cableseatedrow;",
      "DROP TABLE IF EXISTS bicepscurl;",
      "DROP TABLE IF EXISTS deadlift;",
      "DROP TABLE IF EXISTS legextension;",
      "DROP TABLE IF EXISTS legcurl;",
      "DROP TABLE IF EXISTS uprightrow;",
      "DROP TABLE IF EXISTS shoulderpress;",
      "DROP TABLE IF EXISTS shrugs;",
      "DROP TABLE IF EXISTS bentoverrow;",
      "DROP TABLE IF EXISTS pecdeck;",
      "DROP TABLE IF EXISTS hammerbicepscurl;",
      "DROP TABLE IF EXISTS legpress;",
      "DROP TABLE IF EXISTS lunge;",
      "DROP TABLE IF EXISTS powerclean;",
    ],
    function()
    {
      console.log("Dropped all tables in personalraineri DB.");
    },
    function(error, statement)
    {
      console.log(error.message+" Occured while processing: "+statement);
    }
  );
}

function saveWorkoutNo(workoutNo)
{
  html5sql.process
  (
    [
      "UPDATE app_data SET latest_training = "+workoutNo+";",
    ],
    function()
    {
      console.log("Wrote the training number to latest_training in app_data table.");
    },
    function(error, statement)
    {
      console.log(error.message+" Occured while processing: "+statement);
    }
  );
}

//function setGoal(moveNumber, moveName, interval)
//{
//  html5sql.process
//  (
//    [
//      "SELECT * FROM "+moveName+" WHERE date = (SELECT MAX(date) FROM "+moveName+");",
//    ],
//    function(transaction, results, rowsArray)
//    {
//      var weight = rowsArray[0].weight;
//      var reps = rowsArray[0].reps;
//      if(rowsArray[0].exclude == 0) 
//      {
//        if (reps == 12)
//        {
//          reps = 6;
//          weight = weight + interval;
//          $("#"+moveNumber).find("#"+moveName+"_reps_goal").html("3 x 6");
//          $("#"+moveNumber).find("#"+moveName+"_weight_goal").html(weight+" kg");
//        }
//        else
//        {
//          reps = reps + 2;
//          $("#"+moveNumber).find("#"+moveName+"_reps_goal").html("3 x "+reps);
//          $("#"+moveNumber).find("#"+moveName+"_weight_goal").html(weight+" kg");
//        }      
//      }
//      else
//      {
//        $("#"+moveNumber).find("#"+moveName+"_reps_goal").html("3 x "+reps);
//        $("#"+moveNumber).find("#"+moveName+"_weight_goal").html(weight+" kg");
//      }
//      //if(rowsArray[0].exclude == 0) { alert("goalsPlus triggered"); goalsPlus(moveNumber, moveName, interval); }
//    },
//    function(error, statement)
//    {
//      console.log(error.message+" Occured while processing: "+statement);
//    }
//  );
//}

function writeNewRecord(exerciseName, reps, weight, exclude)
{
  if(!exclude) {exclude=0}
  html5sql.process
  (
    [
      "REPLACE INTO "+exerciseName+" (date, reps, weight, exclude) VALUES (strftime('%Y-%m-%d', 'now'), "+reps+", "+weight+", "+exclude+");",
    ],
    function()
    {
      console.log("Wrote new goal to "+moveName+" table.");
    },
    function(error, statement)
    {
      console.log(error.message+" Occured while processing: "+statement);
    }
  );
}

