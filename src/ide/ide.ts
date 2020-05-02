import CodeMirror from 'codemirror';
import 'codemirror/mode/clike/clike';
import 'codemirror/lib/codemirror.css';

import { Parser } from '../syntax/parser';

import './ide.css';
import { AstPanel } from './panels/ast-panel';
import { PegPanel } from './panels/peg-panel';
import { Hypergraph } from '../analysis/hypergraph';



class IDE {

    editor: CodeMirror.Editor
    panels: {ast?: IDE.Panel<AstPanel>, peg?: IDE.Panel<PegPanel>}

    constructor() {
        this.editor = CodeMirror(document.querySelector('#editor'), {
            lineNumbers: true
        });
        this.panels = {
            ast: this.addPanel(new AstPanel()),
            peg: this.addPanel(new PegPanel())
        };
        this.panels.ast.content.on('action:peg', ev => {
            console.log(ev);
            this.panels.peg.content.show(new Hypergraph().fromAst(ev.ast));
        })
    }

    addPanel<A extends {$el: Element}>(content: A) {
        var panel = new IDE.Panel(content);
        document.querySelector('#ide').append(panel.$el);
        return panel;
    }

    async open(url: string) {
        var r = await fetch(url);
        this.editor.swapDoc(new CodeMirror.Doc(await r.text(), 'text/x-c'));
    }

    parse(parser: Parser) {
        var doc = this.editor.getDoc();
        this.panels.ast.content.parse(doc, parser);
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


namespace IDE {

    export class Panel<A extends {$el: Element}> {
        content: A
        $el: HTMLDivElement
        constructor(content: A) {
            this.content = content;
            this.$el = document.createElement('div');
            this.$el.classList.add('panel');
            this.$el.append(content.$el);
        }
        hide() {
            this.$el.classList.add('ide__hidden');
        }
    }

}



export { IDE, CodePosition, CodeRange }