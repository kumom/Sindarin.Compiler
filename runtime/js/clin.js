if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    const path = (0||require)('path');

    module.exports = require(path.join(__dirname, 'build/Release/clin.node'));
}
else if (typeof _clin !== 'undefined') {  /* mujs */
    import Buffer from './buffer';
    /** @todo probably should copy it..? */
    _clin.cbuffer = (b) => b._p;
    _clin.cbuffer_ = (ptr, sz) => new Buffer(ptr, _clin.cint_(sz));
    global.Buffer = Buffer;
    module.exports = _clin;
}
else throw new Error('no Clin implementation found');
