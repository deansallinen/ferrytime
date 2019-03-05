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

const validateTime = time => {
  const isTime = /\d+:\d\d[AP]M/i.test(time.replace(/\s/g, ''));
  return isTime;
};

const getHourAndMinute = time =>
  moment(time, 'hh:mm a')
    .format('HH:mm')
    .split(':');

const getUTCTime = rawTime => {
  const isTime = validateTime(rawTime);
  if (!isTime) return null;
  const [hour, minute] = getHourAndMinute(rawTime);
  const dateTime = moment
    .tz('America/Vancouver')
    .hour(hour)
    .minute(minute)
    .second(0);
  // console.log(
  //   rawTime,
  //   hour,
  //   minute,
  //   dateTime.format(),
  //   dateTime.utc().format()
  // );
  return dateTime.utc().format();
};

const makeSailing = object => {
  const [
    vessel,
    scheduled_departure_time,
    actual_departure_time,
    eta_time,
    sailing_status
  ] = Object.values(object);
  const scheduled_departure = getUTCTime(scheduled_departure_time);
  const actual_departure = getUTCTime(actual_departure_time);
  const eta = getUTCTime(eta_time);
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

const objectifySailingArray = array =>
  array.reduce(
    (obj, sailing) => ((obj[sailing.scheduled_departure] = sailing), obj),
    {}
  );

const compileSailings = rawSchedule => {
  rawSchedule.shift();
  const sailingsArray = rawSchedule.map(x => makeSailing(x));
  const sailingsObject = objectifySailingArray(sailingsArray);
  return sailingsObject;
};

const getSailingsArray = data => {
  const l = data.length;
  const routesArray = [];
  for (let i = 2; i < l; i += 2) {
    const route = makeRouteInfo(data[i]);
    route.sailings = compileSailings(data[i + 1]);
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
  const scheduled_departure = getUTCTime(time);
  return {
    scheduled_departure,
    percent_full: parseInt(percentage)
  };
};

const getSailingsObject = percentString => {
  if (!/^\d/.test(percentString)) return {};
  const percentArray = percentString
    .split(' full')
    .filter(Boolean)
    .map(splitTimeFromPercent);
  const percentObject = objectifySailingArray(percentArray);
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

const sort = routeArray =>
  routeArray.sort((a, b) => {
    const routeA = a.route_name.toUpperCase();
    const routeB = b.route_name.toUpperCase();
    if (routeA < routeB) return -1;
    if (routeA > routeB) return 1;
    return 0;
  });

const scrape = async () => {
  console.log('\nScraping sailings schedule...');
  const sailingPage = await scrapeSailingsPage();
  const conditionsPage = await scrapeConditionsPage();

  const sailings = getSailingsArray(sailingPage);
  const conditions = getConditionsArray(conditionsPage);
  // console.log(JSON.stringify(sailings, null, 2))

  const result = merge(sort(sailings), sort(conditions));
  // console.log(JSON.stringify(result, null, 2))

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
        // console.log(sailingPayload, route.route_name);
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
