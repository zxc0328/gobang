/**
 * Bootstrap
 */
var view = require("./view");
var controller = require("./controller");
var emitter = require("./util");

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
