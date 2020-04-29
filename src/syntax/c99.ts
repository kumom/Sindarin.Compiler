import moo from 'moo';

import { Parser, SkippingLexer } from './parser';


const IDENTIFIER = /[_a-zA-Z][_a-zA-Z0-9]*/, 
      CONSTANT = /(?:0[xX][0-9a-fA-F]+|0[0-7]*|[1-9][0-9]*)(?:[uU](?:ll?|LL?)?|(?:ll?|LL?)[uU]?)?/,
      {GRAMMAR, KEYWORDS, OPERATORS} = require('./c99.json');


const TOKEN_DEFS = {
    WS: {match: /\s+/, lineBreaks: true},
    IDENTIFIER: {match: IDENTIFIER, type: moo.keywords(KEYWORDS)},
    CONSTANT,
    ...OPERATORS
}


class C99Parser extends Parser {
    constructor() {
        super({
            ...GRAMMAR, 
            Lexer: new SkippingLexer(moo.compile(TOKEN_DEFS)),
            Rigid: ['parameter_list', 'parameter_declaration']
        });
    }
}



export { C99Parser }
