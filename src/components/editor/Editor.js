import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';

import Form from '@/components/form/Form';

const mapStateToProps = (state, ownProps) => {
  let canDelete = true;
  let fields = [];
  let title = 'Editor';
  let id = '';

  if (ownProps.type === 'page') {
    id = ownProps.pageId;
    const page = selectors.getPageById(state, id);
    fields = selectors.getPageFields(state, page.pageType);
    title = 'Page Editor';
    canDelete = selectors.getCanDeletePage(state);
  } else if (ownProps.type === 'section') {
    id = ownProps.sectionId;
    const section = selectors.getSectionById(state, id);
    fields = selectors.getSectionFields(state, section.sectionType);
    title = 'Section Editor';
    canDelete = selectors.getCanDeleteSection(state, ownProps.pageId);
  }

  return {
    canDelete,
    fields,
    title,
    formName: `editor-${ownProps.type}-${id}`,
  };
};

const Editor = ({
  canDelete,
  fields = [],
  title = '',
  type = '',
  formName = '',
}) => (
  <section className={`editor editor--${type}`}>
    <h1 className='editor__title'>{title}</h1>
    <Form key={formName} form={formName} fields={fields}>
      {canDelete && <button type='button' className='button'>Delete</button>}
    </Form>
  </section>
);

Editor.propTypes = {
  canDelete: PropTypes.bool,
  fields: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.string,
  formName: PropTypes.string,
};

export default connect(mapStateToProps)(Editor);
