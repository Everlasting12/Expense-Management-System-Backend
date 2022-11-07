const app = require('../../src/app');

describe('\'notifications\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/notifications');
    expect(service).toBeTruthy();
  });
});
