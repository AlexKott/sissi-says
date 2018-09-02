import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FieldArray } from 'redux-form';

import * as selectors from '@/selectors';

import FieldList from './FieldList';
import ImageUploader from './ImageUploader';
import MarkdownEditor from './MarkdownEditor';
import Select from './Select';

const mapStateToProps = (state, { fieldName }) => ({
  field: selectors.getFieldWithName(fieldName)(state),
});

const FormFieldBuilder = ({ field }) => {
  let component;
  let type = '';
  let options = [];
  let fieldClassName = '';
  let elementClassName = '';

  switch(field.type) {
    case 'list':
      return <FieldArray component={FieldList} name={field.name} fieldNames={field.fields} />

    case 'choice':
      component = Select;
      options = field.choices;
      break;

    case 'date':
      component = 'input';
      type = 'date';
      break;

    case 'image':
      component = ImageUploader;
      type = 'file';
      break;

    case 'markdown':
      component = MarkdownEditor;
      elementClassName = 'form__element--markdown';
      break;

    case 'password':
      component = 'input';
      type = 'password';
      break;

    case 'string':
      component = 'input';
      type = 'text';
      break;

    case 'text':
      component = 'textarea';
      fieldClassName = 'form__field--textarea';
      break;

    default:
      component = 'input';
      type = 'text';
  }

  return (
    <label className={`form__element ${elementClassName}`}>
      <span className='form__label'>{field.label}:</span>
      <Field
        className={`form__field ${fieldClassName}`}
        component={component}
        name={field.name}
        options={options}
        placeholder={field.placeholder}
        type={type}
      />
    </label>
  );
}

FormFieldBuilder.propTypes = {
  field: PropTypes.object,
};

export default connect(mapStateToProps)(FormFieldBuilder);
