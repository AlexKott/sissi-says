import _cloneDeep from 'lodash.clonedeep';
import { LOADING } from '@/constants/keywords';
import testState from '@/reducers/_testState';
import * as tr from '@/translations';

import * as selectors from './ui';

describe('selectors/ui', () => {
  let mockState;

  beforeEach(() => {
    mockState = _cloneDeep(testState);
  });

  describe('getPropsForAlert', () => {
    describe('alert for isLoading', () => {
      beforeEach(() => {
        mockState.ui.loading = 1;
      });

      it('should return the correct props for a loading alert', () => {
        const result = selectors.getPropsForAlert(mockState);

        expect(result).toHaveProperty('allowConfirm', false);
        expect(result).toHaveProperty('type', LOADING);
        expect(result).toHaveProperty('message', tr.LOADING_TEXT);
        expect(result).toHaveProperty('title', tr.LOADING);
      });
    });

    describe('alert for !isLoading', () => {
      it('should return the alert properties', () => {
        const result = selectors.getPropsForAlert(mockState);

        expect(result).toHaveProperty('allowConfirm', true);
        expect(result).toHaveProperty('type', 'success');
        expect(result).toHaveProperty('message', 'this is great');
        expect(result).toHaveProperty('title', 'it works');
      });

      describe('server errors', () => {
        beforeEach(() => {
          mockState.ui.alert.message = tr.ERROR_SERVER;
        });
        it('should not allow confirmation', () => {
          const result = selectors.getPropsForAlert(mockState);

          expect(result).toHaveProperty('allowConfirm', false);
        });
      });
    });
  });
});
