import * as uuid from 'uuid';
import * as vis from 'vis-metapkg';
import { Ast } from '../ide/panels/ast-panel';


Object.assign(window, {vis});

class Hypergraph {

    edges: Hypergraph.Edge[] = [];
    vlabels: Map<Hypergraph.Vertex, string> = new Map;

    constructor() {
    }

    get nodes() {
        var v = new Set<Hypergraph.Vertex>();
        for (let e of this.edges)
            for (let u of e.incident)
                v.add(u);
        return v;
    }

    fromAst(ast: Ast) {
        var self = this, c: Hypergraph.Vertex = 0;
        function aux(ast: Ast) {
            var root = ++c;
            if (Array.isArray(ast)) {
                var subs = ast.map(aux);
                self.edges.push(new Hypergraph.Edge(ast.type || "", subs, root));
            }
            else {
                self.vlabels.set(root, ast.text);
            }
            return root;
        }
        aux(ast);
        return this;
    }

    toVis() {
        var nodes = new vis.DataSet<vis.Node>(
            [...this.nodes].map(u => {
                var vlabel = this.vlabels.get(u);
                return {id: u, label: vlabel || `${u}`, shape: 'box',
                        ...(vlabel ? LIT : {})};
            })
        );
        
        // create an array with edges
        var edges = new vis.DataSet<vis.Edge>([]);
        
        for (let e of this.edges) {
            var ve = e.toVis();
            nodes.add(ve.nodes);
            edges.add(ve.edges);
        }

        return new Network({
            nodes: nodes,
            edges: edges
        });
    }

}

namespace Hypergraph {

    export type Vertex = number

    export class Edge {
        label: string
        sources: Vertex[]
        target: Vertex
        constructor(label: string, sources: Vertex[], target: Vertex) {
            this.label = label;
            this.sources = sources;
            this.target = target;
        }
        get incident() { return [this.target, ...this.sources]; }
        toVis() {
            var nucleus = uuid.v1(),
                nodes: vis.Node[] = [
                    {id: nucleus, label: this.label, ...NUCLEUS},
                ],
                edges: vis.Edge[] = [
                    {from: nucleus, to: this.target, ...TO},
                    ...this.sources.map(from => ({from, to: nucleus, ...FROM}))
                ];
            return {nodes, edges};
        }
    }

}

const NUCLEUS = {shape: 'box', color: '#cca', shapeProperties: {borderRadius: 99}},
      TO = {arrows: {to: {enabled: true, scaleFactor: 0.5}}, color: '#997', length: 1},
      FROM = {arrows: {middle: {enabled: true, scaleFactor: 0.5}}, color: '#997', length: 1},
      LIT = {color: '#9d9', shapeProperties: {borderRadius: 0}},
      HIE = {
          hierarchical: {
              direction: 'DU',
              sortMethod: 'directed',
              levelSeparation: 75
          }
      },
      PHY = {
          physics: {
              enabled: true,
              solver: 'repulsion',
              minVelocity: 4,
              timestep: 1
          }
      };



class Network {

    data: vis.Data
    options: vis.Options = {
        layout: {
            improvedLayout: false,
            ...HIE
        },
        interaction: {
            zoomSpeed: 0.3
        },
        ...PHY
    };

    constructor(data: vis.Data) {
        this.data = data;
    }

    render(on: HTMLElement) {
        var network = new vis.Network(on, this.data, this.options);
        return network;
    }

}



export { Hypergraph }
