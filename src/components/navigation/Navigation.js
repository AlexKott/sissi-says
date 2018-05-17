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
    return (selectedPage && <SectionNav selectedPage={selectedPage} className={'nav nav--page'} />);
  } else {
    return ([
      <PageNav id='page-nav' className={'nav nav--page'} />
      ,
      selectedPage && <SectionNav
        id='section-nav'
        selectedPage={selectedPage}
        className={'nav nav--section'}
      />
    ]);
  }
}

Navigation.propTypes = {
  displaySections: PropTypes.bool,
  selectedPage: PropTypes.string,
  selectedSection: PropTypes.string,
  pages: PropTypes.array,
  sections: PropTypes.array,
};

export default connect(mapStateToProps)(Navigation);
