var gaPlugin;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    alert("calling ga");
    gaPlugin = window.plugins.gaPlugin;
    alert("calling init")
    gaPlugin.init(successHandler, errorHandler, "UA-51549024-1", 1);
    gaPlugin.trackPage( nativePluginResultHandler, nativePluginErrorHandler, "index.html");
    gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Button", "Click", "event only", 1);
    gaPlugin.exit(nativePluginResultHandler, nativePluginErrorHandler);
}

function successHandler()
{
    alert("init success");
}

function errorHandler()
{
    alert("init failed");
}

function nativePluginResultHandler()
{
    alert("tracking success");
}

function nativePluginErrorHandler()
{
    alert("tracking failed");
}