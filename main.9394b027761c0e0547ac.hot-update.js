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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Parser\": () => (/* binding */ Parser),\n/* harmony export */   \"SkippingLexer\": () => (/* binding */ SkippingLexer)\n/* harmony export */ });\n/* harmony import */ var nearley__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nearley */ \"./node_modules/nearley/lib/nearley.js\");\n/* harmony import */ var nearley__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nearley__WEBPACK_IMPORTED_MODULE_0__);\n\nclass SkippingLexer {\n    constructor(lexer) {\n        this.lexer = lexer;\n        this.skip = new Set([\"WS\", \"COMMENT\"]);\n    }\n    next() {\n        do {\n            var token = this.lexer.next();\n            if (!(token != null && this.skip.has(token.type)))\n                return token;\n        } while (true);\n    }\n    reset(chunk, info) {\n        this.lexer.reset(chunk, info);\n    }\n    formatError(token, message) {\n        return this.lexer.formatError(token, message);\n    }\n    save() {\n        return this.lexer.save();\n    }\n    has(name) {\n        return this.lexer.has(name);\n    }\n}\nclass Parser extends (nearley__WEBPACK_IMPORTED_MODULE_0___default().Parser) {\n    constructor(grammar) {\n        super(Parser.prepare(grammar));\n        this.initial = this.save();\n    }\n    static prepare(grammar) {\n        var rigid = grammar.Rigid || [];\n        for (const rule of grammar.ParserRules) {\n            rule.postprocess = rigid.includes(rule.name)\n                ? (data) => this.unfold(data, rule.name)\n                : rule.symbols.length === 1\n                    ? (data) => data[0]\n                    : (data) => Object.assign(data, { type: rule.name });\n        }\n        return grammar;\n    }\n    parse(program) {\n        this.restart();\n        this.feed(program);\n        console.log(this.results[0]);\n        // For non-ambigious grammar, this is what we what\n        // See: https://nearley.js.org/docs/parser#a-note-on-ambiguity\n        return this.results[0];\n    }\n    restart() {\n        this.restore(this.initial);\n    }\n    reportError(token) {\n        return this.lexer.formatError(token, \"Syntax error\");\n    }\n    static unfold(data, type) {\n        function* iter() {\n            for (const d of data) {\n                if (d.type === type)\n                    yield* d;\n                else\n                    yield d;\n            }\n        }\n        return Object.assign([...iter()], { type });\n    }\n}\n\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/syntax/parser.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f1aed01e15bf062d0c0f")
/******/ })();
/******/ 
/******/ }
);