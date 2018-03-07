import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

import GuideContent from './GuideContent';
import Sissi from '@/components/svgs/Sissi';

const mapStateToProps = (state) => ({
  isGuideOpen: selectors.getDisplayGuidePopup(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCloseGuide: (e) => {
    if (e.target.id === 'guide-popup') {
      dispatch(actions.togglePopup('guide', false));
    }
  },
});

const Guide = ({ isGuideOpen, onCloseGuide }) => ([
  isGuideOpen && <aside
    key='guide__wrapper'
    id='guide-popup'
    className='popup__wrapper'
    onClick={onCloseGuide}
  >
    <article className='popup__box popup__box--guide'>
      <Sissi className='guide__sissi' />
      <GuideContent />
    </article>
  </aside>
]);

Guide.propTypes = {
  isGuideOpen: PropTypes.bool,
  onCloseGuide: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Guide);
