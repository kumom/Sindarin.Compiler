import moo from 'moo'
import nearley from 'nearley'

class SkippingLexer implements nearley.Lexer {
  lexer: moo.Lexer
  skip: Set<string>

  constructor (lexer: moo.Lexer) {
    this.lexer = lexer
    this.skip = new Set(['WS', 'COMMENT'])
  }

  next () {
    do {
      var token = this.lexer.next()
      if (!((token != null) && this.skip.has(token.type!))) return token
    } while (true)
  }

  reset (chunk: any, info: any) { this.lexer.reset(chunk, info) }
  formatError (token: any, message?: string) { return this.lexer.formatError(token, message) }
  save () { return this.lexer.save() }
  has (name: string) { return this.lexer.has(name) }
}

class Parser extends nearley.Parser {
  initial: any

  constructor (grammar: any) {
    super(Parser.prepare(grammar))
    this.initial = this.save()
  }

  static prepare (grammar: any) {
    var rigid = grammar.Rigid || []
    for (const rule of grammar.ParserRules) {
      rule.postprocess =
                rigid.includes(rule.name)
                  ? (data: any[]) => this.unfold(data, rule.name)
                  : rule.symbols.length === 1
                    ? (data: any[]) => data[0]
                    : (data: any[]) => Object.assign(data, { type: rule.name })
    }
    return grammar
  }

  parse (program: string) {
    this.restart()
    this.feed(program)
    // For non-ambigious grammar, this is what we what
    // See: https://nearley.js.org/docs/parser#a-note-on-ambiguity
    return this.results[0]
  }

  restart () { this.restore(this.initial) }

  reportError (token: any) {
    return this.lexer.formatError(token, 'Syntax error')
  }

  static unfold (data: any[], type: string) {
    function * iter () {
      for (const d of data) {
        if (d.type === type) yield * d
        else yield d
      }
    }
    return Object.assign([...iter()], { type })
  }
}

type Ast = { type: string, range?: CodeRange } & (Ast[] | { text: string })
export type { Ast }

export interface CodeRange {
  startLineNumber: number
  startColumn: number
  endLineNumber: number
  endColumn: number
}

export { Parser, SkippingLexer }
