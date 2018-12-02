module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("next/link");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Typography");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("graphql-request");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/List");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/ListItem");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/ListItemText");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "@babel/runtime/regenerator"
var regenerator_ = __webpack_require__(2);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator_);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(10);

// EXTERNAL MODULE: external "@material-ui/core/styles"
var styles_ = __webpack_require__(4);

// EXTERNAL MODULE: external "@material-ui/core/AppBar"
var AppBar_ = __webpack_require__(12);
var AppBar_default = /*#__PURE__*/__webpack_require__.n(AppBar_);

// EXTERNAL MODULE: external "@material-ui/core/Toolbar"
var Toolbar_ = __webpack_require__(13);
var Toolbar_default = /*#__PURE__*/__webpack_require__.n(Toolbar_);

// EXTERNAL MODULE: external "@material-ui/core/Typography"
var Typography_ = __webpack_require__(5);
var Typography_default = /*#__PURE__*/__webpack_require__.n(Typography_);

// EXTERNAL MODULE: external "@material-ui/core/Button"
var Button_ = __webpack_require__(20);

// EXTERNAL MODULE: external "@material-ui/core/Drawer"
var Drawer_ = __webpack_require__(14);
var Drawer_default = /*#__PURE__*/__webpack_require__.n(Drawer_);

// EXTERNAL MODULE: external "@material-ui/core/List"
var List_ = __webpack_require__(7);
var List_default = /*#__PURE__*/__webpack_require__.n(List_);

// EXTERNAL MODULE: external "@material-ui/core/ListItem"
var ListItem_ = __webpack_require__(8);
var ListItem_default = /*#__PURE__*/__webpack_require__.n(ListItem_);

// EXTERNAL MODULE: external "@material-ui/core/ListItemText"
var ListItemText_ = __webpack_require__(9);
var ListItemText_default = /*#__PURE__*/__webpack_require__.n(ListItemText_);

// EXTERNAL MODULE: external "@material-ui/core/Divider"
var Divider_ = __webpack_require__(15);
var Divider_default = /*#__PURE__*/__webpack_require__.n(Divider_);

// EXTERNAL MODULE: external "@material-ui/core/IconButton"
var IconButton_ = __webpack_require__(16);
var IconButton_default = /*#__PURE__*/__webpack_require__.n(IconButton_);

// EXTERNAL MODULE: external "@material-ui/icons/Menu"
var Menu_ = __webpack_require__(17);
var Menu_default = /*#__PURE__*/__webpack_require__.n(Menu_);

// EXTERNAL MODULE: external "next/link"
var link_ = __webpack_require__(1);
var link_default = /*#__PURE__*/__webpack_require__.n(link_);

// CONCATENATED MODULE: ./components/tileData.js
// This file is shared across the demos.






var tileData_FerryMenu = function FerryMenu(_ref) {
  var data = _ref.data;
  return external_react_default.a.createElement(List_default.a, null, console.log(data), data.map(function (route) {
    return external_react_default.a.createElement(link_default.a, {
      prefetch: true,
      as: route.routeName.toLowerCase().replace(/[^a-zA-Z0-9 -]/g, '').replace(/ /g, '_'),
      href: {
        pathname: '/post',
        query: {
          id: route.routeName
        }
      }
    }, external_react_default.a.createElement(ListItem_default.a, {
      button: true,
      key: route.id
    }, external_react_default.a.createElement(ListItemText_default.a, {
      primary: route.routeName
    })));
  }));
};

/* harmony default export */ var tileData = (tileData_FerryMenu);
// CONCATENATED MODULE: ./components/drawer.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













