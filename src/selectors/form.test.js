import testState from '@/reducers/_testState';

import * as selectors from './form';

describe('selectors/form', () => {
  describe('getFieldWithName', () => {
    it('should return the field with an added "name" parameter', () => {
      const result = selectors.getFieldWithName('title')(testState);

      expect(result).toHaveProperty('name', 'title');
      expect(result).toHaveProperty('placeholder', 'Your title');
    });
  });
});
