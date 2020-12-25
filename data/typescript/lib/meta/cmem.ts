import { c, cint, cgetw, csetw } from '../../../../runtime/js/clin';


interface CMem { readonly __cmem__: c.pvoid; __cmemv__: c.pvoid }
type Constructor = new (...args: any[]) => {}

function cmem(size: number) {
    const desc = {
        get(this: CMem) { return (this.__cmemv__ ||= c.malloc(cint(size))); }
    }
    return <T extends Constructor>(cls: T) => {
        Object.defineProperty(cls.prototype, "__cmem__", desc);
    };

    /*
    class extends cls implements CMem {
        __cmem__ = (console.log('malloc', size), c.malloc(cint(size)));
        constructor(...args: any[]) { console.log(this.__cmem__); super(...args); }
    };*/
}

function slot(type: any, offset: number) {
    const desc = {
        get(this: CMem) { return cgetw(this.__cmem__, offset); },
        set(this: CMem, v: c.prim) { csetw(this.__cmem__, offset, v); }
    };
    return (proto: object, name: string) =>
        Object.defineProperty(proto, name, desc);
}


export { CMem, cmem, slot }