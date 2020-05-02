
import { C99Parser } from './syntax/c99';
import { IDE } from './ide/ide';

import { Hypergraph } from './analysis/hypergraph';

import Edge = Hypergraph.Edge;
import Vertex = Hypergraph.Vertex;



function main() {
    const parser = new C99Parser();

    requestAnimationFrame(async () => {
        var ide = new IDE();

        await ide.open('/data/bincnt.c');
        ide.parse(parser);

        //ide.panels.ast.hide();

        var peg = new Hypergraph().fromAst(ide.panels.ast.ast[0]),
            sigma = new Map<Vertex, Vertex>();

        for (let e of peg.edges.filter(e => e.label == 'expression_statement')) {
            var se = new Edge('sigma', [e.target], -1);
            peg.add([se]);
            sigma.set(se.sources[0], se.target);
        }

        for (let e of peg.edges.filter(e => e.label == 'block_item_list')) {
            var sigmas = e.sources.map(u => sigma.get(u));
            for (let i = 0; i < sigmas.length - 1; ++i) {
                var u = sigmas[i], v = sigmas[i + 1];
                if (u && v)
                    peg.add([new Edge('next', [u], v)]);
            }
        }

        ide.panels.peg.show(peg);

        //ide.addPanel(ide.panels.peg.showConfig());

        Object.assign(window, {ide});
    })    
    
    Object.assign(window, {parser, Hypergraph});
}



Object.assign(window, {main});