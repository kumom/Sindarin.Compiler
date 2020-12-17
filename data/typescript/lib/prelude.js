
if (typeof console == 'undefined') {
    global.console = {
        log: print,
        error: print
    }
}
