/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatesindarin_compiler"]("main",{

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _App_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.scss */ \"./src/App.scss\");\n/* harmony import */ var _components_EditorPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/EditorPanel */ \"./src/components/EditorPanel.tsx\");\n/* harmony import */ var _components_Toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Toolbar */ \"./src/components/Toolbar.tsx\");\n/* harmony import */ var _components_AstPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AstPanel */ \"./src/components/AstPanel.tsx\");\n\n\n\n\n\n// import Resizer from \"./components/Resizer.vue\";\n// import AstPanel from \"./components/AstPanel.vue\";\n// import PegPanel from \"./components/PegPanel.vue\";\nclass App extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor(props) {\n        super(props);\n        this.updateLanguage = this.updateLanguage.bind(this);\n        this.state = {\n            language: \"C\",\n            parser: props.config[\"C\"].parser,\n            seman: props.config[\"C\"].seman,\n            filename: props.config[\"C\"].filename,\n            entry: props.config[\"C\"].entry,\n            code: \"\",\n            ast: null,\n            showDefPeg: false\n        };\n    }\n    updateLanguage(newLanguge) {\n        this.setUpLang(newLanguge);\n    }\n    setUpLang(language) {\n        this.setState({ language: language });\n        this.setState({ parser: this.props.config[language].parser });\n        this.setState({ seman: this.props.config[language].seman });\n        this.setState({ filename: this.props.config[language].filename });\n        this.setState({ entry: this.props.config[language].entry });\n        fetch(this.props.config[language].filename).then(async (res) => {\n            res.text().then(code => {\n                this.setState({ code });\n                // this.setState({ast: this.state.parser.parse(code)})\n            });\n        });\n    }\n    componentDidMount() {\n        this.setUpLang(this.state.language);\n    }\n    render() {\n        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { id: \"ide\" },\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Toolbar__WEBPACK_IMPORTED_MODULE_3__.default, { allLanguages: Object.keys(this.props.config), language: this.props.config.language, updateLanguage: this.updateLanguage }),\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { id: \"panel-wrapper\" },\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_EditorPanel__WEBPACK_IMPORTED_MODULE_2__.default, { code: this.state.code, language: this.state.language }),\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_AstPanel__WEBPACK_IMPORTED_MODULE_4__.default, { className: \"panel\", parser: this.props.config.parser, program: this.props.config.program, ast: this.state.ast }))));\n    }\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/App.tsx?");

/***/ }),

/***/ "./src/components/AstPanel.tsx":
/*!*************************************!*\
  !*** ./src/components/AstPanel.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AstPanel),\n/* harmony export */   \"TreeView\": () => (/* binding */ TreeView)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nconst unfocusedColor = \"rgba(10, 10, 10, 0.82)\";\nfunction AstPanel(props) {\n    const [tree, setTree] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        // if (showRadixes.length && !props.mask[props.currentRadix]) {\n        //     const newRadix = showRadixes[0];\n        //     const newVal = new BigNumber(props.currentValue, props.currentRadix);\n        //     props.updateValue(newVal.toString(newRadix), newRadix);\n        // }\n    });\n    function toTree(ast) {\n        if (!ast)\n            return null;\n        if (!Array.isArray(ast))\n            return { text: ast.text };\n        else\n            return ast.map((root) => ({\n                type: root.type,\n                children: this.toTree(root),\n            }));\n    }\n    return tree ? null : tree.map(t => react__WEBPACK_IMPORTED_MODULE_0__.createElement(TreeView, { tree: t, depth: 0 }));\n}\nfunction TreeView(props) {\n    const [expanded, setExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    if (!props.tree)\n        return null;\n    else\n        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"node-wrapper\", style: { transform: `translate(${props.depth + 0.5}em)` } },\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", { className: \"hoverable\", onClick: () => setExpanded(!expanded), style: {\n                    visibility: props.tree.children && props.tree.children.length >= 1 ? 'visible' : 'hidden',\n                    textAlign: 'center'\n                } }, expanded ? \"▾ \" : \"‣ \"),\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", { className: \"hoverable node\", onMouseEnter: event => { event.target.style.filter = 'invert(50%)'; }, onMouseLeave: event => { event.target.style.filter = 'none'; } }, props.tree.type),\n            props.tree.children.map(child => {\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { style: { display: expanded ? \"block\" : \"none\" } },\n                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(TreeView, { tree: child, depth: props.depth + 1 }));\n            }));\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/AstPanel.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("c8a33003e7dac7db08cb")
/******/ 	})();
/******/ 	
/******/ }
);