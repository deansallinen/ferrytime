const Routes = require("../models").route;

module.exports = {
  list(req, res) {
    return Routes.findAll()
      .then(routes => res.status(200).send(routes))
      .catch(error => res.status(400).send(error));
  }
};
