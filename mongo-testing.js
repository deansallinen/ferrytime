const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
const url = 'mongodb://deza604-ferry-tracker-2-5483816:27017/ferrytracker';

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log('working');
    db.close();
});

