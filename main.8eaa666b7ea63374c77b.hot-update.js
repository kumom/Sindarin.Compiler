/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatesindarin_compiler"]("main",{

/***/ "./src/components/EditorPanel.tsx":
/*!****************************************!*\
  !*** ./src/components/EditorPanel.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EditorPanel)\n/* harmony export */ });\n/* harmony import */ var react_monaco_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-monaco-editor */ \"./node_modules/react-monaco-editor/lib/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\n\nfunction EditorPanel(props) {\n    return react__WEBPACK_IMPORTED_MODULE_1__.createElement(\"div\", { className: \"panel\", id: \"editor-panel\" },\n        react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_monaco_editor__WEBPACK_IMPORTED_MODULE_0__.default, { language: props.language.toLowerCase(), value: props.code, theme: \"vs\", options: {\n                minimap: {\n                    enabled: false\n                },\n                automaticLayout: true,\n                copyWithSyntaxHighlighting: false\n            }, onChange: (newValue, event) => { props.updateCode(newValue); } }));\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/EditorPanel.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("4954e363590d606dc0ea")
/******/ 	})();
/******/ 	
/******/ }
);