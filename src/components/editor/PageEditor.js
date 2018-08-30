import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/selectors';
import * as actions from '@/actions/creators';
import * as tr from '@/translations'

import Editor from '@/components/editor/Editor';

const mapStateToProps = (state) => {
  const pageId = selectors.getSelectedPageId(state);
  const page = selectors.getPageById(state, pageId);
  const isProtected = selectors.getIsProtectedPage(state, page.pageType);

  return {
    canDelete: selectors.getCanDeletePage(state) && !isProtected,
    fields: selectors.getPageFields(state, page.pageType),
    title: tr.PAGE_EDITOR_TITLE,
    type: 'page',
    initialValues: selectors.getInitialPageValues(state, pageId),
    formName: `editor-page-${pageId}`,
    pageId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDelete: (pageId) => {
    dispatch(actions.deletePage(pageId));
    dispatch(actions.redirectToIndex());
  },
});

const PageEditor = ({ pageId, onDelete, ...props }) => (
  <Editor {...props} onDelete={() => onDelete(pageId)} />
);

PageEditor.propTypes = {
  canDelete: PropTypes.bool,
  fields: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.string,
  initialValues: PropTypes.object,
  formName: PropTypes.string,
  pageId: PropTypes.string,
  onDelete: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageEditor);
