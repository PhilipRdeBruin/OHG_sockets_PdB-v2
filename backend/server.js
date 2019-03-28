// SOCKET.IO VARIABLES
var mysql = require('mysql');
var io = require('socket.io');
var server = io.listen(3000);
var gameserver = server.of('/game');
var queueserver = server.of('/queue');
var chatserver = server.of('/chat');

// DATABASE VARIABLES
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'ohg'
})

var dbx = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'oudhollandsgamen'
})
var tabelx = 'actievespelletjes';


// GAME SERVER VARIABLES & FUNCTIONS
// Games Available Template = Game Name: [Player Count, Initial Game State, Extra player input per turn]
var gamesAvailable = {
    bke: [2, '[[0,0,0],[0,0,0],[0,0,0]]', 0],
    bke2: [2, '[[0,0,0],[0,0,0],[0,0,0]]', 0],
    mastermind: [2, '[]', 0],
    mejn: [4, '[]', 0],
    mejn2: [2, '[]', 0],
    mejn3: [3, '[]', 0],
    mejn4: [4, '[]', 0],
    chess: [2, '\"init\"', 0],
    voer: [2, "[[],[],[],[],[],[],[]]", 0],
    template: [2, "[[],[],[]]", 0]
};

var globalGameState = [];
var globalQueueData = [];
var chatHistory = [];
var connectedUsers = [];
function randomUser(amount) {
    return Math.floor(Math.random() * amount)
}

