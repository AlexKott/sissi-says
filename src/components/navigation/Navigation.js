import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '@/actions';
import * as k from '@/constants/keywords';
import * as selectors from '@/selectors';

import AddButton from './AddButton';
import NavBar from './NavBar';
import NavItem from './NavItem';

const mapStateToProps = state => {
  const pageId = selectors.getActivePageId(state);
  return {
    pageProps: selectors.getPropsForPageNav(state),
    sectionProps: selectors.getPropsForSectionNav(pageId)(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onAddPage: () => dispatch(actions.addPage()),
  onAddSection: pageId => dispatch(actions.addSection(pageId)),
});

const Navigation = ({
  pageProps,
  sectionProps,
  onAddPage,
  onAddSection,
}) => [
  pageProps && <NavBar
    key='pageNav'
    level='1'
    type={k.PAGES}
  >
    {pageProps.itemIds.map((id, index) => (
      <NavItem
        key={id}
        id={id}
        index={index}
        type={k.PAGES}
      />
    ))}
    {pageProps.canAdd && <AddButton onClick={onAddPage} />}
  </NavBar>
  ,
  sectionProps && <NavBar
    key='sectionNav'
    level={pageProps ? '2' : '1'}
    type={k.SECTIONS}
  >
    {sectionProps.itemIds.map((id, index) => (
      <NavItem
        key={id}
        id={id}
        index={index}
        type={k.SECTIONS}
      />
    ))}
    {sectionProps.canAdd && <AddButton onClick={() => onAddSection(sectionProps.pageId)} />}
  </NavBar>
];

Navigation.propTypes = {
  pageProps: PropTypes.object,
  sectionProps: PropTypes.object,
  onAddPage: PropTypes.func,
  onAddSection: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
