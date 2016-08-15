'use strict'
/**
 * Controller, Singleton
 */
let Controller = {
    row: 20,
    model: []
};

/**
 * higher-order function to warp scanner
 */
const scannerMaker = function(scaner) {
    return function(x, y, count, playerFlag, continueFlag) {
        if (continueFlag) {
            if (Controller.model[x][y] == playerFlag) {
                count += 1;
                if (count === 5) {
                    Controller.win = true;
                } else {
                    scaner(x, y, count, playerFlag, continueFlag);
                }
            } else {
                return false;
            }
        } else {
            if (Controller.model[x][y] == playerFlag) {
                count += 1;
                continueFlag = true;
                scaner(x, y, count, playerFlag, continueFlag);
            } else {
                scaner(x, y, count, playerFlag, continueFlag);
            }
        }
    }
}

// make scaner using function composition
const scanX = scannerMaker(function(x, y, count, playerFlag, continueFlag) {
    scanX(x + 1, y, count, playerFlag, continueFlag)
});
const scanY = scannerMaker(function(x, y, count, playerFlag, continueFlag) {
    scanY(x, y + 1, count, playerFlag, continueFlag)
});
const scanXY = scannerMaker(function(x, y, count, playerFlag, continueFlag) {
    scanXY(x + 1, y + 1, count, playerFlag, continueFlag)
});
const scanYX = scannerMaker(function(x, y, count, playerFlag, continueFlag) {
    scanYX(x + 1, y - 1, count, playerFlag, continueFlag)
});

Controller.init = function(row) {
    this.row = row || this.row;
    this.model = Array.from(Array(this.row + 7)).map(() => Array.from(Array(this.row + 7)));
    // register event
    this.emitter.on("addChess", this.onAddChess.bind(this));
};

Controller.isWin = function(row, col, flag) {
    // scan recursively 
    scanX(row - 4, col, 0, flag, false);
    scanY(row, col - 4, 0, flag, false);
    scanXY(row - 4, col - 4, 0, flag, false);
    scanYX(row - 4, col + 4, 0, flag, false)
    if (Controller.win) {
    		Controller.win = false;
        return true;
    } else {
        return false;
    }
}

Controller.reset = function() {
	this.model = Array.from(Array(this.row + 7)).map(() => Array.from(Array(this.row + 7)));
}

/**
 * event callback
 */
Controller.onAddChess = function(row, col, flag) {
    if (!this.model[row + 4][col + 4]) {
        this.model[row + 4][col + 4] = Number(flag)
        this.emitter.emit("viewAddChess", row, col)
         // judge if player wins
        if (this.isWin(row + 4, col + 4, flag)) {
            if (flag) {
                alert("White wins!")
            } else {
                alert("Black wins!")
            }
            this.reset();
            this.emitter.emit("reset")
        }
        return;
    }
    return false;
}

module.exports = Controller;
