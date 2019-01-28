// VARS
var lh = location.hash.split('#')[1];
var lhValues = lh.split('&');
var room = lhValues[1];
var user = lhValues[2];
var game = lhValues[0];
var gamesocket = io('http://localhost:3000/game');
var gameData = {room: room, game: game, user: user};
var localGameState = [];
var activeTile = false;
var firstPlayer = false;

// SOCKETS
gamesocket.emit('join room', gameData);
gamesocket.on('game state', function(gamestate){
    try {
        if (gamestate === "init") {
            init();
        } else {
            localGameState = gamestate;
            renderGame(localGameState);
        }
    }
    catch(err){console.log(err)}
});
gamesocket.on('game turn', function(turn){
    if(turn == 1){
        firstPlayer = true;
        document.getElementById("turns").innerHTML = "Make a move!"
    } else if (turn == 0) {
        document.getElementById("turns").innerHTML = "Waiting for turn.."
    } else if (turn == 2) {
        document.getElementById("turns").innerHTML = "Game ended"
    }
});

// FUNCTIONS
function makeMove(moveData) {
    gamesocket.emit('game move', moveData)
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
var possibleMoves = [];
function chessMove(el) {
    var y = parseInt(el.id[0]);
    var x = parseInt(el.id[1]);
    var piece = new chessPiece(localGameState[y+1][x]).getType();
    var myColor;
    if(localGameState[0][0].white == user || (localGameState[0][0].white == "player" && firstPlayer)) {
        myColor = white;
    } else {
        myColor = black;
    } 
    if(piece && !activeTile && myColor == piece.color){
        activeTile = el;
        el.classList.add("highlight")
        possibleMoves = piece.move();
        for (i=0;i<possibleMoves.length;i++) {
            var temp = possibleMoves[i].y + "" + possibleMoves[i].x;
            document.getElementById(temp).classList.add("possible");
        }
    } else if (el == activeTile) {
        activeTile.classList.remove("highlight")
        activeTile = false;
        for (i=0;i<possibleMoves.length;i++) {
            var temp = possibleMoves[i].y + "" + possibleMoves[i].x;
            document.getElementById(temp).classList.remove("possible");
        }
    }
}