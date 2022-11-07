const app = require('../../src/app');

describe('\'expensetypes\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/expensetypes');
    expect(service).toBeTruthy();
  });
});
