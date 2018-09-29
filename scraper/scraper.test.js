const scraper = require('./index');

test('should return properly formatted sailing', () => {
  const date = '10/12/13';
  const example = ['boat', '12:00', '12:01', '12:45', 'On Time'];
  const res = scraper.makeSailing(example, date);
  expect(res).toHaveProperty('vessel');
  expect(res).toHaveProperty('sailingStatus');
  expect(res).toHaveProperty('scheduledDeparture');
  expect(res).toHaveProperty('actualDeparture');
  expect(res).toHaveProperty('eta');
  //   console.log(res);
});

test('should validate and concat datetime strings for sailings', () => {
  const date = '10/12/13';
  const time = '11:23';
  const res = scraper.validateTime(date, time);
  expect(res).toEqual(new Date('10/12/13 11:23'));
});

test('should return null for sailings without time', () => {
  const date = '10/12/13';
  const time = '';
  const res = scraper.validateTime(date, time);
  expect(res).toEqual(null);
});
