
function genereercode() {
	var testkl = new Array(7, 9, 3, 3, 8);

	for (i=1; i<=5; i++) {

		var random = Math.floor(Math.random() * 10);
		var rnd10 = random % 10;
		xgis[0, i] = rnd10;

		if (rnd10 > 0) {
			kleur = document.getElementById("dragid" + xgis[0, i]);  // was xgis[i]... (?)
			klkloon = kleur.cloneNode(true);
			document.getElementById("dropid0" + i).appendChild(klkloon);
		}
	}
}

/*	-----------------------------------------------------------------------------------------------------------------	*/

function plaatspins(benter) {
	var nzw; var nwi;
	var chkzw = new Array;
	var zwjj = new Array(6);
	var jpin = new Array(1, 4, 2, 5, 3);
	var zwart; var zwkloon;
	var wit; var witkloon;

	l = statusArr2.length - 1;
	for (j = 1; j <= npos; j++) {
		xgis[j] = statusArr2[0][j+1];
		ygis[j] = statusArr2[l][j+1];
	}

	console.log("in functie plaatspins:");
	console.log("xgis = " + xgis[1] + ", " + xgis[2] + ", " + xgis[3] + ", " + xgis[4] + ", " + xgis[5]);
	console.log("ygis = " + ygis[1] + ", " + ygis[2] + ", " + ygis[3] + ", " + ygis[4] + ", " + ygis[5]);

	ii = beurt;
	nzw = 0; nwi = 0;
	nzw = nzwartpin (ii, zwjj);
	if (nzw < 5) {
		nwi = nwitpin (ii, zwjj);
		if (benter) {
			for (j=1; j<=nzw; j++) {
				zwart = document.getElementById("zwartwitid1");
				zwkloon = zwart.cloneNode(true);
				document.getElementById("pinid" + ii + jpin[j-1]).appendChild(zwkloon);
			}
			for (j=nzw + 1; j<=nzw + nwi; j++) {
				wit = document.getElementById("zwartwitid6");
				witkloon = wit.cloneNode(true);
				document.getElementById("pinid" + ii + jpin[j-1]).appendChild(witkloon);
			}
			if (ii < 10) {
				tp = 4;
				statusArr2[beurt] = updStatusArr(tp, beurt, 0, 0, nzw, nwi, statusArr2);
				beurt++; ii = beurt;
				statusArr2[ii] = [];
				statusArr2[ii][0] = tp;
				statusArr2[ii][1] = beurt;
				// makeMove(statusArr2);
			} else if (statusArr2[ii][0] == 4) {
				eindespel (ii, 0);
			}
		}
	} else if (benter) {
		for (j=1; j<=5; j++) {
			zwart = document.getElementById("zwartwitid1");
			zwkloon = zwart.cloneNode(true);
			document.getElementById("pinid" + ii + jpin[j-1]).appendChild(zwkloon);
		}
		statusArr2[ii][8] = 5;
		statusArr2[ii][9] = 0;
		eindespel (ii, 1);
	}
	console.log("in functie plaatspins / voor binnengaan 'makeMove': statusArr2 = ");
	console.log(statusArr2);
	makeMove(statusArr2);

	chkzw[0] = nzw;
	chkzw[1] = nwi;
	return chkzw;
}

function nzwartpin(ii, zwjj) {
	var t;

	t = 0;
	for (j=1; j<=5; j++) {
		x = (xgis[j] == null) ? 0 : xgis[j];
		y = (ygis[j] == null) ? 0 : ygis[j];	
		if (y == x)  {
			t++;
			zwjj[j] = 1; }
		else {
			zwjj[j] = 0;
		}
	}
	return t;
}


function nwitpin(ii, zwjj) {
	var t; var b;
	var dkl0; var dkl;
	var xg = new Array;
	var yg = new Array;

	for (j=1; j<=5; j++) {
		xg[j] = (xgis[j] == null) ? 0 : xgis[j];
		yg[j] = (ygis[j] == null) ? 0 : ygis[j];
	}

	console.log("in functie nwitpin:");
	console.log("xg = " + xg[1] + ", " + xg[2] + ", " + xg[3] + ", " + xg[4] + ", " + xg[5]);
	console.log("yg = " + yg[1] + ", " + yg[2] + ", " + yg[3] + ", " + yg[4] + ", " + yg[5]);

	t = 0;
	for (j=1; j<=5; j++) {
		b = 0;
		dkl0 = 0; dkl = 0;

//		alert ("zwjj(" + j + ") =  " + zwjj[j]);

		if (zwjj[j] == 0) {

//			alert ("vindkl(" + ii + ", " + j + ") =  " + vindkl(ii, j));

			if (vindkl(ii, j, xg, yg) == 1) {
				if (j > 1) {
					for (jj=1; jj<=j-1; jj++) {
						if (yg[jj] == yg[j] && yg[jj] != xg[jj]) {
							dkl++;
						}
					}
					for (jj=1; jj<=5; jj++) {
						if (jj != j) {
							if (yg[j] == xg[jj] && yg[jj] != xg[jj]) {
								dkl0++;
							}
						}
					} }
				else {
					if (yg[j] != xg[j]) {
						for (jj=2; jj<=5; jj++) {
							if (xg[jj] == yg[j] && xg[jj] != yg[jj]) {
								b = 1;
							}
						}
					}
				}
				if (b == 1 || dkl0 > dkl) {
					t++;
				}
			}
		}

//		alert ("j =  " + j + "        zwjj(" + j + ") =  " + zwjj[j] + "        vindkl(" + ii + ", " + j + ") =  " + vindkl(ii, j));
//		alert ("b =  " +b + "        dkl0 =  " + dkl0 + "        dkl =  " + dkl);

	}

	return t;
}

function vindkl (ii, j, xgsub, ygsub) {
	var jj; var b;

	jj = 0; b = 0;
	do {
		jj++;
		if (xgsub[jj] == ygsub[j]) {
			b = 1;
		}
	}
	while (b == 0 && jj < 5);

	return b;
}

function eindespel(ii, res) {
	console.log("in functie(eindespel): ii, res = " + ii + ", " + res);

	var strtry;

	if (res == 0) {
		alert ("Sorry!\n\nU bent er niet in geslaagd de code te kraken.\n\nVolgende keer meer succes!");
	}
	else {
		if (ii == 1) {
			strtry = "beurt"; }
		else {
			strtry = "beurten";
		}

		alert ("Gefeliciteerd!\n\nU heeft de code in " + ii + " " + strtry + " gekraakt.");
	}

	$("#cover").css("visibility", "hidden");
	$("#nwspelknop").css("visibility", "visible");

	$("#kleurenpalet").css("visibility", "hidden");
	$("#pinnen").css("visibility", "hidden");
}

function vulinitdata(arg) {
	document.getElementById("initdata").innerHTML = arg;
}

function showdata() {
	x1 = document.getElementById("npos").value;
	x2 = document.getElementById("nkleur").value;
	alert ("npos = " + x1 + ", nkleur = " + x2);
}
