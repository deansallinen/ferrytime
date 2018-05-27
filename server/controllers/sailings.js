const Sailing = require("../models").sailing;

module.exports = {
  create(req, res) {
    return Sailing.create({
      name: req.body.name
    })
      .then(sailing => res.status(201).send(sailing))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Sailing.findAll()
      .then(sailings => res.status(200).send(sailings))
      .catch(error => res.status(400).send(error));
  }
};
