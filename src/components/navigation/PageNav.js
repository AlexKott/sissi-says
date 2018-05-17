import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

import NavBar from './NavBar';

const mapStateToProps = (state) => ({
  canAddPage: selectors.getCanAddPage(state),
  pages: selectors.getAllPages(state),
  selectedPage: selectors.getSelectedPageId(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAddPage: () => dispatch(actions.addPage()),
  onDragEnd: ({ type, source, destination }) => {
    if (destination) {
      dispatch(actions.dragPage(source.index, destination.index));
    }
  },
});

const PageNav = ({
  canAddPage,
  className = '',
  selectedPage = '',
  pages = [],
  onAddPage,
  onDragEnd,
}) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <NavBar
      canAdd={canAddPage}
      className={className}
      droppableId='droppable-page'
      elements={pages}
      selectedElement={selectedPage}
      routeArray={['page']}
      type='page'
      onAdd={onAddPage}
    />
  </DragDropContext>
);

PageNav.propTypes = {
  canAddPage: PropTypes.bool,
  className: PropTypes.string,
  selectedPage: PropTypes.string,
  pages: PropTypes.array,
  onAddPage: PropTypes.func,
  onDragEnd: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageNav);
