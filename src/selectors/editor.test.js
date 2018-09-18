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

      it('should return the formName', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('formName', 'global');
      });

      it('should return initialValues', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('initialValues', mockState.content.global);
      });

      it('should return the current viewLevel', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('viewLevel');
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

      it('should return the formName', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('formName', 'pages-abc123');
      });

      it('should return initialValues', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('initialValues', mockState.content.pages.abc123);
      });

      it('should return the current viewLevel', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('viewLevel');
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

      it('should return the formName', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('formName', 'sections-345def');
      });

      it('should return initialValues', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('initialValues', mockState.content.sections['345def']);
      });

      it('should return the current viewLevel', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('viewLevel');
      });
    });
  });
});
