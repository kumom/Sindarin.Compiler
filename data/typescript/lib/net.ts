// This is a minimal polyfill of Node.js's lib/net.js
// for net-server.ts; TCP only.
// Uses the clib native interface to make C calls.

import { EventEmitter } from './events';


class Server extends EventEmitter {
    _handle: TCP

    private constructor(optionsOrCallback: ServerOptions | ((c: Socket) => void),
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
        try {
            h.bind(port); h.listen(5);
        }
        catch (e) { this.emit('error', e); }
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

declare function createServer(connectCallback: (c: Socket) => void): Server;
declare function createServer(options: ServerOptions, connectCallback: (c: Socket) => void): Server;




class Socket {
    fd: c.int

    constructor(fd: c.int) { this.fd = fd; }
}

class TCP {
    fd: c.int

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
            throw new Error("bind");  /** @todo strerror */
        /** @todo free addr */
    }

    listen(backlog: number) {
        var cret = sys.listen(this.fd, cint(backlog));
        if (cint_(cret) !== 0)
            throw new Error("listen");  /** @todo strerror */
    }

    accept(): Socket {
        var addr = c.malloc(cint(2 * 8)),
            addrlen = c.malloc(cint(8)),
            clientfd = sys.accept(this.fd, addr, addrlen);

        if (cint_(clientfd) < 0)
            throw new Error("accept");
        return new Socket(clientfd);
        /** @todo free addr, addrlen */
    }
}

namespace c {
    export abstract class prim { }
    export abstract class int extends prim { }
    export abstract class pvoid extends prim { }
    export abstract class pchar extends pvoid { }
    export const malloc = libc("malloc");
}

declare function libc(name: string): (...args: c.prim[]) => c.prim
declare function cint(n: number): c.int
declare function cint_(n: c.int): number
declare function cset16(p: c.pvoid, offset: number, v: c.prim): void
declare function cset32(p: c.pvoid, offset: number, v: c.prim): void
declare function csetw(p: c.pvoid, offset: number, v: c.prim): void

namespace sys {
    export const socket = libc("socket");
    export const bind = libc("bind");
    export const listen = libc("listen");
    export const accept = libc("accept");
    export const htons = libc("htons");
    export const SOCK_STREAM = cint(1);
    export const AF_INET = cint(2);
    export const INADDR_ANY = cint(0);
}


export { Server, createServer }