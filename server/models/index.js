const Sequelize = require("sequelize");
const sequelize = new Sequelize("null", "null", "null", {
  dialect: "sqlite",
  storage: "../ferrytracker.db"
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Models
db.sailing = require("./sailing.js")(sequelize, Sequelize);
db.route = require("./route.js")(sequelize, Sequelize);

// Relations
db.route.hasMany(db.sailing);
db.sailing.belongsTo(db.route);

module.exports = db;
