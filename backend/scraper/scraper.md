npm install table-scraper node-fetch date-fns
npm install mongoose

Setup mLab account. New Database.

const URI = `mongodb://${USER}:${PASS}@ds064198.mlab.com:64198/ferrytracker`;

mLab free tier (500 megabytes) / average size of day's sailings (35 kilobytes) = 14,285.7143 days worth of data.


09/23 - Scraper should be good to start running on an interval!

ToDo:
-   Deploy Scraper
-   Deploy Server

