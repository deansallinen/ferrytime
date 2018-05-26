const sailingsController = require("../controllers").sailings;
const routesController = require("../controllers").routes;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the sailings API!"
    })
  );

  app.get("/api/routes", routesController.list);
  app.post("/api/sailings", sailingsController.create);
  app.get("/api/sailings", sailingsController.list);
};
