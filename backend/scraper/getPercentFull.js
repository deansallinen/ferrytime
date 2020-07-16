const rp = require('request-promise');
const cheerio = require('cheerio');
const moment = require('moment-timezone');

const getPercentFull = ({
  scheduled_departure,
  departure_term,
  route_num_str,
}) => {
  const inputTime = moment(scheduled_departure).format('HHmm');

  const options = {
    uri: `https://orca.bcferries.com/cc/marqui/sailingDetail.asp?route=${route_num_str}&dept=${departure_term}&ID=${inputTime}&src=ltr`,
    transform: body => cheerio.load(body),
  };

  return rp(options).then($ => {
    const sailingTime = $('.white-header-bold-lg')
      .text()
      .match(/\d+:\d+\s[AP]M/);

    if (!sailingTime) return null;

    const outputTime = moment
      .tz(sailingTime[0], 'hh:mm aa', 'America/Vancouver')
      .format('HHmm');

    if (inputTime !== outputTime) return null;

    const [percent_full] = $(
      'table tbody tr td table tbody tr td form table tbody tr td div table tbody tr td table'
    )
      .attr('width')
      .match(/\d+/);

    const [parking_full] = $('.ccInfoTitle')
      .parent()
      .text()
      .match(/\d{1,3}/);

    const [car_waits, oversize_waits] = $('#quicklink-box tr td div')
      .text()
      .match(/(\d+)/);

    return { percent_full, parking_full, car_waits, oversize_waits };
  });
};

// getPercentFull(inputs).then(res => console.log( res))

module.exports = { getPercentFull };
