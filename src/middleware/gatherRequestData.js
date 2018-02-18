import { getFormValues } from 'redux-form';

import * as t from '@/actions/types';
import * as selectors from '@/reducers/selectors';

export default ({ dispatch, getState }, getters = selectors, collector = getFormValues) => next => action => {
  const { type, payload } = action;

  // currently not testing for dataType === 'content' because only content can be posted
  if (type === t.SEND_REQUEST && payload.method === 'post' && payload.dataType === 'content') {
    const { formName } = payload;
    const state = getState();
    const metaData = getters.getMetaData(state);
    const pageData = getters.getAllPages(state);
    const sectionData = getters.getAllSections(state);
    const formInput = collector(formName)(state);

    let meta = metaData;
    let pages = pageData;
    let sections = sectionData;

    if (formName === 'meta') {
      meta = Object.assign({}, metaData, formInput);
    } else {
      const formNameArray = formName.split('-');
      const formType = formNameArray[1];
      const formId = formNameArray[2];

      if (formType === 'page') {
        const newPageIndex = pageData.findIndex(page => page.id === formId);
        const newPage = Object.assign({}, pageData[newPageIndex], formInput);
        pageData.splice(newPageIndex, 1, newPage);
        pages = pageData;
      } else if (formType === 'section') {
        const newSection = Object.assign({}, sectionData[formId], formInput);
        sections = Object.assign({}, sectionData, { [formId]: newSection });
      }
    }

    action.payload.requestData = {
      meta,
      pages,
      sections,
    };
  }
  next(action);
}
