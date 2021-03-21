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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _App_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.scss */ \"./src/components/App.scss\");\n/* harmony import */ var _Resizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Resizer */ \"./src/components/Resizer.tsx\");\n/* harmony import */ var _EditorPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditorPanel */ \"./src/components/EditorPanel.tsx\");\n/* harmony import */ var _Toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Toolbar */ \"./src/components/Toolbar.tsx\");\n/* harmony import */ var _AstPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AstPanel */ \"./src/components/AstPanel.tsx\");\n/* harmony import */ var _PegPanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PegPanel */ \"./src/components/PegPanel.tsx\");\n\n\n\n\n\n\n\nfunction App({ config }) {\n    const [ast, setAst] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [code, setCode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\");\n    const [entry, setEntry] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\");\n    const [filename, setFilename] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\");\n    const [highlighted, setHighlighted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [language, setLanguage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"TypeScript\");\n    const [parseErrorMsg, setParseErrorMsg] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\");\n    const [parser, setParser] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [seman, setSeman] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [showDefPeg, setShowDefPeg] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        if (!code)\n            return;\n        try {\n            setAst(parser.parse(code));\n            setParseErrorMsg(\"\");\n        }\n        catch (e) {\n            setAst(null);\n            setParseErrorMsg(e.toString());\n        }\n        setHighlighted(null);\n    }, [code]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        setParser(config[language].parser);\n        setSeman(() => config[language].seman);\n        setFilename(config[language].filename);\n        setEntry(config[language].entry);\n        fetch(config[language].filename).then(async (res) => {\n            res.text().then(setCode);\n        });\n    }, [language]);\n    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { id: \"ide\" },\n        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Toolbar__WEBPACK_IMPORTED_MODULE_4__.default, { allLanguages: Object.keys(config), language: language, setLanguage: setLanguage, setShowDefPeg: setShowDefPeg }),\n        react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { id: \"panel-wrapper\" },\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_EditorPanel__WEBPACK_IMPORTED_MODULE_3__.default, { code: code, highlighted: highlighted, language: language, setCode: setCode }),\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Resizer__WEBPACK_IMPORTED_MODULE_2__.default, null),\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_AstPanel__WEBPACK_IMPORTED_MODULE_5__.default, { ast: ast, highlighted: highlighted, parseErrorMsg: parseErrorMsg, setHighlighted: setHighlighted }),\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Resizer__WEBPACK_IMPORTED_MODULE_2__.default, null),\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PegPanel__WEBPACK_IMPORTED_MODULE_6__.default, { ast: ast, language: language, highlighted: highlighted, seman: seman, showDefPeg: showDefPeg }))));\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/App.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("3fd8ddf0eb53b16eb05d")
/******/ })();
/******/ 
/******/ }
);