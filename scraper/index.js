// scraper

const scraper = require('table-scraper');
const { request } = require('graphql-request');
const isValid = require('date-fns/is_valid');

const scrape = async () => {
  try {
    const result = await scraper.get(
      'http://orca.bcferries.com:8080/cc/marqui/actualDepartures.asp'
    );
    const data = await clean(result);
    data.map(route => {
      const routeVariables = {
        routeName: route.routeName,
        averageSailing: route.averageSailing,
        sailingDate: route.sailingDate
      };
      // console.log(route);
      request(endpoint, upsertRoute, routeVariables).then(result => {
        const routeId = result.updateRoute.id;
        route.sailings.map(sailing => {
          request(endpoint, upsertSailing, {
            ...sailing,
            routeId,
            lastUpdated: now
          }).then(sailingResult => console.log(sailingResult));
        });
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

scrape();

function clean(data) {
  const l = data.length;
  const routesArray = [];
  for (var i = 2; i < l; i = i + 2) {
    let route = makeRouteInfo(data[i]);
    route.sailings = compileSailings(data[i + 1], route.sailingDate);
    routesArray.push(route);
  }
  return routesArray;
}

const makeRouteInfo = array => ({
  routeName: array[0][0].split('Sailing time: ')[0],
  averageSailing: array[0][0].split('Sailing time: ')[1],
  sailingDate: new Date(array[0][1]).toISOString().substr(0, 10)
});

const compileSailings = (rawSchedule, date) => {
  let sailings = rawSchedule.map(x => makeSailing(x, date));
  sailings.shift();
  return sailings;
};

const validateTime = (date, time) => {
  const dateTime = new Date(date.concat(' ', time));
  if (time && isValid(dateTime)) {
    return dateTime;
  }
  return null;
};

const makeSailing = (object, date) => {
  let sailing = {};
  sailing.vessel = object[0];
  sailing.scheduledDeparture = validateTime(date, object[1]);
  sailing.actualDeparture = validateTime(date, object[2]);
  sailing.eta = validateTime(date, object[3]);
  sailing.sailingStatus = object[4];
  return sailing;
};

const now = new Date();
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
