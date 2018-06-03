const Routes = require("../models").route;
const Sailing = require("../models").sailing;

module.exports = {
  list(req, res) {
    return Routes.findAll()
      .then(routes => res.status(200).send(routes))
      .catch(error => res.status(400).send(error));
  },
  one(req, res) {
    return Routes.findAll({
      include: [Sailing],
      where: { id: req.params.id },
      order: [Sailing.scheduledDeparture, "ASC"]
    })
      .then(routes => res.status(200).send(routes))
      .catch(error => res.status(400).send(error));
  }
};
