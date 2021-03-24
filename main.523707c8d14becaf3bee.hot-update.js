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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Hypergraph\": () => (/* binding */ Hypergraph),\n/* harmony export */   \"HypergraphView\": () => (/* binding */ HypergraphView)\n/* harmony export */ });\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v1.js\");\n/* harmony import */ var vis_network__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vis-network */ \"./node_modules/vis-network/peer/umd/vis-network.min.js\");\n/* harmony import */ var vis_network__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vis_network__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vis_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vis-data */ \"./node_modules/vis-data/peer/umd/vis-data.min.js\");\n/* harmony import */ var vis_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vis_data__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nclass Hypergraph {\n    constructor() {\n        this.vertices = new Map();\n        this.edges = [];\n        this._max = 0;\n    }\n    get nodes() {\n        var v = new Set();\n        for (let e of this.edges)\n            for (let u of e.incident)\n                v.add(u);\n        return v;\n    }\n    add(edges) {\n        var vmap = new Map(), get = (u) => {\n            if (typeof u === \"number\") {\n                if (u > 0)\n                    return this._get(u);\n                else {\n                    var v = vmap.get(u);\n                    if (!v) {\n                        v = this._fresh();\n                        vmap.set(u, v);\n                    }\n                    return v;\n                }\n            }\n            else {\n                if (!this.vertices.get(u.id))\n                    this.vertices.set(u.id, u);\n                return u;\n            }\n        };\n        for (let e of edges) {\n            for (let u of [e.target, ...e.sources])\n                if (typeof u === \"number\")\n                    this._max = Math.max(this._max, u);\n        }\n        var added = edges.map((ed) => {\n            var e = new Hypergraph.Edge(ed.label, ed.sources.map(get), get(ed.target));\n            e.sources.forEach((u) => u.outgoing.push(e));\n            e.target.incoming.push(e);\n            return e;\n        });\n        this.edges.push(...added);\n        return added;\n    }\n    remove(edges) {\n        for (let e of edges) {\n            e.target.incoming = e.target.incoming.filter((ue) => ue !== e);\n            for (let u of e.sources) {\n                u.outgoing = u.outgoing.filter((ue) => ue !== e);\n            }\n        }\n        this.edges = this.edges.filter((e) => !edges.includes(e));\n    }\n    merge(vertices) {\n        var rep = vertices[0];\n        for (let u of vertices.slice(1)) {\n            for (let e of u.incoming) {\n                e.target = rep;\n                rep.incoming.push(e);\n            }\n            for (let e of u.outgoing) {\n                e.sources = e.sources.map((v) => (u === v ? rep : v));\n                rep.outgoing.push(e);\n            }\n            this.vertices.delete(u.id);\n        }\n    }\n    fromAst(ast) {\n        var self = this, c = this._max;\n        function aux(ast) {\n            var root = ++c, u = self._get(root);\n            // @ts-ignore\n            if (ast.children) {\n                // @ts-ignore\n                var subs = ast.children.map(aux);\n                self.add([{ label: ast.type || \"\", sources: subs, target: root }]);\n            }\n            else {\n                // @ts-ignore\n                u.label = ast.text;\n            }\n            u.data = { ast }; /** @oops */\n            return root;\n        }\n        aux(ast);\n        this._max = c;\n        return this;\n    }\n    _get(id) {\n        var v = this.vertices.get(id);\n        if (!v) {\n            v = new Hypergraph.Vertex(id);\n            this.vertices.set(id, v);\n        }\n        return v;\n    }\n    _fresh() {\n        var u = new Hypergraph.Vertex(++this._max);\n        this.vertices.set(u.id, u);\n        return u;\n    }\n    toVis(edgeNodeProfile = null) {\n        var nodes = new vis_data__WEBPACK_IMPORTED_MODULE_1__.DataSet([...this.vertices.values()].map((u) => {\n            return {\n                id: u.id,\n                innerNode: false,\n                label: u.label || `${u.id}`,\n                shape: \"box\",\n                token: u.label ? true : false,\n                ...(u.label ? LIT : DUMMY),\n            };\n        }));\n        // Collect edges\n        var edges = new vis_data__WEBPACK_IMPORTED_MODULE_1__.DataSet([]);\n        for (let e of this.edges) {\n            var ve = e.toVis(edgeNodeProfile);\n            nodes.add(ve.nodes);\n            edges.add(ve.edges);\n        }\n        return new HypergraphView(this, {\n            nodes: nodes,\n            edges: edges,\n        });\n    }\n}\n(function (Hypergraph) {\n    class Vertex {\n        constructor(id) {\n            this.incoming = [];\n            this.outgoing = [];\n            this.id = id;\n        }\n    }\n    Hypergraph.Vertex = Vertex;\n    class Edge {\n        constructor(label, sources, target) {\n            this.label = label;\n            this.sources = sources;\n            this.target = target;\n        }\n        get incident() {\n            return [this.target, ...this.sources];\n        }\n        toVis(edgeNodeProfile = null) {\n            edgeNodeProfile = edgeNodeProfile || NUCLEUS;\n            var nucleus = (0,uuid__WEBPACK_IMPORTED_MODULE_2__.default)(), nodes = [\n                {\n                    id: nucleus,\n                    label: this.label,\n                    ...edgeNodeProfile,\n                    token: false,\n                    innerNode: true,\n                },\n            ], edges = [\n                // @ts-ignore\n                { from: nucleus, to: this.target.id, ...EDGE },\n                // @ts-ignore\n                ...this.sources.map((v) => ({ from: v.id, to: nucleus, ...EDGE })),\n            ];\n            return { nodes, edges };\n        }\n    }\n    Hypergraph.Edge = Edge;\n})(Hypergraph || (Hypergraph = {}));\nconst NUCLEUS = {\n    shape: \"box\",\n    color: \"#cca\",\n    shapeProperties: { borderRadius: 99 },\n    font: { color: \"#212121\" },\n    opacity: 1,\n}, EDGE = {\n    arrows: { to: { enabled: true, scaleFactor: 0.5 } },\n    color: \"#997\",\n    length: 1,\n}, DUMMY = {\n    color: \"#7bb2e8\",\n    shapeProperties: { borderRadius: 5 },\n    font: { color: \"#212121\" },\n    opacity: 1,\n}, LIT = {\n    color: \"#9d9\",\n    shapeProperties: { borderRadius: 0 },\n    font: { color: \"#212121\" },\n    opacity: 1,\n}, FAINT = {\n    color: {\n        background: \"#ddd\",\n        border: \"#bbb\",\n        highlight: { background: \"#ddd\", border: \"#bbb\" },\n    },\n    font: { color: \"#ccc\" },\n    opacity: 0.5,\n}, HIE = {\n    hierarchical: {\n        direction: \"DU\",\n        sortMethod: \"directed\",\n        levelSeparation: 75,\n    },\n}, PHY = {\n    physics: {\n        enabled: true,\n        solver: \"repulsion\",\n        minVelocity: 4,\n        timestep: 1,\n        hierarchicalRepulsion: {\n            nodeDistance: 50,\n            avoidOverlap: 1,\n        },\n    },\n};\nclass HypergraphView {\n    constructor(peg, data) {\n        this.options = {\n            layout: {\n                improvedLayout: false,\n                ...HIE,\n            },\n            interaction: {\n                zoomSpeed: 0.3,\n            },\n            ...PHY,\n        };\n        this.peg = peg;\n        this.basePeg = peg;\n        this.data = data;\n        this.baseData = data;\n        if (this.data.options)\n            this.options = this.data.options;\n    }\n    render(on, callback) {\n        this.network = new vis_network__WEBPACK_IMPORTED_MODULE_0__.Network(on, this.data, this.options);\n        this.network.on(\"stabilizationIterationsDone\", callback);\n        return this;\n    }\n    nail() {\n        this.network.storePositions();\n        this.network.setOptions({ layout: { hierarchical: { enabled: false } } });\n        this.data.nodes.update(this.data.nodes\n            .getIds()\n            .map((id) => ({ id, fixed: true /*physics: false*/ })));\n        this.data.edges.update(this.data.edges.getIds().map((id) => ({ id, physics: false })));\n        this.network.setOptions({ physics: { solver: \"repulsion\" } });\n    }\n    fade() {\n        this.data.nodes.update(this.data.nodes.getIds().map((id) => ({ id, ...FAINT })));\n        this.data.edges.update(this.data.edges\n            .getIds()\n            .map((id) => ({ id, color: \"#ccc\", smooth: false })));\n        this.postprocess();\n    }\n    merge(that) {\n        that.data.nodes.forEach((u) => {\n            if (!this.data.nodes.get(u.id)) {\n                this.data.nodes.add(u);\n            }\n        });\n        that.data.edges.forEach((e) => {\n            this.data.edges.add(e);\n        });\n    }\n    untangle() {\n        for (let row of this.iterLevels())\n            this.sortHorizontally(row);\n    }\n    *iterLevels() {\n        var yvisited = new Set();\n        for (let u of Object.values(this._nodes)) {\n            if (!yvisited.has(u.y)) {\n                yvisited.add(u.y);\n                yield this.getLevel(u.id);\n            }\n        }\n    }\n    selectLevel(node) {\n        this.network.selectNodes(this.getLevel(node).map((u) => u.id));\n    }\n    getLevel(node) {\n        if (!node) {\n            node = this.network.getSelectedNodes()[0];\n            if (!node)\n                return;\n        }\n        var pos = this.network.getPosition(node);\n        return Object.values(this._nodes).filter((u) => u.y == pos.y);\n    }\n    sortHorizontally(nodes) {\n        if (!nodes) {\n            var _m = this._nodes;\n            nodes = this.network.getSelectedNodes().map((id) => _m[id]);\n        }\n        var posx = nodes.map((u) => u.x).sort((x1, x2) => x1 - x2);\n        for (let i in nodes) {\n            this.network.moveNode(nodes[i].id, posx[i], nodes[i].y);\n        }\n    }\n    postprocess() {\n        for (let e of Object.values(this._edges))\n            this._shortenEdge(e);\n        this.network.redraw();\n    }\n    get _nodes() {\n        /** @oops */\n        return this.network.body.nodes;\n    }\n    get _edges() {\n        /** @oops */\n        return this.network.body.edges;\n    }\n    _drawingContext() {\n        var r = this.network.view, ctx = r.canvas.getContext();\n        ctx.translate(r.body.view.translation.x, r.body.view.translation.y);\n        ctx.scale(r.body.view.scale, r.body.view.scale);\n        return ctx;\n    }\n    /**\n     * Makes edge start and end at node borders, instead of Vis.js's\n     * default, which is their centers.\n     * @param e renderer edge\n     * @oops this is using internal APIs and monkey-patching because the\n     *   EdgeType class hierarchy is not exposed.\n     */\n    _shortenEdge(e) {\n        var shape = e.edgeType; /** @oops internal API */\n        if (shape.constructor.name === \"StraightEdge\") {\n            shape._drawLine = function (ctx, val) {\n                this.fromPoint = this.getArrowData(ctx, \"from\", null, false, false, val).point;\n                this.toPoint = this.getArrowData(ctx, \"to\", null, false, false, val).point;\n                this.constructor.prototype._drawLine.call(this, ctx, val);\n            };\n        }\n        /** @todo not handling non-straight edges atm */\n    }\n    overlay(overlayView, disableBase = true) {\n        this.nail();\n        if (disableBase) {\n            this.fade();\n        }\n        this.merge(overlayView);\n    }\n    removeOverlay(overlayView) {\n        this.nail();\n        overlayView.data.nodes.forEach((u) => {\n            this.data.nodes.remove(u);\n        });\n        overlayView.data.edges.forEach((e) => {\n            this.data.edges.remove(e);\n        });\n        // Restore to the original view\n        this.baseData.nodes.update(this.baseData.nodes.map((node) => {\n            if (node.token)\n                return { id: node.id, ...LIT };\n            else if (node.innerNode)\n                return { id: node.id, ...NUCLEUS };\n            else\n                return { id: node.id, ...DUMMY };\n        }));\n        this.baseData.edges.update(this.baseData.edges.getIds().map((id) => ({ id, ...EDGE })));\n    }\n}\n\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/analysis/hypergraph.ts?");