var styles = {
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

var drawer_TemporaryDrawer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TemporaryDrawer, _React$Component);

  function TemporaryDrawer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TemporaryDrawer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TemporaryDrawer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      left: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggleDrawer", function (side, open) {
      return function () {
        _this.setState(_defineProperty({}, side, open));
      };
    });

    return _this;
  }

  _createClass(TemporaryDrawer, [{
    key: "render",
    value: function render() {
      //   console.log(this.props)
      var _this$props = this.props,
          classes = _this$props.classes,
          data = _this$props.data;
      var sideList = external_react_default.a.createElement("div", {
        className: classes.list
      }, external_react_default.a.createElement(List_default.a, null, "    ", external_react_default.a.createElement(link_default.a, {
        href: "/"
      }, external_react_default.a.createElement(ListItem_default.a, {
        button: true
      }, external_react_default.a.createElement(ListItemText_default.a, {
        primary: "Ferrytracker"
      })))), external_react_default.a.createElement(Divider_default.a, null), external_react_default.a.createElement(tileData, {
        data: data
      }));
      return external_react_default.a.createElement("div", null, external_react_default.a.createElement(IconButton_default.a, {
        onClick: this.toggleDrawer('left', true),
        className: classes.menuButton,
        color: "inherit",
        "aria-label": "Menu"
      }, external_react_default.a.createElement(Menu_default.a, null)), external_react_default.a.createElement(Drawer_default.a, {
        open: this.state.left,
        onClose: this.toggleDrawer('left', false)
      }, external_react_default.a.createElement("div", {
        tabIndex: 0,
        role: "button",
        onClick: this.toggleDrawer('left', false),
        onKeyDown: this.toggleDrawer('left', false)
      }, sideList)));
    }
  }]);

  return TemporaryDrawer;
}(external_react_default.a.Component);

/* harmony default export */ var drawer = (Object(styles_["withStyles"])(styles)(drawer_TemporaryDrawer));
// CONCATENATED MODULE: ./components/appBar.js








var appBar_styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

function ButtonAppBar(props) {
  // console.log(props)
  var classes = props.classes,
      allRoutes = props.allRoutes;
  return external_react_default.a.createElement("div", {
    className: classes.root
  }, external_react_default.a.createElement(AppBar_default.a, {
    position: "fixed"
  }, external_react_default.a.createElement(Toolbar_default.a, null, external_react_default.a.createElement(drawer, {
    data: allRoutes
  }), external_react_default.a.createElement(Typography_default.a, {
    variant: "h6",
    color: "inherit",
    className: classes.grow
  }, "Ferrytracker"))));
}

/* harmony default export */ var appBar = (Object(styles_["withStyles"])(appBar_styles)(ButtonAppBar));
// EXTERNAL MODULE: external "graphql-request"
var external_graphql_request_ = __webpack_require__(6);

// CONCATENATED MODULE: ./components/header.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return header_Header; });


function header_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { header_typeof = function _typeof(obj) { return typeof obj; }; } else { header_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return header_typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function header_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function header_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function header_createClass(Constructor, protoProps, staticProps) { if (protoProps) header_defineProperties(Constructor.prototype, protoProps); if (staticProps) header_defineProperties(Constructor, staticProps); return Constructor; }

function header_possibleConstructorReturn(self, call) { if (call && (header_typeof(call) === "object" || typeof call === "function")) { return call; } return header_assertThisInitialized(self); }

function header_getPrototypeOf(o) { header_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return header_getPrototypeOf(o); }

function header_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) header_setPrototypeOf(subClass, superClass); }

function header_setPrototypeOf(o, p) { header_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return header_setPrototypeOf(o, p); }

