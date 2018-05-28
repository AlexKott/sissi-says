import * as t from '@/actions/types';
import * as selectors from '@/reducers/selectors';
import getRandomString from '@/helpers/getRandomString';

export default ({ dispatch, getState }, getters = selectors) => next => action => {
  const { type, payload } = action;

  if (type === t.ADD_SECTION) {
    const sectionType = payload.sectionType || 'standard';
    const fields = getters.getSectionFields(getState(), sectionType);

    const sectionId = getRandomString();
    const newSection = {};
    newSection.sectionType = sectionType;

    fields.forEach(fieldObj => {
      const [fieldName, field] = Object.entries(fieldObj)[0];

      if (field.type === 'list') {
        const { fields: itemFieldNames, minItems } = field;
        newSection[fieldName] = [];

        for (let i = 0; i < minItems; i++) {
          const newItem = {};
          itemFieldNames.forEach(fieldName => newItem[fieldName] = '');
          newSection[fieldName].push(newItem);
        }

      } else {
        newSection[fieldName] = '';
      }
    })

    payload.sectionId = sectionId;
    payload.section = newSection;
    next(action);

  } else if (type === t.ADD_LIST_ITEM) {
      const fields = getters.getListFieldNames(getState(), payload.listName);
      const newItem = {};
      fields.forEach(fieldName => newItem[fieldName] = '');
      payload.listItem = newItem;
      next(action);

  } else {
    next(action);
  }

}
