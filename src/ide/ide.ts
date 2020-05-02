import Vue from 'vue';

import { Parser } from '../syntax/parser';
import { Hypergraph } from '../analysis/hypergraph';

// @ts-ignore
import ide from './ide.vue';
import './ide.css';
import { EditorPanel } from './panels/editor-panel';
import { AstPanel, Ast } from './panels/ast-panel';
import { PegPanel } from './panels/peg-panel';



class IDE {

    vue: Vue
    panels: {editor: EditorPanel, ast: AstPanel, peg: PegPanel}

    constructor() {
        this.vue = new Vue(ide);
        this.vue.$props.panels = [
            {id: 'editor', _component: 'ide-panel-editor'},
            {id: 'ast', _component: 'ide-panel-ast'},
            {id: 'peg', _component: 'ide-panel-peg'}
        ];
        this.vue.$mount(document.querySelector('#ide'));
        this.panels = {
            editor: this.vue.$refs.editor[0],
            ast: this.vue.$refs.ast[0],
            peg: this.vue.$refs.peg[0]
        };
        this.panels.ast.$on('action:peg', (ev: {ast: Ast}) => {
            this.panels.peg.show(new Hypergraph().fromAst(ev.ast));
        });
    }

    async open(url: string) {
        return this.panels.editor.open(url);
    }

    parse(parser: Parser) {
        var doc = this.panels.editor.editor.getDoc();
        this.panels.ast.parse(doc, parser);
    }

}


EditorPanel.install();
AstPanel.install();
PegPanel.install();



export { IDE }