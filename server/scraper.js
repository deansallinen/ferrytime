const scraper = require('table-scraper');
const db = require('./db/index');
const fetch = require('node-fetch');
const isValid = require('date-fns/is_valid');

const baseURL = 'http://localhost:8080';

// const getRouteID = async (baseURL, routeName) => {
//   const URL = baseURL + `/api/routes/name/${routeName}`;
//   try {
//     const response = await fetch(URL);
//     const route = await response.json();
//     return route.id;
//   } catch (err) {
//     console.error(err);
//   }
// };

const putToDB = async (baseURL, apiRoute, obj) => {
  const URL = baseURL + apiRoute;
  try {
    const response = await fetch(URL, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(obj)
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};

const routeModel = route => ({
  route_name: route.route_name,
  average_sailing: route.average_sailing
});

module.exports = {
  scrape: async () => {
    try {
      const result = await scraper.get(
        'http://orca.bcferries.com:8080/cc/marqui/actualDepartures.asp'
      );
      const data = await clean(result);
      console.log(new Date());
      data.map(async route => {
        const result = await putToDB(baseURL, '/api/routes', routeModel(route));
        route.sailings.map(async sailing => {
          await putToDB(baseURL, `/api/routes/${result.id}/sailings`, sailing);
        });
      });
    } catch (err) {
      console.log(err.message);
    }
  }
};

function clean(data) {
  const l = data.length;
  const routesArray = [];
  for (var i = 2; i < l; i = i + 2) {
    let route = makeRouteInfo(data[i]);
    route.sailings = compileSailings(data[i + 1], route.sailing_date);
    routesArray.push(route);
  }
  return routesArray;
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
  sailing.scheduled_departure = validateTime(date, object[1]);
  sailing.actual_departure = validateTime(date, object[2]);
  sailing.eta = validateTime(date, object[3]);
  sailing.sailing_status = object[4];
  return sailing;
};
