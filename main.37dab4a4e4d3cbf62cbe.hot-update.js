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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Resizer)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _Resizer_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Resizer.scss */ \"./src/components/Resizer.scss\");\n\n\nfunction Resizer(props) {\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => {\n        window.addEventListener('mouseup', () => { setActive(false); });\n    });\n    const [active, setActive] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"resizer\", onMouseDown: event => {\n            setActive(true);\n        }, onMouseMove: event => {\n            if (active) {\n                const diff = event.movementX;\n                const left = (event.target.previousElementSibling);\n                const right = (event.target.nextElementSibling);\n                if (left) {\n                    const leftWidth = Number(window.getComputedStyle(left).getPropertyValue('width').replace(/[^0-9.]/g, ''));\n                    left.style.width = (leftWidth + diff) + 'px';\n                }\n                if (right) {\n                    const rightWidth = Number(window.getComputedStyle(right).getPropertyValue('width').replace(/[^0-9.]/g, ''));\n                    right.style.width = (rightWidth - diff) + 'px';\n                }\n            }\n            // setOldX(event.clientX);\n        }, \n        // onDrag={event => {\n        //     const diff = event.clientX - oldX;\n        //     const left = ((event.target as HTMLDivElement).previousElementSibling) as HTMLDivElement;\n        //     const right = ((event.target as HTMLDivElement).nextElementSibling) as HTMLDivElement;\n        //     if (left) {\n        //         left.style.width = \n        //     }\n        //     if (right) {\n        //     }\n        //     setOldX(event.clientX);\n        // }}\n        // onMouseLeave={event => {\n        //     setActive(false);\n        // }}\n        onMouseUp: event => {\n            setActive(false);\n        } });\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/Resizer.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("e2f13fc2e0b6c39ee1d0")
/******/ 	})();
/******/ 	
/******/ }
);