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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Resizer)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _Resizer_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Resizer.scss */ \"./src/components/Resizer.scss\");\n\n\nclass Resizer extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor(props) {\n        super(props);\n        this.ref = react__WEBPACK_IMPORTED_MODULE_0__.createRef();\n        this.onMouseMove = this.onMouseMove.bind(this);\n        this.state = {\n            active: false,\n            oldX: 0\n        };\n    }\n    onMouseMove(event) {\n        event.preventDefault();\n        event.stopPropagation();\n        console.log(this.state.active);\n        if (!this.state.active)\n            return;\n        // console.log(event)\n        const diff = event.movementX;\n        const left = (event.target.previousElementSibling);\n        const right = (event.target.nextElementSibling);\n        if (left && left.classList.contains('panel')) {\n            console.log();\n            const leftWidth = left.getBoundingClientRect().width;\n            left.style.width = (leftWidth + diff) + 'px';\n        }\n        if (right && right.classList.contains('panel')) {\n            const rightWidth = right.getBoundingClientRect().width;\n            right.style.width = (rightWidth - diff) + 'px';\n        }\n        // this.setState({leftWidth: this.state.leftWidth + diff, rightWidth: this.state.rightWidth + diff})\n    }\n    shouldComponentUpdate() {\n        return false;\n    }\n    componentDidMount() {\n        document.addEventListener('mouseup', event => { console.log(\"mouseup\"); this.setState({ active: false }); });\n        document.addEventListener('mousemove', this.onMouseMove);\n    }\n    render() {\n        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"resizer\", ref: this.ref, onMouseDown: event => {\n                this.setState({ active: true, oldX: event.clientX });\n            } });\n    }\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/Resizer.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("145e4ebe982a12961411")
/******/ 	})();
/******/ 	
/******/ }
);