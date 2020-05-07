
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
            peg2 = new Hypergraph();
        
        peg2._max = peg1._max;

        const S = ['expression_statement'],
              L = ['expression_statement', 'function_definition',
                   'declaration', 'parameter_declaration', 'direct_declarator',
                   'compound_statement', 'iteration_statement',
                   'selection_statement', 'iteration_statement'];

        for (let e of peg1.edges.filter(e => S.includes(e.label))) {
            peg2.add([{label: 'sigma', sources: [e.target], target: -1}]);
        }
        for (let e of peg1.edges.filter(e => L.includes(e.label))) {
            var [le] = peg2.add([{label: 'lscope', sources: [e.target], target: -1}]);
            switch (e.label) {
                case 'compound_statement':
                    peg2.add([{label: 'lscope', 
                               sources: [e.sources[1]], target: le.target}]);
                    break;
                case 'direct_declarator':
                    if (e.sources[1] && e.sources[1].label == '(')
                        peg2.add([{label: 'lscope',
                                   sources: [e.sources[2]], target: le.target}]);
            }
        }

        function getOut(u: Vertex, label: string) {
            for (let e of u.outgoing) {
                if (e.label == label) return e;
            }
        }
        function get(u: Vertex, label: string) {
            var e = getOut(u, label);
            return e && e.target;
        }

        function addIf1(label: string, u?: Vertex, v?: Vertex) {
            if (u && v) peg2.add([new Edge(label, [u], v)]);
        }

        for (let e of peg1.edges.filter(e => e.label == 'block_item_list')) {
            var sigmas = e.sources.map(u => get(u, 'sigma')),
                lscopes = e.sources.map(u => get(u, 'lscope'));
            for (let i = 0; i < sigmas.length - 1; ++i) {
                addIf1('next', sigmas[i], sigmas[i + 1]);
            }
            addIf1('id', get(e.target, 'lscope'), lscopes[0])
            for (let i = 0; i < lscopes.length - 1; ++i) {
                addIf1('next', lscopes[i], lscopes[i + 1]);
            }
        }
        
        for (let e of peg1.edges.filter(e => e.label == 'function_definition')) {
            addIf1('next', get(e.target, 'lscope'), get(e.sources[1], 'lscope'));
        }

        for (let e of peg1.edges.filter(e => e.label == 'parameter_list')) {
            var u = get(e.target, 'lscope');
            for (let s of e.sources) {
                var v = get(s, 'lscope');
                if (v) {
                    addIf1('next', u, v);
                    u = v;
                }
            }
            // connect to function body, if present
            var dd = get(e.target, 'direct_declarator');
            if (dd) {
                var fd = getOut(dd, 'function_definition');
                if (fd) {
                    addIf1('id', u, get(fd.sources[2], 'lscope'));
                }
            }
        }

        for (let e of peg1.edges.filter(e => e.label == 'selection_statement')) {
            switch (e.sources[0].label) {
                case 'if':
                    var [u, v1, v2] = [e.target, e.sources[4], e.sources[6]]
                                      .map(u => get(u, 'lscope'));
                    addIf1('id', u, v1);
                    addIf1('id', u, v2);
                    break;
            }
        }

        for (let e of peg1.edges.filter(e => e.label == 'iteration_statement')) {
            switch (e.sources[0].label) {
                case 'while':
                    var [u, v] = [e.target, e.sources[4]].map(u => get(u, 'lscope'));
                    addIf1('id', u, v);
                    break;
            }
        }

        for (let e of peg2.edges.filter(e => e.label == 'id')) {
            peg2.merge(e.incident);
            peg2.remove([e]);
        }

        ide.panels.peg.show(peg1);

        ide.panels.peg.view.network.once('stabilized', () => {
            var n1 = ide.panels.peg.view,
                n2 = peg2.toVis();
            n1.nail(); n1.fade();
            setTimeout(() => n1.merge(n2), 1);
            Object.assign(window, {peg2, n1, n2});
        });

        //ide.addPanel(ide.panels.peg.showConfig());

        Object.assign(window, {ide});
    })    
    
    Object.assign(window, {parser, Hypergraph});
}



Object.assign(window, {main});