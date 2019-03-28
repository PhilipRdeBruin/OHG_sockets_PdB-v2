
<!doctype html>
<html>

    <script>
        var statusArr2 = new Array;
        var blog;
    </script>

    <?php
        session_start();

        // $server = "localhost";
        $server = "192.168.2.6";  // De Knolle -- PC
        // $server = "192.168.2.9";  // De Knolle -- laptop
        // $server = "192.168.2.12"; // De Ljurk  -- laptop
        // $server = "192.168.2.84";    // EmmaState -- laptop
        $pad = "MasterMind";
        $database = "OudHollandsGamen";
    ?>
    
    <head>
        <meta charset=utf-8>
        <title>MasterMind_OHG</title>
        <script src="https://code.jquery.com/jquery-3.1.1.js"></script>
        
        <?php
            echo '<script src="' . $pad . '/JS-MM_OHG.js"></script>';
            echo '<script src="' . $pad . '/JS-MM_242.js"></script>';
            echo '<script src="' . $pad . '/JS-MMfuncties_042.js"></script>';
            echo '<script src="' . $pad . '/JQuery-MM_042.js"></script>';
            echo '<link rel="stylesheet" href="' . $pad . '/CSS-MM_042.css">';
            require_once "MensErgerJeNiet/includes/mejn_php-functies.php";
        ?>
    </head>

    <body>
        <h1 id="turns">Wacht s.v.p. op uw beurt...</h1>
        <?php echo '<script src="http://' . $server . ':3000/socket.io/socket.io.js"></script>' ?>

<!-- *********************************************************************************************************** -->


        <?php include "MasterMind/setGameParametersMM.php" ?>

        <div id="spelbord">
            <div id="gaatjes1"><script>drawrondjes();</script></div>
            <div id="gaatjes2"><script>drawpinnetjes();</script></div>
            <div id="cover"></div>
            <div id="covertgl"></div>
        </div>
        <div id="knoppen"><script>drawbuttons();</script></div>
        <div id="doosjes">
            <div id="kleurenpalet"><div id="hulppalet"><script>drawcolors();</script></div></div>
            <div id="pinnen">
                <script>drawblackwhite();</script>
                <button id="calcpins" onclick="plaatspins(true)">automatisch bepalen</button>
            </div>
        </div>

        <div id="nieuwspel">
            <p><input type="button" id="nwspelknop"value="Nog een spel" onClick="window.location.reload()"></p>
        </div>


<!-- *********************************************************************************************************** -->

        <script>
            npos = 5;
            blog = true;

            server = document.getElementById("server").innerHTML;
            room = document.getElementById("kamer").innerHTML;
            game = document.getElementById("spelnaam").innerHTML;
            user = document.getElementById("spelerid").innerHTML;
            
            voornaam = document.getElementById("gebrvoornaam").innerHTML;
            naam = document.getElementById("gebrnaam").innerHTML;
            rol = document.getElementById("rol").innerHTML;
            gamestate0 = document.getElementById("gamestate0").innerHTML;
            user += "%" + rol;      

            document.getElementById("turns").innerHTML = "Welkom " + voornaam + ",<br/>wacht s.v.p. op uw beurt...";
            document.getElementById("turns").style = "height:36px";

            if (rol == "codemaster") {
                document.getElementById("cover").style.visibility = "hidden";
                document.getElementById("covertgl").style.visibility = "hidden";
            } else {
                document.getElementById("cover").style.visibility = "visible";
            }


// ***********************************************************************************************************

            var socket = io('http://' + server + ':3000/game');
            var gameData = {room: room, game: game, user: user};
            socket.emit('join room', gameData);

// -----------------------------------------------------------------------------------------------------------

            socket.on('game init', function(init) {
                console.log("socket.on/game init:");
                logInit(init);
                console.log("socket.on/game init: gamestate0 = " + gamestate0);
                if (gamestate0[0] == "[") {
                    statusArr2 = JSON.parse(gamestate0);
                    console.log("socket.on/game init: statusArr2 = " + statusArr2);
                    l = statusArr2.length - 1;
                    tp = statusArr2[l][0];
                    beurt = statusArr2[l][1];
                    if (tp == 4 && l < 10) {
                        beurt++;
                        statusArr2[beurt] = [];
                        statusArr2[beurt][0] = 1;
                        statusArr2[beurt][1] = beurt;
                    }
                    makeMove(statusArr2);
                }
            });

// -----------------------------------------------------------------------------------------------------------

            socket.on('game state', function(gamestate) {
                if (blog) { console.log("socket.on/game state: gamestate = "); }
                if (blog) { console.log(gamestate); }
                if (blog) { console.log(statusArr2); }

                l = gamestate.length - 1;
                if (blog) { console.log("lengte gamestate (l) = " + l); }
                if (l >= 0) {
                    statusArr2 = gamestate;
                    if (blog) { console.log("socket.on/game state: statusArr2 = "); }
                    if (blog) { console.log(statusArr2); }

                    // converteer laatste (rij-) element van gamestate (array) 
                    // naar associatieve array ygsi[];
                    xgsi = splitGamestate(statusArr2, 0);
                    ygsi = splitGamestate(statusArr2, l);
                    tp = (ygsi['type'] == undefined) ? 0 : ygsi['type'];
                    brt = (ygsi['beurt'] == undefined) ? 0 : ygsi['beurt'];

                    // if (blog) { consoleLog(ygsi); }

                    console.log("binnen 'socket.on': nu aanroepen functie 'vulrijenSpeelbord'...");
                    vulrijenSpeelbord(npos, brt, statusArr2, ygsi);
                }
            });

// -----------------------------------------------------------------------------------------------------------

            socket.on('game turn', function(turn) {
                if (blog) { console.log("socket.on/game turn: moveData = "); }
                if (blog) { console.log(turn); }

                try{
                    procesturn(turn);
                } catch(e) {
                    console.log(e)
                }

                document.getElementById("turns").style = "height:36px";
            });

// -----------------------------------------------------------------------------------------------------------

            function makeMove(moveData) {
                if (blog) { console.log("binnen functie makeMove: moveData = "); }
                if (blog) { console.log(moveData); }
                socket.emit('game move', moveData)
            };
        </script>
        
    </body>
</html>
