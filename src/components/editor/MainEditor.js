import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';

import Editor from '@/components/editor/Editor';

const mapStateToProps = (state) => ({
  fields: selectors.getMetaFields(state),
  initialValues: selectors.getMetaData(state),
});

const MainEditor = ({
  fields = [],
  initialValues = {},
}) => (
  <Editor
    canDelete={false}
    fields={fields}
    title='Welcome to your Website Manager!'
    type='main'
    initialValues={initialValues}
    formName='meta'
  >
    <p className='guide__teaser'>If you get stuck – sissi's always here to help!</p>
  </Editor>
);

MainEditor.propTypes = {
  fields: PropTypes.array,
  initialValues: PropTypes.object,
};

export default connect(mapStateToProps)(MainEditor);
