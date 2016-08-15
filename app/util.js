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
