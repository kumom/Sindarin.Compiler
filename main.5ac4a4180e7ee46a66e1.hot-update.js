/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatesindarin_compiler"]("main",{

/***/ "./src/syntax/c99.ts":
/*!***************************!*\
  !*** ./src/syntax/c99.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"C99Parser\": () => (/* binding */ C99Parser)\n/* harmony export */ });\n/* harmony import */ var moo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moo */ \"./node_modules/moo/moo.js\");\n/* harmony import */ var moo__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moo__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser */ \"./src/syntax/parser.ts\");\n\n\nconst IDENTIFIER = /[_a-zA-Z][_a-zA-Z0-9]*/;\nconst CONSTANT = /(?:0[xX][0-9a-fA-F]+|0[0-7]*|[1-9][0-9]*)(?:[uU](?:ll?|LL?)?|(?:ll?|LL?)[uU]?)?/;\nconst COMMENT = /\\/\\/.*|\\/\\*[^]*?\\*\\//;\nconst { GRAMMAR, KEYWORDS, OPERATORS } = __webpack_require__(/*! ./c99.json */ \"./src/syntax/c99.json\");\nKEYWORDS.BOOL = \"bool\";\nconst TOKEN_DEFS = {\n    WS: { match: /\\s+/, lineBreaks: true },\n    COMMENT: { match: COMMENT, lineBreaks: true },\n    IDENTIFIER: { match: IDENTIFIER, type: moo__WEBPACK_IMPORTED_MODULE_0___default().keywords(KEYWORDS) },\n    CONSTANT,\n    ...OPERATORS,\n};\nclass C99Parser extends _parser__WEBPACK_IMPORTED_MODULE_1__.Parser {\n    constructor() {\n        super({\n            ...GRAMMAR,\n            Lexer: new _parser__WEBPACK_IMPORTED_MODULE_1__.SkippingLexer(moo__WEBPACK_IMPORTED_MODULE_0___default().compile(TOKEN_DEFS)),\n            Rigid: [\n                \"translation_unit\",\n                \"parameter_list\",\n                \"parameter_declaration\",\n                \"block_item_list\",\n            ],\n        });\n    }\n}\n\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/syntax/c99.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("332a40c6daa235dbcdc0")
/******/ })();
/******/ 
/******/ }
);