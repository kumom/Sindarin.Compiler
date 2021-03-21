import moo from "moo";
import nearley from "nearley";
import LineAndColumnComputer from "./LineAndColumnComputer";

class SkippingLexer implements nearley.Lexer {
  lexer: moo.Lexer;
  skip: Set<string>;

  constructor(lexer: moo.Lexer) {
    this.lexer = lexer;
    this.skip = new Set(["WS", "COMMENT"]);
  }

  next() {
    do {
      var token = this.lexer.next();
      if (!(token != null && this.skip.has(token.type!))) return token;
    } while (true);
  }

  reset(chunk: any, info: any) {
    this.lexer.reset(chunk, info);
  }
  formatError(token: any, message?: string) {
    return this.lexer.formatError(token, message);
  }
  save() {
    return this.lexer.save();
  }
  has(name: string) {
    return this.lexer.has(name);
  }
}

class Parser extends nearley.Parser {
  initial: any;
  #LineAndColumnComputer: LineAndColumnComputer;

  constructor(grammar: any) {
    super(Parser.prepare(grammar));
    this.initial = this.save();
  }

  static prepare(grammar: any) {
    var rigid = grammar.Rigid || [];
    for (const rule of grammar.ParserRules) {
      rule.postprocess = rigid.includes(rule.name)
        ? (data: any[]) => this.unfold(data, rule.name)
        : rule.symbols.length === 1
        ? (data: any[]) => data[0]
        : (data: any[]) => Object.assign(data, { type: rule.name });
    }
    return grammar;
  }

  parse(program: string) {
    this.#LineAndColumnComputer = new LineAndColumnComputer(program);
    this.restart();
    this.feed(program);
    // For non-ambigious grammar, this is what we what
    // See: https://nearley.js.org/docs/parser#a-note-on-ambiguity
    const ast = this.results[0];
    this.setRange(ast);
    return this.toTree(ast);
  }

  restart() {
    this.restore(this.initial);
  }

  reportError(token: any) {
    return this.lexer.formatError(token, "Syntax error");
  }

  private toTree(ast) {
    if (ast.text) {
      return {
        type: ast.type,
        text: ast.text,
        children: null,
        range: ast.range,
      };
    } else {
      let tree = { type: ast.type, range: ast.range, children: [] };
      for (let i = 0; i < ast.length; i++)
        tree.children.push(this.toTree(ast[i]));

      return tree;
    }
  }

  private setRange(ast): void {
    if (ast.text) {
      const start = this.#LineAndColumnComputer.getNumberAndColumnFromPos(
        ast.offset
      );
      const end = this.#LineAndColumnComputer.getNumberAndColumnFromPos(
        ast.offset + ast.text.length
      );
      ast.range = {
        startLineNumber: start.lineNumber,
        startColumn: start.column,
        endLineNumber: end.lineNumber,
        endColumn: end.column,
      };
    } else {
      for (let i = 0; i < ast.length; i++) this.setRange(ast[i]);

      const firstChild = ast[0],
        lastChild = ast[ast.length - 1];
      ast.range = {
        startLineNumber: firstChild.range.startLineNumber,
        startColumn: firstChild.range.startColumn,
        endLineNumber: lastChild.range.endLineNumber,
        endColumn: lastChild.range.endColumn,
      };
    }
  }

  static unfold(data: any[], type: string) {
    function* iter() {
      for (const d of data) {
        if (d.type === type) yield* d;
        else yield d;
      }
    }
    return Object.assign([...iter()], { type });
  }
}

export interface Ast {
  type: string;
  children: Ast[];
  range?: CodeRange;
  text?: string;
}

export interface CodeRange {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
}

export { Parser, SkippingLexer };
