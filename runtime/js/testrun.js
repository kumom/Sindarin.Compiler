var {dlsym, ccall, cint, cstring, cset16, cset32} = require('./build/Release/clin.node')

function libc(funcName) {
    var fp = dlsym(funcName);
    return function() {
        return ccall.apply(null,
            [fp].concat(Array.prototype.slice.call(arguments))); };
}

var c = {
    write: libc("write"),
    printf: libc("printf"),
    malloc: libc("malloc")
};

var sys = {
    socket: libc("socket"), bind: libc("bind"), listen: libc("listen"),
    accept: libc("accept"),
    htons: libc("htons"),
    SOCK_STREAM: cint(1), AF_INET: cint(2), INADDR_ANY: cint(0)
};

var str = "low-level\n";
var cret = c.write(cint(1), cstring(str), cint(str.length));

var fmt = "ret = %d\n";
c.printf(cstring(fmt), cret);

var sockfd = sys.socket(sys.AF_INET, sys.SOCK_STREAM, cint(0));
c.printf(cstring(fmt), sockfd)

var addr = c.malloc(cint(2 * 8));
cset16(addr, 0, sys.AF_INET);
cset16(addr, 1, sys.htons(cint(4400)));
cset32(addr, 1, sys.INADDR_ANY);

cret = sys.bind(sockfd, addr, cint(2 * 8));
c.printf(cstring(fmt), cret);

var listen = dlsym("listen");
ccall(listen, sockfd, cint(5));

var addrlen = c.malloc(cint(8));
var clientfd = sys.accept(sockfd, addr, addrlen);

c.write(clientfd, cstring(str), cint(str.length));

