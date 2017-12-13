import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';

import NavBar from './navigation/NavBar';
import Main from './editor/Main';
import Editor from './editor/Editor';

const mapStateToProps = (state) => {
  const pageId = selectors.getSelectedPageId(state);
  const sectionId = selectors.getSelectedSectionId(state);
  let displayType = '';

  if (pageId && sectionId === undefined) {
    displayType = 'page';
  } else if (pageId && sectionId) {
    displayType = 'section';
  }
  return {
    displayMain: displayType === '',
    displayType,
    pageId,
    sectionId,
  };
};

const App = ({
  displayMain = true,
  displayType = '',
  pageId = '',
  sectionId = '',
}) => (
  <div className='app'>
    <NavBar type='page' selectedPage={pageId} />
    {displayMain && <Main />}
    {!displayMain && <NavBar type='section' selectedPage={pageId} selectedSection={sectionId} />}
    {!displayMain && <Editor type={displayType} pageId={pageId} sectionId={sectionId} />}
  </div>
);

App.propTypes = {
  displayMain: PropTypes.bool,
  displayType: PropTypes.string,
  pageId: PropTypes.string,
  sectionId: PropTypes.string,
};

export default connect(mapStateToProps)(App);
