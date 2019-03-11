
function vulrijenSpeelbord(npos, brt, statarr, ygsi) {
    for (i = 0; i <= brt; i++) {
        verwijderrij(npos, i);
        if (i < brt) {
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
        } else {
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
    }
}

function verwijderrij(ni, i) {
    for (j = 1; j <= ni; j++) {
        ij = (i == 0) ? "0" + j : 10 * i + j;
        $("#dropid" + ij).empty();
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

    if (statusArr2 != undefined) {
        l = statusArr2.length - 1;
        tp0 = (rol == "codekraker") ? 0 : 2;
        tp = (l >= 0) ? statusArr2[l][0] : tp0;
    } else {
        l = 0; tp = 2;
    }

    if (tp == 4) { beurt++; l++; }
    tp = (tp == 4) ? 1 : tp + 1;

    if (blog) { console.log("in procesturn: l = " + l); }
    statusArr2[l] = [];
    statusArr2[l][0] = tp;
    statusArr2[l][1] = beurt;
    if (blog) { console.log("procesturn: statusArr2[0] = "); }
    if (blog) { console.log(statusArr2[0]); }
    if (blog) { console.log("procesturn: statusArr2[" + l + "] = "); }
    if (blog) { console.log(statusArr2[l]); }

    visHide(beurt, rol, tp);
}


// ***********************************************************************************************************


function visHide(brt, rol, tp) {
    hkl = 500; hpi = 625;
    if (brt > 0) {
        h = 60 * (brt - 1) + 25;
        h1px = (h <= hkl) ? h + "px" : hkl + "px";
        h2px = (h <= hpi) ? h + "px" : hpi + "px";
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
