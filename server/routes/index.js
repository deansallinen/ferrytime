const sailingsController = require("../controllers").sailings;
const routesController = require("../controllers").routes;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the sailings API!"
    })
  );

  app.get("/routes", routesController.list);
  app.get("/routes/:id", routesController.one);
  // app.post("/routes/:id/sailings", sailingsController.create);
  app.get("/routes/:id/sailings", sailingsController.list);
};
