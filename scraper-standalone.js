const scraper = require("table-scraper");
const MongoClient = require('mongodb').MongoClient;
// const fs = require('fs');
// var util = require("util");
const assert = require('assert');
// const monk = require("monk");
const url = 'mongodb://deza604-ferry-tracker-2-5483816:27017/ferrytracker';
// const db = monk(monkurl);
// const collection = db.get('ferrytracker');


const getRouteInfo = array => ({
    name: array[0][0].split("Sailing time: ")[0],
    sailingTime: array[0][0].split("Sailing time: ")[1],
    date: new Date(array[0][1]).toISOString().substr(0, 10),
});

const getRouteSailings = input => {
    let sailings = input.map(x => createSailing(x));
    sailings.shift();
    return sailings;
};

const createSailing = object => {
    let sailing = {};
    sailing.vessel = object[0];
    sailing.scheduledDeparture = object[1];
    sailing.actualDeparture = object[2];
    sailing.eta = object[3];
    sailing.status = object[4];
    return sailing;
};

const createSchedule = data => {
    let l = data.length;
    let allRoutes = [];
    for (var i = 2; i < l; i = i + 2) {
        let info = getRouteInfo(data[i]);
        info[info.date] = getRouteSailings(data[i + 1]);
        allRoutes.push(info);
    }
    return allRoutes;
};

scraper.get('http://orca.bcferries.com:8080/cc/marqui/actualDepartures.asp')
    .then(result => console.log(createSchedule(result)))
// .then(result => insertMongo(result));

// Monk
// 
// const mongoInsert = (array) => {
//   collection.insert(array)
//     .then((docs) => {
//         console.log(docs);
//     }).catch((err) => {
//         console.log(err);
//     }).then(() => db.close());
// };

// MongoClient
// 
// const updateMongo = (x) => MongoClient.connect(url, function(err, db){
//     assert.equal(null, err);
//     assert.ok(db != null);
//     db.collection('ferrytracker').updateMany({}, x, function(err, result){
//         assert.equal(null, err);
//         assert.equal(1, result);

//         db.close();
//     });
// });

function insertMongo(x) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        try {
            db.ferrytracker.insertMany({}, x, function(err, result) {
                assert.equal(null, err);
                assert.equal(1, result);
                db.close();
            });
        }
        catch (e) { console.log(e) }
    });
}
    // db.collection('inventory').insertMany([
    //   // MongoDB adds the _id field with an ObjectId if _id is not present
    //   { item: "journal", qty: 25, status: "A",
    //       size: { h: 14, w: 21, uom: "cm" }, tags: [ "blank", "red" ] },
    //   { item: "notebook", qty: 50, status: "A",
    //       size: { h: 8.5, w: 11, uom: "in" }, tags: [ "red", "blank" ] },
    //   { item: "paper", qty: 100, status: "D",
    //       size: { h: 8.5, w: 11, uom: "in" }, tags: [ "red", "blank", "plain" ] },
    //   { item: "planner", qty: 75, status: "D",
    //       size: { h: 22.85, w: 30, uom: "cm" }, tags: [ "blank", "red" ] },
    //   { item: "postcard", qty: 45, status: "A",
    //       size: { h: 10, w: 15.25, uom: "cm" }, tags: [ "blue" ] }
    // ])
