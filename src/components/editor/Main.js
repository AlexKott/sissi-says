import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import * as selectors from '../../reducers/selectors';

import FormFieldBuilder from '../form/FormFieldBuilder';

const mapStateToProps = (state) => ({
  fields: selectors.getMetaFields(state),
});

const Main = ({
  fields,
}) => (
  <section className="editor">
    <h1>Welcome to your Website Manager!</h1>
    <p>Enter some basic data here:</p>
    {fields.map(field => {
      const fieldId = Math.random().toString(36).substring(2, 9);
      const fieldName = Object.keys(field)[0];
      const fieldStructure = field[fieldName];
      return (<FormFieldBuilder key={fieldId} fieldName={fieldName} fieldStructure={fieldStructure} />)
    })}
    <p>Or get working on your pages by selecting one! (You can always get back here by deselecting the current page.)</p>
    <p>If you get stuck – sissi's always here to help!</p>
  </section>
);

Main.propTypes = {
  fields: PropTypes.array,
};

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'meta' })
)(Main);
