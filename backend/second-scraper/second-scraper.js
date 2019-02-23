require('dotenv').config();
const scraper = require('table-scraper');
const { fromPairs, flatten } = require('lodash');
const moment = require('moment-timezone');
const { ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const fetch = require('isomorphic-fetch');

const { addWaits, getRouteIDbyName } = require('../queries/upsertRoute')
const { getSailing, addPercentage } = require('../queries/upsertSailing')

const uri = process.env.ENDPOINT

const client = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache(),
  fetch,
});

const scrapeConditionsPage = async () => scraper.get('https://orca.bcferries.com/cc/marqui/at-a-glance.asp');

const regex = /(\d{1,2}:\d\d[ap]m)(\d+)%/g

const splitTimeFromPercent = (input) => {
  const res = regex.exec(input)
  if (!res) return null
  const [_, time, percentage] = res
  const timestamp = moment.tz(
      time,
      'hh:mmaa',
      'America/Vancouver'
  );
  // console.log(time, timestamp.utc().format())
  return [timestamp.utc().format(), parseInt(percentage)];
}

const getPercentArray = (input) => (
  input.split(' full')
    .filter(Boolean)
    .map(x => splitTimeFromPercent(x))
)

const removeBlankRows = (rows) => rows.filter((element) => Object.keys(element).length > 3 && element[0])

const removeBlankValues = (row) => Object.values(row).filter(Boolean)

const getRouteTables = (pageData) => pageData.filter(each => each[0][0] === 'Route')

const getRouteID = async (route) => {
  const {data} = await client.query({query: getRouteIDbyName, variables: {route_name: route[0]}})
  return data.route[0].id
}

const createRouteObject = async (route) => ({
    route_id: await getRouteID(route),
    route_name: route[0],
    sailings: getPercentArray(route[1]),
    car_waits: parseInt(route[route.length - 3]),
    oversize_waits: parseInt(route[route.length - 2]),
})

const getRouteObjects = (routeTables) => (
  routeTables.map((routeTable) => {
    const [headers, ...rows] = routeTable;
    return removeBlankRows(rows).map(async (row) => {
      const route = removeBlankValues(row)
      return await createRouteObject(route)
    })
  })
)

const getConditionsPromise = async () => {
    const page = await scrapeConditionsPage()
    const routeTables = getRouteTables(page)
    const routeObjects = getRouteObjects(routeTables)
    return flatten(routeObjects);
  }

const updateRouteWaits = async ({ route_name, oversize_waits, car_waits }) =>
  client.mutate({ mutation: addWaits, variables: {route_name, oversize_waits, car_waits} });
  
const updateSailingPercentage = async ({ route_id, scheduled_departure, percent_full }) =>
  client.mutate({ mutation: addPercentage, variables: {route_id, scheduled_departure, percent_full} });

const setConditions = async () => {
  const routes = await Promise.all(await getConditionsPromise())
  routes.forEach(route => {
    const {route_id} = route
    updateRouteWaits(route)
    route.sailings.forEach(sailing => {
      if (sailing) {
        const [scheduled_departure, percent_full] = sailing
        // console.log(sailing)
        updateSailingPercentage({route_id, scheduled_departure, percent_full})
      }
    })
  })
}

const scrape = interval => setInterval(setConditions, interval)

// setConditions()

module.exports = { getConditionsPromise, scrape };