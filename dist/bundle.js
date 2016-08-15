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
	var view = __webpack_require__(2);
	var controller = __webpack_require__(3);
	var emitter = __webpack_require__(4);

	function init(config) {
			view.emitter = emitter;
	    controller.emitter = emitter;
	    view.init(config.root, config.row, config.width);
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

	'use strict'
	var controller = __webpack_require__(3);

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

/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict"
	/**
	 * util
	 *
	 * A event emmiter, serves as the bridge between view and controller
	 */

	var emitter = (function() {
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
	        	 console.log("emit" + event, listeners)
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

	module.exports = emitter


/***/ }
/******/ ]);