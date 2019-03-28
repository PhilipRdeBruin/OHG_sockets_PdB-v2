//
// TEMPLATE RULESET
//

// var user0; var user1;
// var userC = new Array;

exports.gameInit = function(globalGameState, room) {
    var users = {};
    user0 = globalGameState[room]["users"][0];
    user1 = globalGameState[room]["users"][1];
    console.log("user0 = " + user0 + ", user1 = " + user1);
    
    userC = user0.split("%");
    console.log("userC[0] = " + userC[0] + ", userC[1] = " + userC[1]);
    if(userC[1] == "codemaster") {
        // users[user0] = "codemaster";
        // users[user1] = "codekraker";
        globalGameState[room]["active"] = 0;
    } else {
        // users[user0] = "codekraker";
        // users[user1] = "codemaster";
        globalGameState[room]["active"] = 1;
    }
    return users;
}

exports.gameMove = function(globalGameState, room, move) {
    console.log(move);
    // GET current gamestate and active player
    var gamestate = move; //JSON.parse(globalGameState[room]["gamestate"]);
    // var currentPlayer = globalGameState[room]["active"]; 
    
    // if (currentPlayer == globalGameState[room]["users"][0]) {
    //     actsplr = currentPlayer;
    //     consplr = globalGameState[room]["users"][1];
    // } else {
    //     actsplr = globalGameState[room]["users"][1];
    //     consplr = currentPlayer;
    // }

    //  CHECK win condition (Fills globalGameState[room]["result"] with an ARRAY, 
    //  first value of array after game end HAS to be "gameEnd", leave empty for no game end)
    globalGameState[room]["result"] = winCon(globalGameState, room, gamestate);

    // SUBMIT new gamestate

    l = gamestate.length - 1;
    tp = gamestate[l][0];
    if (tp == 1 || tp == 3) {
        globalGameState[room]["count"]--;
    }

    // console.log("voor stringify:");
    // console.log(gamestate);
    gamestate = JSON.stringify(gamestate);
    // console.log("na stringify:");
    // console.log(gamestate);
    //
    globalGameState[room]["gamestate"] = gamestate;
}

exports.gameEnd = function(socket, room, globalGameState, server) {
    // globalGameState[room]["winner"] = socket.username // SET WINNER NAME HERE FOR DATABASE BACKUP
    // This gets executed when globalGameState[room]["result"][0] === "gameEnd", use this to send data to user, eg: winner, etc
}

function ruleSet(move, gamestate) {
    // You can use a function like this to check the game input against game rules, for exmaple
    // return 1 for valid input and 0 for invalid, and use this as an if(ruleSet){} around your game logic.
    // This can be used in any way though. 
}

function winCon(globalgs, room, gamestate) {
    // Function should handle all game ending events, wins or stalemates. Return array with first value being "gameEnd"
    var breaches = [];

    user0 = globalgs[room]["users"][0];
    user1 = globalgs[room]["users"][1];
    console.log("user0 = " + user0 + ", user1 = " + user1);
    
    userC = user0.split("%");

    console.log("binnen functie (winCon):  user0 = " + user0 + ", user1 = " + user1);
    console.log("binnen functie (winCon):  userC[1] = " + userC[1]);

    if (userC[1] == "codemaster") {
        consplr = user1.split("%");
        actsplr = user0.split("%");
    } else {
        consplr = user0.split("%");
        actsplr = user1.split("%");        
    }
    console.log("binnen functie (winCon):  consplr[0] = " + consplr[0] + ", actsplr[0] = " + actsplr[0]);

    // Win condition
    l = gamestate.length - 1;
    if (gamestate[l][8] == 5 || gamestate[l][1] == 10 && gamestate[l][0] == 4 || gamestate[l][0] == 9) {
        breaches.push("gameEnd");
        if (gamestate[l][8] == 5) {
            console.log("geraden...  winner = " + consplr[0]);
            breaches.push("winner = " + consplr[0]);
            globalgs[room]["winner"] = consplr[0];
        } else {
            console.log("niet geraden...");
            breaches.push("winner = " + actsplr[0]);
            globalgs[room]["winner"] = actsplr[0];
        }
    }
    return breaches;    
}
