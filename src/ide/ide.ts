import CodeMirror from 'codemirror';
import 'codemirror/mode/clike/clike';
import 'codemirror/lib/codemirror.css';
import Vue from 'vue';

import { Parser } from '../syntax/parser';

// @ts-ignore  handled by Parcel
import treeview from './tree.vue';
import './tree.css';
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
        var program = this.editor.getValue();
        var ast = parser.parse(program)[0];
        function aux(ast: any[] & {type: string}) {
            return {root: ast.type, children: ast.map && ast.map(aux)};
        }
        this.tree.$props.children = [aux(ast)];
    }

}



export { IDE }