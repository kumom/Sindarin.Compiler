import moo from 'moo';
import nearley from 'nearley';



class SkippingLexer implements nearley.Lexer {

    lexer: moo.Lexer

    constructor(lexer: moo.lexer) {
        this.lexer = lexer;
    }

    next() {
        do {
            var token = this.lexer.next();
            if (!(token && token.type == 'WS')) return token;
        } while (true);
    }

    reset(...args) { this.lexer.reset(...args); }
    formatError(...args) { return this.lexer.formatError(...args); }
    save(...args) { return this.lexer.save(...args); }

}


class Parser extends nearley.Parser {

    lexer: nearley.Lexer
    initial: any

    constructor(grammar: any) {
        super(Parser.prepare(grammar));
        this.initial = this.save();
    }

    static prepare(grammar: any) {
        var rigid = grammar.Rigid || [];
        for (let rule of grammar.ParserRules) {
            rule.postprocess = 
                !rigid.includes(rule.name) && rule.symbols.length === 1 ?
                    (data: any[]) => data[0] : 
                    (data: any[]) => Object.assign(data, {type: rule.name});
        }
        return grammar;
    }

    parse(program: string) {
        this.restart();
        this.feed(program);
        return this.finish();
    }

    restart() { this.restore(this.initial); }

    reportError(token: any) {
        return this.lexer.formatError(token, "Syntax error");        
    }

}



export { Parser, SkippingLexer }
