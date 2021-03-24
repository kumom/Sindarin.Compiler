/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatesindarin_compiler"]("main",{

/***/ "./src/syntax/typescript-ast.ts":
/*!**************************************!*\
  !*** ./src/syntax/typescript-ast.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TypeScriptParser\": () => (/* binding */ TypeScriptParser)\n/* harmony export */ });\n/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typescript */ \"./node_modules/typescript/lib/typescript.js\");\n/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typescript__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser */ \"./src/syntax/parser.ts\");\nvar __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {\n    if (!privateMap.has(receiver)) {\n        throw new TypeError(\"attempted to set private field on non-instance\");\n    }\n    privateMap.set(receiver, value);\n    return value;\n};\nvar __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {\n    if (!privateMap.has(receiver)) {\n        throw new TypeError(\"attempted to get private field on non-instance\");\n    }\n    return privateMap.get(receiver);\n};\nvar _codeRangeComputer;\n\n\nclass TypeScriptParser {\n    constructor() {\n        _codeRangeComputer.set(this, void 0);\n        __classPrivateFieldSet(this, _codeRangeComputer, new _parser__WEBPACK_IMPORTED_MODULE_1__.default(\"\"));\n    }\n    parse(program) {\n        const src = (0,typescript__WEBPACK_IMPORTED_MODULE_0__.createSourceFile)(\"this-program.ts\", program, typescript__WEBPACK_IMPORTED_MODULE_0__.ScriptTarget.Latest);\n        __classPrivateFieldSet(this, _codeRangeComputer, new _parser__WEBPACK_IMPORTED_MODULE_1__.default(program));\n        function aux(u, src) {\n            const kind = typescript__WEBPACK_IMPORTED_MODULE_0__.SyntaxKind[u.kind];\n            if ((0,typescript__WEBPACK_IMPORTED_MODULE_0__.isToken)(u)) {\n                return {\n                    type: kind,\n                    text: u.getText(src),\n                    range: this.getRange(u),\n                    _ts: u,\n                    children: null,\n                };\n            }\n            else {\n                return {\n                    type: kind,\n                    _ts: u,\n                    range: this.getRange(u),\n                    children: u\n                        .getChildren(src)\n                        .map((s) => aux(s, src))\n                };\n            }\n        }\n        aux = aux.bind(this);\n        return aux(src, src);\n    }\n    getRange(u) {\n        const start = __classPrivateFieldGet(this, _codeRangeComputer).getNumberAndColumnFromPos(u.pos);\n        const end = __classPrivateFieldGet(this, _codeRangeComputer).getNumberAndColumnFromPos(u.end);\n        return {\n            startLineNumber: start.lineNumber,\n            startColumn: start.column,\n            endLineNumber: end.lineNumber,\n            endColumn: end.column,\n        };\n    }\n}\n_codeRangeComputer = new WeakMap();\n\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/syntax/typescript-ast.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("09e98b5d9cf72e3d5ff6")
/******/ })();
/******/ 
/******/ }
);