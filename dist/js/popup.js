/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"popup": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/popup.ts","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/controllers/popupcontroller.ts":
/*!********************************************!*\
  !*** ./src/controllers/popupcontroller.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __webpack_require__(/*! ./store */ "./src/controllers/store.ts");
const bookmark_1 = __webpack_require__(/*! ../model/bookmark */ "./src/model/bookmark.ts");
const parameter_1 = __webpack_require__(/*! ../model/parameter */ "./src/model/parameter.ts");
const htmlutils_1 = __webpack_require__(/*! ../utils/htmlutils */ "./src/utils/htmlutils.ts");
const parameterutils_1 = __webpack_require__(/*! ../utils/parameterutils */ "./src/utils/parameterutils.ts");
const util_1 = __webpack_require__(/*! ../utils/util */ "./src/utils/util.ts");
const $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
class PopupController {
    constructor() {
        this.bookmarkEditId = null;
        this.parameterEditId = null;
    }
    render() {
        console.log("rendering!");
        let p = this.renderBookmarks();
        this.renderBookmarkAddControls();
        this.renderParameters();
        this.renderParameterAddControls();
        this.renderImportControls();
        return p.then(() => {
            console.log("rendering complete!");
        });
    }
    getCurrentActiveTab() {
        let queryReq = { active: true, currentWindow: true };
        let p = new Promise((resolve, reject) => {
            chrome.tabs.query(queryReq, (tabs) => {
                let currentTab = tabs[0];
                resolve(currentTab);
            });
        });
        return p;
    }
    renderBookmarks() {
        let bmPromise = store_1.Store.instance.getBookmarks();
        let ctPromise = this.getCurrentActiveTab();
        let parametersPromise = store_1.Store.instance.getParameters();
        return Promise.all([bmPromise, parametersPromise, ctPromise]).then((result) => {
            let bookmarks = result[0];
            let parameters = result[1];
            let currentTab = result[2];
            this.renderExportLink(bookmarks, parameters);
            let bookmarkListContainer = document.getElementById("bookmarkList");
            if (bookmarkListContainer) {
                let bmList = document.createElement("ul");
                bmList.className = "bmUList";
                return parameterutils_1.ParameterUtil.getAllParameterValues(parameters, currentTab).then((parameterValues) => {
                    bookmarks.items.forEach(bookmark => {
                        let url = bookmark.url;
                        let resolvedUrl = parameterutils_1.ParameterUtil.getResolvedUrl(url, parameters, parameterValues);
                        let bmUi = htmlutils_1.HtmlUtil.getBookmarkDisplay(bookmark, resolvedUrl, this.deleteBookmark.bind(this), this.editBookmark.bind(this));
                        bmList.appendChild(bmUi);
                    });
                    bookmarkListContainer.innerHTML = '';
                    bookmarkListContainer.appendChild(bmList);
                });
            }
        });
    }
    renderBookmarkAddControls() {
        $("#bmName").val('');
        $("#bmUrl").val('');
        this.bookmarkEditId = null;
        $('#bmAdd').off('click').on('click', () => {
            let bmName = $("#bmName").val();
            let bmUrl = $("#bmUrl").val();
            this.addBookmarkItem(this.bookmarkEditId, bmName, bmUrl).then(() => {
                this.render();
            });
        });
        $('#bmClear').off('click').on('click', () => {
            $("#bmName").val('');
            $("#bmUrl").val('');
            this.bookmarkEditId = null;
        });
    }
    addBookmarkItem(id, name, url) {
        if (name && url) {
            if (id == null || id == '') {
                id = util_1.Util.getUniqueId(bookmark_1.BOOKMARK_ID_PREFIX);
            }
            let newBookmark = { id: id, name: name, url: url };
            return store_1.Store.instance.addBookmark(newBookmark);
        }
        return;
    }
    deleteBookmark(bookmarkId) {
        store_1.Store.instance.deleteBookmark(bookmarkId).then(() => {
            this.render();
        });
    }
    editBookmark(bookmarkId) {
        store_1.Store.instance.getBookmark(bookmarkId).then((bookmark) => {
            if (bookmark) {
                this.bookmarkEditId = bookmarkId;
                $("#bmName").val(bookmark.name);
                $("#bmUrl").val(bookmark.url);
                $("#upsertBookmark").removeClass("collapsible");
                $("#upsertBookmark").addClass("collapsible active");
                $("#upsertBookmark").click();
            }
        });
    }
    renderParameters() {
        let promiseParameters = store_1.Store.instance.getParameters();
        let globalParameterListContainer = document.getElementById("globalParameterList");
        if (globalParameterListContainer) {
            promiseParameters.then((parametersObject) => {
                document.createElement("table");
                let items = [];
                let ids = [];
                parametersObject.items.forEach(p => {
                    if (p) {
                        let closeButton = htmlutils_1.HtmlUtil.getCloseButton(p.id, this.deleteParameter.bind(this));
                        let paramItem = [p.key, p.value, closeButton];
                        ids.push(p.id);
                        items.push(paramItem);
                    }
                });
                let hearders = [];
                hearders.push("Key");
                hearders.push("Value");
                hearders.push("x");
                let table = htmlutils_1.HtmlUtil.createTable(items, hearders, ids, this.editParameter.bind(this));
                globalParameterListContainer.innerHTML = '';
                globalParameterListContainer.appendChild(table);
            });
        }
    }
    renderParameterAddControls() {
        $("#pmKey").val("");
        $("#pmValue").val("");
        this.parameterEditId = null;
        $('#pmAdd').off('click').on('click', () => {
            let pmKey = $("#pmKey").val();
            let pmValue = $("#pmValue").val();
            this.addParameter(this.parameterEditId, pmKey, pmValue).then(() => {
                this.render();
            });
        });
        $('#pmClear').off('click').on('click', () => {
            $("#pmKey").val("");
            $("#pmValue").val("");
            this.parameterEditId = null;
        });
    }
    addParameter(id, key, value) {
        if (key && value) {
            if (id == null || id == '') {
                id = util_1.Util.getUniqueId(parameter_1.PARAMETER_ID_PREFIX);
            }
            let newParameter = { id: id, key: key, value: value };
            return store_1.Store.instance.addParameter(newParameter);
        }
        return;
    }
    deleteParameter(parameterId) {
        store_1.Store.instance.deleteParameter(parameterId).then(() => {
            this.render();
        });
    }
    editParameter(parameterId) {
        store_1.Store.instance.getParameter(parameterId).then((parameter) => {
            if (parameter) {
                this.parameterEditId = parameter.id;
                $("#pmKey").val(parameter.key);
                $("#pmValue").val(parameter.value);
            }
        });
    }
    renderExportLink(bookmarks, parameters) {
        let link = document.getElementById("downloadlink");
        if (link) {
            let datamodel = { version: store_1.Store.instance.DataModelVersion, bookmarks: [], parameters: [] };
            bookmarks.items.forEach(b => {
                datamodel.bookmarks.push(b);
            });
            parameters.items.forEach(p => {
                datamodel.parameters.push(p);
            });
            let dataToExport = JSON.stringify(datamodel);
            let encodedExportData = "text/json;charset=utf-8," + encodeURIComponent(dataToExport);
            link.setAttribute("href", "data:" + encodedExportData);
            link.setAttribute("download", "SmartBookmarks.json");
        }
    }
    renderImportControls() {
        let importControl = document.getElementById('importFile').onchange = this.onImport.bind(this);
    }
    onImport(event) {
        try {
            let files = event.target.files;
            if (!files.length) {
                alert('No file selected!');
                return;
            }
            let file = files[0];
            let reader = new FileReader();
            const self = this;
            reader.onload = (event) => {
                console.log('FILE CONTENT', event.target.result);
                let content = event.target.result;
                let dataModel = JSON.parse(content);
                this.importData(dataModel);
            };
            reader.readAsText(file);
        }
        catch (err) {
            console.error(err);
        }
    }
    importData(dataModel) {
        if (dataModel) {
            let promises = [];
            if (dataModel.bookmarks) {
                promises.push(store_1.Store.instance.addBookmarks(dataModel.bookmarks));
            }
            if (dataModel.parameters) {
                promises.push(store_1.Store.instance.addParameters(dataModel.parameters));
            }
            Promise.all(promises).then(() => {
                this.render();
            });
        }
    }
}
exports.PopupController = PopupController;
PopupController.instance = new PopupController();


