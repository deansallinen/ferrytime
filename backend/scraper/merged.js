require('dotenv').config();

const scraper = require('table-scraper');
const { ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const fetch = require('isomorphic-fetch');
const moment = require('moment-timezone');
const { fromPairs, flatten } = require('lodash');

const {
  upsertSailing,
  upsertRouteMutation,
  addWaits,
  getRouteIDbyName,
  getSailing,
  addPercentage
} = require('../queries');

// const uri = process.env.ENDPOINT;
const uri = 'https://ferry-time.herokuapp.com/v1alpha1/graphql';

const client = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache(),
  fetch
});

const scrapeConditionsPage = async () =>
  scraper.get('https://orca.bcferries.com/cc/marqui/at-a-glance.asp');

const scrapeSailingsPage = async () =>
  scraper.get('http://orca.bcferries.com:8080/cc/marqui/actualDepartures.asp');

const getRouteTables = pageData =>
  pageData.filter(each => each[0][0] === 'Route');

const main = async () => {
  try {
    console.log('Scraping sailings schedule...');
    const sailingPage = await scrapeSailingsPage();
    const conditionsPage = await scrapeConditionsPage();

    const sailingTables = getRouteTables(sailingPage);
    const conditionsTables = getRouteTables(conditionsPage);

    console.log('Sailings:', sailingPage);
    // console.log('Sailings:', sailingTables);
    // console.log('Conditions:', conditionsTables);
  } catch (err) {
    throw err;
  } finally {
    console.log(`Scraped at ${new Date()}`);
  }
};

main();