// USER CONNECT
gameserver.on('connection', function(socket) {
    // JOIN ROOM
    socket.on('join room', function(gData) {
        if(Object.keys(gamesAvailable).indexOf(gData.game) !== -1){
            connectedUsers[gData.user] = socket.id;
            var room = gData.game + gData.room;
            var roomnr = gData.room;
            socket["game"] = gData.game;
            socket["room"] = room;
            var playerAmount = gamesAvailable[gData.game][0];
            socket.join(room);
            socket["username"] = gData.user;

            // SET UP INITIAL GAMESTATE
            if (globalGameState[room] == null) {
                globalGameState[room] = [];
                globalGameState[room]['users'] = [];
                globalGameState[room]['count'] = 0;
                globalGameState[room]['gamestate'] = gamesAvailable[gData.game][1];
                globalGameState[room]['game'] = gData.game;
                globalGameState[room]['result'] = [];
            } else if (globalGameState[room]["active"] != null) {
                var sendTo = connectedUsers[globalGameState[room]["users"][globalGameState[room]["active"]]];
                gameserver.to(`${sendTo}`).emit('game turn', 1);
            }
            if (globalGameState[room] != null) {
                gameserver.to(room).emit('game state', JSON.parse(globalGameState[room]['gamestate']));
                if (globalGameState[room]["result"][0] == "gameEnd") {
                    gameserver.to(room).emit('game turn', 2);
                    var ruleSet = require('./game_rules/rules_' + globalGameState[room]['game'] + '.js');
                    ruleSet.gameEnd(socket, room, globalGameState, server);
                    delete require.cache[require.resolve('./games_rules/rules_' + globalGameState[room]['game'] + '.js')];
                }
            }
            // SET UP INITIAL USERS
            if (globalGameState[room]['users'].length < playerAmount) {
                if (globalGameState[room]['users'].indexOf(gData.user) < 0) {
                    globalGameState[room]['users'].push(gData.user);
                }
                if (globalGameState[room]['users'].length == playerAmount) {
                    globalGameState[room]["active"] = randomUser(playerAmount);
                    
                    // SETTING UP PLAYER ROLES/INIT
                    var ruleSet = require('./game_rules/rules_' + globalGameState[room]['game'] + '.js');
                    globalGameState[room]["init"] = ruleSet.gameInit(globalGameState, room);
                    delete require.cache[require.resolve('./game_rules/rules_' + globalGameState[room]['game'] + '.js')];
                    
                    gameserver.to(room).emit('game init', globalGameState[room]["init"]);
                    console.log("game full, room '" + room + "' started with players: " + globalGameState[room]['users'] + ", starting player: " + globalGameState[room]["active"]);
                    var sendTo = connectedUsers[globalGameState[room]["users"][globalGameState[room]["active"]]];
                    gameserver.to(`${sendTo}`).emit('game turn', 1);
                }
            }
        }
    });

    // PROCESS GAME MOVE
    socket.on('game move', function(move) {
        if(Object.keys(gamesAvailable).indexOf(socket.game) !== -1){
            room = socket.room;
            spel = socket.game;
            roomnr = room.replace(spel, "") * 1;
            // console.log("nu in server.js / socket.on: room = " + room + ", spel = " + spel + ", roomnr = " + roomnr);
            if (globalGameState[room]["users"][globalGameState[room]["active"]] == socket.username) {

                // GAME SPECIFIC MOVE
                var ruleSet = require('./game_rules/rules_' + globalGameState[room]['game'] + '.js');
                ruleSet.gameMove(globalGameState, room, move);

                // RETURN GAMESTATE TO ALL USERS IN ROOM
                gameserver.to(room).emit('game state', JSON.parse(globalGameState[room]['gamestate']));

                // BACKUP GAME STATE TO DATABASE
                var dbData = false;
                db.query(`SELECT id FROM ${socket.game} WHERE room = "${room}"`)
                .on('result', function(data){
                    dbData = data;
                })
                .on('end', function(){
                    if(dbData){
                        db.query(`UPDATE ${socket.game} SET gamestate = '${globalGameState[room]['gamestate']}' WHERE room = "${room}"`)
                    } else {
                        db.query(`INSERT INTO ${socket.game} (room, gamestate, winner) VALUES ("${room}", '${globalGameState[room]['gamestate']}', 0)`); 
                    }
                })

                // eigen probeersel om naar database OudHollandsGamen te schrijven...
                    dbx.query(`SELECT * FROM ` + tabelx + ` WHERE id = "${roomnr}"`)
                    .on('result', function(data){
                        dbData = data;
                    })
                    .on('end', function(){
                        if(dbData){
                            dbx.query(`UPDATE ` + tabelx + ` SET gamestate = '${globalGameState[room]['gamestate']}' WHERE id = "${roomnr}"`)
                        }
                    })
                // .....

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
                    gameserver.to(`${sendTo}`).emit('game turn', 1);
                }
                // DETECT GAME ENDING

                // gs = JSON.parse(globalGameState[room]['gamestate']);
                // l = gs.length - 1;
                // tp = gs[l][0];
                console.log("nu in server.js / socket.on: glob-gs[0] = " + globalGameState[room]["result"][0] + ", tp = " + tp);
                if (globalGameState[room]["result"][0] == "gameEnd") {
                    console.log("Nu: Einde spel gedetecteerd in server.js");
                    gameserver.to(room).emit('game turn', 2);
                    ruleSet.gameEnd(socket, room, globalGameState, server);
                    db.query(`UPDATE ${socket.game} SET winner = '${globalGameState[room]["winner"]}' WHERE room = "${room}"`);
                    // eigen probeersel om naar database OudHollandsGamen te schrijven...
                        if (spel == "mastermind") {
                            console.log("Nu: Einde spel gedetecteerd in server.js/mastermind");
                            gs = globalGameState[room]['gamestate'];
                            l = gs.length - 1;
                            beurt = gs[l][1];
                            nzw = gs[l][8];
                            uit = (nzw == 5) ? beurt : beurt * -1;
                            // dbx.query(`UPDATE ` + tabelx + ` SET winnaar = '${uit}' WHERE id = "${roomnr}"`);
                            dbx.query(`UPDATE ` + tabelx + ` SET winnaar = '${globalGameState[room]["winner"]}' WHERE id = "${roomnr}"`);
                        } else {
                            dbx.query(`UPDATE ` + tabelx + ` SET winnaar = '${globalGameState[room]["winner"]}' WHERE id = "${roomnr}"`);
                        }
                        // .....
                    globalGameState[room]['active'] = -1;
                    console.log("game in room '" + room + "' ended");
                }
                delete require.cache[require.resolve('./game_rules/rules_' + globalGameState[room]['game'] + '.js')];
            }
        }
    });
    // DISCONNECT
    socket.on('disconnect', function() {
        delete connectedUsers[socket.username]
    });
});

/**
 * 
 * END OF GAMESERVER
 * 
 * START OF QUEUE SYSTEM
 * 
 */

