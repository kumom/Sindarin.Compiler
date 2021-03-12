/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatesindarin_compiler"]("main",{

/***/ "./src/components/Resizer.tsx":
/*!************************************!*\
  !*** ./src/components/Resizer.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Resizer)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _Resizer_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Resizer.scss */ \"./src/components/Resizer.scss\");\n/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash.debounce */ \"./node_modules/lodash.debounce/index.js\");\n/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nclass Resizer extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor(props) {\n        super(props);\n        this.ref = react__WEBPACK_IMPORTED_MODULE_0__.createRef();\n        this.leftRef = null;\n        this.rightRef = null;\n        this.onMouseMove = this.onMouseMove.bind(this);\n        this.active = false;\n    }\n    onMouseMove(event) {\n        event.preventDefault();\n        event.stopPropagation();\n        if (!this.active)\n            return;\n        const diff = event.movementX;\n        this.resize(diff);\n    }\n    resize(diff) {\n        const debounced_resize = lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default()(() => this._resize(diff), 50);\n        debounced_resize();\n    }\n    _resize(diff) {\n        if (!this.leftRef && this.ref.current)\n            this.leftRef = this.ref.current.previousElementSibling;\n        if (!this.rightRef && this.ref.current)\n            this.rightRef = this.ref.current.nextElementSibling;\n        if (this.leftRef && this.leftRef.classList.contains('panel')) {\n            const leftWidth = Number(window.getComputedStyle(this.leftRef).getPropertyPriority('width').replace(/[^0-9.]/g, ''));\n            // const leftWidth = this.leftRef.getBoundingClientRect().width;\n            this.leftRef.style.width = (leftWidth + diff) + 'px';\n        }\n        if (this.rightRef && this.rightRef.classList.contains('panel')) {\n            // const rightWidth = this.rightRef.getBoundingClientRect().width;\n            this.rightRef.style.width = (rightWidth - diff) + 'px';\n        }\n    }\n    shouldComponentUpdate() {\n        return false;\n    }\n    componentDidMount() {\n        document.addEventListener('mouseup', () => { this.active = false; });\n        document.addEventListener('mousemove', this.onMouseMove);\n    }\n    render() {\n        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"resizer\", ref: this.ref, onMouseDown: () => {\n                this.active = true;\n            } });\n    }\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/Resizer.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("b2f05c5798594278a5e9")
/******/ 	})();
/******/ 	
/******/ }
);