/***/ }),

/***/ "./src/model/bookmark.ts":
/*!*******************************!*\
  !*** ./src/model/bookmark.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BOOKMARK_ID_PREFIX = "BM";
exports.BOOKMARK_ID_PREFIX = BOOKMARK_ID_PREFIX;


/***/ }),

/***/ "./src/model/parameter.ts":
/*!********************************!*\
  !*** ./src/model/parameter.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PARAMETER_ID_PREFIX = "PM";
exports.PARAMETER_ID_PREFIX = PARAMETER_ID_PREFIX;


/***/ }),

/***/ "./src/popup.ts":
/*!**********************!*\
  !*** ./src/popup.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
const popupcontroller_1 = __webpack_require__(/*! ./controllers/popupcontroller */ "./src/controllers/popupcontroller.ts");
let count = 0;
$(function () {
    $(document).ready(() => {
        popupcontroller_1.PopupController.instance.render();
    });
    var coll = document.getElementsByClassName("collapsible");
    var i;
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            }
            else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
    // const queryInfo = {
    //   active: true,
    //   currentWindow: true
    // };
    // chrome.tabs.query(queryInfo, function(tabs) {
    //   $('#url').text(tabs[0].url);
    //   $('#time').text(moment().format('YYYY-MM-DD HH:mm:ss'));
    // });
    // chrome.browserAction.setBadgeText({text: count.toString()});
    // $('#countUp').click(()=>{
    //   chrome.browserAction.setBadgeText({text: (++count).toString()});
    // });
    // $('#changeBackground').click(()=>{
    //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, {
    //       color: '#555555'
    //     },
    //     function(msg) {
    //       console.log("result message:", msg);
    //     });
    //   });
    // });
});


