var lh = location.hash.split('#')[1];
var lhValues = lh.split('&');
var room = lhValues[1];
var user = lhValues[2];
var game = lhValues[0];
var gamesocket = io('http://localhost:3000/game');
var gameData = {room: room, game: game, user: user};
gamesocket.emit('join room', gameData);

gamesocket.on('game state', function(gamestate){
    renderGame(gamestate);
});
gamesocket.on('game result', function(gamestate){
    console.log("result")
});
gamesocket.on('game loss', function(gamestate){
    document.getElementById("win").innerHTML = "loss";
});
gamesocket.on('game win', function(gamestate){
    document.getElementById("win").innerHTML = "win!";
});

function renderGame(gamestate){
    for(i=0;i<7;i++){
        for(j=0;j<gamestate[i].length;j++){
            document.getElementById(i + "" + j).classList.add(gamestate[i][j])
        }
    }
}
gamesocket.on('game turn', function(turn){
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
    gamesocket.emit('game move', moveData)
};