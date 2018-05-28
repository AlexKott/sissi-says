import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';

import PageNav from './PageNav';
import SectionNav from './SectionNav';

const mapStateToProps = (state) => ({
  isSinglePage: selectors.getIsSinglePage(state),
  selectedPage: selectors.getSelectedPageId(state),
});

const Navigation = ({
  isSinglePage = false,
  selectedPage = '',
}) => {
  if (isSinglePage) {
    return (selectedPage && <SectionNav selectedPage={selectedPage} className={'nav nav--dark'} />);
  } else {
    return ([
      <PageNav
        id='page-nav'
        selectedPage={selectedPage}
        className={'nav nav--dark'}
      />
      ,
      selectedPage && <SectionNav
        id='section-nav'
        selectedPage={selectedPage}
        className={'nav nav--light'}
      />
    ]);
  }
}

Navigation.propTypes = {
  isSinglePage: PropTypes.bool,
  selectedPage: PropTypes.string,
};

export default connect(mapStateToProps)(Navigation);
