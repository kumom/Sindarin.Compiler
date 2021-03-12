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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AstPanel)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _AstPanel_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AstPanel.scss */ \"./src/components/AstPanel.scss\");\n\n\nclass AstPanel extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            tree: null\n        };\n    }\n    static toTree(ast) {\n        if (!ast)\n            return null;\n        if (!Array.isArray(ast))\n            return { text: ast.text };\n        else\n            return ast.map((root) => ({\n                type: root.type,\n                children: AstPanel.toTree(root),\n                range: root.range\n            }));\n    }\n    static getDerivedStateFromProps(nextProps) {\n        if (nextProps.ast)\n            return { tree: AstPanel.toTree(nextProps.ast) };\n        else\n            return { tree: null };\n    }\n    shouldComponentUpdate() {\n        return true;\n    }\n    render() {\n        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"panel\", id: \"ast-panel\" },\n            this.state.tree ? this.state.tree.map((t, i) => react__WEBPACK_IMPORTED_MODULE_0__.createElement(TreeView, { key: i, tree: t, depth: 0, highlightedRange: this.props.highlightedRange, updateHighlightedRange: this.props.updateHighlightedRange })) : null,\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { id: \"parse-error\", style: { display: this.props.parseErrorMsg ? \"block\" : \"none\" } }, this.props.parseErrorMsg));\n    }\n}\nclass TreeView extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            expanded: false\n        };\n    }\n    componentDidUpdate() {\n        console.log(this.props.highlightedRange);\n    }\n    // shouldComponentUpdate(nextProps, nextState) {\n    //     return nextProps.tree !== this.props.tree || \n    //         nextProps.parentHighlighted !== this.props.parentHighlighted ||\n    //         nextState.expanded !== this.state.expanded;\n    // }\n    render() {\n        if (!this.props.tree)\n            return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", null);\n        else\n            return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"node-wrapper\", style: { transform: `translate(${this.props.depth + 15}px)` } },\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", { className: \"hoverable\", onClick: () => { this.setState({ expanded: !this.state.expanded }); }, style: {\n                        visibility: this.props.tree.children && this.props.tree.children.length >= 1 ? 'visible' : 'hidden',\n                        textAlign: 'center'\n                    } }, this.state.expanded ? \"▾ \" : \"‣ \"),\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", { className: this.props.tree.range ? \"node hoverable\" : \"node\", style: { filter: this.props.tree.range === this.props.highlightedRange ? 'invert(50%)' : 'none' }, onClick: () => {\n                        if (!this.props.tree.range)\n                            return;\n                        this.props.updateHighlightedRange(this.props.tree.range);\n                    } }, this.props.tree.type),\n                Array.isArray(this.props.tree.children) ?\n                    this.props.tree.children.map((child, i) => react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { style: { display: this.state.expanded ? \"block\" : \"none\" }, key: i },\n                        react__WEBPACK_IMPORTED_MODULE_0__.createElement(TreeView, { tree: child, depth: this.props.depth + 1, highlightedRange: this.props.highlightedRange, updateHighlightedRange: this.props.updateHighlightedRange })))\n                    : null);\n    }\n}\n// function TreeView(props: {\n//     tree: any, depth: number, updateHighlightedRange: (range?: CodeRange) => void\n// }) {\n//     const [expanded, setExpanded] = useState(false);\n//     const [highlighted, setHighlighted] = useState(false);\n//     if (!props.tree) return null\n//     else return <div\n//         className=\"node-wrapper\"\n//         style={{ transform: `translate(${props.depth + 15}px)` }}>\n//         <span\n//             className=\"hoverable\"\n//             onClick={() => { setExpanded(!expanded); }}\n//             style={{\n//                 visibility:\n//                     props.tree.children && props.tree.children.length >= 1 ? 'visible' : 'hidden',\n//                 textAlign: 'center'\n//             }}>{expanded ? \"▾ \" : \"‣ \"}</span>\n//         <span\n//             className={props.tree.range ? \"node hoverable\" : \"node\"}\n//             onClick={event => {\n//                 if (!props.tree.range) return;\n//                 if (highlighted) {\n//                     (event.target as HTMLDivElement).style.filter = 'none';\n//                     setHighlighted(false);\n//                     props.updateHighlightedRange(null);\n//                 }\n//                 else {\n//                     setHighlighted(true);\n//                     (event.target as HTMLDivElement).style.filter = 'invert(50%)'\n//                     props.updateHighlightedRange(props.tree.range); console.log(\"range: \", props.tree.range) \n//                 }\n//             }}\n//         >{props.tree.type}</span>\n//         {\n//             Array.isArray(props.tree.children) ?\n//                 props.tree.children.map((child, i) =>\n//                     <div style={{ display: expanded ? \"block\" : \"none\" }} key={i} >\n//                         <TreeView tree={child} depth={props.depth + 1} updateHighlightedRange={props.updateHighlightedRange} />\n//                     </div>\n//                 )\n//                 : null\n//         }\n//     </div>\n// }\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/AstPanel.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("f7b66fa50c92c3178748")
/******/ 	})();
/******/ 	
/******/ }
);