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
      where: { id: req.params.id },
      include: [Sailing]
    })
      .then(routes => res.status(200).send(routes))
      .catch(error => res.status(400).send(error));
  }
};
