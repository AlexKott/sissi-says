import * as t from '@/actions/types';
import * as selectors from '@/reducers/selectors';
import getRandomString from '@/helpers/getRandomString';

export default ({ dispatch, getState }, getters = selectors) => next => action => {
  const { type, payload } = action;

  if (type === t.ADD_SECTION) {
    const sectionType = payload.sectionType || 'standard';
    const fields = getters.getSectionFieldNames(getState(), sectionType);

    const sectionId = getRandomString();
    const newSection = {};
    newSection.sectionType = sectionType;
    fields.forEach(field => newSection[field] = '');

    payload.sectionId = sectionId;
    payload.section = newSection;
    next(action);

  } else {
    next(action);
  }

}
