// server.js

const Koa = require('koa');
// const Helmet = require('koa-helmet');
const scraper = require('./scraper');
const fetch = require('isomorphic-fetch');
require('dotenv').config();

const app = new Koa();
// app.use(Helmet());

// // Keepalive
setInterval(() => fetch('https://ferrytime.now.sh/'), 5 * 60 * 1000); // 5 minutes

app.listen({ port: 4000 }, () =>
  console.log(`🚀  Server ready at http://localhost:4000`)
);

scraper.main();
setInterval(scraper.main, 1 * 60 * 1000); // 1 minute
