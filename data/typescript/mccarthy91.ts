function mc91_iter(n: number) {
    var c = 1;
    while (c != 0) {
        c--;
        if (n > 100) { n -= 10; }
        else { n += 11; c += 2; }
    }
}

function mc91_rec(n: number) {
    if (n > 100) return n - 10;
    else return mc91_rec(mc91_rec(n + 11));
}
