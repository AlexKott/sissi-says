import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/selectors';
import * as tr from '@/translations';

import Editor from '@/components/editor/Editor';

const mapStateToProps = (state) => ({
  fields: selectors.getIsInitialDataFetched(state) ? selectors.getGlobalFields(state) : [],
  initialValues: selectors.getGlobalData(state),
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
    formName='global'
  />
);

MainEditor.propTypes = {
  fields: PropTypes.array,
  initialValues: PropTypes.object,
};

export default connect(mapStateToProps)(MainEditor);
