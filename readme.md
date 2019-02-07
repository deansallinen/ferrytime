![Ferrytime app on a phone](https://github.com/deansallinen/deansallinen.ca/blob/master/src/img/ferrytime/three.png)

# Ferrytime

[Ferrytime](https://ferryti.me) is a simple webapp to track the schedule of the BC Ferries. 

I've spent years of my life travelling on the coastal ferries to visit family, meet up with friends, and commute for work and school. 

I've always found the official site difficult to navigate: either showing me too much information or just not enough. 

I made Ferrytime clean, simple, and fast to make my travels easier. Hopefully it helps you too!

What began as a styled HTML table ended up becoming a continuously changing learning environment for front-end development.

## Features
- Consolidates all relevant route information on a single page
- Users can add favourite routes 
- Progressive Web App allows for offline viewing

## History
- Started in Ruby with Sinatra on the backend and Twitter Bootstrap as a front-end framework (2013)
- Re-wrote everything in Node, Express, and Handlebars (2017)
- Began with writing JSON to disk for a lightweight DB solution but found persistence issues (2018)
- Moved to SQLite3 and Sequelize
- Added React as a front-end framework with Styled-Components for CSS
- Moved to Postgres for Database with RESTful backend using Knex as ORM
- Fell back to using pg-promise and writing SQL by hand for simplicity
- Rewrote entire backend for hosted Mongodb (mLab) and Graphql
- Added Bulma for quicker UI development

## TODO
- Find the memory leak!
- Sailing Waits live data
- CSS transitions on Completed Sailings
- Move to TailwindCSS for more flexible styling
