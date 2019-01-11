console.log("executing BKE ruleset");

//var exports = module.exports = {};



function randomUser(){
    var r = Math.random();
    console.log(r);
    if(r<0.5) {
        return "O";
    } else {
        return "X";
    }
}
exports.testingGame = function (x) {
    console.log(x);
}

    // First user
//var user = randomUser();

exports.gameMove = function (gamestate, msg) {
    gamestate[msg[0]][msg[1]] = 'X';
    return gamestate;
}

function ruleSet(x) {
    var breaches = [];
    // RULE: Can't overwrite used space
    if(typeof x == 'undefined' || gamestate[x.id[0]][x.id[1]] === 0) {
        // Legal move
    } else {
        breaches.push("Used space")
    }
    return breaches
}

function winCon() {
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