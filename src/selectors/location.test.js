import cloneDeep from 'lodash.clonedeep';
import testState from './_testState';

import * as selectors from './location';

describe('selectors/location', () => {
  let mockState;

  beforeEach(() => {
    mockState = cloneDeep(testState);
  });

  describe('getCurrentItemInfo', () => {
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

      it('should return type and id for the current item', () => {
        const result = selectors.getCurrentItemInfo(mockState);

        expect(result).toHaveProperty('item');
        expect(result.item).toHaveProperty('id', null);
        expect(result.item).toHaveProperty('type', 'global');
      });

      it('should return null as parent item', () => {
        const result = selectors.getCurrentItemInfo(mockState);

        expect(result).toHaveProperty('parent', null);
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

      it('should return type and id for the current item', () => {
        const result = selectors.getCurrentItemInfo(mockState);

        expect(result).toHaveProperty('item');
        expect(result.item).toHaveProperty('id', 'abc123');
        expect(result.item).toHaveProperty('type', 'pages');
      });

      it('should return type and id for the parent item', () => {
        const result = selectors.getCurrentItemInfo(mockState);

        expect(result).toHaveProperty('parent');
        expect(result.parent).toHaveProperty('id', null);
        expect(result.parent).toHaveProperty('type', 'global');
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

      it('should return type and id for the current item', () => {
        const result = selectors.getCurrentItemInfo(mockState);

        expect(result).toHaveProperty('item');
        expect(result.item).toHaveProperty('id', '345def');
        expect(result.item).toHaveProperty('type', 'sections');
      });

      it('should return type and id for the parent item', () => {
        const result = selectors.getCurrentItemInfo(mockState);

        expect(result).toHaveProperty('parent');
        expect(result.parent).toHaveProperty('id', 'abc123');
        expect(result.parent).toHaveProperty('type', 'pages');
      });
    });
  });

  describe('getCurrentViewLevel', () => {
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

      it('should return 1', () => {
        const result = selectors.getCurrentViewLevel(mockState);

        expect(result).toBe(1);
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

      it('should return 2', () => {
        const result = selectors.getCurrentViewLevel(mockState);

        expect(result).toBe(2);
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

      it('should return 3 for projects with pages', () => {
        const result = selectors.getCurrentViewLevel(mockState);

        expect(result).toBe(3);
      });

      it('should return 2 for single page projects', () => {
        mockState.structure.global.maxItems = 1;
        mockState.structure.global.minItems = 1;

        const result = selectors.getCurrentViewLevel(mockState);

        expect(result).toBe(2);
      });
    });
  });
});
