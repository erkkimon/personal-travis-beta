// Language detection code is based on Michael Herger's solution. Check
// details: https://groups.google.com/forum/#!topic/phonegap/EkCyEBO8Dj4
// PhoneGap on Android would always return EN in navigator.*language, so
// let's parse userAgent instead.

var lang;

if (navigator && navigator.userAgent && (lang = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) 
{
	lang = lang[1];
}

if (!lang && navigator) 
{
	if (navigator.language) 
	{
		lang = navigator.language;
	} 
	else if (navigator.browserLanguage) 
	{
		lang = navigator.browserLanguage;
	} 
	else if (navigator.systemLanguage) 
	{
		lang = navigator.systemLanguage;
	} 
	else if (navigator.userLanguage) 
	{
		lang = navigator.userLanguage;
	}
	lang = lang.substr(0, 2);
}

//lang = "fi";
var string;

if (lang == "fi") /* FINNISH */
{
  string =
  {
		/* training 1 */
		benchpress: "penkki&shy;punnerrus",
		inclinepress: "vino&shy;penkki&shy;punnerrus",
		lyingtricepsextension: "ranskalainen punnerrus",

		/* training 2 */
		cablepulldown: "ylätalja",
		cableseatedrow: "alatalja",
		bicepscurl: "hauiskääntö",

		/* training 3 */
		deadlift: "maastaveto",
		legextension: "jalanojennus",
		legcurl: "jalan&shy;koukistus",

		/* training 4 */
		uprightrow: "pystysoutu",
		shoulderpress: "pysty&shy;punnerrus",
		shrugs: "olankohautus",

		/* training 5 */
		bentoverrow: "kulmasoutu",
		pecdeck: "rintarutistus",
		hammerbicepscurl: "vasarakääntö",

		/* training 6 */
		legpress: "jalkaprässi",
		lunge: "askelkyykky",
		powerclean: "rinnalleveto",

		/* general UI-related strings */
		personalTravis: "personal raineri",
		nextWorkout: "seuraava treeni",
		goals: "haasteet",
		reps: "toistot",
		weight: "paino",
		reached: "saavutettu",
		currentLevel: "nykytaso",
		currentLevelInstructions: "Palaa muokkaamaan painamalla <img src='img/navi-icons/edit.png' class='navi-icon' /> päänäkymässä.",
		welcome: "Mukavaa, että päätit aloittaa yhteistyön Personal Rainerin kanssa! Aloitetaan määrittämällä sinulle sopivat painot. Jos et tiedä tasoasi, voit tallentaa oletuspainot ja säätää ne kohdalleen myöhemmin, jos ne tuntuvat liian kevyiltä tai painavilta.",
		wait: "Odota hetki..."
	}
}
else /* ENGLISH */
{
  string =
  {
		/* training 1 */
		benchpress: "benchpress",
		inclinepress: "incline press",
		lyingtricepsextension: "lying triceps extension",

		/* training 2 */
		cablepulldown: "cable pulldown",
		cableseatedrow: "cable seated row",
		bicepscurl: "biceps curl",

		/* training 3 */
		deadlift: "deadlift",
		legextension: "leg extension",
		legcurl: "leg curl",

		/* training 4 */
		uprightrow: "upright row",
		shoulderpress: "shoulder press",
		shrugs: "shrugs",

		/* training 5 */
		bentoverrow: "bent-over row",
		pecdeck: "pec deck",
		hammerbicepscurl: "hammer biceps curl",

		/* training 6 */
		legpress: "leg press",
		lunge: "lunge",
		powerclean: "power clean",

		/* general UI-related strings */
		personalTravis: "personal travis",
		nextWorkout: "next workout",
		goals: "goals",
		reps: "reps",
		weight: "weight",
		reached: "reached",
		currentLevel: "current level",
		currentLevelInstructions: "Press <img src='img/navi-icons/edit.png' class='navi-icon' /> in main view to come back.",
		welcome: "It's wonderful that you decided to make friends with Personal Travis. Let's start by finding out, what is your level right now. If you are unsure, you can save the default values and get back later.",
		wait: "Wait, please..."
	}
}
