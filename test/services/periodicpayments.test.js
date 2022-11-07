const app = require('../../src/app');

describe('\'periodicpayments\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/periodicpayments');
    expect(service).toBeTruthy();
  });
});
