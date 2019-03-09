const rp = require('request-promise');
const cheerio = require('cheerio');
const { format } = require('date-fns');

const inputs = { scheduled_departure: '1800', route_name: 'name of route' };

const dict = {
  'name of route': { routeNum: '01', dept: 'TSA' },
};

function main({ scheduled_departure, route_name }) {
  const ID = scheduled_departure;
  const { routeNum, dept } = dict[route_name];
  //   console.log(routeNum, dept, ID);
  const options = {
    uri: `https://orca.bcferries.com/cc/marqui/sailingDetail.asp?route=${routeNum}&dept=${dept}&ID=${ID}&src=ltr`,
    transform: function(body) {
      return cheerio.load(body);
    },
  };

  rp(options).then($ => {
    const percent = $(
      'table tbody tr td table tbody tr td form table tbody tr td div table tbody tr td table'
    ).attr('width');
    const [sailingTime] = $('.white-header-bold-lg')
      .text()
      .match(/\d+:\d+\s[AP]M/);
    const [parking] = $('.ccInfoTitle')
      .parent()
      .text()
      .match(/\d+%/);
    const [carWaits, oversizeWaits] = $('#quicklink-box tr td div')
      .text()
      .match(/(\d+)/);
    console.log(percent, sailingTime, parking, carWaits, oversizeWaits);
  });
}

main(inputs);
