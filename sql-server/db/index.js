const promise = require('bluebird');
const monitor = require('pg-monitor');
const options = {
  promiseLib: promise
};
const pgp = require('pg-promise')(options);
// pgp.pg.types.setTypeParser(1114, s => s);
// monitor.attach(options);
const connectionString =
  'postgres://pi:starwars@192.168.1.100:5432/ferrytracker';
const db = pgp(connectionString);

module.exports = db;
