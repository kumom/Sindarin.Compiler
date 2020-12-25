if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    const path = (0||require)('path');

    module.exports = require(path.join(__dirname, 'build/Release/clin.node'));
}
else if (typeof _clin !== 'undefined') {  /* mujs */
    module.exports = _clin;

    // expose Buffer polyfill
    const Buffer = require('./buffer').default;
    global.Buffer = Buffer;
    /** @todo probably should copy it..? */
    module.exports.cbuffer = (b) => b._p;
    module.exports.cbuffer_ = (ptr, sz) => new Buffer(ptr, _clin.cint_(sz));
}
else throw new Error('no Clin implementation found');


const {dlsym, ccall} = module.exports;

function libc(name) {
    var f = dlsym(name);
    return (...args) => ccall(f, ...args);
}

module.exports.libc = libc;

module.exports.c = {
    malloc: libc("malloc")
};