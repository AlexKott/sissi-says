import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as selectors from '@/reducers/selectors';
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
  >
    <p className='guide__teaser'><Translate id={tr.GUIDE_TEASER} /></p>
  </Editor>
);

MainEditor.propTypes = {
  fields: PropTypes.array,
  initialValues: PropTypes.object,
};

export default connect(mapStateToProps)(MainEditor);
