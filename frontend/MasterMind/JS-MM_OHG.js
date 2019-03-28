
function vulrijenSpeelbord(npos, brt, statarr, ygsi) {
    console.log("binnen functie 'vulrijenSpeelbord: beurt = " + brt);
    for (i = 0; i <= brt; i++) {
        verwijderrij(npos, i);
        console.log("binnen functie 'vulrijenSpeelbord: voor def van 'viscover'...");
        viscover = document.getElementById("cover").style.visibility;
        console.log("binnen functie 'vulrijenSpeelbord: i = " + i + ", rol = " + rol + ", viscover = " + viscover);
        if (i > 0 && i < brt || i == 0 && (rol == "codemaster" || viscover == "hidden")) {
            console.log("binnen functie 'vulrijenSpeelbord': vullen rondjes...");
            for (j = 1; j <= npos; j++) {
                ij = (i == 0) ? "0" + j : 10 * i + j;
                xkl = statarr[i][j + 1];
                if (xkl > 0) {
                    knopje = document.getElementById("dragid" + xkl);
                    dropje = document.getElementById("dropid" + ij);
                    knopkloon = knopje.cloneNode(true);
                    dropje.appendChild(knopkloon);                               
                }
            }
        } else if (i > 0 && i == brt || brt == 0 && i == 0 && (rol == "codemaster" || viscover == "hidden")) {
            console.log("binnen functie 'vulrijenSpeelbord': vullen rondjes...");
            for (j = 1; j <= npos; j++) {
                ij = (i == 0) ? "0" + j : 10 * i + j;
                xkl = ygsi['pos' + j];
                if (xkl > 0) {
                    knopje = document.getElementById("dragid" + xkl);
                    dropje = document.getElementById("dropid" + ij);
                    knopkloon = knopje.cloneNode(true);
                    dropje.appendChild(knopkloon);                               
                }
            }           
        }

        nzw = statarr[i][8];
        nwi = statarr[i][9];
        czw = 0;

        if (nzw > 0) {
            knoppin = document.getElementById("zwartwitid1");
            for (j = 1; j <= nzw; j++) {
                czw++;
                ij = (i == 0) ? "0" + j : 10 * i + j;
                droppin = document.getElementById("pinid" + ij);
                pinkloon = knoppin.cloneNode(true);
                droppin.appendChild(pinkloon);
            }
        }
        if (nwi > 0) {
            knoppin = document.getElementById("zwartwitid6");
            for (j = czw + 1; j <= czw + nwi; j++) {
                ij = (i == 0) ? "0" + j : 10 * i + j;
                droppin = document.getElementById("pinid" + ij);
                pinkloon = knoppin.cloneNode(true);
                droppin.appendChild(pinkloon);
            }
        }      
    }
}

function verwijderrij(ni, i) {
    for (j = 1; j <= ni; j++) {
        ij = (i == 0) ? "0" + j : 10 * i + j;
        $("#dropid" + ij).empty();
        $("#pinid" + ij).empty();
    }
}


// ***********************************************************************************************************


function procesturn(turn) {
    if (statusArr2 != undefined) {
        console.log("in procesturn: statusArr2 = ");
        console.log(statusArr2);
    }

    if (turn == 0) {
        // wachten op beurt
        document.getElementById("turns").innerHTML = voornaam + ", wacht s.v.p. op uw beurt...";
    } else if (turn == 1) {
        // aan zet
        document.getElementById("turns").innerHTML = voornaam + ", u bent aan zet...";
    } else if (turn == 2) {
        // einde spel
        document.getElementById("turns").innerHTML = "Einde spel.";
    }

    if (statusArr2 == undefined || statusArr2.length == 0) { 
        l = 0; tp = 3; 
    } else {
        l = statusArr2.length - 1;
        if (statusArr2[l][0] == 2) {
            statusArr2[l][0] = 3;
        } else if (statusArr2[l][0] == 4) {
            statusArr2[l][0] = 1;
        }
        tp = statusArr2[l][0];
        beurt = statusArr2[l][1];
    }

    visHide(beurt, rol, tp);
}


