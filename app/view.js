/**
 * Generic View Class
 */
'use strict'

class View {
    constructor(root, row, width, emitter) {
    		this.emitter = emitter;
        this.row = row || 20;
        this.width = width || 30;
        this.root = root;
        this.playerFlag = false;
        this.initAddChess();
        this.emitter.on("viewAddChess", this.renderChess.bind(this))
        this.emitter.on("reset", this.reset.bind(this))
        this.renderChessBoard();
    }
    reset () {}
    initAddChess(row, col, playerFlag) {
    	this.emitter.emit("addChess", row, col, playerFlag);
    }
    renderChess() {}
    renderChessBoard() {}
}

module.exports = View;
