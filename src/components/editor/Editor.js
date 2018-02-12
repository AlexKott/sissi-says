import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

import Form from '@/components/form/Form';

const mapStateToProps = (state, ownProps) => {
  let canDelete = true;
  let fields = [];
  let title = 'Editor';
  let id = '';
  let initialValues = {};

  if (ownProps.type === 'page') {
    id = ownProps.pageId;
    const page = selectors.getPageById(state, id);
    const isProtected = selectors.getIsProtectedPage(state, page.pageType);
    fields = selectors.getPageFields(state, page.pageType);
    title = 'Page Editor';
    initialValues = selectors.getInitialPageValues(state, id);
    canDelete = selectors.getCanDeletePage(state) && !isProtected;

  } else if (ownProps.type === 'section') {
    id = ownProps.sectionId;
    const section = selectors.getSectionById(state, id);
    const isProtected = selectors.getIsProtectedSection(state, section.sectionType);
    fields = selectors.getSectionFields(state, section.sectionType);
    title = 'Section Editor';
    initialValues = selectors.getInitialSectionValues(state, id);
    canDelete = selectors.getCanDeleteSection(state, ownProps.pageId) && !isProtected;
  }

  return {
    canDelete,
    fields,
    title,
    initialValues,
    formName: `editor-${ownProps.type}-${id}`,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let onDelete;

  if (ownProps.type === 'page') {
    onDelete = () => {
      dispatch(actions.deletePage(ownProps.pageId));
      dispatch(actions.redirectToIndex());
    };
  } else if (ownProps.type === 'section') {
    onDelete = () => {
      dispatch(actions.deleteSection(ownProps.pageId, ownProps.sectionId));
      dispatch(actions.redirectToPage(ownProps.pageId));
    };
  }

  return {
    onDelete,
  };
}

const Editor = ({
  canDelete,
  fields = [],
  title = '',
  type = '',
  initialValues,
  formName = '',
  onDelete,
}) => (
  <section className={`editor editor--${type}`}>
    <h1 className='editor__title'>{title}</h1>
    <Form key={formName} form={formName} initialValues={initialValues} fields={fields} />
      {canDelete && <button type='button' onClick={onDelete} className='button'>Delete</button>}
    </Form>
  </section>
);

Editor.propTypes = {
  canDelete: PropTypes.bool,
  fields: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.string,
  initialValues: PropTypes.object,
  formName: PropTypes.string,
  onDelete: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
