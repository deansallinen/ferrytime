const scraper = require('table-scraper');
// const db = require('./db/index');
const fetch = require('node-fetch');
const isValid = require('date-fns/is_valid');
const { USER, PASS } = require('./secrets');
const mongoose = require('mongoose');

const URI = `mongodb://${USER}:${PASS}@ds064198.mlab.com:64198/ferrytracker`;

mongoose.connect(
  URI,
  { useNewUrlParser: true }
);

const sailingSchema = {
  routeId: String,
  scheduledDeparture: Date,
  actualDeparture: Date,
  eta: Date,
  sailingStatus: String,
  vessel: String
};

const Sailing = mongoose.model('Sailing', sailingSchema);

const Route = mongoose.model('Route', {
  routeName: String,
  averageSailing: String,
  sailingDate: Date,
  sailings: [sailingSchema]
});

// const test = new Sailing({ name: 'Test Sailing' });

// test.save().then(() => console.log('saved'));

const scrape = async () => {
  try {
    const result = await scraper.get(
      'http://orca.bcferries.com:8080/cc/marqui/actualDepartures.asp'
    );
    const data = await clean(result);
    console.log('Scraped! ', new Date());
    data.map(async route => {
      const newRoute = new Route(route);
      newRoute
        .save()
        .then(() => console.log(`Route ${newRoute.routeName} saved!`));
      // const result = await putToDB(baseURL, '/api/routes', routeModel(route));
      // route.sailings.map(async sailing => {
      // await putToDB(baseURL, `/api/routes/${result.id}/sailings`, sailing);
      // });
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

// const putToDB = async (baseURL, apiRoute, obj) => {
//   const URL = baseURL + apiRoute;
//   try {
//     const response = await fetch(URL, {
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       method: 'PUT',
//       body: JSON.stringify(obj)
//     });
//     const result = await response.json();
//     return result;
//   } catch (err) {
//     console.error(err);
//   }
// };

// const routeModel = route => ({
//   route_name: route.route_name,
//   average_sailing: route.average_sailing
// });
