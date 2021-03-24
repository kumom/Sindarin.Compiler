/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatesindarin_compiler"]("main",{

/***/ "./src/analysis/hypergraph.ts":
/*!************************************!*\
  !*** ./src/analysis/hypergraph.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Hypergraph\": () => (/* binding */ Hypergraph),\n/* harmony export */   \"HypergraphView\": () => (/* binding */ HypergraphView)\n/* harmony export */ });\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n/* harmony import */ var vis_network__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vis-network */ \"./node_modules/vis-network/peer/umd/vis-network.min.js\");\n/* harmony import */ var vis_network__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vis_network__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vis_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vis-data */ \"./node_modules/vis-data/peer/umd/vis-data.min.js\");\n/* harmony import */ var vis_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vis_data__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nclass Hypergraph {\n    constructor(ast) {\n        this.vertices = new Map();\n        this.edges = [];\n        this.maxId = 0;\n        let aux = (ast) => {\n            const root = ++this.maxId, u = this._get(root);\n            if (ast.children && ast.children.length) {\n                this.add([{ label: ast.type || \"\", sources: ast.children.map(aux), target: root }]);\n            }\n            else {\n                u.label = ast.text;\n            }\n            u.data = { ast }; /** @oops */\n            return root;\n        };\n        if (ast)\n            aux(ast);\n    }\n    get nodes() {\n        const v = new Set();\n        for (let e of this.edges)\n            for (let u of e.incident)\n                v.add(u);\n        return v;\n    }\n    add(edges) {\n        var vmap = new Map(), get = (u) => {\n            if (typeof u === \"number\") {\n                if (u > 0)\n                    return this._get(u);\n                else {\n                    var v = vmap.get(u);\n                    if (!v) {\n                        v = this._fresh();\n                        vmap.set(u, v);\n                    }\n                    return v;\n                }\n            }\n            else {\n                if (!this.vertices.get(u.id))\n                    this.vertices.set(u.id, u);\n                return u;\n            }\n        };\n        for (let e of edges) {\n            for (let u of [e.target, ...e.sources])\n                if (typeof u === \"number\")\n                    this.maxId = Math.max(this.maxId, u);\n        }\n        var added = edges.map((ed) => {\n            var e = new Hypergraph.Edge(ed.label, ed.sources.map(get), get(ed.target));\n            e.sources.forEach((u) => u.outgoing.push(e));\n            e.target.incoming.push(e);\n            return e;\n        });\n        this.edges.push(...added);\n        return added;\n    }\n    remove(edges) {\n        for (let e of edges) {\n            e.target.incoming = e.target.incoming.filter((ue) => ue !== e);\n            for (let u of e.sources) {\n                u.outgoing = u.outgoing.filter((ue) => ue !== e);\n            }\n        }\n        this.edges = this.edges.filter((e) => !edges.includes(e));\n    }\n    merge(vertices) {\n        var rep = vertices[0];\n        for (let u of vertices.slice(1)) {\n            for (let e of u.incoming) {\n                e.target = rep;\n                rep.incoming.push(e);\n            }\n            for (let e of u.outgoing) {\n                e.sources = e.sources.map((v) => (u === v ? rep : v));\n                rep.outgoing.push(e);\n            }\n            this.vertices.delete(u.id);\n        }\n    }\n    _get(id) {\n        var v = this.vertices.get(id);\n        if (!v) {\n            v = new Hypergraph.Vertex(id);\n            this.vertices.set(id, v);\n        }\n        return v;\n    }\n    _fresh() {\n        var u = new Hypergraph.Vertex(++this.maxId);\n        this.vertices.set(u.id, u);\n        return u;\n    }\n}\n(function (Hypergraph) {\n    class Vertex {\n        constructor(id) {\n            this.incoming = [];\n            this.outgoing = [];\n            this.id = id;\n        }\n    }\n    Hypergraph.Vertex = Vertex;\n    class Edge {\n        constructor(label, sources, target) {\n            this.label = label;\n            this.sources = sources;\n            this.target = target;\n        }\n        get incident() {\n            return [this.target, ...this.sources];\n        }\n    }\n    Hypergraph.Edge = Edge;\n})(Hypergraph || (Hypergraph = {}));\nconst NUCLEUS = {\n    shape: \"box\",\n    color: \"#cca\",\n    shapeProperties: { borderRadius: 99 },\n    font: { color: \"#212121\" },\n    opacity: 1,\n}, EDGE = {\n    arrows: { to: { enabled: true, scaleFactor: 0.5 } },\n    physics: false,\n    color: \"#997\",\n    length: 1,\n}, DUMMY = {\n    color: \"#7bb2e8\",\n    shapeProperties: { borderRadius: 5 },\n    font: { color: \"#212121\" },\n    opacity: 1,\n}, LIT = {\n    color: \"#9d9\",\n    shapeProperties: { borderRadius: 0 },\n    font: { color: \"#212121\" },\n    opacity: 1,\n}, FAINT = {\n    color: {\n        background: \"#ddd\",\n        border: \"#bbb\",\n        highlight: { background: \"#ddd\", border: \"#bbb\" },\n    },\n    font: { color: \"#ccc\" },\n    opacity: 0.5,\n}, HIE = {\n    hierarchical: {\n        direction: \"DU\",\n        sortMethod: \"directed\",\n        levelSeparation: 75,\n    },\n}, PHY = {\n    physics: {\n        enabled: true,\n        solver: \"repulsion\",\n        minVelocity: 4,\n        timestep: 1,\n        hierarchicalRepulsion: {\n            nodeDistance: 50,\n            avoidOverlap: 1,\n        },\n    },\n};\nclass HypergraphView {\n    constructor(peg, options) {\n        this.options = {\n            layout: {\n                improvedLayout: false,\n                ...HIE,\n            },\n            interaction: {\n                zoomSpeed: 0.3,\n            },\n            ...PHY,\n        };\n        this.peg = peg;\n        this.basePeg = peg;\n        const nodes = new vis_data__WEBPACK_IMPORTED_MODULE_1__.DataSet({});\n        nodes.add([...peg.vertices.values()].map((u) => {\n            return {\n                id: u.id.toString(),\n                token: u.label ? true : false,\n                innerNode: false,\n                label: u.label || `${u.id}`,\n                shape: \"box\",\n                ...(u.label ? LIT : DUMMY),\n            };\n        }));\n        const edges = new vis_data__WEBPACK_IMPORTED_MODULE_1__.DataSet({});\n        for (let e of peg.edges) {\n            const nucleus = (0,uuid__WEBPACK_IMPORTED_MODULE_2__.default)();\n            nodes.add([{\n                    id: nucleus,\n                    label: e.label,\n                    ...NUCLEUS,\n                    token: false,\n                    innerNode: true,\n                }]);\n            edges.add([\n                { from: nucleus, to: `${e.target.id}`, ...EDGE },\n                ...e.sources.map((v) => ({ from: v.id, to: nucleus, ...EDGE })),\n            ]);\n        }\n        this.data = { nodes, edges };\n        this.baseData = { nodes, edges };\n        if (options)\n            this.options = options;\n    }\n    render(on, callback) {\n        this.network = new vis_network__WEBPACK_IMPORTED_MODULE_0__.Network(on, this.data, this.options);\n        this.network.on(\"stabilizationIterationsDone\", callback);\n        return this;\n    }\n    nail() {\n        this.network.setOptions({ layout: { hierarchical: { enabled: false } } });\n        this.data.nodes.update(this.data.nodes\n            .map((node) => ({ id: node.id, fixed: true })));\n        this.network.setOptions({ physics: { solver: \"repulsion\" } });\n    }\n    fade() {\n        this.data.nodes.update(this.data.nodes.getIds().map((id) => ({ id: id.toString(), ...FAINT })));\n        this.data.edges.update(this.data.edges\n            .getIds()\n            .map((id) => ({ id, color: \"#ccc\", smooth: false })));\n        this.network.redraw();\n    }\n    merge(that) {\n        that.data.nodes.forEach((u) => {\n            if (!this.data.nodes.get(u.id)) {\n                this.data.nodes.add(u);\n            }\n        });\n        that.data.edges.forEach((e) => {\n            this.data.edges.add(e);\n        });\n    }\n    untangle() {\n        for (let row of this.iterLevels())\n            this.sortHorizontally(row);\n    }\n    *iterLevels() {\n        var yvisited = new Set();\n        for (let u of Object.values(this._nodes)) {\n            if (!yvisited.has(u.y)) {\n                yvisited.add(u.y);\n                yield this.getLevel(u.id);\n            }\n        }\n    }\n    selectLevel(node) {\n        this.network.selectNodes(this.getLevel(node).map((u) => u.id));\n    }\n    getLevel(node) {\n        if (!node) {\n            node = this.network.getSelectedNodes()[0];\n            if (!node)\n                return;\n        }\n        var pos = this.network.getPosition(node);\n        return Object.values(this._nodes).filter((u) => u.y == pos.y);\n    }\n    sortHorizontally(nodes) {\n        if (!nodes) {\n            var _m = this._nodes;\n            nodes = this.network.getSelectedNodes().map((id) => _m[id]);\n        }\n        var posx = nodes.map((u) => u.x).sort((x1, x2) => x1 - x2);\n        for (let i in nodes) {\n            this.network.moveNode(nodes[i].id, posx[i], nodes[i].y);\n        }\n    }\n    get _nodes() {\n        /** @oops */\n        return this.network.body.nodes;\n    }\n    get _edges() {\n        /** @oops */\n        return this.network.body.edges;\n    }\n    overlay(overlayView, disableBase = true) {\n        this.nail();\n        if (disableBase) {\n            this.fade();\n        }\n        this.merge(overlayView);\n    }\n    removeOverlay(overlayView) {\n        this.nail();\n        overlayView.data.nodes.forEach((u) => {\n            this.data.nodes.remove(u);\n        });\n        overlayView.data.edges.forEach((e) => {\n            this.data.edges.remove(e);\n        });\n        // Restore to the original view\n        this.baseData.nodes.update(this.baseData.nodes.map((node) => {\n            if (node.token)\n                return { id: node.id, fixed: false, ...LIT };\n            else if (node.innerNode)\n                return { id: node.id, fixed: false, ...NUCLEUS };\n            else\n                return { id: node.id, fixed: false, ...DUMMY };\n        }));\n        this.baseData.edges.update(this.baseData.edges.getIds().map((id) => ({ id, ...EDGE })));\n    }\n}\n\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/analysis/hypergraph.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("dfe1a28ecd7d13e1026b")
/******/ })();
/******/ 
/******/ }
);