import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate, getTranslate } from 'react-localize-redux';

import * as selectors from '@/reducers/selectors';
import * as tr from '@/translations';

import Editor from '@/components/editor/Editor';

const mapStateToProps = (state) => ({
  fields: selectors.getIsInitialDataFetched(state) ? selectors.getMetaFields(state) : [],
  initialValues: selectors.getMetaData(state),
  translate: getTranslate(state.localize),
});

const MainEditor = ({
  fields = [],
  initialValues = {},
  translate,
}) => (
  <Editor
    canDelete={false}
    fields={fields}
    title={translate(tr.WELCOME)}
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
  translate: PropTypes.func,
};

export default connect(mapStateToProps)(MainEditor);
