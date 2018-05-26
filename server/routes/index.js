const sailingsController = require("../controllers").sailings;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the sailings API!',
    }));

    app.post('/api/sailings', sailingsController.create);
    app.get('/api/sailings', sailingsController.list);
};
