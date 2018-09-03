import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/selectors';
import * as tr from '@/translations';

import Editor from '@/components/editor/Editor';

const mapStateToProps = (state) => ({
  fields: selectors.getIsInitialDataFetched(state) ? selectors.getMetaFields(state) : [],
  initialValues: selectors.getMetaData(state),
});

const MainEditor = ({
  fields = [],
  initialValues = {},
}) => (
  <Editor
    canDelete={false}
    fields={fields}
    title={tr.WELCOME}
    type='main'
    initialValues={initialValues}
    formName='meta'
  />
);

MainEditor.propTypes = {
  fields: PropTypes.array,
  initialValues: PropTypes.object,
};

export default connect(mapStateToProps)(MainEditor);
