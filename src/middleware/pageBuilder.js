import * as actions from '@/actions';
import * as t from '@/actions/types';
import * as k from '@/constants/keywords';
import * as selectors from '@/selectors';
import getRandomString from '@/helpers/getRandomString';

export default ({ dispatch, getState }) => next => action => {
  const { type, payload } = action;

  if (type === t.ADD_PAGE) {
    const _type = payload.pageType || k.STANDARD;
    const _id = getRandomString();
    const minSectionsPerPage = selectors.getMinAmountOfSectionsForPageType(_type)(getState());

    const newPage = {
      _id,
      _items: [],
      _type,
    };

    const fields = selectors.getFieldsForPageType(_type)(getState());
    fields.forEach(field => {

      if (field.type === k.LIST) {
        const { fields: itemFieldNames, minItems } = field;
        newPage[field._name] = [];

        for (let i = 0; i < minItems; i++) {
          const newItem = {};
          itemFieldNames.forEach(fieldName => newItem[field._name] = '');
          newPage[field._name].push(newItem);
        }

      } else {
        newPage[field._name] = '';
      }
    })

    payload.page = newPage;
    next(action);

    let currentAmountOfSections = selectors.getSectionIdsForPage(_id)(getState()).length;

    while (currentAmountOfSections < minSectionsPerPage) {
      dispatch(actions.addSection(_id));
      currentAmountOfSections += 1;
    }

  } else {
    next(action);
  }
}
