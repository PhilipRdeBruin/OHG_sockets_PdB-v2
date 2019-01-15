var app = require('express')();
var mysql = require('mysql');
var http = require('http').Server(app);
var io = require('socket.io')(http);
// Games Available Template = Game Name: [Player Count, Initial Game State, Extra player input per turn]
var gamesAvailable = { bke: [2, "[[0,0,0],[0,0,0],[0,0,0], 0]", 0], example: []};
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
        socket["room"] = room;
        var playerAmount = gamesAvailable[gData.game][0];
        socket.join(room);
        console.log("room: " + gData.room);
        console.log(gamesAvailable[gData.game]);
        socket["username"] = gData.user;

        // SET UP INITIAL GAMESTATE
        if(globalGameState[room] == null){
            globalGameState[room] = [];
            globalGameState[room]['users'] = [];
            globalGameState[room]['count'] = 0;
            globalGameState[room]['gamestate'] = gamesAvailable[gData.game][1];
            globalGameState[room]['game'] = gData.game;
            console.log("init: " + globalGameState[room]['gamestate']);
            console.log("test: " + JSON.parse(globalGameState[room]['gamestate']));
        } else if(globalGameState[room]["active"] != null){
                var sendTo = connectedUsers[globalGameState[room]["users"][globalGameState[room]["active"]]];
                io.to(`${sendTo}`).emit('game turn', 1);
        } 
        if(globalGameState[room] != null) {
            io.to(room).emit('game state', JSON.parse(globalGameState[room]['gamestate']));
            if (globalGameState[room]["gamestate"][3][0] == "gameEnd"){
                io.to(room).emit('game turn', 2);
            }
        }
        // SET UP INITIAL USERS
        if(globalGameState[room]['users'].length < playerAmount) {
            if(globalGameState[room]['users'].indexOf(gData.user) < 0) {
               console.log("user not found, adding: " + gData.user);
               globalGameState[room]['users'].push(gData.user);
            }
            if (globalGameState[room]['users'].length == playerAmount){
                globalGameState[room]["active"] = randomUser(playerAmount);
                console.log("full! starting game with users: " + globalGameState[room]['users']);
                var sendTo = connectedUsers[globalGameState[room]["users"][globalGameState[room]["active"]]];
                io.to(`${sendTo}`).emit('game turn', 1);
            }
        }
    });

    // PROCESS GAME MOVE
    socket.on('game move', function(move){
        room = socket.room;
        if(globalGameState[room]["users"][globalGameState[room]["active"]] == socket.username) {

            // GAME SPECIFIC MOVE
            var ruleSet = require ('./rules_' + globalGameState[room]['game'] + '.js');
            ruleSet.gameMove(globalGameState, room, move);  
            delete require.cache[require.resolve('./rules_' + globalGameState[room]['game'] + '.js')];
            delete ruleSet; 
            console.log("by: " + socket.username);
            io.to(room).emit('game state', JSON.parse(globalGameState[room]['gamestate']));
            console.log(globalGameState["bke1"]);
            console.log(globalGameState["bke2343"]);

            // END OF MOVE - SWAP PLAYER
            if (globalGameState[room]['count'] < gamesAvailable[globalGameState[room]['game']][2]) {
                globalGameState[room]['count']++
            } else {
                globalGameState[room]['count'] = 0;
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
            if (JSON.parse(globalGameState[room]["gamestate"])[3][0] == "gameEnd"){
                globalGameState[room]['active'] = -1;
                io.to(room).emit('game turn', 2);
                
                var ruleSet = require ('./rules_' + globalGameState[room]['game'] + '.js');
                ruleSet.gameEnd(socket, room, globalGameState); 
                delete require.cache[require.resolve('./rules_' + globalGameState[room]['game'] + '.js')];
                delete ruleSet; 
            }
            
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