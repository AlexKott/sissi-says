import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FieldArray } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import * as actions from '@/actions/creators';

import FlexList from './FlexList';
import FormFieldBuilder from './FormFieldBuilder';

const mapStateToProps = (state, { submitText }) => {
  const translate = getTranslate(state.localize);
  return {
    submitText: submitText || translate('save'),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: ownProps.onSubmit ? ownProps.onSubmit : (e) => {
    e.preventDefault();
    dispatch(actions.postContent(ownProps.form));
  },
});

const Form = ({
  children,
  fields = [],
  submitText,
  onSubmit,
}) => (
  <form className='form' onSubmit={onSubmit}>
    {fields.map(field => {
      const fieldName = Object.keys(field)[0];
      const fieldStructure = field[fieldName];
      if (fieldStructure.type === 'list') {
        return (<FieldArray
          key={fieldName}
          name={fieldName}
          component={FlexList}
          listName={fieldName}
          fieldStructure={fieldStructure}
        />);

      } else {
        return <FormFieldBuilder key={fieldName} fieldName={fieldName} fieldStructure={fieldStructure} />;
      }
    })}
    <div className='form__buttons'>
      {children}
      <button type='submit' className='button button--cta'>{submitText}</button>
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
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    destroyOnUnmount: true,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })
)(Form);
