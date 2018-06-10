const scraper = require('table-scraper');
const db = require('./db/index');
const isValid = require('date-fns/is_valid');

const baseURL = 'http://localhost:8080';

const putToDB = (baseURL, apiRoute, data) =>
  fetch(baseURL + apiRoute, {
    method: 'PUT',
    body: data
  })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));

// module.exports = {
//   scrape: () => {
scraper
  .get('http://orca.bcferries.com:8080/cc/marqui/actualDepartures.asp')
  .then(result => clean(result))
  .then(data => {
    data.map(route => {
      route;
    });
  });
//   }
// };

function clean(data) {
  let l = data.length;
  let routes = [];
  for (var i = 2; i < l; i = i + 2) {
    let route = makeRouteInfo(data[i]);
    route.sailings = compileSailings(data[i + 1], route.sailing_date);
    routes.push(route);
  }
  return routes;
}

const makeRouteInfo = array => ({
  route_name: array[0][0].split('Sailing time: ')[0],
  average_sailing: array[0][0].split('Sailing time: ')[1],
  sailing_date: new Date(array[0][1]).toISOString().substr(0, 10)
});

const compileSailings = (rawSchedule, date) => {
  let sailings = rawSchedule.map(x => makeSailing(x, date));
  sailings.shift();
  return sailings;
};

const checkValidTime = (date, time) => {
  const dateTime = new Date(date.concat(' ', time));
  if (isValid(dateTime)) {
    return dateTime;
  }
  return null;
};

const makeSailing = (object, date) => {
  let sailing = {};
  sailing.vessel = object[0];
  sailing.scheduled_departure = checkValidTime(date, object[1]);
  sailing.actual_departure = checkValidTime(date, object[2]);
  sailing.eta = checkValidTime(date, object[3]);
  sailing.sailing_status = object[4];
  return sailing;
};
