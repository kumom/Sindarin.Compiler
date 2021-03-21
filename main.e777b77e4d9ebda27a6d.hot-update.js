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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EditorPanel)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react_monaco_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-monaco-editor */ \"./node_modules/react-monaco-editor/lib/index.js\");\n/* harmony import */ var _EditorPanel_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditorPanel.scss */ \"./src/components/EditorPanel.scss\");\n/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-spinners */ \"./node_modules/react-spinners/index.js\");\n/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction EditorPanel(props) {\n    let editor = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    const [deltaDecorations, setDeltaDecorations] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n    const unhighlightedRange = {\n        startLineNumber: 0,\n        startColumn: 0,\n        endLineNumber: 0,\n        endColumn: 0,\n    };\n    const [highlightedRange, setHighlightedRange] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(unhighlightedRange);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        if (!editor.current)\n            return;\n        if (props.highlighted && props.highlighted.range)\n            setHighlightedRange(props.highlighted.range);\n        else\n            setHighlightedRange(unhighlightedRange);\n    }, [props.code, props.highlighted]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        setDeltaDecorations(editor.current.deltaDecorations(deltaDecorations, [\n            {\n                range: highlightedRange,\n                options: { className: \"editorRangeHighlight\" },\n            },\n        ]));\n    }, [highlightedRange]);\n    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"panel\" },\n        react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_3__.FadeLoader, { loading: loading }),\n        react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { id: \"editor-panel\", style: { display: loading ? \"none\" : \"block\" } },\n            react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_monaco_editor__WEBPACK_IMPORTED_MODULE_1__.default, { language: props.language.toLowerCase(), value: props.code, theme: \"vs\", options: {\n                    minimap: {\n                        enabled: false,\n                    },\n                    automaticLayout: true,\n                    quickSuggestions: false,\n                    occurrencesHighlight: false,\n                    selectionHighlight: false,\n                    codeLens: false,\n                    suggestOnTriggerCharacters: false,\n                    scrollBeyondLastLine: false,\n                    hideCursorInOverviewRuler: true,\n                    renderLineHighlightOnlyWhenFocus: true,\n                    overviewRulerBorder: false,\n                }, onChange: (newValue) => {\n                    props.setCode(newValue);\n                }, editorDidMount: (monacoEditor) => {\n                    editor.current = monacoEditor;\n                    monacoEditor.onDidChangeModelContent(() => {\n                        setLoading(false);\n                        monacoEditor.setPosition({ lineNumber: 1, column: 1 });\n                    });\n                    monacoEditor.onDidChangeModelLanguage(() => {\n                        setLoading(true);\n                    });\n                } }))));\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/EditorPanel.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4e91d45029805af99015")
/******/ })();
/******/ 
/******/ }
);