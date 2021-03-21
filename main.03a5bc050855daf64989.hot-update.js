/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatesindarin_compiler"]("main",{

/***/ "./src/syntax/parser.ts":
/*!******************************!*\
  !*** ./src/syntax/parser.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Parser\": () => (/* binding */ Parser),\n/* harmony export */   \"SkippingLexer\": () => (/* binding */ SkippingLexer)\n/* harmony export */ });\n/* harmony import */ var nearley__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nearley */ \"./node_modules/nearley/lib/nearley.js\");\n/* harmony import */ var nearley__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nearley__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _LineAndColumnComputer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LineAndColumnComputer */ \"./src/syntax/LineAndColumnComputer.ts\");\nvar __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {\n    if (!privateMap.has(receiver)) {\n        throw new TypeError(\"attempted to set private field on non-instance\");\n    }\n    privateMap.set(receiver, value);\n    return value;\n};\nvar __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {\n    if (!privateMap.has(receiver)) {\n        throw new TypeError(\"attempted to get private field on non-instance\");\n    }\n    return privateMap.get(receiver);\n};\nvar _LineAndColumnComputer;\n\n\nclass SkippingLexer {\n    constructor(lexer) {\n        this.lexer = lexer;\n        this.skip = new Set([\"WS\", \"COMMENT\"]);\n    }\n    next() {\n        do {\n            var token = this.lexer.next();\n            if (!(token != null && this.skip.has(token.type)))\n                return token;\n        } while (true);\n    }\n    reset(chunk, info) {\n        this.lexer.reset(chunk, info);\n    }\n    formatError(token, message) {\n        return this.lexer.formatError(token, message);\n    }\n    save() {\n        return this.lexer.save();\n    }\n    has(name) {\n        return this.lexer.has(name);\n    }\n}\nclass Parser extends (nearley__WEBPACK_IMPORTED_MODULE_0___default().Parser) {\n    constructor(grammar) {\n        super(Parser.prepare(grammar));\n        _LineAndColumnComputer.set(this, void 0);\n        this.initial = this.save();\n    }\n    static prepare(grammar) {\n        var rigid = grammar.Rigid || [];\n        for (const rule of grammar.ParserRules) {\n            rule.postprocess = rigid.includes(rule.name)\n                ? (data) => this.unfold(data, rule.name)\n                : rule.symbols.length === 1\n                    ? (data) => data[0]\n                    : (data) => Object.assign(data, { type: rule.name });\n        }\n        return grammar;\n    }\n    parse(program) {\n        __classPrivateFieldSet(this, _LineAndColumnComputer, new _LineAndColumnComputer__WEBPACK_IMPORTED_MODULE_1__.default(program));\n        this.restart();\n        this.feed(program);\n        const ast = this.results[0];\n        this.getRange(ast);\n        console.log(ast);\n        // For non-ambigious grammar, this is what we what\n        // See: https://nearley.js.org/docs/parser#a-note-on-ambiguity\n        return ast;\n    }\n    restart() {\n        this.restore(this.initial);\n    }\n    reportError(token) {\n        return this.lexer.formatError(token, \"Syntax error\");\n    }\n    getRange(ast) {\n        if (ast.text) {\n            const start = __classPrivateFieldGet(this, _LineAndColumnComputer).getNumberAndColumnFromPos(ast.offset);\n            const end = __classPrivateFieldGet(this, _LineAndColumnComputer).getNumberAndColumnFromPos(ast.offset + ast.text.length);\n            return {\n                startLineNumber: start.lineNumber,\n                startColumn: start.column,\n                endLineNumber: end.lineNumber,\n                endColumn: end.column,\n            };\n        }\n        else {\n            const firstChild = ast[0], lastChild = ast[ast.length - 1];\n            return {\n                startLineNumber: this.getRange(firstChild).startLineNumber,\n                startColumn: this.getRange(firstChild).column,\n                endLineNumber: this.getRange(lastChild).lineNumber,\n                endColumn: this.getRange(lastChild).column,\n            };\n        }\n    }\n    static unfold(data, type) {\n        function* iter() {\n            for (const d of data) {\n                if (d.type === type)\n                    yield* d;\n                else\n                    yield d;\n            }\n        }\n        return Object.assign([...iter()], { type });\n    }\n}\n_LineAndColumnComputer = new WeakMap();\n\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/syntax/parser.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("358c46535c0e9ccc1a9d")
/******/ })();
/******/ 
/******/ }
);