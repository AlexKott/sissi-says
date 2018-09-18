import _cloneDeep from 'lodash.clonedeep';
import testState from '@/reducers/_testState';

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

  describe('getActivePageId', () => {
    describe('single page', () => {
      it('should return the id of the single page', () => {
        mockState.structure.global.maxItems = 1;
        mockState.content.global._items = ['singlePage'];
        mockState.content.pages = {
          singlePage: {
            _id: 'singlePage',
            _items: ['345def', '123abc'],
            _type: 'standard',
          },
        };
        const result = selectors.getActivePageId(mockState);

        expect(result).toBe('singlePage');
      });
    });

    describe('multiple pages', () => {
      it('should return the id of the selected page', () => {
        const result = selectors.getActivePageId(mockState);

        expect(result).toBe('abc123');
      });

      it('should return null if no page is selected', () => {
        mockState.location = {};
        const result = selectors.getActivePageId(mockState);

        expect(result).toBe(null);
      });
    });
  });
});
