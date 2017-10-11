var CronJob = require("cron").CronJob;

var test = require("./scraper.js");

new CronJob('1 * * * * *', function() {
    test.scrape();
    console.log('Message every minute');
}, null, true, 'America/Vancouver');