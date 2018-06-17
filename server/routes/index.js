const controller = require('../controllers');

module.exports = app => {
  app.get('/api/routes', controller.getAllRoutes);
  app.put('/api/routes', controller.putOneRoute);

  app.get('/api/routes/name/:route_name', controller.getRouteByName);
  app.get('/api/routes/:id', controller.getOneRoute);

  app.put('/api/routes/:id/sailings', controller.putOneSailing);
  app.get('/api/routes/:id/sailings', controller.getOneSchedule);
};
