/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatesindarin_compiler"]("main",{

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _syntax_c99__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./syntax/c99 */ \"./src/syntax/c99.ts\");\n/* harmony import */ var _syntax_typescript_ast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./syntax/typescript-ast */ \"./src/syntax/typescript-ast.ts\");\n/* harmony import */ var _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./analysis/hypergraph */ \"./src/analysis/hypergraph.ts\");\n/* harmony import */ var _analysis_pattern__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./analysis/pattern */ \"./src/analysis/pattern.ts\");\n/* harmony import */ var _analysis_syntax__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./analysis/syntax */ \"./src/analysis/syntax.ts\");\n/* harmony import */ var _analysis_semantics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./analysis/semantics */ \"./src/analysis/semantics.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/App */ \"./src/components/App.tsx\");\n\n\n\n\n\n\nvar Edge = _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_2__.Hypergraph.Edge;\nfunction semanticAnalysis_C(peg1) {\n    var peg2 = new _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_2__.Hypergraph();\n    peg2.maxId = peg1.maxId;\n    const S = [\"expression_statement\"];\n    const L = [\n        \"expression_statement\",\n        \"function_definition\",\n        \"declaration\",\n        \"parameter_declaration\",\n        \"direct_declarator\",\n        \"compound_statement\",\n        \"iteration_statement\",\n        \"selection_statement\",\n        \"iteration_statement\",\n    ];\n    var m = new _analysis_pattern__WEBPACK_IMPORTED_MODULE_3__.HMatcher(peg1);\n    m.l(S).t((u) => {\n        peg2.add([{ label: \"sigma\", sources: [u], target: -1 }]);\n    });\n    m.l(L).t((u) => {\n        peg2.add([{ label: \"lscope\", sources: [u], target: -1 }]);\n    });\n    m.l(\"compound_statement\").e((e) => {\n        m.sl(e.target, \"lscope\").t((v) => {\n            peg2.add([\n                {\n                    label: \"lscope\",\n                    sources: [e.sources[1]],\n                    target: v,\n                },\n            ]);\n        });\n    });\n    m.l(\"direct_declarator\").e((e) => {\n        if (e.sources[1] && e.sources[1].label == \"(\") {\n            m.sl(e.target, \"lscope\").t((v) => {\n                peg2.add([\n                    {\n                        label: \"lscope\",\n                        sources: [e.sources[2]],\n                        target: v,\n                    },\n                ]);\n            });\n        }\n    });\n    function addIf1(label, u, v) {\n        if (u != null && v != null)\n            peg2.add([new Edge(label, [u], v)]);\n    }\n    m.l(\"block_item_list\").e((e) => {\n        var sigmas = e.sources.map((u) => m.sl(u, \"sigma\").t_first());\n        var lscopes = e.sources.map((u) => m.sl(u, \"lscope\").t_first());\n        for (let i = 0; i < sigmas.length - 1; ++i) {\n            addIf1(\"next\", sigmas[i], sigmas[i + 1]);\n        }\n        addIf1(\"id\", m.sl(e.target, \"lscope\").t_first(), lscopes[0]);\n        for (let i = 0; i < lscopes.length - 1; ++i) {\n            addIf1(\"next\", lscopes[i], lscopes[i + 1]);\n        }\n    });\n    m.l(\"function_definition\").e((e) => {\n        addIf1(\"next\", m.sl(e.target, \"lscope\").t_first(), m.sl(e.sources[1], \"lscope\").t_first());\n    });\n    m.l(\"parameter_list\").e((e) => {\n        var u = m.sl(e.target, \"lscope\").t_first();\n        for (const s of e.sources) {\n            var v = m.sl(s, \"lscope\").t_first();\n            if (v != null) {\n                addIf1(\"next\", u, v);\n                u = v;\n            }\n        }\n        // connect to function body, if present\n        m.l(\"direct_declarator\").t((dd) => {\n            m.sl(dd, \"function_definition\").e((fd) => m.sl(fd.sources[2], \"lscope\").t((v) => addIf1(\"id\", u, v)));\n        });\n    });\n    m.l(\"selection_statement\").e((e) => {\n        switch (e.sources[0].label) {\n            case \"if\":\n                var [u, v1, v2] = [e.target, e.sources[4], e.sources[6]].map((u) => m.sl(u, \"lscope\").t_first());\n                addIf1(\"id\", u, v1);\n                addIf1(\"id\", u, v2);\n                break;\n        }\n    });\n    m.l(\"iteration_statement\").e((e) => {\n        switch (e.sources[0].label) {\n            case \"while\":\n                var [u, v] = [e.target, e.sources[4]].map((u) => m.sl(u, \"lscope\").t_first());\n                addIf1(\"id\", u, v);\n                break;\n        }\n    });\n    m = new _analysis_pattern__WEBPACK_IMPORTED_MODULE_3__.HMatcher(peg2);\n    m.l(\"id\").e((e) => {\n        peg2.merge(e.incident);\n        peg2.remove([e]);\n    });\n    return peg2;\n}\nfunction semanticAnalysis_TS(sourcePeg) {\n    const scopeResolutionPeg = new _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_2__.Hypergraph();\n    scopeResolutionPeg.maxId = sourcePeg.maxId;\n    const m = new _analysis_pattern__WEBPACK_IMPORTED_MODULE_3__.HMatcher(sourcePeg);\n    m.l(_analysis_syntax__WEBPACK_IMPORTED_MODULE_4__.EXPRESSIONS).s(_analysis_semantics__WEBPACK_IMPORTED_MODULE_5__.resolveLexicalScope.bind(null, sourcePeg, scopeResolutionPeg));\n    return scopeResolutionPeg;\n}\nconst config = {\n    C: {\n        parser: new _syntax_c99__WEBPACK_IMPORTED_MODULE_0__.C99Parser(),\n        seman: semanticAnalysis_C,\n        filename: \"data/c/bincnt.c\",\n        entry: \"counter\",\n    },\n    TypeScript: {\n        parser: new _syntax_typescript_ast__WEBPACK_IMPORTED_MODULE_1__.TypeScriptParser(),\n        seman: semanticAnalysis_TS,\n        filename: \"data/typescript/lib/events.ts\",\n        entry: \"addListener\",\n    },\n};\n\n\n\nreact_dom__WEBPACK_IMPORTED_MODULE_7__.render(react__WEBPACK_IMPORTED_MODULE_6__.createElement(_components_App__WEBPACK_IMPORTED_MODULE_8__.default, { config: config }), document.getElementById(\"app\"));\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/index.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b79a167d4740a4d82678")
/******/ })();
/******/ 
/******/ }
);