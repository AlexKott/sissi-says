import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

import Form from '@/components/form/Form';

const mapStateToProps = (state, ownProps) => {
  let fields = [];
  let title = 'Editor';
  let id = '';

  if (ownProps.type === 'page') {
    id = ownProps.pageId;
    const page = selectors.getPageById(state, id);
    fields = selectors.getPageFields(state, page.pageType);
    title = 'Page Editor';
  } else if (ownProps.type === 'section') {
    id = ownProps.sectionId;
    const section = selectors.getSectionById(state, id);
    fields = selectors.getSectionFields(state, section.sectionType);
    title = 'Section Editor';
  }

  return {
    fields,
    title,
    formName: `editor-${ownProps.type}-${id}`,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSaveContent: (e) => {
    e.preventDefault();
    dispatch(actions.postData('content'));
  },
});

const Editor = ({
  fields = [],
  title = '',
  type = '',
  formName = '',
  onSaveContent,
}) => (
  <section className={`editor editor--${type}`}>
    <h1 className='editor__title'>{title}</h1>
    <Form key={formName} form={formName} fields={fields} onSave={onSaveContent} />
  </section>
);

Editor.propTypes = {
  fields: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.string,
  formName: PropTypes.string,
  onSaveContent: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
