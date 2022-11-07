const app = require('../../src/app');

describe('\'householdexpenses\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/householdexpenses');
    expect(service).toBeTruthy();
  });
});
