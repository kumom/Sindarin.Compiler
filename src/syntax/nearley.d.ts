declare module 'nearley' {

    interface Lexer {
        next();
        reset(...args);
        formatError(...args);
        save(...args);
    }

    type Grammar = { };
    type State = { };
    type ParseResult = { } | { }[];
    type Token = { };

    class Parser {
        constructor(grammar: Grammar);
        save(): State
        restore(state: State): void
        finish(): ParseResult
        feed(input: string | Token[]): void
    }
}