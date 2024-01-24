/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/kks.js":
/*!*******************!*\
  !*** ./js/kks.js ***!
  \*******************/
/***/ (() => {

/* Add sticky header class
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * .is-position-sticky is disabled in mobile view
 */
var siteHeader = document.querySelector('.site-header');
siteHeader.classList.add('is-position-sticky');
var siteLogos = document.querySelectorAll('.site--logo');
siteLogos.forEach(function (siteLogo) {
  // Check if siteLogo actually has a parentNode
  if (siteLogo.parentNode) {
    // Create a new anchor element
    var anchor = document.createElement('a');
    anchor.href = '/';
    anchor.title = 'Kool Kat Science - Home';

    // Copy all classes from siteLogo to anchor
    anchor.className = siteLogo.className;

    // Create a new span element
    var span = document.createElement('span');

    // Set the class name of the span to 'hidden'
    span.className = 'visually-hidden';

    // Add text to the span
    span.textContent = 'Kool Kat Science'; // Replace with your desired text

    // Append the span to the anchor
    anchor.appendChild(span);

    // Replace siteLogo with the new anchor element
    siteLogo.parentNode.replaceChild(anchor, siteLogo);
  } else {
    console.log('Parent node not found for:', siteLogo);
  }
});

/**
 * Replace Search button with Search icon
 */

document.addEventListener('DOMContentLoaded', function () {
  // Find the search button
  var searchButton = document.querySelector('.wp-block-search__button');

  // Create a span element and assign the 'visually-hidden' class
  var searchSpan = document.createElement('span');
  searchSpan.className = 'visually-hidden';
  searchSpan.textContent = searchButton.textContent.trim();

  // Clear the existing text inside the button
  searchButton.textContent = '';

  // Append the span to the button
  searchButton.appendChild(searchSpan);

  // Create an SVG element
  var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgElement.setAttribute('width', '30');
  svgElement.setAttribute('height', '30');
  svgElement.setAttribute('aria-hidden', 'true'); // Hide from screen readers
  svgElement.innerHTML = '<path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 0 0 1.57-5.09C15.1 4.61 12.28 2 9 2S2.9 4.61 2.9 8.64s2.82 6.64 6.1 6.64c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6.5 0C7.01 14 5 11.98 5 9.5S7.01 5 9.5 5 14 7.02 14 9.5 11.99 14 9 14z"></path>';

  // Append the SVG to the button
  searchButton.appendChild(svgElement);
});

/***/ }),

/***/ "./js/motopress.js":
/*!*************************!*\
  !*** ./js/motopress.js ***!
  \*************************/
/***/ (() => {

/**
 * MotoPress Mega Menu https://github.com/motopress/getwid-megamenu
 * Fixes bug where the mega menu toggle button is not accessible
 * Since the anchor appears just before and it's text can become a label
 * Code generates a unique id for each anchor and sets the aria-labelledby
 * attribute on the button using that id
 */

// Select all instances of the div containing the anchor and button
var divs = document.querySelectorAll('.gw-mm-item__link');

// Loop through each div instance
divs.forEach(function (div) {
  // Select the anchor and button within this specific div
  var anchor = div.querySelector('a');
  var button = div.querySelector('.gw-mm-item__toggle');

  // Check if both elements exist
  if (anchor && button) {
    // Generate a unique ID for the anchor
    var uniqueId = 'label-' + Math.random().toString(36).substr(2, 9);

    // Set the ID attribute on the anchor
    anchor.id = uniqueId;

    // Set the aria-labelledby attribute on the button, referencing the anchor's ID
    button.setAttribute('aria-labelledby', uniqueId);
  }
});

/**
 * MotoPress Mega Menu https://github.com/motopress/getwid-megamenu
 * uses a down arrow icon from dashicons which is not pretty
 * Function watches for changes to the class attribute and updates it
 */

// Function to update the class if it's not as expected
function updateButtonClass(button) {
  if (!button.classList.contains('dashicons-arrow-down-alt2')) {
    button.classList.remove('dashicons-arrow-down');
    button.classList.add('dashicons-arrow-down-alt2');
  }
}

// Create a new MutationObserver instance
var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      updateButtonClass(mutation.target);
    }
  });
});

// Options for the observer (which attributes to watch)
var config = {
  attributes: true,
  attributeFilter: ['class']
};

// Select all buttons to be observed
var buttons = document.querySelectorAll('.dashicons');

// Start observing each button
buttons.forEach(function (button) {
  updateButtonClass(button); // Initial check
  observer.observe(button, config);
});

/***/ }),

/***/ "./js/scrolltop.js":
/*!*************************!*\
  !*** ./js/scrolltop.js ***!
  \*************************/
/***/ (() => {

/**
 * Scroll to top button
 * uses an SVG arrow from Font Awesome
 * includes ARIA attributes
 * and is visually hidden until the user scrolls down 50% of the screen height
 */

var scrollButton = document.createElement('button');
var arrowUp = "<?xml version=\"1.0\" ?><svg height=\"30\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1395 1184q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23z\"/></svg>";
scrollButton.setAttribute('class', 'scroll-top flex items-center justify-center visually-hidden');
scrollButton.setAttribute('aria-label', 'Scroll to top of the page');
scrollButton.innerHTML = arrowUp;

// Assign click event handler with smooth scroll
scrollButton.addEventListener('click', function () {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});

// Create a span element for the label
var scrollSpan = document.createElement('span');
// scrollSpan.textContent = "Scroll to Top";

// Append span to the button

scrollButton.appendChild(scrollSpan);

// Select the footer element
var footer = document.querySelector('footer');

// Append the button to the footer
footer.appendChild(scrollButton);

// Show the button when the user scrolls down 50% of the screen height
window.addEventListener('DOMContentLoaded', function (event) {
  var scrollTopBtn = document.getElementsByClassName('scroll-top')[0];
  var screenHeight = screenHeight = window.innerHeight || document.documentElement.clientHeight;
  var halfScreenHeight = screenHeight / 2;
  window.addEventListener('scroll', function () {
    if (window.scrollY >= halfScreenHeight) {
      scrollTopBtn.classList.remove('visually-hidden');
    } else {
      scrollTopBtn.classList.add('visually-hidden');
    }
  });
});

/***/ }),

/***/ "./scss/kks.scss":
/*!***********************!*\
  !*** ./scss/kks.scss ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./dist/kks.css":
/*!**********************!*\
  !*** ./dist/kks.css ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/dist/kks": 0,
/******/ 			"dist/kks": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkkks_ollie"] = self["webpackChunkkks_ollie"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["dist/kks"], () => (__webpack_require__("./js/kks.js")))
/******/ 	__webpack_require__.O(undefined, ["dist/kks"], () => (__webpack_require__("./js/motopress.js")))
/******/ 	__webpack_require__.O(undefined, ["dist/kks"], () => (__webpack_require__("./js/scrolltop.js")))
/******/ 	__webpack_require__.O(undefined, ["dist/kks"], () => (__webpack_require__("./scss/kks.scss")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["dist/kks"], () => (__webpack_require__("./dist/kks.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;