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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Resizer)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _Resizer_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Resizer.scss */ \"./src/components/Resizer.scss\");\n\n\nfunction Resizer(props) {\n    const [oldX, setOldX] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);\n    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"resizer\", draggable: true, onDragStart: event => {\n            console.log(event);\n            setOldX(event.clientX);\n            // event.preventDefault();\n        }, \n        // onDrag={event => {\n        //     const diff = event.clientX - oldX;\n        //     const left = ((event.target as HTMLDivElement).previousElementSibling) as HTMLDivElement;\n        //     const right = ((event.target as HTMLDivElement).nextElementSibling) as HTMLDivElement;\n        //     if (left) {\n        //         left.style.width = \n        //     }\n        //     if (right) {\n        //     }\n        //     setOldX(event.clientX);\n        // }}\n        onDragLeave: event => {\n            const diff = event.clientX - oldX;\n            const left = (event.target.previousElementSibling);\n            const right = (event.target.nextElementSibling);\n            console.log(diff);\n            // if (left) {\n            //     left.style.width = \n            // }\n            // if (right) {\n            // }\n            // setOldX(event.clientX);\n            setOldX(event.clientX);\n        } });\n}\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/Resizer.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("9357aa832d97400e6757")
/******/ 	})();
/******/ 	
/******/ }
);