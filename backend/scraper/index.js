// scraper

// require('dotenv').config();

// const scraper = require('table-scraper');
// const { ApolloClient } = require('apollo-client');
// const { HttpLink } = require('apollo-link-http');
// const { InMemoryCache } = require('apollo-cache-inmemory');
// const fetch = require('isomorphic-fetch');
// const moment = require('moment-timezone');

// const { upsertRouteMutation } = require('../queries/upsertRoute');
// const { upsertSailing } = require('../queries/upsertSailing');

// // const uri = process.env.ENDPOINT;
// const uri = 'https://ferry-time.herokuapp.com/v1alpha1/graphql'

// const client = new ApolloClient({
//   link: new HttpLink({ uri }),
//   cache: new InMemoryCache(),
//   fetch,
// });

const makeRouteInfo = array => ({
  routeName: array[0][0].split('Sailing time: ')[0],
  averageSailing: array[0][0].split('Sailing time: ')[1],
  sailingDate: new Date(array[0][1]).toISOString().substr(0, 10),
});

const validateTime = (date, time) => {
  const isTime = /\d+:\d\d [AP]M/.test(time);
  // console.log(time, isTime)
  if (!isTime) return null;
  const dateTime = moment.tz(
    date.concat(' ', time),
    'YYYY-MM-DD hh:mm a',
    'America/Vancouver'
  );
  return dateTime.utc().format();
};

const makeSailing = (object, date) => {
  const [
    vessel,
    scheduled_departure,
    actual_departure,
    eta,
    sailing_status,
  ] = Object.values(object);
  return {
    vessel,
    sailing_status,
    scheduled_departure: validateTime(date, scheduled_departure),
    actual_departure: validateTime(date, actual_departure),
    eta: validateTime(date, eta),
  };
};

const compileSailings = (rawSchedule, date) => {
  rawSchedule.shift();
  return rawSchedule.map(x => makeSailing(x, date));
};

function clean(data) {
  const l = data.length;
  const routesArray = [];
  for (let i = 2; i < l; i += 2) {
    const route = makeRouteInfo(data[i]);
    route.sailings = compileSailings(data[i + 1], route.sailingDate);
    routesArray.push(route);
  }
  return routesArray;
}

const upsertSailingsOfRoute = async ({ route_id, sailings }) =>
  sailings.map( sailing => {
    const payload = { route_id, ...sailing }
    // console.log(payload)
    return client.mutate({ mutation: upsertSailing, variables:  {objects: payload}  });
  });

const upsertRoute = async ({ routeInfo }) =>
  client.mutate({ mutation: upsertRouteMutation, variables: routeInfo });

// const getRawSchedule = async () =>
//   scraper.get('http://orca.bcferries.com:8080/cc/marqui/actualDepartures.asp');

const scrapeSailings = async () => {
  try {
    console.log("Scraping schedule...")
    const data = clean(await getRawSchedule());
    console.log("Scraped routes:", data.length)
    data.map(async route => {
      const { sailings, ...routeInfo } = route;
      const { data } = await upsertRoute({ routeInfo });
      const route_id = data.insert_route.returning[0].id;
      upsertSailingsOfRoute({ route_id, sailings });

    });
  } catch (err) {
    throw err;
  } finally {
    console.log(`Scraped at ${new Date()}`);
  }
};

// scrapeSailings();



const scrape = interval => setInterval(scrapeSailings, interval);

module.exports = {
  scrape,
  makeSailing,
  validateTime,
  upsertRoute,
  upsertSailingsOfRoute,
  clean,
  getRawSchedule,
};
