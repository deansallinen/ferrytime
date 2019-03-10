const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-route-page-js": hot(preferDefault(require("/home/deza604/ferrytime/new-frontend/src/templates/routePage.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/deza604/ferrytime/new-frontend/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/home/deza604/ferrytime/new-frontend/src/pages/404.js"))),
  "component---src-pages-about-js": hot(preferDefault(require("/home/deza604/ferrytime/new-frontend/src/pages/about.js"))),
  "component---src-pages-contact-js": hot(preferDefault(require("/home/deza604/ferrytime/new-frontend/src/pages/contact.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/home/deza604/ferrytime/new-frontend/src/pages/index.js")))
}

