import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/selectors';
import * as actions from '@/actions/creators';
import * as tr from '@/translations';

import Editor from '@/components/editor/Editor';

const mapStateToProps = (state, ownProps) => {
  const pageId = selectors.getSelectedPageId(state);
  const sectionId = selectors.getSelectedSectionId(state);
  const section = selectors.getSectionById(state, sectionId);
  const isProtected = selectors.getIsProtectedSection(state, section.sectionType);

  return {
    canDelete: selectors.getCanDeleteSection(state, pageId) && !isProtected,
    fields: selectors.getSectionFields(state, section.sectionType),
    title: tr.EDITOR_TITLE,
    type: 'section',
    initialValues: selectors.getInitialSectionValues(state, sectionId),
    formName: `editor-section-${sectionId}`,
    pageId,
    sectionId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDelete: (pageId, sectionId) => {
    dispatch(actions.deleteSection(pageId, sectionId));
    dispatch(actions.redirectToPage(pageId));
  },
});

const SectionEditor = ({ pageId, sectionId, onDelete, ...props }) => (
  <Editor {...props} onDelete={() => onDelete(pageId, sectionId)} />
);

SectionEditor.propTypes = {
  canDelete: PropTypes.bool,
  fields: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.string,
  initialValues: PropTypes.object,
  formName: PropTypes.string,
  pageId: PropTypes.string,
  sectionId: PropTypes.string,
  onDelete: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionEditor);
