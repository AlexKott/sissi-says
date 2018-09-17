import _cloneDeep from 'lodash.clonedeep';
import testState from './_testState';

import * as selectors from './navigation';

describe('selectors/navbar', () => {
  let mockState;

  beforeEach(() => {
    mockState = _cloneDeep(testState);
  });

  describe('single page', () => {
    beforeEach(() => {
      mockState.structure.global.maxItems = 1;
      mockState.content.global._items = ['singlePage'];
      mockState.content.pages = {
        singlePage: {
          _id: 'singlePage',
          _items: ['345def', '123abc'],
          _type: 'standard',
        },
      };
    });

    describe('getActivePageId', () => {
      it('should return the id of the single page', () => {
        const result = selectors.getActivePageId(mockState);

        expect(result).toBe('singlePage');
      });
    });

    describe('getPropsForPageNav', () => {
      it('should return null', () => {
        const result = selectors.getActivePageId(mockState);

        expect(result).toBe('singlePage');
      });
    });

    describe('getPropsForSectionNav', () => {
      describe('itemIds', () => {
        it('should be an array of all section ids', () => {
          const result = selectors.getPropsForSectionNav('singlePage')(mockState);

          expect(result).toHaveProperty('itemIds');
          expect(result.itemIds).toContain('345def');
          expect(result.itemIds).toContain('123abc');
        });
      });

      describe('canAdd', () => {
        it('should be true if more sections can be added', () => {
          const result = selectors.getPropsForSectionNav('singlePage')(mockState);

          expect(result).toHaveProperty('canAdd', true);
        });

        it('should be false if no more sections can be added', () => {
          mockState.structure.pages.standard.maxItems = 2;
          const result = selectors.getPropsForSectionNav('singlePage')(mockState);

          expect(result).toHaveProperty('canAdd', false);
        });
      });
    });
  });

  describe('multiple pages', () => {
    describe('getActivePageId', () => {
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

    describe('getPropsForPageNav', () => {
      describe('itemIds', () => {
        it('should be an array of all page ids', () => {
          const result = selectors.getPropsForPageNav(mockState);

          expect(result).toHaveProperty('itemIds');
          expect(result.itemIds).toContain('abc123');
          expect(result.itemIds).toContain('def345');
        });
      });

      describe('canAdd', () => {
        it('should be true if more pages can be added', () => {
          const result = selectors.getPropsForPageNav(mockState);

          expect(result).toHaveProperty('canAdd', true);
        });

        it('should be false if no more pages can be added', () => {
          mockState.structure.global.maxItems = 2;
          const result = selectors.getPropsForPageNav(mockState);

          expect(result).toHaveProperty('canAdd', false);
        });
      });
    });

    describe('getPropsForSectionNav', () => {
      describe('itemIds', () => {
        it('should be an array of all section ids', () => {
          const result = selectors.getPropsForSectionNav('abc123')(mockState);

          expect(result).toHaveProperty('itemIds');
          expect(result.itemIds).toContain('345def');
          expect(result.itemIds).toContain('123abc');
        });
      });

      describe('canAdd', () => {
        it('should be true if more sections can be added', () => {
          const result = selectors.getPropsForSectionNav('abc123')(mockState);

          expect(result).toHaveProperty('canAdd', true);
        });

        it('should be false if no more sections can be added', () => {
          mockState.structure.pages.standard.maxItems = 2;
          const result = selectors.getPropsForSectionNav('abc123')(mockState);

          expect(result).toHaveProperty('canAdd', false);
        });
      });

      it('should return null if the page with the given id can not have sections', () => {
        mockState.structure.pages.standard.maxItems = 0;
        const result = selectors.getPropsForSectionNav('abc123')(mockState);

        expect(result).toBe(null);
      });
    });
  });
});
