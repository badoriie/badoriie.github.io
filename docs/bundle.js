/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/.pnpm/p5@1.9.2/node_modules/p5/lib/p5.min.js":
/*!*******************************************************************!*\
  !*** ./node_modules/.pnpm/p5@1.9.2/node_modules/p5/lib/p5.min.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/***/ }),

/***/ "./src/components/BadorrieLogo.ts":
/*!****************************************!*\
  !*** ./src/components/BadorrieLogo.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BadorrieLogo: () => (/* binding */ BadorrieLogo)\n/* harmony export */ });\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! p5 */ \"./node_modules/.pnpm/p5@1.9.2/node_modules/p5/lib/p5.min.js\");\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_0__);\n\nvar BadorrieLogo = /** @class */ (function () {\n    function BadorrieLogo(scale, backgroundColor, node) {\n        var _this = this;\n        this.sketch = function (p) {\n            p.setup = function () {\n                p.createCanvas(p.windowWidth * _this.scale, p.windowWidth * _this.scale, p.WEBGL);\n            };\n            p.draw = function () {\n                p.background(_this.backgroundColor.r, _this.backgroundColor.g, _this.backgroundColor.b);\n                p.normalMaterial();\n                p.push();\n                p.rotateZ(p.PI / 4 + scrollY * 0.001);\n                p.rotateX(p.PI / 4 + scrollY * 0.001);\n                p.rotateY(p.PI / 4 + scrollY * 0.001);\n                p.box(p.windowWidth * _this.scale * 0.5, p.windowWidth * _this.scale * 0.5, p.windowWidth * _this.scale * 0.5);\n                p.pop();\n            };\n            p.windowResized = function () {\n                p.resizeCanvas(p.windowWidth * _this.scale, p.windowWidth * _this.scale);\n            };\n        };\n        new (p5__WEBPACK_IMPORTED_MODULE_0___default())(this.sketch, node);\n        this.backgroundColor = backgroundColor;\n        this.scale = scale;\n    }\n    return BadorrieLogo;\n}());\n\n\n\n//# sourceURL=webpack://badoriie.github.io/./src/components/BadorrieLogo.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_BadorrieLogo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/BadorrieLogo */ \"./src/components/BadorrieLogo.ts\");\n\nvar backgroundColor = { r: 26, g: 29, b: 34 };\ndocument.body.style.backgroundColor = \"rgb(\".concat(backgroundColor.r, \", \").concat(backgroundColor.g, \", \").concat(backgroundColor.b, \")\");\nvar element = document.getElementById(\"logo\");\nif (element) {\n    new _components_BadorrieLogo__WEBPACK_IMPORTED_MODULE_0__.BadorrieLogo(0.2, backgroundColor, element);\n}\nelse {\n    console.error(\"Element not found\");\n}\n\n\n//# sourceURL=webpack://badoriie.github.io/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;