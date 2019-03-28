
//	JQuery-functies 

$("document").ready(function() {
	var i0;

	beurt = 0;
	// speltype = "auto"; /* auto, handmatig */
	speltype = "handmatig"; /* auto, handmatig */

	for(j=1; j<=6; j++) {
		xgis[j] = 0;
		ygis[j] = 0;
	}
	
	if (speltype == "auto") {
		genereercode ();
		beurt = 1;
		i0 = 2;
		}
	else {
		i0 = 1;
	}

	for (i=i0; i<=10; i++) {
		$("#knop" + i).css("visibility", "hidden");
	}

	// if (speltype == "handmatig") {
	// 	dum = 1;
	// 	$("#cover").css("visibility", "hidden"); }
	// else {
	// 	$("#knop0").css("visibility", "hidden");
	// }

	$("#nwspelknop").css("visibility", "hidden");
});

$(function() {
	$("#covertgl").click(function() {
		viscover = document.getElementById("cover").style.visibility;
		// if (dum == 1) {
		if (viscover == "hidden") {
			dum = 0;
			$("#cover").css("visibility", "visible"); }
		else {
			dum = 1;
			var antw = confirm ("Weet u zeker dat u de code wil onthullen?\n\n(Daarmee beëindigt u het spel en verliest u.)");
			if (antw == true) {
				$("#cover").css("visibility", "hidden");
				vulrijenSpeelbord(npos, beurt, statusArr2, ygsi);
//				$("#knop" + beurt).css("visibility", "hidden");
//				$("#nwspelknop").css("visibility", "visible");
				console.log("Tsjonge, jonge: in functie($covertgl.click)...");
				l = statusArr2.length - 1;
				statusArr2[l][0] = 9;
				eindespel (beurt, 0);
				makeMove(statusArr2);
			}
			else {
				dum = 0;
			}
		}
	});
});

$(function() {
	$("#knop0, #knop1, #knop2, #knop3, #knop4, #knop5, #knop6, #knop7, #knop8, #knop9, #knop10").click(function() {

		// var ii = this.id.replace("knop", "") * 1 + 1;
		// var nzw = 0;

		rol = document.getElementById("rol").innerHTML;
		if (blog) { console.log("nu in jsquery:knop[i]: rol = " + rol); }

		// $(this).css("visibility", "hidden");

		// if (speltype == "auto" && beurt == 0) {
		// 	dum = 0;
		// 	$("#cover").css("visibility", "visible"); }
		// else {
		// 	if (speltype == "auto") {
		// 		??? plaatspins (true);

		// 		for(j=1; j<=6; j++) {
		// 			ygis[j] = 0;
		// 		}
		// 	}
		// }

		if (rol == "codekraker" || rol == "codemaster" && beurt == 0) {
			$(this).css("visibility", "hidden");
			tp = (rol == "codekraker") ? 2 : 4;
			statusArr2[beurt] = updStatusArr(tp, beurt, 0, 0, -1, -1, statusArr2);
			if (tp == 4) {
				beurt++;
				statusArr2[beurt] = [];
				statusArr2[beurt][0] = tp;
				statusArr2[beurt][1] = beurt;
			}
			if (blog) { console.log("$knopi: voor makemove: statusArr2[" + beurt + "] = "); }
			if (blog) { console.log(statusArr2[beurt]); }
			if (blog) { console.log("$knopi: voor makemove: statusArr2 = "); }
			if (blog) { console.log(statusArr2); }
			makeMove(statusArr2);
		} else {
			nzwwi = plaatspins(false);
			console.log ("in functie knop_click: nzw, nwi = " + nzwwi[0] + ", " + nzwwi[1]);
			console.log ("in functie knop_click: stArr[8], stArr[9] = " + statusArr2[beurt][8] + ", " + statusArr2[beurt][9]);
			if (nzwwi[0] == statusArr2[beurt][8] && nzwwi[1] == statusArr2[beurt][9]) {
				$(this).css("visibility", "hidden");
				tp = 4;
				statusArr2[beurt] = updStatusArr(tp, beurt, 0, 0, -1, -1, statusArr2);
				if (blog) { console.log("$knopi: voor makemove: statusArr2[" + beurt + "] = "); }
				if (blog) { console.log(statusArr2[beurt]); }
				
				console.log("in functie($knop" + beurt + "): nzzwi[0] = " + nzwwi[0]);
				if (nzwwi[0] == 5 || beurt == 10) {
					res = (nzwwi[0] == 5) ? 1 : 0;
					console.log("in functie($knop" + beurt + "): res = " + res);
					eindespel(beurt, res);
				} else {
					beurt++;
					statusArr2[beurt] = [];
					statusArr2[beurt][0] = tp;
					statusArr2[beurt][1] = beurt;
				}
				if (blog) { console.log("$knopi: voor makemove: statusArr2[" + beurt + "] = "); }
				if (blog) { console.log(statusArr2[beurt]); }
				if (blog) { console.log("$knopi: voor makemove: statusArr2 = "); }
				if (blog) { console.log(statusArr2); }
				makeMove(statusArr2);			
			} else {
				alert ("U heeft niet de juiste pinnetjes geplaats.\nProbeer opnieuw of laat de pinnetjes automatisch plaatsen.");
			}
		}
	});
});

