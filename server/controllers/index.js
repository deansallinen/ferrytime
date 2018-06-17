// const Routes = require("../models").route;
// const Sailing = require("../models").sailing;

const db = require('../db');

module.exports = {
  getAllRoutes(req, res, next) {
    db.any('SELECT * FROM routes')
      .then(data => res.status(200).json(data))
      .catch(error => res.status(400).send(error));
  },

  getOneRoute(req, res) {
    const routeId = parseInt(req.params.id);
    db.one('SELECT * FROM routes WHERE id = $1', routeId)
      .then(data => res.status(200).send(data))
      .catch(error => res.status(400).send(error));
  },

  getRouteByName(req, res) {
    const routeName = req.params.route_name;
    db.one('SELECT * FROM routes WHERE route_name ILIKE $1', routeName)
      .then(data => res.status(200).send(data))
      .catch(error => res.status(400).send(error));
  },

  putOneRoute(req, res) {
    db.one(
      `INSERT INTO routes (route_name, average_sailing)
      VALUES($1, $2)
      ON CONFLICT (route_name) DO UPDATE SET 
        route_name = EXCLUDED.route_name, 
        average_sailing = EXCLUDED.average_sailing
      RETURNING *`,
      [req.body.route_name, req.body.average_sailing]
    )
      .then(data => res.status(200).send(data))
      .catch(error => res.status(400).send(error));
  },

  putOneSailing(req, res) {
    const routeId = parseInt(req.params.id);
    console.log(req.body.scheduled_departure);
    db.one(
      `INSERT INTO sailings
      (route_id, scheduled_departure, actual_departure, eta, sailing_status, vessel)
      VALUES($1, $2, $3, $4, $5, $6)
      ON CONFLICT ON CONSTRAINT unique_sailing DO UPDATE SET 
        actual_departure = EXCLUDED.actual_departure, 
        eta = EXCLUDED.eta,
        sailing_status = EXCLUDED.sailing_status,
        vessel = EXCLUDED.vessel
      RETURNING *`,
      [
        routeId,
        req.body.scheduled_departure,
        req.body.actual_departure,
        req.body.eta,
        req.body.sailing_status,
        req.body.vessel
      ]
    )
      .then(data => res.status(200).send(data))
      .catch(error => res.status(400).send(error));
  },

  getOneSchedule(req, res) {
    const routeId = parseInt(req.params.id);
    db.any(
      'SELECT * FROM routes JOIN sailings ON routes.id = sailings.route_id WHERE routes.id = $1',
      routeId
    )
      .then(data => res.status(200).send(data))
      .catch(error => res.status(400).send(error));
  }
};
