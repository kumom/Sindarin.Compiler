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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AstPanel),\n/* harmony export */   \"TreeView\": () => (/* binding */ TreeView)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _AstPanel_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AstPanel.scss */ \"./src/components/AstPanel.scss\");\n\n\nclass AstPanel extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            tree: null\n        };\n    }\n    componentDidUpdate(prevProps, prevState, snapshot) {\n        if (this.props.ast) {\n            console.log(this.props.ast);\n            console.log(this.toTree(this.props.ast));\n        }\n        // if (this.props.ast) {\n        //     this.setState({ tree: this.toTree(this.props.ast) });\n        // }\n    }\n    componentDidMount() {\n        console.log(this.props.ast);\n        if (this.props.ast) {\n            this.setState({ tree: this.toTree(this.props.ast) });\n        }\n    }\n    // shouldComponentUpdate(nextProps, nextState) {\n    //     if (nextProps.ast === this.props.ast)\n    //         return false;\n    //     return true;\n    // }\n    toTree2(ast) {\n        return null;\n        // if (!ast) return null;\n        // if (!Array.isArray(ast)) return { text: ast.text };\n        // else\n        //     return ast.map((root) => ({\n        //         type: root.type,\n        //         children: this.toTree(root),\n        //     }));\n    }\n    toTree(ast) {\n        function getChildren(ast) {\n            if (ast.length == 1)\n                return ast[0];\n            else {\n                let children = [];\n                for (let i = 0; i < ast.length; i++) {\n                    children.push(ast[i]);\n                }\n                return children;\n            }\n        }\n        let stack = [], tree = [];\n        stack.push({ type: ast.type, children: getChildren(ast) });\n        let i = 2;\n        while (5 > 0) {\n            let obj = stack.pop();\n            if (Array.isArray(obj.children)) {\n                stack.push({ type: obj.type, children: getChildren(obj) });\n            }\n            else {\n                tree.push(obj);\n            }\n            i--;\n        }\n        return stack, tree;\n    }\n    render() {\n        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"panel\" });\n    }\n}\nfunction TreeView(props) {\n    const [expanded, setExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    if (!props.tree)\n        return null;\n    else\n        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"node-wrapper\", style: { transform: `translate(${props.depth + 0.5}em)` } },\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", { className: \"hoverable\", onClick: () => setExpanded(!expanded), style: {\n                    visibility: props.tree.children && props.tree.children.length >= 1 ? 'visible' : 'hidden',\n                    textAlign: 'center'\n                } }, expanded ? \"▾ \" : \"‣ \"),\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", { className: \"hoverable node\", onMouseEnter: event => { event.target.style.filter = 'invert(50%)'; }, onMouseLeave: event => { event.target.style.filter = 'none'; } }, props.tree.type),\n            props.tree.children.map(child => {\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { style: { display: expanded ? \"block\" : \"none\" } },\n                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(TreeViewMemo, { tree: child, depth: props.depth + 1 }));\n            }));\n}\nconst TreeViewMemo = react__WEBPACK_IMPORTED_MODULE_0__.memo(TreeView, (props, nextProps) => {\n    console.log(props.tree);\n    console.log(nextProps.tree);\n    return props.tree === nextProps.tree;\n});\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/AstPanel.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("8cf744724087d415b42d")
/******/ 	})();
/******/ 	
/******/ }
);