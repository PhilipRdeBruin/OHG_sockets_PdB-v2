var app = require('express')();
var mysql = require('mysql');
var http = require('http').Server(app);
var io = require('socket.io')(http);
// Games Available Template = Game Name: [Player Count, Initial Game State]
var gamesAvailable = { bke: [2, [[0,0,0],[0,0,0],[0,0,0]]], example: []};
var globalGameState = [];
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'ohg'
})
var connectedUsers = [];

function randomUser(amount) {
    return Math.floor(Math.random() * amount)

}

// USER CONNECT
io.on('connection', function(socket){
    console.log('user connected: ' + socket.id);
    // JOIN ROOM
    socket.on('join room', function(gData){
        connectedUsers[gData.user] = socket.id;
        var room = gData.game + gData.room;
        var playerAmount = gamesAvailable[gData.game][0];
        socket.join(room);
        console.log("room: " + gData.room);
        console.log(gamesAvailable[gData.game]);
        socket["username"] = gData.user;

        // SET UP INITIAL GAMESTATE
        if(globalGameState[room] == null){
            globalGameState[room] = [];
            globalGameState[room]['users'] = [];
            globalGameState[room]['gamestate'] = gamesAvailable[gData.game][1];
            console.log("init: " + globalGameState[room]['gamestate']);
            console.log("test: " + globalGameState[room]['gamestate'][1][1])
        } else if(globalGameState[room]["active"] != null){
                var sendTo = connectedUsers[globalGameState[room]["users"][globalGameState[room]["active"]]];
                console.log(sendTo);
                io.to(`${sendTo}`).emit('game turn', 1);
        }
        // SET UP INITIAL USERS
        if(globalGameState[room]['users'].length < playerAmount) {
            if(globalGameState[room]['users'].indexOf(gData.user) < 0) {
               console.log("user not found, adding: " + gData.user);
               globalGameState[room]['users'].push(gData.user);
            } else {
            console.log("continuing with users: " + globalGameState[room]['users'])
            }
            if (globalGameState[room]['users'].length == playerAmount){
                globalGameState[room]["active"] = randomUser(playerAmount);
                console.log(globalGameState[room]["active"]);
                console.log("full! starting game with users: " + globalGameState[room]['users']);
                var sendTo = connectedUsers[globalGameState[room]["users"][globalGameState[room]["active"]]];
                console.log(sendTo);
                io.to(`${sendTo}`).emit('game turn', 1);
            }
        }
    });

    // PROCESS GAME MOVE
    socket.on('game move', function(move){
        room = Object.keys(io.sockets.adapter.sids[socket.id])[1];
        if(globalGameState[room]["users"][globalGameState[room]["active"]] == socket.username) {
            console.log('game move: ' + move);
            globalGameState[room]['gamestate'] += move;
            console.log(globalGameState[room]['gamestate']);
            console.log("by: " + socket.username);
            socket.emit('game turn', 0);
            if (globalGameState[room]["active"] < (globalGameState[room]["users"].length - 1)) {
                console.log("+1");
                globalGameState[room]["active"]++
            } else {
                console.log("to 0");
                globalGameState[room]["active"] = 0;
            }
            var sendTo = connectedUsers[globalGameState[room]["users"][globalGameState[room]["active"]]];
            console.log(sendTo);
            io.to(`${sendTo}`).emit('game turn', 1);
        
        }
    });
    // DISCONNECT
    socket.on('disconnect', function(){
        console.log('user disconnected');
        console.log('________________________________');
        delete connectedUsers[socket.username]
    });
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});



