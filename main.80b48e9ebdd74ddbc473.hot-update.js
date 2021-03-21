/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatesindarin_compiler"]("main",{

/***/ "./src/components/App.tsx":
/*!********************************!*\
  !*** ./src/components/App.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _App_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.scss */ \"./src/components/App.scss\");\n/* harmony import */ var _Resizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Resizer */ \"./src/components/Resizer.tsx\");\n/* harmony import */ var _EditorPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditorPanel */ \"./src/components/EditorPanel.tsx\");\n/* harmony import */ var _Toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Toolbar */ \"./src/components/Toolbar.tsx\");\n/* harmony import */ var _AstPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AstPanel */ \"./src/components/AstPanel.tsx\");\n/* harmony import */ var _PegPanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PegPanel */ \"./src/components/PegPanel.tsx\");\n\n\n\n\n\n\n\nclass App extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor(props) {\n        super(props);\n        this.updateLanguage = this.updateLanguage.bind(this);\n        this.updatePegsVisibility = this.updatePegsVisibility.bind(this);\n        this.updateCode = this.updateCode.bind(this);\n        this.updateHighlighted = this.updateHighlighted.bind(this);\n        this.initState = {\n            ast: null,\n            code: \"\",\n            entry: \"\",\n            filename: \"\",\n            highlighted: null,\n            language: \"\",\n            parseErrorMsg: \"\",\n            parser: null,\n            seman: null,\n            showDefPeg: false,\n        };\n        this.state = this.initState;\n    }\n    updatePegsVisibility(showDefPeg) {\n        this.setState({ showDefPeg });\n    }\n    updateCode(code) {\n        this.setState({ code });\n        try {\n            const ast = this.state.parser.parse(code);\n            this.setState({ ast, parseErrorMsg: \"\", shownAst: ast });\n        }\n        catch (e) {\n            this.setState({ ast: null, parseErrorMsg: e.toString(), shownAst: null });\n        }\n        this.updateHighlighted();\n    }\n    updateHighlighted(ast) {\n        if (ast) {\n            this.setState({ highlighted: ast });\n        }\n        else {\n            this.setState({\n                highlighted: null,\n            });\n        }\n    }\n    updateLanguage(language) {\n        this.setState(this.initState, () => {\n            this.setState({\n                language: language,\n                parser: this.props.config[language].parser,\n                seman: this.props.config[language].seman,\n                filename: this.props.config[language].filename,\n                entry: this.props.config[language].entry\n            });\n            fetch(this.props.config[language].filename).then(async (res) => {\n                res.text().then(this.updateCode);\n            });\n        });\n    }\n    componentDidMount() {\n        this.updateLanguage(\"C\");\n    }\n    render() {\n        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { id: \"ide\" },\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Toolbar__WEBPACK_IMPORTED_MODULE_4__.default, { allLanguages: Object.keys(this.props.config), language: this.state.language, updateLanguage: this.updateLanguage, updatePegsVisibility: this.updatePegsVisibility }),\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { id: \"panel-wrapper\" },\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_EditorPanel__WEBPACK_IMPORTED_MODULE_3__.default, { code: this.state.code, highlighted: this.state.highlighted, language: this.state.language, updateCode: this.updateCode }),\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Resizer__WEBPACK_IMPORTED_MODULE_2__.default, null),\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_AstPanel__WEBPACK_IMPORTED_MODULE_5__.default, { ast: this.state.ast, highlighted: this.state.highlighted, parseErrorMsg: this.state.parseErrorMsg, updateHighlighted: this.updateHighlighted }),\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Resizer__WEBPACK_IMPORTED_MODULE_2__.default, null),\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PegPanel__WEBPACK_IMPORTED_MODULE_6__.default, { ast: this.state.ast, language: this.state.language, highlighted: this.state.highlighted, seman: this.state.seman, showDefPeg: this.state.showDefPeg }))));\n    }\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/App.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9c9949b60a79087936d0")
/******/ })();
/******/ 
/******/ }
);