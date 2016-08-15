/**
 * DOM implementation of the View
 */
'use strict'
const controller = require("./controller");
const View = require("./View");

/**
 * helper function
 */
const makeSquare = function() {
    let div = document.createElement("div");
    div.className = "square";
    return div;
}

const makeDot = function(row, col, width) {
    let div = document.createElement("div");
    div.className = "dot";
    div.style.position = "absolute";
    div.style.left = row * width - 15 + "px"
    div.style.top = col * width - 15 + "px";
    div.dataset.row = row;
    div.dataset.col = col;
    return div;
}


class DOMView extends View {
		/**
		 * implement add chesscallback
		 */
    initAddChess() {
        document.querySelector(".main").addEventListener("click", () => {
            if (event.target.className === "dot") {
                super.initAddChess(event.target.dataset.row - 0, event.target.dataset.col - 0, this.playerFlag);
            }
        })
    }

    /**
     * implement render logic
     */
    renderChess(row, col) {
        let chess = document.createElement("div");
        chess.className = "chess";
        chess.style.position = "absolute";
        chess.style.left = row * (this.width) - 20 + "px";
        chess.style.top = col * (this.width) - 20 + "px";
        if (this.playerFlag) {
            chess.className += " chess-opposite";
        }
        this.playerFlag = !this.playerFlag
        document.querySelector(".main").appendChild(chess);
    }

    renderChessBoard() {
        let row;
        let fragment = document.createDocumentFragment();

        for (let i = 0; i < this.row; i++) {
            row = document.createElement("div");
            row.className = "row";
            for (let i = 0; i < this.row; i++) {
                row.appendChild(makeSquare())
            }
            fragment.appendChild(row);
        }

        for (let i = 1; i < this.row; i++) {
            for (let j = 1; j < this.row; j++) {
                fragment.appendChild(makeDot(i, j, this.width));
            }
        }
        document.querySelector(this.root).appendChild(fragment);
    }
    reset() {
    	const parent = document.querySelector(this.root);
    	Array.from(document.querySelectorAll(".chess")).map( (node) => { parent.removeChild(node)} )
    }

}

module.exports = DOMView
