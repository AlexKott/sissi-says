import React from 'react';
import { connect } from 'react-redux';

import * as selectors from '../../reducers/selectors';

import FormFieldBuilder from '../form/FormFieldBuilder';

const mapStateToProps = (state) => ({
  fields: selectors.getMetaFields(state),
});

const Main = ({
  fields,
}) => (
  <section>
    <h1>Welcome to your Website Manager!</h1>
    <p>Enter some basic data here:</p>
    {fields.map(field => {
      const fieldName = Object.keys(field)[0];
      const fieldStructure = field[fieldName];
      return (<FormFieldBuilder key={fieldName} fieldName={fieldName} fieldStructure={fieldStructure} />)
    })}
    <p>Or get working on your pages by selecting one! (You can always get back here by deselecting the current page.)</p>
    <p>If you get stuck – sissi's always here to help!</p>
  </section>
);

export default connect(mapStateToProps)(Main);
