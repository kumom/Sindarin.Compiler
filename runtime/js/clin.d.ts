export function dlsym(nm: string): c.pvoid;
export function ccall(func: c.pvoid, ...args: c.prim[]): c.prim;
export function cint(n: number): c.int;
export function cint_(n: c.int): number;
export function cstring(s: string): c.pchar;
export function cbuffer(b: Buffer): c.pvoid;
export function cbuffer_(p: c.pvoid, sz: c.int): Buffer;
export function csetw(p: c.pvoid, offset: number, v: c.prim): void;
export function cset16(p: c.pvoid, offset: number, v: c.prim): void;
export function cset32(p: c.pvoid, offset: number, v: c.prim): void;
export function cgetw(p: c.pvoid, offset: number): c.prim;
export function cget16(p: c.pvoid, offset: number): c.prim;
export function cget32(p: c.pvoid, offset: number): c.prim;


export namespace c {
    export abstract class prim { }
    export abstract class int extends prim { }
    export abstract class pvoid extends prim { }
    export abstract class pchar extends pvoid { }
    export function malloc(n: int): pvoid;
}

export function libc(name: string): (...args: c.prim[]) => c.prim;