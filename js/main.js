/* Google Analytics PhoneGap plugin creates the object window.plugins.gaPlugin */
var gaPlugin;

function onDeviceReady() 
{
  /* More info about usage of gaPlugin at github.com/phonegap-build/GAPlugin */
  gaPlugin = window.plugins.gaPlugin;
  gaPlugin.init(successHandler, errorHandler, "UA-51549024-1", 10);
}