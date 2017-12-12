import React from 'react';
import { connect } from 'react-redux';

import NavBar from './navigation/NavBar';
import Main from './editor/Main';
import Editor from './editor';

const mapStateToProps = (state) => {
  const { pageId, sectionId } = state.location.payload;
  return {
    displayMain: !pageId,
    displayPage: pageId && !sectionId,
    displaySection: pageId && sectionId,
    pageId,
    sectionId,
  };
};

const App = ({
  displayMain,
  displayPage,
  displaySection,
  pageId,
  sectionId,
}) => (
  <div className="app">
    <NavBar type="page" selectedPage={pageId} />
    {!displayMain && <NavBar type="section" selectedPage={pageId} selectedSection={sectionId} />}
    {displayMain && <Main />}
    {displayPage && <Editor type="page" pageId={pageId} />}
    {displaySection && <Editor type="section" sectionId={sectionId} />}
  </div>
);

export default connect(mapStateToProps)(App);
