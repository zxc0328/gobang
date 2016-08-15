/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Bootstrap
	 */
	const DOMView = __webpack_require__(2);
	const controller = __webpack_require__(3);
	const util = __webpack_require__(5);

	function init(config) {
	    controller.emitter = util.emitter;
	    const domView = new DOMView(config.root, config.row, config.width, util.emitter);
	    controller.init(config.row);
	}

	init({
	    row: 10,
	    width: 60,
			root: ".main"
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * DOM implementation of the View
	 */
	'use strict'
	const controller = __webpack_require__(3);
	const View = __webpack_require__(4);

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

	    initUI() {
	        const button = document.querySelector(".button");
	        button.addEventListener("click", this.reset.bind(this));
	    }
	    
	    gameOver(flag) {
	        const text = document.querySelector(".message .text");
	        this.gameOverFlag = true;
	        if (flag) {
	            text.innerHTML = "White Wins";
	        } else {
	            text.innerHTML = "Black Wins";
	        }

	    }

	    /**
	     * implement add chesscallback
	     */
	    initAddChess() {
	        document.querySelector(".main").addEventListener("click", () => {
	            if (event.target.className === "dot" && !this.gameOverFlag) {
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
	    reset(flag) {
	        super.reset();
	        document.querySelector(".message .text").innerHTML = "";
	        const parent = document.querySelector(this.root);
	        Array.from(document.querySelectorAll(".chess")).map((node) => {
	            parent.removeChild(node)
	        })
	    }

	}

	module.exports = DOMView


/***/ },
/* 3 */
/***/ function(module, exports) {

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
	    this.emitter.on("resetModel", this.reset.bind(this));
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
	            this.emitter.emit("gameOver", flag)
	        }
	        return;
	    }
	    return false;
	}

	module.exports = Controller;


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict"
	/**
	 * util
	 *
	 * An event emmiter, serves as the bridge between view and controller
	 */

	var util = {};


	util.emitter = (function() {
	    var listeners = {};

	    return {
	        on: function(event, fn) {
	            event = '$' + event;
	            (listeners[event] || (listeners[event] = [])).push(fn)
	        },

	        off: function(event, fn) {
	            event = '$' + event
	            if (!arguments.length) {
	                listeners = {}
	            } else {
	                const cbs = listeners[event]
	                if (cbs) {
	                    if (!fn) {
	                        listeners[event] = null
	                    } else {
	                        for (let i = 0, l = cbs.length; i < l; i++) {
	                            const cb = cbs[i]
	                            if (cb === fn || cb.fn === fn) {
	                                cbs.splice(i, 1)
	                                break
	                            }
	                        }
	                    }
	                }
	            }
	        },

	        emit: function(event) {
	            event = '$' + event
	            let cbs = listeners[event]
	            if (cbs) {
	                const args = [].slice.call(arguments, 1)
	                cbs = cbs.slice()
	                for (let i = 0, l = cbs.length; i < l; i++) {
	                    cbs[i].apply(this, args)
	                }
	            }
	        }
	    }


	})();

	module.exports = util


/***/ }
/******/ ]);