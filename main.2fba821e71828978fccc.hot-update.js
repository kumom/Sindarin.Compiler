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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Resizer)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _Resizer_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Resizer.scss */ \"./src/components/Resizer.scss\");\n\n\nclass Resizer extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor(props) {\n        super(props);\n        this.ref = react__WEBPACK_IMPORTED_MODULE_0__.createRef();\n        this.leftRef = null;\n        this.rightRef = null;\n        this.active = false;\n        this.leftWidth = -1;\n        this.rightWidth = -1;\n        this.onMouseMove = this.onMouseMove.bind(this);\n    }\n    onMouseMove(event) {\n        if (!this.active)\n            return;\n        event.preventDefault();\n        event.stopPropagation();\n        if (this.leftRef) {\n            this.leftWidth += event.movementX;\n        }\n        else {\n            if (this.ref.current) {\n                const el = this.ref.current.previousElementSibling;\n                if (el.classList.contains(\"panel\")) {\n                    this.leftRef = el;\n                    this.leftWidth = Number(window\n                        .getComputedStyle(el)\n                        .getPropertyValue(\"width\")\n                        .replace(/[^0-9.]/g, \"\"));\n                }\n            }\n        }\n        if (this.rightRef) {\n            this.rightWidth -= event.movementX;\n        }\n        else {\n            if (this.ref.current) {\n                const el = this.ref.current.nextElementSibling;\n                if (el.classList.contains(\"panel\")) {\n                    this.rightRef = el;\n                    this.rightWidth = Number(window\n                        .getComputedStyle(el)\n                        .getPropertyValue(\"width\")\n                        .replace(/[^0-9.]/g, \"\"));\n                }\n            }\n        }\n        if (this.leftRef && this.leftWidth > 0) {\n            this.leftRef.style.width = this.leftWidth + \"px\";\n        }\n        if (this.rightRef && this.rightWidth > 0) {\n            this.rightRef.style.width = this.rightWidth + \"px\";\n        }\n    }\n    shouldComponentUpdate() {\n        return false;\n    }\n    componentDidMount() {\n        document.addEventListener(\"mouseup\", () => {\n            this.active = false;\n        });\n        document.addEventListener(\"mouseleave\", () => {\n            this.ref.current.style.cursor = \"default\";\n        });\n        document.addEventListener(\"mousemove\", this.onMouseMove);\n    }\n    render() {\n        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"resizer\", ref: this.ref, onMouseOver: () => {\n                this.ref.current.style.cursor = \"col-resize\";\n            }, onMouseDown: () => {\n                this.active = true;\n                this.ref.current.style.cursor = \"col-resize\";\n            } }));\n    }\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/Resizer.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2f27f5555fc5338c0bba")
/******/ })();
/******/ 
/******/ }
);