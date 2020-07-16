const moment = require('moment-timezone');

const makeRouteInfo = array => ({
  route_name: array[0][0].split('Sailing time: ')[0],
  average_sailing: array[0][0].split('Sailing time: ')[1],
  sailing_date: new Date(array[0][1]).toISOString().substr(0, 10),
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
  return dateTime.utc().format();
};

const makeSailing = object => {
  const [
    vessel,
    scheduled_departure_time,
    actual_departure_time,
    eta_time,
    sailing_status,
  ] = Object.values(object);
  const scheduled_departure = getUTCTime(scheduled_departure_time);
  const actual_departure = getUTCTime(actual_departure_time);
  const eta = getUTCTime(eta_time);
  return {
    vessel,
    sailing_status,
    scheduled_departure,
    actual_departure,
    eta,
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

module.exports = { getSailingsArray };