function header_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function header_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var header_Header =
/*#__PURE__*/
function (_React$Component) {
  header_inherits(Header, _React$Component);

  function Header() {
    var _getPrototypeOf2;

    var _this;

    header_classCallCheck(this, Header);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = header_possibleConstructorReturn(this, (_getPrototypeOf2 = header_getPrototypeOf(Header)).call.apply(_getPrototypeOf2, [this].concat(args)));

    header_defineProperty(header_assertThisInitialized(header_assertThisInitialized(_this)), "state", {
      data: {}
    });

    return _this;
  }

  header_createClass(Header, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee() {
        var _this2 = this;

        var query, URL;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "{\n          allRoutes {\n            id\n            routeName\n          }\n        }";
                URL = 'https://ferrytrackerserver.now.sh/graphql';
                Object(external_graphql_request_["request"])(URL, query).then(function (data) {
                  _this2.setState({
                    data: data
                  }); // console.log(this.state.data)

                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      };
    }()
  }, {
    key: "render",
    value: function render() {
      return external_react_default.a.createElement(appBar, this.state.data);
    }
  }]);

  return Header;
}(external_react_default.a.Component);



/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/AppBar");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Toolbar");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Drawer");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Divider");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/IconButton");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Menu");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./components/header.js + 3 modules
var header = __webpack_require__(11);

// EXTERNAL MODULE: external "styled-jsx/style"
var style_ = __webpack_require__(3);
var style_default = /*#__PURE__*/__webpack_require__.n(style_);

// EXTERNAL MODULE: external "next/link"
var link_ = __webpack_require__(1);
var link_default = /*#__PURE__*/__webpack_require__.n(link_);

// CONCATENATED MODULE: ./components/footer.js



/* harmony default export */ var footer = (function () {
  return external_react_default.a.createElement("footer", {
    className: "jsx-2423641347"
  }, external_react_default.a.createElement("h3", {
    className: "jsx-2423641347"
  }, external_react_default.a.createElement(link_default.a, {
    prefetch: true,
    href: "/"
  }, external_react_default.a.createElement("a", {
    className: "jsx-2423641347"
  }, "Ferrytracker"))), external_react_default.a.createElement("p", {
    className: "jsx-2423641347"
  }, "Written by Dean Sallinen"), external_react_default.a.createElement("p", {
    className: "jsx-2423641347"
  }, "Node | Graphql | React | Next"), external_react_default.a.createElement(style_default.a, {
    styleId: "2423641347",
    css: ["h1.jsx-2423641347{font-family:sans-serif;}", "a.jsx-2423641347{-webkit-text-decoration:none;text-decoration:none;color:#fefefe;}", "footer.jsx-2423641347{background-color:#222;padding:.5rem;color:#aaa;}"]
  }));
});
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(18);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);

// CONCATENATED MODULE: ./components/meta.js



/* harmony default export */ var meta = (function () {
  return external_react_default.a.createElement("div", {
    className: "jsx-276213544"
  }, external_react_default.a.createElement(head_default.a, null, external_react_default.a.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1",
    className: "jsx-276213544"
  }), external_react_default.a.createElement("meta", {
    charSet: "utf-8",
    className: "jsx-276213544"
  })), external_react_default.a.createElement(style_default.a, {
    styleId: "276213544",
    css: ["body{background:#fefefe;color:#222;margin:0;padding:0;font-family:sans-serif;}"]
  }));
});
// CONCATENATED MODULE: ./layouts/main.js




/* harmony default export */ var main = __webpack_exports__["a"] = (function (_ref) {
  var children = _ref.children;
  return external_react_default.a.createElement("div", null, external_react_default.a.createElement(meta, null), external_react_default.a.createElement(header["a" /* default */], null), children, external_react_default.a.createElement(footer, null));
});

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("date-fns");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Card");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardActionArea");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardContent");

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(41);


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardActions");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardMedia");

/***/ }),
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "@babel/runtime/regenerator"
var regenerator_ = __webpack_require__(2);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator_);

// EXTERNAL MODULE: external "next/link"
var link_ = __webpack_require__(1);

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(21);

// EXTERNAL MODULE: external "graphql-request"
var external_graphql_request_ = __webpack_require__(6);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "date-fns"
var external_date_fns_ = __webpack_require__(22);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(10);

// EXTERNAL MODULE: external "@material-ui/core/styles"
var styles_ = __webpack_require__(4);

