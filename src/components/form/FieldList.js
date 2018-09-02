import React from 'react';
import PropTypes from 'prop-types';

import FormFieldBuilder from './FormFieldBuilder';

const FieldList = ({ fieldNames, fields, name }) => (
  <section className='form__list'>
    <label className='form__label'>{name}</label>
    {fields.map((f, index) => (
      <article key={index} className='list-item'>
        {fieldNames.map(fieldName => (<FormFieldBuilder
          key={fieldName}
          fieldName={fieldName}
          prefix={`${f}.`}
        />))}
      </article>
    ))}
  </section>
);

FieldList.propTypes = {
  fieldNames: PropTypes.array,
  fields: PropTypes.object,
  name: PropTypes.string,
};

export default FieldList;