$(function() {
	$("#dropid01, #dropid11, #dropid21, #dropid31, #dropid41, #dropid51, #dropid61, #dropid71, #dropid81, #dropid91, #dropid101").dblclick(function() {
		var ii = this.id.replace("dropid", "") * 1;
		j = deleterondje (ii);
		updSockDel(j);
	});
});

$(function() {
	$("#dropid02, #dropid12, #dropid22, #dropid32, #dropid42, #dropid52, #dropid62, #dropid72, #dropid82, #dropid92, #dropid102").dblclick(function() {
		var ii = this.id.replace("dropid", "") * 1;
		j = deleterondje (ii);
		updSockDel(j);
	});
});

$(function() {
	$("#dropid03, #dropid13, #dropid23, #dropid33, #dropid43, #dropid53, #dropid63, #dropid73, #dropid83, #dropid93, #dropid103").dblclick(function() {
		var ii = this.id.replace("dropid", "") * 1;
		j = deleterondje (ii);
		updSockDel(j);
	});
});

$(function() {
	$("#dropid04, #dropid14, #dropid24, #dropid34, #dropid44, #dropid54, #dropid64, #dropid74, #dropid84, #dropid94, #dropid104").dblclick(function() {
		var ii = this.id.replace("dropid", "") * 1;
		j = deleterondje (ii);
		updSockDel(j);
	});
});

$(function() {
	$("#dropid05, #dropid15, #dropid25, #dropid35, #dropid45, #dropid55, #dropid65, #dropid75, #dropid85, #dropid95, #dropid105").dblclick(function() {
		var ii = this.id.replace("dropid", "") * 1;
		j = deleterondje (ii);
		updSockDel(j);
	});
});

$(function() {
	$("#dropid06, #dropid16, #dropid26, #dropid36, #dropid46, #dropid56, #dropid66, #dropid76, #dropid86, #dropid96, #dropid106").dblclick(function() {
		var ii = this.id.replace("dropid", "") * 1;
		j = deleterondje (ii);
		updSockDel(j);
	});
});

// -----------------------------------------------------------------------------------------------------------

$(function() {
	$("#pinid11, #pinid21, #pinid31, #pinid41, #pinid51, #pinid61, #pinid71, #pinid81, #pinid91, #pinid101").dblclick(function() {
		var ii = this.id.replace("pinid", "") * 1;
		deletepinnetje (ii);
	});
});

$(function() {
	$("#pinid12, #pinid22, #pinid32, #pinid42, #pinid52, #pinid62, #pinid72, #pinid82, #pinid92, #pinid102").dblclick(function() {
		var ii = this.id.replace("pinid", "") * 1;
		deletepinnetje (ii);
	});
});

$(function() {
	$("#pinid13, #pinid23, #pinid33, #pinid43, #pinid53, #pinid63, #pinid73, #pinid83, #pinid93, #pinid103").dblclick(function() {
		var ii = this.id.replace("pinid", "") * 1;
		deletepinnetje (ii);
	});
});

$(function() {
	$("#pinid14, #pinid24, #pinid34, #pinid44, #pinid54, #pinid64, #pinid74, #pinid84, #pinid94, #pinid104").dblclick(function() {
		var ii = this.id.replace("pinid", "") * 1;
		deletepinnetje (ii);
	});
});

$(function() {
	$("#pinid15, #pinid25, #pinid35, #pinid45, #pinid55, #pinid65, #pinid75, #pinid85, #pinid95, #pinid105").dblclick(function() {
		var ii = this.id.replace("pinid", "") * 1;
		deletepinnetje (ii);
	});
});

// ***********************************************************************************

function deleterondje(ii) {
	tp = statusArr2[beurt][0];
	if (rol == "codekraker" && tp == 1 || beurt == 0 && rol == "codemaster" && tp == 3) {
		var j = ii % 10;
		var i = (ii - j) / 10;
		delstat = ii;
		if (i == beurt) {
			if (i == 0) {
				$("#dropid0" + j).empty();
				xgis[j] = 0;
			} else {
				$("#dropid" + ii).empty();
				ygis[j] = 0;
			}
		}
		return j;
	}
}

function deletepinnetje(ii) {
	if (rol == "codemaster" && tp == 3) {
		var j = ii % 10;
		var i = (ii - j) / 10;
		delstat = ii;
		if (i == beurt) {
			kind = document.getElementById("pinid" + ii).firstChild.id;
			console.log("binnen functie deletepinnetje: kind = " + kind);
			$("#pinid" + ii).empty();
			jj = kind.replace("zwartwitid", "") * 1;
			if (jj >= 1 && jj <= 5) {
				statusArr2[beurt][8]--;
			} else if (jj >= 6 && jj <= 10) {
				statusArr2[beurt][9]--;
			}
			makeMove(statusArr2);
		}
	}
}

function updSockDel(j) {
	// if (blog) { console.log("in updSockDel: beurt = " + beurt + ", j = " + j); }
	statusArr2[beurt] = updStatusArr(0, beurt, 0, j, -1, -1, statusArr2);
	// if (blog) { console.log("in updSockDel: statusArr2 = "); }
	// if (blog) { console.log(statusArr2); }
	makeMove(statusArr2);
}