/***/ }),

/***/ "./src/components/PegPanel.tsx":
/*!*************************************!*\
  !*** ./src/components/PegPanel.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PegPanel)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../analysis/hypergraph */ \"./src/analysis/hypergraph.ts\");\n/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-spinners */ \"./node_modules/react-spinners/index.js\");\n/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _PegPanel_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PegPanel.scss */ \"./src/components/PegPanel.scss\");\n/* harmony import */ var vis_network_styles_vis_network_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vis-network/styles/vis-network.css */ \"./node_modules/vis-network/styles/vis-network.css\");\n\n\n\n\n\nfunction PegPanel(props) {\n    const sizeThreshold = 600;\n    const viewRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    const [numVertices, setNumVertices] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);\n    const [rendering, setRendering] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n    const [semanPeg, setSemanPeg] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [syntaxPeg, setSyntaxPeg] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [syntaxView, setSyntaxView] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [semanView, setSemanView] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    function clearCanvas() {\n        var _a;\n        if (viewRef.current) {\n            (_a = viewRef.current.querySelector(\"canvas\")) === null || _a === void 0 ? void 0 : _a.remove();\n        }\n    }\n    function setup() {\n        if (props.highlighted)\n            setSyntaxPeg(new _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_1__.Hypergraph().fromAst(props.highlighted));\n        else if (props.ast) {\n            setSyntaxPeg(new _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_1__.Hypergraph().fromAst(props.ast));\n        }\n        else {\n            clearCanvas();\n        }\n    }\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        if (!syntaxPeg)\n            return;\n        clearCanvas();\n        setNumVertices(syntaxPeg.vertices.size);\n        if (viewRef.current && syntaxPeg.vertices.size <= sizeThreshold) {\n            setRendering(true);\n            setSyntaxView(syntaxPeg.toVis().render(viewRef.current, () => {\n                setRendering(false);\n            }));\n        }\n        // Other languages are not yet supported for semantic analysis\n        if (props.language === \"TypeScript\")\n            setSemanPeg(props.seman(syntaxPeg));\n    }, [syntaxPeg]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        if (semanPeg) {\n            setSemanView(semanPeg.toVis());\n        }\n    }, [semanPeg]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        if (semanView) {\n            if (props.showDefPeg) {\n                syntaxView.overlay(semanView);\n            }\n            else {\n                syntaxView.removeOverlay(semanView);\n            }\n        }\n    }, [props.showDefPeg, semanView]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        setup();\n    }, [props.ast, props.highlighted]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        setup();\n    }, []);\n    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"panel\", id: \"peg-panel\" },\n        react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_4__.FadeLoader, { loading: rendering, css: \"position: absolute; top: 50%; left: 50%;\" }),\n        react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { style: {\n                display: numVertices <= sizeThreshold ? \"block\" : \"none\",\n            }, ref: viewRef, id: \"peg-container\" }),\n        react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { style: {\n                display: numVertices > sizeThreshold ? \"block\" : \"none\",\n            } }, `Too many vertices: ${numVertices}`)));\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/PegPanel.tsx?");

