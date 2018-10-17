import { requestPromise } from './helpers';

describe('Helpers', () => {
  describe('requestPromise', () => {
    test.only('Should return false if no URL were provided.', () => {
      expect(requestPromise()).toBeFalsy();
    });
  });
});