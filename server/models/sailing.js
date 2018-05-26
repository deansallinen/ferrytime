'use strict';
module.exports = (sequelize, DataTypes) => {
    const Sailing = sequelize.define('sailing', {
        sailingDate: {
            type: DataTypes.STRING

        },
        scheduledDeparture: {
            type: DataTypes.STRING

        },
        actualDeparture: {
            type: DataTypes.STRING

        },
        eta: {
            type: DataTypes.STRING

        },
        sailingStatus: {
            type: DataTypes.STRING

        },
        vessel: {
            type: DataTypes.STRING

        },

    }, {
        underscores: true,
        indexes: [{
            unique: true,
            fields: ['routeId', 'sailingDate', 'scheduledDeparture']
        }]
    });
    return Sailing;
};
