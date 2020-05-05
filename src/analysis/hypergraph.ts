import * as uuid from 'uuid';
import * as vis from 'vis-metapkg';
import { Ast } from '../ide/panels/ast-panel';


Object.assign(window, {vis});

class Hypergraph {

    vertices: Map<Hypergraph.VertexId, Hypergraph.Vertex> = new Map;
    edges: Hypergraph.Edge[] = [];
    vlabels: Map<Hypergraph.VertexId, string> = new Map;

    _max: Hypergraph.VertexId = 0

    constructor() {
    }

    get nodes() {
        var v = new Set<Hypergraph.Vertex>();
        for (let e of this.edges)
            for (let u of e.incident)
                v.add(u);
        return v;
    }

    add(edges: Hypergraph.EdgeData[]) {
        var vmap = new Map<Hypergraph.VertexId, Hypergraph.Vertex>(),
            get = (u: Hypergraph.VertexId | Hypergraph.Vertex) => {
                if (typeof u === 'number') {
                    if (u > 0) return this._get(u);                    
                    else {
                        var v = vmap.get(u);
                        if (!v) { v = this._fresh(); vmap.set(u, v); }
                        return v;
                    }
                }
                else {
                    if (!this.vertices.get(u.id))
                        this.vertices.set(u.id, u);
                    return u;
                }
            };
        for (let e of edges) {
            for (let u of [e.target, ...e.sources])
                if (typeof u === 'number')
                    this._max = Math.max(this._max, u);
        }
        var added = edges.map(e => new Hypergraph.Edge(e.label,
                e.sources.map(get), get(e.target)));
        this.edges.push(...added);
        return added;
    }

    fromAst(ast: Ast) {
        var self = this, c: Hypergraph.VertexId = this._max;
        function aux(ast: Ast) {
            var root = ++c;
            if (Array.isArray(ast)) {
                var subs = ast.map(aux);
                self.add([{label: ast.type || "", sources: subs, target: root}]);
            }
            else {
                self._get(root).label = ast.text;
            }
            return root;
        }
        aux(ast);
        this._max = c;
        return this;
    }

    _get(id: Hypergraph.VertexId) {
        var v = this.vertices.get(id);
        if (!v) {
            v = new Hypergraph.Vertex(id);
            this.vertices.set(id, v);
        }
        return v;
    }

    _fresh() {
        return new Hypergraph.Vertex(++this._max);
    }

    toVis() {
        var nodes = new vis.DataSet<vis.Node>(
            [...this.vertices.values()].map(u => {
                return {id: u.id, label: u.label || `${u.id}`, shape: 'box',
                        ...(u.label ? LIT : {})};
            })
        );
        
        // Collect edges
        var edges = new vis.DataSet<vis.Edge>([]);
        
        for (let e of this.edges) {
            var ve = e.toVis();
            nodes.add(ve.nodes);
            edges.add(ve.edges);
        }

        return new HypergraphView({
            nodes: nodes,
            edges: edges
        });
    }

}

namespace Hypergraph {

    export type VertexId = number

    export class Vertex {
        id: VertexId
        label: string
        constructor(id: VertexId) {
            this.id = id;
        }
    }

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
                    {from: nucleus, to: this.target.id, ...TO},
                    ...this.sources.map(v => ({from: v.id, to: nucleus, ...FROM}))
                ];
            return {nodes, edges};
        }
    }

    export type EdgeData = {
        label: string
        sources: (Vertex | VertexId)[]
        target: Vertex | VertexId
    }

}

const NUCLEUS = {shape: 'box', color: '#cca', shapeProperties: {borderRadius: 99}},
      TO = {arrows: {to: {enabled: true, scaleFactor: 0.5}}, color: '#997', length: 1},
      FROM = {arrows: {middle: {enabled: true, scaleFactor: 0.5}}, color: '#997', length: 1},
      LIT = {color: '#9d9', shapeProperties: {borderRadius: 0}},
      FAINT = {color: {background: '#eee', border: '#ddd'}, font: {color: '#ccc'}},
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
              timestep: 1,
              hierarchicalRepulsion: {
                  nodeDistance: 50,
                  avoidOverlap: 1
              }
          }
      };



class HypergraphView {

    data: HypergraphView.Data
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
    network: vis.Network

    constructor(data: HypergraphView.Data) {
        this.data = data;
    }

    render(on: HTMLElement) {
        this.network = new vis.Network(on, this.data, this.options);
        return this;
    }

    nail() {
        this.network.storePositions();
        this.network.setOptions({layout: {hierarchical: {enabled: false}}});
        this.data.nodes.update(this.data.nodes.getIds()
            .map(id => ({id, fixed: true /*physics: false*/})));
        this.data.edges.update(this.data.edges.getIds()
            .map(id => ({id, physics: false})));
        this.network.setOptions({physics: {solver: 'repulsion'}});
    }

    fade() {
        this.data.nodes.update(this.data.nodes.getIds()
            .map(id => ({id, ...FAINT})));
        this.data.edges.update(this.data.edges.getIds()
            .map(id => ({id, color: '#ccc'})));
    }

    merge(that: HypergraphView) {
        that.data.nodes.forEach(u => {
            if (!this.data.nodes.get(u.id))
                this.data.nodes.add(u);
        });
        that.data.edges.forEach(e => {
            this.data.edges.add(e);
        })
    }

}


namespace HypergraphView {

    export type Data = {
        nodes: vis.DataSet<vis.Node, 'id'>
        edges: vis.DataSet<vis.Edge, 'id'>
    };
      
}



export { Hypergraph, HypergraphView }
