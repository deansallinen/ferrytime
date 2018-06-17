const controller = require('../controllers');

module.exports = app => {
  app.get('/api/routes', controller.getAllRoutes);
  app.get('/api/routes/:id', controller.getOneRoute);
  app.put('/api/routes', controller.putOneRoute);

  app.get('/api/sailings', controller.getAllSailings);
  app.get('/api/sailings/:id', controller.getOneSailing);

  app.get('/api/routes/name/:route_name', controller.getRouteByName);

  app.put('/api/routes/:id/sailings', controller.putOneSailing);
  app.get('/api/routes/:id/sailings', controller.getOneSchedule);
};
