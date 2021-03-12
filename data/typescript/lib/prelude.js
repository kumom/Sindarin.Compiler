/**
 * Runtime polyfills for mujs
 */


if (typeof console == 'undefined') {
    global.console = {
        log: print,
        error: print
    }
}

if (!Object.prototype.assign) {
    Object.prototype.assign = (o, ...os) => {
        for (let w of os)
            for (let k in w) o[k] = w[k];
        return o;
    }
}