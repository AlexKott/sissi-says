import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import * as selectors from '../../reducers/selectors';

import FormFieldBuilder from '../form/FormFieldBuilder';

const mapStateToProps = (state, ownProps) => {
  let fields = [];
  let title = 'Editor';

  if (ownProps.type === 'page') {
    const page = selectors.getPageById(state, ownProps.pageId);
    fields = selectors.getPageFields(state, page.pageType);
    title = 'Get working on your page!';
  } else if (ownProps.type === 'section') {
    const section = selectors.getSectionById(state, ownProps.sectionId);
    fields = selectors.getSectionFields(state, section.sectionType);
    title = 'Now working on a section!';
  }

  return {
    fields,
    title,
  };
};

const Editor = ({
  fields,
  title,
}) => (
  <form>
    <h1>{title}</h1>
    {fields.map(field => {
      const fieldName = Object.keys(field)[0];
      const fieldStructure = field[fieldName];
      return (<FormFieldBuilder key={fieldName} fieldName={fieldName} fieldStructure={fieldStructure} />)
    })}
  </form>
);

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'editor' })
)(Editor);
