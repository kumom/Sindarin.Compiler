import Vue from 'vue';
import Component from 'vue-class-component';
import CodeMirror from 'codemirror';

import type { Parser } from '../ide';

import { treeview, nonreactive } from '../components';
import { CodeRange } from './editor-panel';



@Component
class AstPanel extends Vue {

    $el: Element
    tree: Vue
    ast: Ast
    
    render(createElement) {
        return createElement(treeview, {children: []});
    }

    mounted() {
        this.tree = this.$children[0];
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
        this.tree.$props.children.splice(0, Infinity, aux(ast));
    }

    parse(doc: CodeMirror.Doc, parser: Parser) {
        var program = doc.getValue(),
            ast = parser.parse(program)[0];
        this.show(ast, doc);
    }

    action(ev: TreeViewActionEvent) {
        switch (ev.type) {
            case 'peg':
                this.$emit('action:peg', {ast: ev.target.ast}); break;
        }
    }

    static install() {
        Vue.component('ide-panel-ast', this);
    }

}


type Ast = {type: string} & (any[] | {text: string});

type TreeViewActionEvent = {type: string, target: Vue.Component & {ast: Ast}};


export { AstPanel, Ast }
