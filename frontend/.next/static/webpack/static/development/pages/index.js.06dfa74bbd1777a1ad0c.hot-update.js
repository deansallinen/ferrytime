webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! isomorphic-unfetch */ "./node_modules/isomorphic-unfetch/browser.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var graphql_request__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! graphql-request */ "./node_modules/graphql-request/dist/src/index.js");
/* harmony import */ var graphql_request__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(graphql_request__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/header */ "./components/header.js");
/* harmony import */ var _layouts_main__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../layouts/main */ "./layouts/main.js");

var _jsxFileName = "/Users/dean/Documents/projects/ferry-tracker2/frontend/pages/index.js";



function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var URL = 'https://ferrytrackerserver.now.sh/graphql'; // const URL = 'http://localhost:4000/graphql';

var Index = function Index(props) {
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_layouts_main__WEBPACK_IMPORTED_MODULE_7__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", {
    className: "jsx-1704715776",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, props.allRoutes.map(function (route) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
      key: route.id,
      className: "jsx-1704715776",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
      prefetch: true,
      as: route.routeName.toLowerCase().replace(/ /g, '_'),
      href: {
        pathname: '/post',
        query: {
          id: route.routeName
        }
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
      className: "jsx-1704715776",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h2", {
      className: "jsx-1704715776",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: this
    }, route.routeName))));
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a, {
    styleId: "1704715776",
    css: "ul.jsx-1704715776{list-style:none;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kZWFuL0RvY3VtZW50cy9wcm9qZWN0cy9mZXJyeS10cmFja2VyMi9mcm9udGVuZC9wYWdlcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwQmdCLEFBR3lCLGdCQUNsQiIsImZpbGUiOiIvVXNlcnMvZGVhbi9Eb2N1bWVudHMvcHJvamVjdHMvZmVycnktdHJhY2tlcjIvZnJvbnRlbmQvcGFnZXMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmV0Y2ggZnJvbSAnaXNvbW9ycGhpYy11bmZldGNoJztcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnZ3JhcGhxbC1yZXF1ZXN0JztcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9oZWFkZXInO1xuaW1wb3J0IFBhZ2UgZnJvbSAnLi4vbGF5b3V0cy9tYWluJztcblxuY29uc3QgVVJMID0gJ2h0dHBzOi8vZmVycnl0cmFja2Vyc2VydmVyLm5vdy5zaC9ncmFwaHFsJztcbi8vIGNvbnN0IFVSTCA9ICdodHRwOi8vbG9jYWxob3N0OjQwMDAvZ3JhcGhxbCc7XG5cbmNvbnN0IEluZGV4ID0gcHJvcHMgPT4gKFxuICA8UGFnZT5cbiAgICA8dWw+XG4gICAgICB7cHJvcHMuYWxsUm91dGVzLm1hcChyb3V0ZSA9PiAoXG4gICAgICAgIDxsaSBrZXk9e3JvdXRlLmlkfT5cbiAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgcHJlZmV0Y2hcbiAgICAgICAgICAgIGFzPXtyb3V0ZS5yb3V0ZU5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csICdfJyl9XG4gICAgICAgICAgICBocmVmPXt7IHBhdGhuYW1lOiAnL3Bvc3QnLCBxdWVyeTogeyBpZDogcm91dGUucm91dGVOYW1lIH0gfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8YT5cbiAgICAgICAgICAgICAgPGgyPntyb3V0ZS5yb3V0ZU5hbWV9PC9oMj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvbGk+XG4gICAgICApKX1cbiAgICA8L3VsPlxuICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgIHVsIHtcbiAgICAgICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICAgIH1cbiAgICBgfTwvc3R5bGU+XG4gIDwvUGFnZT5cbik7XG5cbkluZGV4LmdldEluaXRpYWxQcm9wcyA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICBjb25zdCBxdWVyeSA9IGB7XG4gICAgYWxsUm91dGVzIHtcbiAgICAgIGlkXG4gICAgICByb3V0ZU5hbWVcbiAgICB9XG4gIH1gO1xuICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KFVSTCwgcXVlcnkpO1xuICBjb25zb2xlLmxvZyhgQWxsIHJvdXRlcyBmZXRjaGVkLiBDb3VudDogJHtyZXMuYWxsUm91dGVzLmxlbmd0aH1gKTtcbiAgcmV0dXJuIHJlcztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEluZGV4O1xuIl19 */\n/*@ sourceURL=/Users/dean/Documents/projects/ferry-tracker2/frontend/pages/index.js */",
    __self: this
  }));
};

Index.getInitialProps =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
  var query, res;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = "{\n    allRoutes {\n      id\n      routeName\n    }\n  }";
          _context.next = 3;
          return Object(graphql_request__WEBPACK_IMPORTED_MODULE_5__["request"])(URL, query);

        case 3:
          res = _context.sent;
          console.log("All routes fetched. Count: ".concat(res.allRoutes.length));
          return _context.abrupt("return", res);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));
/* harmony default export */ __webpack_exports__["default"] = (Index);
    (function (Component, route) {
      if(!Component) return
      if (false) {}
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=index.js.06dfa74bbd1777a1ad0c.hot-update.js.map