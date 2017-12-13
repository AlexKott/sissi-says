import * as selectors from './index';

describe('selectors/router', () => {
  const mockState = { location: { payload: { pageId: 'testPageId', sectionId: 'testSectionId' }}};

  describe('getSelectedPageId', () => {
    it('should return the page id from the location state', () => {
      const value = selectors.getSelectedPageId(mockState);

      expect(value).toBe('testPageId');
    });
  });

  describe('getSelectedSectionId', () => {
    it('should return the section id from the location state', () => {
      const value = selectors.getSelectedSectionId(mockState);

      expect(value).toBe('testSectionId');
    });
  });
});
