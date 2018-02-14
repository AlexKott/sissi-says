import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';

import NavBar from './NavBar';

const mapStateToProps = (state) => {
  const selectedPage = selectors.getSelectedPageId(state);
  const selectedSection = selectors.getSelectedSectionId(state);
  const pages = selectors.getAllPages(state);
  const sections = selectedPage ? selectors.getSectionsForPage(state, selectedPage) : null;
  return {
    displaySections: sections !== null,
    pages,
    sections,
    selectedPage,
    selectedSection,
  };
};

const Navigation = ({
  displaySections = false,
  selectedPage = '',
  selectedSection = '',
  pages = [],
  sections = [],
}) => ([
  <NavBar
    key='nav-page'
    type='page'
    selectedElement={selectedPage}
    elements={pages}
    routeArray={['page']}
  />
  ,
  displaySections && <NavBar
    key='nav-section'
    type='section'
    selectedElement={selectedSection}
    elements={sections}
    routeArray={['page', selectedPage, 'section']}
  />
]);

Navigation.propTypes = {
  displaySections: PropTypes.bool,
  selectedPage: PropTypes.string,
  selectedSection: PropTypes.string,
  pages: PropTypes.array,
  sections: PropTypes.array,
};

export default connect(mapStateToProps)(Navigation);
