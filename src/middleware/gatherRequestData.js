import { getFormValues } from 'redux-form';

import { transformToHtml } from '@/helpers/markdownHtmlConverter';
import * as t from '@/actions/types';
import * as selectors from '@/selectors';

export default (
  { dispatch, getState },
  methods = { ...selectors, getFormValues, transformToHtml }
) => next => action => {
  const { type, payload } = action;
  const isPostRequest = type === t.SEND_REQUEST && payload.method === 'post';

  if (isPostRequest && payload.dataType === 'content') {
    const { formName } = payload;
    const state = getState();
    const globalData = methods.getGlobalData(state);
    const pageData = methods.getAllPages(state);
    const sectionData = methods.getAllSections(state);
    const formInput = methods.getFormValues(formName)(state);
    const fields = methods.getFields(state);

    let global = globalData;
    let pages = pageData;
    let sections = sectionData;

    if (formName === 'global') {
      global = Object.assign({}, globalData, formInput);
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

    const transformedData = methods.transformToHtml({ global, pages, sections }, fields);

    action.payload.requestData = transformedData;
  }
  next(action);
}
