
import { C99Parser } from './syntax/c99';
import { IDE } from './ide/ide';

import { Hypergraph } from './analysis/hypergraph';
import { PegPanel } from './ide/panels/peg-panel';



function main() {
    const parser = new C99Parser();

    requestAnimationFrame(async () => {
        var ide = new IDE();

        await ide.open('/data/bincnt.c');
        ide.parse(parser);

        //ide.panels.ast.hide();

        ide.panels.peg.content.show(
            new Hypergraph().fromAst(ide.panels.ast.content.ast));

        //ide.addPanel(ide.panels.peg.content.showConfig());

        Object.assign(window, {ide});
    })    
    
    Object.assign(window, {parser, Hypergraph});
}



Object.assign(window, {main});