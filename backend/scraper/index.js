require('dotenv').config();

const scraper = require('table-scraper');
const { request } = require('graphql-request');
const moment = require('moment-timezone');
const { flatten, merge } = require('lodash');

const { upsertRoute, upsertSailing } = require('../queries');

const uri = process.env.ENDPOINT;

const makeRouteInfo = array => ({
  route_name: array[0][0].split('Sailing time: ')[0],
  average_sailing: array[0][0].split('Sailing time: ')[1],
  sailing_date: new Date(array[0][1]).toISOString().substr(0, 10)
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
    scheduled_departure_time,
    actual_departure_time,
    eta_time,
    sailing_status
  ] = Object.values(object);
  const scheduled_departure = validateTime(date, scheduled_departure_time);
  const actual_departure = validateTime(date, actual_departure_time);
  const eta = validateTime(date, eta_time);
  const percent_full = null;
  return {
    vessel,
    sailing_status,
    scheduled_departure,
    actual_departure,
    eta,
    percent_full
  };
};

const compileSailings = (rawSchedule, date) => {
  rawSchedule.shift();
  const sailingsArray = rawSchedule.map(x => makeSailing(x, date));
  const sailingsObject = sailingsArray.reduce(
    (obj, sailing) => ((obj[sailing.scheduled_departure] = sailing), obj),
    {}
  );

  return sailingsObject;
};

const getSailingsArray = data => {
  const l = data.length;
  const routesArray = [];
  for (let i = 2; i < l; i += 2) {
    const route = makeRouteInfo(data[i]);
    route.sailings = compileSailings(data[i + 1], route.sailing_date);
    routesArray.push(route);
  }
  return routesArray;
};

const scrapeConditionsPage = async () =>
  scraper.get('https://orca.bcferries.com/cc/marqui/at-a-glance.asp');

const scrapeSailingsPage = async () =>
  scraper.get('http://orca.bcferries.com:8080/cc/marqui/actualDepartures.asp');

const getRouteTables = pageData =>
  pageData.filter(each => each[0][0] === 'Route');

const splitTimeFromPercent = input => {
  const regex = /(\d{1,2}:\d\d[ap]m)(\d+)%/g;
  const res = regex.exec(input);
  if (!res) return null;
  const [_, time, percentage] = res;
  const timestamp = moment.tz(time, 'hh:mmaa', 'America/Vancouver');
  // console.log(time, timestamp.utc().format())
  return {
    scheduled_departure: timestamp.utc().format(),
    percent_full: parseInt(percentage)
  };
};

const getSailingsObject = percentString => {
  if (!/^\d/.test(percentString)) return {}
  const percentArray = percentString
    .split(' full')
    .filter(Boolean)
    .map(splitTimeFromPercent);
  const percentObject = percentArray.reduce(
    (obj, sailing) => ((obj[sailing.scheduled_departure] = sailing), obj),
    {}
  );
  return percentObject;
};

const createRouteObject = route => ({
  route_name: route[0],
  sailings: getSailingsObject(route[1]),
  car_waits: parseInt(route[route.length - 3]),
  oversize_waits: parseInt(route[route.length - 2])
});

const getConditionsArray = pageData => {
  const routeTables = getRouteTables(pageData);
  const removeBlankValues = row => Object.values(row).filter(Boolean);
  const removeBlankRows = rows =>
    rows.filter(element => Object.keys(element).length > 3 && element[0]);
  return flatten(
    routeTables.map(routeTable => {
      const [headers, ...rows] = routeTable;
      return removeBlankRows(rows).map(row => {
        const route = removeBlankValues(row);
        return createRouteObject(route);
      });
    })
  );
};

const scrape = async () => {
  console.log('\nScraping sailings schedule...');
  const sailingPage = await scrapeSailingsPage();
  const conditionsPage = await scrapeConditionsPage();

  const sailings = getSailingsArray(sailingPage);
  const conditions = getConditionsArray(conditionsPage);

  const result = merge(sailings, conditions);
  console.log(`Scraped ${result.length} routes`);
  return result;
};

const insert = async routes => {
  const routesResult = await Promise.all(
    routes.map(async route => {
      const { sailings, ...routePayload } = route;
      const routeResult = await request(uri, upsertRoute, routePayload);
      console.log(`\nUpserted route info for ${route.route_name}`);

      const route_id = routeResult.insert_route.returning[0].id;
      const sailingResults = Object.values(sailings).map(async sailing => {
        const sailingPayload = { ...sailing, route_id };
        return request(uri, upsertSailing, {
          objects: sailingPayload
        });
      });

      console.log(
        `Upserted ${sailingResults.length} sailings for ${route.route_name}`
      );
    })
  );

  console.log(`\nFinished updating ${routesResult.length} routes`);
};

const main = () => {
  scrape()
    .then(routes => insert(routes))
    .catch(err => {
      throw err;
    });
};

module.exports = { main };
