import * as t from '@/actions/types';
import * as selectors from '@/selectors';

export default store => next => action => {
  const { type, payload } = action;

  if (type === t.ADD_LIST_ITEM) {
    const fields = selectors.getListFieldNames(store.getState(), payload.listName);
    const newItem = {};
    fields.forEach(fieldName => newItem[fieldName] = '');
    payload.listItem = newItem;
  }

  next(action);
}