/***/ }),

/***/ "./src/utils/htmlutils.ts":
/*!********************************!*\
  !*** ./src/utils/htmlutils.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(/*! ./util */ "./src/utils/util.ts");
class HtmlUtil {
    static createTable(tableData, headers, ids, editHandler) {
        let table = document.createElement('table');
        if (headers) {
            let tableHead = document.createElement('thead');
            let headerRow = document.createElement('tr');
            headers.forEach(function (headerData) {
                let cell = document.createElement('th');
                cell.appendChild(document.createTextNode(headerData));
                headerRow.appendChild(cell);
            });
            tableHead.appendChild(headerRow);
            table.appendChild(tableHead);
        }
        let tableBody = document.createElement('tbody');
        let rowcount = 0;
        tableData.forEach(function (rowData) {
            let row = document.createElement('tr');
            let itemId = ids[rowcount++];
            rowData.forEach(function (cellData) {
                let cell = document.createElement('td');
                let element = cellData;
                if (util_1.Util.isString(cellData)) {
                    cell.appendChild(document.createTextNode(cellData));
                }
                else
                    cell.appendChild(element);
                row.appendChild(cell);
            });
            row.ondblclick = () => {
                editHandler(itemId);
            };
            tableBody.appendChild(row);
        });
        table.appendChild(tableBody);
        return table;
    }
    static getListItemWithClose(childElemet, itemId, deleteHandler, editHandler) {
        let newLi = document.createElement("li");
        newLi.className = "bmUListItem";
        newLi.appendChild(childElemet);
        let closeButton = HtmlUtil.getCloseButton(itemId, deleteHandler);
        newLi.appendChild(closeButton);
        newLi.ondblclick = () => {
            editHandler(itemId);
        };
        return newLi;
    }
    static getCloseButton(itemId, deleteHandler) {
        let closeButton = document.createElement("span");
        if (itemId.startsWith("BM")) {
            closeButton.className = "closeBookmark";
        }
        else {
            closeButton.className = "closeParam";
        }
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener("click", () => {
            deleteHandler(itemId);
        });
        return closeButton;
    }
    static getBookmarkDisplay(bm, resolvedUrl, deleteHandler, editHandler) {
        let anchorElement = HtmlUtil.getAnchorElement(bm.name, resolvedUrl);
        return HtmlUtil.getListItemWithClose(anchorElement, bm.id, deleteHandler, editHandler);
    }
    static getAnchorElement(name, resolvedUrl) {
        let x = document.createElement("A");
        let t = document.createTextNode(name);
        x.setAttribute("target", "_base");
        x.setAttribute("href", resolvedUrl);
        x.appendChild(t);
        return x;
    }
}
exports.HtmlUtil = HtmlUtil;


/***/ }),

