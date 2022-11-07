const app = require('../../src/app');

describe('\'households\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/households');
    expect(service).toBeTruthy();
  });
});
