console.log("executing BKE ruleset");

exports.gameMove = function(globalGameState, room, move) {
    var player;
    var gamestate = JSON.parse(globalGameState[room]["gamestate"]);
    if (globalGameState[room]["active"] == 0) {
        player = "O"
    } else {
        player = "X"
    }
    if (ruleSet(move, gamestate)) {
        gamestate[move[0]][move[1]] = player;

    } else {
        globalGameState[room]["count"]--
    }
    gamestate[3] = winCon(gamestate, globalGameState[room]["active"]);
    gamestate = JSON.stringify(gamestate);
    globalGameState[room]["gamestate"] = gamestate;
    delete player;
    delete gamestate;
}

exports.gameEnd = function(socket, room, globalGameState) {
    socket.to(room).emit('game loss', JSON.parse(globalGameState[room]["gamestate"])[3][2]);
    socket.to(room).emit('game loss', JSON.parse(globalGameState[room]["gamestate"])[3][3]);
    socket.to(room).emit('game loss', JSON.parse(globalGameState[room]["gamestate"])[3][4]);

    socket.emit('game win', JSON.parse(globalGameState[room]["gamestate"])[3][2]);
    socket.emit('game win', JSON.parse(globalGameState[room]["gamestate"])[3][3]);
    socket.emit('game win', JSON.parse(globalGameState[room]["gamestate"])[3][4]);
}

function ruleSet(move, gamestate) {
    // RULE: Can't overwrite used space
    if (gamestate[move[0]][move[1]] === 0) {
        return 1
    } else {
        return 0
    }
}

function winCon(gamestate, user) {
    var breaches = [];
    // Win condition
    if (gamestate[0][0] == gamestate[0][1] && gamestate[0][1] == gamestate[0][2] && gamestate[0][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("00")
        breaches.push("01")
        breaches.push("02")
    } else if (gamestate[1][0] == gamestate[1][1] && gamestate[1][1] == gamestate[1][2] && gamestate[1][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("10")
        breaches.push("11")
        breaches.push("12")
    } else if (gamestate[2][0] == gamestate[2][1] && gamestate[2][1] == gamestate[2][2] && gamestate[2][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("20")
        breaches.push("21")
        breaches.push("22")
    } else if (gamestate[0][0] == gamestate[1][0] && gamestate[1][0] == gamestate[2][0] && gamestate[2][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("00")
        breaches.push("10")
        breaches.push("20")
    } else if (gamestate[0][1] == gamestate[1][1] && gamestate[1][1] == gamestate[2][1] && gamestate[0][1] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("01")
        breaches.push("11")
        breaches.push("21")
    } else if (gamestate[0][2] == gamestate[1][2] && gamestate[1][2] == gamestate[2][2] && gamestate[2][2] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("02")
        breaches.push("12")
        breaches.push("22")
    } else if (gamestate[0][0] == gamestate[1][1] && gamestate[1][1] == gamestate[2][2] && gamestate[0][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("00")
        breaches.push("11")
        breaches.push("22")
    } else if (gamestate[0][2] == gamestate[1][1] && gamestate[1][1] == gamestate[2][0] && gamestate[2][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("02")
        breaches.push("11")
        breaches.push("20")
    }
    // Game full: End condition
    if (gamestate[0].indexOf(0) >= 0 || gamestate[1].indexOf(0) >= 0 || gamestate[2].indexOf(0) >= 0) {

    } else {
        breaches.push("gameFull");
    }
    return breaches;
}