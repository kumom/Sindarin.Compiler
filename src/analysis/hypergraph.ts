import * as uuid from 'uuid';
import * as vis from 'vis-metapkg';
import { Ast } from '../ide/panels/ast-panel';
import {resolveLexicalScope} from "./semantics";
import Vertex = Hypergraph.Vertex;


class Hypergraph<VData = any> {

    vertices: Map<Hypergraph.VertexId, Hypergraph.Vertex<VData>> = new Map;
    edges: Hypergraph.Edge[] = [];

    _max: Hypergraph.VertexId = 0

    constructor() {
    }

    get nodes() {
        var v = new Set<Hypergraph.Vertex<VData>>();
        for (let e of this.edges)
            for (let u of e.incident)
                v.add(u);
        return v;
    }

    add(edges: Hypergraph.EdgeData[]) {
        var vmap = new Map<Hypergraph.VertexId, Hypergraph.Vertex<VData>>(),
            get = (u: Hypergraph.VertexId | Hypergraph.Vertex<VData>) => {
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
        var added = edges.map(ed => {
            var e = new Hypergraph.Edge(ed.label,
                            ed.sources.map(get), get(ed.target));
            e.sources.forEach(u => u.outgoing.push(e));
            e.target.incoming.push(e);
            return e;
        });
        this.edges.push(...added);
        return added;
    }

    remove(edges: Hypergraph.Edge[]) {
        for (let e of edges) {
            e.target.incoming = e.target.incoming.filter(ue => ue !== e);
            for (let u of e.sources) {
                u.outgoing = u.outgoing.filter(ue => ue !== e);
            }
        }
        this.edges = this.edges.filter(e => !edges.includes(e));
    }

    merge(vertices: Hypergraph.Vertex<VData>[]) {
        var rep = vertices[0];
        for (let u of vertices.slice(1)) {
            for (let e of u.incoming) {
                e.target = rep;
                rep.incoming.push(e);
            }
            for (let e of u.outgoing) {
                e.sources = e.sources.map(v => u === v ? rep : v);
                rep.outgoing.push(e);
            }
            this.vertices.delete(u.id);
        }
    }

    fromAst(ast: Ast) {
        var self = this, c: Hypergraph.VertexId = this._max;
        function aux(ast: Ast) {
            var root = ++c, u = self._get(root);
            if (Array.isArray(ast)) {
                var subs = ast.map(aux);
                self.add([{label: ast.type || "", sources: subs, target: root}]);
            }
            else {
                u.label = ast.text;
            }
            u.data = <any>{ast} as VData /** @oops */
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
        var u = new Hypergraph.Vertex(++this._max);
        this.vertices.set(u.id, u);
        return u;
    }

    toVis(edgeNodeProfile = null) {
        var nodes = new vis.DataSet<vis.Node>(
            [...this.vertices.values()].map(u => {
                return {id: u.id, label: u.label || `${u.id}`, shape: 'box',
                        ...(u.label ? LIT : {})};
            })
        );

        // Collect edges
        var edges = new vis.DataSet<vis.Edge>([]);

        for (let e of this.edges) {
            var ve = e.toVis(edgeNodeProfile);
            nodes.add(ve.nodes);
            edges.add(ve.edges);
        }

        return new HypergraphView(this, {
            nodes: nodes,
            edges: edges
        });
    }

}

namespace Hypergraph {

    export type VertexId = number

    export class Vertex<Data = any> {
        id: VertexId
        label: string
        data: Data
        incoming: Edge[] = []
        outgoing: Edge[] = []
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
        toVis(edgeNodeProfile = null) {
            edgeNodeProfile = edgeNodeProfile || NUCLEUS;

            var nucleus = uuid.v1(),
                nodes: vis.Node[] = [
                    {id: nucleus, label: this.label, ...edgeNodeProfile},
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
      FAINT = {color: {background: '#ddd', border: '#bbb',
                       highlight: {background: '#ddd', border: '#bbb'}},
               font: {color: '#ccc'}, opacity: 0.5},
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


interface VisSelection {
    edges: string[];
    nodes: Array<string | number>;
}

interface VisSelectionEventArgs extends VisSelection {
    event: any;
    pointer: any;
    previousSelection?: VisSelection;
}


class HypergraphView {

    peg: Hypergraph;
    data: HypergraphView.Data;

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

    constructor(peg: Hypergraph, data: HypergraphView.Data) {
        this.peg = peg;
        this.data = data;
    }

    render(on: HTMLElement) {
        this.network = new vis.Network(on, this.data, this.options);

        // TODO: off
        this.network.on('selectNode', this._onNodeSelected.bind(this));
        this.network.on('deselectNode', this._onNodeDeselected.bind(this));

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
            .map(id => ({id, color: '#ccc', smooth: false})));
        this.postprocess();
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

    untangle() {
        for (let row of this.iterLevels())
            this.sortHorizontally(row);
    }

    *iterLevels() {
        var yvisited = new Set<number>();
        for (let u of Object.values(this._nodes)) {
            if (!yvisited.has(u.y)) {
                yvisited.add(u.y);
                yield this.getLevel(u.id)
            }
        }
    }

    selectLevel(node?: vis.IdType) {
        this.network.selectNodes(this.getLevel(node).map(u => u.id));
    }

    getLevel(node?: vis.IdType) {
        if (!node) {
            node = this.network.getSelectedNodes()[0];
            if (!node) return;
        }
        var pos = this.network.getPosition(node);
        return Object.values(this._nodes).filter(u => u.y == pos.y);
    }

    sortHorizontally(nodes: vis.Node[]) {
        if (!nodes) {
            var _m = this._nodes;
            nodes = this.network.getSelectedNodes().map(id => _m[id]);
        }
        var posx = nodes.map(u => u.x).sort((x1, x2) => x1 - x2);
        for (let i in nodes) {
            this.network.moveNode(nodes[i].id, posx[i], nodes[i].y);
        }
    }

    postprocess() {
        for (let e of Object.values(this._edges))
            this._shortenEdge(e);
        this.network.redraw();
    }

    get _nodes() {  /** @oops */
        return (<any>this.network).body.nodes as {[id: string]: vis.Node}
    }

    get _edges() {  /** @oops */
        return (<any>this.network).body.edges as {[id: string]: vis.Edge}
    }

    _drawingContext() {
        var r = (<any>this.network).view,
            ctx = r.canvas.getContext();
        ctx.translate(r.body.view.translation.x, r.body.view.translation.y);
        ctx.scale(r.body.view.scale, r.body.view.scale);
        return ctx;
    }

    /**
     * Makes edge start and end at node borders, instead of Vis.js's
     * default, which is their centers.
     * @param e renderer edge
     * @oops this is using internal APIs and monkey-patching because the
     *   EdgeType class hierarchy is not exposed.
     */
    _shortenEdge(e: vis.Edge) {
        var shape = (<any>e).edgeType;  /** @oops internal API */
        if (shape.constructor.name === 'StraightEdge') {
            shape._drawLine = function(ctx: CanvasRenderingContext2D, val) {
                this.fromPoint = this.getArrowData(ctx, 'from', null, false, false, val).point;
                this.toPoint = this.getArrowData(ctx, 'to', null, false, false, val).point;
                this.constructor.prototype._drawLine.call(this, ctx, val);
            };
        }
        /** @todo not handling non-straight edges atm */
    }

    overlay(peg: Hypergraph, disableBase = true, edgeNodeProfile = null,) {
        const overlayView = peg.toVis(edgeNodeProfile);
        this.nail();

        if (disableBase) {
            this.fade();
        }

        setTimeout(() => this.merge(overlayView), 1);
    }

    _onNodeSelected({nodes}: VisSelectionEventArgs) {
        // if (nodes.length !== 1) {
        //     throw new Error("Umm... not yet :-)")
        // }
        //
        // const vertices = nodes.map(parseInt).map(id => this.peg.vertices.get(id));
        // const vertex = vertices[0];
        //
        // const scopeResolutionPeg = new Hypergraph();
        // scopeResolutionPeg._max = this.peg._max;
        //
        // if (!resolveLexicalScope(this.peg, scopeResolutionPeg, vertex)) {
        //     return;
        // }
        //
        // this.overlay(scopeResolutionPeg, false, {shape: 'box', color: '#ca2340', shapeProperties: {borderRadius: 99}});
    }

    _onNodeDeselected({ previousSelection}: VisSelectionEventArgs) {

    }
}


namespace HypergraphView {

    export type Data = {
        nodes: vis.DataSet<vis.Node, 'id'>
        edges: vis.DataSet<vis.Edge, 'id'>
    };

}



export { Hypergraph, HypergraphView }
