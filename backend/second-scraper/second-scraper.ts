const scraper = require('table-scraper');
const { fromPairs, flatten } = require('lodash');
const moment = require('moment-timezone');

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
      res
        .map((each: any) => {
          if (each[0][0] === 'Route') {
            const [headers, ...data] = each;
            const table = data
              .map((element: any) => {
                if (Object.keys(element).length > 3 && element[0]) {
                  // console.log(element)
                  return {
                    [element[0]]: fromPairs(
                      element[1]
                        .split(' full')
                        .filter(Boolean)
                        .map((x: string) => {
                          const [time, percentage] = x.split('m');
                          const timestamp = new moment(
                            time,
                            'hh:mma',
                            'America/Vancouver'
                          );
                          return [timestamp, percentage];
                        })
                    )
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

export { getConditionsPromise };
