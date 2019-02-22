// server.js

const Koa = require('koa');
const Helmet = require('koa-helmet');
const scraper = require('./scraper');
const secondScraper = require('./second-scraper/second-scraper');
const fetch = require('node-fetch');
require('dotenv').config();

const app = new Koa();
app.use(Helmet());

const uri = 'https://ferry-time.herokuapp.com/v1alpha1/graphql';

// Keepalive
const keepalive = () => fetch('https://ferrytrackerserver.now.sh/');
setInterval(keepalive, 5 * 60 * 1000); // 5 minutes

// scraper.scrape(60000);
secondScraper.scrape(60000);

app.listen({ port: 4000 }, () =>
  console.log(`🚀  Server ready at http://localhost:4000`)
);