/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _syntax_c99__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./syntax/c99 */ \"./src/syntax/c99.ts\");\n/* harmony import */ var _syntax_typescript_ast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./syntax/typescript-ast */ \"./src/syntax/typescript-ast.ts\");\n/* harmony import */ var _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./analysis/hypergraph */ \"./src/analysis/hypergraph.ts\");\n/* harmony import */ var _analysis_pattern__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./analysis/pattern */ \"./src/analysis/pattern.ts\");\n/* harmony import */ var _analysis_syntax__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./analysis/syntax */ \"./src/analysis/syntax.ts\");\n/* harmony import */ var _analysis_semantics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./analysis/semantics */ \"./src/analysis/semantics.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/App */ \"./src/components/App.tsx\");\n\n\n\n\n\n\nvar Edge = _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_2__.Hypergraph.Edge;\nfunction semanticAnalysis_C(peg1) {\n    var peg2 = new _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_2__.Hypergraph();\n    peg2._max = peg1._max;\n    const S = [\"expression_statement\"];\n    const L = [\n        \"expression_statement\",\n        \"function_definition\",\n        \"declaration\",\n        \"parameter_declaration\",\n        \"direct_declarator\",\n        \"compound_statement\",\n        \"iteration_statement\",\n        \"selection_statement\",\n        \"iteration_statement\",\n    ];\n    var m = new _analysis_pattern__WEBPACK_IMPORTED_MODULE_3__.HMatcher(peg1);\n    m.l(S).t((u) => {\n        peg2.add([{ label: \"sigma\", sources: [u], target: -1 }]);\n    });\n    m.l(L).t((u) => {\n        peg2.add([{ label: \"lscope\", sources: [u], target: -1 }]);\n    });\n    m.l(\"compound_statement\").e((e) => {\n        m.sl(e.target, \"lscope\").t((v) => {\n            peg2.add([\n                {\n                    label: \"lscope\",\n                    sources: [e.sources[1]],\n                    target: v,\n                },\n            ]);\n        });\n    });\n    m.l(\"direct_declarator\").e((e) => {\n        if (e.sources[1] && e.sources[1].label == \"(\") {\n            m.sl(e.target, \"lscope\").t((v) => {\n                peg2.add([\n                    {\n                        label: \"lscope\",\n                        sources: [e.sources[2]],\n                        target: v,\n                    },\n                ]);\n            });\n        }\n    });\n    function addIf1(label, u, v) {\n        if (u != null && v != null)\n            peg2.add([new Edge(label, [u], v)]);\n    }\n    m.l(\"block_item_list\").e((e) => {\n        var sigmas = e.sources.map((u) => m.sl(u, \"sigma\").t_first());\n        var lscopes = e.sources.map((u) => m.sl(u, \"lscope\").t_first());\n        for (let i = 0; i < sigmas.length - 1; ++i) {\n            addIf1(\"next\", sigmas[i], sigmas[i + 1]);\n        }\n        addIf1(\"id\", m.sl(e.target, \"lscope\").t_first(), lscopes[0]);\n        for (let i = 0; i < lscopes.length - 1; ++i) {\n            addIf1(\"next\", lscopes[i], lscopes[i + 1]);\n        }\n    });\n    m.l(\"function_definition\").e((e) => {\n        addIf1(\"next\", m.sl(e.target, \"lscope\").t_first(), m.sl(e.sources[1], \"lscope\").t_first());\n    });\n    m.l(\"parameter_list\").e((e) => {\n        var u = m.sl(e.target, \"lscope\").t_first();\n        for (const s of e.sources) {\n            var v = m.sl(s, \"lscope\").t_first();\n            if (v != null) {\n                addIf1(\"next\", u, v);\n                u = v;\n            }\n        }\n        // connect to function body, if present\n        m.l(\"direct_declarator\").t((dd) => {\n            m.sl(dd, \"function_definition\").e((fd) => m.sl(fd.sources[2], \"lscope\").t((v) => addIf1(\"id\", u, v)));\n        });\n    });\n    m.l(\"selection_statement\").e((e) => {\n        switch (e.sources[0].label) {\n            case \"if\":\n                var [u, v1, v2] = [e.target, e.sources[4], e.sources[6]].map((u) => m.sl(u, \"lscope\").t_first());\n                addIf1(\"id\", u, v1);\n                addIf1(\"id\", u, v2);\n                break;\n        }\n    });\n    m.l(\"iteration_statement\").e((e) => {\n        switch (e.sources[0].label) {\n            case \"while\":\n                var [u, v] = [e.target, e.sources[4]].map((u) => m.sl(u, \"lscope\").t_first());\n                addIf1(\"id\", u, v);\n                break;\n        }\n    });\n    m = new _analysis_pattern__WEBPACK_IMPORTED_MODULE_3__.HMatcher(peg2);\n    m.l(\"id\").e((e) => {\n        peg2.merge(e.incident);\n        peg2.remove([e]);\n    });\n    return peg2;\n}\nfunction semanticAnalysis_TS(sourcePeg) {\n    const scopeResolutionPeg = new _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_2__.Hypergraph();\n    scopeResolutionPeg._max = sourcePeg._max;\n    const m = new _analysis_pattern__WEBPACK_IMPORTED_MODULE_3__.HMatcher(sourcePeg);\n    m.l(_analysis_syntax__WEBPACK_IMPORTED_MODULE_4__.EXPRESSIONS).s(_analysis_semantics__WEBPACK_IMPORTED_MODULE_5__.resolveLexicalScope.bind(null, sourcePeg, scopeResolutionPeg));\n    return scopeResolutionPeg;\n}\nconst config = {\n    C: {\n        parser: new _syntax_c99__WEBPACK_IMPORTED_MODULE_0__.C99Parser(),\n        seman: semanticAnalysis_C,\n        filename: \"data/c/bincnt.c\",\n        entry: \"counter\",\n    },\n    TypeScript: {\n        parser: new _syntax_typescript_ast__WEBPACK_IMPORTED_MODULE_1__.TypeScriptParser(),\n        seman: semanticAnalysis_TS,\n        filename: \"data/typescript/lib/events.ts\",\n        entry: \"addListener\",\n    },\n};\n\n\n\nreact_dom__WEBPACK_IMPORTED_MODULE_7__.render(react__WEBPACK_IMPORTED_MODULE_6__.createElement(_components_App__WEBPACK_IMPORTED_MODULE_8__.default, { config: config }), document.getElementById(\"app\"));\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/index.tsx?");

