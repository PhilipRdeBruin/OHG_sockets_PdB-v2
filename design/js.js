var nEn = false;
function exec(){
    // if(location.hash == "#1"){
    //     nEn = true;
    //     notification();
    // }
}

function notify(){
    if(nEn){
        nEn = false;
        notification("0px");
    } else {
        nEn = true;
        notification("9vh");
    }
}

function notification(en) {    
    if(en != "0px"){
        var opacity = "1";
        var transform = "rotate(-360deg)"
    } else {
        var opacity = "0";
        var transform = "rotate(-20deg)"
    }
    var notifications = document.getElementsByClassName("notification");
    for(i=0;i<notifications.length;i++){
        notifications[i].style.opacity = opacity;
    }
    document.getElementById("notifications").style.height = en;
    document.querySelector('h3').style.transform = transform;
    en = `calc(100vh - (9vh + 20px) - ${en})`
    console.log(en)
    document.getElementById("main").style.height = en
}

function resSite() {
	// variables
    var containerW = document.getElementById('games').offsetWidth;
    containerW = containerW - (window.innerWidth/100*2);
    console.log(containerW);
    var countSites = Math.floor(containerW / 250);
    console.log(countSites);
    var divWidth = (containerW / countSites) - (window.innerWidth/100*2);
    console.log(divWidth);
	var divHeight = (divWidth / 4) * 4;
	//Resize siteBlok
	var siteBlok = document.getElementsByClassName("game");
	for (i = 0; i < siteBlok.length; i++) {
		siteBlok[i].style.width = divWidth + "px";
		siteBlok[i].style.height = divHeight + "px";
	}
	//Resize titleBlok
	var titleBlok = document.getElementsByClassName("titleBlok");
	for (i = 0; i < titleBlok.length; i++) {
		titleBlok[i].style.height = (divHeight / 4) + "px";
		titleBlok[i].style.width = divWidth + "px";
	}
	//Resize imgBlok
	var imgBlok = document.getElementsByClassName("imgBlok");
	for (i = 0; i < imgBlok.length; i++) {
		imgBlok[i].height = divHeight;
		imgBlok[i].width = divWidth;
	}
}

