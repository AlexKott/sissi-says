import _cloneDeep from 'lodash.clonedeep';
import testState from '@/reducers/_testState';

import * as selectors from './sections';

describe('selectors/pages', () => {
  let mockState;

  beforeEach(() => {
    mockState = _cloneDeep(testState);
  });

  describe('getSectionsForPage', () => {
    it('should return an array of section objects', () => {
      const result = selectors.getSectionsForPage('abc123')(mockState);

      expect(result.length).toBe(2);
      expect(result[0]).toHaveProperty('_id', '345def');
    });
  });
});
