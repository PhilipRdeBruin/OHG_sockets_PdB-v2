
var blauw, geel, groen, rood, wit, blauw0, geel0, groen0, rood0;
var pos = new Array;

function get_pars1(kl) {
    var y = new Array;
    var kleurA = ["blauw", "geel", "groen", "rood"];

    // alert("kl = " + kl + ", kleurA[1] = " + kleurA[1]);

    y['nsplr'] = document.getElementById("nsplr").innerHTML;
    y['user'] = document.getElementById("speler").innerHTML;
    // y['beurt'] = kleurA.indexOf(kl) + 1;

    return y;
}

function get_pars2(i) {
    var y = new Array;

    y['spelerid'] = document.getElementById("spelerid" + i).innerHTML;
    y['voornaam'] = document.getElementById("spelervn" + i).innerHTML;
    return y;
}

function init_spelbord(kleur1, nsplr) {
    switch (kleur1) {
    case "blauw":
        blauw = [[10,1,30],[10,2,30],[11,1,30],[11,2,30], [11,5,50,1,"_A"],[7,6,30,144,"-d"],[8,6,30,143,"-c"],[9,6,30,142,"-b"],[10,6,30,141,"-a"]];
        geel = [[1,1,30],[1,2,30],[2,1,30],[2,2,30],[5,1,50,11,"_A"],[6,2,30,111,"-a"],[6,3,30,112,"-b"],[6,4,30,113,"-c"],[6,5,30,114,"-d"]];
        groen = [[1,10,30],[1,11,30],[2,10,30],[2,11,30],[1,7,50,21,"_A"],[2,6,30,121,"-a"],[3,6,30,122,"-b"],[4,6,30,123,"-c"],[5,6,30,124,"-d"]];
        rood = [[10,10,30],[10,11,30],[11,10,30],[11,11,30], [7,11,50,31,"_A"],[6,7,30,134,"-d"],[6,8,30,133,"-c"],[6,9,30,132,"-b"],[6,10,30,111,"-a"]];
        blauw0 = [[10,1],[10,2],[11,1],[11,2]];
        geel0 = [[1,1],[1,2],[2,1],[2,2]];
        groen0 = [[1,10],[1,11],[2,10],[2,11]];
        rood0 = [[10,10],[10,11],[11,10],[11,11]];
        // trail = [[11,5],[10,5],[9,5],[8,5],[7,5],[7,4],[7,3],[7,2],[7,1],[6,1],
        //          [5,1],[5,2],[5,3],[5,4],[5,5],[4,5],3,[5],[2,5],[1,5],[1,6],
        //          [1,7],[2,7],[3,7],[4,7],[5,7],[5,8],[5,9],[5,10],[5,11],[6,11],
        //          [7,11],[7,10],[7,9],[7,8],[7,7],[8,7],[9,7],[10,7],[11,7],[11,6]];
        pos[1] = 1;
        pos[2] = 2;
        pos[3] = 3;
        pos[4] = 4;
        break;
    case "geel":
        geel = [[10,1,30],[10,2,30],[11,1,30],[11,2,30], [11,5,50,11,"_A"],[7,6,30,114,"-d"],[8,6,30,113,"-c"],[9,6,30,112,"-b"],[10,6,30,111,"-a"]];
        groen = [[1,1,30],[1,2,30],[2,1,30],[2,2,30],[5,1,50,21,"_A"],[6,2,30,121,"-a"],[6,3,30,122,"-b"],[6,4,30,123,"-c"],[6,5,30,124,"-d"]];
        rood = [[1,10,30],[1,11,30],[2,10,30],[2,11,30],[1,7,50,31,"_A"],[2,6,30,131,"-a"],[3,6,30,132,"-b"],[4,6,30,133,"-c"],[5,6,30,134,"-d"]];
        blauw = [[10,10,30],[10,11,30],[11,10,30],[11,11,30], [7,11,50,1,"_A"],[6,7,30,144,"-d"],[6,8,30,143,"-c"],[6,9,30,142,"-b"],[6,10,30,141,"-a"]];
        geel0 = [[10,1],[10,2],[11,1],[11,2]];
        groen0 = [[1,1],[1,2],[2,1],[2,2]];
        rood0 = [[1,10],[1,11],[2,10],[2,11]];
        blauw0 = [[10,10],[10,11],[11,10],[11,11]];
        // trail = [[7,11],[7,10],[7,9],[7,8],[7,7],[8,7],[9,7],[10,7],[11,7],[11,6],
        //          [11,5],[10,5],[9,5],[8,5],[7,5],[7,4],[7,3],[7,2],[7,1],[6,1],
        //          [5,1],[5,2],[5,3],[5,4],[5,5],[4,5],3,[5],[2,5],[1,5],[1,6],
        //          [1,7],[2,7],[3,7],[4,7],[5,7],[5,8],[5,9],[5,10],[5,11],[6,11]];
        pos[1] = 4; pos[2] = 1; pos[3] = 2; pos[4] = 3;
        break;
    case "groen":
        groen = [[10,1,30],[10,2,30],[11,1,30],[11,2,30], [11,5,50,21,"_A"],[7,6,30,124,"-d"],[8,6,30,123,"-c"],[9,6,30,122,"-b"],[10,6,30,121,"-a"]];
        rood = [[1,1,30],[1,2,30],[2,1,30],[2,2,30],[5,1,50,31,"_A"],[6,2,30,131,"-a"],[6,3,30,132,"-b"],[6,4,30,133,"-c"],[6,5,30,134,"-d"]];
        blauw = [[1,10,30],[1,11,30],[2,10,30],[2,11,30],[1,7,50,1,"_A"],[2,6,30,141,"-a"],[3,6,30,142,"-b"],[4,6,30,143,"-c"],[5,6,30,144,"-d"]];
        geel = [[10,10,30],[10,11,30],[11,10,30],[11,11,30], [7,11,50,11,"_A"],[6,7,30,114,"-d"],[6,8,30,113,"-c"],[6,9,30,112,"-b"],[6,10,30,111,"-a"]];
        groen0 = [[10,1],[10,2],[11,1],[11,2]];
        rood0 = [[1,1],[1,2],[2,1],[2,2]];
        blauw0 = [[1,10],[1,11],[2,10],[2,11]];
        geel0 = [[10,10],[10,11],[11,10],[11,11]];
        // trail = [[1,7],[2,7],[3,7],[4,7],[5,7],[5,8],[5,9],[5,10],[5,11],[6,11],
        //          [7,11],[7,10],[7,9],[7,8],[7,7],[8,7],[9,7],[10,7],[11,7],[11,6],
        //          [11,5],[10,5],[9,5],[8,5],[7,5],[7,4],[7,3],[7,2],[7,1],[6,1],
        //          [5,1],[5,2],[5,3],[5,4],[5,5],[4,5],3,[5],[2,5],[1,5],[1,6]];
        pos[1] = 3; pos[2] = 4; pos[3] = 1; pos[4] = 2;
        break;
    case "rood":
        rood = [[10,1,30],[10,2,30],[11,1,30],[11,2,30], [11,5,50,31,"_A"],[7,6,30,134,"-d"],[8,6,30,133,"-c"],[9,6,30,132,"-b"],[10,6,30,131,"-a"]];
        blauw = [[1,1,30],[1,2,30],[2,1,30],[2,2,30],[5,1,50,1,"_A"],[6,2,30,141,"-a"],[6,3,30,142,"-b"],[6,4,30,143,"-c"],[6,5,30,144,"-d"]];
        geel = [[1,10,30],[1,11,30],[2,10,30],[2,11,30],[1,7,50,11,"_A"],[2,6,30,111,"-a"],[3,6,30,112,"-b"],[4,6,30,113,"-c"],[5,6,30,114,"-d"]];
        groen = [[10,10,30],[10,11,30],[11,10,30],[11,11,30], [7,11,50,21,"_A"],[6,7,30,124,"-d"],[6,8,30,123,"-c"],[6,9,30,122,"-b"],[6,10,30,121,"-a"]];
        rood0 = [[10,1],[10,2],[11,1],[11,2]];
        blauw0 = [[1,1],[1,2],[2,1],[2,2]];
        geel0 = [[1,10],[1,11],[2,10],[2,11]];
        groen0 = [[10,10],[10,11],[11,10],[11,11]];
        // trail = [[5,1],[5,2],[5,3],[5,4],[5,5],[4,5],3,[5],[2,5],[1,5],[1,6],
        //          [1,7],[2,7],[3,7],[4,7],[5,7],[5,8],[5,9],[5,10],[5,11],[6,11],
        //          [7,11],[7,10],[7,9],[7,8],[7,7],[8,7],[9,7],[10,7],[11,7],[11,6],
        //          [11,5],[10,5],[9,5],[8,5],[7,5],[7,4],[7,3],[7,2],[7,1],[6,1]];
        pos[1] = 2; pos[2] = 3; pos[3] = 4; pos[4] = 1;        
    }
    wit = [[5,2,50],[5,3,50],[5,4,50],[5,5,50],[4,5,50],[3,5,50],[2,5,50],[1,5,50],[1,6,50],
          [2,7,50],[3,7,50],[4,7,50],[5,7,50],[5,8,50],[5,9,50],[5,10,50],[5,11,50],[6,11,50],
          [7,7,50],[7,8,50],[7,9,50],[7,10,50],[8,7,50],[9,7,50],[10,7,50],[11,7,50],[11,6,50],
          [7,5,50],[8,5,50],[9,5,50],[10,5,50],[7,4,50],[7,3,50],[7,2,50],[7,1,50],[6,1,50]];
    trail = [[11,5],[10,5],[9,5],[8,5],[7,5],[7,4],[7,3],[7,2],[7,1],[6,1],
          [5,1],[5,2],[5,3],[5,4],[5,5],[4,5],3,[5],[2,5],[1,5],[1,6],
          [1,7],[2,7],[3,7],[4,7],[5,7],[5,8],[5,9],[5,10],[5,11],[6,11],
          [7,11],[7,10],[7,9],[7,8],[7,7],[8,7],[9,7],[10,7],[11,7],[11,6]];
}

