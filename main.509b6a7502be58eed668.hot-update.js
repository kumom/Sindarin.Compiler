/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatesindarin_compiler"]("main",{

/***/ "./src/syntax/LineAndColumnComputer.ts":
/*!*********************************************!*\
  !*** ./src/syntax/LineAndColumnComputer.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ LineAndColumnComputer)\n/* harmony export */ });\n// Code below is copied from https://github.com/dsherret/ts-ast-viewer/blob/master/src/utils/LineAndColumnComputer.ts\nclass ArrayUtils {\n    static from(iterator) {\n        const array = [];\n        while (true) {\n            const next = iterator.next();\n            if (next.done) {\n                return array;\n            }\n            array.push(next.value);\n        }\n    }\n    static binarySearch(items, compareTo) {\n        let top = items.length - 1;\n        let bottom = 0;\n        while (bottom <= top) {\n            const mid = Math.floor((top + bottom) / 2);\n            const comparisonResult = compareTo(items[mid]);\n            if (comparisonResult === 0) {\n                return mid;\n            }\n            else if (comparisonResult < 0) {\n                top = mid - 1;\n            }\n            else {\n                bottom = mid + 1;\n            }\n        }\n        return -1;\n    }\n    constructor() { }\n}\nfunction createLineNumberAndColumns(text) {\n    const lineInfos = [];\n    let lastPos = 0;\n    for (let i = 0; i < text.length; i++) {\n        if (text[i] === \"\\n\") {\n            pushLineInfo(i);\n        }\n    }\n    pushLineInfo(text.length);\n    return lineInfos;\n    function pushLineInfo(pos) {\n        lineInfos.push({\n            pos: lastPos,\n            length: pos - lastPos,\n            number: lineInfos.length + 1,\n        });\n        lastPos = pos + 1;\n    }\n}\n/** An efficient way to compute the line and column of a position in a string. */\nclass LineAndColumnComputer {\n    constructor(text) {\n        this.text = text;\n        this.lineInfos = createLineNumberAndColumns(text);\n    }\n    getNumberAndColumnFromPos(pos) {\n        if (pos < 0) {\n            return { lineNumber: 1, column: 1 };\n        }\n        const index = ArrayUtils.binarySearch(this.lineInfos, (info) => {\n            if (pos < info.pos) {\n                return -1;\n            }\n            if (pos >= info.pos && pos < info.pos + info.length + 1) {\n                // `+ 1` is for newline char\n                return 0;\n            }\n            return 1;\n        });\n        const lineInfo = index >= 0\n            ? this.lineInfos[index]\n            : this.lineInfos[this.lineInfos.length - 1];\n        if (lineInfo == null) {\n            return { lineNumber: 1, column: 1 };\n        }\n        return {\n            lineNumber: lineInfo.number,\n            column: Math.min(pos - lineInfo.pos + 1, lineInfo.length + 1),\n        };\n    }\n    getPosFromLineAndColumn(line, column) {\n        if (this.lineInfos.length === 0 || line < 1) {\n            return 0;\n        }\n        const lineInfo = this.lineInfos[line - 1];\n        if (lineInfo == null) {\n            const lastLineInfo = this.lineInfos[this.lineInfos.length - 1];\n            return lastLineInfo.pos + lastLineInfo.length;\n        }\n        return lineInfo.pos + Math.min(lineInfo.length, column - 1);\n    }\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/syntax/LineAndColumnComputer.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b75b06c3ec66f556c58e")
/******/ })();
/******/ 
/******/ }
);