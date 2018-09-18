import * as selectors from './index';

describe('selectors/router', () => {
  const mockState = {
    location: {
      payload: {
        pageId: 'testPageId',
        sectionId: 'testSectionId',
      },
    },
  };
  const mockSelectors = {
    getIsSinglePage: jest.fn(() => false),
    getSinglePageId: jest.fn(() => 'testId'),
  };

  describe('getSelectedPageId', () => {
    it('should return the page id from the location state', () => {
      const value = selectors.getSelectedPageId(mockState, mockSelectors);

      expect(value).toBe('testPageId');
    });

    it('should return the single page id if it is a single page site', () => {
      mockSelectors.getIsSinglePage = jest.fn(() => true);
      const value = selectors.getSelectedPageId(mockState, mockSelectors);

      expect(value).toBe('testId');
    });
  });

  describe('getSelectedSectionId', () => {
    it('should return the section id from the location state', () => {
      const value = selectors.getSelectedSectionId(mockState);

      expect(value).toBe('testSectionId');
    });
  });
});
