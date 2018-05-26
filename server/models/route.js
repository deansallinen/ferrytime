'use strict';
module.exports = (sequelize, DataTypes) => {
    const Route = sequelize.define('route', {
        routeName: {
            type: DataTypes.STRING

        },
        averageSailing: {
            type: DataTypes.STRING

        }
    }, {
        underscores: true,
    });
    return Route;
};
