import CodeMirror from 'codemirror';
import 'codemirror/mode/clike/clike';
import 'codemirror/lib/codemirror.css';

import { Parser } from '../syntax/parser';

import './ide.css';
import { AstPanel } from './panels/ast-panel';



class IDE {

    editor: CodeMirror.Editor
    panels: {ast: AstPanel}

    constructor() {
        this.editor = CodeMirror(document.querySelector('#editor'), {
            lineNumbers: true
        });
        this.panels = {
            ast: this.addPanel(new AstPanel())
        }
    }

    addPanel<A extends {$el: Element}>(panel: A): A {
        var div = document.createElement('div');
        div.classList.add('panel');
        document.querySelector('#ide').append(div);
        div.append(panel.$el);
        return panel;
    }

    async open(url: string) {
        var r = await fetch(url);
        this.editor.swapDoc(new CodeMirror.Doc(await r.text(), 'text/x-c'));
    }

    parse(parser: Parser) {
        var doc = this.editor.getDoc();
        this.panels.ast.parse(doc, parser);
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



export { IDE, CodePosition, CodeRange }