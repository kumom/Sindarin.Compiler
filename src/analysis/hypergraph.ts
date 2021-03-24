import { v1 as uuidv1 } from "uuid";
import { Node, Edge, Options, Network, IdType } from "vis-network";
import { DataSet } from "vis-data";
import type { Ast } from "../syntax/parser";

class Hypergraph<VData = any> {
  vertices: Map<Hypergraph.VertexId, Hypergraph.Vertex<VData>> = new Map();
  edges: Hypergraph.Edge[] = [];

  _max: Hypergraph.VertexId = 0;

  constructor() {}

  get nodes() {
    var v = new Set<Hypergraph.Vertex<VData>>();
    for (let e of this.edges) for (let u of e.incident) v.add(u);
    return v;
  }

  add(edges: Hypergraph.EdgeData[]) {
    var vmap = new Map<Hypergraph.VertexId, Hypergraph.Vertex<VData>>(),
      get = (u: Hypergraph.VertexId | Hypergraph.Vertex<VData>) => {
        if (typeof u === "number") {
          if (u > 0) return this._get(u);
          else {
            var v = vmap.get(u);
            if (!v) {
              v = this._fresh();
              vmap.set(u, v);
            }
            return v;
          }
        } else {
          if (!this.vertices.get(u.id)) this.vertices.set(u.id, u);
          return u;
        }
      };
    for (let e of edges) {
      for (let u of [e.target, ...e.sources])
        if (typeof u === "number") this._max = Math.max(this._max, u);
    }
    var added = edges.map((ed) => {
      var e = new Hypergraph.Edge(
        ed.label,
        ed.sources.map(get),
        get(ed.target)
      );
      e.sources.forEach((u) => u.outgoing.push(e));
      e.target.incoming.push(e);
      return e;
    });
    this.edges.push(...added);
    return added;
  }

  remove(edges: Hypergraph.Edge[]) {
    for (let e of edges) {
      e.target.incoming = e.target.incoming.filter((ue) => ue !== e);
      for (let u of e.sources) {
        u.outgoing = u.outgoing.filter((ue) => ue !== e);
      }
    }
    this.edges = this.edges.filter((e) => !edges.includes(e));
  }

  merge(vertices: Hypergraph.Vertex<VData>[]) {
    var rep = vertices[0];
    for (let u of vertices.slice(1)) {
      for (let e of u.incoming) {
        e.target = rep;
        rep.incoming.push(e);
      }
      for (let e of u.outgoing) {
        e.sources = e.sources.map((v) => (u === v ? rep : v));
        rep.outgoing.push(e);
      }
      this.vertices.delete(u.id);
    }
  }

  fromAst(ast: Ast) {
    var self = this,
      c: Hypergraph.VertexId = this._max;
    function aux(ast: Ast) {
      var root = ++c,
        u = self._get(root);
      // @ts-ignore
      if (ast.children) {
        // @ts-ignore

        var subs = ast.children.map(aux);
        self.add([{ label: ast.type || "", sources: subs, target: root }]);
      } else {
        // @ts-ignore
        u.label = ast.text;
      }
      u.data = (<any>{ ast }) as VData; /** @oops */
      return root;
    }
    aux(ast);
    this._max = c;
    return this;
  }

  private _get(id: Hypergraph.VertexId) {
    var v = this.vertices.get(id);
    if (!v) {
      v = new Hypergraph.Vertex(id);
      this.vertices.set(id, v);
    }
    return v;
  }

  private _fresh() {
    var u = new Hypergraph.Vertex(++this._max);
    this.vertices.set(u.id, u);
    return u;
  }

  toVis(edgeNodeProfile = null) {
    var nodes = new DataSet<CustomizedNode>(
      [...this.vertices.values()].map((u) => {
        return {
          id: u.id,
          innerNode: false,
          label: u.label || `${u.id}`,
          shape: "box",
          token: u.label ? true : false,
          ...(u.label ? LIT : DUMMY),
        };
      })
    );

    // Collect edges
    var edges = new DataSet<Edge>([]);

    for (let e of this.edges) {
      var ve = e.toVis(edgeNodeProfile);
      nodes.add(ve.nodes);
      edges.add(ve.edges);
    }

    return new HypergraphView(this, {
      nodes: nodes,
      edges: edges,
    });
  }
}

interface CustomizedNode extends Node {
  token: boolean;
  innerNode: boolean;
}

namespace Hypergraph {
  export type VertexId = number;

  export class Vertex<Data = any> {
    id: VertexId;
    label: string;
    data: Data;
    incoming: Edge[] = [];
    outgoing: Edge[] = [];
    constructor(id: VertexId) {
      this.id = id;
    }
  }

  export class Edge {
    label: string;
    sources: Vertex[];
    target: Vertex;
    constructor(label: string, sources: Vertex[], target: Vertex) {
      this.label = label;
      this.sources = sources;
      this.target = target;
    }
    get incident() {
      return [this.target, ...this.sources];
    }
    toVis(edgeNodeProfile = null) {
      edgeNodeProfile = edgeNodeProfile || NUCLEUS;

      var nucleus = uuidv1(),
        nodes: CustomizedNode[] = [
          {
            id: nucleus,
            label: this.label,
            ...edgeNodeProfile,
            token: false,
            innerNode: true,
          },
        ],
        edges: Edge[] = [
          // @ts-ignore
          { from: nucleus, to: this.target.id, ...EDGE },
          // @ts-ignore
          ...this.sources.map((v) => ({ from: v.id, to: nucleus, ...EDGE })),
        ];
      return { nodes, edges };
    }
  }

