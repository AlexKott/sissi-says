import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from '@/actions/creators';

import FormFieldBuilder from './FormFieldBuilder';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: ownProps.onSubmit ? ownProps.onSubmit : (e) => {
    e.preventDefault();
    dispatch(actions.postContent(ownProps.form));
  },
});

const Form = ({
  children,
  fields = [],
  submitText = 'Save',
  onSubmit,
}) => (
  <form className='form' onSubmit={onSubmit}>
    {fields.map(field => {
      const fieldName = Object.keys(field)[0];
      const fieldStructure = field[fieldName];
      return <FormFieldBuilder key={fieldName} fieldName={fieldName} fieldStructure={fieldStructure} />;
    })}
    <button type='submit' className='button'>{submitText}</button>
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.node,
  fields: PropTypes.array,
  submitText: PropTypes.string,
  onSubmit: PropTypes.func,
}

export default compose(
  connect(null, mapDispatchToProps),
  reduxForm({
    destroyOnUnmount: false,
    enableReinitialize: true,
  })
)(Form);
