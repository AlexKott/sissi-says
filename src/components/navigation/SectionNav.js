import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import * as selectors from '@/selectors';
import * as actions from '@/actions/creators';
import * as tr from '@/translations';

import NavBar from './NavBar';

const mapStateToProps = (state, ownProps) => ({
  canAddSection: selectors.getCanAddSection(state, ownProps.selectedPage),
  selectedSection: selectors.getSelectedSectionId(state),
  sections: ownProps.selectedPage ? selectors.getSectionsForPage(state, ownProps.selectedPage) : null,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAddSection: () => dispatch(actions.addSection(ownProps.selectedPage)),
  onDragEnd: ({ type, source, destination }) => {
    if (destination) {
      dispatch(actions.dragSection(source.droppableId, source.index, destination.index));
    }
  },
});

const SectionNav = ({
  canAddSection,
  className = '',
  selectedPage = '',
  selectedSection = '',
  sections = [],
  onAddSection,
  onDragEnd,
}) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <NavBar
      canAdd={canAddSection}
      className={className}
      droppableId={selectedPage}
      elements={sections}
      selectedElement={selectedSection}
      routeArray={['page', selectedPage, 'section']}
      type={tr.SECTION}
      onAdd={onAddSection}
    />
  </DragDropContext>
);

SectionNav.propTypes = {
  canAddSection: PropTypes.bool,
  className: PropTypes.string,
  selectedPage: PropTypes.string,
  selectedSection: PropTypes.string,
  sections: PropTypes.array,
  onAddSection: PropTypes.func,
  onDragEnd: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionNav);
