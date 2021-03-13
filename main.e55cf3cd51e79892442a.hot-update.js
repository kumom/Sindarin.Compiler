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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EditorPanel)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react_monaco_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-monaco-editor */ \"./node_modules/react-monaco-editor/lib/index.js\");\n/* harmony import */ var _EditorPanel_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditorPanel.scss */ \"./src/components/EditorPanel.scss\");\n\n\n\nclass EditorPanel extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor(props) {\n        super(props);\n        this.editorRef = react__WEBPACK_IMPORTED_MODULE_0__.createRef();\n        this.state = {\n            deltaDecorations: []\n        };\n    }\n    componentDidUpdate() {\n        const deltaDecorations = this.editorRef.current.deltaDecorations(this.state.deltaDecorations, [{\n                range: this.props.highlightedRange,\n                options: { className: \"editorRangeHighlight\" },\n            }]);\n        this.setState({ deltaDecorations });\n    }\n    shouldComponentUpdate(nextProps) {\n        return nextProps.code !== this.props.code ||\n            nextProps.highlightedRange !== this.props.highlightedRange ||\n            nextProps.language !== this.props.language;\n    }\n    render() {\n        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"panel\", id: \"editor-panel\" },\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_monaco_editor__WEBPACK_IMPORTED_MODULE_1__.default, { language: this.props.language.toLowerCase(), value: this.props.code, theme: \"vs\", options: {\n                    minimap: {\n                        enabled: false\n                    },\n                    automaticLayout: true,\n                    quickSuggestions: false,\n                    occurrencesHighlight: false,\n                    selectionHighlight: false,\n                    codeLens: false,\n                    suggestOnTriggerCharacters: false,\n                }, onChange: (newValue, event) => { this.props.updateCode(newValue); }, editorDidMount: (editor, monaco) => {\n                    this.editorRef.current = editor;\n                    editor.onDidChangeModelContent((event) => {\n                        editor.setPosition({ lineNumber: 1, column: 1 });\n                    });\n                } }));\n    }\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/EditorPanel.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("a39eb6eb5a6343611b3e")
/******/ 	})();
/******/ 	
/******/ }
);