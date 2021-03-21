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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EditorPanel)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react_monaco_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-monaco-editor */ \"./node_modules/react-monaco-editor/lib/index.js\");\n/* harmony import */ var _EditorPanel_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditorPanel.scss */ \"./src/components/EditorPanel.scss\");\n/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-spinners */ \"./node_modules/react-spinners/index.js\");\n/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nclass EditorPanel extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor(props) {\n        super(props);\n        this.editorRef = react__WEBPACK_IMPORTED_MODULE_0__.createRef();\n        this.deltaDecorations = [];\n        this.state = {\n            loading: true\n        };\n    }\n    componentDidUpdate(prevProps, prevState) {\n        if (this.state.loading)\n            return;\n        let highlightedRange = {\n            startLineNumber: 0,\n            startColumn: 0,\n            endLineNumber: 0,\n            endColumn: 0,\n        };\n        if (this.props.highlighted && this.props.highlighted.range)\n            highlightedRange = this.props.highlighted.range;\n        this.deltaDecorations = this.editorRef.current.deltaDecorations(this.deltaDecorations, [\n            {\n                range: highlightedRange,\n                options: { className: \"editorRangeHighlight\" },\n            },\n        ]);\n    }\n    shouldComponentUpdate(nextProps, nextState) {\n        return (nextProps.code !== this.props.code ||\n            nextProps.highlighted !== this.props.highlighted ||\n            nextProps.language !== this.props.language ||\n            nextState.loading !== this.state.loading);\n    }\n    render() {\n        if (this.state.loading)\n            return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_3__.FadeLoader, null);\n        else\n            return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"panel\", id: \"editor-panel\" },\n                react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_monaco_editor__WEBPACK_IMPORTED_MODULE_1__.default, { language: this.props.language.toLowerCase(), value: this.props.code, theme: \"vs\", options: {\n                        minimap: {\n                            enabled: false,\n                        },\n                        automaticLayout: true,\n                        quickSuggestions: false,\n                        occurrencesHighlight: false,\n                        selectionHighlight: false,\n                        codeLens: false,\n                        suggestOnTriggerCharacters: false,\n                        scrollBeyondLastLine: false,\n                        hideCursorInOverviewRuler: true,\n                        renderLineHighlightOnlyWhenFocus: true,\n                        overviewRulerBorder: false,\n                    }, onChange: (newValue, event) => {\n                        this.props.updateCode(newValue);\n                    }, editorDidMount: (editor, monaco) => {\n                        this.editorRef.current = editor;\n                        editor.onDidChangeModelContent((event) => {\n                            console.log(\"didchange\");\n                            this.setState({ loading: false });\n                            editor.setPosition({ lineNumber: 1, column: 1 });\n                        });\n                        editor.onDidChangeModelLanguage(() => {\n                            this.setState({ loading: true });\n                        });\n                    } }));\n    }\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/EditorPanel.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("051862d0cf215935d9d3")
/******/ })();
/******/ 
/******/ }
);