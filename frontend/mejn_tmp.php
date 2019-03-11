 
<!doctype html>
    <html>

    <?php
        // $server = "localhost";
        // $server = "192.168.2.6";  // De Knolle -- PC
        // $server = "192.168.2.9";  // De Knolle -- laptop
        // $server = "192.168.2.12"; // De Ljurk  -- laptop
        $server = "192.168.2.84";    // EmmaState -- laptop
        $pad = "MensErgerJeNiet";
        $database = "OudHollandsGamen";
    ?>

    <head>
		<meta charset=utf-8>
		<title>MensErgerjeNiet</title>
		<script src="https://code.jquery.com/jquery-3.1.1.js"></script>

        <?php
            echo '<script src="' . $pad . '/mejn.js"></script>';
            echo '<script src="' . $pad . '/mejn_dragndrop.js"></script>';
            // echo '<!-- <script src="' . $pad . '/mejnQuery.js"></script> -->';
            echo '<link rel="stylesheet" href="' . $pad . '/mejn.css">';
            require_once "$pad/includes/mejn_php-functies.php"; 
        ?>
    </head>

    <body>
        <h1 id="turns">Wacht op uw beurt...</h1>
        <?php echo '<script src="http://' . $server . ':3000/socket.io/socket.io.js"></script>' ?>
        <!-- <script src="http://192.168.2.84:3000/socket.io/socket.io.js"></script> -->
        <!-- <button onclick="makeMove('testing moves')">Send test move</button> -->



    <!-- ************************************************************************************* -->



        <?php

            $kleurA = array("blauw", "geel", "groen", "rood");
            $beurt = 1;       


            // -------------------------------------------------------------------


            if (isset($_POST["start_spel"])) {
                $actspelid = $_POST["act_spel"];
                $spelerid = $_POST["speler"];

                $spelnaam = fetch_spel_alias($database, $actspelid);
                $spelerids = fetch_speler_ids($database, $actspelid);
                $nsplr = count($spelerids);
                for ($i = 1; $i <= $nsplr; $i++ ) {
                    $spelerx[$i] = detSpelerNaam($database, $spelerids[$i]);

                    if ($spelerids[$i] == $spelerid) {
                        $kleur = $kleurA[$i - 1];
                    }
                }
            }

            echo '<script>init_spelbord("' . $kleur . '",' . $nsplr . ')</script>';
            $spelery = assign_spelers($kleur, $spelerx);
            $spelnmplus = $spelnaam . $nsplr;

        ?>


        <div id="kamer" style="display:none"><?php echo $actspelid ?></div>
        <div id="spel" style="display:none"><?php echo $spelnmplus ?></div>
        <div id="speler" style="display:none"><?php echo $spelerid ?></div>
        <div id="nsplr" style="display:none"><?php echo $nsplr ?></div>
        <?php
            for ($i = 1; $i<=$nsplr; $i++) {
                $idx = $spelerx[$i]['id'];
                $vnx = $spelerx[$i]['voornaam'];
                echo '<div id="spelerid' . $i . '" style="display:none">' . $idx . '</div>';
                echo '<div id="spelervn' . $i . '" style="display:none">' . $vnx . '</div>';
            }
        ?>

        <div id="beeldscherm">
            <div id="zij-kolom">
                <?php 
                    div_speler_img($pad, "b", $spelery[2], 2); 
                ?>
                <div id="chatbox">
                    <p>chatbox</p>
                </div>
                <?php div_speler_img($pad, "o", $spelery[1], 1); ?>
            </div>
            <div id="speelbord">
                <div id="speelbord2">
                    <script>
                        var spelerid = new Array;
                        var voornaam = new Array;

                        nsplr = document.getElementById("nsplr").innerHTML;
                        for (i=1; i<=nsplr; i++) {
                            spelerid[i] = document.getElementById("spelerid" + i).innerHTML;
                            voornaam[i] = document.getElementById("spelervn" + i).innerHTML;
                        }

                        for (i=1; i<=11; i++) {
                            ii = fmt00(i);
                            document.write('<div class="rij">');
                            for (j=1; j<=11; j++) {
                                jj = fmt00(j);
                                document.write('<div class="veld" id="veld' + ii + jj + '"></div>');
                            }
                            document.write('</div>');
                        }

                        drawRondjes(blauw, "rondblauw");
                        drawRondjes(geel, "rondgeel");
                        drawRondjes(groen, "rondgroen");
                        drawRondjes(rood, "rondrood");
                        drawRondjes(wit, "rondwit");

                        drawPinnetjes(1, blauw0, "#04f");
                        drawPinnetjes(2, geel0, "#e2c300");  // was: "#ffdc00"
                        if (nsplr >= 3) { drawPinnetjes(3, groen0, "green"); }
                        if (nsplr >= 4) { drawPinnetjes(4, rood0, "#c80000"); }

                    </script>
                </div>
            </div>
            <div id="zij-kolom">
                <?php div_speler_img($pad, "b", $spelery[3], 3); ?>
                <div id="dobbelbox">
                <div id="dobbelkader">
                    <p id="dobbelbeurt">dobbelbox</p>
                    <img id="dobbelsteen" src="<?php echo $pad ?>/afbeeldingen/dobbelstenen/dice13.png" alt="dobbelsteen">
                    <p><button id="dobbelen" onclick="dobbelen('<?php echo $pad ?>')">dobbelen</button></p>
                </div>
                </div>
                <?php div_speler_img($pad, "o", $spelery[4], 4); ?>
            </div>
        </div>

        <p id="beurt" style="display:none"><?php echo $beurt ?></p>

        <script>
            // kleur0 = "geel"; // init[user];
            // alert ("kleur0 = " + kleur0);
            // pars1 = get_pars1(kleur0);
            // console.log("kleur = " + kleur0);
            // console.log("beurt = " + pars1['beurt']);
            // console.log("nsplr = " + pars1['nsplr']);
            // console.log("user = " + pars1['user']);

            // for (i=1; i<=pars1['nsplr']; i++) {
            //     pars2 = get_pars2(i);
            //     console.log("spelerid[" + i + "] = " + pars2['spelerid']);
            //     console.log("voornaam[" + i + "] = " + pars2['voornaam']);
            // }  
        </script>


    <!-- ************************************************************************************* -->


        <?php echo '<script>var socket = io("http://' . $server . ':3000/game");</script>' ?>
        <!-- <script>var socket = io('http://192.168.2.84:3000/game');</script> -->

        <script>

            room = document.getElementById("kamer").innerHTML;
            game = document.getElementById("spel").innerHTML;
            user = document.getElementById("speler").innerHTML;

            // var socket = io('http://192.168.2.84:3000/game');
            var gameData = {room: room, game: game, user: user};
            socket.emit('join room', gameData);
 
            socket.on('game init', function(init){
                var spelerid2 = new Array;
                var voornaam2 = new Array;

                console.log(init);
                console.log(init[user]);
                console.log(init['active']);

                // ---------------------------------------

                kleur0 = init[user];
                beurt = init['active'] + 1;
                pars1 = get_pars1(kleur0);
                console.log("kleur = " + kleur0);
                console.log("beurt = " + beurt);
                console.log("nsplr = " + pars1['nsplr']);
                console.log("user = " + pars1['user']);
                for (i=1; i<=pars1['nsplr']; i++) {
                    pars2 = get_pars2(i);
                    console.log("spelerid[" + i + "] = " + pars2['spelerid']);
                    console.log("voornaam[" + i + "] = " + pars2['voornaam']);
                    spelerid2[i] = pars2['spelerid'];
                    voornaam2[i] = pars2['voornaam'];
                }

                display_beurt(beurt, pars1['nsplr'], pars1['user'], spelerid2, voornaam2);
            });

            socket.on('game state', function(gamestate){
                        gamestate
            });
            socket.on('game turn', function(turn){
                if(turn == 1){
                    document.getElementById("turns").innerHTML = "U bent aan de beurt..."
                } else if (turn == 0) {
                    document.getElementById("turns").innerHTML = "Wacht op uw beurt..."
                } else if (turn == 2) {
                    document.getElementById("turns").innerHTML = "Spel is afgelopen."
                }
            });
            function makeMove(moveData) {
                socket.emit('game move', moveData)
            };
        </script>
    </body>
</html>
