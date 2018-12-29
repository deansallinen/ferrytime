const mongoose = require('mongoose');

const Sailing = mongoose.model('Sailing', {
  routeId: String,
  scheduledDeparture: String,
  actualDeparture: String,
  eta: String,
  sailingStatus: String,
  vessel: String,
  lastUpdated: String,
  percentFull: Number,
});

module.exports = Sailing;
