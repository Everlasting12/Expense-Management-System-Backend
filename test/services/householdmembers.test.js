const app = require('../../src/app');

describe('\'householdmembers\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/householdmembers');
    expect(service).toBeTruthy();
  });
});
