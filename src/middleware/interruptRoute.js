import {
  getFormNames,
  isDirty,
} from 'redux-form';

import * as k from '@/constants/keywords';
import * as routes from '@/router';

export default store => next => action => {
  if ([
    routes.ROUTE_INDEX,
    routes.ROUTE_PAGE,
    routes.ROUTE_SECTION,
  ].includes(action.type)) {

    const allFormNames = getFormNames()(store.getState()) || [];
    const formName = allFormNames[0];
    const isFormDirty = isDirty(formName)(store.getState());

    if (isFormDirty && formName !== k.LOGIN) {
      console.log('dirty changes');
      return;
    }
  }

  next(action);
}
