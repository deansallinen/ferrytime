const { scrape } = require('.');

beforeEach(() => {
    return (process.env = {
      ...process.env,
      ENDPOINT: `https://ferry-time.herokuapp.com/v1alpha1/graphql`,
    });
  });
  
describe('Final Output', () => {
  test('should return an array of routes', async () => {
    const res = await scrape();
    expect(res).toBeInstanceOf(Array);
    expect(res).toHaveLength(12);
    const [route] = res;
    expect(route).toHaveProperty('route_name');
    expect(route).toHaveProperty('average_sailing');
    expect(route).toHaveProperty('sailing_date');
    expect(route).toHaveProperty('oversize_waits');
    expect(route).toHaveProperty('car_waits');
    expect(route).toHaveProperty('sailings');
    expect(route.sailings).toBeInstanceOf(Object);
    const sailing = Object.values(route.sailings)[0];
    expect(sailing).toHaveProperty('scheduled_departure');
    expect(sailing).toHaveProperty('actual_departure');
    expect(sailing).toHaveProperty('eta');
    expect(sailing).toHaveProperty('sailing_status');
    expect(sailing).toHaveProperty('vessel');
    expect(sailing).toHaveProperty('percent_full');
  });
});
