import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'redux-first-router-link';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Translate } from 'react-localize-redux';

import * as tr from '@/translations';

import getNavLink from '@/helpers/getNavLink';

const NavBar = ({
  canAdd,
  className = 'nav',
  droppableId,
  selectedElement = '',
  type = '',
  elements = [],
  routeArray = [],
  onAdd,
}) => (
  <Droppable droppableId={droppableId} type={type}>
    {(provided) => (
      <nav className={className} ref={provided.innerRef} {...provided.droppableProps}>
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
                    className='nav__element'
                    activeClassName='nav__element--selected'
                  >{element.title ? element.title : (<Translate id={type} />)}</NavLink>
                </div>
                {provided.placeholder}
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
        {canAdd && <button
          onClick={onAdd}
          className='button button--nav'
        ><Translate id={tr.ADD} /></button>}
      </nav>
    )}
  </Droppable>
);

NavBar.propTypes = {
  canAdd: PropTypes.bool,
  className: PropTypes.string,
  droppableId: PropTypes.string,
  selectedElement: PropTypes.string,
  type: PropTypes.string,
  elements: PropTypes.array,
  routeArray: PropTypes.array,
  onAdd: PropTypes.func,
};

export default NavBar;
