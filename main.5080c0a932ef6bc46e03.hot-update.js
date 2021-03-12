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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AstPanel),\n/* harmony export */   \"TreeView\": () => (/* binding */ TreeView)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _AstPanel_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AstPanel.scss */ \"./src/components/AstPanel.scss\");\n\n\nclass AstPanel extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            tree: null\n        };\n    }\n    componentWillReceiveProps(nextProps) {\n        if (nextProps.ast) {\n            const tree = this.toTree(nextProps.ast);\n            console.log(\"tree: \", tree);\n            this.setState({ tree });\n        }\n    }\n    toTree(ast) {\n        if (!ast)\n            return null;\n        if (!Array.isArray(ast))\n            return { text: ast.text };\n        else\n            return ast.map((root) => ({\n                type: root.type,\n                children: this.toTree(root),\n            }));\n    }\n    render() {\n        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"panel\" }, this.state.tree ? this.state.tree.map((t, i) => react__WEBPACK_IMPORTED_MODULE_0__.createElement(TreeView, { key: i, tree: t, depth: 0 })) : null);\n    }\n}\nfunction TreeView(props) {\n    const [expanded, setExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    if (!props.tree)\n        return null;\n    else\n        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"node-wrapper\", style: { transform: `translate(${props.depth}em)` } },\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", { className: \"hoverable\", onClick: () => { console.log(expanded); setExpanded(!expanded); }, style: {\n                    visibility: props.tree.children && props.tree.children.length >= 1 ? 'visible' : 'hidden',\n                    textAlign: 'center'\n                } }, expanded ? \"▾ \" : \"‣ \"),\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", { className: \"hoverable node\", onMouseEnter: event => { event.target.style.filter = 'invert(50%)'; }, onMouseLeave: event => { event.target.style.filter = 'none'; } }, props.tree.type),\n            Array.isArray(props.tree.children) ?\n                props.tree.children.map((child, i) => react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { style: { display: expanded ? \"block\" : \"none\" }, key: i },\n                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(TreeView, { tree: child, depth: props.depth + 1 })))\n                : null);\n}\nconst TreeViewMemo = react__WEBPACK_IMPORTED_MODULE_0__.memo(TreeView, (props, nextProps) => {\n    console.log(props.tree);\n    console.log(nextProps.tree);\n    return props.tree === nextProps.tree;\n});\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/AstPanel.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("14eb7486cbeaa6f09ea1")
/******/ 	})();
/******/ 	
/******/ }
);