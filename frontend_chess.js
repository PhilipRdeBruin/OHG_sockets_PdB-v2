// VARS
var lh = location.hash.split('#')[1];
var lhValues = lh.split('&');
var room = lhValues[1];
var user = lhValues[2];
var game = lhValues[0];
var socket = io('http://localhost:3000');
var gameData = {room: room, game: game, user: user};
var localGameState = [];

// SOCKETS
socket.emit('join room', gameData);
socket.on('game state', function(gamestate){
    try {
        if (gamestate === "init") {
            init();
        } else {
            renderGame(gamestate);
        }
    }
    catch(err){console.log(err)}
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

// FUNCTIONS
function makeMove(moveData) {
    socket.emit('game move', moveData)
};

function init(){
    localGameState = fillGameState();
    renderGame(localGameState);
}

function renderGame(gamestate){
    if(gamestate[0][0].white !== user && gamestate[0][0].white !== "player") {
        document.getElementById("chess").style.transform = "rotate(180deg)";
        var fields = document.getElementsByClassName("field");
        for(i=0;i<fields.length;i++){
            fields[i].classList.add("flip");
        }
    }
    console.log(gamestate)
    for(i=1;i<gamestate.length;i++){
        for(j=0;j<gamestate[i].length;j++) {
            var yx = (i-1) + "" + j;
            if(gamestate[i][j]) {
                var unicode = gamestate[i][j].unicode;
                if (!gamestate[i][j].color) {
                    unicode += 6;
                }
                document.getElementById(yx).innerHTML = String.fromCharCode(unicode);
            } else {
                document.getElementById(yx).innerHTML = "";
            }
        }
    }
}