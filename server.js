// SOCKET.IO VARIABLES
var mysql = require('mysql');
var io = require('socket.io');
var server = io.listen(3000);

// DATABASE VARIABLES
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'ohg'
})

// GAME SERVER VARIABLES & FUNCTIONS
// Games Available Template = Game Name: [Player Count, Initial Game State, Extra player input per turn]
var gamesAvailable = {
    bke: [2, "[[0,0,0],[0,0,0],[0,0,0], 0]", 0],
    example: []
};
var globalGameState = [];
var connectedUsers = [];
function randomUser(amount) {
    return Math.floor(Math.random() * amount)
}

// USER CONNECT
server.on('connection', function(socket) {
    // JOIN ROOM
    socket.on('join room', function(gData) {
        if(Object.keys(gamesAvailable).indexOf(gData.game) !== -1){
            connectedUsers[gData.user] = socket.id;
            var room = gData.game + gData.room;
            socket["game"] = gData.game;
            socket["room"] = room;
            var playerAmount = gamesAvailable[gData.game][0];
            socket.join(room);
            socket["username"] = gData.user;
            console.log(socket.username + " joined room '"+ room + "'")

            // SET UP INITIAL GAMESTATE
            if (globalGameState[room] == null) {
                globalGameState[room] = [];
                globalGameState[room]['users'] = [];
                globalGameState[room]['count'] = 0;
                globalGameState[room]['gamestate'] = gamesAvailable[gData.game][1];
                globalGameState[room]['game'] = gData.game;
            } else if (globalGameState[room]["active"] != null) {
                var sendTo = connectedUsers[globalGameState[room]["users"][globalGameState[room]["active"]]];
                server.to(`${sendTo}`).emit('game turn', 1);
            }
            if (globalGameState[room] != null) {
                server.to(room).emit('game state', JSON.parse(globalGameState[room]['gamestate']));
                if (globalGameState[room]["gamestate"][3][0] == "gameEnd") {
                    server.to(room).emit('game turn', 2);
                }
            }
            // SET UP INITIAL USERS
            if (globalGameState[room]['users'].length < playerAmount) {
                if (globalGameState[room]['users'].indexOf(gData.user) < 0) {
                    globalGameState[room]['users'].push(gData.user);
                }
                if (globalGameState[room]['users'].length == playerAmount) {
                    globalGameState[room]["active"] = randomUser(playerAmount);
                    console.log("game full, room '" + room + "' started with players: " + globalGameState[room]['users']);
                    var sendTo = connectedUsers[globalGameState[room]["users"][globalGameState[room]["active"]]];
                    server.to(`${sendTo}`).emit('game turn', 1);
                }
            }
        }
    });

    // PROCESS GAME MOVE
    socket.on('game move', function(move) {
        if(Object.keys(gamesAvailable).indexOf(socket.game) !== -1){
            room = socket.room;
            if (globalGameState[room]["users"][globalGameState[room]["active"]] == socket.username) {

                // GAME SPECIFIC MOVE
                var ruleSet = require('./rules_' + globalGameState[room]['game'] + '.js');
                ruleSet.gameMove(globalGameState, room, move);
                server.to(room).emit('game state', JSON.parse(globalGameState[room]['gamestate']));
                
                // END OF MOVE - SWAP PLAYER
                if (globalGameState[room]['count'] < gamesAvailable[globalGameState[room]['game']][2]) {
                    globalGameState[room]['count']++
                } else {
                    globalGameState[room]['count'] = 0;
                    socket.emit('game turn', 0);
                    if (globalGameState[room]["active"] < (globalGameState[room]["users"].length - 1)) {
                        globalGameState[room]["active"]++
                    } else {
                        globalGameState[room]["active"] = 0;
                    }
                    var sendTo = connectedUsers[globalGameState[room]["users"][globalGameState[room]["active"]]];
                    server.to(`${sendTo}`).emit('game turn', 1);
                }
                if (JSON.parse(globalGameState[room]["gamestate"])[3][0] == "gameEnd") {
                    globalGameState[room]['active'] = -1;
                    server.to(room).emit('game turn', 2);
                    console.log("game in room '" + room + "' ended")
                    ruleSet.gameEnd(socket, room, globalGameState);
                }
                delete require.cache[require.resolve('./rules_' + globalGameState[room]['game'] + '.js')];
            }
        }
    });
    // DISCONNECT
    socket.on('disconnect', function() {
        delete connectedUsers[socket.username]
    });
});