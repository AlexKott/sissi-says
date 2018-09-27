import * as t from '@/actions/types';
import * as k from '@/constants/keywords';
import getRandomString from '@/helpers/getRandomString';
import * as selectors from '@/selectors';

export default ({ dispatch, getState }) => next => action => {
  const { type, payload } = action;

  if (type === t.ADD_SECTION) {
    const sectionType = payload.sectionType || k.STANDARD;
    const fields = selectors.getFieldsForSectionType(sectionType)(getState());

    const newSection = {};
    newSection._type = sectionType;
    newSection._id = getRandomString();

    fields.forEach(field => {
      if (field.type === k.LIST) {
        const { fields: itemFieldNames, minItems } = field;
        newSection[field._name] = [];

        for (let i = 0; i < minItems; i++) {
          const newItem = {};
          itemFieldNames.forEach(fieldName => newItem[fieldName] = '');
          newSection[field._name].push(newItem);
        }

      } else {
        newSection[field._name] = '';
      }
    });

    payload.section = newSection;
  }

  next(action);
}
