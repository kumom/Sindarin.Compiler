/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatesindarin_compiler"]("main",{

/***/ "./src/components/PegPanel.tsx":
/*!*************************************!*\
  !*** ./src/components/PegPanel.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PegPanel)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _analysis_pattern__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../analysis/pattern */ \"./src/analysis/pattern.ts\");\n/* harmony import */ var _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../analysis/hypergraph */ \"./src/analysis/hypergraph.ts\");\n/* harmony import */ var _PegPanel_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PegPanel.scss */ \"./src/components/PegPanel.scss\");\n/* harmony import */ var vis_network_styles_vis_network_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vis-network/styles/vis-network.css */ \"./node_modules/vis-network/styles/vis-network.css\");\n\n\n\n\n\nclass PegPanel extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor(props) {\n        super(props);\n        this.sizeThreshold = 600;\n        this.ID = _analysis_pattern__WEBPACK_IMPORTED_MODULE_1__.HMatcher.Ast.byNodeType(\"Identifier\");\n        this.viewRef = react__WEBPACK_IMPORTED_MODULE_0__.createRef();\n        this.state = {\n            syntaxPeg: null,\n            defPeg: null,\n            view: null,\n            numVertices: 0\n        };\n    }\n    shouldComponentUpdate() {\n        return false;\n    }\n    clearCanvas() {\n        var _a;\n        if (this.viewRef.current)\n            (_a = this.viewRef.current.querySelector(\"canvas\")) === null || _a === void 0 ? void 0 : _a.remove();\n    }\n    show(peg) {\n        if (peg.vertices.size > this.sizeThreshold) {\n            console.warn(`[peg] too many vertices (${peg.vertices.size})`);\n            this.clearCanvas();\n        }\n        else {\n            if (this.viewRef.current)\n                this.setState({ view: peg.toVis().render(this.viewRef.current) });\n            // if (this.props.showDefPeg)\n            //     this.state.view.overlay(this.state.defPeg);\n        }\n    }\n    componentWillReceiveProps(nextProps) {\n        if (nextProps.ast === this.props.ast && nextProps.showDefPeg === this.props.showDefPeg)\n            return;\n        if (nextProps.ast !== this.props.ast) {\n            this.setState({ syntaxPeg: new _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_2__.Hypergraph().fromAst(nextProps.ast) }, () => {\n                this.clearCanvas();\n                this.show(this.state.syntaxPeg);\n                if (this.props.language === \"TypeScript\")\n                    this.setState({ defPeg: this.props.seman(this.state.syntaxPeg) });\n            });\n        }\n        if (nextProps.showDefPeg !== this.props.showDefPeg) {\n            if (nextProps.showDefPeg && this.state.defPeg)\n                this.state.view.overlay(this.state.defPeg);\n        }\n    }\n    render() {\n        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"panel\", id: \"peg-panel\" },\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { ref: this.viewRef }),\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { style: { display: this.state.numVertices > this.sizeThreshold ? \"block\" : \"none\" } }, \"Too many vertices\"));\n    }\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/PegPanel.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("a6db873a22993c7b6a0c")
/******/ 	})();
/******/ 	
/******/ }
);