console.log("executing BKE ruleset");

//var exports = module.exports = {};



function randomUser(){
    var r = Math.random();
    if(r<0.5) {
        user = 1;
        gUser = "O";
    } else {
        user = 2;
        gUser = "X";
    }
}
exports.testingGame = function (x) {
    console.log(x);
}

    // First user
var user = 0
var gUser = ""

exports.gameMove = function (gamestate, msg, db, room, io) {
    db.query('SELECT user FROM bke WHERE id=1')
    .on('result', function(data){
        user = JSON.parse(data['user']);
        console.log('user from database: ' + user)
    })
    .on('end', function(){
        console.log("user before if: " + user)
        if(ruleSet(msg, gamestate).indexOf("Used space")<0){
            if(user == 0){
                console.log("random user")
                randomUser();
            } else if (user == 1){
                console.log("u was 1")
                user = 2;
                gUser = "X";
            } else {
                console.log("user else")
                user = 1;
                gUser = "O";
            }
            console.log("user after if: " + user)
            db.query(`UPDATE bke SET user = '${user}' WHERE id=1`)
            gamestate[msg[0]][msg[1]] = gUser;
            var nSDB = JSON.stringify(gamestate);
            db.query(`UPDATE bke SET gamestate = '${nSDB}' WHERE id=1`)
            console.log('message in room ' + room + ': ' + msg);
        } else {
            console.log(ruleSet(msg, gamestate));
        }
            io.to(room).emit('game state', gamestate);
        if(winCon(gamestate).indexOf("gameFull")>=0){
            io.to(room).emit('game msg', '00');
            io.to(room).emit('game msg', '01');
            io.to(room).emit('game msg', '02');
            io.to(room).emit('game msg', '10');
            io.to(room).emit('game msg', '11');
            io.to(room).emit('game msg', '12');
            io.to(room).emit('game msg', '20');
            io.to(room).emit('game msg', '21');
            io.to(room).emit('game msg', '22');
            db.query(`UPDATE bke SET user = 0 WHERE id=1`);
            db.query(`UPDATE bke SET gamestate = '[[0,0,0],[0,0,0],[0,0,0]]' WHERE id=1`);
        } else if(winCon(gamestate).indexOf("gameEnd")>=0){
            io.to(room).emit('game msg', winCon(gamestate)[2]);
            io.to(room).emit('game msg', winCon(gamestate)[3]);
            io.to(room).emit('game msg', winCon(gamestate)[4]);
            db.query(`UPDATE bke SET user = 0 WHERE id=1`);
            db.query(`UPDATE bke SET gamestate = '[[0,0,0],[0,0,0],[0,0,0]]' WHERE id=1`);
        }
    })
}

function ruleSet(msg, gamestate) {
    var breaches = [];
    // RULE: Can't overwrite used space
    if(gamestate[msg[0]][msg[1]] === 0) {
        // Legal move
    } else {
        breaches.push("Used space")
    }
    return breaches
}

function winCon(gamestate) {
    var breaches = [];
    // Win condition
    if(gamestate[0][0] == gamestate[0][1] && gamestate[0][1] == gamestate[0][2] && gamestate[0][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("00")
        breaches.push("01")
        breaches.push("02")
    } else if(gamestate[1][0] == gamestate[1][1] && gamestate[1][1] == gamestate[1][2] && gamestate[1][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("10")
        breaches.push("11")
        breaches.push("12")
    } else if(gamestate[2][0] == gamestate[2][1] && gamestate[2][1] == gamestate[2][2] && gamestate[2][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("20")
        breaches.push("21")
        breaches.push("22")
    } else if(gamestate[0][0] == gamestate[1][0] && gamestate[1][0] == gamestate[2][0] && gamestate[2][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("00")
        breaches.push("10")
        breaches.push("20")
    } else if(gamestate[0][1] == gamestate[1][1] && gamestate[1][1] == gamestate[2][1] && gamestate[0][1] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("01")
        breaches.push("11")
        breaches.push("21")
    } else if(gamestate[0][2] == gamestate[1][2] && gamestate[1][2] == gamestate[2][2] && gamestate[2][2] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("02")
        breaches.push("12")
        breaches.push("22")    
    } else if(gamestate[0][0] == gamestate[1][1] && gamestate[1][1] == gamestate[2][2] && gamestate[0][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("00")
        breaches.push("11")
        breaches.push("22")
    } else if(gamestate[0][2] == gamestate[1][1] && gamestate[1][1] == gamestate[2][0] && gamestate[2][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("02")
        breaches.push("11")
        breaches.push("20")
    }
    // Game full: End condition
    if(gamestate[0].indexOf(0)>=0 || gamestate[1].indexOf(0)>=0 || gamestate[2].indexOf(0)>=0){

    } else {
        breaches.push("gameFull");
    }
    return breaches;
}