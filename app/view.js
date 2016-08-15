'use strict'
var controller = require("./controller");

var view = {
	row: 20,
	width: 30,
	playFlag:false
};

/**
 * helper function
 */
var makeSquare = function() {
	var div = document.createElement("div");
	div.className = "square";
	return div;
}

var makeDot = function(row, col, width) {
	var div = document.createElement("div");
	div.className = "dot";
	div.style.position = "absolute";
	div.style.left = row*width - 15 + "px" 
	div.style.top = col*width - 15 + "px";
	div.dataset.row = row;
	div.dataset.col = col;
	return div;
}


/**
 * view method
 */

view.init = function (root, row, width) {
	this.root = root;
	this.row = row || this.row;
	this.width = width || this.width;
	this.initAddChess();
	this.emitter.on("viewAddChess", this.renderChess)
	this.render();
}

view.initAddChess = function() {
	document.querySelector(".main").addEventListener("click", () => {
		if (event.target.className === "dot") {
			console.log("click")
			this.emitter.emit("addChess", event.target.dataset.row, event.target.dataset.col, this.playerFlag);
		}
	})
}


/**
 * render logic
 */

view.renderChess = function(row, col) {
	console.log("render!!")
	var chess = document.createElement("div");
	chess.className = "chess";
	chess.style.position = "absolute";
	chess.style.left = row*(view.width) -20 + "px";
	chess.style.top = col*(view.width) - 20 + "px";
	if (view.playerFlag) {
		chess.className += " chess-opposite";	
	}
	view.playerFlag = !view.playerFlag
	document.querySelector(".main").appendChild(chess);
	
}

view.render = function () {
	var i;
	var j;
	var row;
	var fragment = document.createDocumentFragment();

	for (i=0;i<this.row;i++) {
		row = document.createElement("div");
		row.className = "row";
		for (j=0;j<this.row;j++) {
			row.appendChild(makeSquare())
		}
		fragment.appendChild(row);
	}

	for (i=1;i<this.row;i++) {
		for (j=1;j<this.row;j++) {
			fragment.appendChild(makeDot(i, j, this.width));
		}
	}
	document.querySelector(this.root).appendChild(fragment);
}

/**
 * register event callback
 */

module.exports = view