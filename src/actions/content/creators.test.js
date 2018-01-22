import * as t from './types';
import * as actions from './creators';

describe('actions/content', () => {
  describe('setInitialContent', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.setInitialContent();

      expect(action).toHaveProperty('type', t.SET_INITIAL_CONTENT);
    });
  });

  describe('addPage', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.addPage('testType');

      expect(action).toHaveProperty('type', t.ADD_PAGE);
      expect(action.payload).toHaveProperty('pageType', 'testType');
    });
  });

  describe('addSection', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.addSection('testPage', 'testType');

      expect(action).toHaveProperty('type', t.ADD_SECTION);
      expect(action.payload).toHaveProperty('pageId', 'testPage');
      expect(action.payload).toHaveProperty('sectionType', 'testType');
    });
  });
});
