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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TypeScriptParser\": () => (/* binding */ TypeScriptParser)\n/* harmony export */ });\n/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typescript */ \"./node_modules/typescript/lib/typescript.js\");\n/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typescript__WEBPACK_IMPORTED_MODULE_0__);\nvar __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {\n    if (!privateMap.has(receiver)) {\n        throw new TypeError(\"attempted to set private field on non-instance\");\n    }\n    privateMap.set(receiver, value);\n    return value;\n};\nvar _LineAndColumnComputer;\n\nclass TypeScriptParser {\n    constructor() {\n        _LineAndColumnComputer.set(this, void 0);\n    }\n    parse(program) {\n        var src = typescript__WEBPACK_IMPORTED_MODULE_0___default().createSourceFile('this-program.ts', program, (typescript__WEBPACK_IMPORTED_MODULE_0___default().ScriptTarget.Latest));\n        __classPrivateFieldSet(this, _LineAndColumnComputer, new LineAndColumnComputer(program));\n        // Remove EndOfFileToken\n        return this.postprocessSourceFile(src)[0];\n    }\n    postprocessSourceFile(src) {\n        return this.postprocessAst(src, src);\n    }\n    postprocessAst(u, src) {\n        var kind = (typescript__WEBPACK_IMPORTED_MODULE_0___default().SyntaxKind)[u.kind];\n        if (typescript__WEBPACK_IMPORTED_MODULE_0___default().isToken(u)) {\n            var { line, character: col } = src.getLineAndCharacterOfPosition(u.pos + 1);\n            line++;\n            col++; // positions are a bit off???\n            return { type: kind, text: u.getText(src), line, col, _ts: u };\n        }\n        else {\n            var children = u.getChildren(src).map(s => this.postprocessAst(s, src));\n            return Object.assign(children, { type: kind, _ts: u });\n        }\n    }\n}\n_LineAndColumnComputer = new WeakMap();\n\n// Code below are copied from https://github.com/dsherret/ts-ast-viewer/blob/master/src/utils/LineAndColumnComputer.ts\nclass ArrayUtils {\n    static from(iterator) {\n        const array = [];\n        while (true) {\n            const next = iterator.next();\n            if (next.done)\n                return array;\n            array.push(next.value);\n        }\n    }\n    static binarySearch(items, compareTo) {\n        let top = items.length - 1;\n        let bottom = 0;\n        while (bottom <= top) {\n            const mid = Math.floor((top + bottom) / 2);\n            const comparisonResult = compareTo(items[mid]);\n            if (comparisonResult === 0)\n                return mid;\n            else if (comparisonResult < 0)\n                top = mid - 1;\n            else\n                bottom = mid + 1;\n        }\n        return -1;\n    }\n    constructor() {\n    }\n}\nfunction createLineNumberAndColumns(text) {\n    const lineInfos = [];\n    let lastPos = 0;\n    for (let i = 0; i < text.length; i++) {\n        if (text[i] === \"\\n\")\n            pushLineInfo(i);\n    }\n    pushLineInfo(text.length);\n    return lineInfos;\n    function pushLineInfo(pos) {\n        lineInfos.push({\n            pos: lastPos,\n            length: pos - lastPos,\n            number: lineInfos.length + 1,\n        });\n        lastPos = pos + 1;\n    }\n}\n/** An efficient way to compute the line and column of a position in a string. */\nclass LineAndColumnComputer {\n    constructor(text) {\n        this.text = text;\n        this.lineInfos = createLineNumberAndColumns(text);\n    }\n    getNumberAndColumnFromPos(pos) {\n        if (pos < 0)\n            return { lineNumber: 1, column: 1 };\n        const index = ArrayUtils.binarySearch(this.lineInfos, info => {\n            if (pos < info.pos)\n                return -1;\n            if (pos >= info.pos && pos < info.pos + info.length + 1) // `+ 1` is for newline char\n                return 0;\n            return 1;\n        });\n        const lineInfo = index >= 0 ? this.lineInfos[index] : this.lineInfos[this.lineInfos.length - 1];\n        if (lineInfo == null)\n            return { lineNumber: 1, column: 1 };\n        return { lineNumber: lineInfo.number, column: Math.min(pos - lineInfo.pos + 1, lineInfo.length + 1) };\n    }\n    getPosFromLineAndColumn(line, column) {\n        if (this.lineInfos.length === 0 || line < 1)\n            return 0;\n        const lineInfo = this.lineInfos[line - 1];\n        if (lineInfo == null) {\n            const lastLineInfo = this.lineInfos[this.lineInfos.length - 1];\n            return lastLineInfo.pos + lastLineInfo.length;\n        }\n        return lineInfo.pos + Math.min(lineInfo.length, column - 1);\n    }\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/syntax/typescript-ast.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("18c269e07b41fde7c08f")
/******/ 	})();
/******/ 	
/******/ }
);