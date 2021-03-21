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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TypeScriptParser\": () => (/* binding */ TypeScriptParser)\n/* harmony export */ });\n/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typescript */ \"./node_modules/typescript/lib/typescript.js\");\n/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typescript__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util_LineAndColumnComputer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/LineAndColumnComputer */ \"./src/util/LineAndColumnComputer.ts\");\nvar __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {\n    if (!privateMap.has(receiver)) {\n        throw new TypeError(\"attempted to set private field on non-instance\");\n    }\n    privateMap.set(receiver, value);\n    return value;\n};\nvar __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {\n    if (!privateMap.has(receiver)) {\n        throw new TypeError(\"attempted to get private field on non-instance\");\n    }\n    return privateMap.get(receiver);\n};\nvar _LineAndColumnComputer;\n\n\nclass TypeScriptParser {\n    constructor() {\n        _LineAndColumnComputer.set(this, void 0);\n        __classPrivateFieldSet(this, _LineAndColumnComputer, new _util_LineAndColumnComputer__WEBPACK_IMPORTED_MODULE_1__.default(\"\"));\n    }\n    parse(program) {\n        var src = (0,typescript__WEBPACK_IMPORTED_MODULE_0__.createSourceFile)(\"this-program.ts\", program, typescript__WEBPACK_IMPORTED_MODULE_0__.ScriptTarget.Latest);\n        __classPrivateFieldSet(this, _LineAndColumnComputer, new _util_LineAndColumnComputer__WEBPACK_IMPORTED_MODULE_1__.default(program));\n        // Remove EndOfFileToken\n        return this.postprocessSourceFile(src);\n    }\n    postprocessSourceFile(src) {\n        // @ts-ignore\n        return this.postprocessAst(src, src);\n    }\n    postprocessAst(u, src) {\n        var kind = typescript__WEBPACK_IMPORTED_MODULE_0__.SyntaxKind[u.kind];\n        if ((0,typescript__WEBPACK_IMPORTED_MODULE_0__.isToken)(u)) {\n            return {\n                type: kind,\n                text: u.getText(src),\n                range: this.getRange(u),\n                _ts: u,\n                children: null\n            };\n        }\n        else {\n            var children = u\n                .getChildren(src)\n                .map((s) => this.postprocessAst(s, src));\n            return {\n                type: kind,\n                _ts: u,\n                range: this.getRange(u),\n                children\n            };\n        }\n    }\n    getRange(u) {\n        const start = __classPrivateFieldGet(this, _LineAndColumnComputer).getNumberAndColumnFromPos(u.pos);\n        const end = __classPrivateFieldGet(this, _LineAndColumnComputer).getNumberAndColumnFromPos(u.end);\n        return {\n            startLineNumber: start.lineNumber,\n            startColumn: start.column,\n            endLineNumber: end.lineNumber,\n            endColumn: end.column,\n        };\n    }\n}\n_LineAndColumnComputer = new WeakMap();\n\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/syntax/typescript-ast.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("56b70321af296ad106aa")
/******/ })();
/******/ 
/******/ }
);