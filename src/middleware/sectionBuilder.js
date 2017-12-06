import * as t from '../actions/types';
import * as selectors from '../reducers/selectors';

export default ({ dispatch, getState }) => next => action => {
  const { type, payload } = action;

  if (type === t.ADD_SECTION) {
    const sectionType = payload.type || 'standard';
    const fields = selectors.getSectionFields(getState(), sectionType);

    const sectionId = `section_${Math.random()}`;
    const newSection = {};
    fields.forEach(field => newSection[field] = '');

    payload.sectionId = sectionId;
    payload.section = newSection;
    next(action);

  } else {
    next(action);
  }

}
