var app = require('express')();
var mysql = require('mysql');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gamesAvailable = ['bke'];
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
        socket.join(room);
        console.log("room: " + gData.room);
        console.log('game: ' + gData.game);
        socket["username"] = gData.user;

        // LOAD INITIAL GAMSTATE FROM DATABASE
        if(globalGameState[room] == null){
            globalGameState[room] = [];
            globalGameState[room]['users'] = [];
            globalGameState[room]['gamestate'] = [[0,0,0],[0,0,0],[0,0,0]]
            console.log("init: " + globalGameState[room]['gamestate']);
            console.log("test: " + globalGameState[room]['gamestate'][1][1])
        }
       if(globalGameState[room]['users'].length < 2) {
           if(globalGameState[room]['users'].indexOf(gData.user) < 0) {
               console.log("user not found, adding: " + gData.user);
               globalGameState[room]['users'].push(gData.user);
            } else {
            console.log("continuing with users: " + globalGameState[room]['users'])
            }
            if (globalGameState[room]['users'].length == 2){
                globalGameState[room]["active"] = randomUser(2);
                console.log(globalGameState[room]["active"]);
                console.log("full! starting game with users: " + globalGameState[room]['users']);
                var sendTo = connectedUsers[globalGameState[room]["users"][globalGameState[room]["active"]]];
                console.log(sendTo);
                io.to(`${sendTo}`).emit('game turn', 1);
            }
        } else {
           console.log(gData.user + " added as spectator")
       }

        // 
    });
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



