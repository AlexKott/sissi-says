import * as t from '@/actions/types';
import * as selectors from '@/selectors';
import * as actions from '@/actions/creators';
import getRandomString from '@/helpers/getRandomString';

export default ({ dispatch, getState }, getters = selectors) => next => action => {
  const { type, payload } = action;

  if (type === t.ADD_PAGE) {
    const _type = payload.pageType || 'standard';
    const _id = getRandomString();
    const minSectionsPerPage = getters.getMinSectionsPerPage(getState());

    const newPage = {
      _id,
      _items: [],
      _type,
    };

    const fields = getters.getPageFields(getState(), _type);
    fields.forEach(fieldObj => {
      const [fieldName, field] = Object.entries(fieldObj)[0];

      if (field.type === 'list') {
        const { fields: itemFieldNames, minItems } = field;
        newPage[fieldName] = [];

        for (let i = 0; i < minItems; i++) {
          const newItem = {};
          itemFieldNames.forEach(fieldName => newItem[fieldName] = '');
          newPage[fieldName].push(newItem);
        }

      } else {
        newPage[fieldName] = '';
      }
    })

    payload.page = newPage;
    next(action);

    let currentAmountOfSections = getters.getNumberOfSectionsForPage(getState(), _id);

    while (currentAmountOfSections < minSectionsPerPage) {
      dispatch(actions.addSection(_id));
      currentAmountOfSections += 1;
    }

  } else {
    next(action);
  }
}
