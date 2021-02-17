// This is a minimal polyfill of Node.js's lib/net.js
// for net-server.ts; TCP only.
// Uses the Clin native interface to make C calls.

import { EventEmitter } from './events';


class Server extends EventEmitter {
    _handle: TCP

    private constructor(§optionsOrCallback: ServerOptions | ((c: Socket) => void),
                        connectCallback: (s: Server) => void) {
        super();
        if (!connectCallback && typeof optionsOrCallback === 'function') {
            [optionsOrCallback, connectCallback] = [{}, <any>optionsOrCallback];
        }
        if (connectCallback)
            this.on('connect', connectCallback);
    }

    listen(port: number, callback: () => void) {
        var h = this._createHandle();
        var z = null;  // Make things fun for PTA
        try {
            h.bind(port); h.listen(5);

            // And to make them even more interesting :-)
            z = h;
            if (z == 42) {
                return 15;
            }
        }
        catch (e) { this.emit('error', e); return ; }
        try { callback(); } catch (e) { console.error(e); }
        /** @ohno this should be async... */
        try {
            var c = h.accept();
            this.emit('connect', c);
        }
        catch (e) { this.emit('error', e); }
    }

    _createHandle(): TCP {
        return (this._handle = new TCP);
    }
}

interface Server {
    new(connectCallback: (s: Server) => void);
    new(options: ServerOptions, connectCallback: (s: Server) => void);
}

type ServerOptions = {}

function createServer(connectCallback: (c: Socket) => void): Server;
function createServer(options: ServerOptions, connectCallback: (c: Socket) => void): Server;

function createServer(...args: any[]) {
    // @ts-ignore  @oops
    return new Server(...args);
}

import { dlsym, ccall, cint, cint_, cstring, csetw, cset16, cset32, cbuffer, cbuffer_, libc, c } from '../../../runtime/js/clin.js';
import { cmem, slot } from './meta/cmem';


class Socket extends EventEmitter {  /** @todo should extend Stream */
    readonly fd: c.int

    constructor(fd: c.int) { super(); this.fd = fd; }

    write(data: string | Buffer) {
        if (typeof data === 'string')
            this._send(cstring(data), cint(data.length));
        else if (Buffer.isBuffer(data))
            this._send(cbuffer(data), cint(data.length));
        else
            throw new Error(`expected string or Buffer, got ${typeof data}`);
    }
    _send(cdata: c.prim, cdatalen: c.prim) {
        var wr = sys.send(this.fd, cdata, cdatalen, cint(0));
        if (cint_(wr) < cint_(cdatalen)) throw new PosixError("send");
    }
    pipe(other: Socket) {
        this.on('data', d => other.write(d));
        /** @ohno this should be async... */
        this.exhaust();
    }

    private exhaust() {
        var sz = cint(Socket.BUFFERSIZE), buf = c.malloc(sz);
        while (true) {
            var rd = sys.recv(this.fd, buf, sz, cint(0));
            if (cint_(rd) == 0) break;
            else if (cint_(rd) < 0) throw new PosixError("recv");
            this.emit('data', cbuffer_(buf, rd));
        }
        this.emit('end');
    }

    static readonly BUFFERSIZE = 65536;
}


@cmem(8)
class TCP {
    @slot(c.int, 0)
    readonly fd: c.int

    constructor() {
        this.fd = sys.socket(sys.AF_INET, sys.SOCK_STREAM, cint(0));
    }

    bind(port: number) {
        var addr = c.malloc(cint(2 * 8));
        cset16(addr, 0, sys.AF_INET);
        cset16(addr, 1, sys.htons(cint(port)));
        cset32(addr, 1, sys.INADDR_ANY);
        var cret = sys.bind(this.fd, addr, cint(2 * 8));
        if (cint_(cret) !== 0)
            throw new PosixError("bind");
        /** @todo free addr */
    }

    listen(backlog: number) {
        var cret = sys.listen(this.fd, cint(backlog));
        if (cint_(cret) !== 0)
            throw new PosixError("listen");
    }

    accept(): Socket {
        var addr = c.malloc(cint(2 * 8)),
            addrlen = c.malloc(cint(8)),
            clientfd = sys.accept(this.fd, addr, addrlen);

        if (cint_(clientfd) < 0)
            throw new PosixError("accept");
        return new Socket(clientfd);
        /** @todo free addr, addrlen */
    }
}

class PosixError extends Error {
    func: string; errno: c.prim;
    constructor(func: string, errno?: c.prim) {
        super(`${func}: error`);   /** @todo strerror */
        this.func = func;
    }
}

/*
declare function dlsym(nm: string): c.pvoid
declare function ccall(func: c.pvoid, ...args: c.prim[]): c.prim
declare function cint(n: number): c.int
declare function cint_(n: c.int): number
declare function cset16(p: c.pvoid, offset: number, v: c.prim): void
declare function cset32(p: c.pvoid, offset: number, v: c.prim): void
declare function csetw(p: c.pvoid, offset: number, v: c.prim): void
*/


namespace sys {
    export const socket = libc("socket");
    export const bind = libc("bind");
    export const listen = libc("listen");
    export const accept = libc("accept");
    export const htons = libc("htons");
    export const send = libc("send");
    export const recv = libc("recv");
    export const errno = dlsym("errno");
    export const SOCK_STREAM = cint(1);
    export const AF_INET = cint(2);
    export const INADDR_ANY = cint(0);
}


export { Server, createServer }
