/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatesindarin_compiler"]("main",{

/***/ "./src/components/Toolbar.tsx":
/*!************************************!*\
  !*** ./src/components/Toolbar.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Toolbar)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _Toolbar_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Toolbar.scss */ \"./src/components/Toolbar.scss\");\n/* harmony import */ var _Toolbar_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Toolbar_scss__WEBPACK_IMPORTED_MODULE_1__);\n\n// @ts-ignore\n\nfunction Toolbar(props) {\n    const css = (_Toolbar_scss__WEBPACK_IMPORTED_MODULE_1___default());\n    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,\n        react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"style\", null, css),\n        react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { id: \"toolbar\" },\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"widget\", id: \"language-selector\" },\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"label\", null, \"Source language:\"),\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"select\", { name: \"languages\", id: \"languages\", onChange: event => { props.updateLanguage(event.target.value); } }, props.allLanguages.map((language, index) => react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"option\", { key: index, value: language }, language)))),\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", null,\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"input\", { type: \"checkbox\", name: \"peg-type\", value: \"def-peg\", onChange: event => { } }),\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"label\", null, \"Definition PEG\"))));\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/Toolbar.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("6637ac38526e80144a76")
/******/ 	})();
/******/ 	
/******/ }
);