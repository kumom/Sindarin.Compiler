/** 
 * @oops this has to be here rather than in the prelude because 
 * Clin's cbuffer/cbuffer_ depend on it 
 */

class Buffer {
    constructor(p, sz) { this._p = p; this.length = sz; }
    static isBuffer(o) { return o instanceof Buffer; }
}

export default Buffer;