// ***********************************************************************************************************


function visHide(brt, rol, tp) {

    // nzw = statusArr2[brt][8];
    if (brt >= 0) {
        console.log("in visHide: Hallo...");
        console.log("in visHide: brt, statusArr2[brt], statusArr2[brt][8]] = " + brt + ", " + statusArr2[brt] + ", ");
    }
    nzw = (brt >= 0 && statusArr2[brt] != undefined) ? statusArr2[brt][8] : 0;
    if (nzw == 5) { 
        hideAll(); 
    } else {
        hkl = 500; hpi = 605;
        if (brt > 0) {
            h1 = 60 * (brt - 1) + 25;
            h1px = (h1 <= hkl) ? h1 + "px" : hkl + "px";
            h2 = 25; // 60 * (brt - 1) + 25;
            h2px = (h2 <= hpi) ? h2 + "px" : hpi + "px";
        } else {
            h1px = hkl + "px"; 
            h2px = hpi + "px";
        }
        bviskl = (rol == "codemaster" && brt == 0 && tp == 3 || rol == "codekraker" && brt > 0 && tp == 1) ? "visible" : "hidden";
        bvispi = (rol == "codemaster" && brt > 0 && tp == 3) ? "visible" : "hidden";

        if (blog) { console.log("in procesturn:"); }
        if (blog) { console.log("brt, rol, tp, bviskl, bvispi, h = " + brt + ", " + rol + ", " + tp + ", " + bviskl + ", " + bvispi + ", " + h1px); }

        if (brt > 0) {
            brtmin = brt - 1;
            document.getElementById("knop" + brtmin).style.visibility = "hidden"; 
        }
        if (tp == 1 && rol == "codekraker" || tp == 3 && rol == "codemaster") {
            document.getElementById("knop" + brt).style.visibility = "visible";
        }            

        document.getElementById("kleurenpalet").style.visibility = bviskl;
        document.getElementById("kleurenpalet").style.marginTop = h1px;
        document.getElementById("pinnen").style.visibility = bvispi;
        document.getElementById("pinnen").style.marginTop = h2px;
    }    
}

function hideAll() {
    document.getElementById("kleurenpalet").style.visibility = hidden;
    document.getElementById("pinnen").style.visibility = hidden;
    for (i = 0; i <= 10; i++) {
        document.getElementById("knop" + i).style.visibility = "hidden";
    }
}


// ***********************************************************************************************************


function splitGamestate(gamestate, l) {
    var ygs = new Array;

    ygs['type'] = gamestate[l][0];
    ygs['beurt'] = gamestate[l][1];
    ygs['pos1'] = gamestate[l][2];
    ygs['pos2'] = gamestate[l][3];
    ygs['pos3'] = gamestate[l][4];
    ygs['pos4'] = gamestate[l][5];
    ygs['pos5'] = gamestate[l][6];
    ygs['pos6'] = gamestate[l][7];
    ygs['nzw'] = gamestate[l][8];
    ygs['nwi'] = gamestate[l][9];
    ygs['delstat'] = gamestate[l][10];

    return ygs;
}


// ***********************************************************************************************************


function logInit(init) {
    console.log("init = ");
    console.log(init);

    console.log("server = " + server);
    console.log("room = " + room);
    console.log("game = " + game);
    console.log("user = " + user);            
    console.log("voornaam = " + voornaam);
    console.log("naam = " + naam);
    console.log("rol = " + rol);
    console.log("gamestate(0) = " + gamestate0);
}

function consoleLog(ygsi) {
    console.log ("type = " + ygsi['type']);
    console.log ("pos1 = " + ygsi['pos1']);
    console.log ("pos2 = " + ygsi['pos2']);
    console.log ("pos3 = " + ygsi['pos3']);
    console.log ("pos4 = " + ygsi['pos4']);
    console.log ("pos5 = " + ygsi['pos5']);
    // console.log ("pos6 = " + ygsi['pos6']);
}
