// scraper

const scraper = require('table-scraper');
const { request } = require('graphql-request');
const isValid = require('date-fns/is_valid');

const endpoint = 'http://localhost:4000/graphql';
const upsertRoute = `
mutation updateRoute(
  $routeName: String
  $averageSailing: String
  $sailingDate: String
) {
  updateRoute(
    input: {
      routeName: $routeName
      averageSailing: $averageSailing
      sailingDate: $sailingDate
    }
  ) {
    id
    routeName
    averageSailing
  }
}`;
const upsertSailing = `
mutation sailingUpdate(
  $routeId: String
  $scheduledDeparture: String
  $actualDeparture: String
  $eta: String
  $sailingStatus: String
  $vessel: String
  $lastUpdated: String
) {
  updateSailing(
    input: {
      routeId: $routeId
      scheduledDeparture: $scheduledDeparture
      actualDeparture: $actualDeparture
      eta: $eta
      vessel: $vessel
      sailingStatus: $sailingStatus
      lastUpdated: $lastUpdated
    }
  ) {
    routeId
  }
}
`;

const makeRouteInfo = array => ({
  routeName: array[0][0].split('Sailing time: ')[0],
  averageSailing: array[0][0].split('Sailing time: ')[1],
  sailingDate: new Date(array[0][1]).toISOString().substr(0, 10)
});

const validateTime = (date, time) => {
  const dateTime = new Date(date.concat(' ', time));
  if (time && isValid(dateTime)) {
    return dateTime;
  }
  return null;
};

const makeSailing = (object, date) => {
  const [
    vessel,
    scheduledDeparture,
    actualDeparture,
    eta,
    sailingStatus
  ] = object;
  return {
    vessel,
    sailingStatus,
    scheduledDeparture: validateTime(date, scheduledDeparture),
    actualDeparture: validateTime(date, actualDeparture),
    eta: validateTime(date, eta)
  };
};

const compileSailings = (rawSchedule, date) => {
  const sailings = rawSchedule.map(x => makeSailing(x, date));
  sailings.shift();
  return sailings;
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

const scrapeSailings = async () => {
  try {
    const rawSchedule = await scraper.get(
      'http://orca.bcferries.com:8080/cc/marqui/actualDepartures.asp'
    );
    const data = await clean(rawSchedule);
    data.map(async route => {
      const { sailings, ...routeVariables } = route;
      const result = await request(endpoint, upsertRoute, routeVariables);
      const routeId = result.updateRoute.id;
      sailings.map(async sailing => {
        const sailingResult = await request(endpoint, upsertSailing, {
          ...sailing,
          routeId,
          lastUpdated: new Date()
        });
        // console.log(sailingResult);
      });
    });
  } catch (err) {
    throw err;
  } finally {
    console.log(`Scraped at ${new Date()}`);
  }
};

// const scrape = () => setInterval(scrapeSailings, 2000);

// module.exports = {
//   scrape,
//   makeSailing,
//   validateTime
// };

module.exports = () => setInterval(scrapeSailings, 20000);