/***/ "./src/utils/util.ts":
/*!***************************!*\
  !*** ./src/utils/util.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    static getUniqueId(prefix) {
        return prefix + "_" + Math.floor(Math.random() * Date.now()).toString();
    }
    static isString(value) {
        return typeof value === 'string' || value instanceof String;
    }
}
exports.Util = Util;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXJzL3BvcHVwY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvYm9va21hcmsudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL3BhcmFtZXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wdXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2h0bWx1dGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlFYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJwb3B1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJwb3B1cFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vc3JjL3BvcHVwLnRzXCIsXCJ2ZW5kb3JcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHN0b3JlXzEgPSByZXF1aXJlKFwiLi9zdG9yZVwiKTtcbmNvbnN0IGJvb2ttYXJrXzEgPSByZXF1aXJlKFwiLi4vbW9kZWwvYm9va21hcmtcIik7XG5jb25zdCBwYXJhbWV0ZXJfMSA9IHJlcXVpcmUoXCIuLi9tb2RlbC9wYXJhbWV0ZXJcIik7XG5jb25zdCBodG1sdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9odG1sdXRpbHNcIik7XG5jb25zdCBwYXJhbWV0ZXJ1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL3BhcmFtZXRlcnV0aWxzXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3V0aWxcIik7XG5jb25zdCAkID0gcmVxdWlyZShcImpxdWVyeVwiKTtcbmNsYXNzIFBvcHVwQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9va21hcmtFZGl0SWQgPSBudWxsO1xuICAgICAgICB0aGlzLnBhcmFtZXRlckVkaXRJZCA9IG51bGw7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJyZW5kZXJpbmchXCIpO1xuICAgICAgICBsZXQgcCA9IHRoaXMucmVuZGVyQm9va21hcmtzKCk7XG4gICAgICAgIHRoaXMucmVuZGVyQm9va21hcmtBZGRDb250cm9scygpO1xuICAgICAgICB0aGlzLnJlbmRlclBhcmFtZXRlcnMoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJQYXJhbWV0ZXJBZGRDb250cm9scygpO1xuICAgICAgICB0aGlzLnJlbmRlckltcG9ydENvbnRyb2xzKCk7XG4gICAgICAgIHJldHVybiBwLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZW5kZXJpbmcgY29tcGxldGUhXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0Q3VycmVudEFjdGl2ZVRhYigpIHtcbiAgICAgICAgbGV0IHF1ZXJ5UmVxID0geyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfTtcbiAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjaHJvbWUudGFicy5xdWVyeShxdWVyeVJlcSwgKHRhYnMpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFRhYiA9IHRhYnNbMF07XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjdXJyZW50VGFiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHJlbmRlckJvb2ttYXJrcygpIHtcbiAgICAgICAgbGV0IGJtUHJvbWlzZSA9IHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuZ2V0Qm9va21hcmtzKCk7XG4gICAgICAgIGxldCBjdFByb21pc2UgPSB0aGlzLmdldEN1cnJlbnRBY3RpdmVUYWIoKTtcbiAgICAgICAgbGV0IHBhcmFtZXRlcnNQcm9taXNlID0gc3RvcmVfMS5TdG9yZS5pbnN0YW5jZS5nZXRQYXJhbWV0ZXJzKCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbYm1Qcm9taXNlLCBwYXJhbWV0ZXJzUHJvbWlzZSwgY3RQcm9taXNlXSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBsZXQgYm9va21hcmtzID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgbGV0IHBhcmFtZXRlcnMgPSByZXN1bHRbMV07XG4gICAgICAgICAgICBsZXQgY3VycmVudFRhYiA9IHJlc3VsdFsyXTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyRXhwb3J0TGluayhib29rbWFya3MsIHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgbGV0IGJvb2ttYXJrTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9va21hcmtMaXN0XCIpO1xuICAgICAgICAgICAgaWYgKGJvb2ttYXJrTGlzdENvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGxldCBibUxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgICAgICAgICAgICAgYm1MaXN0LmNsYXNzTmFtZSA9IFwiYm1VTGlzdFwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbWV0ZXJ1dGlsc18xLlBhcmFtZXRlclV0aWwuZ2V0QWxsUGFyYW1ldGVyVmFsdWVzKHBhcmFtZXRlcnMsIGN1cnJlbnRUYWIpLnRoZW4oKHBhcmFtZXRlclZhbHVlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBib29rbWFya3MuaXRlbXMuZm9yRWFjaChib29rbWFyayA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gYm9va21hcmsudXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc29sdmVkVXJsID0gcGFyYW1ldGVydXRpbHNfMS5QYXJhbWV0ZXJVdGlsLmdldFJlc29sdmVkVXJsKHVybCwgcGFyYW1ldGVycywgcGFyYW1ldGVyVmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBibVVpID0gaHRtbHV0aWxzXzEuSHRtbFV0aWwuZ2V0Qm9va21hcmtEaXNwbGF5KGJvb2ttYXJrLCByZXNvbHZlZFVybCwgdGhpcy5kZWxldGVCb29rbWFyay5iaW5kKHRoaXMpLCB0aGlzLmVkaXRCb29rbWFyay5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJtTGlzdC5hcHBlbmRDaGlsZChibVVpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJvb2ttYXJrTGlzdENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgYm9va21hcmtMaXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGJtTGlzdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXJCb29rbWFya0FkZENvbnRyb2xzKCkge1xuICAgICAgICAkKFwiI2JtTmFtZVwiKS52YWwoJycpO1xuICAgICAgICAkKFwiI2JtVXJsXCIpLnZhbCgnJyk7XG4gICAgICAgIHRoaXMuYm9va21hcmtFZGl0SWQgPSBudWxsO1xuICAgICAgICAkKCcjYm1BZGQnKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJtTmFtZSA9ICQoXCIjYm1OYW1lXCIpLnZhbCgpO1xuICAgICAgICAgICAgbGV0IGJtVXJsID0gJChcIiNibVVybFwiKS52YWwoKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQm9va21hcmtJdGVtKHRoaXMuYm9va21hcmtFZGl0SWQsIGJtTmFtZSwgYm1VcmwpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgICQoJyNibUNsZWFyJykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICQoXCIjYm1OYW1lXCIpLnZhbCgnJyk7XG4gICAgICAgICAgICAkKFwiI2JtVXJsXCIpLnZhbCgnJyk7XG4gICAgICAgICAgICB0aGlzLmJvb2ttYXJrRWRpdElkID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFkZEJvb2ttYXJrSXRlbShpZCwgbmFtZSwgdXJsKSB7XG4gICAgICAgIGlmIChuYW1lICYmIHVybCkge1xuICAgICAgICAgICAgaWYgKGlkID09IG51bGwgfHwgaWQgPT0gJycpIHtcbiAgICAgICAgICAgICAgICBpZCA9IHV0aWxfMS5VdGlsLmdldFVuaXF1ZUlkKGJvb2ttYXJrXzEuQk9PS01BUktfSURfUFJFRklYKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuZXdCb29rbWFyayA9IHsgaWQ6IGlkLCBuYW1lOiBuYW1lLCB1cmw6IHVybCB9O1xuICAgICAgICAgICAgcmV0dXJuIHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuYWRkQm9va21hcmsobmV3Qm9va21hcmspO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGVsZXRlQm9va21hcmsoYm9va21hcmtJZCkge1xuICAgICAgICBzdG9yZV8xLlN0b3JlLmluc3RhbmNlLmRlbGV0ZUJvb2ttYXJrKGJvb2ttYXJrSWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVkaXRCb29rbWFyayhib29rbWFya0lkKSB7XG4gICAgICAgIHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuZ2V0Qm9va21hcmsoYm9va21hcmtJZCkudGhlbigoYm9va21hcmspID0+IHtcbiAgICAgICAgICAgIGlmIChib29rbWFyaykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9va21hcmtFZGl0SWQgPSBib29rbWFya0lkO1xuICAgICAgICAgICAgICAgICQoXCIjYm1OYW1lXCIpLnZhbChib29rbWFyay5uYW1lKTtcbiAgICAgICAgICAgICAgICAkKFwiI2JtVXJsXCIpLnZhbChib29rbWFyay51cmwpO1xuICAgICAgICAgICAgICAgICQoXCIjdXBzZXJ0Qm9va21hcmtcIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzaWJsZVwiKTtcbiAgICAgICAgICAgICAgICAkKFwiI3Vwc2VydEJvb2ttYXJrXCIpLmFkZENsYXNzKFwiY29sbGFwc2libGUgYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICQoXCIjdXBzZXJ0Qm9va21hcmtcIikuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlclBhcmFtZXRlcnMoKSB7XG4gICAgICAgIGxldCBwcm9taXNlUGFyYW1ldGVycyA9IHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuZ2V0UGFyYW1ldGVycygpO1xuICAgICAgICBsZXQgZ2xvYmFsUGFyYW1ldGVyTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsUGFyYW1ldGVyTGlzdFwiKTtcbiAgICAgICAgaWYgKGdsb2JhbFBhcmFtZXRlckxpc3RDb250YWluZXIpIHtcbiAgICAgICAgICAgIHByb21pc2VQYXJhbWV0ZXJzLnRoZW4oKHBhcmFtZXRlcnNPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgbGV0IGlkcyA9IFtdO1xuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNPYmplY3QuaXRlbXMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZUJ1dHRvbiA9IGh0bWx1dGlsc18xLkh0bWxVdGlsLmdldENsb3NlQnV0dG9uKHAuaWQsIHRoaXMuZGVsZXRlUGFyYW1ldGVyLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmFtSXRlbSA9IFtwLmtleSwgcC52YWx1ZSwgY2xvc2VCdXR0b25dO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRzLnB1c2gocC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHBhcmFtSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsZXQgaGVhcmRlcnMgPSBbXTtcbiAgICAgICAgICAgICAgICBoZWFyZGVycy5wdXNoKFwiS2V5XCIpO1xuICAgICAgICAgICAgICAgIGhlYXJkZXJzLnB1c2goXCJWYWx1ZVwiKTtcbiAgICAgICAgICAgICAgICBoZWFyZGVycy5wdXNoKFwieFwiKTtcbiAgICAgICAgICAgICAgICBsZXQgdGFibGUgPSBodG1sdXRpbHNfMS5IdG1sVXRpbC5jcmVhdGVUYWJsZShpdGVtcywgaGVhcmRlcnMsIGlkcywgdGhpcy5lZGl0UGFyYW1ldGVyLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgIGdsb2JhbFBhcmFtZXRlckxpc3RDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgZ2xvYmFsUGFyYW1ldGVyTGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJQYXJhbWV0ZXJBZGRDb250cm9scygpIHtcbiAgICAgICAgJChcIiNwbUtleVwiKS52YWwoXCJcIik7XG4gICAgICAgICQoXCIjcG1WYWx1ZVwiKS52YWwoXCJcIik7XG4gICAgICAgIHRoaXMucGFyYW1ldGVyRWRpdElkID0gbnVsbDtcbiAgICAgICAgJCgnI3BtQWRkJykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwbUtleSA9ICQoXCIjcG1LZXlcIikudmFsKCk7XG4gICAgICAgICAgICBsZXQgcG1WYWx1ZSA9ICQoXCIjcG1WYWx1ZVwiKS52YWwoKTtcbiAgICAgICAgICAgIHRoaXMuYWRkUGFyYW1ldGVyKHRoaXMucGFyYW1ldGVyRWRpdElkLCBwbUtleSwgcG1WYWx1ZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgJCgnI3BtQ2xlYXInKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgJChcIiNwbUtleVwiKS52YWwoXCJcIik7XG4gICAgICAgICAgICAkKFwiI3BtVmFsdWVcIikudmFsKFwiXCIpO1xuICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJFZGl0SWQgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkUGFyYW1ldGVyKGlkLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmIChrZXkgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChpZCA9PSBudWxsIHx8IGlkID09ICcnKSB7XG4gICAgICAgICAgICAgICAgaWQgPSB1dGlsXzEuVXRpbC5nZXRVbmlxdWVJZChwYXJhbWV0ZXJfMS5QQVJBTUVURVJfSURfUFJFRklYKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuZXdQYXJhbWV0ZXIgPSB7IGlkOiBpZCwga2V5OiBrZXksIHZhbHVlOiB2YWx1ZSB9O1xuICAgICAgICAgICAgcmV0dXJuIHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuYWRkUGFyYW1ldGVyKG5ld1BhcmFtZXRlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkZWxldGVQYXJhbWV0ZXIocGFyYW1ldGVySWQpIHtcbiAgICAgICAgc3RvcmVfMS5TdG9yZS5pbnN0YW5jZS5kZWxldGVQYXJhbWV0ZXIocGFyYW1ldGVySWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVkaXRQYXJhbWV0ZXIocGFyYW1ldGVySWQpIHtcbiAgICAgICAgc3RvcmVfMS5TdG9yZS5pbnN0YW5jZS5nZXRQYXJhbWV0ZXIocGFyYW1ldGVySWQpLnRoZW4oKHBhcmFtZXRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVyRWRpdElkID0gcGFyYW1ldGVyLmlkO1xuICAgICAgICAgICAgICAgICQoXCIjcG1LZXlcIikudmFsKHBhcmFtZXRlci5rZXkpO1xuICAgICAgICAgICAgICAgICQoXCIjcG1WYWx1ZVwiKS52YWwocGFyYW1ldGVyLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlckV4cG9ydExpbmsoYm9va21hcmtzLCBwYXJhbWV0ZXJzKSB7XG4gICAgICAgIGxldCBsaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb3dubG9hZGxpbmtcIik7XG4gICAgICAgIGlmIChsaW5rKSB7XG4gICAgICAgICAgICBsZXQgZGF0YW1vZGVsID0geyB2ZXJzaW9uOiBzdG9yZV8xLlN0b3JlLmluc3RhbmNlLkRhdGFNb2RlbFZlcnNpb24sIGJvb2ttYXJrczogW10sIHBhcmFtZXRlcnM6IFtdIH07XG4gICAgICAgICAgICBib29rbWFya3MuaXRlbXMuZm9yRWFjaChiID0+IHtcbiAgICAgICAgICAgICAgICBkYXRhbW9kZWwuYm9va21hcmtzLnB1c2goYik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBhcmFtZXRlcnMuaXRlbXMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICBkYXRhbW9kZWwucGFyYW1ldGVycy5wdXNoKHApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgZGF0YVRvRXhwb3J0ID0gSlNPTi5zdHJpbmdpZnkoZGF0YW1vZGVsKTtcbiAgICAgICAgICAgIGxldCBlbmNvZGVkRXhwb3J0RGF0YSA9IFwidGV4dC9qc29uO2NoYXJzZXQ9dXRmLTgsXCIgKyBlbmNvZGVVUklDb21wb25lbnQoZGF0YVRvRXhwb3J0KTtcbiAgICAgICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBcImRhdGE6XCIgKyBlbmNvZGVkRXhwb3J0RGF0YSk7XG4gICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZShcImRvd25sb2FkXCIsIFwiU21hcnRCb29rbWFya3MuanNvblwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJJbXBvcnRDb250cm9scygpIHtcbiAgICAgICAgbGV0IGltcG9ydENvbnRyb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1wb3J0RmlsZScpLm9uY2hhbmdlID0gdGhpcy5vbkltcG9ydC5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICBvbkltcG9ydChldmVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGZpbGVzID0gZXZlbnQudGFyZ2V0LmZpbGVzO1xuICAgICAgICAgICAgaWYgKCFmaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnTm8gZmlsZSBzZWxlY3RlZCEnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZmlsZSA9IGZpbGVzWzBdO1xuICAgICAgICAgICAgbGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRklMRSBDT05URU5UJywgZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgICAgIGxldCBkYXRhTW9kZWwgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW1wb3J0RGF0YShkYXRhTW9kZWwpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbXBvcnREYXRhKGRhdGFNb2RlbCkge1xuICAgICAgICBpZiAoZGF0YU1vZGVsKSB7XG4gICAgICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgICAgIGlmIChkYXRhTW9kZWwuYm9va21hcmtzKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzdG9yZV8xLlN0b3JlLmluc3RhbmNlLmFkZEJvb2ttYXJrcyhkYXRhTW9kZWwuYm9va21hcmtzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YU1vZGVsLnBhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHN0b3JlXzEuU3RvcmUuaW5zdGFuY2UuYWRkUGFyYW1ldGVycyhkYXRhTW9kZWwucGFyYW1ldGVycykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuUG9wdXBDb250cm9sbGVyID0gUG9wdXBDb250cm9sbGVyO1xuUG9wdXBDb250cm9sbGVyLmluc3RhbmNlID0gbmV3IFBvcHVwQ29udHJvbGxlcigpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBCT09LTUFSS19JRF9QUkVGSVggPSBcIkJNXCI7XG5leHBvcnRzLkJPT0tNQVJLX0lEX1BSRUZJWCA9IEJPT0tNQVJLX0lEX1BSRUZJWDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUEFSQU1FVEVSX0lEX1BSRUZJWCA9IFwiUE1cIjtcbmV4cG9ydHMuUEFSQU1FVEVSX0lEX1BSRUZJWCA9IFBBUkFNRVRFUl9JRF9QUkVGSVg7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0ICQgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xuY29uc3QgcG9wdXBjb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9wb3B1cGNvbnRyb2xsZXJcIik7XG5sZXQgY291bnQgPSAwO1xuJChmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuICAgICAgICBwb3B1cGNvbnRyb2xsZXJfMS5Qb3B1cENvbnRyb2xsZXIuaW5zdGFuY2UucmVuZGVyKCk7XG4gICAgfSk7XG4gICAgdmFyIGNvbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29sbGFwc2libGVcIik7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IGNvbGwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29sbFtpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGlmIChjb250ZW50LnN0eWxlLm1heEhlaWdodCkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gY29udGVudC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBjb25zdCBxdWVyeUluZm8gPSB7XG4gICAgLy8gICBhY3RpdmU6IHRydWUsXG4gICAgLy8gICBjdXJyZW50V2luZG93OiB0cnVlXG4gICAgLy8gfTtcbiAgICAvLyBjaHJvbWUudGFicy5xdWVyeShxdWVyeUluZm8sIGZ1bmN0aW9uKHRhYnMpIHtcbiAgICAvLyAgICQoJyN1cmwnKS50ZXh0KHRhYnNbMF0udXJsKTtcbiAgICAvLyAgICQoJyN0aW1lJykudGV4dChtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSk7XG4gICAgLy8gfSk7XG4gICAgLy8gY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHt0ZXh0OiBjb3VudC50b1N0cmluZygpfSk7XG4gICAgLy8gJCgnI2NvdW50VXAnKS5jbGljaygoKT0+e1xuICAgIC8vICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHt0ZXh0OiAoKytjb3VudCkudG9TdHJpbmcoKX0pO1xuICAgIC8vIH0pO1xuICAgIC8vICQoJyNjaGFuZ2VCYWNrZ3JvdW5kJykuY2xpY2soKCk9PntcbiAgICAvLyAgIGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWV9LCBmdW5jdGlvbih0YWJzKSB7XG4gICAgLy8gICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHtcbiAgICAvLyAgICAgICBjb2xvcjogJyM1NTU1NTUnXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIGZ1bmN0aW9uKG1zZykge1xuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0IG1lc3NhZ2U6XCIsIG1zZyk7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgfSk7XG4gICAgLy8gfSk7XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNsYXNzIEh0bWxVdGlsIHtcbiAgICBzdGF0aWMgY3JlYXRlVGFibGUodGFibGVEYXRhLCBoZWFkZXJzLCBpZHMsIGVkaXRIYW5kbGVyKSB7XG4gICAgICAgIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XG4gICAgICAgIGlmIChoZWFkZXJzKSB7XG4gICAgICAgICAgICBsZXQgdGFibGVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKTtcbiAgICAgICAgICAgIGxldCBoZWFkZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChoZWFkZXJEYXRhKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpO1xuICAgICAgICAgICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaGVhZGVyRGF0YSkpO1xuICAgICAgICAgICAgICAgIGhlYWRlclJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGFibGVIZWFkLmFwcGVuZENoaWxkKGhlYWRlclJvdyk7XG4gICAgICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUhlYWQpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0YWJsZUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xuICAgICAgICBsZXQgcm93Y291bnQgPSAwO1xuICAgICAgICB0YWJsZURhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93RGF0YSkge1xuICAgICAgICAgICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgICAgICBsZXQgaXRlbUlkID0gaWRzW3Jvd2NvdW50KytdO1xuICAgICAgICAgICAgcm93RGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChjZWxsRGF0YSkge1xuICAgICAgICAgICAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNlbGxEYXRhO1xuICAgICAgICAgICAgICAgIGlmICh1dGlsXzEuVXRpbC5pc1N0cmluZyhjZWxsRGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjZWxsRGF0YSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByb3cub25kYmxjbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBlZGl0SGFuZGxlcihpdGVtSWQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRhYmxlQm9keS5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGFibGVCb2R5KTtcbiAgICAgICAgcmV0dXJuIHRhYmxlO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0TGlzdEl0ZW1XaXRoQ2xvc2UoY2hpbGRFbGVtZXQsIGl0ZW1JZCwgZGVsZXRlSGFuZGxlciwgZWRpdEhhbmRsZXIpIHtcbiAgICAgICAgbGV0IG5ld0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICBuZXdMaS5jbGFzc05hbWUgPSBcImJtVUxpc3RJdGVtXCI7XG4gICAgICAgIG5ld0xpLmFwcGVuZENoaWxkKGNoaWxkRWxlbWV0KTtcbiAgICAgICAgbGV0IGNsb3NlQnV0dG9uID0gSHRtbFV0aWwuZ2V0Q2xvc2VCdXR0b24oaXRlbUlkLCBkZWxldGVIYW5kbGVyKTtcbiAgICAgICAgbmV3TGkuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuICAgICAgICBuZXdMaS5vbmRibGNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgZWRpdEhhbmRsZXIoaXRlbUlkKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ld0xpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0Q2xvc2VCdXR0b24oaXRlbUlkLCBkZWxldGVIYW5kbGVyKSB7XG4gICAgICAgIGxldCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBpZiAoaXRlbUlkLnN0YXJ0c1dpdGgoXCJCTVwiKSkge1xuICAgICAgICAgICAgY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gXCJjbG9zZUJvb2ttYXJrXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjbG9zZUJ1dHRvbi5jbGFzc05hbWUgPSBcImNsb3NlUGFyYW1cIjtcbiAgICAgICAgfVxuICAgICAgICBjbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSAnJnRpbWVzOyc7XG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBkZWxldGVIYW5kbGVyKGl0ZW1JZCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2xvc2VCdXR0b247XG4gICAgfVxuICAgIHN0YXRpYyBnZXRCb29rbWFya0Rpc3BsYXkoYm0sIHJlc29sdmVkVXJsLCBkZWxldGVIYW5kbGVyLCBlZGl0SGFuZGxlcikge1xuICAgICAgICBsZXQgYW5jaG9yRWxlbWVudCA9IEh0bWxVdGlsLmdldEFuY2hvckVsZW1lbnQoYm0ubmFtZSwgcmVzb2x2ZWRVcmwpO1xuICAgICAgICByZXR1cm4gSHRtbFV0aWwuZ2V0TGlzdEl0ZW1XaXRoQ2xvc2UoYW5jaG9yRWxlbWVudCwgYm0uaWQsIGRlbGV0ZUhhbmRsZXIsIGVkaXRIYW5kbGVyKTtcbiAgICB9XG4gICAgc3RhdGljIGdldEFuY2hvckVsZW1lbnQobmFtZSwgcmVzb2x2ZWRVcmwpIHtcbiAgICAgICAgbGV0IHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiQVwiKTtcbiAgICAgICAgbGV0IHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShuYW1lKTtcbiAgICAgICAgeC5zZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIiwgXCJfYmFzZVwiKTtcbiAgICAgICAgeC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHJlc29sdmVkVXJsKTtcbiAgICAgICAgeC5hcHBlbmRDaGlsZCh0KTtcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxufVxuZXhwb3J0cy5IdG1sVXRpbCA9IEh0bWxVdGlsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBVdGlsIHtcbiAgICBzdGF0aWMgZ2V0VW5pcXVlSWQocHJlZml4KSB7XG4gICAgICAgIHJldHVybiBwcmVmaXggKyBcIl9cIiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIERhdGUubm93KCkpLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHN0YXRpYyBpc1N0cmluZyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZztcbiAgICB9XG59XG5leHBvcnRzLlV0aWwgPSBVdGlsO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==