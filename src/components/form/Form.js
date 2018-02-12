import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from '@/actions/creators';

import FormFieldBuilder from './FormFieldBuilder';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: (e) => {
    e.preventDefault();
    dispatch(actions.postContent(ownProps.form));
  },
});

const Form = ({
  children,
  className = '',
  fields = [],
  onSave,
}) => (
  <form className='form' onSubmit={onSave}>
    {fields.map(field => {
      const fieldName = Object.keys(field)[0];
      const fieldStructure = field[fieldName];
      return <FormFieldBuilder key={fieldName} fieldName={fieldName} fieldStructure={fieldStructure} />;
    })}
    <button type='submit' className='button'>Save</button>
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fields: PropTypes.array,
  onSave: PropTypes.func,
}

export default compose(
  connect(null, mapDispatchToProps),
  reduxForm({
    destroyOnUnmount: false,
    enableReinitialize: true,
  })
)(Form);
