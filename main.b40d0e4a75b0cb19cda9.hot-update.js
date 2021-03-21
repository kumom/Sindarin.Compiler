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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _App_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.scss */ \"./src/components/App.scss\");\n/* harmony import */ var _Resizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Resizer */ \"./src/components/Resizer.tsx\");\n/* harmony import */ var _EditorPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditorPanel */ \"./src/components/EditorPanel.tsx\");\n/* harmony import */ var _Toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Toolbar */ \"./src/components/Toolbar.tsx\");\n/* harmony import */ var _AstPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AstPanel */ \"./src/components/AstPanel.tsx\");\n/* harmony import */ var _PegPanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PegPanel */ \"./src/components/PegPanel.tsx\");\n\n\n\n\n\n\n\nclass App extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor(props) {\n        super(props);\n        this.updateLanguage = this.updateLanguage.bind(this);\n        this.updatePegsVisibility = this.updatePegsVisibility.bind(this);\n        this.updateCode = this.updateCode.bind(this);\n        this.updateHighlightedRange = this.updateHighlightedRange.bind(this);\n        this.state = {\n            language: \"\",\n            parser: null,\n            seman: null,\n            filename: \"\",\n            entry: \"\",\n            code: \"\",\n            ast: null,\n            parseErrorMsg: \"\",\n            highlightedRange: {\n                startLineNumber: 0,\n                startColumn: 0,\n                endLineNumber: 0,\n                endColumn: 0,\n            },\n            showDefPeg: false,\n        };\n    }\n    updatePegsVisibility(showDefPeg) {\n        this.setState({ showDefPeg });\n    }\n    updateCode(code) {\n        this.setState({ code });\n        try {\n            const ast = this.state.parser.parse(code);\n            this.setState({ ast, parseErrorMsg: \"\" });\n        }\n        catch (e) {\n            this.setState({ ast: null, parseErrorMsg: e.toString() });\n        }\n        this.updateHighlightedRange();\n    }\n    updateHighlightedRange(highlightedRange) {\n        if (highlightedRange != null) {\n            this.setState({ highlightedRange });\n        }\n        else {\n            this.setState({\n                highlightedRange: {\n                    startLineNumber: 0,\n                    startColumn: 0,\n                    endLineNumber: 0,\n                    endColumn: 0,\n                },\n            });\n        }\n    }\n    updateLanguage(language) {\n        this.setState({ language: language });\n        this.setState({ parser: this.props.config[language].parser });\n        this.setState({ seman: this.props.config[language].seman });\n        this.setState({ filename: this.props.config[language].filename });\n        this.setState({ entry: this.props.config[language].entry });\n        fetch(this.props.config[language].filename).then(async (res) => {\n            res.text().then(this.updateCode);\n        });\n    }\n    componentDidMount() {\n        this.updateLanguage(\"C\");\n    }\n    render() {\n        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { id: \"ide\" },\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Toolbar__WEBPACK_IMPORTED_MODULE_4__.default, { allLanguages: Object.keys(this.props.config), language: this.state.language, updateLanguage: this.updateLanguage, updatePegsVisibility: this.updatePegsVisibility }),\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { id: \"panel-wrapper\" },\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_EditorPanel__WEBPACK_IMPORTED_MODULE_3__.default, { code: this.state.code, language: this.state.language, highlightedRange: this.state.highlightedRange, updateCode: this.updateCode }),\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Resizer__WEBPACK_IMPORTED_MODULE_2__.default, null),\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_AstPanel__WEBPACK_IMPORTED_MODULE_5__.default, { parseErrorMsg: this.state.parseErrorMsg, ast: this.state.ast, highlightedRange: this.state.highlightedRange, updateHighlightedRange: this.updateHighlightedRange }),\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Resizer__WEBPACK_IMPORTED_MODULE_2__.default, null),\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PegPanel__WEBPACK_IMPORTED_MODULE_6__.default, { language: this.state.language, ast: this.state.ast, seman: this.state.seman, showDefPeg: this.state.showDefPeg }))));\n    }\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/App.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("231c4b9d02eb73f2f72a")
/******/ })();
/******/ 
/******/ }
);