// EXTERNAL MODULE: external "@material-ui/core/Card"
var Card_ = __webpack_require__(23);
var Card_default = /*#__PURE__*/__webpack_require__.n(Card_);

// EXTERNAL MODULE: external "@material-ui/core/CardActionArea"
var CardActionArea_ = __webpack_require__(24);
var CardActionArea_default = /*#__PURE__*/__webpack_require__.n(CardActionArea_);

// EXTERNAL MODULE: external "@material-ui/core/CardActions"
var CardActions_ = __webpack_require__(30);

// EXTERNAL MODULE: external "@material-ui/core/CardContent"
var CardContent_ = __webpack_require__(25);
var CardContent_default = /*#__PURE__*/__webpack_require__.n(CardContent_);

// EXTERNAL MODULE: external "@material-ui/core/CardMedia"
var CardMedia_ = __webpack_require__(31);

// EXTERNAL MODULE: external "@material-ui/core/Button"
var Button_ = __webpack_require__(20);

// EXTERNAL MODULE: external "@material-ui/core/Typography"
var Typography_ = __webpack_require__(5);
var Typography_default = /*#__PURE__*/__webpack_require__.n(Typography_);

// CONCATENATED MODULE: ./components/sailing.js











var styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

var sailing_formatSailingTime = function formatSailingTime(time) {
  return time ? Object(external_date_fns_["format"])(new Date(time).getTime(), 'HH:mm') : time;
};

function MediaCard(props) {
  var classes = props.classes;
  return external_react_default.a.createElement(Card_default.a, {
    className: classes.card
  }, external_react_default.a.createElement(CardActionArea_default.a, null, external_react_default.a.createElement(CardContent_default.a, null, external_react_default.a.createElement(Typography_default.a, {
    gutterBottom: true,
    variant: "h5",
    component: "h2"
  }, sailing_formatSailingTime(props.scheduledDeparture), " - ", props.sailingStatus), external_react_default.a.createElement(Typography_default.a, {
    component: "p"
  }, props.vessel), external_react_default.a.createElement(Typography_default.a, {
    component: "p"
  }, "Actual Departure: ", sailing_formatSailingTime(props.actualDeparture)), external_react_default.a.createElement(Typography_default.a, {
    component: "p"
  }, "ETA: ", sailing_formatSailingTime(props.eta)))));
}

/* harmony default export */ var components_sailing = (Object(styles_["withStyles"])(styles)(MediaCard));
// EXTERNAL MODULE: ./layouts/main.js + 2 modules
var main = __webpack_require__(19);

// CONCATENATED MODULE: ./pages/post.js


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







var URL = 'https://ferrytrackerserver.now.sh/graphql'; // const URL = 'http://localhost:4000/graphql';

var Post = Object(router_["withRouter"])(function (props) {
  return external_react_default.a.createElement(main["a" /* default */], null, external_react_default.a.createElement("h1", null, props.route.routeName), props.route.sailings.map(function (sailing) {
    return external_react_default.a.createElement(components_sailing, _extends({}, sailing, {
      key: sailing.id
    }));
  }));
});

Post.getInitialProps =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee(context) {
    var routeName, gqlq, res;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            routeName = context.query.id;
            gqlq = "{\n      route(routeName: \"".concat(routeName, "\"){\n          routeName\n          sailings {\n              id\n              vessel\n              scheduledDeparture\n              actualDeparture\n              eta\n              sailingStatus\n              lastUpdated\n          }\n      }\n  }");
            _context.next = 4;
            return Object(external_graphql_request_["request"])(URL, gqlq);

          case 4:
            res = _context.sent;
            console.log("Route info fetched. Sailings: ".concat(res.route.sailings.length));
            return _context.abrupt("return", res);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

/* harmony default export */ var post = __webpack_exports__["default"] = (Post);

/***/ })
/******/ ]);