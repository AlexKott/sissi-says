import getRandomString from './getRandomString';

describe('helpers/getRandomString', () => {
  it('should return a random string', () => {
    const value = getRandomString();

    expect(typeof value).toBe('string');
  });
});
