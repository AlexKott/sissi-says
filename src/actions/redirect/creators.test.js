import * as routes from '@/router/routes';
import * as actions from './creators';

describe('actions/redirect', () => {
  describe('redirectToIndex', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.redirectToIndex();

      expect(action).toHaveProperty('type', routes.ROUTE_INDEX);
    });
  });

  describe('redirectToPage', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.redirectToPage('testPage');

      expect(action).toHaveProperty('type', routes.ROUTE_PAGE);
      expect(action).toHaveProperty('payload');
      expect(action.payload).toHaveProperty('pageId', 'testPage');
    });
  });
});
