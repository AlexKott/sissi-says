import * as t from '@/actions/types';
import _testState from '@/reducers/_testState';

import reducer, * as selectors from './modal';

describe('reducers/ui/modal', () => {
  const mockState = _testState.ui.modal;

  it('should set the given modal type', () => {
    const action = {
      type: t.SET_MODAL_TYPE,
      payload: {
        type: 'guide',
      },
    };
    const state = reducer(mockState, action);

    expect(state).toBe('guide');
  });
});

describe('selectors/ui/modal', () => {
  const mockState = _testState;

  describe('getModalType', () => {
    it('should return the modal type', () => {
      const value = selectors.getModalType(mockState);

      expect(value).toBe('');
    });
  });
});
