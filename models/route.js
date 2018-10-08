const mongoose = require('mongoose');

const Route = mongoose.model('Route', {
  routeName: String,
  averageSailing: String,
  sailingDate: Date
});

module.exports = Route;
