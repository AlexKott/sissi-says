import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as actions from '@/actions';
import * as C from '@/components';
import * as tr from '@/translations';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDelete: () => dispatch(actions.deleteItem()),
  onSave: () => dispatch(actions.postContent(ownProps.form)),
});

const Form = ({
  canDelete,
  fieldNames = [],
  onDelete,
  onSave,
}) => (
  <form className='form'>
    {fieldNames.map(fieldName => {
      return <C.FormFieldBuilder key={fieldName} fieldName={fieldName} />;
    })}
    <div className='form__buttons'>
      {canDelete && (
        <C.Button onClick={onDelete}>
          <Translate id={tr.DELETE} />
        </C.Button>
      )}
      <C.Button onClick={onSave} classes='button--cta'>
        <Translate id={tr.SAVE} />
      </C.Button>
    </div>
  </form>
);

Form.propTypes = {
  canDelete: PropTypes.bool,
  fields: PropTypes.array,
  onDelete: PropTypes.func,
  onSave: PropTypes.func,
};

export default compose(
  connect(null, mapDispatchToProps),
  reduxForm({
    destroyOnUnmount: true,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })
)(Form);
