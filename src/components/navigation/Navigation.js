import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

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

const mapDispatchToProps = (dispatch) => ({
  onDragEnd: ({ type, source, destination }) => {
    if (type === 'page') {
      dispatch(actions.dragPage(source.index, destination.index));
    } else if (type === 'section') {
      dispatch(actions.dragSection(source.index, destination.index));
    }
  },
});

const Navigation = ({
  displaySections = false,
  selectedPage = '',
  selectedSection = '',
  pages = [],
  sections = [],
  onDragEnd,
}) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <NavBar
      type='page'
      selectedElement={selectedPage}
      elements={pages}
      routeArray={['page']}
    />
    {displaySections && <NavBar
      type='section'
      selectedElement={selectedSection}
      elements={sections}
      routeArray={['page', selectedPage, 'section']}
    />}
  </DragDropContext>
);

Navigation.propTypes = {
  displaySections: PropTypes.bool,
  selectedPage: PropTypes.string,
  selectedSection: PropTypes.string,
  pages: PropTypes.array,
  sections: PropTypes.array,
  onDragEnd: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