/***/ }),

/***/ "./src/syntax/typescript-ast.ts":
/*!**************************************!*\
  !*** ./src/syntax/typescript-ast.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TypeScriptParser\": () => (/* binding */ TypeScriptParser)\n/* harmony export */ });\n/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typescript */ \"./node_modules/typescript/lib/typescript.js\");\n/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typescript__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser */ \"./src/syntax/parser.ts\");\nvar __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {\n    if (!privateMap.has(receiver)) {\n        throw new TypeError(\"attempted to set private field on non-instance\");\n    }\n    privateMap.set(receiver, value);\n    return value;\n};\nvar __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {\n    if (!privateMap.has(receiver)) {\n        throw new TypeError(\"attempted to get private field on non-instance\");\n    }\n    return privateMap.get(receiver);\n};\nvar _codeRangeComputer;\n\n\nclass TypeScriptParser {\n    constructor() {\n        _codeRangeComputer.set(this, void 0);\n        __classPrivateFieldSet(this, _codeRangeComputer, new _parser__WEBPACK_IMPORTED_MODULE_1__.default(\"\"));\n    }\n    parse(program) {\n        var src = (0,typescript__WEBPACK_IMPORTED_MODULE_0__.createSourceFile)(\"this-program.ts\", program, typescript__WEBPACK_IMPORTED_MODULE_0__.ScriptTarget.Latest);\n        __classPrivateFieldSet(this, _codeRangeComputer, new _parser__WEBPACK_IMPORTED_MODULE_1__.default(program));\n        // Remove EndOfFileToken\n        return this.postprocessSourceFile(src);\n    }\n    postprocessSourceFile(src) {\n        return this.postprocessAst(src, src);\n    }\n    postprocessAst(u, src) {\n        var kind = typescript__WEBPACK_IMPORTED_MODULE_0__.SyntaxKind[u.kind];\n        if ((0,typescript__WEBPACK_IMPORTED_MODULE_0__.isToken)(u)) {\n            return {\n                type: kind,\n                text: u.getText(src),\n                range: this.getRange(u),\n                _ts: u,\n                children: null,\n            };\n        }\n        else {\n            var children = u\n                .getChildren(src)\n                .map((s) => this.postprocessAst(s, src));\n            return {\n                type: kind,\n                _ts: u,\n                range: this.getRange(u),\n                children,\n            };\n        }\n    }\n    getRange(u) {\n        const start = __classPrivateFieldGet(this, _codeRangeComputer).getNumberAndColumnFromPos(u.pos);\n        const end = __classPrivateFieldGet(this, _codeRangeComputer).getNumberAndColumnFromPos(u.end);\n        return {\n            startLineNumber: start.lineNumber,\n            startColumn: start.column,\n            endLineNumber: end.lineNumber,\n            endColumn: end.column,\n        };\n    }\n}\n_codeRangeComputer = new WeakMap();\n\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/syntax/typescript-ast.ts?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v1.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v1.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-browser/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-browser/stringify.js\");\n\n // **`v1()` - Generate time-based UUID**\n//\n// Inspired by https://github.com/LiosK/UUID.js\n// and http://docs.python.org/library/uuid.html\n\nvar _nodeId;\n\nvar _clockseq; // Previous uuid creation time\n\n\nvar _lastMSecs = 0;\nvar _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details\n\nfunction v1(options, buf, offset) {\n  var i = buf && offset || 0;\n  var b = buf || new Array(16);\n  options = options || {};\n  var node = options.node || _nodeId;\n  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not\n  // specified.  We do this lazily to minimize issues related to insufficient\n  // system entropy.  See #189\n\n  if (node == null || clockseq == null) {\n    var seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__.default)();\n\n    if (node == null) {\n      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)\n      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];\n    }\n\n    if (clockseq == null) {\n      // Per 4.2.2, randomize (14 bit) clockseq\n      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;\n    }\n  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,\n  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so\n  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'\n  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.\n\n\n  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock\n  // cycle to simulate higher resolution clock\n\n  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)\n\n  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression\n\n  if (dt < 0 && options.clockseq === undefined) {\n    clockseq = clockseq + 1 & 0x3fff;\n  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new\n  // time interval\n\n\n  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {\n    nsecs = 0;\n  } // Per 4.2.1.2 Throw error if too many uuids are requested\n\n\n  if (nsecs >= 10000) {\n    throw new Error(\"uuid.v1(): Can't create more than 10M uuids/sec\");\n  }\n\n  _lastMSecs = msecs;\n  _lastNSecs = nsecs;\n  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch\n\n  msecs += 12219292800000; // `time_low`\n\n  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;\n  b[i++] = tl >>> 24 & 0xff;\n  b[i++] = tl >>> 16 & 0xff;\n  b[i++] = tl >>> 8 & 0xff;\n  b[i++] = tl & 0xff; // `time_mid`\n\n  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;\n  b[i++] = tmh >>> 8 & 0xff;\n  b[i++] = tmh & 0xff; // `time_high_and_version`\n\n  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version\n\n  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)\n\n  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`\n\n  b[i++] = clockseq & 0xff; // `node`\n\n  for (var n = 0; n < 6; ++n) {\n    b[i + n] = node[n];\n  }\n\n  return buf || (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__.default)(b);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v1);\n\n//# sourceURL=webpack://sindarin.compiler/./node_modules/uuid/dist/esm-browser/v1.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1ee82e25504df74b6261")
/******/ })();
/******/ 
/******/ }
);