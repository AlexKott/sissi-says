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
  return {
    displayMain: !pageId,
    displayPage: pageId && !sectionId,
    displaySection: pageId && sectionId,
    pageId,
    sectionId,
  };
};

const App = ({
  displayMain = true,
  displayPage = false,
  displaySection = false,
  pageId = '',
  sectionId = '',
}) => (
  <div className='app'>
    <NavBar type='page' selectedPage={pageId} />
    {!displayMain && <NavBar type='section' selectedPage={pageId} selectedSection={sectionId} />}
    {displayMain && <Main />}
    {displayPage && <Editor type='page' pageId={pageId} />}
    {displaySection && <Editor type='section' sectionId={sectionId} />}
  </div>
);

App.propTypes = {
  displayMain: PropTypes.bool,
  displayPage: PropTypes.bool,
  displaySection: PropTypes.bool,
  pageId: PropTypes.string,
  sectionId: PropTypes.string,
};

export default connect(mapStateToProps)(App);
