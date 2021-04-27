declare module "nearley" {
  interface Lexer {
    next(): Token;
    save(): any;
    reset(chunk: any, info: any): void;
    formatError(token: Token, message?: string): string;
    has(name: string): boolean;
  }

  type Grammar = {};
  type State = {};
  type ParseResult = {} | {}[];
  type Token = {};

  class Parser {
    constructor(grammar: Grammar);
    save(): State;
    restore(state: State): void;
    finish(): ParseResult;
    feed(input: string | Token[]): void;
  }
}
