const rp = require('request-promise');
const cheerio = require('cheerio');
const  moment  = require('moment-timezone');

const getPercentFull = ({ scheduled_departure, departure_term, route_num_str }) => {
  
  const inputTime = moment(scheduled_departure).format('HHmm')

  const options = {
    uri: `https://orca.bcferries.com/cc/marqui/sailingDetail.asp?route=${route_num_str}&dept=${departure_term}&ID=${inputTime}&src=ltr`,
    transform: (body) => cheerio.load(body)
  };

  return rp(options).then($ => {
    const sailingTime = $('.white-header-bold-lg')
      .text()
      .match(/\d+:\d+\s[AP]M/);
      
    if (!sailingTime) return null
    
    const outputTime = moment(sailingTime[0], 'hh:mm aa').format('HHmm')
    
    if (inputTime !== outputTime) return null
      
    const [percent] = $(
      'table tbody tr td table tbody tr td form table tbody tr td div table tbody tr td table'
    ).attr('width').match(/\d{1,2}/);
    
    const [parking] = $('.ccInfoTitle')
      .parent()
      .text()
      .match(/\d+%/);
      
    const [carWaits, oversizeWaits] = $('#quicklink-box tr td div')
      .text()
      .match(/(\d+)/);
      
    return {percent, parking, carWaits, oversizeWaits};
  });
}

// getPercentFull(inputs).then(res => console.log( res))

module.exports = {getPercentFull}