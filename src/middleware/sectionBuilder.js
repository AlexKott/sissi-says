import * as t from '@/actions/types';
import * as k from '@/constants/keywords';
import getRandomString from '@/helpers/getRandomString';
import * as selectors from '@/selectors';

export default ({ dispatch, getState }) => next => action => {
  const { type, payload } = action;

  if (type === t.ADD_SECTION) {
    const sectionType = payload.sectionType || k.STANDARD;
    const fields = selectors.getFieldsForSectionType(sectionType)(getState());

    const sectionId = getRandomString();
    const newSection = {};
    newSection.sectionType = sectionType;

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
    })

    payload.sectionId = sectionId;
    payload.section = newSection;
    next(action);

  } else if (type === t.ADD_LIST_ITEM) {
      const fields = selectors.getListFieldNames(getState(), payload.listName);
      const newItem = {};
      fields.forEach(fieldName => newItem[fieldName] = '');
      payload.listItem = newItem;
      next(action);

  } else {
    next(action);
  }

}
