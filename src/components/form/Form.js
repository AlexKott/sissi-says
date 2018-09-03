import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as actions from '@/actions/creators';
import * as tr from '@/translations';

import FormFieldBuilder from './FormFieldBuilder';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: ownProps.onSubmit ? ownProps.onSubmit : (e) => {
    e.preventDefault();
    dispatch(actions.postContent(ownProps.form));
  },
});

const Form = ({
  children,
  fieldNames = [],
  submitText = tr.SAVE,
  onSubmit,
}) => (
  <form className='form' onSubmit={onSubmit}>
    {fieldNames.map(fieldName => {
      return <FormFieldBuilder key={fieldName} fieldName={fieldName} />;
    })}
    <div className='form__buttons'>
      {children}
      <button type='submit' className='button button--cta'><Translate id={submitText} /></button>
    </div>
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
    destroyOnUnmount: true,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })
)(Form);
