const {getConditionsPromise, getRouteId} = require('./second-scraper');
const { isEqual } = require('date-fns');
const moment = require('moment-timezone');

beforeEach(() => {
  return process.env = {...process.env, ENDPOINT: `http://localhost:4000/graphql` }
})

describe('result', async () => {
  test('should be an array', async () => {
    const res = await getConditionsPromise();
    expect(res).toBeInstanceOf(Array);
    expect(res[0]).toBeInstanceOf(Object);
    expect(res[0]).toHaveProperty("routeName");
    expect(res[0]).toHaveProperty("percentFull");
    expect(res[0].percentFull).toBeInstanceOf(Array);
    expect(res[0].percentFull[0]).toHaveLength(2);
    expect(res[0]).toHaveProperty("carWaits");
    expect(res[0]).toHaveProperty("oversizeWaits");
  });
})

test('should return route ID for given routeName', async () => {
  const routeName = "Tsawwassen to Swartz Bay"
  const res = await getRouteId(routeName);
  expect(res).toBe('5ba85ce644647f510cdf5a3e')

})