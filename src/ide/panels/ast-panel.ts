import Vue from 'vue';
import CodeMirror from 'codemirror';

import { Parser } from '../../syntax/parser';

import { treeview, nonreactive } from '../components';
import { CodeRange } from '../ide';



class AstPanel {

    $el: Element
    tree: Vue
    ast: Ast

    constructor() {
        this.tree = new Vue(treeview);
        this.tree.$mount();
        this.$el = this.tree.$el;
    }

    show(ast: Ast, doc?: CodeMirror.Doc) {
        this.ast = ast;
        function aux(ast: Ast) {
            if (Array.isArray(ast))
                return {root: ast.type, children: ast.map && ast.map(aux)};
            else
                return {root: {_component: 'token', at: pos(ast), ...ast}};
        }
        function pos(token) {
            return nonreactive(new CodeRange(
                {doc, line: token.line, col: token.col},
                {doc, line: token.line, col: token.col + token.text.length}));
        }
        this.tree.$props.children = [aux(ast)];        
    }

    parse(doc: CodeMirror.Doc, parser: Parser) {
        var program = doc.getValue(),
            ast = parser.parse(program)[0];
        this.show(ast, doc);
    }

}


type Ast = any[] & {type: string} | {};


export { AstPanel, Ast }
