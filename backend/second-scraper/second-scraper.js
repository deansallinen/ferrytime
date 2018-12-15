const scraper = require('table-scraper');
const { fromPairs, flatten } = require('lodash');
const moment = require('moment-timezone');
const { request } = require('graphql-request');
const { upsertSailing } = require('../queries/upsertSailing')
const endpoint = process.env.ENDPOINT

const scrapeConditions = async () => {
    try {
        const res = await scraper.get(
            'https://orca.bcferries.com/cc/marqui/at-a-glance.asp'
        );
        return res;
    } catch (err) {
        throw err;
    }
};

const getConditionsPromise = () =>
    scrapeConditions().then(res => {
        return flatten(
            res.map((each) => {
                if (each[0][0] === 'Route') {
                    const [headers, ...data] = each;
                    // console.log(data)
                    const table = data.map((element) => {
                        if (Object.keys(element).length > 3 && element[0]) {
                            return {
                                // [element[0]]: fromPairs(
                                //     element[1]
                                //         .split(' full')
                                //         .filter(Boolean)
                                //         .map((x) => {
                                //             // console.log(x)
                                //             const regex = /(\d{1,2}:\d\d[ap]m)(\d+)%/g
                                //             const [_, time, percentage] = regex.exec(x)
                                //             const timestamp = new moment(
                                //                 time,
                                //                 'hh:mmaa',
                                //                 'America/Vancouver'
                                //             );
                                //             // console.log(time, timestamp)
                                //             return [timestamp, percentage];
                                //         })
                                // )
                                [element[0]]:
                                    element[1]
                                        .split(' full')
                                        .filter(Boolean)
                                        .map((x) => {
                                            // console.log(x)
                                            const regex = /(\d{1,2}:\d\d[ap]m)(\d+)%/g
                                            const [_, time, percentage] = regex.exec(x)
                                            const timestamp = new moment(
                                                time,
                                                'hh:mmaa',
                                                'America/Vancouver'
                                            );
                                            // console.log(time, timestamp)
                                            return [timestamp, percentage];
                                        })

                            };
                        }
                    })
                        .filter(Boolean);
                    return table;
                }
            })
                .filter(Boolean)
        );
    });

const getRouteId = async (routeName) => {
    const query = `
    query routeId($routeName: String) {
        route(routeName: $routeName) {
          id
          routeName
        }
      }
    `
    const routeId = await request(endpoint, query, { routeName });
    return routeId
}

getConditionsPromise()
    .then(res => res.forEach(route => {
        // console.log(route)
        const [routeName] = Object.keys(route)
        console.log(routeName)
        const routeId = getRouteId(routeName)
        console.log(routeId)
        // TODO: Get Route ID working,
        // Also, there's an error with the regex apparently
        route[routeName].forEach(async sailing => {
            const [time, percentage] = sailing;
            console.log(time.format(), percentage)
            const sailingResult = await request(endpoint, upsertSailing, {
                ...sailing,
                routeId,
                lastUpdated: new Date()
            });
            console.log(sailingResult);
        })
    }
    ))

module.exports = { getConditionsPromise };