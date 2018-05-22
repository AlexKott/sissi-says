import * as t from '@/actions/types';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.dataType === 'structure') {
    return payload.data.fields;

  } else if (type === t.RESET_SESSION) {
    return initialState;
  }

  return state;
}

export function getFields(state) {
  return state.structure.fields;
}

export function getFieldByName(state, fieldName) {
  const field = state.structure.fields[fieldName] || {};
  return { [fieldName]: field };
}

export function getListFieldNames(state, listName) {
  return state.structure.fields[listName].fields;
}
