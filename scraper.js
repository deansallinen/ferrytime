const scraper = require("table-scraper");
// var MongoClient = require('mongodb').MongoClient;
// const fs = require('fs');
// var util = require("util");
// var url = "mongodb://localhost:27017/mydb";
var exports = module.exports = {};

exports.scrape = function() {

var allRoutes = [];

console.log("working...");

// new Promise(function(resolve, reject) { // Promise to finish scraping before adding to db
//     scraper.get("http://orca.bcferries.com:8080/cc/marqui/actualDepartures.asp")
//         .then(function(tableData) {
//             console.log(tableData);
//             const arrayLength = tableData.length;
//             for (var i = 2; i < arrayLength; i++) { // Loop through array, skip first two
//                 var route = {};
//                 if (i % 2 != 0) { // Selects odd numbered tables 
//                     route.routeName = tableData[i - 1][0][0].split("Sailing time: ")[0]; // Selects route names from previous table
//                     route.sailingTime = tableData[i - 1][0][0].split("Sailing time: ")[1]; // Selects sailing time from previous table
//                     var schedule = [];
//                     for (var j = 1; j < tableData[i].length; j++) { // For each sailing in the schedule
//                         var sailing = {
//                             vessel: tableData[i][j][0],
//                             scheduledDeparture: tableData[i][j][1],
//                             actualDeparture: tableData[i][j][2],
//                             arrivalTime: tableData[i][j][3],
//                             status: tableData[i][j][4]
//                         };
//                         schedule.push(sailing); // Add each sailing to the schedule
//                     }
//                     route.schedule = schedule; // Add the completed schedule to the route object
//                     allRoutes.push(route);
//                     console.log(allRoutes.length + " total routes.");
//                 }
//             }
//             console.log(allRoutes.length + " routes ready to add.");
//             resolve(allRoutes);
//             });
//     }).then(routeArray => console.log(routeArray));
    
    // ------
    // .then(function(routeArray) { // After srape completed, output to JSON
    //     fs.writeFile('data.json', JSON.stringify(routeArray, null, 4), function(err) {
    //         // fs.writeFile('data.json', routeArray, function(err) {
    //         if (err) throw err;
    //         console.log('Saved!');
    //     });

        // MongoClient.connect(url, function(err, db) {
        //     if (err) throw err;
        //     db.collection("routes").insertMany(num, function(err, res) {
        //         if (err) throw err;
        //         console.log("Number of routes added to db: " + res.insertedCount);
        //         db.close();
        //     });
        // });
    // });
};