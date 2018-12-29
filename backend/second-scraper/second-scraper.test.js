const {getConditionsPromise, getRouteId} = require('./second-scraper');
const { isEqual } = require('date-fns');
const moment = require('moment-timezone');

beforeEach(() => {
  return process.env = {...process.env, ENDPOINT: `http://localhost:4000/graphql` }
})

test('should return properly formatted sailing', async () => {
  const date = '2010-12-13';
  const example = ['boat', '12:00 AM', '12:01 AM', '12:45 AM', 'On Time'];
  const res = await getConditionsPromise();
  expect(res).toBeInstanceOf(Array);

  //   console.log(res);
});

test('should return route ID for given routeName', async () => {
  const routeName = "Tsawwassen to Swartz Bay"
  const res = await getRouteId(routeName);
  expect(res).toBe('5ba85ce644647f510cdf5a3e')

})