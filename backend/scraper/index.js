require('dotenv').config();

const scraper = require('table-scraper');
const { request } = require('graphql-request');

const { getPercentFull } = require('./getPercentFull.js');
const { getSailingsArray } = require('./getSailingsArray.js');

const {
  upsertRoute,
  upsertSailing,
  upsertSailingPercent,
  upsertParkingAndWaits,
} = require('../queries');

const uri = process.env.ENDPOINT;

const scrapeSailingSchedule = async () => {
  console.log('\nScraping sailings schedule...');
  const sailingPage = await scraper.get(
    'http://orca.bcferries.com:8080/cc/marqui/actualDepartures.asp'
  );

  const sailings = getSailingsArray(sailingPage);

  console.log(`Scraped ${sailings.length} routes`);
  return sailings;
};

const primaryInsert = async routes => {
  const routesResult = routes.map(async route => {
    const { sailings, ...routePayload } = route;
    const routeResult = await request(uri, upsertRoute, routePayload);
    console.log(`Upserted route info for ${route.route_name}`);

    const route_id = routeResult.insert_route.returning[0].id;
    
    const sailingsWithRouteID = Object.values(sailings).map(sailing => ({...sailing, route_id }))
    
    const sailingResults = await request(uri, upsertSailing, {
        objects: sailingsWithRouteID,
      });

    console.log(
      `Upserted ${sailingResults.insert_sailing.returning.length} sailings for ${route.route_name}`
    );

    return sailingResults.insert_sailing.returning;
  });

  console.log(`Finished updating ${routesResult.length} routes`);
  return Promise.all(routesResult);
};

const secondaryInserts = routesResult =>
  routesResult.map(async route => {
    const additionalRouteInfo = await Promise.all(
      route.map(async sailing => {
        const {
          id,
          scheduled_departure,
          routeByrouteId,
        } = sailing;
        const { departure_term, route_num_str, id: route_id } = routeByrouteId;

        const futureSailing = await getPercentFull({
          scheduled_departure,
          departure_term,
          route_num_str,
        });

        if (futureSailing) {
          const {
            percent_full,
            parking_full,
            car_waits,
            oversize_waits,
          } = futureSailing;
          // update sailing with percentage full
          request(uri, upsertSailingPercent, {
            id,
            percent_full,
          }).then(x => console.log(x.update_sailing.returning[0]));
          // return parking and sailing waits so we can update the route table
          return { id: route_id, parking_full, car_waits, oversize_waits };
        }
      })
    );
    // console.log(
    //   `Updated ${additionalRouteInfo.length} sailings with percent full`
    // );
    const latestRouteInfo = additionalRouteInfo.pop();

    //insert additional route info
    const res = await request(uri, upsertParkingAndWaits, latestRouteInfo);
    console.log(
      `Updated route ${
        res.update_route.returning[0].id
      } with parking and sailing waits`
    );
  });

const main = () => {
  scrapeSailingSchedule()
    .then(routes => primaryInsert(routes))
    .then(routesResult => secondaryInserts(routesResult))
    .catch(err => {
      throw err;
    });
};

// main();

module.exports = { main };
