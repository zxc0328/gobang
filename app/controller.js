'use strict'
/**
 * Controller
 */

var controller = {
    row: 20,
    model: []
};

controller.init = function(row) {
    this.row = row || this.row;
    this.model = Array.from(Array(this.row-1)).map(() => Array.from(Array(this.row-1)));
    /**
     * register event
     */
    this.emitter.on("addChess", this.onAddChess);
};

controller.isWin = function() {

}

/**
 * event callback
 */
controller.onAddChess = function(row, col, flag) {
	console.log("view add chess!!")
    if (!controller.model[row][col]) {
    		controller.model[row][col] = Number(flag)
        controller.emitter.emit("viewAddChess", row, col)
        // judge if player wins
        if (false) {
            controller.emitter.emit("gameOver", 0)
        }
        return;
    }
    return false;
}

module.exports = controller;
