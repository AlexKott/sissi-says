import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FieldArray } from 'redux-form';

import * as k from '@/constants/keywords';
import * as selectors from '@/selectors';

import FieldList from './FieldList';
import ImageUploader from './ImageUploader';
import MarkdownEditor from './MarkdownEditor';
import Select from './Select';

const mapStateToProps = (state, { fieldName }) => ({
  field: selectors.getFieldWithName(fieldName)(state),
});

const FormFieldBuilder = ({ field, prefix }) => {
  let component;
  let type = '';
  let options = [];
  let fieldClassName = '';
  let elementClassName = '';

  switch(field.type) {
    case k.LIST:
      return (
        <FieldArray
          component={FieldList}
          fieldNames={field.fields}
          name={field.name}
        />
      );

    case k.CHOICE:
      component = Select;
      options = field.choices;
      break;

    case k.DATE:
      component = 'input';
      type = 'date';
      break;

    case k.IMAGE:
      component = ImageUploader;
      type = 'file';
      break;

    case k.MARKDOWN:
      component = MarkdownEditor;
      elementClassName = 'form__element--markdown';
      break;

    case k.PASSWORD:
      component = 'input';
      type = 'password';
      break;

    case k.STRING:
      component = 'input';
      type = 'text';
      break;

    case k.TEXT:
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
        name={`${prefix}${field.name}`}
        options={options}
        placeholder={field.placeholder}
        type={type}
      />
    </label>
  );
}

FormFieldBuilder.propTypes = {
  field: PropTypes.object,
  prefix: PropTypes.string,
};

export default connect(mapStateToProps)(FormFieldBuilder);