  export type EdgeData = {
    label: string;
    sources: (Vertex | VertexId)[];
    target: Vertex | VertexId;
  };
}

const NUCLEUS = {
    shape: "box",
    color: "#cca",
    shapeProperties: { borderRadius: 99 },
    font: { color: "#212121" },
  },
  EDGE = {
    arrows: { to: { enabled: true, scaleFactor: 0.5 } },
    color: "#997",
    length: 1,
    physics: false,
  },
  DUMMY = {
    color: "#7bb2e8",
    shapeProperties: { borderRadius: 5 },
    font: { color: "#212121" },
  },
  LIT = {
    color: "#9d9",
    shapeProperties: { borderRadius: 0 },
    font: { color: "#212121" },
  },
  FAINT = {
    color: {
      background: "#ddd",
      border: "#bbb",
      highlight: { background: "#ddd", border: "#bbb" },
    },
    font: { color: "#ccc" },
  },
  HIE = {
    hierarchical: {
      direction: "DU",
      sortMethod: "directed",
      levelSeparation: 75,
    },
  },
  PHY = {
    physics: {
      enabled: true,
      solver: "repulsion",
      minVelocity: 4,
      timestep: 1,
      hierarchicalRepulsion: {
        nodeDistance: 50,
        avoidOverlap: 1,
      },
    },
  };

interface VisSelection {
  edges: string[];
  nodes: Array<string | number>;
}

class HypergraphView {
  peg: Hypergraph;
  data: HypergraphView.Data;
  basePeg: Hypergraph;
  baseData: HypergraphView.Data;

  options: Options = {
    layout: {
      improvedLayout: false,
      ...HIE,
    },
    interaction: {
      zoomSpeed: 0.3,
    },
    ...PHY,
  };
  network: Network;

  constructor(peg: Hypergraph, data: HypergraphView.Data) {
    this.peg = peg;
    this.basePeg = peg;
    this.data = data;
    this.baseData = data;
    if (this.data.options) this.options = this.data.options;
  }

  render(on: HTMLElement, callback?) {
    this.network = new Network(on, this.data, this.options);
    this.network.on("stabilizationIterationsDone", callback);

    return this;
  }

  nail() {
    this.network.storePositions();
    this.network.setOptions({ layout: { hierarchical: { enabled: false } } });
    this.data.nodes.update(
      this.data.nodes.getIds().map((id) => ({ id, fixed: true }))
    );
    this.network.setOptions({ physics: { solver: "repulsion" } });
  }

  fade() {
    this.data.nodes.update(
      this.data.nodes.getIds().map((id) => ({ id, ...FAINT }))
    );
    this.data.edges.update(
      this.data.edges
        .getIds()
        .map((id) => ({ id, color: "#ccc", smooth: false }))
    );
  }

  merge(that: HypergraphView) {
    that.data.nodes.forEach((u) => {
      if (!this.data.nodes.get(u.id)) {
        this.data.nodes.add(u);
      }
    });
    that.data.edges.forEach((e) => {
      this.data.edges.add(e);
    });
  }

  untangle() {
    for (let row of this.iterLevels()) this.sortHorizontally(row);
  }

  *iterLevels() {
    var yvisited = new Set<number>();
    for (let u of Object.values(this._nodes)) {
      if (!yvisited.has(u.y)) {
        yvisited.add(u.y);
        yield this.getLevel(u.id);
      }
    }
  }

  selectLevel(node?: IdType) {
    this.network.selectNodes(this.getLevel(node).map((u) => u.id));
  }

  getLevel(node?: IdType) {
    if (!node) {
      node = this.network.getSelectedNodes()[0];
      if (!node) return;
    }
    var pos = this.network.getPosition(node);
    return Object.values(this._nodes).filter((u) => u.y == pos.y);
  }

  sortHorizontally(nodes: Node[]) {
    if (!nodes) {
      var _m = this._nodes;
      nodes = this.network.getSelectedNodes().map((id) => _m[id]);
    }
    var posx = nodes.map((u) => u.x).sort((x1, x2) => x1 - x2);
    for (let i in nodes) {
      this.network.moveNode(nodes[i].id, posx[i], nodes[i].y);
    }
  }

  get _nodes() {
    /** @oops */
    return (<any>this.network).body.nodes as { [id: string]: CustomizedNode };
  }

  get _edges() {
    /** @oops */
    return (<any>this.network).body.edges as { [id: string]: Edge };
  }

  overlay(overlayView: HypergraphView, disableBase = true) {
    this.nail();

    if (disableBase) {
      this.fade();
    }

    this.merge(overlayView);
  }

  removeOverlay(overlayView: HypergraphView) {
    this.nail();

    overlayView.data.nodes.forEach((u) => {
      this.data.nodes.remove(u);
    });
    overlayView.data.edges.forEach((e) => {
      this.data.edges.remove(e);
    });

    // Restore to the original view
    this.baseData.nodes.update(
      this.baseData.nodes.map((node) => {
        if (node.token) return { id: node.id, fixed: false, ...LIT };
        else if (node.innerNode)
          return { id: node.id, fixed: false, ...NUCLEUS };
        else return { id: node.id, fixed: false, ...DUMMY };
      })
    );
    this.baseData.edges.update(
      this.baseData.edges.getIds().map((id) => ({ id, ...EDGE }))
    );
  }
}

namespace HypergraphView {
  export type Data = {
    nodes: DataSet<CustomizedNode, "id">;
    edges: DataSet<Edge, "id">;
    options?: Options /* not strictly part of the data, but returned from e.g. parseDOTNetwork */;
  };
}

export { Hypergraph, HypergraphView };
