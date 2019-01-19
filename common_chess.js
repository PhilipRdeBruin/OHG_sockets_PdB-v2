console.log('_____________ chessJS _____________');
var white = 1;
var black = 0;
class chessPiece {
    constructor(obj, type, xPos, yPos, color){
        if (obj != null){
            obj && Object.assign(this, obj);
        } else {
            this.type = type;
            this.color = color;
            this.xPos = xPos;
            this.yPos = yPos;
        }
    };
    getType(){
        switch(this.type) {
            case "pawn":
                return new pawn(this);
            default:
                console.log("oopsie")
        }
    }
}
class pawn extends chessPiece {
    constructor(obj, type, xPos, yPos, color){
        super(obj, type, xPos, yPos, color)
        this.unicode = 0x2659;
    }
    move(){
        console.log("move")
    }
}
class rook extends chessPiece {
    constructor(obj, type, xPos, yPos, color){
        super(obj, type, xPos, yPos, color)
        this.unicode = 0x2656;
    }
    move(){
        console.log("move")
    }
}
class knight extends chessPiece {
    constructor(obj, type, xPos, yPos, color){
        super(obj, type, xPos, yPos, color)
        this.unicode = 0x2658;
    }
    move(){
        console.log("move")
    }
}
class bishop extends chessPiece {
    constructor(obj, type, xPos, yPos, color){
        super(obj, type, xPos, yPos, color)
        this.unicode = 0x2657;
    }
    move(){
        console.log("move")
    }
}
class king extends chessPiece {
    constructor(obj, type, xPos, yPos, color){
        super(obj, type, xPos, yPos, color)
        this.unicode = 0x2654;
    }
    move(){
        console.log("move")
    }
}
class queen extends chessPiece {
    constructor(obj, type, xPos, yPos, color){
        super(obj, type, xPos, yPos, color)
        this.unicode = 0x2655;
    }
    move(){
        console.log("move")
    }
}
exports.sv_fillGameState = function(){
    return fillGameState();
}

function fillGameState() {
    var gs = [
        [{white: "player"}],
        [new rook(null, "rook", 0, 0, black), new knight(null, "knight", 1, 0, black), new bishop(null, "bishop", 2, 0, black), new queen(null, "queen", 3, 0, black), new king(null, "king", 4, 0, black), new bishop(null, "bishop", 5, 0, black), new knight(null, "knight", 6, 0, black), new rook(null, "rook", 7, 0, black)],
        [new pawn(null, "pawn", 0, 1, black), new pawn(null, "pawn", 1, 1, black), new pawn(null, "pawn", 2, 1, black), new pawn(null, "pawn", 3, 1, black), new pawn(null, "pawn", 4, 1, black), new pawn(null, "pawn", 5, 1, black), new pawn(null, "pawn", 6, 1, black), new pawn(null, "pawn", 7, 1, black)],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [new pawn(null, "pawn", 0, 6, white), new pawn(null, "pawn", 1, 6, white), new pawn(null, "pawn", 2, 6, white), new pawn(null, "pawn", 3, 6, white), new pawn(null, "pawn", 4, 6, white), new pawn(null, "pawn", 5, 6, white), new pawn(null, "pawn", 6, 6, white), new pawn(null, "pawn", 7, 6, white)],
        [new rook(null, "rook", 0, 7, white), new knight(null, "knight", 1, 7, white), new bishop(null, "bishop", 2, 7, white), new queen(null, "queen", 3, 7, white), new king(null, "king", 4, 7, white), new bishop(null, "bishop", 5, 7, white), new knight(null, "knight", 6, 7, white), new rook(null, "rook", 7, 7, white)]
    ];
    return gs;
}