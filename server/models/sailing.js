const mongoose = require('mongoose');

const Sailing = mongoose.model('Sailing', {
  routeId: String,
  scheduledDeparture: Date,
  actualDeparture: Date,
  eta: Date,
  sailingStatus: String,
  vessel: String,
  lastUpdated: Date
});

module.exports = Sailing;
