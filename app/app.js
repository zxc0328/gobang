/**
 * Bootstrap
 */
const DOMView = require("./DOMView");
const controller = require("./controller");
const util = require("./util");

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
