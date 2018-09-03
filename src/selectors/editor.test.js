import cloneDeep from 'lodash.clonedeep';
import testState from './_testState';

import * as selectors from './editor';

describe('selectors/editor', () => {
  let mockState;

  beforeEach(() => {
    mockState = cloneDeep(testState);
  });

  describe('getPropsForEditor', () => {
    describe('global', () => {
      beforeEach(() => {
        mockState.location = {
          routesMap: {
            globalRoute: {
              itemType: 'global',
            },
          },
          type: 'globalRoute',
        };
      });

      it('should return false for canDelete', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('canDelete', false);
      });

      it('should return fieldNames', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('fieldNames', ['title', 'image']);
      });
    });

    describe('pages', () => {
      beforeEach(() => {
        mockState.location = {
          payload: {
            pageId: 'abc123',
          },
          routesMap: {
            pagesRoute: {
              itemType: 'pages',
            },
          },
          type: 'pagesRoute',
        };
      });

      describe('canDelete', () => {
        it('should be true when amount of pages is over minimum', () => {
          const result = selectors.getPropsForEditor(mockState);

          expect(result).toHaveProperty('canDelete', true);
        });

        it('should be false when amount of pages is at minimum', () => {
          mockState.structure.global.minItems = 2;

          const result = selectors.getPropsForEditor(mockState);

          expect(result).toHaveProperty('canDelete', false);
        });

        it('should be false for protected pages', () => {
          mockState.location.payload.pageId = 'def345';

          const result = selectors.getPropsForEditor(mockState);

          expect(result).toHaveProperty('canDelete', false);
        });
      });

      it('should return fieldNames', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('fieldNames', ['title', 'path']);
      });
    });

    describe('sections', () => {
      beforeEach(() => {
        mockState.location = {
          payload: {
            pageId: 'abc123',
            sectionId: '345def',
          },
          routesMap: {
            sectionsRoute: {
              itemType: 'sections',
            },
          },
          type: 'sectionsRoute',
        };
      });

      describe('canDelete', () => {
        it('should be true when amount of sections is over minimum', () => {
          const result = selectors.getPropsForEditor(mockState);

          expect(result).toHaveProperty('canDelete', true);
        });

        it('should be false when amount of sections is at minimum', () => {
          mockState.structure.pages.standard.minItems = 2;

          const result = selectors.getPropsForEditor(mockState);

          expect(result).toHaveProperty('canDelete', false);
        });

        it('should be false for protected sections', () => {
          mockState.location.payload.sectionId = '123abc';

          const result = selectors.getPropsForEditor(mockState);

          expect(result).toHaveProperty('canDelete', false);
        });
      });

      it('should return fieldNames', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('fieldNames', ['title']);
      });
    });
  });

  describe('getCurrentItem', () => {
    describe('global', () => {
      beforeEach(() => {
        mockState.location = {
          routesMap: {
            globalRoute: {
              itemType: 'global',
            },
          },
          type: 'globalRoute',
        };
      });

      it('should return the content', () => {
        const result = selectors.getCurrentItem(mockState);

        expect(result).toHaveProperty('content');
        expect(result.content).toHaveProperty('image', 'abcde.png');
      });

      it('should return the structure', () => {
        const result = selectors.getCurrentItem(mockState);

        expect(result).toHaveProperty('structure');
        expect(result.structure).toHaveProperty('minItems', 1);
      });

      it('should return null as parent', () => {
        const result = selectors.getCurrentItem(mockState);

        expect(result).toHaveProperty('parent', null);
      });
    });

    describe('pages', () => {
      beforeEach(() => {
        mockState.location = {
          payload: {
            pageId: 'def345',
          },
          routesMap: {
            pagesRoute: {
              itemType: 'pages',
            },
          },
          type: 'pagesRoute',
        };
      });

      it('should return the content', () => {
        const result = selectors.getCurrentItem(mockState);

        expect(result).toHaveProperty('content');
        expect(result.content).toHaveProperty('title', 'My Album');
      });

      it('should return the structure', () => {
        const result = selectors.getCurrentItem(mockState);

        expect(result).toHaveProperty('structure');
        expect(result.structure).toHaveProperty('isProtected', true);
      });

      it('should return the parent', () => {
        const result = selectors.getCurrentItem(mockState);

        expect(result).toHaveProperty('parent');
        expect(result.parent).toHaveProperty('itemIds', ['abc123', 'def345']);
        expect(result.parent).toHaveProperty('maxItems', 5);
        expect(result.parent).toHaveProperty('minItems', 1);
      });
    });

    describe('sections', () => {
      beforeEach(() => {
        mockState.location = {
          payload: {
            pageId: 'abc123',
            sectionId: '345def',
          },
          routesMap: {
            sectionsRoute: {
              itemType: 'sections',
            },
          },
          type: 'sectionsRoute',
        };
      });

      it('should return the content', () => {
        const result = selectors.getCurrentItem(mockState);

        expect(result).toHaveProperty('content');
        expect(result.content).toHaveProperty('title', 'This is awesome');
      });

      it('should return the structure', () => {
        const result = selectors.getCurrentItem(mockState);

        expect(result).toHaveProperty('structure');
        expect(result.structure).toHaveProperty('fields', ['title']);
      });

      it('should return the parent', () => {
        const result = selectors.getCurrentItem(mockState);

        expect(result).toHaveProperty('parent');
        expect(result.parent).toHaveProperty('itemIds', ['345def', '123abc']);
        expect(result.parent).toHaveProperty('maxItems', 6);
        expect(result.parent).toHaveProperty('minItems', 1);
      });
    });
  });
});
