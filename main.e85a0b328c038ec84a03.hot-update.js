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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PegPanel)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../analysis/hypergraph */ \"./src/analysis/hypergraph.ts\");\n/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-spinners */ \"./node_modules/react-spinners/index.js\");\n/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _PegPanel_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PegPanel.scss */ \"./src/components/PegPanel.scss\");\n/* harmony import */ var vis_network_styles_vis_network_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vis-network/styles/vis-network.css */ \"./node_modules/vis-network/styles/vis-network.css\");\n\n\n\n\n\nfunction PegPanel(props) {\n    const sizeThreshold = 600;\n    const viewRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    const [numVertices, setNumVertices] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);\n    const [rendering, setRendering] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n    const [semanPeg, setSemanPeg] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [syntaxPeg, setSyntaxPeg] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [syntaxView, setSyntaxView] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [semanView, setSemanView] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    function clearCanvas() {\n        var _a;\n        if (viewRef.current) {\n            (_a = viewRef.current.querySelector(\"canvas\")) === null || _a === void 0 ? void 0 : _a.remove();\n        }\n    }\n    function setup() {\n        if (props.highlighted)\n            setSyntaxPeg(new _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_1__.Hypergraph(props.highlighted));\n        else if (props.ast) {\n            setSyntaxPeg(new _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_1__.Hypergraph(props.ast));\n        }\n        else {\n            clearCanvas();\n        }\n    }\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        if (!syntaxPeg)\n            return;\n        clearCanvas();\n        setNumVertices(syntaxPeg.vertices.size);\n        if (viewRef.current && syntaxPeg.vertices.size <= sizeThreshold) {\n            setRendering(true);\n            setSyntaxView(new _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_1__.HypergraphView(syntaxPeg).render(viewRef.current, () => {\n                setRendering(false);\n            }));\n        }\n        // Other languages are not yet supported for semantic analysis\n        if (props.language === \"TypeScript\")\n            setSemanPeg(props.seman(syntaxPeg));\n    }, [syntaxPeg]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        if (semanPeg) {\n            setSemanView(new _analysis_hypergraph__WEBPACK_IMPORTED_MODULE_1__.HypergraphView(semanPeg));\n        }\n    }, [semanPeg]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        if (semanView) {\n            if (props.showDefPeg) {\n                syntaxView.overlay(semanView);\n            }\n            else {\n                syntaxView.removeOverlay(semanView);\n            }\n        }\n    }, [props.showDefPeg, semanView]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        setup();\n    }, [props.ast, props.highlighted]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        setup();\n    }, []);\n    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"panel\", id: \"peg-panel\" },\n        react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_4__.FadeLoader, { loading: rendering, css: \"position: absolute; top: 50%; left: 50%;\" }),\n        react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { style: {\n                display: numVertices <= sizeThreshold ? \"block\" : \"none\",\n            }, ref: viewRef, id: \"peg-container\" }),\n        react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { style: {\n                display: numVertices > sizeThreshold ? \"block\" : \"none\",\n            } }, `Too many vertices: ${numVertices}`)));\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/PegPanel.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("50fcc180c4782043ba01")
/******/ })();
/******/ 
/******/ }
);