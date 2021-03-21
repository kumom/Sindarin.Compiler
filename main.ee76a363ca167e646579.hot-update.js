/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatesindarin_compiler"]("main",{

/***/ "./src/components/AstPanel.tsx":
/*!*************************************!*\
  !*** ./src/components/AstPanel.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AstPanel)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _AstPanel_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AstPanel.scss */ \"./src/components/AstPanel.scss\");\n/* harmony import */ var _util_astToTree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/astToTree */ \"./src/util/astToTree.ts\");\n\n\n\nclass AstPanel extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            tree: null,\n        };\n    }\n    static getDerivedStateFromProps(nextProps) {\n        if (nextProps.ast)\n            return { tree: (0,_util_astToTree__WEBPACK_IMPORTED_MODULE_2__.astToTree)(nextProps.ast) };\n        else\n            return { tree: null };\n    }\n    render() {\n        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"panel\", id: \"ast-panel\" },\n            this.state.tree ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement(TreeView, { tree: this.state.tree, depth: 0, highlightedRange: this.props.highlightedRange, updateHighlightedRange: this.props.updateHighlightedRange })) : null,\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { id: \"parse-error\", style: { display: this.props.parseErrorMsg ? \"block\" : \"none\" } }, this.props.parseErrorMsg)));\n    }\n}\nfunction TreeView(props) {\n    const [expanded, setExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n    if (!props.tree)\n        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", null);\n    else {\n        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"node-wrapper\", style: { transform: `translate(${props.depth + 15}px)` } },\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", { className: \"hoverable\", onClick: () => {\n                    setExpanded(!expanded);\n                }, style: {\n                    visibility: props.tree.children &&\n                        props.tree.children.length >= 1\n                        ? \"visible\"\n                        : \"hidden\",\n                    textAlign: \"center\",\n                } }, expanded ? \"▾ \" : \"‣ \"),\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", { className: props.tree.range != null ? \"node hoverable\" : \"node\", style: {\n                    filter: props.tree.range === props.highlightedRange\n                        ? \"invert(50%)\"\n                        : \"none\",\n                }, onMouseEnter: () => {\n                    if (props.tree.range == null)\n                        return;\n                    props.updateHighlightedRange(props.tree.range);\n                }, onMouseLeave: () => {\n                    props.updateHighlightedRange();\n                } }, props.tree.type),\n            Array.isArray(props.tree.children)\n                ? props.tree.children.map((child, i) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { style: { display: expanded ? \"block\" : \"none\" }, key: i },\n                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(TreeView, { tree: child, depth: props.depth + 1, highlightedRange: props.highlightedRange, updateHighlightedRange: props.updateHighlightedRange }))))\n                : null));\n    }\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/AstPanel.tsx?");

/***/ }),

/***/ "./src/util/astToTree.ts":
/*!*******************************!*\
  !*** ./src/util/astToTree.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"astToTree\": () => (/* binding */ astToTree)\n/* harmony export */ });\nfunction astToTree(ast) {\n    if (!Array.isArray(ast)) {\n        return { type: ast.type, text: ast.text, range: ast.range };\n    }\n    else {\n        return {\n            type: ast.type,\n            children: ast.map((t) => astToTree(t)),\n            range: ast.range,\n        };\n    }\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/util/astToTree.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("63cfc286cf5f3487c83b")
/******/ })();
/******/ 
/******/ }
);