import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';

import FormFieldBuilder from './FormFieldBuilder';

const mapStateToProps = (state, ownProps) => ({
  nestedFields: ownProps.fieldStructure.fields.map(fieldName => {
    return selectors.getFieldByName(state, fieldName);
  }),
});

const FieldArrayBuilder = ({
  fields: reduxFormFields,
  fieldName,
  fieldStructure,
  nestedFields,
}) => (
  <div>
    <h3>{fieldStructure.label}</h3>
    {reduxFormFields.map((f, index) => {
      return (
        nestedFields.map((field) => {
          const fieldName = Object.keys(field)[0];
          const fieldStructure = field[fieldName];
          return (<FormFieldBuilder
            key={fieldName}
            fieldName={`${fieldName}-${index}`}
            fieldStructure={fieldStructure}
          />);
      }));
    })}
    <button>+ {fieldStructure.itemLabel}</button>
  </div>
);

FieldArrayBuilder.propTypes = {
  reduxFormFields: PropTypes.array,
  fieldName: PropTypes.string,
  fieldStructure: PropTypes.object,
  nestedFields: PropTypes.array,
};

export default connect(mapStateToProps)(FieldArrayBuilder);
