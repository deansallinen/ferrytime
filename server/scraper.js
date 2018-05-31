const scraper = require("table-scraper");
const db = require("./models/index.js");

module.exports = {
  scrape: () => {
    scraper
      .get("http://orca.bcferries.com:8080/cc/marqui/actualDepartures.asp")
      .then(result => clean(result))
      .then(data => {
        data.map(route => insertRoute(route));
      });
  }
};

function clean(data) {
  let l = data.length;
  // let schedule = [];
  let routes = [];
  for (var i = 2; i < l; i = i + 2) {
    let route = makeRouteInfo(data[i]);
    route.sailings = compileSailings(data[i + 1], route.sailingDate);
    routes.push(route);
    // sailings.map(sailing => {
    //     return schedule.push(
    //         Object.assign({}, sailing, routeInfo)
    //     );
    // }
  }
  return routes;
}

const makeRouteInfo = array => ({
  routeName: array[0][0].split("Sailing time: ")[0],
  averageSailing: array[0][0].split("Sailing time: ")[1],
  sailingDate: new Date(array[0][1]).toISOString().substr(0, 10)
});

const compileSailings = (rawSchedule, date) => {
  let sailings = rawSchedule.map(x => makeSailing(x, date));
  sailings.shift();
  return sailings;
};

const makeSailing = (object, date) => {
  let sailing = {};
  sailing.vessel = object[0];
  sailing.scheduledDeparture = new Date(date.concat(" ", object[1]));
  sailing.actualDeparture = new Date(date.concat(" ", object[2]));
  sailing.eta = object[3];
  sailing.sailingStatus = object[4];
  sailing.sailingDate = date;
  return sailing;
};

// Controls
const insertRoute = function(route) {
  db.route.sync({ force: true }).then(() => {
    return db.route
      .create({
        routeName: route.routeName,
        averageSailing: route.averageSailing
      })
      .then(result => {
        return route.sailings.map(sailing => {
          upsertSailing(sailing, result.id);
        });
      });
  });
};

const upsertSailing = function(sailing, routeId) {
  let condition = {
    routeId: routeId,
    sailingDate: sailing.sailingDate,
    scheduledDeparture: sailing.scheduledDeparture
  };
  db.sailing
    .sync()
    .then(() => db.sailing.findOne({ where: condition }))
    .then(obj => {
      if (obj) {
        console.log("Sailing exists, update");
        console.log(obj);
        return obj.update(sailing);
      } else {
        console.log("Need to create Sailing");
        return insertSailing(sailing, routeId);
      }
    });
};

const insertSailing = function(sailing, routeId) {
  return db.sailing
    .sync()
    .then(() => {
      return db.sailing.create(sailing);
    })
    .then(sailing => {
      return sailing.setRoute(routeId);
    });
};
