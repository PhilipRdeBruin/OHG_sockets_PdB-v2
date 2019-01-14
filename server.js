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

io.on('connection', function(socket){
    socket.on('set game', function(game){
        console.log("game set: " + game)
        // Gets join room request
        socket.on('join room', function(room){
            var gamestate = [];
            var rId = room;
            room = game + room;
            socket.join(room)
            console.log('user connected to room: ' + room);
            db.query('SELECT gamestate FROM '+ game + ' WHERE id='+ rId)
            .on('result', function(data){
                gamestate = JSON.parse(data['gamestate']);
            })
            .on('end', function(){
            io.to(room).emit('game state', gamestate);
            });

            // Gets game input
            socket.on('game input', function(msg){
                if(gamesAvailable.indexOf(game)<0) {
                    game = "default"
                }
                console.log(msg);
                db.query(`SELECT gamestate FROM ${game} WHERE id=${rId}`)
                .on('result', function(data){
                    gamestate = JSON.parse(data['gamestate']);
                })
                .on('end', function(){
                var ruleSet = require ('./rules_' + game + '.js');
                ruleSet.testingGame(gamestate);
                ruleSet.gameMove(gamestate, msg, db, room, io);               
                delete require.cache[require.resolve('./rules_' + game + '.js')];
                });                
            });
        });
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});