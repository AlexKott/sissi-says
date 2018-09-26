import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as actions from '@/actions';
import * as tr from '@/translations';

import FormFieldBuilder from './FormFieldBuilder';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDelete: () => dispatch(actions.deleteItem()),
  onSubmit: (e) => {
    e.preventDefault();
    dispatch(actions.postContent(ownProps.form));
  },
});

const Form = ({
  canDelete,
  fieldNames = [],
  submitText = tr.SAVE,
  onDelete,
  onSubmit,
}) => (
  <form className='form' onSubmit={onSubmit}>
    {fieldNames.map(fieldName => {
      return <FormFieldBuilder key={fieldName} fieldName={fieldName} />;
    })}
    <div className='form__buttons'>
      {canDelete && <button type='button' onClick={onDelete} className='button'>
        <Translate id={tr.DELETE} />
      </button>}
      <button type='submit' className='button button--cta'><Translate id={submitText} /></button>
    </div>
  </form>
);

Form.propTypes = {
  canDelete: PropTypes.bool,
  fields: PropTypes.array,
  submitText: PropTypes.string,
  onDelete: PropTypes.func,
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
