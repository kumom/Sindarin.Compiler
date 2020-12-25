//import { cint, dlsym } from 

/**
 * A very lean polyfill for Node.js's Buffer.
 * The content is stored in a C pointer `_p`; this class is used by
 * low-level Node.js-like APIs to transfer data.
 * 
 * @oops this has to be here rather than in the prelude because 
 * Clin's cbuffer/cbuffer_ depend on it 
 */
class Buffer {
    constructor(p, sz) { this._p = p; this.length = sz; }
    static isBuffer(o) { return o instanceof Buffer; }
}

export default Buffer;