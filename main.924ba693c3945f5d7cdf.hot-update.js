/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatesindarin_compiler"]("main",{

/***/ "./src/util/astToTree.ts":
/*!*******************************!*\
  !*** ./src/util/astToTree.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"astToTree\": () => (/* binding */ astToTree)\n/* harmony export */ });\n// export type Tree = InnerNode | Leaf;\n// export interface InnerNode {\n//     type: string;\n//     children: Tree[];\n//     range?: CodeRange;\n// }\n// interface Leaf {\n//     type: string;\n//     text: string;\n//     range?: CodeRange;\n// }\nfunction astToTree(ast) {\n    if (!Array.isArray(ast)) {\n        return { type: ast.type, text: ast.text, range: ast.range };\n    }\n    else {\n        return {\n            type: ast.type,\n            children: ast.map((t) => astToTree(t)),\n            range: ast.range,\n        };\n    }\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/util/astToTree.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2cf11f523130699a005a")
/******/ })();
/******/ 
/******/ }
);