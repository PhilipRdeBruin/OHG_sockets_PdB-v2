<!doctype html>
<html>
  <head>
    <title>Vier op een R</title>
    <head>  
        <style>
            #voer {
                width:700px;
                height:600px;
                background-color:blue;
                border-style:outset;
                border-color:lightblue;
                border-width: 5px;
            }
            .col {
                width:100px;
                height:600px;
                float:left;
                background-color:blue;
                padding-top:10px;
                box-sizing:border-box;
                cursor:pointer;
            
            }
            .col:hover{
                background-color:darkblue;
            }
            .field {
                width:80px;
                height:80px;
                margin:10px;
                margin-top:15px;
                background-color:white;
                border-radius:40px;
                box-shadow: inset 0px 0px 10px rgba(0,0,0,0.2);
                border-style: inset;
                box-sizing:border-box;
                
            }
            .red {
                background-color:red;
                box-shadow: inset 0px 0px 10px rgba(0,0,0,0.4);
            }
            .yellow {
                background-color:yellow;
                box-shadow: inset 0px 0px 10px rgba(0,0,0,0.4);
            }
            h1{
                position:absolute;
                font-family: Arial;
                font-size:200px;
                top:50px;
                left:150px;
            }
        </style>
    </head>
    <body>
        <h2 id="turns">Waiting for turn...</h1>
        <h1 id="win"></h1>
        <div id="voer">
            <div id="c0" class="col" onclick="move(this)">
                <div id="05" class="field"></div>
                <div id="04" class="field"></div>
                <div id="03" class="field"></div>
                <div id="02" class="field"></div>
                <div id="01" class="field"></div>
                <div id="00" class="field"></div>
            </div>
            <div id="c1" class="col" onclick="move(this)">
                <div id="15" class="field"></div>
                <div id="14" class="field"></div>
                <div id="13" class="field"></div>
                <div id="12" class="field"></div>
                <div id="11" class="field"></div>
                <div id="10" class="field"></div>
            </div>
            <div id="c2" class="col" onclick="move(this)">
                <div id="25" class="field"></div>
                <div id="24" class="field"></div>
                <div id="23" class="field"></div>
                <div id="22" class="field"></div>
                <div id="21" class="field"></div>
                <div id="20" class="field"></div>
            </div>
            <div id="c3" class="col" onclick="move(this)">
                <div id="35" class="field"></div>
                <div id="34" class="field"></div>
                <div id="33" class="field"></div>
                <div id="32" class="field"></div>
                <div id="31" class="field"></div>
                <div id="30" class="field"></div>
            </div>
            <div id="c4" class="col" onclick="move(this)">
                <div id="45" class="field"></div>
                <div id="44" class="field"></div>
                <div id="43" class="field"></div>
                <div id="42" class="field"></div>
                <div id="41" class="field"></div>
                <div id="40" class="field"></div>
            </div>
            <div id="c5" class="col" onclick="move(this)">
                <div id="55" class="field"></div>
                <div id="54" class="field"></div>
                <div id="53" class="field"></div>
                <div id="52" class="field"></div>
                <div id="51" class="field"></div>
                <div id="50" class="field"></div>
            </div>
            <div id="c6" class="col" onclick="move(this)">
                <div id="65" class="field"></div>
                <div id="64" class="field"></div>
                <div id="63" class="field"></div>
                <div id="62" class="field"></div>
                <div id="61" class="field"></div>
                <div id="60" class="field"></div>
            </div>
        </div>
   
    <script src="http://142.93.227.54:3000/socket.io/socket.io.js"></script>
    <script>
        var room = "<?php echo $_POST['act_spel'] ?>";
        var user = "<?php echo $_POST['speler'] ?>";
        console.log(room + ' ' + user);
        var game = "voer";
        var socket = io('http://142.93.227.54:3000/game');
        var gameData = {room: room, game: game, user: user};
        socket.emit('join room', gameData);
        
        socket.on('game state', function(gamestate){
            renderGame(gamestate);
        });
        socket.on('game result', function(gamestate){
            console.log("result")
        });
        socket.on('game loss', function(gamestate){
            document.getElementById("win").innerHTML = "loss";
        });
        socket.on('game win', function(gamestate){
            document.getElementById("win").innerHTML = "win!";
        });

        function renderGame(gamestate){
            for(i=0;i<7;i++){
                for(j=0;j<gamestate[i].length;j++){
                    document.getElementById(i + "" + j).classList.add(gamestate[i][j])
                }
            }
        }
        socket.on('game turn', function(turn){
            if(turn == 1){
                document.getElementById("turns").innerHTML = "Make a move!"
            } else if (turn == 0) {
                document.getElementById("turns").innerHTML = "Waiting for turn.."
            } else if (turn == 2) {
                document.getElementById("turns").innerHTML = "Game ended"
            }
        });
        function move(x) {
            var moveData = x.id[1];
            socket.emit('game move', moveData)
        };
    </script>
</body>
</html>