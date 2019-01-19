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
    var nodes = document.getElementById("chess").childNodes;
    console.log(nodes);
    for(i=1;i<(nodes.length);i=i+2) {
        var y = nodes[i].id;
        if(gamestate[y[0]][y[1]]){
            var unicode = gamestate[y[0]][y[1]].unicode;
            if (!gamestate[y[0]][y[1]].color) {
                unicode += 6;
            }
            document.getElementById(y).innerHTML = String.fromCharCode(unicode);
        } else {
            document.getElementById(y).innerHTML = "";
        }
    }
}