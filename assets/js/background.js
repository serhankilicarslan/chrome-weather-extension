window.addEventListener("load", loadBackground());
var interval = 180;
var city = "istanbul"
var degree = store.get('degree');

function loadBackground() {
    startData()
    setBadgeColor()
}

function startData(){
	getData()
	setTimeout(function(){ startData(); }, interval * 1000);
}

function setBadge(degree) {
	chrome.browserAction.setBadgeText({
        'text': degree + "°"
    });
}

function getData() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://mostcrea.com/weather/api.php?city=" + city, true);
	xhr.onreadystatechange = function() {
	  if(xhr.readyState === 4 && xhr.status === 200) {
	    var resp = JSON.parse(xhr.responseText);
	    if (resp == null) return;
		setBadgeColor("black")
	    store.set('degree', resp.clouds.all.toString());
	    degree = resp.clouds.all.toString();
	    setBadge(degree);
	  }
	} 
	xhr.send();
}

function setBadgeColor(color) {
    chrome.browserAction.setBadgeBackgroundColor({
        color: "#f5821f"
    });
}

