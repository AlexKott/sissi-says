import mockState from './_testState';
import * as selectors from './editor';

describe('selectors/editor', () => {
  describe('getPropsForEditor', () => {
    describe('pages', () => {
      describe('canDelete', () => {
        it('should be false for protected pages', () => {
          const result = selectors.getPropsForEditor('pages', 'def345')(mockState);

          expect(result).toHaveProperty('canDelete', false);
        });
      });
    });
  });

  describe('getPropsForView', () => {
    describe('pages', () => {
      it('should return the content for the page', () => {
        const result = selectors.getPropsForView('pages', 'def345')(mockState);

        expect(result).toHaveProperty('content');
        expect(result.content).toHaveProperty('title', 'My Album');
      });

      it('should return the structure for the page', () => {
        const result = selectors.getPropsForView('pages', 'def345')(mockState);

        expect(result).toHaveProperty('structure');
        expect(result.structure).toHaveProperty('isProtected', true);
      });
    });
  });

  describe('getSiblingIds', () => {
    describe('global', () => {
      it('should return an empty array', () => {
        const result = selectors.getSiblingIds('global')(mockState);

        expect(result).toEqual([]);
      });
    });

    describe('pages', () => {
      it('should return all page ids', () => {
        const result = selectors.getSiblingIds('pages')(mockState);

        expect(result).toEqual(['abc123', 'def345']);
      });
    });

    describe('sections', () => {
      it('should return all section ids for the given page', () => {
        const result = selectors.getSiblingIds('sections', 'abc123')(mockState);

        expect(result).toEqual(['345def']);
      });
    });
  });
});
