
import { C99Parser } from './syntax/c99';
import { IDE } from './ide/ide';

import { Hypergraph } from './analysis/hypergraph';

import Edge = Hypergraph.Edge;
import Vertex = Hypergraph.Vertex;
import VertexId = Hypergraph.VertexId;



function main() {
    const parser = new C99Parser();

    requestAnimationFrame(async () => {
        var ide = new IDE();

        await ide.open('/data/bincnt.c');
        ide.parse(parser);

        //ide.panels.ast.hide();

        var peg1 = new Hypergraph().fromAst(ide.panels.ast.ast[0]),
            sigma = new Map<VertexId, Vertex>(),
            lscope = new Map<VertexId, Vertex>(),
            peg2 = new Hypergraph();
        
        peg2._max = peg1._max;

        const S = ['expression_statement'],
              L = ['expression_statement', 'function_definition',
                   'compound_statement', 'declaration', 'iteration_statement'];

        for (let e of peg1.edges.filter(e => S.includes(e.label))) {
            var [se] = peg2.add([{label: 'sigma', sources: [e.target], target: -1}]);
            sigma.set(se.sources[0].id, se.target);
        }
        for (let e of peg1.edges.filter(e => L.includes(e.label))) {
            var [le] = peg2.add([{label: 'lscope', sources: [e.target], target: -1}]);
            lscope.set(le.sources[0].id, le.target);
            if (e.label === 'compound_statement') {
                var [cle] = peg2.add([{label: 'lscope', 
                                sources: [e.sources[1]], target: le.target}]);
                lscope.set(cle.sources[0].id, cle.target);
            }
        }

        for (let e of peg1.edges.filter(e => e.label == 'block_item_list')) {
            var sigmas = e.sources.map(u => sigma.get(u.id)),
                lscopes = e.sources.map(u => lscope.get(u.id));
            for (let i = 0; i < sigmas.length - 1; ++i) {
                var u = sigmas[i], v = sigmas[i + 1];
                if (u && v) peg2.add([new Edge('next', [u], v)]);
            }
            for (let i = 0; i < lscopes.length - 1; ++i) {
                var u = lscopes[i], v = lscopes[i + 1];
                if (u && v) peg2.add([new Edge('next', [u], v)]);
            }
        }
        
        ide.panels.peg.show(peg1);

        ide.panels.peg.view.network.once('stabilized', () => {
            ide.panels.peg.view.nail();
            Object.assign(window, {peg2, n1: ide.panels.peg.view, n2: peg2.toVis()});
        });

        //ide.addPanel(ide.panels.peg.showConfig());

        Object.assign(window, {ide});
    })    
    
    Object.assign(window, {parser, Hypergraph});
}



Object.assign(window, {main});