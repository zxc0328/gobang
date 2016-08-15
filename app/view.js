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
        this.gameOverFlag = false;
        this.playerFlag = false;
        this.initAddChess();
        this.initUI();
        this.emitter.on("viewAddChess", this.renderChess.bind(this))
        this.emitter.on("gameOver", this.gameOver.bind(this))
        this.emitter.on("resetView", this.reset.bind(this))
        this.renderChessBoard();
    }
    gameOver() {}
    initUI() {}
    reset () {
    	this.gameOverFlag = false;
       this.playerFlag = false;
    	this.emitter.emit("resetModel");
    }
    initAddChess(row, col, playerFlag) {
    	this.emitter.emit("addChess", row, col, playerFlag);
    }
    renderChess() {}
    renderChessBoard() {}
}

module.exports = View;
