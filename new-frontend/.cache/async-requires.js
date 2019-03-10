// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-templates-route-page-js": () => import("/home/deza604/ferrytime/new-frontend/src/templates/routePage.js" /* webpackChunkName: "component---src-templates-route-page-js" */),
  "component---cache-dev-404-page-js": () => import("/home/deza604/ferrytime/new-frontend/.cache/dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-404-js": () => import("/home/deza604/ferrytime/new-frontend/src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-about-js": () => import("/home/deza604/ferrytime/new-frontend/src/pages/about.js" /* webpackChunkName: "component---src-pages-about-js" */),
  "component---src-pages-contact-js": () => import("/home/deza604/ferrytime/new-frontend/src/pages/contact.js" /* webpackChunkName: "component---src-pages-contact-js" */),
  "component---src-pages-index-js": () => import("/home/deza604/ferrytime/new-frontend/src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */)
}

exports.data = () => import(/* webpackChunkName: "pages-manifest" */ "/home/deza604/ferrytime/new-frontend/.cache/data.json")

