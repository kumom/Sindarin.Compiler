import CodeMirror from 'codemirror';
import 'codemirror/mode/clike/clike';
import 'codemirror/lib/codemirror.css';
import Vue from 'vue';

import { Parser } from '../syntax/parser';

import { treeview, nonreactive } from './components';
import './ide.css';



class IDE {

    editor: CodeMirror.Editor
    tree: Vue

    constructor() {
        this.editor = CodeMirror(document.querySelector('#editor'), {
            lineNumbers: true
        });
        this.tree = new Vue(treeview);
        var pane = document.createElement('div');
        document.querySelector('#output').append(pane);
        this.tree.$mount(pane);
    }

    async open(url: string) {
        var r = await fetch(url);
        this.editor.swapDoc(new CodeMirror.Doc(await r.text(), 'text/x-c'));
    }

    pass(parser: Parser) {
        var doc = this.editor.getDoc(),
            program = this.editor.getValue(),
            ast = parser.parse(program)[0];
        function aux(ast: any[] & {type: string} | {}) {
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

}


type CodePosition = {doc: CodeMirror.Doc, line: number, col: number};

class CodeRange {
    from: CodePosition
    to: CodePosition
    _mark: CodeMirror.TextMarker

    constructor(from: CodePosition, to: CodePosition) {
        this.from = from; this.to = to;
    }
    highlight() {
        return this._mark = this.from.doc.markText(
            {line: this.from.line - 1, ch: this.from.col - 1},
            {line: this.to.line - 1, ch: this.to.col - 1},
            {className: 'highlight'}
        );
    }
    unhighlight() {
        if (this._mark) {
            this._mark.clear();
            this._mark = undefined;
        }
    }
}



export { IDE }