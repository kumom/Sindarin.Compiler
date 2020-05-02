import { EventEmitter } from 'events';
import Vue from 'vue';
import CodeMirror from 'codemirror';

import { Parser } from '../../syntax/parser';

import { treeview, nonreactive } from '../components';
import { CodeRange } from '../ide';



class AstPanel extends EventEmitter {

    $el: Element
    tree: Vue
    ast: Ast

    constructor() {
        super();
        this.tree = new Vue(treeview);
        this.tree.$mount();
        this.$el = this.tree.$el;

        this.tree.$on('action', (ev: TreeViewActionEvent) => this.action(ev));
    }

    show(ast: Ast, doc?: CodeMirror.Doc) {
        this.ast = ast;
        function aux(ast: Ast) {
            if (Array.isArray(ast))
                return {root: {_component: 'term-inner', type: ast.type,
                               ast: nonreactive(ast)},
                        children: ast.map(aux)};
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

    action(ev: TreeViewActionEvent) {
        switch (ev.type) {
            case 'peg':
                this.emit('action:peg', {ast: ev.target.ast}); break;
        }
    }

}


type Ast = {type: string} & (any[] | {text: string});

type TreeViewActionEvent = {type: string, target: Vue.Component & {ast: Ast}};


export { AstPanel, Ast }