queueserver.on('connection', function(socket) {
    socket.on('get players', function(game) {
        var count = [];
        if(globalQueueData[game] != null) {
            count = [game, Object.keys(globalQueueData[game]).length];
        } else {
            count = [game, 0];
        }
        socket.emit('player amount', count);
    });

    socket.on('join room', function(data) {
        var room = data.room;
        socket["room"] = room;
        socket["user"] = data.user;
        socket["available"] = data.available;
        if (globalQueueData[room] == null) {
            globalQueueData[room] = {};
        }
        socket.join(room);
        globalQueueData[room][data.user] = [data.user, socket.id, socket.available];
        queueserver.to(room).emit('queue', globalQueueData[room]);
    });

    socket.on('invite', function(invite) {
            invite.splice(invite.indexOf(socket.user), 1);
            invite.unshift(socket.user);
            for(i=0;i<invite.length;i++){
                globalQueueData[socket.room][invite[i]][2] = "unavailable"
                var sendTo = globalQueueData[socket.room][invite[i]][1];
                globalQueueData[socket.room][invite[i]][3] = invite;
                queueserver.to(`${sendTo}`).emit('invited', invite);
            }
            queueserver.to(socket.room).emit('queue', globalQueueData[socket.room]);
    });

    socket.on('select game', function(data) {
        var invite = data["friends"];
        invite.splice(invite.indexOf(socket.user), 1);
        invite.unshift(socket.user);
        for(i=0;i<invite.length;i++){
            var sendTo = globalQueueData[socket.room][invite[i]][1];
            globalQueueData[socket.room][invite[i]][3] = invite;
            queueserver.to(`${sendTo}`).emit('invited', [invite, data.data]);
        }
    });

    socket.on('response', function(res) {
        if(res[0]){
            var g = res[1];
            for(i=0;i<g.length;i++){
                if(globalQueueData[socket.room][g[i]] != null && globalQueueData[socket.room][g[i]][1] != null){
                    var sendTo = globalQueueData[socket.room][g[i]][1]
                    queueserver.to(`${sendTo}`).emit('confirm', socket.user);
                }
            }
        } else {
            globalQueueData[socket.room][socket.user][2] = "available"
            var g = res[1];
            for(i=0;i<g.length;i++){
                if(globalQueueData[socket.room][g[i]] != null && globalQueueData[socket.room][g[i]][1] != null){
                    var sendTo = globalQueueData[socket.room][g[i]][1]
                    queueserver.to(`${sendTo}`).emit('decline', socket.user);
                }
            }
        }
        queueserver.to(socket.room).emit('queue', globalQueueData[socket.room]);
    });

    socket.on('to game', function() {
        socket["togame"] = true;
    });

    socket.on('disconnect', function() {
        if(socket.room != null){
            if(dc = globalQueueData[socket.room][socket.user][3]){
                for(i=0;i<dc.length;i++){
                    if(globalQueueData[socket.room][dc[i]] != null && globalQueueData[socket.room][dc[i]][1] != null && !socket.togame){
                        var sendTo = globalQueueData[socket.room][dc[i]][1];
                        queueserver.to(`${sendTo}`).emit('decline', socket.user);
                    }
                }
            }
            delete globalQueueData[socket.room][socket.user];
            queueserver.to(socket.room).emit('queue', globalQueueData[socket.room]);          
        }
    });
});

/**
 * 
 * END OF QUEUE SYSTEM
 * 
 * START OF CHAT SERVER
 * 
 */

chatserver.on('connection', function(socket) {
    socket.on('join room', function(data) {
        socket["user"] = data.user;
        var room = data.room;
        socket["chatroom"] = room;
        socket.join(room);
        if(chatHistory[room] != null){
            socket.emit('chat history', chatHistory[room]);
        } else {
            socket.emit('chat history', []);
        }
    });

    socket.on('msg', function(msg){
        if(chatHistory[socket.chatroom] == null){
            chatHistory[socket.chatroom] = [];
        }
        msg = `<b>${socket.user}:</b> &nbsp;${msg}`
        chatHistory[socket.chatroom].push(msg);
        chatserver.in(socket.chatroom).emit('msg', msg);
    });

    socket.on('disconnect', function() {
    });
});