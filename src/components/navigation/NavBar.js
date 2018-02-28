import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

function getNavLink(selectedElement, elementId, routeArray) {
  if (selectedElement === elementId) {
    const shortArray = routeArray.slice(0, -1);
    return shortArray;
  } else {
    return [...routeArray, elementId];
  }
}

const mapStateToProps = (state, ownProps) => {
  let canAdd = true;
  let droppableId;

  if (ownProps.type === 'page') {
    canAdd = selectors.getCanAddPage(state);
    droppableId = 'droppable-page';
  } else if (ownProps.type === 'section') {
    const pageId = ownProps.routeArray[1];
    canAdd = selectors.getCanAddSection(state, pageId);
    droppableId = pageId;
  }

  return {
    canAdd,
    droppableId,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let onAdd;

  if (ownProps.type === 'page') {
    onAdd = () => dispatch(actions.addPage());
  } else if (ownProps.type === 'section') {
    const pageId = ownProps.routeArray[1];
    onAdd = () => dispatch(actions.addSection(pageId));
  }

  return {
    onAdd,
  };
}

const NavBar = ({
  canAdd,
  droppableId,
  selectedElement = '',
  type = '',
  elements = [],
  routeArray = [],
  onAdd,
}) => (
  <Droppable droppableId={droppableId} type={type}>
    {(provided) => (
      <nav className={`nav nav--${type}`} ref={provided.innerRef} {...provided.droppableProps}>
        {elements.map((element, index) => (
          <Draggable key={element.id} draggableId={element.id} type={type} index={index}>
            {(provided) => (
              <div>
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <NavLink
                    to={getNavLink(selectedElement, element.id, routeArray)}
                    className={`nav__element nav__element--${type}`}
                    activeClassName='nav__element--selected'
                  >{element.title ? element.title : `New ${type}`}</NavLink>
                </div>
                {provided.placeholder}
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
        {canAdd && <button
          onClick={onAdd}
          className={`nav__element button__nav button__nav--${type}`}
        >Add</button>}
      </nav>
    )}
  </Droppable>
);

NavBar.propTypes = {
  canAdd: PropTypes.bool,
  droppableId: PropTypes.string,
  selectedElement: PropTypes.string,
  type: PropTypes.string,
  elements: PropTypes.array,
  routeArray: PropTypes.array,
  onAdd: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
