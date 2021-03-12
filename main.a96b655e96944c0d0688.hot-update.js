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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Resizer)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _Resizer_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Resizer.scss */ \"./src/components/Resizer.scss\");\n/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash.debounce */ \"./node_modules/lodash.debounce/index.js\");\n/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nfunction Resizer() {\n    let active = false;\n    let leftRef = null, rightRef = null;\n    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    function _resize(diff) {\n        if (!leftRef && ref.current)\n            leftRef = ref.current.previousElementSibling;\n        if (!rightRef && ref.current)\n            rightRef = ref.current.nextElementSibling;\n        if (leftRef && leftRef.classList.contains('panel')) {\n            const leftWidth = Number(window.getComputedStyle(leftRef).getPropertyValue('width').replace(/[^0-9.]/g, ''));\n            leftRef.style.width = (leftWidth + diff) + 'px';\n        }\n        if (rightRef && rightRef.classList.contains('panel')) {\n            const rightWidth = Number(window.getComputedStyle(rightRef).getPropertyValue('width').replace(/[^0-9.]/g, ''));\n            rightRef.style.width = (rightWidth + diff) + 'px';\n        }\n    }\n    function resize(diff) {\n        const debounced_resize = lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default()(() => _resize(diff), 50);\n        debounced_resize();\n    }\n    function onMouseMove(event) {\n        if (!active)\n            return;\n        event.preventDefault();\n        event.stopPropagation();\n        const diff = event.movementX;\n        resize(diff);\n    }\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        document.addEventListener('mouseup', () => { active = false; });\n        document.addEventListener('mousemove', onMouseMove);\n    }, []);\n    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"resizer\", ref: ref, onMouseDown: () => {\n            active = true;\n        } });\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/Resizer.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("d173d62b2e1ca6297c06")
/******/ 	})();
/******/ 	
/******/ }
);