function display_beurt(beurt, nsplr, speler, spelerid, voornaam) {
    alert ("display beurt...");
    alert ("beurt = " + beurt + ", nsplr = " + nsplr + ", speler = " + speler + ", spelerid = " + spelerid + ", voornaam = " + voornaam);
    switch (beurt) { 
        case 1:
            document.getElementById("dobbelkader").style.border = "4px solid blue";
            break;
        case 2:
            document.getElementById("dobbelkader").style.border = "4px solid yellow";
            break;
        case 3:
            document.getElementById("dobbelkader").style.border = "4px solid #0c0";
            break;
        case 4:
            document.getElementById("dobbelkader").style.border = "4px solid red";
            break;
        default:
            document.getElementById("dobbelkader").style.border = "4px solid #360";
    }
    
    for (i=1; i<=nsplr; i++) {
        document.getElementById("foto-hdr" + pos[i]).style.color = "#afc";
        document.getElementById("foto-hdr" + pos[i]).style.background = "#040";
    }
    document.getElementById("foto-hdr" + pos[beurt]).style.color = "#fcc";
    document.getElementById("foto-hdr" + pos[beurt]).style.background = "#f00";


    if (beurt > 0 && beurt <= nsplr) {
        document.getElementById("dobbelbeurt").innerHTML = voornaam[beurt]; 
        document.getElementById("dobbelbeurt").style = "font-size:24px;font-weight:bold;color:white";
        document.getElementById("dobbelsteen").style = "margin-top:20px";
        document.getElementById("dobbelen").style = "margin-top:20px";

        // alert("beurt = " + beurt + ", speler(id) = " + speler + ", spelerid(beurt) = " + spelerid[beurt]);

        if (spelerid[beurt] == speler) {
            document.getElementById("dobbelen").style = "margin-top:20px;color:#fff;background:#24a;cursor:pointer;";
            document.getElementById("dobbelen").disabled = false;
        } else {
            document.getElementById("dobbelen").style = "margin-top:20px;color:#444;background:#888;cursor:initial;";
            document.getElementById("dobbelen").disabled = true;
        }
    } else {
        document.getElementById("dobbelbeurt").innerHTML = "dobbelbox";
        document.getElementById("dobbelbeurt").style = "font-size:18px;font-weight:normal;color:#bbb";
        document.getElementById("dobbelsteen").style = "margin-top:35px";
        document.getElementById("dobbelen").style = "margin-top:20px;color:#444;background:#888;cursor:initial;";
        document.getElementById("dobbelen").disabled = true;
    }
}

