<?php 
    // $server = "localhost";
    $server = "192.168.2.6";        // PC: De Knolle
    // $server = "192.168.2.9";        // laptop: De Knolle
    // $server = "192.168.2.12";       // laptop: De Ljurk
    // $server = "192.168.1.32";       // laptop: Ingrid en Martin
    // $server = "192.168.2.84";       // laptop: code gorilla
?>

<!doctype html>
<html>
  <head>
    <title>OHG - BKE</title>
    <style>
        #bke {
            width:330px;
            height:330px;
        }
        .field {
            width:100px;
            height:100px;
            float:left;
            border-style: solid;
            border-width: 5px;
            cursor:pointer;
            font-family:Arial;
            padding:30px;
            padding-top:20px;
            font-size:40px;
            box-sizing:border-box;
        }
    </style>
</head>
<body>
    <div id="server" style="display:none"><?php echo $server ?></div>
    <script>server = document.getElementById("server").innerHTML;</script>
    <h1 id="turns">Waiting for turn...</h1>
    <div id="bke">
        <div id="00" class="field" onclick="bkeClick(this)"></div>
        <div id="01" class="field" onclick="bkeClick(this)"></div>
        <div id="02" class="field" onclick="bkeClick(this)"></div>
        <div id="10" class="field" onclick="bkeClick(this)"></div>
        <div id="11" class="field" onclick="bkeClick(this)"></div>
        <div id="12" class="field" onclick="bkeClick(this)"></div>
        <div id="20" class="field" onclick="bkeClick(this)"></div>
        <div id="21" class="field" onclick="bkeClick(this)"></div>
        <div id="22" class="field" onclick="bkeClick(this)"></div>
    </div>
    <ul id="messages"></ul>
    <?php echo '<script src="http://' . $server . ':3000/socket.io/socket.io.js"></script>'; ?>
    <script>
        var room = "<?php echo $_POST['act_spel'] ?>";
        var user = "<?php echo $_POST['speler'] ?>";
        console.log(room + ' ' + user);
        var game = "bke";
        var socket = io('http://' + server + ':3000/game');
        var gameData = {room: room, game: game, user: user};
        socket.emit('join room', gameData);
        socket.on('game win', function(msg){
            document.getElementById(msg).style.backgroundColor = "green";
        });
        socket.on('game loss', function(msg){
            document.getElementById(msg).style.backgroundColor = "red";
        });
        socket.on('game result', function(msg){
            document.getElementById(msg).style.backgroundColor = "grey";
        });
        socket.on('game state', function(gamestate){
            var nodes = document.getElementById("bke").childNodes;
            for(i=1;i<(nodes.length);i=i+2) {
                var y = nodes[i].id;
                if(gamestate[y[0]][y[1]]){
                    document.getElementById(y).innerHTML = gamestate[y[0]][y[1]]
                } else {
                    document.getElementById(y).innerHTML = "";
                }
            }
        });
        socket.on('game turn', function(turn){
            if(turn == 1){
                document.getElementById("turns").innerHTML = "Make a move!"
            } else if (turn == 0) {
                document.getElementById("turns").innerHTML = "Waiting for turn.."
            } else if (turn == 2) {
                document.getElementById("turns").innerHTML = "Game ended"
            }
        });
        socket.on('test', function(msg){
            console.log(msg);
        });
        function bkeClick(x) {
            var id = x.id;
            socket.emit('game move', id)
        };
    </script>
</body>
</html>