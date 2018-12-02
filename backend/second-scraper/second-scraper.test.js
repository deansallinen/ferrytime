// second scraper test
const scraper = require('./second-scraper');
const res = scraper.getConditionsPromise();

describe('Scraper result', async () => {
  test('should have 12 routes', async () => {
    expect(await res).toHaveLength(12);
  });
});