function initveldparameters() {

}

function fmt00(x) {
    y = (x < 10) ? "0" + x : x;
    return y;
}

function drawRondjes(kleur, klas) {
    for (i=0; i<kleur.length; i++) {
        ii = fmt00(kleur[i][0]);
        jj = fmt00(kleur[i][1]);
        sz = kleur[i][2];
        lt = (kleur[i][4] != undefined	) ? kleur[i][4] : ""; 
        
        x = document.getElementById("veld" + ii + jj);
        htmlstring = '	            <div class="dropholder">';
        htmlstring = htmlstring + '		<div  class="dropid ' + klas + lt + ' sz' + sz + ' " id="dropid' + ii + jj + '" ondrop="drop(event)" ondragover="allowDrop(event)">';
	    htmlstring = htmlstring + '		</div>';
        htmlstring = htmlstring + '	</div>';
        x.innerHTML = htmlstring;
    }
}

function drawPinnetjes(kl, kleur, color) {
    for (i=0; i<4; i++) {
        j = i + 1;
        ii = fmt00(kleur[i][0]);
        jj = fmt00(kleur[i][1]);
        x = document.getElementById("dropid" + ii + jj);
        htmlstring = '	            <div class = "dragcl" id="dragid' + kl + j + '" draggable="true" ondragstart="drag(event)">';
        htmlstring = htmlstring + '		<svg class="pinkleur">';
        htmlstring = htmlstring + '			<circle class="kleur" cx="13" cy="13" r="13" fill="' + color + '" />';
        htmlstring = htmlstring + '		</svg>';
        htmlstring = htmlstring + '	</div>';
        x.innerHTML = htmlstring;
    }
}

function dobbelen(pad) {
    var worp = [1,2,3,4,5,6];
    shuffleArray(worp);

    document.getElementById("dobbelsteen").src = pad + "/afbeeldingen/dobbelstenen/dice1" + worp[0] + ".png";
}


/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
