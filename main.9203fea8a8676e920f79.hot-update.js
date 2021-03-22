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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Resizer)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _Resizer_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Resizer.scss */ \"./src/components/Resizer.scss\");\n\n\nfunction Resizer() {\n    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    const leftRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    const rightRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    const [active, setActive] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const [leftWidth, setLeftWidth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(-1);\n    const [rightWidth, setRightWidth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(-1);\n    function onMouseMove(event) {\n        if (!active)\n            return;\n        event.preventDefault();\n        event.stopPropagation();\n        if (leftRef.current) {\n            setLeftWidth(leftWidth + event.movementX);\n        }\n        else {\n            if (ref.current) {\n                const el = ref.current.previousElementSibling;\n                if (el.classList.contains(\"panel\")) {\n                    leftRef.current = el;\n                    setLeftWidth(Number(window\n                        .getComputedStyle(leftRef.current)\n                        .getPropertyValue(\"width\")\n                        .replace(/[^0-9.]/g, \"\")));\n                }\n            }\n        }\n        if (rightRef.current) {\n            setRightWidth(rightWidth - event.movementX);\n        }\n        else {\n            if (ref.current) {\n                const el = ref.current.nextElementSibling;\n                if (el.classList.contains(\"panel\")) {\n                    rightRef.current = el;\n                    setRightWidth(Number(window\n                        .getComputedStyle(rightRef.current)\n                        .getPropertyValue(\"width\")\n                        .replace(/[^0-9.]/g, \"\")));\n                }\n            }\n        }\n    }\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        document.addEventListener(\"mouseup\", () => {\n            setActive(false);\n        });\n        document.addEventListener(\"mouseleave\", () => {\n            ref.current.style.cursor = \"default\";\n        });\n        document.addEventListener(\"mousemove\", onMouseMove);\n        return () => {\n            document.removeEventListener(\"mouseup\", () => { setActive(false); });\n            document.removeEventListener(\"mouseleave\", () => {\n                ref.current.style.cursor = \"default\";\n            });\n            document.removeEventListener(\"mousemove\", onMouseMove);\n        };\n    }, [active]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        console.log(\"leftWidth: \", leftWidth);\n        console.log(\"righWidth: \", rightWidth);\n        if (leftRef.current && leftWidth > 0)\n            leftRef.current.style.width = leftWidth + \"px\";\n        if (rightRef.current && rightWidth > 0)\n            rightRef.current.style.width = rightWidth + \"px\";\n    }, [leftWidth, rightWidth]);\n    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", { className: \"resizer\", ref: ref, onMouseOver: () => {\n            ref.current.style.cursor = \"col-resize\";\n        }, onMouseDown: () => {\n            setActive(true);\n            ref.current.style.cursor = \"col-resize\";\n        } }));\n}\n// export default class Resizer extends React.Component<\n//   {},\n//   { [key: string]: any }\n// > {\n//   ref: any;\n//   leftRef: any;\n//   rightRef: any;\n//   active: boolean;\n//   leftWidth: number;\n//   rightWidth: number;\n//   constructor(props: {}) {\n//     super(props);\n//     this.ref = React.createRef();\n//     this.leftRef = null;\n//     this.rightRef = null;\n//     this.active = false;\n//     this.leftWidth = 0;\n//     this.rightWidth = 0;\n//     this.onMouseMove = this.onMouseMove.bind(this);\n//   }\n//   onMouseMove(event: MouseEvent): void {\n//     if (!this.active) return;\n//     event.preventDefault();\n//     event.stopPropagation();\n//     if (!this.leftRef && this.ref.current) {\n//       this.leftRef = this.ref.current.previousElementSibling;\n//       this.leftWidth = Number(\n//         window\n//           .getComputedStyle(this.leftRef)\n//           .getPropertyValue(\"width\")\n//           .replace(/[^0-9.]/g, \"\")\n//       );\n//     }\n//     if (!this.rightRef && this.ref.current) {\n//       this.rightRef = this.ref.current.nextElementSibling;\n//       this.rightWidth = Number(\n//         window\n//           .getComputedStyle(this.rightRef)\n//           .getPropertyValue(\"width\")\n//           .replace(/[^0-9.]/g, \"\")\n//       );\n//     }\n//     if (this.leftRef && this.leftRef.classList.contains(\"panel\")) {\n//       this.leftWidth += event.movementX;\n//       this.leftRef.style.width = this.leftWidth + \"px\";\n//     }\n//     if (this.rightRef && this.rightRef.classList.contains(\"panel\")) {\n//       this.rightWidth -= event.movementX;\n//       this.rightRef.style.width = this.rightWidth + \"px\";\n//     }\n//   }\n//   shouldComponentUpdate(): boolean {\n//     return false;\n//   }\n//   componentDidMount(): void {\n//     document.addEventListener(\"mouseup\", () => {\n//       this.active = false;\n//     });\n//     document.addEventListener(\"mouseleave\", () => {\n//       this.ref.current.style.cursor = \"default\";\n//     });\n//     document.addEventListener(\"mousemove\", this.onMouseMove);\n//   }\n//   render(): JSX.Element {\n//     return (\n//       <div\n//         className=\"resizer\"\n//         ref={this.ref}\n//         onMouseOver={() => {\n//           this.ref.current.style.cursor = \"col-resize\";\n//         }}\n//         onMouseDown={() => {\n//           this.active = true;\n//           this.ref.current.style.cursor = \"col-resize\";\n//         }}\n//       />\n//     );\n//   }\n// }\n\n\n//# sourceURL=webpack://sindarin.compiler/./src/components/Resizer.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("5e456140ef1bb88fd18f")
/******/ })();
/******/ 
/******/ }
);