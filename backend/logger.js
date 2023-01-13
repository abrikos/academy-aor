const path = require('path');
const clc = require("cli-color");
Object.defineProperty(global, '__stack', {
    get: function () {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) {
            return stack;
        };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

Object.defineProperty(global, '__line', {
    get: function () {
        return __stack[1].getLineNumber();
    }
});


module.exports = function (...args) {
    console.log(
        clc.yellow(path.basename(__stack[1].getFileName()) + ':' + __stack[1].getLineNumber())
    )
    for(const arg of args){
        console.log(arg)
    }
};