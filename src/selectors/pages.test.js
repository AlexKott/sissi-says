import _cloneDeep from 'lodash.clonedeep';
import testState from './_testState';

import * as selectors from './pages';

describe('selectors/pages', () => {
  let mockState;

  beforeEach(() => {
    mockState = _cloneDeep(testState);
  });

  describe('getAllPages', () => {
    it('should return an array of page objects', () => {
      const result = selectors.getAllPages(mockState);

      expect(result.length).toBe(2);
      expect(result[0]._id).toBe('abc123');
      expect(result[1]).toHaveProperty('path', 'photos');
    });
  });
});
